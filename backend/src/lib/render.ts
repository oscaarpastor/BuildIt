import path from "path";
import ejs from "ejs";
import { ALLOWED_FONTS, isAllowedFont, isSafeColor, isSafeLink, isSafeMediaUrl } from "./safe";

export const VIEWS_DIR = path.join(__dirname, "..", "views");

// "preview": miniaturas y editor (escalado al 60 %)
// "public": enlace compartido
// "export": HTML descargable
export type RenderMode = "preview" | "public" | "export";

type SiteConfig = Record<string, unknown> & {
  theme?: { colorPrimary?: string; colorSecondary?: string; fontFamily?: string; darkMode?: boolean };
  hero?: { backgroundImage?: string };
};

export type RenderableSite = {
  view?: string | null;
  config?: unknown;
  hiddenSections?: string[];
};

export type RenderOptions = {
  /** publicId de la web: si se indica, se añade el script de estadísticas. */
  trackingId?: string;
};

const MEDIA_KEYS = new Set(["logo", "backgroundImage", "image", "avatar", "thumbnail"]);
const LINK_KEYS = new Set(["ctaLink", "link", "url"]);
const DEFAULT_VIEW = "templateStartup";
const KNOWN_VIEWS = new Set([
  "templateStartup",
  "templatePortfolio",
  "templateShop",
  "templateAgencia",
  "templateBlog",
  "templateRestaurante",
]);

const DEFAULT_PRIMARY = "#3b82f6";
const DEFAULT_SECONDARY = "#93c5fd";

// Recorre la configuración y vacía cualquier URL que no sea segura.
// Es una segunda barrera: la validación de entrada ya las rechaza.
function sanitizeValue(value: unknown, key: string, parentKey: string): unknown {
  if (Array.isArray(value)) return value.map((item) => sanitizeValue(item, key, parentKey));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "_id") continue;
      out[k] = sanitizeValue(v, k, key);
    }
    return out;
  }
  if (typeof value !== "string") return value;

  const isVideoUrl = parentKey === "video" && key === "url";
  if (MEDIA_KEYS.has(key) || isVideoUrl) return isSafeMediaUrl(value) ? value : "";
  if (LINK_KEYS.has(key)) return isSafeLink(value) ? value : "#";
  return value;
}

export function sanitizeConfig(raw: unknown): SiteConfig {
  const config = (sanitizeValue(raw ?? {}, "", "") as SiteConfig) || {};
  const theme = config.theme ?? {};
  config.theme = {
    ...theme,
    colorPrimary: isSafeColor(theme.colorPrimary ?? "") ? theme.colorPrimary : DEFAULT_PRIMARY,
    colorSecondary: isSafeColor(theme.colorSecondary ?? "") ? theme.colorSecondary : DEFAULT_SECONDARY,
    fontFamily: isAllowedFont(theme.fontFamily ?? "") ? theme.fontFamily : ALLOWED_FONTS[0],
    darkMode: Boolean(theme.darkMode),
  };
  return config;
}

export function getColors(darkMode: boolean) {
  return darkMode
    ? { background: "#111827", textColor: "#f9fafb" }
    : { background: "#ffffff", textColor: "#111827" };
}

function fontLink(font: string): string {
  const family = encodeURIComponent(font).replace(/%20/g, "+");
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${family}:wght@300;400;600;700&display=swap">`;
}

// Modo oscuro: las plantillas usan clases claras de Tailwind; aquí se
// reasignan a tonos oscuros. Se aplica igual en editor, enlace y exportación.
const DARK_CSS = `<style>
    html.bi-dark .bg-white, html.bi-dark .section-card { background-color: #1f2937 !important; }
    html.bi-dark .bg-gray-50, html.bi-dark .bg-gray-100, html.bi-dark .bg-amber-50 { background-color: #172033 !important; }
    html.bi-dark [class*="from-amber-"], html.bi-dark [style*="#fffbeb"] { background: #1f2937 !important; }
    html.bi-dark .text-gray-600, html.bi-dark .text-gray-700 { color: #d1d5db !important; }
    html.bi-dark .text-black { color: #f9fafb !important; }
    html.bi-dark .border-gray-100, html.bi-dark .border-gray-200,
    html.bi-dark [class*="border-amber-"] { border-color: #374151 !important; }
  </style>`;

const trackingScript = (publicId: string) =>
  `<script src="/api/public/track.js" data-site="${publicId}" defer></script>`;

export async function renderSite(
  site: RenderableSite,
  mode: RenderMode,
  options: RenderOptions = {}
): Promise<string> {
  const view = site.view && KNOWN_VIEWS.has(site.view) ? site.view : DEFAULT_VIEW;
  const hidden = new Set(site.hiddenSections ?? []);
  const config = sanitizeConfig(
    site.config && typeof (site.config as { toObject?: () => unknown }).toObject === "function"
      ? (site.config as { toObject: () => unknown }).toObject()
      : site.config
  );
  const theme = config.theme!;
  const { background, textColor } = getColors(Boolean(theme.darkMode));
  const heroImage = config.hero?.backgroundImage;
  const heroStyle = heroImage
    ? `background-image: url('${heroImage}')`
    : `background-image: linear-gradient(135deg, ${theme.colorPrimary}, ${theme.colorSecondary})`;

  const html = await ejs.renderFile(path.join(VIEWS_DIR, `${view}.ejs`), {
    config,
    background,
    textColor,
    heroStyle,
    previewMode: mode === "preview",
    show: (section: string) => !hidden.has(section),
  });

  const head = [fontLink(theme.fontFamily!), theme.darkMode ? DARK_CSS : ""].join("\n  ");
  let result = html.replace("</head>", `  ${head}\n  </head>`);
  if (theme.darkMode) result = result.replace("<html", '<html class="bi-dark"');
  if (mode === "public" && options.trackingId && /^[\w-]+$/.test(options.trackingId)) {
    result = result.replace("</body>", `  ${trackingScript(options.trackingId)}\n  </body>`);
  }
  return result;
}
