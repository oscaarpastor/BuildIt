import crypto from "crypto";
import fs from "fs";
import path from "path";
import ejs from "ejs";
import { FONT_CATALOG, FONT_FALLBACK, isAllowedFont, isSafeColor, isSafeLink, isSafeMediaUrl, type AllowedFont } from "./safe";
import { conformConfig, isBlank, type ConformedConfig } from "./configShape";
import { SITE_ICONS } from "./siteIcons";
import { COMMON_STRINGS, SECTION_NAMES } from "./siteStrings";
import { DEFAULT_VIEW, getTemplate } from "../templates";
import type { SectionKey, TemplateDefinition, TemplateLanguage } from "../templates/types";

export const VIEWS_DIR = path.join(__dirname, "..", "views");
const BASE_CSS_PATH = path.join(VIEWS_DIR, "partials", "base.css");
const PRODUCTION = process.env.NODE_ENV === "production";

// "preview": miniaturas y vista previa del editor (sin estadísticas ni animación de entrada)
// "public": enlace compartido
// "export": HTML descargable
export type RenderMode = "preview" | "public" | "export";

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
const LINK_KEYS = new Set(["ctaLink", "secondaryCtaLink", "buttonLink", "link", "url"]);

const DEFAULT_PRIMARY = "#3b82f6";
const DEFAULT_SECONDARY = "#93c5fd";
const DEFAULT_FONT: AllowedFont = "Inter";

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

type Theme = {
  colorPrimary: string;
  colorSecondary: string;
  fontFamily: AllowedFont;
  fontBody: AllowedFont;
  darkMode: boolean;
  language: TemplateLanguage;
};

/** Colores, letras e idioma válidos; lo que falte sale de la plantilla. */
function resolveTheme(raw: unknown, template?: TemplateDefinition): Theme {
  const theme = (raw ?? {}) as Record<string, unknown>;
  const base = (template?.config.theme ?? {}) as Record<string, unknown>;
  const fontFamily = isAllowedFont(theme.fontFamily)
    ? theme.fontFamily
    : isAllowedFont(base.fontFamily)
      ? base.fontFamily
      : DEFAULT_FONT;
  const fontBody = isAllowedFont(theme.fontBody)
    ? theme.fontBody
    : isAllowedFont(base.fontBody)
      ? base.fontBody
      : fontFamily;
  return {
    colorPrimary: isSafeColor(String(theme.colorPrimary ?? "")) ? String(theme.colorPrimary) : DEFAULT_PRIMARY,
    colorSecondary: isSafeColor(String(theme.colorSecondary ?? "")) ? String(theme.colorSecondary) : DEFAULT_SECONDARY,
    fontFamily,
    fontBody,
    darkMode: Boolean(theme.darkMode),
    language: theme.language === "en" ? "en" : "es",
  };
}

/** Configuración saneada y completa, tal y como la reciben las plantillas. */
export function sanitizeConfig(raw: unknown, template?: TemplateDefinition) {
  const config = conformConfig(sanitizeValue(raw ?? {}, "", ""), {
    defaultHeadings: template?.config.headings,
    dropBlankItems: true,
  });
  config.theme = resolveTheme(config.theme, template);
  return config as ConformedConfig & { theme: Theme };
}

/**
 * Contenido para el editor: con todos los campos (también los añadidos después
 * de crear la web) y las cabeceras y letras de la plantilla donde falten.
 */
export function editableConfig(raw: unknown, view: string | null | undefined) {
  const template = getTemplate(view);
  const config = conformConfig(raw, { defaultHeadings: template?.config.headings });
  const theme = resolveTheme(config.theme, template);
  const saved = config.theme as Record<string, unknown>;
  config.theme = {
    colorPrimary: isSafeColor(String(saved.colorPrimary ?? "")) ? saved.colorPrimary : theme.colorPrimary,
    colorSecondary: isSafeColor(String(saved.colorSecondary ?? "")) ? saved.colorSecondary : theme.colorSecondary,
    fontFamily: theme.fontFamily,
    fontBody: theme.fontBody,
    darkMode: theme.darkMode,
    language: theme.language,
  };
  return config;
}

// ---------- Color: contraste automático con cualquier color que elija la persona ----------

type RGB = [number, number, number];

const toRgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const toHex = (rgb: RGB) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
const channel = (c: number) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]: RGB) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
function contrast(a: RGB, b: RGB) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as RGB;

const WHITE: RGB = [255, 255, 255];
const INK: RGB = [22, 24, 29];
const LIGHT_BG: RGB = [255, 255, 255];
const DARK_BG: RGB = [13, 15, 18];

/** El color, oscurecido o aclarado lo justo para leerse como texto sobre bg. */
function readableTint(hex: string, bg: RGB, target = 4.6): string {
  const color = toRgb(hex);
  const towards = luminance(bg) > 0.5 ? ([0, 0, 0] as RGB) : WHITE;
  for (let t = 0; t <= 1.0001; t += 0.04) {
    const mixed = mixRgb(color, towards, t);
    if (contrast(mixed, bg) >= target) return toHex(mixed);
  }
  return toHex(towards);
}

/** Texto blanco o casi negro, el que mejor se lea sobre ese color de fondo. */
function textOn(hex: string): string {
  const color = toRgb(hex);
  const white = contrast(color, WHITE);
  return white >= 3.2 || white >= contrast(color, INK) ? "#ffffff" : toHex(INK);
}

const fontStack = (font: AllowedFont) => `"${font}", ${FONT_FALLBACK[FONT_CATALOG[font].kind]}`;

function themeCss(theme: Theme): string {
  const vars = (name: string, hex: string) => ({
    [`--${name}`]: hex,
    [`--on-${name}`]: textOn(hex),
    [`--${name}-on-light`]: readableTint(hex, LIGHT_BG),
    [`--${name}-on-dark`]: readableTint(hex, DARK_BG),
  });
  const root = {
    ...vars("primary", theme.colorPrimary),
    ...vars("secondary", theme.colorSecondary),
    "--primary-ink": "var(--primary-on-light)",
    "--secondary-ink": "var(--secondary-on-light)",
    "--font-heading": fontStack(theme.fontFamily),
    "--font-body": fontStack(theme.fontBody),
  };
  const decl = (o: Record<string, string>) =>
    Object.entries(o)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
  return `:root{${decl(root)}}html.bi-dark{--primary-ink:var(--primary-on-dark);--secondary-ink:var(--secondary-on-dark)}`;
}

