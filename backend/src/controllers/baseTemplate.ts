import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { BaseTemplate } from "../models/BaseTemplate";
import { notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";
import { TEMPLATES } from "../templates";
import { templateInfo } from "../templates/info";

// Las plantillas base se definen en src/templates y se copian a la base de
// datos al arrancar: la API es de solo lectura.

const BY_VIEW = new Map(TEMPLATES.map((template) => [template.view, template]));

export const listBaseTemplates = async (_req: Request, res: Response) => {
  const templates = await BaseTemplate.find().select("name description view").lean();
  const views = [...BY_VIEW.keys()];
  res.json(
    templates
      .filter((tpl) => BY_VIEW.has(tpl.view))
      .sort((a, b) => views.indexOf(a.view) - views.indexOf(b.view))
      .map(({ _id, name, description, view }) => ({ _id, name, description, ...templateInfo(BY_VIEW.get(view)!) }))
  );
};

export const previewBaseTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string" || !isValidObjectId(id)) throw notFound("Plantilla no encontrada");
  const template = await BaseTemplate.findById(id);
  if (!template) throw notFound("Plantilla no encontrada");

  res.type("html").send(await renderSite(template, "preview"));
};
