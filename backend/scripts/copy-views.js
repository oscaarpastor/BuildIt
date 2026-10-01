// Copia las plantillas EJS a dist/, que tsc no incluye en la compilación.
const fs = require("fs");
const path = require("path");

const from = path.join(__dirname, "..", "src", "views");
const to = path.join(__dirname, "..", "dist", "views");

fs.rmSync(to, { recursive: true, force: true });
fs.cpSync(from, to, { recursive: true });
console.log(`Plantillas copiadas a ${path.relative(process.cwd(), to)}`);
