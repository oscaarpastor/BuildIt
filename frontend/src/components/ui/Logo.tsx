import { Link } from "react-router-dom";

/** La «B» del logo: tres piezas de grafito apiladas y la panza azul. */
export function LogoMark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="8" height="10" rx="1" className="fill-grafito" />
      <rect x="0" y="11" width="8" height="10" rx="1" className="fill-grafito" />
      <rect x="0" y="22" width="8" height="10" rx="1" className="fill-grafito" />
      <path
        d="M10 0H21L27 6V12.5L24.5 16L27 19.5V26L21 32H10V26.5H21.5V18.75H10V13.25H21.5V5.5H10Z"
        className="fill-azul"
      />
    </svg>
  );
}

export default function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 rounded-sm">
      <LogoMark />
      <span className="titular text-lg leading-none">Build It</span>
    </Link>
  );
}
