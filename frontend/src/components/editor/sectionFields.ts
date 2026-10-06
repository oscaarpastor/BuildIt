import type { SectionKey } from "../../types";

// Qué campos tiene cada sección del editor. Las etiquetas son claves de traducción.

/**
 * text, textarea, email y tel son campos normales.
 * image: dirección de una imagen, con miniatura.
 * link: enlace, que admite #seccion, mailto: y tel:.
 * icon: selector de la colección de iconos de las webs.
 */
export type FieldKind = "text" | "textarea" | "image" | "link" | "email" | "tel" | "icon";

export type FieldDef = {
  /** Ruta dentro de la sección; puede llevar puntos (cta1.text). */
  key: string;
  label: string;
  kind?: FieldKind;
  placeholder?: string;
  /** Ocupa media fila en pantallas anchas (pares como texto + enlace del botón). */
  half?: boolean;
  /** Pista bajo el campo (clave de traducción). */
  hint?: string;
};

export type ListDef = {
  /** Ruta de la lista dentro de la sección; vacía si la sección es la propia lista. */
  path?: string;
  /** Nombre de cada elemento, con {{n}} para su posición. */
  item: string;
  add: string;
  fields: FieldDef[];
  empty: Record<string, string>;
};

export type SectionDef = { fields?: FieldDef[]; list?: ListDef };

