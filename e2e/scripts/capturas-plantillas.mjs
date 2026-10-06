#!/usr/bin/env node
// Capturas de las plantillas para revisarlas a ojo, con varios anchos y variantes
// de contenido. Usa la ruta de desarrollo /api/dev del backend, que pinta cada
// plantilla desde el código (sin base de datos ni cuenta): el backend tiene que
// estar en marcha en modo desarrollo (por defecto http://localhost:3000).
//
//   node scripts/capturas-plantillas.mjs --out /tmp/capturas \
//     [--base http://localhost:3000] [--views templateRestaurante,templateBelleza] \
//     [--widths 1440,768,390] [--variants full,noimg,dark,en,min,long,colors,nohero,bare]
//
// Variantes (backend/src/lib/previewVariants.ts):
//   full    contenido de ejemplo de la plantilla
//   noimg   sin ninguna imagen (portada, fotos, avatares, logo)
//   dark    modo oscuro
//   en      textos fijos en inglés
//   min     un solo elemento por lista y sin textos opcionales
//   long    textos muy largos y listas de 8 elementos
//   colors  colores claros y saturados para probar el contraste
//   nohero  portada oculta (la cabecera queda sobre el fondo normal)
//   bare    solo marca, título de portada y pie
//
// Por cada plantilla, variante y ancho guarda hojas JPG con la página recorrida
// de arriba abajo (en móvil, cuatro pantallas por hoja) y escribe en
// <out>/informe.txt los problemas que detecta solo: desbordamiento horizontal,
// imágenes rotas, errores de consola y peticiones fallidas.
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, all) => {
    if (arg.startsWith("--")) acc.push([arg.slice(2), all[i + 1]?.startsWith("--") ? "true" : all[i + 1]]);
    return acc;
  }, [])
);

const BASE = (args.base ?? "http://localhost:3000").replace(/\/$/, "");
const OUT = args.out ?? path.join(os.tmpdir(), "capturas-plantillas");
const WIDTHS = (args.widths ?? "1440,390").split(",").map(Number);
const VARIANTS = (args.variants ?? "full").split(",");
const ONLY = args.views ? new Set(args.views.split(",")) : null;
const HEIGHTS = { 390: 844, 375: 812, 768: 1024 };
// Pantallas por hoja (--por-hoja): por defecto 4 en móvil y 2 en tableta y escritorio
const PER_SHEET = args["por-hoja"] ? Number(args["por-hoja"]) : null;

async function getJson(url) {
  const res = await fetch(BASE + url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function sheet(browser, shots, perRow, width) {
  // Las pantallas se reducen si no caben (en escritorio, dos de unos 990 px por hoja)
  const sheetWidth = Math.min(2000, width * perRow + 12 * (perRow + 1));
  const shotWidth = Math.floor((sheetWidth - 12 * (perRow + 1)) / perRow);
  const page = await browser.newPage({ viewport: { width: sheetWidth, height: 600 } });
  const imgs = shots.map((b) => `<img src="data:image/jpeg;base64,${b.toString("base64")}">`).join("");
  await page.setContent(
    `<body style="margin:0;padding:12px;background:#888;display:flex;gap:12px;align-items:flex-start">${imgs}</body>`
  );
  await page.evaluate(() =>
    Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = r)))))
  );
  await page.evaluate((w) => document.querySelectorAll("img").forEach((i) => (i.style.width = `${w}px`)), shotWidth);
  const buffer = await page.screenshot({ fullPage: true, type: "jpeg", quality: 72 });
  await page.close();
  return buffer;
}

async function capture(browser, url, width, file) {
  const height = HEIGHTS[width] ?? 900;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: width < 600,
    hasTouch: width < 600,
  });
  const page = await context.newPage();
  const problems = [];
  page.on("console", (msg) => msg.type() === "error" && problems.push(`consola: ${msg.text().slice(0, 200)}`));
  page.on("pageerror", (err) => problems.push(`error JS: ${err.message}`));
  page.on("requestfailed", (req) => problems.push(`petición fallida: ${req.url().slice(0, 140)} (${req.failure()?.errorText})`));
  page.on("response", (res) => res.status() >= 400 && problems.push(`HTTP ${res.status()}: ${res.url().slice(0, 140)}`));

  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  // La altura se vuelve a medir en cada pantalla: crece mientras cargan fotos y letras
  const pageHeight = () => page.evaluate(() => document.documentElement.scrollHeight);
  const shots = [];
  for (let y = 0; y < (await pageHeight()); y += height) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(250);
    await page
      .waitForFunction(() => [...document.images].every((i) => {
        const r = i.getBoundingClientRect();
        return i.complete || r.bottom < 0 || r.top > innerHeight;
      }), null, { timeout: 8000 })
      .catch(() => problems.push(`imágenes que tardan en cargar cerca de y=${y}`));
    shots.push(await page.screenshot({ type: "jpeg", quality: 80 }));
  }

  const report = await page.evaluate(() => {
    const out = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw + 1) {
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > vw + 1 && getComputedStyle(el).position !== "fixed")
        .slice(0, 6)
        .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`);
      out.push(`DESBORDA en horizontal (${document.documentElement.scrollWidth}px > ${vw}px): ${wide.join(", ")}`);
    }
    for (const img of document.images) {
      if (img.complete && img.naturalWidth === 0) out.push(`imagen rota: ${img.currentSrc || img.src}`);
    }
    const ids = [...document.querySelectorAll("[data-section]")].map((el) => el.getAttribute("data-section"));
    out.push(`secciones: ${ids.join(" ")}`);
    return out;
  });
  problems.push(...report);
  await context.close();

  const perSheet = PER_SHEET ?? (width < 600 ? 4 : 2);
  const files = [];
  for (let i = 0; i < shots.length; i += perSheet) {
    const group = shots.slice(i, i + perSheet);
    const buffer = perSheet === 1 ? group[0] : await sheet(browser, group, perSheet, width);
    const name = `${file}-${String(files.length + 1).padStart(2, "0")}.jpg`;
    await writeFile(name, buffer);
    files.push(name);
  }
  return { files, problems };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const { views } = await getJson("/api/dev/templates");
  const selected = views.filter((view) => !ONLY || ONLY.has(view));
  if (!selected.length) throw new Error("No hay plantillas que capturar (¿--views bien escrito?)");
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });
  const lines = [];
  try {
    for (const view of selected) {
      for (const variant of VARIANTS) {
        const url = `${BASE}/api/dev/preview/${view}?variant=${variant}`;
        const check = await fetch(url);
        if (!check.ok) {
          lines.push(`## ${view} · ${variant} → ERROR ${check.status}: ${(await check.text()).slice(0, 600)}`);
          console.log(lines.at(-1));
          continue;
        }
        for (const width of WIDTHS) {
          const file = path.join(OUT, `${view}-${variant}-${width}`);
          const { files, problems } = await capture(browser, url, width, file);
          const block = [`## ${view} · ${variant} · ${width}px → ${files.length} hojas`, ...files.map((f) => `   ${f}`), ...problems.map((p) => `   - ${p}`)];
          lines.push(...block);
          console.log(block.join("\n"));
        }
      }
    }
  } finally {
    await browser.close();
  }
  // Se añade al informe: varias pasadas en la misma carpeta no se pisan
  await appendFile(path.join(OUT, "informe.txt"), `# ${new Date().toISOString()}\n${lines.join("\n")}\n`);
  console.log(`\nInforme: ${path.join(OUT, "informe.txt")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
