import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import type { AxiosError } from "axios";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/ui/LanguageSelector";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !repeatPassword) {
      setError(t("loguin.fill_all_fields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("loguin.invalid_email"));
      return;
    }

    if (password.length < 6) {
      setError(t("loguin.password_too_short"));
      return;
    }

    if (password !== repeatPassword) {
      setError(t("loguin.passwords_dont_match"));
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/users`, {
        name,
        email,
        password,
      });

      const token = res.data._id;
      localStorage.setItem("token", token);

      const userRes = await axios.get<User>(`${API_URL}/api/me`, {
        headers: { Authorization: token },
      });

      setUser(userRes.data);
      navigate("/projects");
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (error.response?.data?.message?.includes("E11000")) {
        setError(t("loguin.duplicate_email"));
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(t("loguin.generic_error"));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      {/* 🔝 Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-primary hover:underline"
        >
          ← {t("loguin.back")}
        </button>
        <LanguageSelector />
      </header>

      {/* 🧾 Formulario */}
      <div className="bg-surface shadow-xl rounded-xl p-10 w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">{t("loguin.register_title")}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder={t("loguin.name_placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder={t("loguin.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder={t("loguin.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder={t("loguin.repeat_password_placeholder")}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button type="submit" variant="primary">
            {t("loguin.register_submit")}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          {t("loguin.already_account")}{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline font-medium"
          >
            {t("loguin.login_here")}
          </button>
        </div>
      </div>
    </div>
  );
}
