import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Project } from "../models/Project";
import { BaseTemplate } from "../models/BaseTemplate";
import { Stat } from "../models/Stat";
import { currentUserId } from "../middleware/auth";
import { HttpError, notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";
import { createProjectSchema, updateProjectSchema } from "../validation/schemas";

const PROJECT_NOT_FOUND = "Proyecto no encontrado";

// Devuelve el proyecto solo si pertenece al usuario autenticado. Si no existe
// o es de otra persona se responde igual (404) para no revelar su existencia.
async function findOwnedProject(req: Request) {
  const { id } = req.params;
  if (typeof id !== "string" || !isValidObjectId(id)) throw notFound(PROJECT_NOT_FOUND);
  const project = await Project.findOne({ _id: id, user: currentUserId(req) });
  if (!project) throw notFound(PROJECT_NOT_FOUND);
  return project;
}

export const listProjects = async (req: Request, res: Response) => {
  const projects = await Project.find({ user: currentUserId(req) })
    .select("name publicId createdAt updatedAt view")
    .sort({ createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const { templateId, name } = createProjectSchema.parse(req.body);

  const template = await BaseTemplate.findById(templateId);
  if (!template) throw new HttpError(400, "Plantilla no encontrada");

  const project = await Project.create({
    name,
    user: currentUserId(req),
    config: template.config,
    originTemplate: template._id,
    view: template.view,
  });
  res.status(201).json(project);
};

export const getProject = async (req: Request, res: Response) => {
  res.json(await findOwnedProject(req));
};

export const updateProject = async (req: Request, res: Response) => {
  const data = updateProjectSchema.parse(req.body);
  const project = await findOwnedProject(req);

  if (data.name !== undefined) project.name = data.name;
  if (data.config !== undefined) project.set("config", data.config);
  if (data.hiddenSections !== undefined) project.hiddenSections = data.hiddenSections;

  await project.save();
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const project = await findOwnedProject(req);
  await Promise.all([project.deleteOne(), Stat.deleteOne({ project: project._id })]);
  res.status(204).send();
};

export const exportProject = async (req: Request, res: Response) => {
  const project = await findOwnedProject(req);
  // Se usa la vista guardada en el propio proyecto: no depende de que la
  // plantilla base siga existiendo (E5a).
  const html = await renderSite(project, "export");
  const filename = project.name.replace(/[^\w.-]+/g, "_").slice(0, 80) || "web";

  res.setHeader("Content-Disposition", `attachment; filename="${filename}.html"`);
  res.type("html").send(html);
};
