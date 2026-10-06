import { BaseTemplate } from "../models/BaseTemplate";
import { projectConfigSchema } from "../validation/schemas";
import { TEMPLATES } from ".";

/**
 * Guarda en la base de datos las plantillas del catálogo. Es idempotente:
 * actualiza por "view", así que el _id de cada plantilla no cambia y los
 * proyectos que apuntan a ella siguen funcionando. El contenido de ejemplo pasa
 * por la misma validación que el de los usuarios.
 */
export async function syncBaseTemplates(log: (line: string) => void = () => {}) {
  let synced = 0;
  for (const template of TEMPLATES) {
    // Una plantilla con el ejemplo mal escrito no impide arrancar: se avisa y se salta
    const parsed = projectConfigSchema.safeParse(template.config);
    if (!parsed.success) {
      console.error(`Plantilla ${template.view} sin sincronizar: contenido de ejemplo no válido\n${parsed.error.message}`);
      continue;
    }
    const config = parsed.data;
    await BaseTemplate.findOneAndUpdate(
      { view: template.view },
      {
        name: template.text.es.name,
        description: template.text.es.description,
        view: template.view,
        icon: "",
        gradient: "",
        config,
      },
      { upsert: true, setDefaultsOnInsert: true }
    );
    log(`  - ${template.text.es.name} (${template.view})`);
    synced += 1;
  }
  return synced;
}
