import { Request, Response } from "express";
import { Project } from "../models/Project";
import { BaseTemplate } from "../models/BaseTemplate";
import * as ejs from "ejs";
import path from "path";

function getColors(config: any) {
  const isDark = config.theme?.darkMode;
  return {
    background: isDark ? "#111827" : "#ffffff",
    textColor: isDark ? "#ffffff" : "#111827",
  };
}

export const exportProjectHtml = (req: Request, res: Response) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }

      BaseTemplate.findById(project.originTemplate)
        .then((template) => {
          if (!template || !template.view) {
            return res.status(500).json({ error: "Plantilla base no encontrada o inválida" });
          }

          const templatePath = path.resolve(__dirname, `../views/${template.view}.ejs`);
          const { background, textColor } = getColors(project.config);

          const data = {
            config: project.config,
            previewMode: false,
            background,
            textColor,
          };

          ejs.renderFile(templatePath, data, (err, html) => {
            if (err || !html) {
              console.error("❌ Error al renderizar EJS:", err);
              return res.status(500).json({ error: "Error al renderizar el HTML" });
            }

            res.setHeader("Content-Disposition", `attachment; filename="${project.name}.html"`);
            res.setHeader("Content-Type", "text/html");
            res.send(html);
          });
        })
        .catch((err) => {
          console.error("❌ Error buscando plantilla base:", err);
          res.status(500).json({ error: "Error al buscar la plantilla base" });
        });
    })
    .catch((err) => {
      console.error("❌ Error general exportando:", err);
      res.status(500).json({ error: "Error exportando el HTML" });
    });
};
