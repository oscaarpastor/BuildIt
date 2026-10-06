import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

// Ejemplo: Estudio Norte, un estudio de branding y diseño web en Chamberí (Madrid).
const template: TemplateDefinition = {
  view: "templateAgencia",
  category: "business",
  sections: ["brand", "hero", "stats", "features", "steps", "products", "about", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Agencia y consultoría",
      description: "Para agencias, estudios, consultores y coaches: servicios, proceso de trabajo, paquetes con precio y clientes.",
      sections: { stats: "Cifras", features: "Servicios", steps: "Proceso", products: "Paquetes", about: "Estudio", testimonials: "Clientes", cta: "Hablemos" },
    },
    en: {
      name: "Agency & consulting",
      description: "For agencies, studios, consultants and coaches: services, process, priced packages and clients.",
      sections: { stats: "Numbers", features: "Services", steps: "Process", products: "Packages", about: "Studio", testimonials: "Clients", cta: "Let's talk" },
    },
  },
  strings: {
    es: { packageCta: "Pedir presupuesto" },
    en: { packageCta: "Request a quote" },
  },
  config: {
    theme: {
      colorPrimary: "#e4572e",
      colorSecondary: "#16181d",
      fontFamily: "Instrument Serif",
      fontBody: "Instrument Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      stats: { eyebrow: "En cifras", title: "Doce años diseñando desde Chamberí", subtitle: "" },
      features: {
        eyebrow: "Servicios",
        title: "Lo que hacemos",
        subtitle: "Un equipo pequeño que se ocupa de todo: de la primera idea a la web publicada.",
      },
      steps: {
        eyebrow: "Proceso",
        title: "Cómo trabajamos",
        subtitle: "Siete semanas de media, con una persona del estudio como contacto fijo de principio a fin.",
      },
      products: {
        eyebrow: "Paquetes",
        title: "Formas de trabajar juntos",
        subtitle: "Precios orientativos sin IVA. Cada proyecto se presupuesta a medida después de la primera reunión.",
      },
      about: { eyebrow: "El estudio", title: "", subtitle: "" },
      testimonials: { eyebrow: "Clientes", title: "Quien ya ha trabajado con nosotros", subtitle: "" },
      faqs: {
        eyebrow: "Preguntas",
        title: "Antes de empezar",
        subtitle: "Lo que más nos preguntan en la primera llamada.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Pásate por el estudio",
        subtitle: "Estamos en Chamberí, a cinco minutos del metro de Quevedo. Mejor si nos avisas antes.",
      },
    },
    brand: { name: "Estudio Norte", logo: "" },
    hero: {
      eyebrow: "Estudio de branding y diseño web en Madrid",
      title: "Diseñamos marcas que la gente recuerda",
      subtitle:
        "Identidad visual, webs y estrategia para negocios independientes y empresas que quieren crecer sin perder su carácter.",
      backgroundImage: photo("photo-1763705857736-2b4f16a33758"),
      ctaText: "Cuéntanos tu proyecto",
      ctaLink: "#contact",
      secondaryCtaText: "Ver servicios",
      secondaryCtaLink: "#features",
    },
    stats: [
      { value: "+140", label: "proyectos de marca y web entregados" },
      { value: "72", label: "clientes, de panaderías de barrio a empresas de energía" },
      { value: "12 años", label: "trabajando desde el mismo estudio" },
      { value: "9 de 10", label: "clientes vuelven con un segundo proyecto" },
    ],
    features: [
      {
        icon: "palette",
        title: "Identidad de marca",
        description:
          "Naming, logotipo, paleta, tipografías y manual de uso. Una marca coherente en el escaparate, en la web y en una factura.",
      },
      {
        icon: "monitor",
        title: "Diseño y desarrollo web",
        description: "Webs rápidas, accesibles y fáciles de editar, pensadas para que te encuentren y te escriban.",
      },
      {
        icon: "compass",
        title: "Estrategia de marca",
        description: "Talleres para definir qué te hace distinto, a quién te diriges y cómo lo cuentas.",
      },
      {
        icon: "package",
        title: "Packaging y editorial",
        description: "Etiquetas, cajas, catálogos y libros, con imprentas de confianza y pruebas de color incluidas.",
      },
      {
        icon: "camera",
        title: "Dirección de arte",
        description: "Sesiones de fotos y guías visuales para que tus redes parezcan de la misma marca.",
      },
    ],
    steps: [
      {
        label: "Semana 1",
        title: "Escuchar",
        description: "Una reunión en el estudio y un taller de medio día para entender tu negocio, tu público y tu competencia.",
      },
      {
        label: "Semanas 2 y 3",
        title: "Proponer",
        description: "Te presentamos dos caminos creativos con ejemplos reales de aplicación. Eliges uno y lo afinamos juntos.",
      },
      {
        label: "Semanas 4 a 6",
        title: "Diseñar",
        description: "Desarrollamos la identidad completa y, si toca, la web. Revisiones cada semana, sin sorpresas.",
      },
      {
        label: "Semana 7",
        title: "Lanzar",
        description: "Entregamos todos los archivos, el manual de marca y una sesión para que tu equipo sepa usarlos.",
      },
    ],
    products: [
      {
        title: "Marca esencial",
        description: "Taller de estrategia de medio día\nLogotipo y versiones\nPaleta de color y tipografías\nManual de marca en PDF",
        price: "desde 3.500 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Marca y web",
        description:
          "Todo lo de Marca esencial\nWeb de hasta 8 páginas\nTextos y SEO básico\nFormación para editarla\n3 meses de soporte",
        price: "desde 7.900 €",
        image: "",
        badge: "El más pedido",
        link: "#contact",
      },
      {
        title: "Acompañamiento",
        description:
          "Un día de estudio a la semana\nCampañas, redes y nuevos productos\nReunión mensual de seguimiento\nSin permanencia desde el tercer mes",
        price: "desde 1.200 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    about: {
      heading: "Un estudio pequeño a propósito",
      content:
        "Somos seis personas entre diseño, desarrollo y estrategia. Preferimos llevar pocos proyectos a la vez y conocer bien a cada cliente: quien te atiende el primer día es quien diseña tu marca.\n\nDesde 2014 hemos trabajado con panaderías, bodegas, despachos, startups y ayuntamientos. Nos gustan los encargos con un problema claro y los clientes que quieren entender por qué hacemos lo que hacemos.",
      image: photo("photo-1777923311853-d14b7beb9fec"),
    },
    testimonials: [
      {
        name: "Rocío Benítez",
        role: "Fundadora de Obrador Benítez",
        quote:
          "Nos rehicieron la marca y la web antes de abrir el segundo local. Ahora la gente nos reconoce por la bolsa de papel, y eso no tiene precio.",
        avatar: photo("photo-1573497019940-1c28c88b4f3e"),
      },
      {
        name: "Álvaro Quintana",
        role: "Director de marketing en Lumbre Energía",
        quote:
          "Lo mejor fue el proceso: cada semana sabíamos en qué punto estaba el proyecto y por qué se tomaba cada decisión.",
        avatar: photo("photo-1784841399243-84f63b4f5e4a"),
      },
      {
        name: "Nerea Ortiz",
        role: "Cofundadora de Ruta Bicis",
        quote:
          "Llegamos con un nombre provisional y un logo hecho en una tarde. Salimos con una marca que por fin parece la de una empresa seria.",
        avatar: photo("photo-1701728667207-54b43dbdab97"),
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda un proyecto de marca?",
        answer: "Entre seis y ocho semanas para una identidad completa. Si incluye web, suma otras cuatro o cinco.",
      },
      {
        question: "¿Trabajáis con clientes fuera de Madrid?",
        answer:
          "Sí, la mitad de nuestros clientes están en otras ciudades. Hacemos el taller inicial por videollamada o nos desplazamos si lo prefieres.",
      },
      {
        question: "¿Cómo se paga?",
        answer: "Un 40 % al aprobar el presupuesto, un 30 % al elegir el camino creativo y el resto en la entrega.",
      },
      {
        question: "¿Y si no me convence ninguna propuesta?",
        answer:
          "Te presentamos dos caminos y hay dos rondas de cambios incluidas. Si aun así no encaja, replanteamos el enfoque contigo sin coste.",
      },
      {
        question: "¿Os ocupáis de la web después de lanzarla?",
        answer: "Si quieres, sí: tenemos planes de mantenimiento mensuales. Si no, te enseñamos a editarla tú.",
      },
    ],
    cta: {
      title: "Hablemos",
      text: "Cuéntanos qué tienes entre manos. Te respondemos en menos de 48 horas con una primera idea de enfoque y presupuesto.",
      buttonText: "Escríbenos",
      buttonLink: "mailto:hola@estudionorte.es",
    },
    contact: {
      email: "hola@estudionorte.es",
      phone: "910 00 00 00",
      address: "Calle de Fernández de los Ríos 38, 28015 Madrid",
      hours: "Lunes a jueves: 9:00–18:30\nViernes: 9:00–15:00",
      whatsapp: "",
    },
    footer: {
      text: "Estudio de branding y diseño web en Madrid.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Behance", url: "https://www.behance.net/" },
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
