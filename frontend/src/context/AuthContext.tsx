import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api, AUTH_EXPIRED_EVENT, tokenStore } from "../lib/api";
import type { User } from "../types";
import { AuthContext } from "./auth-context";

type AuthResponse = { token: string; user: User };

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => Boolean(tokenStore.get()));

  // Recuperar la sesión guardada al cargar la app
  useEffect(() => {
    if (!tokenStore.get()) return;
    api<User>("/api/auth/me")
      .then(setUser)
      .catch(() => {
        tokenStore.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // El módulo de API avisa cuando el servidor rechaza el token
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, []);

  const startSession = useCallback(({ token, user }: AuthResponse) => {
    tokenStore.set(token);
    setUser(user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      startSession(await api<AuthResponse>("/api/auth/login", { method: "POST", body: { email, password } }));
    },
    [startSession]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      startSession(
        await api<AuthResponse>("/api/auth/register", { method: "POST", body: { name, email, password } })
      );
    },
    [startSession]
  );

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateUser: setUser }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
