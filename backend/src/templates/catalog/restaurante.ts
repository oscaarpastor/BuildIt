import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateRestaurante",
  category: "food",
  sections: ["brand", "hero", "about", "features", "products", "gallery", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Restaurante",
      description: "Para restaurantes, bares y cafeterías: carta con precios, el local, reseñas, reservas y horario.",
      sections: { features: "Puntos fuertes", products: "Carta", gallery: "El local", testimonials: "Reseñas", cta: "Reservas" },
    },
    en: {
      name: "Restaurant",
      description: "For restaurants, bars and cafés: menu with prices, the venue, reviews, bookings and opening hours.",
      sections: { features: "Highlights", products: "Menu", gallery: "The venue", testimonials: "Reviews", cta: "Bookings" },
    },
  },
  strings: {
    es: { bookings: "Reservas" },
    en: { bookings: "Bookings" },
  },
  config: {
    theme: {
      colorPrimary: "#b4532a",
      colorSecondary: "#2f3a2b",
      fontFamily: "Fraunces",
      fontBody: "Work Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "Nuestra historia", title: "", subtitle: "" },
      features: { eyebrow: "La casa", title: "Lo que nos hace diferentes", subtitle: "" },
      products: {
        eyebrow: "Carta",
        title: "Platos de la casa",
        subtitle: "Una selección de nuestra carta. Pregunta por el menú del día y por los alérgenos al equipo de sala.",
      },
      gallery: { eyebrow: "El local", title: "Un sitio para quedarse", subtitle: "" },
      testimonials: { eyebrow: "Reseñas", title: "Lo que dicen quienes repiten", subtitle: "" },
      faqs: { eyebrow: "Preguntas", title: "Antes de venir", subtitle: "Si tienes cualquier otra duda, llámanos y te ayudamos." },
      contact: { eyebrow: "Contacto", title: "Ven a vernos", subtitle: "" },
    },
    brand: { name: "Casa del Sol", logo: "" },
    hero: {
      eyebrow: "Cocina mediterránea a la brasa",
      title: "El sabor del Mediterráneo, a fuego lento",
      subtitle: "Producto de temporada, arroces al momento y brasa de encina en pleno barrio de Ruzafa.",
      backgroundImage: photo("photo-1414235077428-338989a2e8c0"),
      ctaText: "Reservar mesa",
      ctaLink: "#contact",
      secondaryCtaText: "Ver la carta",
      secondaryCtaLink: "#products",
    },
    about: {
      heading: "Tres generaciones alrededor del fuego",
      content:
        "Casa del Sol nació en 1987 como una pequeña taberna de barrio. Hoy seguimos cocinando igual: con producto de la lonja y de la huerta, sin prisas y con la brasa encendida desde primera hora.\n\nMezclamos las recetas de siempre con técnica actual. Cada arroz se hace al momento y cada plato sale de la cocina como lo serviríamos en casa.",
      image: photo("photo-1551218808-94e220e084d2"),
    },
    features: [
      {
        icon: "flame",
        title: "Brasa de encina",
        description: "Carnes, pescados y verduras sobre leña de encina, como se ha hecho siempre.",
      },
      {
        icon: "leaf",
        title: "Producto de temporada",
        description: "Compramos cada mañana en el mercado y a pequeños productores de la huerta.",
      },
      {
        icon: "wine",
        title: "Bodega con carácter",
        description: "Más de 120 referencias, con especial cariño por los vinos naturales y de la zona.",
      },
    ],
    products: [
      {
        title: "Arroz meloso de marisco",
        description: "Gamba roja, sepia y mejillón sobre fumet tostado. Mínimo dos personas, precio por persona.",
        price: "19 €",
        image: photo("photo-1515443961218-a51367888e4b"),
        badge: "Para compartir",
        link: "",
      },
      {
        title: "Ensalada de la huerta",
        description: "Hojas tiernas, tomate de temporada, queso fresco, nueces y vinagreta de miel.",
        price: "12 €",
        image: photo("photo-1540189549336-e6e99c3679fe"),
        badge: "Vegetariano",
        link: "",
      },
      {
        title: "Tartar de salmón",
        description: "Salmón marinado en cítricos, aguacate, huevas y aceite de albahaca.",
        price: "16 €",
        image: photo("photo-1625944525533-473f1a3d54e7"),
        badge: "",
        link: "",
      },
      {
        title: "Lomo de vaca madurada",
        description: "300 g con 40 días de maduración, a la brasa y con sal en escamas.",
        price: "26 €",
        image: photo("photo-1529692236671-f1f6cf9683ba"),
        badge: "Sin gluten",
        link: "",
      },
      {
        title: "Costilla a baja temperatura",
        description: "Doce horas de cocción lenta, glaseada con miel de romero y acabada en la brasa.",
        price: "18 €",
        image: photo("photo-1544025162-d76694265947"),
        badge: "",
        link: "",
      },
      {
        title: "Helado de vainilla y caramelo salado",
        description: "Helado artesano de vainilla, caramelo salado y teja de almendra.",
        price: "7 €",
        image: photo("photo-1551024506-0bccd828d307"),
        badge: "Casero",
        link: "",
      },
    ],
    gallery: [
      { image: photo("photo-1517248135467-4c7edcad34c4"), caption: "El comedor" },
      { image: photo("photo-1534080564583-6be75777b70a"), caption: "Arroces al momento" },
      { image: photo("photo-1559339352-11d035aa65de"), caption: "La terraza" },
      { image: photo("photo-1555396273-367ea4eb4db5"), caption: "La barra" },
      { image: photo("photo-1510812431401-41d2bd2722f3"), caption: "Sobremesas largas" },
      { image: photo("photo-1592861956120-e524fc739696"), caption: "Cenas con amigos" },
    ],
    testimonials: [
      {
        name: "Lucía Martín",
        role: "Reseña en Google",
        quote:
          "El mejor arroz que he probado fuera de casa de mi abuela. Trato cercano y una terraza preciosa para alargar la sobremesa.",
        avatar: "",
      },
      {
        name: "Carlos Ferrer",
        role: "Cliente habitual",
        quote: "La brasa marca la diferencia: la carne y las verduras están de diez. Siempre volvemos.",
        avatar: "",
      },
      {
        name: "Marta y Javier",
        role: "Reseña en TheFork",
        quote: "Celebramos aquí nuestro aniversario y nos trataron de maravilla. La bodega es una joya.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Hace falta reservar?",
        answer: "Te lo recomendamos, sobre todo en fin de semana. Guardamos algunas mesas para quien venga sin reserva.",
      },
      {
        question: "¿Tenéis opciones vegetarianas y sin gluten?",
        answer: "Sí. Varios platos de la carta son vegetarianos o sin gluten, y adaptamos otros si nos avisas al reservar.",
      },
      {
        question: "¿Podemos venir en grupo?",
        answer: "Tenemos un reservado para hasta 20 personas con menús cerrados. Escríbenos y te enviamos las opciones.",
      },
      {
        question: "¿Hay terraza?",
        answer: "Sí, una terraza cubierta abierta todo el año, con calefacción en invierno.",
      },
    ],
    cta: {
      title: "Reserva tu mesa",
      text: "Mediodías y noches de martes a domingo. Para grupos de más de ocho personas, llámanos.",
      buttonText: "Llamar para reservar",
      buttonLink: "tel:+34963000000",
    },
    contact: {
      email: "reservas@casadelsol.es",
      phone: "963 00 00 00",
      address: "Calle de Sueca 21, 46006 Valencia",
      hours:
        "Martes a jueves: 13:00–16:00 y 20:00–23:00\nViernes y sábado: 13:00–16:30 y 20:00–00:00\nDomingo: 13:00–16:30\nLunes: cerrado",
      whatsapp: "",
    },
    footer: {
      text: "Cocina mediterránea a la brasa en el corazón de Ruzafa.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
