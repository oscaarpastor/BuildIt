import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthLayout from "../components/layout/AuthLayout";
import { TextField } from "../components/ui/Field";
import Button from "../components/ui/Button";
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
    <AuthLayout
      title={t("loguin.title")}
      footer={
        <>
          {t("loguin.no_account")}{" "}
          <Link to="/register" className="font-semibold text-azul hover:underline">
            {t("loguin.create_account")}
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleLogin} noValidate>
        <TextField
          label={t("loguin.email_placeholder")}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t("loguin.password_placeholder")}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p role="alert" className="text-sm text-derribo">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={submitting} className="mt-1">
          {submitting ? t("loguin.submitting") : t("loguin.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
