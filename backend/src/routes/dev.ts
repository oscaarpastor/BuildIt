import express, { Request, Response } from "express";
import { notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";
import { applyVariant, PREVIEW_VARIANTS, type PreviewVariant } from "../lib/previewVariants";
import { projectConfigSchema } from "../validation/schemas";
import { getTemplate, TEMPLATES } from "../templates";

// Solo en desarrollo: pinta cualquier plantilla directamente desde el código
// (src/templates), sin base de datos ni cuenta, con variantes de contenido para
// revisarlas. La usa e2e/scripts/capturas-plantillas.mjs.
const router = express.Router();

router.get("/templates", (_req: Request, res: Response) => {
  res.json({ views: TEMPLATES.map((t) => t.view), variants: PREVIEW_VARIANTS });
});

router.get("/preview/:view", async (req: Request, res: Response) => {
  const template = getTemplate(String(req.params.view));
  if (!template) throw notFound("Plantilla no encontrada");
  const variant = (PREVIEW_VARIANTS as readonly string[]).includes(String(req.query.variant))
    ? (req.query.variant as PreviewVariant)
    : "full";
  // La misma validación que el contenido de un usuario: si el ejemplo no la pasa, se ve el error
  const parsed = projectConfigSchema.safeParse(template.config);
  if (!parsed.success) {
    res.status(500).type("text").send(`El contenido de ejemplo de ${template.view} no es válido:\n${parsed.error.message}`);
    return;
  }
  const { config, hiddenSections } = applyVariant(parsed.data, variant);
  const mode = req.query.mode === "public" ? "public" : "preview";
  res.type("html").send(await renderSite({ view: template.view, config, hiddenSections }, mode));
});

export default router;
