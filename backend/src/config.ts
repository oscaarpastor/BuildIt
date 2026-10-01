import dotenv from "dotenv";

dotenv.config({ quiet: true });

const env = process.env;

function required(name: string): string {
  const value = env[name];
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Copia backend/.env.example a backend/.env y rellénala.`
    );
  }
  return value;
}

const jwtSecret = required("JWT_SECRET");
if (jwtSecret.length < 32) {
  throw new Error("JWT_SECRET debe tener al menos 32 caracteres.");
}

export const config = {
  nodeEnv: env.NODE_ENV || "development",
  isProduction: env.NODE_ENV === "production",
  port: Number(env.PORT) || 3000,
  mongodbUri: env.MONGODB_URI || "mongodb://localhost:27017/buildit",
  jwtSecret,
  jwtExpiresIn: env.JWT_EXPIRES_IN || "7d",
  corsOrigins: (env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  authRateLimit: {
    windowMs: Number(env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(env.AUTH_RATE_LIMIT_MAX) || 10,
  },
};
