// Borra por completo la base de datos indicada en MONGODB_URI (o la local por
// defecto). Útil para empezar de cero en desarrollo y en los tests E2E.
require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/buildit";

(async () => {
  await mongoose.connect(uri);
  const name = mongoose.connection.name;
  await mongoose.connection.dropDatabase();
  console.log(`Base de datos "${name}" borrada`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error("No se pudo borrar la base de datos:", err);
  process.exit(1);
});
