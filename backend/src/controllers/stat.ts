import { Request, Response } from "express";
import { Stat } from "../models/Stat";

// Crear stats para un proyecto
export const createStat = async (req: Request, res: Response) => {
  try {
    const { project } = req.body;
    const stat = await Stat.create({ project });
    res.status(201).json(stat);
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear estadísticas" });
  }
};

// Obtener stats por ID de proyecto
export const getStatByProject = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const stat = await Stat.findOne({ project: projectId });
      if (!stat) {
        res.status(404).json({ message: "Stats no encontradas" });
        return;
      }
      res.json(stat);
    } catch (error: any) {
      res.status(500).json({ error: "Error al obtener estadísticas" });
    }
  };
  

// Actualizar manualmente stats
export const updateStat = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const updated = await Stat.findOneAndUpdate(
        { project: projectId },
        req.body,
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ message: "Stats no encontradas" });
        return;
      }
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: "Error al actualizar estadísticas" });
    }
  };
  

// Eliminar stats (si borras el proyecto, por ejemplo)
export const deleteStat = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      await Stat.findOneAndDelete({ project: projectId });
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: "Error al eliminar estadísticas" });
    }
  };


  // Sumar una vista
  export const registerView = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
  
      const updated = await Stat.findOneAndUpdate(
        { project: projectId },
        {
          $inc: { views: 1 },
          $set: { lastAccess: new Date() }
        },
        { new: true }
      );
  
      if (!updated) {
        res.status(404).json({ message: "Stats no encontradas" });
        return;
      }
  
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: "Error al registrar vista" });
    }
  };
  
  
  // Sumar un clic
  export const registerClick = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
  
      const updated = await Stat.findOneAndUpdate(
        { project: projectId },
        { $inc: { clicks: 1 } },
        { new: true }
      );
  
      if (!updated) {
        res.status(404).json({ message: "Stats no encontradas" });
        return;
      }
  
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: "Error al registrar clic" });
    }
  };
  
  
  
