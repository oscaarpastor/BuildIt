import mongoose from "mongoose";
import dotenv from "dotenv";
import { syncBaseTemplates } from "./templates/sync";

dotenv.config({ quiet: true });

// Carga (o actualiza) las plantillas del catálogo en la base de datos. El
// servidor también lo hace al arrancar; esto sirve para hacerlo a mano.
async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/buildit");
    console.log("Connected to MongoDB");
    const total = await syncBaseTemplates(console.log);
    console.log(`Seeded ${total} templates`);
    await mongoose.disconnect();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
