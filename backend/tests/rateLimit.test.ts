import { describe, expect, it, vi } from "vitest";
import request from "supertest";

describe("límite de intentos en login", () => {
  it("bloquea con 429 al superar AUTH_RATE_LIMIT_MAX", async () => {
    vi.stubEnv("AUTH_RATE_LIMIT_MAX", "3");
    vi.resetModules();
    const { createApp } = await import("../src/app");
    const app = createApp();

    // Cuerpo vacío: falla en la validación sin tocar la base de datos, pero
    // cuenta igualmente para el límite.
    const attempt = () => request(app).post("/api/auth/login").send({});

    // Las tres primeras pasan el límite (y fallan por validación).
    for (let i = 0; i < 3; i++) {
      expect((await attempt()).status).not.toBe(429);
    }
    const blocked = await attempt();
    expect(blocked.status).toBe(429);
    expect(blocked.body.message).toMatch(/Demasiados intentos/);

    vi.unstubAllEnvs();
  });
});
