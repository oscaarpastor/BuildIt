import { afterEach, describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";
import request from "supertest";
import { parseTrustProxy } from "../src/config";

// IPs de documentación (RFC 5737) como clientes distintos.
const CLIENT_A = "203.0.113.10";
const CLIENT_B = "198.51.100.20";

async function appWith(trustProxy: string) {
  vi.stubEnv("AUTH_RATE_LIMIT_MAX", "2");
  vi.stubEnv("TRUST_PROXY", trustProxy);
  // Recarga config y limitadores con estas variables. mongoose no se recarga, así
  // que se olvidan sus modelos para que la app pueda registrarlos de nuevo.
  vi.resetModules();
  mongoose.deleteModel(/.*/);
  const { createApp } = await import("../src/app");
  return createApp();
}

type App = Awaited<ReturnType<typeof appWith>>;

// Cuerpo vacío: falla en la validación sin tocar la base de datos, pero cuenta
// igualmente para el límite de login.
const login = (app: App, forwardedFor: string) =>
  request(app).post("/api/auth/login").set("X-Forwarded-For", forwardedFor).send({});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("TRUST_PROXY", () => {
  it.each<[string | undefined, boolean | number | string]>([
    [undefined, false],
    ["", false],
    ["false", false],
    ["true", true],
    ["1", 1],
    [" 2 ", 2],
    ["loopback", "loopback"],
    ["10.10.10.1", "10.10.10.1"],
    ["10.10.10.1, 10.10.10.0/24", "10.10.10.1, 10.10.10.0/24"],
  ])("parseTrustProxy(%j) = %j", (value, expected) => {
    expect(parseTrustProxy(value)).toBe(expected);
  });

  it("sin TRUST_PROXY ignora X-Forwarded-For: todos los clientes comparten límite", async () => {
    // express-rate-limit avisa por consola de que llega X-Forwarded-For sin trust proxy.
    vi.spyOn(console, "error").mockImplementation(() => {});
    const app = await appWith("");

    expect((await login(app, CLIENT_A)).status).not.toBe(429);
    expect((await login(app, CLIENT_A)).status).not.toBe(429);
    // Otro cliente, pero la misma IP de socket: ya está bloqueado.
    expect((await login(app, CLIENT_B)).status).toBe(429);
  });

  // supertest conecta por loopback, que aquí hace de proxy (cloudflared).
  it.each(["loopback", "1"])(
    "con TRUST_PROXY=%s cada IP de X-Forwarded-For tiene su propio límite",
    async (trustProxy) => {
      const app = await appWith(trustProxy);

      expect((await login(app, CLIENT_A)).status).not.toBe(429);
      expect((await login(app, CLIENT_A)).status).not.toBe(429);
      expect((await login(app, CLIENT_A)).status).toBe(429);

      // Cloudflare añade la IP real al final: lo que el cliente ponga delante se ignora.
      expect((await login(app, `${CLIENT_B}, ${CLIENT_A}`)).status).toBe(429);

      // Otro cliente sigue pudiendo entrar.
      expect((await login(app, CLIENT_B)).status).not.toBe(429);
    }
  );

  it("solo confía en el proxy configurado: X-Forwarded-For de otra IP se ignora", async () => {
    // El proxy de producción es 10.10.10.1; supertest conecta desde loopback.
    const app = await appWith("10.10.10.1");

    expect((await login(app, CLIENT_A)).status).not.toBe(429);
    expect((await login(app, CLIENT_A)).status).not.toBe(429);
    expect((await login(app, CLIENT_B)).status).toBe(429);
  });
});
