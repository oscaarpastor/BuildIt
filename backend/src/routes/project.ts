import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  previewProject,
  createProjectFromTemplate,
  getProjectsByUser
} from "../controllers/project";

import { exportProjectHtml } from "../controllers/exportController";

const router = express.Router();

// Rutas de proyectos
router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id/preview", previewProject);
router.post("/from-template", createProjectFromTemplate);
router.get("/user/:userId", getProjectsByUser);

// ✅ Exportar HTML
router.get("/:id/export", exportProjectHtml);

export default router;
