// Letras que se pueden elegir para las webs. Son las mismas que acepta el backend
// (FONT_CATALOG en backend/src/lib/safe.ts); un test del backend comprueba que coinciden.

export type FontKind = "sans" | "serif" | "display" | "mono" | "script";

export const SITE_FONTS: Record<string, FontKind> = {
  Inter: "sans",
  "Inter Tight": "sans",
  Geist: "sans",
  "DM Sans": "sans",
  Manrope: "sans",
  "Plus Jakarta Sans": "sans",
  Outfit: "sans",
  Figtree: "sans",
  "Instrument Sans": "sans",
  "Public Sans": "sans",
  "Nunito Sans": "sans",
  Karla: "sans",
  Lexend: "sans",
  Jost: "sans",
  Poppins: "sans",
  Montserrat: "sans",
  Raleway: "sans",
  "Work Sans": "sans",
  Archivo: "sans",
  "Space Grotesk": "sans",
  Sora: "sans",
  "Bricolage Grotesque": "sans",
  Syne: "display",
  Unbounded: "display",
  Oswald: "display",
  Anton: "display",
  "Bebas Neue": "display",
  "Playfair Display": "serif",
  Fraunces: "serif",
  "Cormorant Garamond": "serif",
  Lora: "serif",
  "EB Garamond": "serif",
  Newsreader: "serif",
  "Libre Caslon Text": "serif",
  "Bodoni Moda": "serif",
  "DM Serif Display": "serif",
  "Instrument Serif": "serif",
  "Young Serif": "serif",
  Italiana: "serif",
  "JetBrains Mono": "mono",
  "Geist Mono": "mono",
  "Space Mono": "mono",
  Caveat: "script",
};

/** Orden de los grupos en el selector. */
export const FONT_KINDS: FontKind[] = ["sans", "serif", "display", "mono", "script"];
