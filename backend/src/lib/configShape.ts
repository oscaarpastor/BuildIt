import { HEADING_KEYS } from "../validation/schemas";

// Forma completa del contenido de una web, con todos los campos vacíos. Las
// webs guardadas antes de añadir un campo no lo tienen: conformConfig() las
// completa para que ni las plantillas ni el editor encuentren huecos.

type Shape = string | Shape[] | { [key: string]: Shape };

const heading = () => ({ eyebrow: "", title: "", subtitle: "" });

/** Forma de un elemento de cada lista. */
export const LIST_ITEM_SHAPES = {
  features: { icon: "", title: "", description: "" },
  products: { title: "", description: "", price: "", image: "", badge: "", link: "" },
  gallery: { image: "", caption: "" },
  stats: { value: "", label: "" },
  steps: { label: "", title: "", description: "" },
  team: { name: "", role: "", image: "" },
  testimonials: { name: "", role: "", quote: "", avatar: "" },
  documentation: { title: "", url: "" },
  faqs: { question: "", answer: "" },
  inspiration: { category: "", name: "", image: "", link: "", description: "" },
} as const;

const OBJECT_SHAPES = {
  brand: { name: "", logo: "" },
  hero: {
    eyebrow: "",
    title: "",
    subtitle: "",
    backgroundImage: "",
    ctaText: "",
    ctaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
  },
  about: { heading: "", content: "", image: "" },
  video: { url: "", thumbnail: "" },
  program: {
    title: "",
    image: "",
    reason: "",
    functioning: "",
    methodology: "",
    selection: "",
    cta1: { text: "", link: "" },
    cta2: { text: "", link: "" },
  },
  cta: { title: "", text: "", buttonText: "", buttonLink: "" },
  contact: { email: "", phone: "", address: "", hours: "", whatsapp: "" },
} as const;

const FOOTER_LINK = { label: "", url: "" };

type Dict = Record<string, unknown>;

const isDict = (value: unknown): value is Dict =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function conform(value: unknown, shape: Shape): unknown {
  if (typeof shape === "string") return typeof value === "string" ? value : "";
  if (Array.isArray(shape)) return Array.isArray(value) ? value : [];
  const source = isDict(value) ? value : {};
  const out: Dict = {};
  for (const [key, sub] of Object.entries(shape)) out[key] = conform(source[key], sub);
  return out;
}

/** true si el valor no tiene ningún texto (también en objetos y listas anidados). */
export function isBlank(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.every(isBlank);
  if (typeof value === "object") return Object.values(value).every(isBlank);
  return false;
}

export type Headings = Record<(typeof HEADING_KEYS)[number], { eyebrow: string; title: string; subtitle: string }>;

export type ConformedConfig = Dict & {
  theme: Dict;
  headings: Headings;
  brand: { name: string; logo: string };
  footer: { text: string; links: { label: string; url: string }[] };
} & Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

type ConformOptions = {
  /** Cabeceras de la plantilla para las secciones que la web no tiene guardadas. */
  defaultHeadings?: unknown;
  /** Quita los elementos de lista sin ningún texto (para pintar la web, no para el editor). */
  dropBlankItems?: boolean;
};

/**
 * Devuelve el contenido con todos los campos de la estructura, sin _id ni
 * claves desconocidas. theme se copia tal cual (lo resuelve quien lo use).
 */
export function conformConfig(raw: unknown, options: ConformOptions = {}): ConformedConfig {
  const source = isDict(raw) ? raw : {};
  const out: Dict = { theme: isDict(source.theme) ? { ...source.theme } : {} };

  const savedHeadings = isDict(source.headings) ? source.headings : {};
  const fallbackHeadings = isDict(options.defaultHeadings) ? options.defaultHeadings : {};
  const headings: Dict = {};
  for (const key of HEADING_KEYS) {
    // Una cabecera guardada manda aunque esté vacía (la persona la ha borrado);
    // si no existe, se usa la de la plantilla.
    const saved = savedHeadings[key];
    headings[key] = conform(isDict(saved) ? saved : fallbackHeadings[key], heading());
  }
  out.headings = headings;

  for (const [key, shape] of Object.entries(OBJECT_SHAPES)) out[key] = conform(source[key], shape);

  for (const [key, itemShape] of Object.entries(LIST_ITEM_SHAPES)) {
    const list = Array.isArray(source[key]) ? (source[key] as unknown[]) : [];
    const items = list.map((item) => conform(item, itemShape));
    out[key] = options.dropBlankItems ? items.filter((item) => !isBlank(item)) : items;
  }

  const footer = isDict(source.footer) ? source.footer : {};
  const links = (Array.isArray(footer.links) ? footer.links : []).map((link) => conform(link, FOOTER_LINK));
  out.footer = {
    text: typeof footer.text === "string" ? footer.text : "",
    links: options.dropBlankItems ? links.filter((link) => !isBlank(link)) : links,
  };

  return out as ConformedConfig;
}
