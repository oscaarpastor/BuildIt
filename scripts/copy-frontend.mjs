// Copia el frontend compilado (frontend/dist) a backend/public, desde donde
// lo sirve el backend en producción.
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "frontend", "dist");
const to = join(root, "backend", "public");

if (!existsSync(join(from, "index.html"))) {
  console.error("No existe frontend/dist/index.html. Ejecuta antes el build del frontend.");
  process.exit(1);
}

rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true });
console.log("Frontend copiado a backend/public");
