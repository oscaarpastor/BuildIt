import mongoose from "mongoose";
import request from "supertest";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { createApp } from "../src/app";
import { config } from "../src/config";
import { BaseTemplate } from "../src/models/BaseTemplate";

export const app = createApp();

if (!/_test$/.test(new URL(config.mongodbUri).pathname)) {
  // Protección: los tests borran colecciones enteras.
  throw new Error(`Los tests solo se ejecutan contra una base de datos *_test (${config.mongodbUri})`);
}

export function useTestDatabase() {
  beforeAll(async () => {
    mongoose.set("sanitizeFilter", true);
    await mongoose.connect(config.mongodbUri);
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db!.collections();
    await Promise.all(collections.map((c) => c.deleteMany({})));
    await BaseTemplate.syncIndexes();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });
}

// La plantilla de los tests es el Restaurante: sus secciones incluyen
// ventajas, testimonios y preguntas, que es lo que comprueban los tests.
export const TEST_VIEW = "templateRestaurante";

export const TEMPLATE_CONFIG = {
  theme: { colorPrimary: "#6366f1", colorSecondary: "#818cf8", fontFamily: "Inter", darkMode: false },
  brand: { name: "Marca de prueba", logo: "" },
  hero: { title: "Título hero", subtitle: "Subtítulo", backgroundImage: "", ctaText: "Empezar", ctaLink: "#contact" },
  about: { heading: "Sobre nosotros", content: "Contenido", image: "" },
  features: [{ icon: "⚡", title: "Rápido", description: "Muy rápido" }],
  products: [],
  gallery: [],
  video: { url: "", thumbnail: "" },
  testimonials: [{ name: "Laura", quote: "Testimonio de prueba", avatar: "" }],
  documentation: [],
  faqs: [{ question: "¿Pregunta?", answer: "Respuesta" }],
  inspiration: [],
  program: {
    title: "", image: "", reason: "", functioning: "", methodology: "", selection: "",
    cta1: { text: "", link: "" }, cta2: { text: "", link: "" },
  },
  contact: { email: "hola@example.com", phone: "", address: "" },
  footer: { text: "Pie de prueba", links: [] },
};

export async function createTemplate() {
  return BaseTemplate.create({
    name: "Restaurante de prueba",
    description: "Plantilla para tests",
    view: TEST_VIEW,
    config: TEMPLATE_CONFIG,
  });
}

let counter = 0;

export async function registerUser(name = "Usuario") {
  counter += 1;
  const email = `${name.toLowerCase()}${counter}@buildit.test`;
  const password = "contrasena-segura";
  const res = await request(app).post("/api/auth/register").send({ name, email, password });
  if (res.status !== 201) throw new Error(`Registro fallido: ${res.status} ${JSON.stringify(res.body)}`);
  return { token: res.body.token as string, user: res.body.user, email, password };
}

export const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export async function createProject(token: string, templateId: string, name = "Mi web") {
  const res = await request(app).post("/api/projects").set(auth(token)).send({ templateId, name });
  if (res.status !== 201) throw new Error(`Crear proyecto fallido: ${res.status} ${JSON.stringify(res.body)}`);
  return res.body;
}
