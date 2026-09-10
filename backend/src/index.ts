import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import projectRoutes from "./routes/project";
import userRoutes from "./routes/user";
import baseTemplateRoutes from "./routes/baseTemplate";
import statRoutes from "./routes/stat";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);
app.use("/api/base-templates", baseTemplateRoutes);
app.use("/api/stats", statRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (_req, res) => {
  const indexPath = path.join(__dirname, "../public", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).send("Not found");
  });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/buildit")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });
