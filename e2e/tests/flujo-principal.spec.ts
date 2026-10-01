import { readFile } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";

type Cuenta = { name: string; email: string; password: string };

const id = Date.now();
const ana: Cuenta = { name: "Ana", email: `ana-${id}@buildit.test`, password: "contrasena-de-ana" };
const beto: Cuenta = { name: "Beto", email: `beto-${id}@buildit.test`, password: "contrasena-de-beto" };

// Datos que el segundo test necesita del primero
let proyectoAna = { editUrl: "", publicUrl: "" };

async function registrar(page: Page, cuenta: Cuenta) {
  await page.goto("/register");
  await page.getByPlaceholder("Nombre de usuario").fill(cuenta.name);
  await page.getByPlaceholder("Correo electrónico").fill(cuenta.email);
  await page.getByPlaceholder("Contraseña", { exact: true }).fill(cuenta.password);
  await page.getByPlaceholder("Repite la contraseña").fill(cuenta.password);
  await page.getByRole("button", { name: "Registrarse" }).click();
  await expect(page).toHaveURL(/\/projects$/);
}

test.describe.configure({ mode: "serial" });

test("flujo principal: crear, editar, ocultar, publicar, medir, exportar y salir", async ({ page }) => {
  await registrar(page, ana);
  await expect(page.getByRole("heading", { name: "Crea tu primer proyecto" })).toBeVisible();

  // Crear un proyecto desde la plantilla Restaurante (las plantillas vienen de la API)
  await page.getByRole("button", { name: "Crear mi primer proyecto" }).click();
  const tarjeta = page.locator("div.border", { has: page.getByRole("heading", { name: "Restaurante" }) });
  await tarjeta.getByRole("button", { name: "Usar plantilla" }).click();
  await expect(page).toHaveURL(/\/projects\/[a-f0-9]{24}\/edit$/);
  proyectoAna.editUrl = new URL(page.url()).pathname;

  // Editar la marca: autoguardado y vista previa actualizada
  const vistaPrevia = page.frameLocator('iframe[title="Vista previa"]');
  await expect(vistaPrevia.getByText("Casa del Sol").first()).toBeVisible();
  await page.getByPlaceholder("Introduce el nombre de tu marca").fill("Casa de Ana");
  await expect(page.getByRole("status").getByText("Cambios guardados")).toBeVisible();
  await expect(vistaPrevia.getByText("Casa de Ana").first()).toBeVisible();

  // Ocultar la sección de testimonios
  await page.getByRole("button", { name: /Mostrar\/ocultar secciones/ }).click();
  const chipTestimonios = page.getByRole("button", { name: "Testimonios", exact: true });
  await chipTestimonios.click();
  await expect(chipTestimonios).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByRole("status").getByText("Cambios guardados")).toBeVisible();

  // Exportar a HTML
  const [descarga] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Descargar HTML" }).click(),
  ]);
  const html = await readFile((await descarga.path())!, "utf8");
  expect(html).toContain("Casa de Ana");
  expect(html).not.toContain('id="testimonials"');
  expect(html).not.toContain("track.js");

  // Abrir la web pública por el enlace de la tarjeta
  await page.getByRole("button", { name: "Volver" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  const ver = page.getByRole("link", { name: "Ver" });
  proyectoAna.publicUrl = (await ver.getAttribute("href"))!;
  expect(proyectoAna.publicUrl).toMatch(/^\/project\/[\w-]{16}\/view$/);

  await page.goto(proyectoAna.publicUrl);
  const web = page.frameLocator("iframe");
  await expect(web.getByText("Casa de Ana").first()).toBeVisible();
  await expect(web.locator("#testimonials")).toHaveCount(0);
  await web.getByRole("link", { name: "Reserve a Table" }).click();

  // Las estadísticas reflejan la visita y el clic
  await expect(async () => {
    await page.goto("/projects");
    const stats = page.getByTestId("project-stats");
    await expect(stats).toContainText("1 visita", { timeout: 1000 });
    await expect(stats).toContainText("1 clic", { timeout: 1000 });
  }).toPass({ timeout: 15_000 });

  // Cerrar sesión desde Ajustes
  await page.getByRole("button", { name: "Configuración" }).click();
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto("/projects");
  await expect(page).toHaveURL(/\/login$/);
});

test("otro usuario no puede ver ni tocar el proyecto ajeno", async ({ page, request }) => {
  expect(proyectoAna.editUrl).not.toBe("");
  await registrar(page, beto);

  // Su lista está vacía y la URL del editor de Ana no muestra nada
  await expect(page.getByRole("heading", { name: "Crea tu primer proyecto" })).toBeVisible();
  await page.goto(proyectoAna.editUrl);
  await expect(page.getByText("Proyecto no encontrado")).toBeVisible();

  // Tampoco por la API, ni para leer, ni para modificar, ni para borrar
  const token = await page.evaluate(() => localStorage.getItem("token"));
  const headers = { Authorization: `Bearer ${token}` };
  const apiUrl = proyectoAna.editUrl.replace(/^\/projects\/([a-f0-9]+)\/edit$/, "/api/projects/$1");
  expect((await request.get(apiUrl, { headers })).status()).toBe(404);
  expect((await request.put(apiUrl, { headers, data: { name: "Hackeado" } })).status()).toBe(404);
  expect((await request.delete(apiUrl, { headers })).status()).toBe(404);
  expect((await request.get(`${apiUrl}/export`, { headers })).status()).toBe(404);

  // La web publicada de Ana sigue intacta
  await page.goto(proyectoAna.publicUrl);
  await expect(page.frameLocator("iframe").getByText("Casa de Ana").first()).toBeVisible();
});
