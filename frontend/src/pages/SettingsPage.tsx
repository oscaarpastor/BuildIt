import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LogoutButton from "../components/ui/LogoutButton";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`http://localhost:3000/api/users/${user?._id}`, {
        name,
        email,
      });

      updateUser({ name, email });
      setMessage("✅ Perfil actualizado correctamente.");
    } catch {
      setMessage("❌ Error al actualizar el perfil.");
    }
  };

  return (
    <>
      <div className="p-6 max-w-lg mx-auto text-text">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Configuración de perfil
        </h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
          
          <Button type="submit" variant="primary">
            Guardar cambios
          </Button>
          <LogoutButton />
        </form>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>

      
    
    </>
  );
}
