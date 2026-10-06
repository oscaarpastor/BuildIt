import type { ReactNode } from "react";
import Logo from "../ui/Logo";
import LanguageSelector from "../ui/LanguageSelector";

/** Cabecera de las pantallas sin sesión: bienvenida, acceso y registro. */
export default function PublicHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
      <Logo />
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <LanguageSelector />
        {children}
      </div>
    </header>
  );
}
