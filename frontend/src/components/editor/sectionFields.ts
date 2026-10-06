import type { SectionKey } from "../../types";

// Qué campos tiene cada sección del editor. Las etiquetas son claves de traducción.

/**
 * text, textarea, email y tel son campos normales.
 * image: dirección de una imagen, con miniatura.
 * link: enlace, que admite #seccion, mailto: y tel:.
 */
export type FieldKind = "text" | "textarea" | "image" | "link" | "email" | "tel";

export type FieldDef = {
  /** Ruta dentro de la sección; puede llevar puntos (cta1.text). */
  key: string;
  label: string;
  kind?: FieldKind;
  placeholder?: string;
  /** Ocupa media fila en pantallas anchas (pares como texto + enlace del botón). */
  half?: boolean;
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
      { key: "title", label: "herosection.main_title" },
      { key: "subtitle", label: "herosection.subtitle", kind: "textarea" },
      { key: "backgroundImage", label: "herosection.background", kind: "image" },
      { key: "ctaText", label: "herosection.cta_text", half: true },
      { key: "ctaLink", label: "herosection.cta_link", kind: "link", half: true },
    ],
  },
  about: {
    fields: [
      { key: "heading", label: "aboutsection.heading" },
      { key: "content", label: "aboutsection.content", kind: "textarea" },
      { key: "image", label: "aboutsection.image", kind: "image" },
    ],
  },
  features: {
    list: {
      item: "featuresection.item",
      add: "featuresection.add",
      empty: { icon: "", title: "", description: "" },
      fields: [
        { key: "icon", label: "featuresection.icon", placeholder: "featuresection.icon_placeholder" },
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
      empty: { title: "", description: "", price: "", image: "" },
      fields: [
        { key: "title", label: "productsection.title_label", placeholder: "productsection.title_placeholder" },
        {
          key: "description",
          label: "productsection.description",
          kind: "textarea",
          placeholder: "productsection.description_placeholder",
        },
        { key: "price", label: "productsection.price", placeholder: "productsection.price_placeholder" },
        { key: "image", label: "productsection.image", kind: "image", placeholder: "productsection.image_placeholder" },
      ],
    },
  },
  gallery: {
    list: {
      item: "gallerysection.item",
      add: "gallerysection.add",
      empty: { image: "" },
      fields: [
        { key: "image", label: "gallerysection.image_label", kind: "image", placeholder: "gallerysection.image_placeholder" },
      ],
    },
  },
  video: {
    fields: [
      { key: "url", label: "videosection.url", placeholder: "videosection.url_placeholder" },
      { key: "thumbnail", label: "videosection.thumbnail", kind: "image", placeholder: "videosection.thumbnail_placeholder" },
    ],
  },
  testimonials: {
    list: {
      item: "testimonialssection.item",
      add: "testimonialssection.add_button",
      empty: { name: "", quote: "", avatar: "" },
      fields: [
        { key: "name", label: "testimonialssection.name", placeholder: "testimonialssection.name_placeholder" },
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
  contact: {
    fields: [
      { key: "email", label: "contactsection.email", kind: "email" },
      { key: "phone", label: "contactsection.phone", kind: "tel" },
      { key: "address", label: "contactsection.address" },
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
