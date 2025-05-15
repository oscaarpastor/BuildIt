import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import axios from "axios";
import type { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

// Asegúrate de tener el mismo tipo User en el contexto
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Rellena todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Introduce un correo electrónico válido.");
      return;
    }

    try {
      // Iniciar sesión
      const res = await axios.post<{ token: string }>(
        "http://localhost:3000/api/login",
        { email, password }
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      // Obtener datos del usuario con tipado explícito
      const userRes = await axios.get<User>("http://localhost:3000/api/me", {
        headers: { Authorization: token },
      });

      setUser(userRes.data);
      navigate("/projects");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="bg-surface shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Inicia sesión</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          <Button type="submit" variant="primary">
            Entrar
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-primary hover:underline font-medium"
          >
            Crea una aquí
          </button>
        </div>
      </div>
    </div>
  );
}
