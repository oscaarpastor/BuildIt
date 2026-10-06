import type { z } from "zod";
import type { projectConfigSchema, SECTION_KEYS } from "../validation/schemas";

/** Una sección de la web, incluida la marca de la cabecera. */
export type SectionKey = "brand" | (typeof SECTION_KEYS)[number];

export const TEMPLATE_CATEGORIES = [
  "business",
  "food",
  "health",
  "creative",
  "shop",
  "events",
  "education",
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export type TemplateLanguage = "es" | "en";

type TemplateText = {
  /** Nombre corto de la plantilla («Restaurante»). */
  name: string;
  /** Una frase: para quién es y qué trae. */
  description: string;
  /** Nombre de las secciones en esta plantilla («Carta» en vez de «Productos»). */
  sections: Partial<Record<SectionKey, string>>;
};

export type TemplateDefinition = {
  /** Nombre del archivo .ejs de views/ (sin extensión). */
  view: string;
  category: TemplateCategory;
  /** Secciones que pinta la plantilla, en el orden en que aparecen. */
  sections: SectionKey[];
  text: Record<TemplateLanguage, TemplateText>;
  /** Textos fijos propios de la plantilla, por idioma (se leen con t("clave")). */
  strings?: Record<TemplateLanguage, Record<string, string>>;
  /** Contenido de ejemplo; pasa por la misma validación que el de los usuarios. */
  config: z.input<typeof projectConfigSchema>;
};
