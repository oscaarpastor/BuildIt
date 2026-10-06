import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateReformas",
  category: "business",
  sections: ["brand", "hero", "stats", "features", "steps", "gallery", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Reformas",
      description: "Para reformas, construcción y oficios: servicios, proceso de obra, trabajos terminados y presupuesto.",
      sections: { stats: "Cifras", features: "Servicios", steps: "Proceso", gallery: "Obras", testimonials: "Opiniones", cta: "Presupuesto" },
    },
    en: {
      name: "Renovations",
      description: "For renovation, building and trades: services, how the job runs, finished projects and quotes.",
      sections: { stats: "Numbers", features: "Services", steps: "Process", gallery: "Projects", testimonials: "Reviews", cta: "Quote" },
    },
  },
  strings: {
    es: {
      orCall: "¿Prefieres llamar?",
      office: "Oficina",
      callFree: "Llámanos",
      writeEmail: "Escríbenos un email",
      reviewsLabel: "Valoración de cinco estrellas",
    },
    en: {
      orCall: "Rather talk?",
      office: "Office",
      callFree: "Call us",
      writeEmail: "Send us an email",
      reviewsLabel: "Five-star rating",
    },
  },
  config: {
    theme: {
      colorPrimary: "#f2b705",
      colorSecondary: "#1e2328",
      fontFamily: "Archivo",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      stats: { eyebrow: "En cifras", title: "Más de veinte años reformando casas en Madrid", subtitle: "" },
      features: {
        eyebrow: "Servicios",
        title: "Todo lo que necesita tu casa, con un mismo equipo",
        subtitle: "Albañiles, fontaneros, electricistas y carpinteros de plantilla. Sin subcontratas encadenadas ni sorpresas en la factura.",
      },
      steps: {
        eyebrow: "Cómo trabajamos",
        title: "De la primera visita a la entrega de llaves",
        subtitle: "Sabrás en todo momento en qué punto está tu obra y quién está trabajando en ella.",
      },
      gallery: {
        eyebrow: "Obras",
        title: "Trabajos terminados",
        subtitle: "Algunas de las últimas reformas que hemos entregado en Madrid, con fotos de antes y después.",
      },
      testimonials: { eyebrow: "Opiniones", title: "Lo que cuentan nuestros clientes", subtitle: "" },
      faqs: {
        eyebrow: "Preguntas",
        title: "Lo que nos preguntáis antes de empezar",
        subtitle: "Si tu duda no está aquí, llámanos y te la resolvemos en el momento.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Pide tu presupuesto",
        subtitle:
          "Trabajamos en Madrid capital y en los municipios a menos de 30\u00a0km: Alcobendas, Pozuelo, Las Rozas, Getafe, Leganés y Rivas.",
      },
    },
    brand: { name: "Pardo Reformas", logo: "" },
    hero: {
      eyebrow: "Reformas integrales en Madrid",
      title: "Tu reforma, con precio cerrado y fecha de entrega",
      subtitle:
        "Cocinas, baños y pisos completos en Madrid y alrededores. Un solo interlocutor desde la primera visita hasta la entrega de llaves.",
      backgroundImage: photo("photo-1585128833500-ec98262cb4f5"),
      ctaText: "Pide presupuesto gratis",
      ctaLink: "#contact",
      secondaryCtaText: "Ver obras terminadas",
      secondaryCtaLink: "#gallery",
    },
    stats: [
      { value: "22 años", label: "reformando en Madrid" },
      { value: "+640", label: "obras entregadas" },
      { value: "5 años", label: "de garantía por escrito" },
      { value: "4,9", label: "de valoración media en Google" },
    ],
    features: [
      {
        icon: "utensils",
        title: "Cocinas",
        description: "Diseño, muebles a medida, encimeras y electrodomésticos. Montamos la cocina completa en unas tres semanas.",
      },
      {
        icon: "bath",
        title: "Baños",
        description: "Cambiamos la bañera por un plato de ducha en dos días o reformamos el baño entero con alicatado y sanitarios nuevos.",
      },
      {
        icon: "house",
        title: "Reformas integrales",
        description: "Pisos completos: distribución, instalaciones, suelos y acabados, con un jefe de obra que lo coordina todo.",
      },
      {
        icon: "zap",
        title: "Electricidad y fontanería",
        description: "Instalaciones nuevas con boletín, cuadros eléctricos y tuberías de multicapa que cumplen la normativa actual.",
      },
      {
        icon: "ruler",
        title: "Suelos y carpintería",
        description: "Tarima, parqué, porcelánico y puertas lacadas. Medimos al milímetro y protegemos todo lo que no se toca.",
      },
      {
        icon: "paint-roller",
        title: "Pintura y pladur",
        description: "Alisado de gotelé, falsos techos, tabiques de pladur e iluminación empotrada.",
      },
    ],
    steps: [
      {
        label: "",
        title: "Visita y medición",
        description: "Vamos a tu casa sin coste, tomamos medidas y escuchamos lo que quieres. Te orientamos sobre materiales y plazos reales.",
      },
      {
        label: "",
        title: "Presupuesto cerrado",
        description: "En menos de una semana recibes un presupuesto desglosado por partidas. El precio que firmas es el que pagas.",
      },
      {
        label: "",
        title: "Obra",
        description: "Un jefe de obra coordina cada gremio y te manda fotos del avance cada viernes. Protegemos zonas comunes y limpiamos a diario.",
      },
      {
        label: "",
        title: "Entrega",
        description: "Revisamos contigo cada detalle, te damos la documentación de las instalaciones y la garantía de cinco años por escrito.",
      },
    ],
    gallery: [
      { image: photo("photo-1628745277866-0c4468030a81"), caption: "Cocina abierta en Chamberí" },
      { image: photo("photo-1592302929618-e8a8a8e43dce"), caption: "Antes: baño en Tetuán" },
      { image: photo("photo-1629079447777-1e605162dc8d"), caption: "Después: baño en Tetuán" },
      { image: photo("photo-1722942116453-55198a24aa1b"), caption: "Salón con tarima en espiga en Arganzuela" },
      { image: photo("photo-1687816042354-9d872af578d2"), caption: "Reforma integral en Retiro" },
      { image: photo("photo-1523413363574-c30aa1c2a516"), caption: "Alicatado a mano en Usera" },
    ],
    testimonials: [
      {
        name: "Elena Marín",
        role: "Reforma integral en Chamberí",
        quote:
          "Nos entregaron el piso el día que dijeron y por el precio del presupuesto. El jefe de obra nos mandaba fotos cada semana y no tuvimos que perseguir a nadie.",
        avatar: "",
      },
      {
        name: "Javier y Nuria",
        role: "Baño en Tetuán",
        quote: "Cambiaron la bañera por un plato de ducha en dos días y lo dejaron todo limpio. Ya les hemos pedido presupuesto para la cocina.",
        avatar: "",
      },
      {
        name: "Rosa Delgado",
        role: "Cocina en Arganzuela",
        quote:
          "Muy serios con los plazos. Apareció una tubería que no estaba prevista y nos lo explicaron con fotos antes de tocar nada.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda una reforma?",
        answer:
          "Un baño, entre 7 y 10 días laborables. Una cocina, unas tres semanas. Un piso completo de 80\u00a0m², entre 8 y 10 semanas. La fecha de entrega va por escrito en el contrato.",
      },
      {
        question: "¿Os encargáis de los permisos?",
        answer:
          "Sí. Tramitamos la declaración responsable o la licencia de obra en el ayuntamiento y te decimos si la comunidad tiene que autorizar algo.",
      },
      {
        question: "¿Qué garantía tienen los trabajos?",
        answer:
          "Cinco años en instalaciones y albañilería y dos años en acabados, por escrito. Si algo falla, venimos a revisarlo sin coste.",
      },
      {
        question: "¿Puedo seguir viviendo en casa durante la obra?",
        answer:
          "En una reforma de baño o de cocina, sí. En una reforma integral te recomendamos salir unas semanas: la obra va más rápida y te ahorras polvo y ruido.",
      },
      {
        question: "¿Cómo se paga?",
        answer: "Un 20\u00a0% al firmar, pagos por fases según avanza la obra y un 10\u00a0% final cuando das el visto bueno a la entrega.",
      },
    ],
    cta: {
      title: "¿Tienes una reforma en mente?",
      text: "Te visitamos esta misma semana, medimos sin compromiso y en unos días tienes un presupuesto cerrado.",
      buttonText: "Pide presupuesto gratis",
      buttonLink: "#contact",
    },
    contact: {
      email: "presupuestos@pardoreformas.es",
      phone: "910 00 00 00",
      address: "Calle de Bravo Murillo 211, 28020 Madrid",
      hours: "Lunes a viernes: 8:00–18:00\nSábados: 9:00–13:00, solo visitas con cita",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Reformas integrales, cocinas y baños en Madrid desde 2003. Empresa inscrita en el Registro de Empresas Acreditadas (REA).",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
