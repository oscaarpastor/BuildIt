import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      {t("loguin.logout")}
    </Button>
  );
}
