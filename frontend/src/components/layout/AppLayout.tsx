import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/useAuth";
import Logo from "../ui/Logo";
import LanguageSelector from "../ui/LanguageSelector";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex h-16 items-center px-3 text-sm font-semibold transition-colors ${
    isActive ? "text-grafito shadow-[inset_0_-3px_0_var(--color-azul)]" : "text-andamio hover:text-grafito"
  }`;

/** Marco de las pantallas con sesión iniciada (menos el editor, que ocupa toda la pantalla). */
export default function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-junta bg-papel">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:gap-8 sm:px-6">
          <Logo to="/projects" />
          <nav aria-label={t("nav.label")} className="flex">
            <NavLink to="/projects" className={navClass}>
              {t("nav.sites")}
            </NavLink>
            <NavLink to="/settings" className={navClass}>
              {t("nav.account")}
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-sm text-andamio md:inline">{user?.name}</span>
            <LanguageSelector />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
