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
};

const MEDIA_KEYS = new Set(["logo", "backgroundImage", "image", "avatar", "thumbnail"]);
const LINK_KEYS = new Set(["ctaLink", "link", "url"]);
const KNOWN_VIEWS = new Set([
  "template",
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

export async function renderSite(site: RenderableSite, mode: RenderMode): Promise<string> {
  const view = site.view && KNOWN_VIEWS.has(site.view) ? site.view : "template";
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
  });

  return html.replace("</head>", `  ${fontLink(theme.fontFamily!)}\n  </head>`);
}
