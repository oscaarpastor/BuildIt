import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import type { AxiosError } from "axios";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !repeatPassword) {
      setError("Rellena todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Introduce un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/users", {
        name,
        email,
        password,
      });

      const token = res.data._id;
      localStorage.setItem("token", token);

      const userRes = await axios.get<User>("http://localhost:3000/api/me", {
        headers: { Authorization: token },
      });

      setUser(userRes.data);
      navigate("/projects");
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      if (error.response?.data?.message?.includes("E11000 duplicate key")) {
        setError("El correo ya está registrado.");
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Error al crear cuenta.");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="bg-surface shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crea tu cuenta</h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Repite la contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Registrarse
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline font-medium"
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}
