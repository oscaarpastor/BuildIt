import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app, auth, createProject, createTemplate, registerUser, useTestDatabase } from "./helpers";
import { Project } from "../src/models/Project";
import { Stat } from "../src/models/Stat";

useTestDatabase();

let templateId: string;

beforeEach(async () => {
  templateId = String((await createTemplate())._id);
});

describe("CRUD de proyectos", () => {
  it("crea un proyecto desde una plantilla con id público aleatorio", async () => {
    const { token, user } = await registerUser("Ana");
    const res = await request(app).post("/api/projects").set(auth(token)).send({ templateId, name: "Mi web" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: "Mi web", view: "templateStartup", user: user._id, hiddenSections: [] });
    expect(res.body.publicId).toMatch(/^[\w-]{16}$/);
    expect(res.body.config.brand.name).toBe("Marca de prueba");
  });

  it("exige autenticación", async () => {
    expect((await request(app).get("/api/projects")).status).toBe(401);
    expect((await request(app).post("/api/projects").send({ templateId, name: "x" })).status).toBe(401);
  });

  it("rechaza plantillas inexistentes o ids no válidos", async () => {
    const { token } = await registerUser("Ana");
    const noValido = await request(app).post("/api/projects").set(auth(token)).send({ templateId: "startup", name: "x" });
    const inexistente = await request(app)
      .post("/api/projects")
      .set(auth(token))
      .send({ templateId: "6abecea8789ef49661f240fd", name: "x" });
    expect(noValido.status).toBe(400);
    expect(inexistente.status).toBe(400);
  });

  it("lista solo los proyectos propios, con estadísticas", async () => {
    const ana = await registerUser("Ana");
    const beto = await registerUser("Beto");
    await createProject(ana.token, templateId, "Web de Ana");
    await createProject(beto.token, templateId, "Web de Beto");

    const res = await request(app).get("/api/projects").set(auth(ana.token));
    expect(res.status).toBe(200);
    expect(res.body.map((p: { name: string }) => p.name)).toEqual(["Web de Ana"]);
    expect(res.body[0].stats).toEqual({ views: 0, clicks: 0, lastAccess: null });
  });

  it("actualiza nombre, contenido y secciones ocultas", async () => {
    const { token } = await registerUser("Ana");
    const project = await createProject(token, templateId);
    const config = { ...project.config, brand: { name: "Nueva marca", logo: "https://example.com/logo.png" } };

    const res = await request(app)
      .put(`/api/projects/${project._id}`)
      .set(auth(token))
      .send({ name: "Renombrada", config, hiddenSections: ["testimonials"] });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: "Renombrada", hiddenSections: ["testimonials"] });
    expect(res.body.config.brand).toEqual({ name: "Nueva marca", logo: "https://example.com/logo.png" });
  });

  it("borra el proyecto y sus estadísticas", async () => {
    const { token } = await registerUser("Ana");
    const project = await createProject(token, templateId);
    await request(app).post(`/api/public/sites/${project.publicId}/events`).send({ type: "view" });

    const res = await request(app).delete(`/api/projects/${project._id}`).set(auth(token));
    expect(res.status).toBe(204);
    expect(await Project.countDocuments()).toBe(0);
    expect(await Stat.countDocuments()).toBe(0);
  });
});

describe("permisos entre usuarios", () => {
  it("otro usuario no puede ver, editar, borrar ni exportar el proyecto (404)", async () => {
    const ana = await registerUser("Ana");
    const beto = await registerUser("Beto");
    const project = await createProject(ana.token, templateId, "Privado de Ana");
    const url = `/api/projects/${project._id}`;

    expect((await request(app).get(url).set(auth(beto.token))).status).toBe(404);
    expect((await request(app).put(url).set(auth(beto.token)).send({ name: "Hackeado" })).status).toBe(404);
    expect((await request(app).delete(url).set(auth(beto.token))).status).toBe(404);
    expect((await request(app).get(`${url}/export`).set(auth(beto.token))).status).toBe(404);

    const intacto = await Project.findById(project._id).lean();
    expect(intacto?.name).toBe("Privado de Ana");
  });

  it("no se puede cambiar el dueño de un proyecto", async () => {
    const ana = await registerUser("Ana");
    const beto = await registerUser("Beto");
    const project = await createProject(ana.token, templateId);

    const res = await request(app)
      .put(`/api/projects/${project._id}`)
      .set(auth(ana.token))
      .send({ user: beto.user._id });
    expect(res.status).toBe(400);
    expect(String((await Project.findById(project._id).lean())?.user)).toBe(ana.user._id);
  });

  it("los ids mal formados responden 404, no 500", async () => {
    const { token } = await registerUser("Ana");
    expect((await request(app).get("/api/projects/no-es-un-id").set(auth(token))).status).toBe(404);
  });
});

describe("validación del contenido", () => {
  const cases: [string, (c: Record<string, any>) => void][] = [
    ["enlace javascript:", (c) => (c.hero.ctaLink = "javascript:alert(1)")],
    ["enlace JaVaScRiPt:", (c) => (c.hero.ctaLink = "JaVaScRiPt:alert(1)")],
    ["imagen data:", (c) => (c.brand.logo = "data:text/html,<script>alert(1)</script>")],
    ["URL que rompe el CSS", (c) => (c.hero.backgroundImage = "https://x.com/a.jpg');background:url(evil")],
    ["color con CSS", (c) => (c.theme.colorPrimary = "red;}body{display:none")],
    ["fuente no permitida", (c) => (c.theme.fontFamily = "Comic Sans MS")],
    ["texto demasiado largo", (c) => (c.hero.title = "x".repeat(201))],
  ];

  it.each(cases)("rechaza %s (400)", async (_name, mutate) => {
    const { token } = await registerUser("Ana");
    const project = await createProject(token, templateId);
    const config = structuredClone(project.config);
    mutate(config);

    const res = await request(app).put(`/api/projects/${project._id}`).set(auth(token)).send({ config });
    expect(res.status).toBe(400);
  });

  it("acepta enlaces https, anclas, mailto y tel", async () => {
    const { token } = await registerUser("Ana");
    const project = await createProject(token, templateId);
    const config = structuredClone(project.config);
    config.hero.ctaLink = "https://example.com/ruta?q=1";
    config.footer.links = [
      { label: "Ancla", url: "#contact" },
      { label: "Correo", url: "mailto:hola@example.com" },
      { label: "Teléfono", url: "tel:+34 600 000 000" },
    ];

    const res = await request(app).put(`/api/projects/${project._id}`).set(auth(token)).send({ config });
    expect(res.status).toBe(200);
  });
});
