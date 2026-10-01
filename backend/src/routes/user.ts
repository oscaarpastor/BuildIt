import express from "express";
import { updateMe } from "../controllers/user";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

router.put("/me", requireAuth, updateMe);

export default router;
