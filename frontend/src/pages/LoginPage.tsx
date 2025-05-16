import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import axios from "axios";
import type { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/ui/LanguageSelector";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("loguin.fill_all_fields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("loguin.invalid_email"));
      return;
    }

    try {
      const res = await axios.post<{ token: string }>("http://localhost:3000/api/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const userRes = await axios.get<User>("http://localhost:3000/api/me", {
        headers: { Authorization: token },
      });

      setUser(userRes.data);
      navigate("/projects");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || t("loguin.generic_error"));
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
        <h2 className="text-2xl font-bold text-center mb-6">{t("loguin.title")}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          <Button type="submit" variant="primary">
            {t("loguin.submit")}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        <div className="text-sm text-center text-text/70 mt-6">
          {t("loguin.no_account")}{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-primary hover:underline font-medium"
          >
            {t("loguin.create_account")}
          </button>
        </div>
      </div>
    </div>
  );
}
