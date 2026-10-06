import type { TFunction } from "i18next";
import type { BaseTemplate, Project, SectionKey, SiteLanguage, TemplateCategory, TemplateInfo } from "../types";

// Las plantillas se definen en el backend (backend/src/templates): la API cuenta
// de cada una su categoría, sus secciones en orden y sus nombres en es/en.

/** Categorías de la galería de plantillas, en el orden en que se enseñan. */
export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "business",
  "food",
  "health",
  "creative",
  "shop",
  "events",
  "education",
];

const ALL_SECTIONS: SectionKey[] = [
  "brand",
  "hero",
  "about",
  "features",
  "products",
  "gallery",
  "video",
  "stats",
  "steps",
  "team",
  "testimonials",
  "documentation",
  "faqs",
  "inspiration",
  "program",
  "cta",
  "contact",
  "footer",
];

/** Idioma de la interfaz reducido a los que tienen las plantillas. */
export const uiLanguage = (language: string): SiteLanguage => (language.startsWith("en") ? "en" : "es");

// Vacía = sin texto en ningún campo, también en objetos anidados (p. ej. program.cta1).
export const isEmpty = (value: unknown): boolean => {
  if (value == null || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isEmpty);
  return false;
};

/** Secciones editables de un proyecto. Con una plantilla desconocida, las que tienen contenido. */
export function sectionsOf(project: Pick<Project, "template" | "config">): SectionKey[] {
  return project.template?.sections ?? ALL_SECTIONS.filter((key) => !isEmpty(project.config[key]));
}

/** Nombre de una sección tal y como se llama en esa plantilla («Carta» en el restaurante…). */
export const sectionName = (
  t: TFunction,
  language: string,
  template: Pick<TemplateInfo, "text"> | null | undefined,
  key: SectionKey
) => template?.text[uiLanguage(language)]?.sections[key] ?? t(`editPage.sections.${key}`);

export const templateName = (language: string, tpl: BaseTemplate) => tpl.text?.[uiLanguage(language)]?.name ?? tpl.name;

export const templateDescription = (language: string, tpl: BaseTemplate) =>
  tpl.text?.[uiLanguage(language)]?.description ?? tpl.description ?? "";
