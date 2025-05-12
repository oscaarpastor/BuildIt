import express from "express";  // Framework para crear el servidor
import mongoose from "mongoose";  // Librería para conectarnos a MongoDB
import cors from "cors";  // Middleware para habilitar CORS
import dotenv from "dotenv";  // Para cargar variables de entorno

dotenv.config();  // Carga las variables del archivo .env
const app = express();  // Creamos la aplicación Express
app.use(cors());  // Usamos el middleware CORS
app.use(express.json());  // Habilitamos que Express reciba datos en formato JSON

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/buildit")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

const PORT = process.env.PORT || 3000;  // Si no tenemos un puerto en .env, usamos el 5000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
