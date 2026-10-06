import { SITE_ICONS } from "../../lib/siteIcons";

/** Icono de la colección que usan las webs generadas (trazos de Lucide). */
export default function SiteIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  const paths = SITE_ICONS[name];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      // Trazos fijos de la colección (lib/siteIcons.ts), no contenido del usuario
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
