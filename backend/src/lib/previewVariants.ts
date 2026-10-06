// Variantes de contenido para revisar las plantillas en desarrollo (ruta
// /api/dev y e2e/scripts/capturas-plantillas.mjs). Cada una fuerza un caso que
// una plantilla profesional tiene que aguantar sin romperse.

export const PREVIEW_VARIANTS = ["full", "noimg", "dark", "en", "min", "long", "colors", "nohero", "bare"] as const;
export type PreviewVariant = (typeof PREVIEW_VARIANTS)[number];

type Config = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const MEDIA = new Set(["backgroundImage", "image", "avatar", "logo", "thumbnail"]);
const LISTS = ["features", "products", "gallery", "stats", "steps", "team", "testimonials", "faqs"];
const LONG = "texto bastante más largo de lo normal para comprobar que nada se rompe ni se sale de su sitio";

function stripMedia(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripMedia);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, MEDIA.has(k) ? "" : stripMedia(v)]));
  }
  return value;
}

export function applyVariant(source: Config, variant: PreviewVariant): { config: Config; hiddenSections: string[] } {
  const c: Config = structuredClone(source);
  let hiddenSections: string[] = [];
  switch (variant) {
    case "noimg":
      return { config: stripMedia(c) as Config, hiddenSections };
    case "dark":
      c.theme.darkMode = true;
      break;
    case "en":
      c.theme.language = "en";
      break;
    case "colors":
      // Colores claros y saturados: el texto sobre ellos tiene que seguir leyéndose
      c.theme.colorPrimary = "#f5d90a";
      c.theme.colorSecondary = "#a3e635";
      break;
    case "min":
      for (const key of LISTS) c[key] = (c[key] ?? []).slice(0, 1);
      c.hero.eyebrow = "";
      c.hero.secondaryCtaText = "";
      for (const h of Object.values(c.headings ?? {}) as Config[]) h.subtitle = "";
      c.footer.links = (c.footer.links ?? []).slice(0, 1);
      c.contact.hours = "";
      c.contact.whatsapp = "";
      break;
    case "long":
      c.brand.name = `${c.brand.name} y Compañía Internacional`;
      c.hero.title = `${c.hero.title}: ${LONG}`;
      c.hero.subtitle = `${c.hero.subtitle} Con un ${LONG}. Y otro ${LONG}.`;
      if (c.hero.ctaText) c.hero.ctaText += " ahora mismo sin compromiso";
      for (const key of LISTS) {
        const list: Config[] = c[key] ?? [];
        if (!list.length) continue;
        const original = list.length;
        for (let i = original; i < 8; i++) list.push(structuredClone(list[i % original]));
        for (const item of list) {
          for (const field of ["title", "name", "question", "role", "caption", "label"]) {
            if (typeof item[field] === "string" && item[field]) item[field] += " con un nombre bastante largo";
          }
          for (const field of ["description", "quote", "answer"]) {
            if (typeof item[field] === "string" && item[field]) item[field] += ` Con un ${LONG}.`;
          }
          if (typeof item.price === "string" && item.price) item.price = "1.250,00 €/mes";
          if (typeof item.value === "string" && item.value) item.value = "12.500+";
          if (typeof item.badge === "string" && item.badge) item.badge = "Etiqueta muy larga";
        }
        c[key] = list;
      }
      c.contact.email = "una-direccion-de-correo-muy-larga@dominio-larguisimo.es";
      c.contact.address = `Avenida de la Constitución Española de 1978, 123, escalera B, 28001 Madrid`;
      break;
    case "nohero":
      hiddenSections = ["hero"];
      break;
    case "bare":
      // Solo lo mínimo: marca, portada con título y pie
      return {
        config: {
          theme: c.theme,
          brand: { name: c.brand.name, logo: "" },
          hero: { title: c.hero.title },
          footer: { text: "", links: [] },
        },
        hiddenSections,
      };
  }
  return { config: c, hiddenSections };
}
