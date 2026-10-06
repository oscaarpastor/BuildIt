import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

// Peluquería y estética: editorial y elegante. Bodoni Moda con Jost, espresso
// casi negro (principal) y nude (secundario) sobre un blanco roto cálido.
const template: TemplateDefinition = {
  view: "templateBelleza",
  category: "health",
  sections: ["brand", "hero", "features", "products", "gallery", "team", "testimonials", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Peluquería y estética",
      description: "Para peluquerías, barberías y centros de estética: servicios, tarifas, trabajos, equipo y cita.",
      sections: { features: "Servicios", products: "Tarifas", gallery: "Trabajos", team: "Equipo", testimonials: "Opiniones", cta: "Pedir cita" },
    },
    en: {
      name: "Hair & beauty",
      description: "For hair salons, barbers and beauty studios: services, prices, work, team and bookings.",
      sections: { features: "Services", products: "Prices", gallery: "Our work", team: "Team", testimonials: "Reviews", cta: "Book" },
    },
  },
  strings: {
    es: { appointments: "Cita previa", duration: "Duración", closed: "Cerrado" },
    en: { appointments: "Appointments", duration: "Duration", closed: "Closed" },
  },
  config: {
    theme: {
      colorPrimary: "#1f1a17",
      colorSecondary: "#d8b4a0",
      fontFamily: "Bodoni Moda",
      fontBody: "Jost",
      darkMode: false,
      language: "es",
    },
    headings: {
      features: {
        eyebrow: "Servicios",
        title: "Todo lo que hacemos, sin prisas",
        subtitle: "Trabajamos solo con cita previa y empezamos siempre con un diagnóstico de tu pelo: qué quieres, qué te favorece y cómo lo vas a mantener en casa.",
      },
      products: {
        eyebrow: "Tarifas",
        title: "Precios claros desde el principio",
        subtitle: "Precios orientativos para melena media. Te confirmamos el precio exacto en el diagnóstico, antes de empezar.",
      },
      gallery: {
        eyebrow: "Trabajos",
        title: "Recién salidas del estudio",
        subtitle: "Algunos trabajos de las últimas semanas. Encontrarás muchos más en nuestro Instagram.",
      },
      team: {
        eyebrow: "Equipo",
        title: "Las manos detrás de cada cambio",
        subtitle: "Cuatro profesionales con formación continua en color, corte y peinado de novia.",
      },
      testimonials: { eyebrow: "Opiniones", title: "Lo que cuentan quienes vuelven", subtitle: "" },
      contact: { eyebrow: "Contacto", title: "Te esperamos en Chamberí", subtitle: "" },
    },
    brand: { name: "Estudio Alba", logo: "" },
    hero: {
      eyebrow: "Peluquería y color en Chamberí",
      title: "Color y corte a tu medida",
      subtitle:
        "Somos especialistas en color natural, balayage pintado a mano y cortes que crecen bien. Cada cita empieza con un diagnóstico y termina con un peinado que sabrás repetir en casa.",
      backgroundImage: photo("photo-1678567535515-e23d231697a1"),
      ctaText: "Pide tu cita",
      ctaLink: "https://booksy.com/es-es/",
      secondaryCtaText: "Ver tarifas",
      secondaryCtaLink: "#products",
    },
    features: [
      {
        icon: "scissors",
        title: "Corte y peinado",
        description: "Cortes pensados para tu tipo de pelo y tu rutina, que crecen bien y se peinan casi solos.",
      },
      {
        icon: "palette",
        title: "Color y balayage",
        description: "Rubios luminosos, castaños con reflejos y balayage pintado a mano, con prueba de mechón cuando hace falta.",
      },
      {
        icon: "droplets",
        title: "Tratamientos",
        description: "Hidratación profunda, reconstrucción para pelo decolorado y alisado de keratina sin formol.",
      },
      {
        icon: "sparkles",
        title: "Novias y eventos",
        description: "Prueba de peinado con antelación y desplazamiento el día de la boda dentro de Madrid.",
      },
    ],
    products: [
      {
        title: "Corte y peinado",
        description: "45 min\nLavado, diagnóstico, corte y peinado con secador.",
        price: "desde 35 €",
        image: "",
        badge: "",
        link: "",
      },
      {
        title: "Corte de caballero",
        description: "30 min\nCorte a tijera o a máquina, lavado y acabado con producto.",
        price: "22 €",
        image: "",
        badge: "",
        link: "",
      },
      {
        title: "Color de raíz",
        description: "1 h 30 min\nColor sin amoniaco, lavado con tratamiento y peinado.",
        price: "desde 48 €",
        image: "",
        badge: "",
        link: "",
      },
      {
        title: "Balayage",
        description: "3 h\nAclarado pintado a mano, matiz, tratamiento reparador y peinado.",
        price: "desde 120 €",
        image: "",
        badge: "El más pedido",
        link: "",
      },
      {
        title: "Gloss de brillo",
        description: "30 min\nMatiz y brillo para refrescar el color entre citas.",
        price: "28 €",
        image: "",
        badge: "Nuevo",
        link: "",
      },
      {
        title: "Alisado de keratina",
        description: "2 h 30 min\nSin formol. Incluye champú y mascarilla de mantenimiento.",
        price: "desde 150 €",
        image: "",
        badge: "",
        link: "",
      },
      {
        title: "Peinado de evento",
        description: "1 h\nRecogidos y ondas para bodas, graduaciones y celebraciones.",
        price: "desde 45 €",
        image: "",
        badge: "",
        link: "",
      },
    ],
    gallery: [
      { image: photo("photo-1554519934-e32b1629d9ee"), caption: "Balayage rubio miel" },
      { image: photo("photo-1605980766335-d3a41c7332a1"), caption: "Rubio ceniza con ondas" },
      { image: photo("photo-1658322558683-2524c9b62d04"), caption: "Cobre con mechas ocultas" },
      { image: photo("photo-1638064432604-8da1fc75de09"), caption: "Ondas en tono caramelo" },
      { image: photo("photo-1779350676620-fde279b1d023"), caption: "Bob pulido en castaño" },
      { image: photo("photo-1630695239920-4b5bb84a7c1c"), caption: "Rubio perla de raíz difuminada" },
    ],
    team: [
      { name: "Alba Romero", role: "Fundadora y colorista", image: photo("photo-1589713680561-1d0b6945a582") },
      { name: "Carmen Ruiz", role: "Colorista sénior", image: photo("photo-1780387477222-730504564368") },
      { name: "Dani Ortega", role: "Corte y barbería", image: photo("photo-1784841399243-84f63b4f5e4a") },
      { name: "Paula Méndez", role: "Peinados de novia y eventos", image: photo("photo-1580489944761-15a19d654956") },
    ],
    testimonials: [
      {
        name: "Irene Calvo",
        role: "Reseña en Google",
        quote:
          "Llevaba años con el pelo naranja por culpa de malos tintes y Alba me lo dejó en un rubio precioso en dos sesiones. Te explican todo y no te venden nada que no necesites.",
        avatar: "",
      },
      {
        name: "Marta Lozano",
        role: "Clienta desde 2019",
        quote: "El único sitio donde el corte me sigue quedando bien a los dos meses. Ambiente tranquilo y puntualidad absoluta.",
        avatar: "",
      },
      {
        name: "Sofía Herrero",
        role: "Peinado de novia",
        quote: "Paula hizo la prueba con calma y el día de la boda el recogido aguantó perfecto hasta las cinco de la mañana.",
        avatar: "",
      },
    ],
    cta: {
      title: "Pide tu cita",
      text: "Reserva online en un minuto o escríbenos por WhatsApp si tienes dudas sobre qué servicio necesitas.",
      buttonText: "Reservar online",
      buttonLink: "https://booksy.com/es-es/",
    },
    contact: {
      email: "hola@estudioalba.es",
      phone: "914 00 00 00",
      address: "Calle de Fernández de la Hoz 34, 28010 Madrid",
      hours: "Martes a viernes: 10:00–20:00\nSábado: 9:30–15:00\nDomingo y lunes: cerrado",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Peluquería y color con cita previa en el barrio de Chamberí, Madrid.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
