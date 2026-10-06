import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateAcademia",
  category: "education",
  sections: ["brand", "hero", "features", "products", "stats", "team", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Academia y cursos",
      description: "Para academias, profesores particulares y autoescuelas: método, cursos con horarios y precios, resultados, profesores y matrícula.",
      sections: {
        features: "Método",
        products: "Cursos",
        stats: "Resultados",
        team: "Profesores",
        testimonials: "Alumnos",
        faqs: "Preguntas",
        cta: "Matrícula",
      },
    },
    en: {
      name: "Academy & courses",
      description: "For academies, tutors and driving schools: method, courses with schedules and prices, results, teachers and enrolment.",
      sections: {
        features: "Method",
        products: "Courses",
        stats: "Results",
        team: "Teachers",
        testimonials: "Students",
        faqs: "FAQ",
        cta: "Enrol",
      },
    },
  },
  strings: {
    es: { reserve: "Reservar plaza", orCall: "o llámanos al", whereWeAre: "Dónde estamos", talkToUs: "Habla con nosotros" },
    en: { reserve: "Book a place", orCall: "or call us on", whereWeAre: "Where we are", talkToUs: "Talk to us" },
  },
  config: {
    theme: {
      colorPrimary: "#2b59c3",
      colorSecondary: "#ffc145",
      fontFamily: "Lexend",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      features: {
        eyebrow: "Método",
        title: "Así se aprende en Prisma",
        subtitle: "Clases prácticas, seguimiento personal y simulacros reales para que llegues al examen sabiendo lo que te vas a encontrar.",
      },
      products: {
        eyebrow: "Cursos",
        title: "Elige tu curso",
        subtitle: "Matrícula abierta todo el año. Grupos por nivel con horarios de mañana y de tarde.",
      },
      stats: { eyebrow: "Resultados", title: "Lo que consiguieron nuestros alumnos el curso pasado", subtitle: "" },
      team: {
        eyebrow: "Profesores",
        title: "Profesores titulados que conocen el examen por dentro",
        subtitle: "",
      },
      testimonials: { eyebrow: "Alumnos", title: "Lo que cuentan nuestros alumnos", subtitle: "" },
      faqs: { eyebrow: "Matrícula", title: "Preguntas frecuentes", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Ven a conocernos",
        subtitle: "A dos minutos del metro de Benimaclet. Te enseñamos las aulas y te hacemos la prueba de nivel en el momento.",
      },
    },
    brand: { name: "Academia Prisma", logo: "" },
    hero: {
      eyebrow: "Idiomas y Selectividad en Benimaclet, Valencia",
      title: "Aprende con método y llega al examen con confianza",
      subtitle:
        "Inglés, francés, alemán y valenciano en grupos de ocho alumnos como máximo. Preparamos los exámenes de Cambridge, DELF, Goethe, la JQCV y la PAU.",
      backgroundImage: photo("photo-1758270704763-22072a90d3b6"),
      ctaText: "Reserva tu prueba de nivel",
      ctaLink: "#contact",
      secondaryCtaText: "Ver cursos",
      secondaryCtaLink: "#products",
    },
    features: [
      {
        icon: "users",
        title: "Grupos de ocho como máximo",
        description: "Hablas en todas las clases y tu profesor sabe en qué fallas y cómo ayudarte a mejorarlo.",
      },
      {
        icon: "target",
        title: "Prueba de nivel gratuita",
        description: "Antes de empezar medimos tu nivel real para que entres en el grupo que de verdad te corresponde.",
      },
      {
        icon: "file-text",
        title: "Simulacros de examen",
        description: "Cada mes hacemos un simulacro en condiciones reales y te devolvemos la corrección detallada.",
      },
      {
        icon: "chart-column",
        title: "Seguimiento trimestral",
        description: "Informe de progreso para alumnos y familias, con tutoría individual siempre que haga falta.",
      },
    ],
    products: [
      {
        title: "Inglés B2 First",
        description: "Para alumnos con un B1 acreditado\nLunes y miércoles, 18:00–19:30\nSimulacro mensual del examen de Cambridge",
        price: "85 €/mes",
        image: "",
        badge: "Plazas limitadas",
        link: "#contact",
      },
      {
        title: "Inglés C1 Advanced",
        description: "Para alumnos con un B2 acreditado\nMartes y jueves, 19:30–21:00\nSpeaking semanal con profesora nativa",
        price: "95 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Valenciano C1",
        description: "Preparación de la JQCV y de la CIEACOVA\nViernes, 17:00–20:00\nMaterial incluido",
        price: "70 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Selectividad (PAU)",
        description: "Para 2.º de Bachillerato\nInglés, Matemáticas II e Historia de España\nDe lunes a jueves, 17:00–20:00",
        price: "120 €/mes",
        image: "",
        badge: "Plazas limitadas",
        link: "#contact",
      },
    ],
    stats: [
      { value: "94 %", label: "Aprobados en el B2 First de Cambridge" },
      { value: "8,7", label: "Nota media en Inglés de la PAU" },
      { value: "8", label: "Alumnos por grupo como máximo" },
      { value: "1.260", label: "Alumnos desde que abrimos en 2012" },
    ],
    team: [
      { name: "Laura Bennett", role: "Inglés · Examinadora oral de Cambridge", image: photo("photo-1586448325968-5ec7ba1da737") },
      { name: "Pau Ribera", role: "Valenciano y Lengua · Filólogo", image: photo("photo-1600603406200-5b2a104684ac") },
      { name: "Claire Dubois", role: "Francés · Preparadora del DELF", image: photo("photo-1573496800808-56566a492b63") },
      { name: "Hugo Martín", role: "Matemáticas · Selectividad", image: photo("photo-1680525021501-ddea41969892") },
    ],
    testimonials: [
      {
        name: "Andrea Soler",
        role: "Aprobó el C1 Advanced",
        quote: "Llegué con un B2 bastante oxidado y en un curso saqué el C1. Los simulacros de cada mes me quitaron los nervios del examen.",
        avatar: "",
      },
      {
        name: "Marcos Gil",
        role: "Alumno de Selectividad",
        quote: "Hugo explica las matemáticas como nadie. Pasé de suspender en el primer trimestre a sacar un 8,4 en la PAU.",
        avatar: "",
      },
      {
        name: "Carmen Llorens",
        role: "Madre de una alumna de 4.º de ESO",
        quote: "Nos mandan un informe cada trimestre y la tutora siempre encuentra un rato para hablar con nosotros.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Cómo es la prueba de nivel?",
        answer:
          "Es gratuita y dura unos 40 minutos: una parte escrita y una pequeña conversación. Te damos el resultado en el momento y te recomendamos el grupo.",
      },
      {
        question: "¿Puedo matricularme a mitad de curso?",
        answer: "Sí, siempre que haya plaza en tu nivel. Hacemos la prueba de nivel y te incorporas la semana siguiente.",
      },
      {
        question: "¿Hay que pagar matrícula o material?",
        answer: "La matrícula son 30 € y solo se paga una vez. Los libros se compran aparte; el resto del material está incluido.",
      },
      {
        question: "¿Qué pasa si falto a una clase?",
        answer: "Puedes recuperarla en otro grupo de tu mismo nivel durante esa semana, avisando con un día de antelación.",
      },
      {
        question: "¿Os encargáis de la inscripción en el examen oficial?",
        answer: "Sí. Te avisamos de las fechas, gestionamos la inscripción y te acompañamos el día del examen.",
      },
    ],
    cta: {
      title: "Reserva tu prueba de nivel gratis",
      text: "Ven cualquier tarde entre semana, conoce las aulas y sal sabiendo tu nivel y el grupo que mejor te encaja.",
      buttonText: "Reservar por WhatsApp",
      buttonLink: "https://wa.me/34600000000",
    },
    contact: {
      email: "hola@academiaprisma.es",
      phone: "963 00 00 00",
      address: "Calle de Emilio Baró 34, 46020 Valencia",
      hours: "Lunes a jueves: 10:00–14:00 y 16:00–21:30\nViernes: 16:00–20:00\nSábados: 10:00–13:00 (simulacros)",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Centro de formación en idiomas y preparación de exámenes oficiales en Valencia desde 2012.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
