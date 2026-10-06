import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

// Terapia y bienestar: serena y cálida. Lora con Nunito Sans, verde salvia
// (principal) y arena (secundario), formas suaves y mucho aire.
const template: TemplateDefinition = {
  view: "templateTerapia",
  category: "health",
  sections: ["brand", "hero", "about", "features", "steps", "products", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Terapia y bienestar",
      description: "Para psicólogos, fisioterapeutas y nutricionistas: enfoque, especialidades, sesiones y cita.",
      sections: { about: "Sobre mí", features: "Especialidades", steps: "Cómo trabajo", products: "Sesiones", testimonials: "Opiniones", faqs: "Preguntas", cta: "Pedir cita" },
    },
    en: {
      name: "Therapy & wellbeing",
      description: "For psychologists, physiotherapists and nutritionists: approach, specialties, sessions and booking.",
      sections: { about: "About me", features: "Specialties", steps: "How I work", products: "Sessions", testimonials: "Reviews", faqs: "FAQ", cta: "Book" },
    },
  },
  strings: {
    es: { practice: "La consulta", reachMe: "Escríbeme o llámame", step: "Paso" },
    en: { practice: "The practice", reachMe: "Get in touch", step: "Step" },
  },
  config: {
    theme: {
      colorPrimary: "#5f8566",
      colorSecondary: "#efe7da",
      fontFamily: "Lora",
      fontBody: "Nunito Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "Sobre mí", title: "", subtitle: "" },
      features: {
        eyebrow: "Especialidades",
        title: "En qué te puedo ayudar",
        subtitle: "Cada proceso es distinto, pero estos son los motivos de consulta más habituales.",
      },
      steps: {
        eyebrow: "Cómo trabajo",
        title: "Así es el proceso, paso a paso",
        subtitle: "Sin listas de espera ni compromiso de permanencia. Tú marcas el ritmo.",
      },
      products: {
        eyebrow: "Sesiones",
        title: "Sesiones y tarifas",
        subtitle: "Emito factura en todas las sesiones por si tu seguro médico cubre el reembolso.",
      },
      testimonials: {
        eyebrow: "Opiniones",
        title: "Lo que cuentan quienes han pasado por consulta",
        subtitle: "Publicadas con su permiso y solo con sus iniciales.",
      },
      faqs: { eyebrow: "Preguntas", title: "Dudas frecuentes", subtitle: "Si te queda alguna otra, escríbeme y te respondo personalmente." },
      contact: {
        eyebrow: "Contacto",
        title: "Pide tu primera cita",
        subtitle: "Te respondo en menos de 24 horas laborables.",
      },
    },
    brand: { name: "Laura Gil Psicología", logo: "" },
    hero: {
      eyebrow: "Psicóloga sanitaria en Zaragoza y online",
      title: "Un espacio tranquilo para entender lo que te pasa",
      subtitle:
        "Terapia para adultos y adolescentes con ansiedad, estrés, duelo o dificultades de pareja. Sesiones presenciales en el centro de Zaragoza y por videollamada.",
      backgroundImage: photo("photo-1648147870253-c45f6f430528"),
      ctaText: "Pedir primera cita",
      ctaLink: "#contact",
      secondaryCtaText: "Cómo trabajo",
      secondaryCtaLink: "#steps",
    },
    about: {
      heading: "Hola, soy Laura",
      content:
        "Soy psicóloga general sanitaria y llevo más de doce años acompañando a personas que atraviesan momentos difíciles. Me formé en la Universidad de Zaragoza y me especialicé en terapia cognitivo-conductual y en terapia de aceptación y compromiso.\n\nTrabajo desde la cercanía y sin juicios. En la primera sesión hablamos de lo que te trae a consulta y definimos juntos objetivos realistas, para que cada sesión tenga sentido y puedas ver tu evolución.",
      image: photo("photo-1612872513575-7e7666b96ff3"),
    },
    features: [
      {
        icon: "brain",
        title: "Ansiedad y estrés",
        description: "Entender tu ansiedad, reducir los síntomas y recuperar la sensación de control en el día a día.",
      },
      {
        icon: "heart",
        title: "Autoestima",
        description: "Trabajamos la autoexigencia, el diálogo interno y la forma en la que te tratas.",
      },
      {
        icon: "flower-2",
        title: "Duelo y pérdidas",
        description: "Acompañamiento respetuoso para atravesar una pérdida, una separación o un cambio vital.",
      },
      {
        icon: "users",
        title: "Pareja y relaciones",
        description: "Comunicación, conflictos y dependencia emocional, en sesiones individuales o de pareja.",
      },
      {
        icon: "sprout",
        title: "Adolescentes",
        description: "Terapia a partir de 14 años, con la familia implicada en el proceso cuando hace falta.",
      },
      {
        icon: "sun",
        title: "Estado de ánimo",
        description: "Tristeza persistente, apatía o falta de motivación: recuperar poco a poco lo que te importa.",
      },
    ],
    steps: [
      {
        label: "",
        title: "Llamada inicial",
        description: "Hablamos 15 minutos por teléfono, sin coste, para ver si puedo ayudarte y resolver tus dudas.",
      },
      {
        label: "",
        title: "Primera sesión",
        description: "Me cuentas qué te pasa y qué te gustaría cambiar, y evaluamos juntos la situación.",
      },
      {
        label: "",
        title: "Plan de trabajo",
        description: "Definimos objetivos claros y la frecuencia de las sesiones, normalmente semanal al principio.",
      },
      {
        label: "",
        title: "Seguimiento",
        description: "Revisamos los avances y espaciamos las sesiones a medida que te sientes con más recursos.",
      },
    ],
    products: [
      {
        title: "Primera sesión",
        description: "Evaluación y propuesta de trabajo\n60 minutos\nPresencial u online",
        price: "45 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Sesión individual",
        description: "50 minutos\nPresencial en Zaragoza\nFactura para tu seguro",
        price: "60 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Bono de 5 sesiones",
        description: "Para procesos de seguimiento\nVálido durante 4 meses\nAhorras 30 €",
        price: "270 €",
        image: "",
        badge: "La más elegida",
        link: "#contact",
      },
      {
        title: "Sesión online",
        description: "50 minutos por videollamada\nPlataforma segura y cifrada\nDesde cualquier lugar",
        price: "55 €",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    testimonials: [
      {
        name: "M. R.",
        role: "Terapia por ansiedad",
        quote:
          "Llegué con ataques de ansiedad casi a diario y hoy tengo herramientas para manejarlos. Me sentí escuchada desde el primer día.",
        avatar: "",
      },
      {
        name: "J. A.",
        role: "Sesiones online",
        quote: "Hacer la terapia desde casa me facilitó muchísimo empezar. Se nota que cada sesión está preparada.",
        avatar: "",
      },
      {
        name: "C. y P.",
        role: "Terapia de pareja",
        quote: "Nos ayudó a volver a hablarnos sin hacernos daño. Ojalá hubiéramos dado el paso antes.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Lo que hablamos es confidencial?",
        answer:
          "Sí. Todo lo que se habla en consulta está protegido por el secreto profesional y el Código Deontológico de la Psicología, y tus datos se tratan conforme a la normativa de protección de datos.",
      },
      {
        question: "¿La terapia online funciona igual?",
        answer:
          "Para la mayoría de motivos de consulta es tan eficaz como la presencial. Solo necesitas un lugar tranquilo donde hablar con privacidad y una conexión a internet estable.",
      },
      {
        question: "¿Cuánto dura una terapia?",
        answer:
          "Depende de cada persona y de cada objetivo. Muchos procesos duran entre 8 y 20 sesiones, y lo revisamos juntos cada cierto tiempo.",
      },
      {
        question: "¿Cada cuánto son las sesiones?",
        answer: "Al principio suelen ser semanales o quincenales. A medida que avanzas, las vamos espaciando.",
      },
      {
        question: "¿Y si tengo que cancelar una cita?",
        answer: "Puedes cambiarla o cancelarla sin coste avisando con 24 horas de antelación.",
      },
    ],
    cta: {
      title: "Dar el primer paso es lo más difícil",
      text: "La llamada inicial de 15 minutos es gratuita y sin compromiso. Te escucho y vemos juntos si puedo ayudarte.",
      buttonText: "Reservar llamada gratuita",
      buttonLink: "tel:+34976000000",
    },
    contact: {
      email: "consulta@lauragilpsicologia.es",
      phone: "976 00 00 00",
      address: "Paseo de Sagasta 22, 2.º izquierda, 50006 Zaragoza",
      hours: "Lunes a jueves: 9:00–14:00 y 16:00–20:30\nViernes: 9:00–14:00",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Laura Gil Sanz, psicóloga general sanitaria colegiada A-03127 en el Colegio Oficial de la Psicología de Aragón.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
