import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
}
