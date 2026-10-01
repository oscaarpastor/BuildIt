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
  "testimonials",
  "documentation",
  "faqs",
  "inspiration",
  "program",
  "contact",
  "footer",
] as const;

export const projectConfigSchema = z.object({
  theme: z.object({
    colorPrimary: color,
    colorSecondary: color,
    fontFamily: z.enum(ALLOWED_FONTS),
    darkMode: z.boolean().default(false),
  }),
  brand: z.object({ name: text(100), logo: media }).prefault({}),
  hero: z
    .object({
      title: text(200),
      subtitle: text(500),
      backgroundImage: media,
      ctaText: text(100),
      ctaLink: link,
    })
    .prefault({}),
  about: z.object({ heading: text(200), content: text(5000), image: media }).prefault({}),
  features: list(z.object({ icon: text(20), title: text(200), description: text(1000) })),
  products: list(
    z.object({ title: text(200), description: text(1000), price: text(50), image: media })
  ),
  gallery: list(z.object({ image: media })),
  video: z.object({ url: media, thumbnail: media }).prefault({}),
  testimonials: list(z.object({ name: text(100), quote: text(1000), avatar: media })),
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
  contact: z
    .object({ email: text(200), phone: text(50), address: text(300) })
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
