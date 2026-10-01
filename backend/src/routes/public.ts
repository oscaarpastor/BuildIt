import express from "express";
import { renderPublicSite } from "../controllers/public";

const router = express.Router();

router.get("/sites/:publicId", renderPublicSite);

export default router;
