import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateDespacho",
  category: "business",
  sections: ["brand", "hero", "features", "about", "stats", "team", "products", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Despacho profesional",
      description: "Para abogados, asesorías y gestorías: áreas de práctica, el despacho, equipo, honorarios orientativos y primera consulta.",
      sections: {
        features: "Áreas de práctica",
        about: "El despacho",
        stats: "Cifras",
        team: "Equipo",
        products: "Honorarios",
        testimonials: "Clientes",
        faqs: "Preguntas",
        cta: "Primera consulta",
      },
    },
    en: {
      name: "Law & advisory firm",
      description: "For lawyers, accountants and advisors: practice areas, the firm, team, indicative fees and a first consultation.",
      sections: {
        features: "Practice areas",
        about: "The firm",
        stats: "Numbers",
        team: "Team",
        products: "Fees",
        testimonials: "Clients",
        faqs: "Questions",
        cta: "Consultation",
      },
    },
  },
  strings: {
    es: { request: "Solicitar", orCall: "o llámanos al", office: "Despacho", reach: "Teléfono y email" },
    en: { request: "Request", orCall: "or call us on", office: "Office", reach: "Phone and email" },
  },
  config: {
    theme: {
      colorPrimary: "#14213d",
      colorSecondary: "#b89b5e",
      fontFamily: "Libre Caslon Text",
      fontBody: "Public Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      features: {
        eyebrow: "Áreas de práctica",
        title: "En qué podemos ayudarte",
        subtitle: "Un abogado responsable lleva tu asunto de principio a fin y te contesta directamente.",
      },
      about: { eyebrow: "El despacho", title: "", subtitle: "" },
      stats: { eyebrow: "Cifras", title: "", subtitle: "" },
      team: {
        eyebrow: "Equipo",
        title: "Quién llevará tu asunto",
        subtitle: "Letrados colegiados en el Ilustre Colegio de la Abogacía de Madrid, economistas y graduados sociales.",
      },
      products: {
        eyebrow: "Honorarios",
        title: "Honorarios claros desde el primer día",
        subtitle: "Importes orientativos sin IVA. Antes de empezar te enviamos una hoja de encargo con el presupuesto cerrado.",
      },
      testimonials: { eyebrow: "Clientes", title: "Lo que dicen quienes ya han confiado en nosotros", subtitle: "" },
      faqs: { eyebrow: "Preguntas frecuentes", title: "Antes de la primera consulta", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Dónde encontrarnos",
        subtitle: "En Chamberí, a dos minutos del metro de Alonso Martínez. Atendemos también por videollamada.",
      },
    },
    brand: { name: "Valcárcel & Ortega Abogados", logo: "" },
    hero: {
      eyebrow: "Abogados y asesores fiscales en Madrid desde 1998",
      title: "Rigor jurídico para las decisiones que importan",
      subtitle:
        "Derecho mercantil, fiscal, laboral y de familia para empresas, autónomos y particulares. Te explicamos con claridad qué opciones tienes y cuánto te va a costar.",
      backgroundImage: photo("photo-1763980014986-e1eef48b4e4d"),
      ctaText: "Solicita una primera consulta",
      ctaLink: "#contact",
      secondaryCtaText: "Áreas de práctica",
      secondaryCtaLink: "#features",
    },
    features: [
      {
        icon: "briefcase",
        title: "Mercantil y societario",
        description: "Constitución de sociedades, pactos de socios, compraventa de empresas, contratos y reestructuraciones.",
      },
      {
        icon: "calculator",
        title: "Fiscalidad de empresas y particulares",
        description: "Planificación fiscal, impuesto sobre sociedades, IRPF, patrimonio y defensa ante inspecciones de Hacienda.",
      },
      {
        icon: "handshake",
        title: "Derecho laboral",
        description: "Contratos, despidos, ERTE, inspecciones de trabajo y negociación con la representación de la plantilla.",
      },
      {
        icon: "users",
        title: "Familia y sucesiones",
        description: "Divorcios de mutuo acuerdo y contenciosos, custodias, herencias, testamentos y planificación patrimonial.",
      },
      {
        icon: "house",
        title: "Inmobiliario y arrendamientos",
        description: "Compraventas, alquileres, comunidades de propietarios y reclamaciones por defectos de construcción.",
      },
      {
        icon: "scale",
        title: "Segunda oportunidad",
        description: "Exoneración de deudas para particulares y autónomos al amparo de la Ley Concursal.",
      },
    ],
    about: {
      heading: "Un despacho independiente, con trato directo con quien lleva tu asunto",
      content:
        "Fundamos el despacho en 1998 en la calle de Almagro con una forma de trabajar que mantenemos: cada cliente tiene un abogado responsable que conoce su asunto de principio a fin y le contesta directamente.\n\nHoy somos doce profesionales entre abogados, economistas y graduados sociales. Combinamos la especialización de un despacho grande con la cercanía de uno pequeño, y presupuestamos por escrito cada encargo antes de empezar.",
      image: photo("photo-1758518731462-d091b0b4ed0d"),
    },
    stats: [
      { value: "1998", label: "Año de fundación del despacho" },
      { value: "12", label: "Abogados, economistas y graduados sociales" },
      { value: "1.840", label: "Asuntos cerrados en los últimos cinco años" },
      { value: "230", label: "Empresas con iguala mensual" },
    ],
    team: [
      { name: "Elena Valcárcel", role: "Socia directora · Mercantil y fiscal", image: photo("photo-1665224752136-4dbe2dfc8195") },
      { name: "Álvaro Ortega", role: "Socio · Derecho laboral", image: photo("photo-1560250097-0b93528c311a") },
      { name: "Marta Gil Roldán", role: "Abogada · Familia y sucesiones", image: photo("photo-1573496359142-b8d87734a5a2") },
      { name: "Daniel Herrero", role: "Economista · Fiscalidad", image: photo("photo-1640531005390-38bd92755d6a") },
    ],
    products: [
      {
        title: "Primera consulta",
        description:
          "Reunión de 45 minutos en el despacho o por videollamada\nAnálisis de tu caso y de las opciones, con su coste\nSe descuenta si nos encargas el asunto",
        price: "60 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Iguala para empresas",
        description:
          "Consultas ilimitadas por teléfono y email\nRevisión de contratos y documentación\nAsesoría laboral y fiscal recurrente\n15 % de descuento en procedimientos",
        price: "desde 180 €/mes",
        image: "",
        badge: "La más contratada",
        link: "#contact",
      },
      {
        title: "Divorcio de mutuo acuerdo",
        description: "Convenio regulador redactado a medida\nTramitación completa ante el juzgado\nProcurador incluido",
        price: "desde 650 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Declaración de la renta",
        description: "Revisión del borrador y de las deducciones\nPresentación telemática\nAtención de requerimientos de Hacienda",
        price: "desde 75 €",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    testimonials: [
      {
        name: "Javier Montes",
        role: "Gerente de Montes Instalaciones",
        quote:
          "Llevan la parte laboral y fiscal de la empresa desde hace seis años. Contestan rápido, lo explican todo claro y nunca nos han dado una sorpresa con la factura.",
        avatar: "",
      },
      {
        name: "Lucía Ferrándiz",
        role: "Clienta particular",
        quote: "En un momento muy difícil, Marta me explicó cada paso del divorcio y estuvo disponible siempre que la necesité.",
        avatar: "",
      },
      {
        name: "Rafael Sanz",
        role: "Socio fundador de Brío Estudio",
        quote: "Nos ayudaron a cerrar la entrada de un inversor con un pacto de socios hecho a nuestra medida. Rigurosos y muy prácticos.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta la primera consulta?",
        answer: "60 € más IVA. Dura unos 45 minutos y, si después nos encargas el asunto, se descuenta de los honorarios.",
      },
      {
        question: "¿Puedo hacer la consulta por videollamada?",
        answer:
          "Sí. Atendemos por videollamada a clientes de toda España; solo te pediremos la documentación por email antes de la reunión.",
      },
      {
        question: "¿Cómo se calculan los honorarios?",
        answer:
          "Antes de empezar te enviamos una hoja de encargo con el presupuesto cerrado o el criterio de cálculo. No hay costes ocultos.",
      },
      {
        question: "¿Trabajáis con particulares o solo con empresas?",
        answer:
          "Con ambos. Cerca de la mitad de nuestros asuntos son de particulares: herencias, divorcios, compraventas y la declaración de la renta.",
      },
      {
        question: "¿Qué documentación tengo que llevar?",
        answer:
          "Todo lo relacionado con el asunto: contratos, cartas, notificaciones o sentencias. Si tienes dudas, llámanos y te lo indicamos.",
      },
    ],
    cta: {
      title: "Solicita una primera consulta",
      text: "Cuéntanos tu caso y te diremos con claridad qué opciones tienes, cuánto tiempo puede llevar y cuánto costará.",
      buttonText: "Escríbenos",
      buttonLink: "mailto:consultas@valcarcelortega.es",
    },
    contact: {
      email: "consultas@valcarcelortega.es",
      phone: "910 00 00 00",
      address: "Calle de Almagro 26, 3.º izquierda, 28010 Madrid",
      hours: "Lunes a jueves: 9:00–14:00 y 16:00–19:30\nViernes: 9:00–15:00\nAgosto: 9:00–14:00",
      whatsapp: "",
    },
    footer: {
      text: "Valcárcel & Ortega Abogados, S.L.P. Letrados colegiados en el Ilustre Colegio de la Abogacía de Madrid.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
        { label: "Cookies", url: "#" },
      ],
    },
  },
};

export default template;
