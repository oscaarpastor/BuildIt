import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

// Ejemplo: Turno, una app española para hacer los turnos de equipos de hostelería.
// La portada no lleva captura: sin imagen, la plantilla dibuja en CSS una interfaz
// de planificador dentro de la ventana del navegador (con imagen, la enmarca ahí).
const template: TemplateDefinition = {
  view: "templateStartup",
  category: "business",
  sections: ["brand", "hero", "stats", "features", "steps", "video", "products", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Startup y app",
      description: "Para lanzar una app, un producto digital o un proyecto: funciones, demo, planes de precios y preguntas.",
      sections: { stats: "Cifras", features: "Funciones", steps: "Cómo funciona", video: "Demo", products: "Precios", testimonials: "Clientes" },
    },
    en: {
      name: "Startup & app",
      description: "To launch an app, a digital product or a project: features, demo, pricing plans and FAQ.",
      sections: { stats: "Numbers", features: "Features", steps: "How it works", video: "Demo", products: "Pricing", testimonials: "Customers" },
    },
  },
  strings: {
    es: { screenshot: "Vista de la aplicación", choosePlan: "Elegir plan" },
    en: { screenshot: "App preview", choosePlan: "Choose plan" },
  },
  config: {
    theme: {
      colorPrimary: "#2f6bff",
      colorSecondary: "#0c111d",
      fontFamily: "Geist",
      fontBody: "Inter",
      darkMode: false,
      language: "es",
    },
    headings: {
      stats: {
        eyebrow: "Cifras",
        title: "Bares y restaurantes de toda España ya hacen sus turnos con Turno",
        subtitle: "",
      },
      features: {
        eyebrow: "Funciones",
        title: "Todo el cuadrante en una sola app",
        subtitle: "Pensada para la hostelería: turnos partidos, extras de fin de semana, vacaciones y cambios de última hora.",
      },
      steps: {
        eyebrow: "Cómo funciona",
        title: "Tu primer cuadrante, hoy mismo",
        subtitle: "No hace falta formación: si sabes usar WhatsApp, sabes usar Turno.",
      },
      video: {
        eyebrow: "Demo",
        title: "Organizar los turnos sin dramas",
        subtitle: "Las claves para repartir horarios de forma justa, que Turno aplica por ti cada semana.",
      },
      products: {
        eyebrow: "Precios",
        title: "Un precio claro, sin permanencia",
        subtitle: "14 días de prueba gratis en cualquier plan. Precio por local y mes, IVA no incluido.",
      },
      testimonials: {
        eyebrow: "Clientes",
        title: "Menos llamadas a las once de la noche",
        subtitle: "Encargados y dueños de locales que dejaron atrás el Excel y el grupo de WhatsApp.",
      },
      faqs: {
        eyebrow: "Preguntas",
        title: "Preguntas frecuentes",
        subtitle: "¿No encuentras lo que buscas? Escríbenos y te contestamos el mismo día.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "¿Hablamos?",
        subtitle: "Te ayudamos a configurar Turno para tu local por teléfono o videollamada, sin coste.",
      },
    },
    brand: { name: "Turno", logo: "" },
    hero: {
      eyebrow: "Nuevo: fichaje desde el móvil",
      title: "Los turnos de tu restaurante, hechos en diez minutos",
      subtitle:
        "Turno prepara el cuadrante semanal según la disponibilidad de tu equipo, avisa de cada cambio en el móvil y calcula las horas para la nómina.",
      backgroundImage: "",
      ctaText: "Probar gratis",
      ctaLink: "#products",
      secondaryCtaText: "Ver la demo",
      secondaryCtaLink: "#video",
    },
    stats: [
      { value: "1.840", label: "bares, restaurantes y cafeterías" },
      { value: "6 h", label: "menos de gestión a la semana" },
      { value: "97 %", label: "de los turnos, confirmados a tiempo" },
      { value: "4,8", label: "de valoración en App Store y Google Play" },
    ],
    features: [
      {
        icon: "calendar",
        title: "Cuadrante automático",
        description:
          "Cada persona marca cuándo puede trabajar y Turno propone el cuadrante de la semana respetando descansos, horas de contrato y convenio.",
      },
      {
        icon: "smartphone",
        title: "Avisos en el móvil",
        description: "Cada persona ve sus turnos en la app y recibe un aviso si algo cambia.",
      },
      {
        icon: "users",
        title: "Cambios entre compañeros",
        description: "Quien no puede venir pide el cambio y tú solo lo apruebas.",
      },
      {
        icon: "map-pin",
        title: "Fichaje con ubicación",
        description: "Registro de jornada desde el móvil, con el informe listo para una inspección.",
      },
      {
        icon: "chart-column",
        title: "Coste de personal al día",
        description: "Compara las horas planificadas con las ventas previstas de cada servicio.",
      },
      {
        icon: "building-2",
        title: "Varios locales",
        description: "Gestiona todos tus locales desde una cuenta y mueve personal entre ellos.",
      },
    ],
    steps: [
      {
        label: "",
        title: "Invita a tu equipo",
        description: "Importa la plantilla desde un Excel o comparte un enlace. Cada persona se da de alta en un minuto.",
      },
      {
        label: "",
        title: "Recoge la disponibilidad",
        description: "Tu equipo marca desde el móvil qué días puede trabajar, sus vacaciones y sus preferencias.",
      },
      {
        label: "",
        title: "Publica el cuadrante",
        description: "Revisa la propuesta, ajusta lo que quieras y publícala. Todos la reciben al instante.",
      },
    ],
    video: { url: "https://www.youtube.com/watch?v=ykUzajFmo8c", thumbnail: "" },
    products: [
      {
        title: "Básico",
        description: "Hasta 10 personas\nUn local\nCuadrante y avisos en el móvil\nSoporte por email",
        price: "0 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Profesional",
        description:
          "Hasta 40 personas\nCambios de turno entre compañeros\nFichaje con ubicación\nInforme de horas para la nómina\nSoporte por chat y teléfono",
        price: "19 €/mes",
        image: "",
        badge: "Más popular",
        link: "#contact",
      },
      {
        title: "Grupo",
        description: "Personas y locales ilimitados\nPermisos por encargado\nConexión con tu TPV\nGestor de cuenta propio",
        price: "49 €/mes",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    testimonials: [
      {
        name: "Lucía Prieto",
        role: "Dueña de Café Ruda, Valencia",
        quote:
          "Antes perdía la tarde del domingo con el Excel. Ahora el cuadrante está hecho en diez minutos y nadie me escribe para preguntar cuándo libra.",
        avatar: photo("photo-1753351052363-53ce102830eb"),
      },
      {
        name: "Javier Ortega",
        role: "Gerente de La Tasquita, Zaragoza",
        quote: "Los cambios de turno eran un caos de mensajes. Ahora se piden en la app y yo solo los apruebo.",
        avatar: photo("photo-1758887261865-a2b89c0f7ac5"),
      },
      {
        name: "Marta Gil",
        role: "Jefa de sala en Grupo Lamiak, Madrid",
        quote:
          "Llevamos tres locales y movemos gente entre ellos casi cada semana. Con Turno veo en una pantalla quién falta y dónde, y el fichaje nos ha ahorrado más de un disgusto.",
        avatar: photo("photo-1758519289791-ffce8889ca8c"),
      },
      {
        name: "Iñaki Etxeberria",
        role: "Chef y propietario de Itsaso, Donostia",
        quote: "Por fin sé cuánto me cuesta cada servicio en personal antes de que acabe el mes.",
        avatar: photo("photo-1689588532679-4bb5fdd8f6d5"),
      },
    ],
    faqs: [
      {
        question: "¿Tengo que instalar algo?",
        answer:
          "No. Tú gestionas Turno desde el navegador y tu equipo usa la app gratuita para iPhone y Android.",
      },
      {
        question: "¿Cumple con el registro de jornada obligatorio?",
        answer:
          "Sí. El fichaje guarda la hora y la ubicación de cada entrada y salida, y genera el informe mensual que te pueden pedir en una inspección.",
      },
      {
        question: "¿Mis empleados tienen que pagar algo?",
        answer: "No. Solo paga el local, según su plan. Tu equipo usa la app sin coste.",
      },
      {
        question: "¿Puedo cancelar cuando quiera?",
        answer: "Sí. No hay permanencia: cambias de plan o das de baja la cuenta desde los ajustes, cuando quieras.",
      },
      {
        question: "¿Me ayudáis a empezar?",
        answer:
          "Claro. En la prueba gratuita te llamamos para importar a tu equipo y dejar listo tu primer cuadrante contigo.",
      },
    ],
    cta: {
      title: "Haz el cuadrante de la semana que viene con Turno",
      text: "Prueba gratis durante 14 días, sin tarjeta y con ayuda para importar a tu equipo.",
      buttonText: "Crear cuenta gratis",
      buttonLink: "#products",
    },
    contact: {
      email: "hola@turnoapp.es",
      phone: "910 00 00 00",
      address: "Calle de Méndez Álvaro 9, 28045 Madrid",
      hours: "Lunes a viernes: 9:00–19:00",
      whatsapp: "",
    },
    footer: {
      text: "Turnos, fichaje y horas para equipos de hostelería.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "LinkedIn", url: "https://www.linkedin.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
        { label: "Cookies", url: "#" },
      ],
    },
  },
};

export default template;
