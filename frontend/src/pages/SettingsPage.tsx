import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LogoutButton from "../components/ui/LogoutButton";
import LanguageSelector from "../components/ui/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      setMessage(t("settings.success"));
    } catch {
      setMessage(t("settings.error"));
    }
  };

  return (
    <div className="min-h-screen bg-white text-text flex flex-col items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary hover:underline font-medium"
        >
          ← {t("settings.back")}
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="p-6 max-w-lg w-full bg-surface shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          {t("settings.title")}
        </h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("settings.name_placeholder")}
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("settings.email_placeholder")}
          />

          <Button type="submit" variant="primary">
            {t("settings.save_button")}
          </Button>

          <LogoutButton />
        </form>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
