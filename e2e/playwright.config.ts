import { defineConfig } from "@playwright/test";

const PORT = 3100;

// Se prueba el build de producción (backend sirviendo el frontend) contra una
// base de datos propia, buildit_e2e, que se vacía antes de cada ejecución.
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Usa el Google Chrome instalado; con PW_CHANNEL=chromium usaría el de Playwright
    channel: process.env.PW_CHANNEL ?? "chrome",
    locale: "es-ES",
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "npm run build --prefix .. && npm run db:reset --prefix ../backend && npm run seed:prod --prefix ../backend && node ../backend/dist/index.js",
    url: `http://localhost:${PORT}/api/base-templates`,
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: "ignore",
    env: {
      NODE_ENV: "production",
      PORT: String(PORT),
      MONGODB_URI: "mongodb://localhost:27017/buildit_e2e",
      JWT_SECRET: "clave-solo-para-e2e-0123456789abcdefghijklmn",
      AUTH_RATE_LIMIT_MAX: "100",
    },
  },
});
