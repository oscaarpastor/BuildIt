export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Heading = { eyebrow: string; title: string; subtitle: string };

/** Secciones con cabecera editable (antetítulo, título y entradilla). */
export type HeadingKey =
  | "about"
  | "features"
  | "products"
  | "gallery"
  | "video"
  | "stats"
  | "steps"
  | "team"
  | "testimonials"
  | "faqs"
  | "program"
  | "contact";

export type SiteLanguage = "es" | "en";

export type SiteConfig = {
  theme: {
    colorPrimary: string;
    colorSecondary: string;
    /** Letra de los títulos */
    fontFamily: string;
    /** Letra del texto */
    fontBody?: string;
    darkMode?: boolean;
    /** Idioma de los textos fijos de la web */
    language?: SiteLanguage;
  };
  headings: Record<HeadingKey, Heading>;
  brand: {
    name: string;
    logo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  about: {
    heading: string;
    content: string;
    image: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  products: {
    title: string;
    description: string;
    price: string;
    image: string;
    badge: string;
    link: string;
  }[];
  gallery: {
    image: string;
    caption: string;
  }[];
  video: {
    url: string;
    thumbnail: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  steps: {
    label: string;
    title: string;
    description: string;
  }[];
  team: {
    name: string;
    role: string;
    image: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    avatar: string;
  }[];
  documentation: {
    title: string;
    url: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  inspiration: {
    category: string;
    name: string;
    image: string;
    link: string;
    description: string;
  }[];
  program: {
    title: string;
    image: string;
    reason: string;
    functioning: string;
    methodology: string;
    selection: string;
    cta1: { text: string; link: string };
    cta2: { text: string; link: string };
  };
  cta: {
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
    whatsapp: string;
  };
  footer: {
    text: string;
    links: { label: string; url: string }[];
  };
};

export type SectionKey = Exclude<keyof SiteConfig, "theme" | "headings">;

/** Secciones que se pueden ocultar en la web generada (la marca va en la cabecera). */
export type HideableSection = Exclude<SectionKey, "brand">;

export type ProjectStats = {
  views: number;
  clicks: number;
  lastAccess: string | null;
};

export type TemplateCategory = "business" | "food" | "health" | "creative" | "shop" | "events" | "education";

type TemplateText = {
  name: string;
  description: string;
  /** Nombre de las secciones en esa plantilla («Carta» en vez de «Productos») */
  sections: Partial<Record<SectionKey, string>>;
};

/** Lo que la API cuenta de una plantilla: categoría, secciones y nombres en cada idioma. */
export type TemplateInfo = {
  view: string;
  category: TemplateCategory;
  sections: SectionKey[];
  text: Record<SiteLanguage, TemplateText>;
};

export type Project = {
  _id: string;
  name: string;
  publicId: string;
  view: string;
  hiddenSections: HideableSection[];
  createdAt: string;
  updatedAt: string;
  config: SiteConfig;
  /** Plantilla de la web (null si ya no existe en el catálogo) */
  template?: TemplateInfo | null;
};

export type ProjectSummary = Pick<Project, "_id" | "name" | "publicId" | "createdAt" | "updatedAt"> & {
  stats: ProjectStats;
};

export type BaseTemplate = TemplateInfo & {
  _id: string;
  name: string;
  description?: string;
};