function fontsHref(theme: Theme): string {
  const families = [...new Set([theme.fontFamily, theme.fontBody])].map(
    (font) => `family=${font.replace(/ /g, "+")}:${FONT_CATALOG[font].spec}`
  );
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

// ---------- Ayudantes para las plantillas ----------

const esc = (value: unknown) => ejs.escapeXML(String(value ?? ""));

/** Icono de la colección por nombre; si no es un nombre conocido (un emoji de una web antigua), el texto. */
function icon(name: string, className = "icon"): string {
  const paths = SITE_ICONS[name];
  if (paths) {
    return `<svg class="${esc(className)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  }
  if (!name) return "";
  return `<span class="${esc(className)} icon-emoji" aria-hidden="true">${esc(name)}</span>`;
}

const UNSPLASH_WIDTHS = [480, 800, 1200, 1600, 2000];

function unsplashVariant(url: URL, width: number) {
  const out = new URL(url.href);
  out.searchParams.set("w", String(width));
  if (!out.searchParams.has("auto")) out.searchParams.set("auto", "format");
  if (!out.searchParams.has("fit")) out.searchParams.set("fit", "crop");
  if (!out.searchParams.has("q")) out.searchParams.set("q", "75");
  return out.href;
}

type ImgOptions = {
  class?: string;
  /** Atributo sizes (por defecto, todo el ancho de la pantalla). */
  sizes?: string;
  /** Carga inmediata para lo que se ve al abrir la página (portada, logo). */
  eager?: boolean;
  /** Icono del hueco cuando no hay imagen. */
  placeholder?: string;
  /** Ancho máximo que se pide a Unsplash para el src (por defecto, 1600). */
  width?: number;
};

/**
 * <img> optimizada (srcset para Unsplash, carga diferida). Sin URL devuelve un
 * hueco decorado con la misma clase para que la maquetación no cambie.
 */
function img(src: string, alt = "", options: ImgOptions = {}): string {
  const className = options.class ?? "";
  if (!src) {
    const label = alt ? ` role="img" aria-label="${esc(alt)}"` : ' aria-hidden="true"';
    return `<div class="ph ${esc(className)}"${label}>${icon(options.placeholder ?? "image", "")}</div>`;
  }
  let finalSrc = src;
  let srcset = "";
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") {
      finalSrc = unsplashVariant(url, options.width ?? 1600);
      srcset = UNSPLASH_WIDTHS.filter((w) => w <= Math.max(options.width ?? 2000, 480))
        .map((w) => `${unsplashVariant(url, w)} ${w}w`)
        .join(", ");
    }
  } catch {
    // URL ya validada; si no se puede analizar se usa tal cual
  }
  const attrs = [
    `src="${esc(finalSrc)}"`,
    srcset ? `srcset="${esc(srcset)}" sizes="${esc(options.sizes ?? "100vw")}"` : "",
    `alt="${esc(alt)}"`,
    className ? `class="${esc(className)}"` : "",
    options.eager ? 'fetchpriority="high"' : 'loading="lazy"',
    'decoding="async"',
  ].filter(Boolean);
  return `<img ${attrs.join(" ")}>`;
}

/** Párrafos de un texto largo: línea en blanco = párrafo nuevo, salto simple = <br>. */
function paras(text: string, className = ""): string {
  const cls = className ? ` class="${esc(className)}"` : "";
  return String(text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p${cls}>${p.split("\n").map(esc).join("<br>")}</p>`)
    .join("");
}

/** Una entrada por línea (ventajas de un plan, horario...). */
const lines = (text: string) =>
  String(text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

function initials(name: string): string {
  const words = String(name ?? "")
    .replace(/[@#]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "";
  const letters = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[words.length - 1][0];
  return letters.toUpperCase();
}

const telHref = (phone: string) => {
  const clean = String(phone ?? "").replace(/[^\d+]/g, "");
  return clean ? `tel:${clean}` : "";
};
const mailHref = (email: string) => (/^[^\s@<>"']+@[^\s@<>"']+$/.test(email ?? "") ? `mailto:${email}` : "");
const mapsHref = (address: string) =>
  address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : "";

function waHref(number: string, language: TemplateLanguage): string {
  let digits = String(number ?? "").replace(/\D/g, "");
  if (!digits) return "";
  // Número español sin prefijo de país
  if (digits.length === 9 && /^[6789]/.test(digits) && language === "es") digits = `34${digits}`;
  return `https://wa.me/${digits}`;
}

/** Atributos de un enlace: href seguro y, si sale de la web, en pestaña nueva. */
function linkAttrs(href: string): string {
  const value = href && isSafeLink(href) ? href : "#";
  const external = /^https?:\/\//i.test(value);
  return `href="${esc(value)}"${external ? ' target="_blank" rel="noopener"' : ""}`;
}

/** Vídeo de YouTube o Vimeo incrustado, archivo de vídeo o, si no, enlace con portada. */
function video(url: string, thumbnail: string, title: string, labels: { play: string }): string {
  if (!url) return "";
  let embed = "";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    let id = "";
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1] ?? "";
    }
    if (/^[\w-]{11}$/.test(id)) embed = `https://www.youtube-nocookie.com/embed/${id}`;
    const vimeo = host === "vimeo.com" ? u.pathname.match(/^\/(\d+)/)?.[1] : host === "player.vimeo.com" ? u.pathname.match(/^\/video\/(\d+)/)?.[1] : undefined;
    if (vimeo) embed = `https://player.vimeo.com/video/${vimeo}`;
  } catch {
    return "";
  }
  if (embed) {
    return `<div class="video-frame"><iframe src="${esc(embed)}" title="${esc(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
  }
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    const poster = thumbnail ? ` poster="${esc(thumbnail)}"` : "";
    return `<div class="video-frame"><video src="${esc(url)}"${poster} controls preload="metadata" playsinline></video></div>`;
  }
  const cover = img(thumbnail, "", { placeholder: "film", sizes: "(min-width: 1200px) 1100px, 100vw" });
  return `<a class="video-frame video-link" ${linkAttrs(url)} aria-label="${esc(labels.play)}">${cover}<span class="play"><span>${icon("play", "")}</span></span></a>`;
}

// Script de las webs: cierra el menú móvil al elegir un enlace, al pulsar fuera
// o con Escape, y en la vista previa del editor evita salir de la página. La CSP
// de las webs lo permite por su hash (SITE_SCRIPT_CSP_HASH).
const SITE_SCRIPT = `(function(){var d=document,menus=d.querySelectorAll("[data-menu]");d.addEventListener("click",function(e){var t=e.target;for(var i=0;i<menus.length;i++){var m=menus[i];if(m.open&&(!m.contains(t)||(t.closest&&t.closest(".menu-panel a"))))m.open=false}if(d.documentElement.classList.contains("bi-preview")){var a=t.closest&&t.closest("a[href]");if(a&&a.getAttribute("href").charAt(0)!=="#")e.preventDefault()}});d.addEventListener("keydown",function(e){if(e.key!=="Escape")return;for(var i=0;i<menus.length;i++){if(menus[i].open){menus[i].open=false;menus[i].querySelector("summary").focus()}}})})();`;

export const SITE_SCRIPT_CSP_HASH = `'sha256-${crypto.createHash("sha256").update(SITE_SCRIPT).digest("base64")}'`;

const trackingScript = (publicId: string) =>
  `<script src="/api/public/track.js" data-site="${publicId}" defer></script>`;

let baseCssCache = "";
function baseCss(): string {
  if (!baseCssCache || !PRODUCTION) baseCssCache = fs.readFileSync(BASE_CSS_PATH, "utf8");
  return baseCssCache;
}

function favicon(config: ConformedConfig, theme: Theme): string {
  if (config.brand.logo) return config.brand.logo;
  const letter = esc((config.brand.name.trim()[0] ?? "B").toUpperCase());
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${theme.colorPrimary}"/><text x="32" y="33" dominant-baseline="central" text-anchor="middle" font-family="system-ui,sans-serif" font-size="34" font-weight="700" fill="${textOn(theme.colorPrimary)}">${letter}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Secciones que no van en el menú de navegación
const NOT_IN_NAV = new Set<SectionKey>(["brand", "hero", "cta", "footer"]);

export async function renderSite(
  site: RenderableSite,
  mode: RenderMode,
  options: RenderOptions = {}
): Promise<string> {
  const template = getTemplate(site.view) ?? getTemplate(DEFAULT_VIEW)!;
  const view = template.view;
  const hidden = new Set(site.hiddenSections ?? []);
  const raw =
    site.config && typeof (site.config as { toObject?: () => unknown }).toObject === "function"
      ? (site.config as { toObject: () => unknown }).toObject()
      : site.config;
  const config = sanitizeConfig(raw, template);
  const theme = config.theme;
  const lang = theme.language;
  const strings = { ...COMMON_STRINGS[lang], ...(template.strings?.[lang] ?? {}) };
  const t = (key: string) => strings[key] ?? key;

  const sectionName = (key: SectionKey) =>
    template.text[lang].sections[key] ?? (key === "brand" ? "" : SECTION_NAMES[lang][key]);

  const hasContent = (key: SectionKey): boolean => {
    if (key === "brand" || key === "footer") return true;
    if (key === "hero") return !isBlank(config.hero);
    if (key === "video") return config.video.url !== "";
    return !isBlank(config[key]);
  };
  /** La sección se pinta: no está oculta y tiene contenido. */
  const show = (key: SectionKey) => !hidden.has(key) && hasContent(key);

  const heading = (key: keyof ConformedConfig["headings"]) =>
    config.headings[key] ?? { eyebrow: "", title: "", subtitle: "" };

  const nav = template.sections
    .filter((key) => !NOT_IN_NAV.has(key) && show(key))
    .map((key) => {
      const eyebrow = (config.headings as Record<string, { eyebrow: string }>)[key]?.eyebrow?.trim() ?? "";
      return { key, href: `#${key}`, label: eyebrow && eyebrow.length <= 22 ? eyebrow : sectionName(key) };
    });

  /** Enlaces del menú de escritorio (como mucho `limit`). */
  const navLinks = ({ limit = 6, exclude = [] as string[], className = "nav-links" } = {}) => {
    const items = nav.filter((item) => !exclude.includes(item.key)).slice(0, limit);
    if (items.length === 0) return "";
    return `<nav class="${esc(className)}" aria-label="${esc(t("mainNav"))}">${items
      .map((item) => `<a href="${item.href}">${esc(item.label)}</a>`)
      .join("")}</nav>`;
  };

  /** Menú desplegable para móvil, con todos los enlaces y un botón opcional. */
  const mobileMenu = ({ cta }: { cta?: { text: string; href: string; class?: string } } = {}) => {
    const links = nav.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join("");
    const button =
      cta && cta.text ? `<a class="btn ${esc(cta.class ?? "btn-primary")}" ${linkAttrs(cta.href)}>${esc(cta.text)}</a>` : "";
    if (!links && !button) return "";
    return `<details class="menu" data-menu><summary aria-label="${esc(t("openMenu"))}">${icon("menu", "icon-open")}${icon("x", "icon-close")}</summary><div class="menu-panel"><nav aria-label="${esc(t("menu"))}">${links}</nav>${button}</div></details>`;
  };

  const htmlClasses = [theme.darkMode ? "bi-dark" : "", mode === "preview" ? "bi-preview" : ""].filter(Boolean);
  const htmlAttrs = `lang="${lang}"${htmlClasses.length ? ` class="${htmlClasses.join(" ")}"` : ""}`;

  const pageTitle = [config.brand.name, config.hero.title].filter(Boolean).join(" · ") || template.text[lang].name;
  const description = config.hero.subtitle || config.about.content.slice(0, 160);
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(pageTitle)}</title>`,
    description ? `<meta name="description" content="${esc(description)}">` : "",
    `<meta property="og:title" content="${esc(pageTitle)}">`,
    description ? `<meta property="og:description" content="${esc(description)}">` : "",
    '<meta property="og:type" content="website">',
    config.hero.backgroundImage ? `<meta property="og:image" content="${esc(config.hero.backgroundImage)}">` : "",
    `<meta name="theme-color" content="${theme.colorPrimary}">`,
    `<link rel="icon" href="${esc(favicon(config, theme))}">`,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `<link rel="stylesheet" href="${esc(fontsHref(theme))}">`,
    `<style id="bi-base">${themeCss(theme)}\n${baseCss()}</style>`,
  ]
    .filter(Boolean)
    .join("\n  ");

  const whatsapp = !hidden.has("contact") ? waHref(config.contact.whatsapp, lang) : "";
  const foot = [
    whatsapp
      ? `<a class="wa-float" href="${esc(whatsapp)}" target="_blank" rel="noopener" aria-label="${esc(t("writeWhatsapp"))}">${icon("message-circle", "")}<span>${esc(t("whatsapp"))}</span></a>`
      : "",
    `<script>${SITE_SCRIPT}</script>`,
    mode === "public" && options.trackingId && /^[\w-]+$/.test(options.trackingId)
      ? trackingScript(options.trackingId)
      : "",
  ]
    .filter(Boolean)
    .join("\n  ");

  const madeWith = `<p class="made-with">${esc(t("madeWith"))} Build It</p>`;
  const year = new Date().getFullYear();
  // «© 2026 Marca. Todos los derechos reservados.», sin punto doble si la marca ya acaba en punto
  const copyright = (name: string) => {
    const brand = name.trim();
    const signed = brand ? `${esc(brand)}${/[.!?]$/.test(brand) ? "" : "."} ` : "";
    return `© ${year} ${signed}${esc(t("rights"))}`;
  };

  return ejs.renderFile(
    path.join(VIEWS_DIR, `${view}.ejs`),
    {
      config,
      theme,
      lang,
      mode,
      preview: mode === "preview",
      year,
      copyright,
      htmlAttrs,
      head,
      foot,
      madeWith,
      show,
      heading,
      nav,
      navLinks,
      mobileMenu,
      sectionName,
      t,
      esc,
      icon,
      img,
      paras,
      lines,
      initials,
      telHref,
      mailHref,
      mapsHref,
      waHref: (number: string) => waHref(number, lang),
      linkAttrs,
      video: (url: string, thumbnail: string, title = "") => video(url, thumbnail, title, { play: t("playVideo") }),
    },
    { cache: PRODUCTION, async: false }
  );
}
