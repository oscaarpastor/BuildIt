import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app, auth, createProject, createTemplate, registerUser, useTestDatabase } from "./helpers";
import { BaseTemplate } from "../src/models/BaseTemplate";
import { Project } from "../src/models/Project";

useTestDatabase();

let token: string;
let project: { _id: string; publicId: string; config: Record<string, any> };

beforeEach(async () => {
  const template = await createTemplate();
  ({ token } = await registerUser("Ana"));
  project = await createProject(token, String(template._id), "Web pública");
});

const siteUrl = (publicId: string, preview = false) =>
  `/api/public/sites/${publicId}${preview ? "?preview=true" : ""}`;

describe("web pública", () => {
  it("se sirve por publicId con el contenido y el script de estadísticas", async () => {
    const res = await request(app).get(siteUrl(project.publicId));
    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
    expect(res.text).toContain("Marca de prueba");
    expect(res.text).toContain('src="/api/public/track.js"');
    expect(res.headers["content-security-policy"]).toContain("https://cdn.tailwindcss.com");
  });

  it("no pinta imágenes rotas cuando la URL está vacía", async () => {
    const res = await request(app).get(siteUrl(project.publicId));
    expect(res.text).not.toMatch(/<img src=""/);
  });

  it("la vista previa no lleva el script de estadísticas", async () => {
    const res = await request(app).get(siteUrl(project.publicId, true));
    expect(res.status).toBe(200);
    expect(res.text).not.toContain("track.js");
    expect(res.text).toContain("preview-wrapper");
  });

  it("no es accesible por el _id de MongoDB ni con ids inventados", async () => {
    expect((await request(app).get(siteUrl(project._id))).status).toBe(404);
    expect((await request(app).get(siteUrl("AAAAAAAAAAAAAAAA"))).status).toBe(404);
  });

  it("omite las secciones ocultas y sus enlaces del menú", async () => {
    const antes = await request(app).get(siteUrl(project.publicId));
    expect(antes.text).toContain('id="testimonials"');

    await request(app)
      .put(`/api/projects/${project._id}`)
      .set(auth(token))
      .send({ hiddenSections: ["testimonials", "faqs"] });

    for (const url of [siteUrl(project.publicId), siteUrl(project.publicId, true)]) {
      const res = await request(app).get(url);
      expect(res.text).not.toContain('id="testimonials"');
      expect(res.text).not.toContain('href="#testimonials"');
      expect(res.text).not.toContain('id="faq"');
      expect(res.text).toContain('id="features"');
    }
  });

  it("aplica el modo oscuro igual en web pública, vista previa y exportación", async () => {
    const config = structuredClone(project.config);
    config.theme.darkMode = true;
    await request(app).put(`/api/projects/${project._id}`).set(auth(token)).send({ config });

    const publica = await request(app).get(siteUrl(project.publicId));
    const preview = await request(app).get(siteUrl(project.publicId, true));
    const exportada = await request(app).get(`/api/projects/${project._id}/export`).set(auth(token));

    for (const res of [publica, preview, exportada]) {
      expect(res.text).toContain('<html class="bi-dark"');
      expect(res.text).toContain("background-color: #111827");
    }
  });

  it("vuelve a sanear URLs peligrosas guardadas directamente en la base de datos", async () => {
    await Project.updateOne(
      { _id: project._id },
      { $set: { "config.hero.ctaLink": "javascript:alert(1)", "config.brand.logo": "javascript:alert(2)" } }
    );
    const res = await request(app).get(siteUrl(project.publicId));
    expect(res.text.toLowerCase()).not.toContain("javascript:");
  });
});

describe("exportación", () => {
  it("descarga el HTML sin script de estadísticas", async () => {
    const res = await request(app).get(`/api/projects/${project._id}/export`).set(auth(token));
    expect(res.status).toBe(200);
    expect(res.headers["content-disposition"]).toBe('attachment; filename="Web_p_blica.html"');
    expect(res.text).toContain("Marca de prueba");
    expect(res.text).not.toContain("track.js");
  });

  it("exige autenticación", async () => {
    expect((await request(app).get(`/api/projects/${project._id}/export`)).status).toBe(401);
  });

  it("sigue funcionando aunque la plantilla base ya no exista (E5a)", async () => {
    await BaseTemplate.deleteMany({});
    const res = await request(app).get(`/api/projects/${project._id}/export`).set(auth(token));
    expect(res.status).toBe(200);
  });
});

describe("estadísticas", () => {
  it("registra visitas y clics y el dueño las ve en el listado", async () => {
    const events = `/api/public/sites/${project.publicId}/events`;
    expect((await request(app).post(events).send({ type: "view" })).status).toBe(204);
    expect((await request(app).post(events).send({ type: "view" })).status).toBe(204);
    expect((await request(app).post(events).send({ type: "click" })).status).toBe(204);

    const res = await request(app).get("/api/projects").set(auth(token));
    expect(res.body[0].stats).toMatchObject({ views: 2, clicks: 1 });
    expect(res.body[0].stats.lastAccess).not.toBeNull();
  });

  it("rechaza tipos de evento desconocidos y webs inexistentes", async () => {
    const events = `/api/public/sites/${project.publicId}/events`;
    expect((await request(app).post(events).send({ type: "compra" })).status).toBe(400);
    expect((await request(app).post("/api/public/sites/AAAAAAAAAAAAAAAA/events").send({ type: "view" })).status).toBe(404);
  });

  it("sirve el script de seguimiento", async () => {
    const res = await request(app).get("/api/public/track.js");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/javascript");
  });
});

describe("plantillas base", () => {
  it("se listan y previsualizan, pero no se pueden modificar por la API", async () => {
    const list = await request(app).get("/api/base-templates");
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);

    const id = list.body[0]._id;
    expect((await request(app).get(`/api/base-templates/${id}/preview`)).status).toBe(200);
    expect((await request(app).delete(`/api/base-templates/${id}`)).status).toBe(404);
    expect((await request(app).post("/api/base-templates").send({ name: "x" })).status).toBe(404);
  });
});

describe("cabeceras y errores", () => {
  it("añade cabeceras de seguridad y oculta X-Powered-By", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.headers["content-security-policy"]).toContain("default-src 'self'");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("devuelve errores JSON sin detalles internos", async () => {
    const malformado = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send("{mal");
    expect(malformado.status).toBe(400);
    expect(malformado.body).toEqual({ message: "Petición mal formada" });

    const noExiste = await request(app).get("/api/no-existe");
    expect(noExiste.status).toBe(404);
    expect(noExiste.body).toEqual({ message: "Ruta no encontrada" });
  });

  it("no acepta peticiones de otros orígenes si CORS_ORIGINS está vacío", async () => {
    const res = await request(app).get("/api/base-templates").set("Origin", "https://malicioso.example");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
