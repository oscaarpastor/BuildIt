// Reglas compartidas por la validación de entrada y por el render de plantillas.

// Fuentes de Google Fonts que se pueden elegir. "spec" es el trozo de la
// petición a la API css2 con los ejes que existen en cada familia: si se piden
// pesos que la familia no tiene, Google responde con error y la web se queda
// sin letra (comprobadas una a una).
export const FONT_CATALOG = {
  Inter: { kind: "sans", spec: "wght@300..800" },
  "Inter Tight": { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Geist: { kind: "sans", spec: "wght@300..800" },
  "DM Sans": { kind: "sans", spec: "ital,opsz,wght@0,9..40,300..800;1,9..40,300..800" },
  Manrope: { kind: "sans", spec: "wght@300..800" },
  "Plus Jakarta Sans": { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Outfit: { kind: "sans", spec: "wght@300..800" },
  Figtree: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  "Instrument Sans": { kind: "sans", spec: "ital,wdth,wght@0,75..100,400..700;1,75..100,400..700" },
  "Public Sans": { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  "Nunito Sans": { kind: "sans", spec: "ital,opsz,wght@0,6..12,300..800;1,6..12,300..800" },
  Karla: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Lexend: { kind: "sans", spec: "wght@300..800" },
  Jost: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Poppins: { kind: "sans", spec: "ital,wght@0,300;0,400;0,500;0,600;0,700;1,400" },
  Montserrat: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Raleway: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  "Work Sans": { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  Archivo: { kind: "sans", spec: "ital,wght@0,300..800;1,300..800" },
  "Space Grotesk": { kind: "sans", spec: "wght@300..700" },
  Sora: { kind: "sans", spec: "wght@300..800" },
  "Bricolage Grotesque": { kind: "sans", spec: "opsz,wght@12..96,300..800" },
  Syne: { kind: "display", spec: "wght@400..800" },
  Unbounded: { kind: "display", spec: "wght@300..800" },
  Oswald: { kind: "display", spec: "wght@300..700" },
  Anton: { kind: "display", spec: "wght@400" },
  "Bebas Neue": { kind: "display", spec: "wght@400" },
  "Playfair Display": { kind: "serif", spec: "ital,wght@0,400..800;1,400..800" },
  Fraunces: { kind: "serif", spec: "ital,opsz,wght@0,9..144,300..800;1,9..144,300..800" },
  "Cormorant Garamond": { kind: "serif", spec: "ital,wght@0,300..700;1,300..700" },
  Lora: { kind: "serif", spec: "ital,wght@0,400..700;1,400..700" },
  "EB Garamond": { kind: "serif", spec: "ital,wght@0,400..800;1,400..800" },
  Newsreader: { kind: "serif", spec: "ital,opsz,wght@0,6..72,300..800;1,6..72,300..800" },
  "Libre Caslon Text": { kind: "serif", spec: "ital,wght@0,400;0,700;1,400" },
  "Bodoni Moda": { kind: "serif", spec: "ital,opsz,wght@0,6..96,400..800;1,6..96,400..800" },
  "DM Serif Display": { kind: "serif", spec: "ital@0;1" },
  "Instrument Serif": { kind: "serif", spec: "ital@0;1" },
  "Young Serif": { kind: "serif", spec: "wght@400" },
  Italiana: { kind: "serif", spec: "wght@400" },
  "JetBrains Mono": { kind: "mono", spec: "ital,wght@0,300..800;1,300..800" },
  "Geist Mono": { kind: "mono", spec: "wght@300..800" },
  "Space Mono": { kind: "mono", spec: "ital,wght@0,400;0,700;1,400" },
  Caveat: { kind: "script", spec: "wght@400..700" },
} as const;

export type AllowedFont = keyof typeof FONT_CATALOG;

export const ALLOWED_FONTS = Object.keys(FONT_CATALOG) as [AllowedFont, ...AllowedFont[]];

// Familias de respaldo mientras carga la fuente (o si no carga).
export const FONT_FALLBACK: Record<(typeof FONT_CATALOG)[AllowedFont]["kind"], string> = {
  sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  display: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  serif: 'ui-serif, Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
  script: 'cursive',
};

const COLOR_RE = /^#[0-9a-fA-F]{6}$/;
// Caracteres que permitirían salir del atributo HTML o de url('...') en CSS.
const UNSAFE_URL_CHARS = /["'()\\<>`\s]/;

export function isSafeColor(value: string): boolean {
  return COLOR_RE.test(value);
}

export function isAllowedFont(value: unknown): value is AllowedFont {
  return typeof value === "string" && Object.hasOwn(FONT_CATALOG, value);
}

function isHttpUrl(value: string): boolean {
  if (UNSAFE_URL_CHARS.test(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Imágenes y vídeos: vacío o URL http(s). */
export function isSafeMediaUrl(value: string): boolean {
  return value === "" || isHttpUrl(value);
}

/** Enlaces: vacío, ancla interna (#seccion), mailto:, tel: o URL http(s). */
export function isSafeLink(value: string): boolean {
  if (value === "") return true;
  if (/^#[\w-]*$/.test(value)) return true;
  if (/^mailto:[^\s"'<>()\\`]+$/i.test(value)) return true;
  if (/^tel:[+\d\s().-]+$/i.test(value) && !/["'<>\\`]/.test(value)) return true;
  return isHttpUrl(value);
}