export const SECTION_FIELDS: Record<SectionKey, SectionDef> = {
  brand: {
    fields: [
      { key: "name", label: "brandsection.name", placeholder: "brandsection.name_placeholder" },
      { key: "logo", label: "brandsection.logo", kind: "image", placeholder: "brandsection.logo_placeholder" },
    ],
  },
  hero: {
    fields: [
      { key: "eyebrow", label: "herosection.eyebrow", hint: "herosection.eyebrow_hint" },
      { key: "title", label: "herosection.main_title" },
      { key: "subtitle", label: "herosection.subtitle", kind: "textarea" },
      { key: "backgroundImage", label: "herosection.background", kind: "image" },
      { key: "ctaText", label: "herosection.cta_text", half: true },
      { key: "ctaLink", label: "herosection.cta_link", kind: "link", half: true },
      { key: "secondaryCtaText", label: "herosection.cta2_text", half: true },
      { key: "secondaryCtaLink", label: "herosection.cta2_link", kind: "link", half: true },
    ],
  },
  about: {
    fields: [
      { key: "heading", label: "aboutsection.heading" },
      { key: "content", label: "aboutsection.content", kind: "textarea", hint: "aboutsection.content_hint" },
      { key: "image", label: "aboutsection.image", kind: "image" },
    ],
  },
  features: {
    list: {
      item: "featuresection.item",
      add: "featuresection.add",
      empty: { icon: "", title: "", description: "" },
      fields: [
        { key: "icon", label: "featuresection.icon", kind: "icon" },
        { key: "title", label: "featuresection.item_title", placeholder: "featuresection.title_placeholder" },
        {
          key: "description",
          label: "featuresection.description",
          kind: "textarea",
          placeholder: "featuresection.description_placeholder",
        },
      ],
    },
  },
  products: {
    list: {
      item: "productsection.item",
      add: "productsection.add",
      empty: { title: "", description: "", price: "", image: "", badge: "", link: "" },
      fields: [
        { key: "title", label: "productsection.title_label", placeholder: "productsection.title_placeholder" },
        {
          key: "description",
          label: "productsection.description",
          kind: "textarea",
          placeholder: "productsection.description_placeholder",
          hint: "productsection.description_hint",
        },
        { key: "price", label: "productsection.price", placeholder: "productsection.price_placeholder", half: true },
        { key: "badge", label: "productsection.badge", placeholder: "productsection.badge_placeholder", half: true },
        { key: "image", label: "productsection.image", kind: "image", placeholder: "productsection.image_placeholder" },
        { key: "link", label: "productsection.link", kind: "link" },
      ],
    },
  },
  gallery: {
    list: {
      item: "gallerysection.item",
      add: "gallerysection.add",
      empty: { image: "", caption: "" },
      fields: [
        { key: "image", label: "gallerysection.image_label", kind: "image", placeholder: "gallerysection.image_placeholder" },
        { key: "caption", label: "gallerysection.caption" },
      ],
    },
  },
  video: {
    fields: [
      { key: "url", label: "videosection.url", placeholder: "videosection.url_placeholder", hint: "videosection.url_hint" },
      { key: "thumbnail", label: "videosection.thumbnail", kind: "image", placeholder: "videosection.thumbnail_placeholder" },
    ],
  },
  stats: {
    list: {
      item: "statssection.item",
      add: "statssection.add",
      empty: { value: "", label: "" },
      fields: [
        { key: "value", label: "statssection.value", placeholder: "statssection.value_placeholder", half: true },
        { key: "label", label: "statssection.label", placeholder: "statssection.label_placeholder", half: true },
      ],
    },
  },
  steps: {
    list: {
      item: "stepssection.item",
      add: "stepssection.add",
      empty: { label: "", title: "", description: "" },
      fields: [
        { key: "label", label: "stepssection.label", hint: "stepssection.label_hint" },
        { key: "title", label: "stepssection.title" },
        { key: "description", label: "stepssection.description", kind: "textarea" },
      ],
    },
  },
  team: {
    list: {
      item: "teamsection.item",
      add: "teamsection.add",
      empty: { name: "", role: "", image: "" },
      fields: [
        { key: "name", label: "teamsection.name", half: true },
        { key: "role", label: "teamsection.role", half: true },
        { key: "image", label: "teamsection.image", kind: "image" },
      ],
    },
  },
  testimonials: {
    list: {
      item: "testimonialssection.item",
      add: "testimonialssection.add_button",
      empty: { name: "", role: "", quote: "", avatar: "" },
      fields: [
        { key: "name", label: "testimonialssection.name", placeholder: "testimonialssection.name_placeholder", half: true },
        { key: "role", label: "testimonialssection.role", placeholder: "testimonialssection.role_placeholder", half: true },
        {
          key: "quote",
          label: "testimonialssection.quote",
          kind: "textarea",
          placeholder: "testimonialssection.quote_placeholder",
        },
        {
          key: "avatar",
          label: "testimonialssection.avatar",
          kind: "image",
          placeholder: "testimonialssection.avatar_placeholder",
        },
      ],
    },
  },
  documentation: {
    list: {
      item: "documentationsection.item",
      add: "documentationsection.add_button",
      empty: { title: "", url: "" },
      fields: [
        {
          key: "title",
          label: "documentationsection.doc_title",
          placeholder: "documentationsection.doc_title_placeholder",
        },
        {
          key: "url",
          label: "documentationsection.doc_url",
          kind: "link",
          placeholder: "documentationsection.doc_url_placeholder",
        },
      ],
    },
  },
  faqs: {
    list: {
      item: "faqssection.item",
      add: "faqssection.add_button",
      empty: { question: "", answer: "" },
      fields: [
        { key: "question", label: "faqssection.question", placeholder: "faqssection.question_placeholder" },
        { key: "answer", label: "faqssection.answer", kind: "textarea", placeholder: "faqssection.answer_placeholder" },
      ],
    },
  },
  inspiration: {
    list: {
      item: "inspirationsection.item",
      add: "inspirationsection.add",
      empty: { category: "", name: "", image: "", link: "", description: "" },
      fields: [
        { key: "name", label: "inspirationsection.name", placeholder: "inspirationsection.name_placeholder" },
        {
          key: "category",
          label: "inspirationsection.category",
          placeholder: "inspirationsection.category_placeholder",
        },
        {
          key: "description",
          label: "inspirationsection.description",
          kind: "textarea",
          placeholder: "inspirationsection.description_placeholder",
        },
        { key: "image", label: "inspirationsection.image", kind: "image", placeholder: "inspirationsection.image_placeholder" },
        { key: "link", label: "inspirationsection.link", kind: "link", placeholder: "inspirationsection.link_placeholder" },
      ],
    },
  },
  program: {
    fields: [
      { key: "title", label: "programsection.program_title" },
      { key: "image", label: "programsection.image", kind: "image" },
      { key: "reason", label: "programsection.reason", kind: "textarea" },
      { key: "functioning", label: "programsection.functioning", kind: "textarea" },
      { key: "methodology", label: "programsection.methodology", kind: "textarea" },
      { key: "selection", label: "programsection.selection", kind: "textarea" },
      { key: "cta1.text", label: "programsection.cta1_text", half: true },
      { key: "cta1.link", label: "programsection.cta1_link", kind: "link", half: true },
      { key: "cta2.text", label: "programsection.cta2_text", half: true },
      { key: "cta2.link", label: "programsection.cta2_link", kind: "link", half: true },
    ],
  },
  cta: {
    fields: [
      { key: "title", label: "ctasection.title" },
      { key: "text", label: "ctasection.text", kind: "textarea" },
      { key: "buttonText", label: "ctasection.button_text", half: true },
      { key: "buttonLink", label: "ctasection.button_link", kind: "link", half: true },
    ],
  },
  contact: {
    fields: [
      { key: "email", label: "contactsection.email", kind: "email", half: true },
      { key: "phone", label: "contactsection.phone", kind: "tel", half: true },
      { key: "whatsapp", label: "contactsection.whatsapp", kind: "tel", hint: "contactsection.whatsapp_hint" },
      { key: "address", label: "contactsection.address" },
      { key: "hours", label: "contactsection.hours", kind: "textarea", hint: "contactsection.hours_hint" },
    ],
  },
  footer: {
    fields: [{ key: "text", label: "footersection.text" }],
    list: {
      path: "links",
      item: "footersection.item",
      add: "footersection.add_link",
      empty: { label: "", url: "" },
      fields: [
        { key: "label", label: "footersection.label", half: true },
        { key: "url", label: "footersection.url", kind: "link", half: true },
      ],
    },
  },
};

/**
 * Campos de la cabecera de cada sección (config.headings). En «Nosotros» el
 * título es el propio campo de la sección, así que solo tiene antetítulo y entradilla.
 */
export const HEADING_FIELDS: Partial<Record<SectionKey, ("eyebrow" | "title" | "subtitle")[]>> = {
  about: ["eyebrow", "subtitle"],
  features: ["eyebrow", "title", "subtitle"],
  products: ["eyebrow", "title", "subtitle"],
  gallery: ["eyebrow", "title", "subtitle"],
  video: ["eyebrow", "title", "subtitle"],
  stats: ["eyebrow", "title", "subtitle"],
  steps: ["eyebrow", "title", "subtitle"],
  team: ["eyebrow", "title", "subtitle"],
  testimonials: ["eyebrow", "title", "subtitle"],
  faqs: ["eyebrow", "title", "subtitle"],
  contact: ["eyebrow", "title", "subtitle"],
};
