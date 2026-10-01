import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { BaseTemplate } from "../models/BaseTemplate";
import { notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";

// Las plantillas base solo se gestionan con el seed: la API es de solo lectura.

export const listBaseTemplates = async (_req: Request, res: Response) => {
  const templates = await BaseTemplate.find()
    .select("name description icon gradient view")
    .sort({ createdAt: 1 });
  res.json(templates);
};

export const previewBaseTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string" || !isValidObjectId(id)) throw notFound("Plantilla no encontrada");
  const template = await BaseTemplate.findById(id);
  if (!template) throw notFound("Plantilla no encontrada");

  res.type("html").send(await renderSite(template, "public"));
};
