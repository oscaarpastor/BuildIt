import type { TFunction } from "i18next";
import type { BaseTemplate, Project, SectionKey } from "../types";

/**
 * Secciones que pinta cada plantilla, en el orden en que aparecen en la web.
 * Tiene que coincidir con los show("…") de backend/src/views/<plantilla>.ejs;
 * la marca va siempre en la cabecera.
 */
export const TEMPLATE_SECTIONS: Record<string, SectionKey[]> = {
  templateStartup: ["brand", "hero", "features", "program", "products", "about", "testimonials", "faqs", "contact", "footer"],
  templatePortfolio: ["brand", "hero", "about", "features", "gallery", "video", "testimonials", "contact", "footer"],
  templateShop: ["brand", "hero", "products", "features", "gallery", "testimonials", "faqs", "contact", "footer"],
  templateAgencia: ["brand", "hero", "about", "features", "products", "testimonials", "faqs", "contact", "footer"],
  templateBlog: ["brand", "hero", "about", "gallery", "video", "testimonials", "contact", "footer"],
  templateRestaurante: ["brand", "hero", "about", "features", "products", "gallery", "testimonials", "faqs", "contact", "footer"],
};

const ALL_SECTIONS: SectionKey[] = [
  "brand",
  "hero",
  "about",
  "features",
  "products",
  "gallery",
  "video",
  "testimonials",
  "documentation",
  "faqs",
  "inspiration",
  "program",
  "contact",
  "footer",
];

// Vacía = sin texto en ningún campo, también en objetos anidados (p. ej. program.cta1).
export const isEmpty = (value: unknown): boolean => {
  if (value == null || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isEmpty);
  return false;
};

/** Secciones editables de un proyecto. Con una plantilla desconocida, las que tienen contenido. */
export function sectionsOf(project: Pick<Project, "view" | "config">): SectionKey[] {
  return TEMPLATE_SECTIONS[project.view] ?? ALL_SECTIONS.filter((key) => !isEmpty(project.config[key]));
}

/** Nombre de una sección tal y como se llama en esa plantilla («Carta» en el restaurante…). */
export const sectionName = (t: TFunction, view: string, key: SectionKey) =>
  t([`templates.${view}.sections.${key}`, `editPage.sections.${key}`]);

export const templateName = (t: TFunction, tpl: BaseTemplate) =>
  t(`templates.${tpl.view}.name`, { defaultValue: tpl.name });

export const templateDescription = (t: TFunction, tpl: BaseTemplate) =>
  t(`templates.${tpl.view}.description`, { defaultValue: tpl.description ?? "" });
