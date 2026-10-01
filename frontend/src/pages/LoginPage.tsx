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

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError(t("loguin.fill_all_fields"));
    if (!EMAIL_RE.test(email)) return setError(t("loguin.invalid_email"));

    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/projects");
    } catch (err) {
      const invalid = err instanceof ApiError && (err.status === 401 || err.status === 400);
      setError(t(invalid ? "loguin.invalid_credentials" : errorKey(err, "loguin.generic_error")));
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
        <h2 className="text-2xl font-bold text-center mb-6">{t("loguin.title")}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin} noValidate>
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
            autoComplete="current-password"
            placeholder={t("loguin.password_placeholder")}
            aria-label={t("loguin.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" disabled={submitting}>
            {t("loguin.submit")}
          </Button>
        </form>

        {error && (
          <div role="alert" className="text-red-400 text-sm mt-4 text-center">
            {error}
          </div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          {t("loguin.no_account")}{" "}
          <button onClick={() => navigate("/register")} className="text-primary hover:underline font-medium">
            {t("loguin.create_account")}
          </button>
        </div>
      </div>
    </div>
  );
}
