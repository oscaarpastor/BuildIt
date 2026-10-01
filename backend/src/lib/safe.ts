// Reglas compartidas por la validación de entrada y por el render de plantillas.

export const ALLOWED_FONTS = [
  "Inter",
  "Playfair Display",
  "Montserrat",
  "Raleway",
  "Poppins",
] as const;

export type AllowedFont = (typeof ALLOWED_FONTS)[number];

const COLOR_RE = /^#[0-9a-fA-F]{6}$/;
// Caracteres que permitirían salir del atributo HTML o de url('...') en CSS.
const UNSAFE_URL_CHARS = /["'()\\<>`\s]/;

export function isSafeColor(value: string): boolean {
  return COLOR_RE.test(value);
}

export function isAllowedFont(value: string): value is AllowedFont {
  return (ALLOWED_FONTS as readonly string[]).includes(value);
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
