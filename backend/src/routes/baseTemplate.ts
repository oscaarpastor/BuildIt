import express from "express";
import {
  createBaseTemplate,
  getAllBaseTemplates,
  getBaseTemplateById,
  updateBaseTemplate,
  deleteBaseTemplate,
  cloneBaseTemplateToProject,
  previewBaseTemplate 
} from "../controllers/baseTemplate";

const router = express.Router();

router.post("/", createBaseTemplate);
router.get("/", getAllBaseTemplates);
router.get("/:id", getBaseTemplateById);
router.put("/:id", updateBaseTemplate);
router.delete("/:id", deleteBaseTemplate);
router.post("/:id/clone", cloneBaseTemplateToProject);
router.get("/:id/preview", previewBaseTemplate);

export default router;
