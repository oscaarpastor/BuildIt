import type { ReactNode } from "react";
import PublicHeader from "./PublicHeader";

type Props = {
  title: string;
  intro?: string;
  children: ReactNode;
  footer: ReactNode;
};

/** Acceso y registro: una columna estrecha, alineada a la izquierda y sin adornos. */
export default function AuthLayout({ title, intro, children, footer }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <PublicHeader />
      <main className="flex flex-1 items-start justify-center px-4 pt-10 pb-20 sm:pt-20">
        <div className="w-full max-w-sm">
          <h1 className="titular text-3xl">{title}</h1>
          {intro && <p className="mt-3 text-andamio">{intro}</p>}
          <div className="mt-8">{children}</div>
          <div className="mt-8 border-t border-junta pt-6 text-sm text-andamio">{footer}</div>
        </div>
      </main>
    </div>
  );
}
