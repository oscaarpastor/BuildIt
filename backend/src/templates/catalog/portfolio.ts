import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templatePortfolio",
  category: "creative",
  sections: ["brand", "hero", "about", "features", "products", "gallery", "steps", "testimonials", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Portfolio",
      description: "Para diseñadores, desarrolladores y estudiantes: proyectos, habilidades, experiencia y contacto.",
      sections: {
        about: "Sobre mí",
        features: "Habilidades",
        products: "Proyectos",
        gallery: "Más trabajos",
        steps: "Experiencia",
        testimonials: "Recomendaciones",
        cta: "Hablemos",
      },
    },
    en: {
      name: "Portfolio",
      description: "For designers, developers and students: projects, skills, experience and contact.",
      sections: {
        about: "About me",
        features: "Skills",
        products: "Projects",
        gallery: "More work",
        steps: "Experience",
        testimonials: "Recommendations",
        cta: "Let's talk",
      },
    },
  },
  strings: {
    es: { caseStudy: "Ver el proyecto", location: "Dónde", availability: "Disponibilidad" },
    en: { caseStudy: "View project", location: "Based in", availability: "Availability" },
  },
  config: {
    theme: {
      colorPrimary: "#ff4f1f",
      colorSecondary: "#18181b",
      fontFamily: "Space Grotesk",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "Sobre mí", title: "", subtitle: "" },
      features: {
        eyebrow: "Habilidades",
        title: "Del primer boceto a la pantalla que se publica",
        subtitle: "Me gusta estar en todo el proceso: hablar con la gente, decidir qué se construye y cuidar cada detalle de la interfaz.",
      },
      products: {
        eyebrow: "Proyectos",
        title: "Trabajo seleccionado",
        subtitle: "Cinco proyectos de los últimos años. En cada uno cuento el problema, el proceso y lo que cambió después.",
      },
      gallery: { eyebrow: "Más trabajos", title: "Bocetos, identidades y encargos pequeños", subtitle: "" },
      steps: { eyebrow: "Experiencia", title: "Nueve años entre estudio y producto", subtitle: "" },
      testimonials: { eyebrow: "Recomendaciones", title: "Lo que cuentan quienes han trabajado conmigo", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Cuéntame en qué estás trabajando",
        subtitle: "Te respondo en menos de 48 horas con preguntas, ideas y un primer presupuesto.",
      },
    },
    brand: { name: "Marta Vidal", logo: "" },
    hero: {
      eyebrow: "Disponible para proyectos desde noviembre",
      title: "Diseño apps y webs que se entienden a la primera.",
      subtitle:
        "Soy Marta Vidal, diseñadora de producto en Barcelona. Llevo siete años con equipos de fintech, salud y movilidad: de la investigación con usuarios a la interfaz final.",
      backgroundImage: photo("photo-1654512504066-e5af36ceaa27"),
      ctaText: "Ver proyectos",
      ctaLink: "#products",
      secondaryCtaText: "Descargar CV",
      secondaryCtaLink: "https://martavidal.es/cv-marta-vidal.pdf",
    },
    about: {
      heading: "Empecé haciendo carteles y me quedé en el producto digital porque me encanta ver a la gente usar lo que diseño.",
      content:
        "Estudié Diseño Gráfico en Barcelona y pasé dos años en un estudio haciendo identidades y webs. Allí descubrí que lo que más me gustaba era entender por qué alguien se atasca en una pantalla y arreglarlo.\n\nDesde entonces trabajo en equipos de producto, siempre cerca de desarrollo. Pruebo pronto, mido después y documento lo justo para que el siguiente pueda seguir sin preguntarme. Fuera del trabajo, doy clases de prototipado y dibujo en libretas que nunca acabo.",
      image: photo("photo-1581291518857-4e27b48ff24e"),
    },
    features: [
      {
        icon: "users",
        title: "Investigación con usuarios",
        description: "Entrevistas, pruebas de usabilidad y análisis de datos para decidir con algo más que intuición.",
      },
      {
        icon: "layout-grid",
        title: "Diseño de interfaces",
        description: "Pantallas claras para iOS, Android y web, con jerarquía, ritmo y estados pensados de principio a fin.",
      },
      {
        icon: "smartphone",
        title: "Prototipado e interacción",
        description: "Prototipos en Figma y ProtoPie para probar ideas en días, no en semanas.",
      },
      {
        icon: "layers",
        title: "Sistemas de diseño",
        description: "Componentes, tokens y documentación que diseño y desarrollo usan de verdad.",
      },
      {
        icon: "shield-check",
        title: "Accesibilidad",
        description: "Contraste, foco, lectores de pantalla y textos claros desde el primer boceto, no al final.",
      },
    ],
    products: [
      {
        title: "Nubo, la app de ahorro que se explica sola",
        description:
          "Rediseño completo de la app de un neobanco: nuevo onboarding, metas de ahorro y un resumen mensual que la gente sí abre. Las altas completadas subieron un 31 %.",
        price: "2025",
        image: photo("photo-1609921141835-710b7fa6e438"),
        badge: "Fintech, iOS y Android",
        link: "https://martavidal.es/proyectos/nubo",
      },
      {
        title: "Holdo, facturación para autónomos",
        description: "Panel web para crear facturas, ver impuestos del trimestre y avisos de cobro en un solo vistazo.",
        price: "2024",
        image: photo("photo-1571677246347-5040036b95cc"),
        badge: "SaaS, Web app",
        link: "https://martavidal.es/proyectos/holdo",
      },
      {
        title: "Movi, movilidad urbana",
        description: "App para combinar bus, metro y bici compartida en Barcelona, con el tiempo y el tráfico a mano.",
        price: "2023",
        image: photo("photo-1551650975-87deedd944c3"),
        badge: "Movilidad, App",
        link: "https://martavidal.es/proyectos/movi",
      },
      {
        title: "Identidad para One Studio",
        description: "Logotipo, papelería y web para un estudio de arquitectura del Poblenou.",
        price: "2023",
        image: photo("photo-1763705857736-2b4f16a33758"),
        badge: "Branding",
        link: "https://martavidal.es/proyectos/one-studio",
      },
      {
        title: "Evano, moda sostenible",
        description: "Tienda online pensada para el móvil, con fichas de producto que cuentan de dónde viene cada prenda.",
        price: "2022",
        image: photo("photo-1627542557169-5ed71c66ed85"),
        badge: "E-commerce",
        link: "https://martavidal.es/proyectos/evano",
      },
    ],
    gallery: [
      { image: photo("photo-1629752187687-3d3c7ea3a21b"), caption: "Bocetos de pantallas para Movi" },
      { image: photo("photo-1610454059772-5c751844f937"), caption: "Experimento tipográfico" },
      { image: photo("photo-1633533447057-56ccf997f4fe"), caption: "Packaging para un tostador de café" },
      { image: photo("photo-1616205255812-c07c8102cc02"), caption: "Bolsa para una panadería de Gràcia" },
      { image: photo("photo-1522542550221-31fd19575a2d"), caption: "Taller de wireframes con alumnos" },
      { image: photo("photo-1614036634955-ae5e90f9b9eb"), caption: "Maquetación para una revista de diseño" },
    ],
    steps: [
      {
        label: "2022 — hoy",
        title: "Diseñadora de producto sénior en Nubo",
        description: "Lidero el diseño de la app de ahorro con un equipo de doce personas. Creé el sistema de diseño y el proceso de investigación continua.",
      },
      {
        label: "2019 — 2022",
        title: "Diseñadora UX/UI en Movi",
        description: "Primera diseñadora del equipo: de la app de una sola ciudad a cuatro, con más de 200.000 usuarios al mes.",
      },
      {
        label: "2017 — 2019",
        title: "Diseñadora gráfica y web en Estudio Clara",
        description: "Identidades, webs y packaging para comercios y marcas pequeñas de Barcelona.",
      },
      {
        label: "2013 — 2017",
        title: "Grado en Diseño Gráfico y Multimedia",
        description: "Trabajo final sobre interfaces de voz para personas mayores, con matrícula de honor.",
      },
    ],
    testimonials: [
      {
        name: "Jordi Puig",
        role: "CEO de Nubo",
        quote:
          "Marta tiene una mezcla rara: piensa como alguien de negocio y diseña con un cuidado enorme. Con ella dejamos de discutir opiniones y empezamos a probar cosas con usuarios.",
        avatar: photo("photo-1651684215020-f7a5b6610f23"),
      },
      {
        name: "Carmen Ortega",
        role: "Directora de producto en Movi",
        quote: "Ordenó un producto que había crecido a trompicones y lo hizo sin parar al equipo. Sus documentos de diseño siguen siendo la referencia.",
        avatar: photo("photo-1573497019940-1c28c88b4f3e"),
      },
      {
        name: "Álex Navarro",
        role: "Desarrollador iOS en Nubo",
        quote: "Sus diseños llegan con todos los estados resueltos y los componentes nombrados igual que en el código. Da gusto trabajar así.",
        avatar: photo("photo-1531750026848-8ada78f641c2"),
      },
    ],
    cta: {
      title: "¿Tienes un producto entre manos?",
      text: "Acepto proyectos freelance de dos a seis meses y colaboraciones con equipos de producto, en remoto o en Barcelona.",
      buttonText: "Escríbeme",
      buttonLink: "mailto:hola@martavidal.es",
    },
    contact: {
      email: "hola@martavidal.es",
      phone: "600 00 00 00",
      address: "Poblenou, Barcelona",
      hours: "Lunes a jueves: 9:00–18:00\nViernes: 9:00–14:00",
      whatsapp: "",
    },
    footer: {
      text: "Diseño de producto desde Barcelona para equipos de cualquier sitio.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
        { label: "Dribbble", url: "https://dribbble.com/" },
        { label: "GitHub", url: "https://github.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
