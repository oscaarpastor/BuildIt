// Estructura de contenido de una web. La comparten las plantillas base
// (BaseTemplate) y los proyectos de los usuarios (Project).

// Cabecera de una sección: antetítulo corto (también da nombre al enlace del
// menú), título y entradilla.
const heading = () => ({ eyebrow: String, title: String, subtitle: String });

// Secciones con cabecera editable. Tiene que coincidir con HEADING_KEYS
// (validation/schemas.ts).
const headings = {
  about: heading(),
  features: heading(),
  products: heading(),
  gallery: heading(),
  video: heading(),
  stats: heading(),
  steps: heading(),
  team: heading(),
  testimonials: heading(),
  faqs: heading(),
  program: heading(),
  contact: heading(),
};

export const siteConfigDefinition = {
  theme: {
    colorPrimary: String,
    colorSecondary: String,
    /** Letra de los títulos (y de todo el texto si no hay fontBody). */
    fontFamily: String,
    /** Letra del texto. */
    fontBody: String,
    darkMode: Boolean,
    /** Idioma de los textos fijos de la web («Horario», «Abrir menú»…). */
    language: String,
  },
  headings,
  brand: {
    name: String,
    logo: String
  },
  hero: {
    eyebrow: String,
    title: String,
    subtitle: String,
    backgroundImage: String,
    ctaText: String,
    ctaLink: String,
    secondaryCtaText: String,
    secondaryCtaLink: String,
  },
  about: {
    heading: String,
    content: String,
    image: String,
  },
  features: [
    {
      icon: String,
      title: String,
      description: String,
    },
  ],
  products: [
    {
      title: String,
      description: String,
      price: String,
      image: String,
      badge: String,
      link: String,
    },
  ],
  gallery: [
    {
      image: String,
      caption: String,
    }
  ],
  video: {
    url: String,
    thumbnail: String
  },
  stats: [
    {
      value: String,
      label: String,
    },
  ],
  steps: [
    {
      /** Etiqueta opcional: hora, fechas o número de paso. */
      label: String,
      title: String,
      description: String,
    },
  ],
  team: [
    {
      name: String,
      role: String,
      image: String,
    },
  ],
  testimonials: [
    {
      name: String,
      role: String,
      quote: String,
      avatar: String,
    },
  ],
  documentation: [
    {
      title: String,
      url: String
    }
  ],
  faqs: [
    {
      question: String,
      answer: String
    }
  ],
  inspiration: [
    {
      category: String,
      name: String,
      image: String,
      link: String,
      description: String
    }
  ],
  program: {
    title: String,
    image: String,
    reason: String,
    functioning: String,
    methodology: String,
    selection: String,
    cta1: {
      text: String,
      link: String
    },
    cta2: {
      text: String,
      link: String
    }
  },
  cta: {
    title: String,
    text: String,
    buttonText: String,
    buttonLink: String,
  },
  contact: {
    email: String,
    phone: String,
    address: String,
    hours: String,
    /** Número de WhatsApp: pinta un botón para escribir por WhatsApp. */
    whatsapp: String,
  },
  footer: {
    text: String,
    links: [
      {
        label: String,
        url: String
      }
    ]
  }
};
