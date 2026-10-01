import express from "express";
import rateLimit from "express-rate-limit";
import { recordEvent, renderPublicSite, trackScript } from "../controllers/public";

const router = express.Router();

// Evita inflar las estadísticas desde una misma IP
const eventsLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiadas peticiones" },
});

router.get("/track.js", trackScript);
router.get("/sites/:publicId", renderPublicSite);
router.post("/sites/:publicId/events", eventsLimiter, recordEvent);

export default router;
