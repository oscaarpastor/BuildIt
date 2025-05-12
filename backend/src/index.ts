import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/project";
import userRoutes from "./routes/user";
import baseTemplateRoutes from "./routes/baseTemplate";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("¡Backend funcionando!");
});

// Rutas
app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);
app.use("/api/base-templates", baseTemplateRoutes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/buildit")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });
