import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";
import { app, auth, registerUser, useTestDatabase } from "./helpers";
import { User } from "../src/models/User";

useTestDatabase();

describe("registro", () => {
  it("crea el usuario, devuelve un JWT y nunca la contraseña", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Ana", email: "ANA@Buildit.test", password: "contrasena-segura" });

    expect(res.status).toBe(201);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user).toMatchObject({ name: "Ana", email: "ana@buildit.test" });
    expect(res.body.user).not.toHaveProperty("password");
  });

  it("guarda la contraseña cifrada con bcrypt", async () => {
    const { email } = await registerUser("Ana");
    const stored = await User.findOne({ email }).select("+password").lean();
    expect(stored?.password).toMatch(/^\$2b\$10\$/);
  });

  it("rechaza un email ya registrado (409)", async () => {
    const { email } = await registerUser("Ana");
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Otra", email, password: "contrasena-segura" });
    expect(res.status).toBe(409);
  });

  it("valida los datos (400)", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "", email: "no-es-email", password: "corta" });
    expect(res.status).toBe(400);
    expect(res.body.errors.map((e: { path: string }) => e.path).sort()).toEqual(["email", "name", "password"]);
  });
});

describe("login", () => {
  it("devuelve token y usuario con credenciales correctas", async () => {
    const { email, password } = await registerUser("Ana");
    const res = await request(app).post("/api/auth/login").send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user).not.toHaveProperty("password");
  });

  it("responde igual con contraseña incorrecta y con email inexistente", async () => {
    const { email } = await registerUser("Ana");
    const wrongPassword = await request(app).post("/api/auth/login").send({ email, password: "mala-mala" });
    const unknownEmail = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@buildit.test", password: "mala-mala" });

    expect(wrongPassword.status).toBe(401);
    expect(unknownEmail.status).toBe(401);
    expect(wrongPassword.body).toEqual(unknownEmail.body);
  });

  it("rechaza operadores de MongoDB en el login (inyección NoSQL)", async () => {
    await registerUser("Ana");
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: { $ne: null }, password: { $ne: null } });
    expect(res.status).toBe(400);
  });
});

describe("sesión", () => {
  it("/me exige un token válido", async () => {
    expect((await request(app).get("/api/auth/me")).status).toBe(401);
    expect((await request(app).get("/api/auth/me").set(auth("token.falso.x"))).status).toBe(401);
  });

  it("rechaza tokens firmados con otra clave o con el id del usuario a pelo", async () => {
    const { user } = await registerUser("Ana");
    const forged = jwt.sign({}, "otra-clave-cualquiera-de-32-caracteres!!", { subject: user._id });
    expect((await request(app).get("/api/auth/me").set(auth(forged))).status).toBe(401);
    expect((await request(app).get("/api/auth/me").set({ Authorization: user._id })).status).toBe(401);
  });

  it("/me devuelve el usuario autenticado sin contraseña", async () => {
    const { token, email } = await registerUser("Ana");
    const res = await request(app).get("/api/auth/me").set(auth(token));
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
    expect(res.body).not.toHaveProperty("password");
  });
});

describe("PUT /api/users/me", () => {
  it("actualiza nombre y email", async () => {
    const { token } = await registerUser("Ana");
    const res = await request(app)
      .put("/api/users/me")
      .set(auth(token))
      .send({ name: "Ana María", email: "nueva@buildit.test" });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: "Ana María", email: "nueva@buildit.test" });
  });

  it("cambiar la contraseña exige la actual y la guarda cifrada", async () => {
    const { token, email, password } = await registerUser("Ana");

    const sinActual = await request(app).put("/api/users/me").set(auth(token)).send({ newPassword: "otra-contrasena" });
    expect(sinActual.status).toBe(400);

    const actualMal = await request(app)
      .put("/api/users/me")
      .set(auth(token))
      .send({ currentPassword: "incorrecta", newPassword: "otra-contrasena" });
    expect(actualMal.status).toBe(400);

    const ok = await request(app)
      .put("/api/users/me")
      .set(auth(token))
      .send({ currentPassword: password, newPassword: "otra-contrasena" });
    expect(ok.status).toBe(200);

    const stored = await User.findOne({ email }).select("+password").lean();
    expect(stored?.password).toMatch(/^\$2b\$/);
    expect((await request(app).post("/api/auth/login").send({ email, password })).status).toBe(401);
    expect(
      (await request(app).post("/api/auth/login").send({ email, password: "otra-contrasena" })).status
    ).toBe(200);
  });

  it("no permite cambiar a un email de otra cuenta", async () => {
    const ana = await registerUser("Ana");
    const beto = await registerUser("Beto");
    const res = await request(app).put("/api/users/me").set(auth(beto.token)).send({ email: ana.email });
    expect(res.status).toBe(409);
  });

  it("las rutas antiguas que exponían usuarios ya no existen", async () => {
    const { token } = await registerUser("Ana");
    expect((await request(app).get("/api/users").set(auth(token))).status).toBe(404);
    expect((await request(app).post("/api/users").send({})).status).toBe(404);
  });
});
