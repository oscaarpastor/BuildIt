import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LanguageSelector from "../components/ui/LanguageSelector";
import { useAuth } from "../context/useAuth";
import { ApiError } from "../lib/api";
import { errorKey } from "../lib/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email || !password || !repeatPassword) return setError(t("loguin.fill_all_fields"));
    if (!EMAIL_RE.test(email)) return setError(t("loguin.invalid_email"));
    if (password.length < MIN_PASSWORD) return setError(t("loguin.password_too_short"));
    if (password !== repeatPassword) return setError(t("loguin.passwords_dont_match"));

    setSubmitting(true);
    try {
      await register(name.trim(), email, password);
      navigate("/projects");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) setError(t("loguin.duplicate_email"));
      else if (err instanceof ApiError && err.status === 400) setError(t("errors.invalid_data"));
      else setError(t(errorKey(err, "loguin.generic_error")));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4">
        <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline">
          ← {t("loguin.back")}
        </button>
        <LanguageSelector />
      </header>

      <div className="bg-surface shadow-xl rounded-xl p-10 w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">{t("loguin.register_title")}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister} noValidate>
          <Input
            type="text"
            autoComplete="name"
            placeholder={t("loguin.name_placeholder")}
            aria-label={t("loguin.name_placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            autoComplete="email"
            placeholder={t("loguin.email_placeholder")}
            aria-label={t("loguin.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            autoComplete="new-password"
            placeholder={t("loguin.password_placeholder")}
            aria-label={t("loguin.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            autoComplete="new-password"
            placeholder={t("loguin.repeat_password_placeholder")}
            aria-label={t("loguin.repeat_password_placeholder")}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" disabled={submitting}>
            {t("loguin.register_submit")}
          </Button>
        </form>

        {error && (
          <div role="alert" className="text-red-400 text-sm mt-4 text-center">
            {error}
          </div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          {t("loguin.already_account")}{" "}
          <button onClick={() => navigate("/login")} className="text-primary hover:underline font-medium">
            {t("loguin.login_here")}
          </button>
        </div>
      </div>
    </div>
  );
}
