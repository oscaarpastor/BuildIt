import { Request, Response } from "express";
import { Project } from "../models/Project";
import { BaseTemplate } from "../models/BaseTemplate";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, user, config } = req.body;
    const project = new Project({ name, user, config });
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: "Error creating project" });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate("user");
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate("user");
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: "Error updating project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Error deleting project" });
  }
};

export const previewProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isPreview = req.query.preview === "true";

    const project = await Project.findById(id);
    if (!project) {
      res.status(404).send("Proyecto no encontrado");
      return;
    }

    const data = {
      config: project.config,
      background: "#ffffff",
      textColor: "#111827",
      previewMode: isPreview,
    };

    res.render("template", data);
  } catch (error: any) {
    res.status(500).send("Error al renderizar el proyecto");
  }
};

export const createProjectFromTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId, userId, name } = req.body;

    if (!templateId || !userId || !name) {
      res.status(400).json({ message: "Faltan datos necesarios" });
      return;
    }

    const template = await BaseTemplate.findById(templateId);
    if (!template) {
      res.status(404).json({ message: "Plantilla no encontrada" });
      return;
    }

    const project = new Project({
      name,
      user: userId,
      config: template.config,
      originTemplate: template._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear el proyecto desde plantilla" });
  }
};

export const getProjectsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ user: userId }).populate("user");
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: "Error fetching user projects" });
  }
};
