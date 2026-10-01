import express from "express";
import { listBaseTemplates, previewBaseTemplate } from "../controllers/baseTemplate";

const router = express.Router();

router.get("/", listBaseTemplates);
router.get("/:id/preview", previewBaseTemplate);

export default router;
