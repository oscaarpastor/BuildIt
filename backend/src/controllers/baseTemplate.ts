import { Request, Response } from "express";
import { BaseTemplate } from "../models/BaseTemplate";
import { Project } from "../models/Project";

export const createBaseTemplate = async (req: Request, res: Response) => {
  try {
    const { name, description, previewImage, config } = req.body;
    const template = new BaseTemplate({
      name,
      description,
      previewImage,
      config,
    });
    await template.save();
    res.status(201).json(template);
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear baseTemplate" });
  }
};

export const getAllBaseTemplates = async (_req: Request, res: Response) => {
  try {
    const templates = await BaseTemplate.find();
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener baseTemplates" });
  }
};

export const getBaseTemplateById = async (req: Request, res: Response) => {
  try {
    const template = await BaseTemplate.findById(req.params.id);
    if (!template) {
      res.status(404).json({ message: "BaseTemplate no encontrado" });
      return;
    }
    res.json(template);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener baseTemplate" });
  }
};

export const updateBaseTemplate = async (req: Request, res: Response) => {
  try {
    const updated = await BaseTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: "BaseTemplate no encontrado" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar baseTemplate" });
  }
};

export const deleteBaseTemplate = async (req: Request, res: Response) => {
  try {
    await BaseTemplate.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar baseTemplate" });
  }
};

export const cloneBaseTemplateToProject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { userId, name } = req.body;

    const template = await BaseTemplate.findById(id);
    if (!template) {
      res.status(404).json({ message: "BaseTemplate no encontrado" });
      return;
    }

    const newProject = new Project({
      name: name || template.name,
      user: userId,
      config: template.config,
      originTemplate: template._id,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error: any) {
    console.error("Error al clonar baseTemplate:", error);
    res.status(500).json({ error: "Error al clonar baseTemplate" });
  }
};

export const previewBaseTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await BaseTemplate.findById(id);

    if (!template) {
      res.status(404).send("BaseTemplate no encontrada");
      return;
    }

    const data = {
      config: template.config,
      background: "#ffffff",
      textColor: "#111827",
      previewMode: req.query.preview === "true", // ✅ Se añade el modo de previsualización
    };

    res.render("template", data);
  } catch (error: any) {
    res.status(500).send("Error al renderizar la plantilla");
  }
};
