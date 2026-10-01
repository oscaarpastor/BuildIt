import { Request, Response } from "express";
import { Project } from "../models/Project";
import { notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";

const PUBLIC_ID_RE = /^[\w-]{16}$/;

async function findByPublicId(req: Request) {
  const { publicId } = req.params;
  if (typeof publicId !== "string" || !PUBLIC_ID_RE.test(publicId)) throw notFound();
  const project = await Project.findOne({ publicId });
  if (!project) throw notFound();
  return project;
}

// Web generada, accesible por cualquiera que tenga el enlace.
// ?preview=true devuelve la versión reducida que usan el editor y las miniaturas.
export const renderPublicSite = async (req: Request, res: Response) => {
  const project = await findByPublicId(req);
  const mode = req.query.preview === "true" ? "preview" : "public";
  res.type("html").send(await renderSite(project, mode));
};
