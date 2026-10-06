import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { Project } from "../models/Project";
import { BaseTemplate } from "../models/BaseTemplate";
import { Stat } from "../models/Stat";
import { currentUserId } from "../middleware/auth";
import { HttpError, notFound } from "../middleware/errors";
import { editableConfig, renderSite } from "../lib/render";
import { getTemplate } from "../templates";
import { templateInfo } from "../templates/info";
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

// Lista los proyectos del usuario con sus estadísticas de visitas y clics.
export const listProjects = async (req: Request, res: Response) => {
  const projects = await Project.find({ user: currentUserId(req) })
    .select("name publicId createdAt updatedAt view")
    .sort({ createdAt: -1 })
    .lean();
  // trusted(): con sanitizeFilter activado, los operadores ($in) escritos por
  // nosotros deben marcarse como seguros explícitamente.
  const stats = await Stat.find({
    project: mongoose.trusted({ $in: projects.map((p) => p._id) }),
  }).lean();
  const byProject = new Map(stats.map((s) => [String(s.project), s]));

  res.json(
    projects.map(({ __v: _v, ...project }) => {
      const stat = byProject.get(String(project._id));
      return {
        ...project,
        stats: { views: stat?.views ?? 0, clicks: stat?.clicks ?? 0, lastAccess: stat?.lastAccess ?? null },
      };
    })
  );
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

// Para el editor: el contenido con todos los campos (también los que se
// añadieron después de crear la web) y la información de su plantilla.
export const getProject = async (req: Request, res: Response) => {
  const project = await findOwnedProject(req);
  const json = project.toJSON() as Record<string, unknown>;
  const template = getTemplate(project.view);
  res.json({
    ...json,
    config: editableConfig(json.config, project.view),
    template: template ? templateInfo(template) : null,
  });
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
