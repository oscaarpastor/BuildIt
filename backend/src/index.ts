import mongoose from "mongoose";
import { config } from "./config";
import { createApp } from "./app";
import { syncBaseTemplates } from "./templates/sync";

mongoose.set("sanitizeFilter", true);

async function main() {
  await mongoose.connect(config.mongodbUri);
  console.log("Conectado a MongoDB");
  // Las plantillas viven en el código (src/templates): se copian a la base de
  // datos en cada arranque para que nunca se queden desfasadas.
  const total = await syncBaseTemplates();
  console.log(`Plantillas sincronizadas: ${total}`);

  createApp().listen(config.port, () => {
    console.log(`Servidor corriendo en puerto ${config.port} (${config.nodeEnv})`);
  });
}

main().catch((err) => {
  console.error("No se pudo arrancar el servidor:", err);
  process.exit(1);
});
