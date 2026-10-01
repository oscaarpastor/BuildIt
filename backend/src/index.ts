import mongoose from "mongoose";
import { config } from "./config";
import { createApp } from "./app";

mongoose.set("sanitizeFilter", true);

async function main() {
  await mongoose.connect(config.mongodbUri);
  console.log("Conectado a MongoDB");

  createApp().listen(config.port, () => {
    console.log(`Servidor corriendo en puerto ${config.port} (${config.nodeEnv})`);
  });
}

main().catch((err) => {
  console.error("No se pudo arrancar el servidor:", err);
  process.exit(1);
});
