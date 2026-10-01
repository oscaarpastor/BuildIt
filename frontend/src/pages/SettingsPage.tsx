import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LogoutButton from "../components/ui/LogoutButton";
import LanguageSelector from "../components/ui/LanguageSelector";
import { useAuth } from "../context/useAuth";
import { api, ApiError } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { User } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Message = { type: "ok" | "error"; text: string } | null;

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<Message>(null);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !EMAIL_RE.test(email)) {
      setMessage({ type: "error", text: t("errors.invalid_data") });
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setMessage({ type: "error", text: t("loguin.password_too_short") });
      return;
    }
    if (newPassword && !currentPassword) {
      setMessage({ type: "error", text: t("settings.current_password_required") });
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, string> = { name: name.trim(), email };
      if (newPassword) Object.assign(body, { currentPassword, newPassword });

      updateUser(await api<User>("/api/users/me", { method: "PUT", body }));
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "ok", text: t("settings.success") });
    } catch (err) {
      let key = errorKey(err, "settings.error");
      if (err instanceof ApiError && err.status === 409) key = "loguin.duplicate_email";
      if (err instanceof ApiError && err.status === 400 && newPassword) key = "settings.wrong_current_password";
      setMessage({ type: "error", text: t(key) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <button onClick={() => navigate("/projects")} className="text-sm text-primary hover:underline font-medium">
          ← {t("settings.back")}
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="p-6 max-w-lg w-full bg-surface text-text shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">{t("settings.title")}</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("settings.name_placeholder")}
            aria-label={t("settings.name_placeholder")}
            autoComplete="name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("settings.email_placeholder")}
            aria-label={t("settings.email_placeholder")}
            autoComplete="email"
          />

          <fieldset className="flex flex-col gap-3 border-t border-text/20 pt-4">
            <legend className="text-sm text-text/70 px-1">{t("settings.change_password")}</legend>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={t("settings.current_password")}
              aria-label={t("settings.current_password")}
              autoComplete="current-password"
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("settings.new_password")}
              aria-label={t("settings.new_password")}
              autoComplete="new-password"
            />
          </fieldset>

          <Button type="submit" variant="primary" disabled={saving}>
            {t("settings.save_button")}
          </Button>
        </form>

        <div className="mt-4 flex flex-col">
          <LogoutButton />
        </div>

        {message && (
          <p
            role={message.type === "error" ? "alert" : "status"}
            className={`mt-4 text-sm text-center ${message.type === "error" ? "text-red-400" : "text-green-400"}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
