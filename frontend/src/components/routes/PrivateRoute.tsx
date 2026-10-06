import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/useAuth";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <p className="p-6 text-andamio">{t("common.loading")}</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
