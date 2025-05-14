import express from "express";
import {
  createStat,
  getStatByProject,
  updateStat,
  deleteStat,
  registerView,
  registerClick
} from "../controllers/stat";

const router = express.Router();

router.post("/", createStat);
router.get("/:projectId", getStatByProject);
router.put("/:projectId", updateStat);
router.delete("/:projectId", deleteStat);
router.post("/:projectId/view", registerView);
router.post("/:projectId/click", registerClick);


export default router;
