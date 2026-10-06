import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateFitness",
  category: "health",
  sections: ["brand", "hero", "features", "products", "stats", "team", "gallery", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Gimnasio y entrenador",
      description: "Para gimnasios, entrenadores personales y estudios de yoga o pilates: clases, tarifas, equipo y prueba gratis.",
      sections: {
        features: "Disciplinas",
        products: "Tarifas",
        stats: "Cifras",
        team: "Entrenadores",
        gallery: "Instalaciones",
        testimonials: "Resultados",
        cta: "Prueba gratis",
      },
    },
    en: {
      name: "Gym & trainer",
      description: "For gyms, personal trainers and yoga or pilates studios: classes, pricing, coaches and a free trial.",
      sections: {
        features: "Classes",
        products: "Pricing",
        stats: "Numbers",
        team: "Coaches",
        gallery: "Facilities",
        testimonials: "Results",
        cta: "Free trial",
      },
    },
  },
  strings: {
    es: { join: "Apúntate", train: "Entrena con nosotros", visit: "Dónde estamos", talk: "Habla con nosotros" },
    en: { join: "Join now", train: "Train with us", visit: "Find us", talk: "Talk to us" },
  },
  config: {
    theme: {
      colorPrimary: "#c6f432",
      colorSecondary: "#2b2f33",
      fontFamily: "Anton",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      features: {
        eyebrow: "Disciplinas",
        title: "Seis disciplinas y un mismo método",
        subtitle: "Todas las clases se adaptan a tu nivel: el peso lo eliges tú y la técnica la cuidamos nosotros.",
      },
      products: {
        eyebrow: "Tarifas",
        title: "Sin matrícula ni permanencia",
        subtitle: "Pagas mes a mes y te das de baja cuando quieras, avisando antes del día 25.",
      },
      stats: { eyebrow: "El club", title: "Un gimnasio de barrio con material de competición", subtitle: "" },
      team: {
        eyebrow: "Coaches",
        title: "Te entrena gente que compite",
        subtitle: "Todo el equipo está titulado en Ciencias del Deporte o TSEAS y se sigue formando cada temporada.",
      },
      gallery: {
        eyebrow: "Instalaciones",
        title: "Material de sobra para no esperar turno",
        subtitle: "850 m² con ocho jaulas, plataformas de halterofilia, zona de remo y bici de aire, y vestuarios con taquilla.",
      },
      testimonials: { eyebrow: "Resultados", title: "Lo que cambia en unos meses", subtitle: "" },
      faqs: {
        eyebrow: "Dudas",
        title: "Antes de tu primera clase",
        subtitle: "¿Te queda alguna pregunta? Escríbenos por WhatsApp y te contestamos el mismo día.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Ven a entrenar",
        subtitle: "A cinco minutos del metro de Legazpi, con aparcamiento para bicis en la puerta.",
      },
    },
    brand: { name: "Forja Training Club", logo: "" },
    hero: {
      eyebrow: "Fuerza y acondicionamiento en Legazpi, Madrid",
      title: "Más fuerte cada semana",
      subtitle:
        "Clases de fuerza y acondicionamiento en grupos de diez personas como máximo, con coaches que corrigen cada repetición. La primera clase es gratis.",
      backgroundImage: photo("photo-1625151936268-e1ffba534f20"),
      ctaText: "Prueba una clase gratis",
      ctaLink: "#cta",
      secondaryCtaText: "Ver tarifas",
      secondaryCtaLink: "#products",
    },
    features: [
      {
        icon: "dumbbell",
        title: "Fuerza",
        description: "Sentadilla, peso muerto y press con programación por bloques. Subes cargas cada semana con la técnica revisada.",
      },
      {
        icon: "flame",
        title: "Acondicionamiento",
        description: "Circuitos de 45 minutos con remo, bici de aire y trineo para ganar fondo sin pasarte horas en la cinta.",
      },
      {
        icon: "zap",
        title: "Halterofilia",
        description: "Arrancada y dos tiempos desde cero, en grupos de ocho como máximo y sobre plataforma propia.",
      },
      {
        icon: "activity",
        title: "Movilidad",
        description: "Sesiones de 30 minutos para ganar rango, cuidar espalda y caderas y recuperar mejor entre entrenos.",
      },
      {
        icon: "target",
        title: "Entrenamiento personal",
        description: "Un plan solo para ti, con valoración inicial, revisión de técnica en vídeo y seguimiento cada semana.",
      },
      {
        icon: "timer",
        title: "Boxeo funcional",
        description: "Rondas de saco, trabajo de pies y combinaciones por intervalos. Sin contacto y apto para cualquier nivel.",
      },
    ],
    products: [
      {
        title: "Básico",
        description: "2 clases a la semana\nSala libre en horario valle\nValoración inicial con un coach",
        price: "49 €/mes",
        image: "",
        badge: "",
        link: "#cta",
      },
      {
        title: "Ilimitado",
        description:
          "Clases ilimitadas de todas las disciplinas\nSala libre de 7:00 a 22:30\nRevisión de objetivos cada trimestre\nTu programación en la app",
        price: "69 €/mes",
        image: "",
        badge: "Más popular",
        link: "#cta",
      },
      {
        title: "Personal",
        description: "4 sesiones individuales al mes\nPlan de fuerza a tu medida\nPautas de nutrición\nIncluye clases y sala libre",
        price: "desde 160 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    stats: [
      { value: "850 m²", label: "de sala con suelo de caucho" },
      { value: "+420", label: "socios entrenando cada semana" },
      { value: "38", label: "clases a la semana" },
      { value: "4,9", label: "de valoración en Google" },
    ],
    team: [
      { name: "Lucía Herrera", role: "Head coach de fuerza", image: photo("photo-1548690312-e3b507d8c110") },
      { name: "Dani Ortega", role: "Halterofilia", image: photo("photo-1758875568932-0eefd3e60090") },
      { name: "Nerea Campos", role: "Acondicionamiento y movilidad", image: photo("photo-1708011108776-45ad9e625269") },
      { name: "Samuel Obi", role: "Entrenador personal", image: photo("photo-1625181796571-7f0d4571ab12") },
    ],
    gallery: [
      { image: photo("photo-1685633225603-9a1ffafd11fe"), caption: "Zona de halterofilia" },
      { image: photo("photo-1577992805669-c80be3285f36"), caption: "Ocho jaulas de sentadilla" },
      { image: photo("photo-1642585999273-2d9d95318ba6"), caption: "Kettlebells de 4 a 48 kg" },
      { image: photo("photo-1561140895-9d144461935e"), caption: "Rig de dominadas" },
      { image: photo("photo-1597076545399-91a3ff0e71b3"), caption: "Zona funcional" },
      { image: photo("photo-1758875569612-94d5e0f1a35f"), caption: "Sala de acondicionamiento" },
    ],
    testimonials: [
      {
        name: "Elena Prieto",
        role: "−9 kg en cinco meses",
        quote:
          "Llegué sin haber tocado una barra y con miedo a lesionarme. Ahora entreno cuatro días por semana y lo echo de menos cuando me voy de viaje.",
        avatar: "",
      },
      {
        name: "Marcos Villa",
        role: "Peso muerto: de 60 a 140 kg",
        quote: "Lo que más valoro es que te corrigen de verdad. En un año he doblado mis marcas sin una sola molestia de espalda.",
        avatar: "",
      },
      {
        name: "Carmen Ruiz",
        role: "Primera carrera de 10 km",
        quote: "Empecé por el acondicionamiento para coger fondo y acabé corriendo mi primer 10K con 52 años. El grupo engancha.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Necesito experiencia previa?",
        answer:
          "No. Más de la mitad de los socios empezaron sin experiencia. Adaptamos cada ejercicio y las cargas a tu nivel desde el primer día.",
      },
      {
        question: "¿Hay matrícula o permanencia?",
        answer:
          "No hay permanencia: te das de baja avisando antes del día 25. La matrícula es de 30 € y no la pagas si te apuntas la misma semana de tu clase de prueba.",
      },
      {
        question: "¿Cómo funciona la clase de prueba?",
        answer:
          "Reservas por WhatsApp, vienes 15 minutos antes y un coach te enseña el club y te acompaña durante la sesión. Solo necesitas ropa cómoda y agua.",
      },
      {
        question: "¿Puedo congelar la cuota?",
        answer: "Sí, hasta dos meses al año por viaje, lesión o lo que necesites, sin coste.",
      },
      {
        question: "¿Hay duchas y taquillas?",
        answer: "Sí. Vestuarios con duchas, secadores y taquillas con candado. Las toallas las traes tú.",
      },
    ],
    cta: {
      title: "Prueba una clase gratis",
      text: "Ven un día, entrena con el grupo y decide después. Si te apuntas esa misma semana, no pagas matrícula.",
      buttonText: "Reservar por WhatsApp",
      buttonLink: "https://wa.me/34600000000",
    },
    contact: {
      email: "hola@forjatraining.es",
      phone: "910 00 00 00",
      address: "Paseo de la Chopera 14, 28045 Madrid",
      hours: "Lunes a viernes: 7:00–22:30\nSábado: 9:00–14:00\nDomingo: 10:00–13:00",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Club de fuerza y acondicionamiento en Legazpi, Madrid.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
