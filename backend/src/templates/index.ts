import type { TemplateDefinition } from "./types";
import restaurante from "./catalog/restaurante";
import belleza from "./catalog/belleza";
import reformas from "./catalog/reformas";
import clinica from "./catalog/clinica";
import portfolio from "./catalog/portfolio";
import startup from "./catalog/startup";
import inmobiliaria from "./catalog/inmobiliaria";
import fitness from "./catalog/fitness";
import despacho from "./catalog/despacho";
import terapia from "./catalog/terapia";
import fotografia from "./catalog/fotografia";
import alojamiento from "./catalog/alojamiento";
import boda from "./catalog/boda";
import academia from "./catalog/academia";
import agencia from "./catalog/agencia";
import tienda from "./catalog/tienda";
import blog from "./catalog/blog";

// Catálogo de plantillas, en el orden en que se enseñan al elegir.
// Añadir una plantilla = su vista en views/<view>.ejs + su definición en
// catalog/ + una línea aquí. Ver views/README.md.
export const TEMPLATES: TemplateDefinition[] = [
  restaurante,
  belleza,
  reformas,
  clinica,
  portfolio,
  startup,
  inmobiliaria,
  fitness,
  despacho,
  terapia,
  fotografia,
  alojamiento,
  boda,
  academia,
  agencia,
  tienda,
  blog,
];

const BY_VIEW = new Map(TEMPLATES.map((template) => [template.view, template]));

/** Vista que se usa si una web apunta a una plantilla que ya no existe. */
export const DEFAULT_VIEW = "templateStartup";

export function getTemplate(view: string | null | undefined): TemplateDefinition | undefined {
  return view ? BY_VIEW.get(view) : undefined;
}
