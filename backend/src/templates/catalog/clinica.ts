import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateClinica",
  category: "health",
  sections: ["brand", "hero", "features", "about", "stats", "team", "products", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Clínica",
      description: "Para clínicas dentales, médicas y veterinarias: tratamientos, equipo, primera visita con precios, dudas frecuentes y cita previa.",
      sections: {
        features: "Tratamientos",
        about: "La clínica",
        stats: "Cifras",
        team: "Equipo médico",
        products: "Primera visita",
        testimonials: "Pacientes",
        faqs: "Dudas",
        cta: "Pedir cita",
      },
    },
    en: {
      name: "Clinic",
      description: "For dental, medical and vet clinics: treatments, team, first visit with prices, common questions and appointments.",
      sections: {
        features: "Treatments",
        about: "The clinic",
        stats: "Numbers",
        team: "Our doctors",
        products: "First visit",
        testimonials: "Patients",
        faqs: "Questions",
        cta: "Book",
      },
    },
  },
  strings: {
    es: {
      appointment: "Cita previa",
      bookVisit: "Pedir cita",
      orCall: "o llama al",
      moreDoubts: "¿Te queda alguna duda?",
      callAndAsk: "Llámanos y te la resolvemos sin compromiso.",
    },
    en: {
      appointment: "Appointments",
      bookVisit: "Book a visit",
      orCall: "or call",
      moreDoubts: "Still have a question?",
      callAndAsk: "Call us and we will gladly help.",
    },
  },
  config: {
    theme: {
      colorPrimary: "#0e7c7b",
      colorSecondary: "#d8c3a0",
      fontFamily: "Manrope",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      features: {
        eyebrow: "Tratamientos",
        title: "Todo lo que necesita tu boca, en un mismo sitio",
        subtitle: "Te proponemos solo lo necesario y te damos el presupuesto por escrito antes de empezar cualquier tratamiento.",
      },
      about: { eyebrow: "La clínica", title: "", subtitle: "" },
      stats: { eyebrow: "En cifras", title: "Veinte años cuidando sonrisas en el centro de Sevilla", subtitle: "" },
      team: {
        eyebrow: "Equipo médico",
        title: "Las personas que te van a atender",
        subtitle: "Odontólogos colegiados en el Colegio Oficial de Dentistas de Sevilla, cada uno centrado en su especialidad.",
      },
      products: {
        eyebrow: "Primera visita",
        title: "Empieza por una revisión, sin compromiso",
        subtitle: "Precios finales. Financiamos los tratamientos a partir de 600 € hasta en 24 meses sin intereses.",
      },
      testimonials: { eyebrow: "Pacientes", title: "Lo que nos cuentan quienes ya vienen", subtitle: "" },
      faqs: {
        eyebrow: "Dudas frecuentes",
        title: "Antes de tu primera cita",
        subtitle: "Lo que más nos preguntan por teléfono, resumido.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Estamos en pleno Arenal",
        subtitle: "A cinco minutos andando de la Puerta de Jerez, con parking público en la calle Arjona.",
      },
    },
    brand: { name: "Clínica Dental Arenal", logo: "" },
    hero: {
      eyebrow: "Clínica dental en el Arenal, Sevilla",
      title: "Una clínica dental donde te lo explicamos todo",
      subtitle:
        "Odontología general, implantes, ortodoncia invisible y estética dental en el centro de Sevilla. Con presupuesto por escrito y sin sorpresas.",
      backgroundImage: photo("photo-1777331903190-341a3dd0441b"),
      ctaText: "Pide tu cita",
      ctaLink: "#contact",
      secondaryCtaText: "Ver tratamientos",
      secondaryCtaLink: "#features",
    },
    features: [
      {
        icon: "stethoscope",
        title: "Odontología general",
        description: "Revisiones, empastes, endodoncias y limpiezas para mantener tu boca sana todo el año.",
      },
      {
        icon: "shield-check",
        title: "Implantes dentales",
        description: "Planificación 3D y cirugía guiada para reponer dientes con una solución fija y duradera.",
      },
      {
        icon: "smile",
        title: "Ortodoncia invisible",
        description: "Alineadores transparentes y brackets estéticos para adultos y adolescentes.",
      },
      {
        icon: "sparkles",
        title: "Estética dental",
        description: "Blanqueamiento y carillas con un diseño previo de tu sonrisa para que veas el resultado antes de empezar.",
      },
      {
        icon: "baby",
        title: "Odontopediatría",
        description: "Primeras revisiones, selladores y ortodoncia infantil en un ambiente tranquilo para los peques.",
      },
      {
        icon: "droplets",
        title: "Encías y periodoncia",
        description: "Tratamiento de encías que sangran o se retraen, con mantenimiento periódico personalizado.",
      },
    ],
    about: {
      heading: "Una clínica pequeña con la tecnología de una grande",
      content:
        "Abrimos en 2004 en la calle Adriano con una idea sencilla: que cada paciente entienda qué le pasa, qué opciones tiene y cuánto le va a costar antes de sentarse en el sillón.\n\nHoy somos un equipo de nueve personas y trabajamos con escáner intraoral, radiografía digital de baja dosis y planificación 3D de implantes. Así los tratamientos son más precisos, más cortos y más cómodos para ti.",
      image: photo("photo-1619691249147-c5689d88016b"),
    },
    stats: [
      { value: "2004", label: "Año en que abrimos en el Arenal" },
      { value: "9.412", label: "Pacientes con historia clínica" },
      { value: "4,9", label: "Valoración media en 612 reseñas de Google" },
      { value: "24 h", label: "Para atender una urgencia dental" },
    ],
    team: [
      { name: "Dra. Carmen Ruiz Delgado", role: "Directora médica · Col. n.º 41003187", image: photo("photo-1770134223774-13b735e29201") },
      { name: "Dr. Javier Morales", role: "Implantología · Col. n.º 41002204", image: photo("photo-1729162128021-f37dca3ff30d") },
      { name: "Dra. Nuria Peña", role: "Ortodoncia y odontopediatría · Col. n.º 41004519", image: photo("photo-1644335326474-544fbcf8855f") },
      { name: "Dr. Adrián Castro", role: "Endodoncia · Col. n.º 41004102", image: photo("photo-1626201061255-51c25afa69e6") },
    ],
    products: [
      {
        title: "Primera visita y diagnóstico",
        description:
          "Exploración completa y revisión de encías\nRadiografía panorámica digital\nPlan de tratamiento y presupuesto por escrito",
        price: "Gratis",
        image: "",
        badge: "Sin compromiso",
        link: "#contact",
      },
      {
        title: "Limpieza y revisión",
        description: "Higiene profesional con ultrasonidos\nPulido y aplicación de flúor\nRevisión con tu odontóloga",
        price: "45 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Plan Arenal familiar",
        description:
          "Dos limpiezas al año por persona\nRadiografías y urgencias incluidas\n20 % de descuento en tratamientos\nHasta cuatro miembros de la familia",
        price: "12 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    testimonials: [
      {
        name: "Rocío Benítez",
        role: "Paciente desde 2019",
        quote:
          "Me explicaron cada paso con las radiografías delante y me dieron el presupuesto por escrito. Al final pagué exactamente lo que me dijeron.",
        avatar: "",
      },
      {
        name: "Manuel Ortega",
        role: "Paciente de implantología",
        quote: "Llegué con bastante miedo al dentista. Me fueron avisando de todo antes de hacerlo y en ningún momento me sentí con prisas.",
        avatar: "",
      },
      {
        name: "Elena Vázquez",
        role: "Madre de dos pacientes",
        quote: "Mis hijos van contentos a las revisiones, que ya es decir. Nos dan cita rápido y siempre a una hora que nos viene bien.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿La primera visita tiene algún coste?",
        answer:
          "No. Incluye la exploración, una radiografía panorámica y un plan de tratamiento con presupuesto por escrito, sin compromiso.",
      },
      {
        question: "¿Se puede financiar el tratamiento?",
        answer:
          "Sí. Financiamos los tratamientos a partir de 600 € hasta en 24 meses sin intereses y te ayudamos con el papeleo en la propia clínica.",
      },
      {
        question: "¿Trabajáis con seguros dentales?",
        answer:
          "Trabajamos con las principales aseguradoras y también atendemos sin seguro. Llámanos con tu póliza a mano y te decimos qué cubre antes de empezar.",
      },
      {
        question: "¿Qué hago si tengo una urgencia?",
        answer:
          "Llama al teléfono de urgencias. Te atendemos el mismo día dentro del horario de la clínica y, fuera de él, te indicamos cómo actuar hasta la cita.",
      },
      {
        question: "¿Atendéis a niños?",
        answer: "Sí, desde la primera revisión hacia los 3 años. La doctora Peña lleva la odontopediatría y la ortodoncia infantil.",
      },
    ],
    cta: {
      title: "Pide tu cita",
      text: "La primera visita y el diagnóstico no tienen coste. Te respondemos en menos de 24 horas para buscar el hueco que mejor te venga.",
      buttonText: "Pedir cita por WhatsApp",
      buttonLink: "https://wa.me/34600000000",
    },
    contact: {
      email: "cita@clinicadentalarenal.es",
      phone: "954 00 00 00",
      address: "Calle Adriano 14, 41001 Sevilla",
      hours: "Lunes a jueves: 9:00–14:00 y 16:00–21:00\nViernes: 9:00–15:00\nUrgencias: 600 00 00 00",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Clínica Dental Arenal S.L.P. Centro sanitario autorizado por la Junta de Andalucía con n.º NICA 41872.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
