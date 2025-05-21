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

app.use(cors());
app.use(express.json());

// ✅ Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Rutas API
app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);
app.use("/api/base-templates", baseTemplateRoutes);
app.use("/api/stats", statRoutes);


// Conexión a MongoDB y arranque del servidor
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
