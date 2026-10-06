import type { TemplateDefinition } from "./types";

/** Lo que el frontend necesita saber de una plantilla (sin el contenido de ejemplo). */
export const templateInfo = (template: TemplateDefinition) => ({
  view: template.view,
  category: template.category,
  sections: template.sections,
  text: template.text,
});
