import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  previewProject,
  createProjectFromTemplate
} from "../controllers/project";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id/preview", previewProject);
router.post("/from-template", createProjectFromTemplate);


export default router;
