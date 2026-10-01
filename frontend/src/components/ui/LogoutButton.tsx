import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/useAuth";
import Button from "./Button";

export default function LogoutButton() {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <Button type="button" variant="danger" onClick={logout}>
      {t("loguin.logout")}
    </Button>
  );
}
