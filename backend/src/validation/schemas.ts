import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { ALLOWED_FONTS, isSafeColor, isSafeLink, isSafeMediaUrl } from "../lib/safe";

const text = (max: number) => z.string().trim().max(max).default("");
const link = z
  .string()
  .trim()
  .max(2048)
  .refine(isSafeLink, "Enlace no válido: usa http(s)://, #seccion, mailto: o tel:")
  .default("");
const media = z
  .string()
  .trim()
  .max(2048)
  .refine(isSafeMediaUrl, "URL no válida: debe empezar por http:// o https://")
  .default("");
const color = z.string().refine(isSafeColor, "Color no válido: usa el formato #rrggbb");
const list = <T extends z.ZodType>(item: T) => z.array(item).max(50).default([]);

// Secciones que se pueden ocultar en la web generada (la marca va en la cabecera).
export const SECTION_KEYS = [
  "hero",
  "about",
  "features",
  "products",
  "gallery",
  "video",
  "stats",
  "steps",
  "team",
  "testimonials",
  "documentation",
  "faqs",
  "inspiration",
  "program",
  "cta",
  "contact",
  "footer",
] as const;

// Secciones con cabecera editable (antetítulo, título y entradilla).
export const HEADING_KEYS = [
  "about",
  "features",
  "products",
  "gallery",
  "video",
  "stats",
  "steps",
  "team",
  "testimonials",
  "faqs",
  "program",
  "contact",
] as const;

export const SITE_LANGUAGES = ["es", "en"] as const;

const headingSchema = z.object({ eyebrow: text(60), title: text(200), subtitle: text(600) });

// Sin valor por defecto: una cabecera que no existe (webs anteriores a las
// cabeceras editables) se rellena con la de la plantilla al leerla.
const headingsSchema = z
  .object(Object.fromEntries(HEADING_KEYS.map((key) => [key, headingSchema.optional()])) as {
    [K in (typeof HEADING_KEYS)[number]]: z.ZodOptional<typeof headingSchema>;
  })
  .prefault({});

export const projectConfigSchema = z.object({
  theme: z.object({
    colorPrimary: color,
    colorSecondary: color,
    fontFamily: z.enum(ALLOWED_FONTS),
    fontBody: z.enum(ALLOWED_FONTS).optional(),
    darkMode: z.boolean().default(false),
    language: z.enum(SITE_LANGUAGES).default("es"),
  }),
  headings: headingsSchema,
  brand: z.object({ name: text(100), logo: media }).prefault({}),
  hero: z
    .object({
      eyebrow: text(100),
      title: text(200),
      subtitle: text(500),
      backgroundImage: media,
      ctaText: text(100),
      ctaLink: link,
      secondaryCtaText: text(100),
      secondaryCtaLink: link,
    })
    .prefault({}),
  about: z.object({ heading: text(200), content: text(5000), image: media }).prefault({}),
  features: list(z.object({ icon: text(20), title: text(200), description: text(1000) })),
  products: list(
    z.object({
      title: text(200),
      description: text(1000),
      price: text(50),
      image: media,
      badge: text(40),
      link: link,
    })
  ),
  gallery: list(z.object({ image: media, caption: text(200) })),
  video: z.object({ url: media, thumbnail: media }).prefault({}),
  stats: list(z.object({ value: text(30), label: text(100) })),
  steps: list(z.object({ label: text(60), title: text(200), description: text(1000) })),
  team: list(z.object({ name: text(100), role: text(100), image: media })),
  testimonials: list(
    z.object({ name: text(100), role: text(100), quote: text(1000), avatar: media })
  ),
  documentation: list(z.object({ title: text(200), url: link })),
  faqs: list(z.object({ question: text(300), answer: text(2000) })),
  inspiration: list(
    z.object({
      category: text(100),
      name: text(200),
      image: media,
      link: link,
      description: text(1000),
    })
  ),
  program: z
    .object({
      title: text(200),
      image: media,
      reason: text(2000),
      functioning: text(2000),
      methodology: text(2000),
      selection: text(2000),
      cta1: z.object({ text: text(100), link: link }).prefault({}),
      cta2: z.object({ text: text(100), link: link }).prefault({}),
    })
    .prefault({}),
  cta: z
    .object({ title: text(200), text: text(600), buttonText: text(100), buttonLink: link })
    .prefault({}),
  contact: z
    .object({
      email: text(200),
      phone: text(50),
      address: text(300),
      hours: text(500),
      whatsapp: text(30),
    })
    .prefault({}),
  footer: z
    .object({
      text: text(300),
      links: list(z.object({ label: text(100), url: link })),
    })
    .prefault({}),
});

const objectId = z.string().refine(isValidObjectId, "Identificador no válido");

export const registerSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(80),
  email: z.email("Email no válido").trim().toLowerCase().max(200),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(72, "La contraseña no puede superar 72 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().max(200),
  password: z.string().max(200),
});

export const updateMeSchema = z
  .object({
    name: registerSchema.shape.name.optional(),
    email: registerSchema.shape.email.optional(),
    currentPassword: z.string().max(200).optional(),
    newPassword: registerSchema.shape.password.optional(),
  })
  .refine((data) => !data.newPassword || data.currentPassword, {
    message: "Para cambiar la contraseña indica la actual",
    path: ["currentPassword"],
  });

export const createProjectSchema = z.object({
  templateId: objectId,
  name: z.string().trim().min(1).max(120),
});

export const updateProjectSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    config: projectConfigSchema.optional(),
    hiddenSections: z.array(z.enum(SECTION_KEYS)).max(SECTION_KEYS.length).optional(),
  })
  .strict();
