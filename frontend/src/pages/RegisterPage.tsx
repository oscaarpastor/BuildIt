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
    <AuthLayout
      title={t("loguin.register_title")}
      intro={t("loguin.register_intro")}
      footer={
        <>
          {t("loguin.already_account")}{" "}
          <Link to="/login" className="font-semibold text-azul hover:underline">
            {t("loguin.login_here")}
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleRegister} noValidate>
        <TextField
          label={t("loguin.name_placeholder")}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={t("loguin.email_placeholder")}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t("loguin.password_placeholder")}
          hint={t("loguin.password_hint")}
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={t("loguin.repeat_password_placeholder")}
          type="password"
          autoComplete="new-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {error && (
          <p role="alert" className="text-sm text-derribo">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={submitting} className="mt-1">
          {submitting ? t("loguin.register_submitting") : t("loguin.register_submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
