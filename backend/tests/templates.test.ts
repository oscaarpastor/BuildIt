import crypto from "crypto";
import fs from "fs";
import path from "path";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, auth, registerUser, useTestDatabase } from "./helpers";
import { renderSite, sanitizeConfig, SITE_SCRIPT_CSP_HASH, VIEWS_DIR } from "../src/lib/render";
import { applyVariant, PREVIEW_VARIANTS } from "../src/lib/previewVariants";
import { FONT_CATALOG } from "../src/lib/safe";
import { SITE_ICONS } from "../src/lib/siteIcons";
import { projectConfigSchema } from "../src/validation/schemas";
import { TEMPLATES } from "../src/templates";
import { TEMPLATE_CATEGORIES } from "../src/templates/types";
import { syncBaseTemplates } from "../src/templates/sync";

useTestDatabase();

const FRONTEND = path.join(__dirname, "..", "..", "frontend", "src");

// Contenido que intenta salirse del HTML en todos los campos de texto
const XSS = `"><script>alert(1)</script><img src=x onerror=alert(2)>`;
function injectEverywhere(value: unknown, key = ""): unknown {
  if (Array.isArray(value)) return value.map((item) => injectEverywhere(item, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, injectEverywhere(v, k)]));
  }
  // Las URLs y el tema ya se validan aparte; aquí se prueban los textos
  if (typeof value === "string" && !/image|logo|avatar|thumbnail|link|url|color|font|language/i.test(key)) {
    return `${value}${XSS}`;
  }
  return value;
}

const sectionsIn = (html: string) => [...html.matchAll(/data-section="([a-z]+)"/g)].map((m) => m[1]);

describe("catálogo de plantillas", () => {
  it("tiene vistas únicas, categorías conocidas y nombres en los dos idiomas", () => {
    const views = TEMPLATES.map((t) => t.view);
    expect(new Set(views).size).toBe(views.length);
    for (const template of TEMPLATES) {
      expect(TEMPLATE_CATEGORIES).toContain(template.category);
      expect(template.sections[0]).toBe("brand");
      expect(template.sections.at(-1)).toBe("footer");
      for (const lang of ["es", "en"] as const) {
        expect(template.text[lang].name.length).toBeGreaterThan(0);
        expect(template.text[lang].description.length).toBeGreaterThan(0);
      }
      // Los textos propios existen en los dos idiomas
      if (template.strings) expect(Object.keys(template.strings.en).sort()).toEqual(Object.keys(template.strings.es).sort());
    }
  });

  it.each(TEMPLATES.map((t) => [t.view, t] as const))("%s: el contenido de ejemplo es válido y completo", (_view, template) => {
    const parsed = projectConfigSchema.safeParse(template.config);
    expect(parsed.success, parsed.success ? "" : parsed.error.message).toBe(true);
    expect(fs.existsSync(path.join(VIEWS_DIR, `${template.view}.ejs`))).toBe(true);
    // Fotos de Unsplash gratuitas (las premium son de pago)
    expect(JSON.stringify(template.config)).not.toContain("premium_photo");
  });

  it.each(TEMPLATES.map((t) => [t.view, t] as const))(
    "%s: pinta todas sus secciones, en orden, en todas las variantes y modos",
    async (_view, template) => {
      const config = projectConfigSchema.parse(template.config);
      const full = await renderSite({ view: template.view, config }, "public", { trackingId: "abcdefghijklmnop" });
      expect(sectionsIn(full)).toEqual(template.sections);

      for (const variant of PREVIEW_VARIANTS) {
        const site = applyVariant(config, variant);
        for (const mode of ["preview", "public", "export"] as const) {
          const html = await renderSite({ view: template.view, ...site }, mode);
          const sections = sectionsIn(html);
          // Solo secciones de la plantilla y en su orden
          expect(sections).toEqual(template.sections.filter((key) => sections.includes(key)));
          expect(html).toMatch(/^<!DOCTYPE html>/i);
          expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
          expect(html).not.toMatch(/<img[^>]+src=""/);
          expect(html).not.toMatch(/undefined|\[object Object\]|NaN/);
          if (variant === "en") expect(html).toContain('<html lang="en"');
          if (variant === "nohero") expect(sections).not.toContain("hero");
        }
      }
    }
  );

  it.each(TEMPLATES.map((t) => [t.view, t] as const))("%s: escapa cualquier texto del usuario", async (_view, template) => {
    const config = injectEverywhere(projectConfigSchema.parse(template.config));
    const html = await renderSite({ view: template.view, config }, "public");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x onerror");
  });

  it("el script del menú coincide con el hash permitido por la CSP", async () => {
    const html = await renderSite({ view: TEMPLATES[0].view, config: TEMPLATES[0].config }, "public");
    const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    expect(inline).toHaveLength(1);
    const hash = `'sha256-${crypto.createHash("sha256").update(inline[0]).digest("base64")}'`;
    expect(hash).toBe(SITE_SCRIPT_CSP_HASH);
  });

  it("calcula colores de texto legibles para cualquier color de la marca", async () => {
    const config = projectConfigSchema.parse({ ...TEMPLATES[0].config, theme: { ...TEMPLATES[0].config.theme, colorPrimary: "#f5d90a", colorSecondary: "#111111" } });
    const html = await renderSite({ view: TEMPLATES[0].view, config }, "public");
    expect(html).toContain("--on-primary:#16181d"); // texto oscuro sobre amarillo
    expect(html).toContain("--on-secondary:#ffffff"); // texto blanco sobre negro
  });

  it("firma el pie sin punto doble aunque la marca acabe en punto", async () => {
    const year = new Date().getFullYear();
    for (const name of ["Barro & Co.", "Casa del Sol", ""]) {
      const config = projectConfigSchema.parse({ ...TEMPLATES[0].config, brand: { ...TEMPLATES[0].config.brand, name } });
      const html = await renderSite({ view: TEMPLATES[0].view, config }, "public");
      expect(html).not.toMatch(/\.\. Todos/);
      expect(html).not.toMatch(/©\s+\d{4}\s{2,}/);
    }
    const shop = TEMPLATES.find((t) => t.view === "templateShop")!;
    const html = await renderSite({ view: shop.view, config: projectConfigSchema.parse(shop.config) }, "public");
    expect(html).toContain(`© ${year} Barro &amp; Co. Todos los derechos reservados.`);
  });

  it("completa las webs antiguas: cabeceras de la plantilla y letra del texto", () => {
    const restaurante = TEMPLATES.find((t) => t.view === "templateRestaurante")!;
    const config = sanitizeConfig(
      { theme: { colorPrimary: "#123456", colorSecondary: "#654321", fontFamily: "Poppins" }, brand: { name: "Antigua" } },
      restaurante
    );
    expect(config.headings.products.title).toBe(restaurante.config.headings!.products!.title);
    expect(config.theme.fontFamily).toBe("Poppins");
    expect(config.theme.fontBody).toBe(restaurante.config.theme.fontBody);
    expect(config.features).toEqual([]);
  });
});

