import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/layout/AppLayout";
import { TextField } from "../components/ui/Field";
import Button from "../components/ui/Button";
import LogoutButton from "../components/ui/LogoutButton";
import { useAuth } from "../context/useAuth";
import { api, ApiError } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { User } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Message = { type: "ok" | "error"; text: string } | null;

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();

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
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="titular text-3xl">{t("settings.title")}</h1>

        <form onSubmit={handleUpdate} noValidate className="mt-10 max-w-xl">
          <fieldset className="grid gap-5 rounded-lg border border-junta bg-papel p-6">
            <legend className="float-left mb-1 text-lg font-semibold">{t("settings.details")}</legend>
            <TextField
              label={t("settings.name_placeholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <TextField
              label={t("settings.email_placeholder")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </fieldset>

          <fieldset className="mt-6 grid gap-5 rounded-lg border border-junta bg-papel p-6">
            <legend className="float-left text-lg font-semibold">{t("settings.change_password")}</legend>
            <p className="-mt-3 text-sm text-andamio">{t("settings.password_hint")}</p>
            <TextField
              label={t("settings.current_password")}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              label={t("settings.new_password")}
              hint={t("loguin.password_hint")}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? t("settings.saving") : t("settings.save_button")}
            </Button>
            {message && (
              <p
                role={message.type === "error" ? "alert" : "status"}
                className={`text-sm ${message.type === "error" ? "text-derribo" : "text-verde"}`}
              >
                {message.text}
              </p>
            )}
          </div>
        </form>

        <section className="mt-14 max-w-xl border-t border-junta pt-8">
          <h2 className="text-lg font-semibold">{t("settings.session")}</h2>
          <p className="mt-1 text-sm text-andamio">{t("settings.session_hint")}</p>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
