import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Todos los archivos comparten la base de datos de pruebas: uno detrás de otro.
    fileParallelism: false,
    hookTimeout: 30_000,
    testTimeout: 15_000,
    env: {
      NODE_ENV: "test",
      MONGODB_URI: process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/buildit_test",
      JWT_SECRET: "clave-solo-para-tests-0123456789abcdefghijklmnop",
      AUTH_RATE_LIMIT_MAX: "1000",
    },
  },
});
