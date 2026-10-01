import express from "express";
import {
  createProject,
  deleteProject,
  exportProject,
  getProject,
  listProjects,
  updateProject,
} from "../controllers/project";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

router.use(requireAuth);

router.get("/", listProjects);
router.post("/", createProject);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id/export", exportProject);

export default router;
