export type User = {
  _id: string;
  name: string;
  email: string;
};

export type SiteConfig = {
  theme: {
    colorPrimary: string;
    colorSecondary: string;
    fontFamily: string;
    darkMode?: boolean;
  };
  brand: {
    name: string;
    logo: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
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
  }[];
  gallery: {
    image: string;
  }[];
  video: {
    url: string;
    thumbnail: string;
  };
  testimonials: {
    name: string;
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
  contact: {
    email: string;
    phone: string;
    address: string;
    formEnabled: boolean;
  };
  footer: {
    text: string;
    links: { label: string; url: string }[];
  };
};

export type SectionKey = Exclude<keyof SiteConfig, "theme">;

export type Project = {
  _id: string;
  name: string;
  publicId: string;
  view: string;
  hiddenSections: SectionKey[];
  createdAt: string;
  updatedAt: string;
  config: SiteConfig;
};

export type ProjectSummary = Pick<Project, "_id" | "name" | "publicId" | "createdAt" | "updatedAt">;

export type BaseTemplate = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  gradient?: string;
};