describe("frontend y backend van a la par", () => {
  it("los iconos son los mismos en las dos copias", () => {
    const backend = fs.readFileSync(path.join(__dirname, "..", "src", "lib", "siteIcons.ts"), "utf8");
    const frontend = fs.readFileSync(path.join(FRONTEND, "lib", "siteIcons.ts"), "utf8");
    expect(frontend).toBe(backend);
    expect(Object.keys(SITE_ICONS).length).toBeGreaterThan(100);
  });

  it("las letras que ofrece el editor son las que acepta el backend", () => {
    const source = fs.readFileSync(path.join(FRONTEND, "lib", "fonts.ts"), "utf8");
    const fonts = Object.fromEntries(
      [...source.matchAll(/^\s+(?:"([^"]+)"|(\w+)): "(\w+)",$/gm)].map((m) => [m[1] ?? m[2], m[3]])
    );
    const expected = Object.fromEntries(Object.entries(FONT_CATALOG).map(([name, font]) => [name, font.kind]));
    expect(fonts).toEqual(expected);
  });
});

describe("API de plantillas", () => {
  it("sincroniza el catálogo y el editor recibe la plantilla y el contenido completo", async () => {
    expect(await syncBaseTemplates()).toBe(TEMPLATES.length);
    const list = await request(app).get("/api/base-templates");
    expect(list.body.map((t: { view: string }) => t.view)).toEqual(TEMPLATES.map((t) => t.view));

    const { token } = await registerUser("Ana");
    const created = await request(app).post("/api/projects").set(auth(token)).send({ templateId: list.body[0]._id, name: "Mi web" });
    const res = await request(app).get(`/api/projects/${created.body._id}`).set(auth(token));
    expect(res.status).toBe(200);
    expect(res.body.template).toMatchObject({ view: TEMPLATES[0].view, category: TEMPLATES[0].category });
    expect(Object.keys(res.body.config.headings)).toContain("steps");
    expect(res.body.config.contact).toHaveProperty("whatsapp");

    // Lo que devuelve el editor se puede volver a guardar tal cual
    const saved = await request(app).put(`/api/projects/${created.body._id}`).set(auth(token)).send({ config: res.body.config });
    expect(saved.status).toBe(200);
  });

  it("la ruta de revisión pinta cualquier plantilla desde el código (solo en desarrollo)", async () => {
    const res = await request(app).get(`/api/dev/preview/${TEMPLATES[0].view}?variant=noimg`);
    expect(res.status).toBe(200);
    expect(res.text).toContain('class="ph');
    expect((await request(app).get("/api/dev/preview/noExiste")).status).toBe(404);
  });
});
