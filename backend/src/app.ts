import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import { apiNotFound, errorHandler } from "./middleware/errors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import projectRoutes from "./routes/project";
import baseTemplateRoutes from "./routes/baseTemplate";
import publicRoutes from "./routes/public";

// Carpeta donde el build de producción copia el frontend compilado.
export const PUBLIC_DIR = path.join(__dirname, "..", "public");

// CSP de la aplicación React.
const appSecurity = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: null,
    },
  },
});

// CSP de las webs generadas: necesitan Tailwind (CDN), Google Fonts, imágenes
// y vídeos externos, y solo se pueden incrustar desde la propia app.
const siteSecurity = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["https://fonts.gstatic.com"],
      imgSrc: ["https:", "http:", "data:"],
      mediaSrc: ["https:"],
      frameSrc: ["https:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'self'"],
      baseUri: ["'none'"],
      formAction: ["'none'"],
      upgradeInsecureRequests: null,
    },
  },
  xFrameOptions: { action: "sameorigin" },
});

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  // Detrás de un proxy (cloudflared), req.ip sale de X-Forwarded-For solo si la
  // petición llega de un proxy de confianza. Lo usan los limitadores por IP.
  app.set("trust proxy", config.trustProxy);

  // Sin CORS_ORIGINS solo se aceptan peticiones del mismo origen (desarrollo con
  // proxy de Vite y producción sirviendo el frontend desde aquí).
  if (config.corsOrigins.length > 0) {
    app.use(cors({ origin: config.corsOrigins }));
  }

  app.use(express.json({ limit: "200kb" }));

  // Webs generadas
  app.use("/api/public", siteSecurity, publicRoutes);
  app.use("/api/base-templates", (req, res, next) =>
    req.path.endsWith("/preview") ? siteSecurity(req, res, next) : appSecurity(req, res, next)
  );
  app.use("/api/base-templates", baseTemplateRoutes);

  // API privada
  app.use("/api", appSecurity);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api", apiNotFound);

  // Frontend compilado (producción)
  app.use(appSecurity);
  app.use(express.static(PUBLIC_DIR, { index: false }));
  app.get("/{*splat}", (_req, res) => {
    const indexPath = path.join(PUBLIC_DIR, "index.html");
    if (!fs.existsSync(indexPath)) {
      res.status(404).send("Frontend no compilado. Ejecuta npm run build en la raíz.");
      return;
    }
    res.sendFile(indexPath);
  });

  app.use(errorHandler);
  return app;
}
