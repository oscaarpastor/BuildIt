import express from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config";
import { login, me, register } from "../controllers/auth";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

// Límite de intentos por IP para login y registro
const authLimiter = rateLimit({
  windowMs: config.authRateLimit.windowMs,
  limit: config.authRateLimit.max,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados intentos. Vuelve a probar en unos minutos." },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", requireAuth, me);

export default router;
