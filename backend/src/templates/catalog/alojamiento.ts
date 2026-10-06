import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateAlojamiento",
  category: "events",
  sections: ["brand", "hero", "about", "features", "products", "gallery", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Casa rural y alojamiento",
      description: "Para casas rurales, hostales y apartamentos: la casa, comodidades, habitaciones con precio y reserva directa.",
      sections: { about: "La casa", features: "Comodidades", products: "Habitaciones", gallery: "Fotos", testimonials: "Huéspedes", cta: "Disponibilidad" },
    },
    en: {
      name: "Holiday stay",
      description: "For country houses, guesthouses and apartments: the house, amenities, rooms with prices and direct booking.",
      sections: { about: "The house", features: "Amenities", products: "Rooms", gallery: "Photos", testimonials: "Guests", cta: "Availability" },
    },
  },
  strings: {
    es: { bookings: "Reservas", arrivals: "Llegadas y salidas", photosLabel: "Fotos de la casa" },
    en: { bookings: "Bookings", arrivals: "Check-in and check-out", photosLabel: "Photos of the house" },
  },
  config: {
    theme: {
      colorPrimary: "#4a5d3a",
      colorSecondary: "#c0663e",
      fontFamily: "Young Serif",
      fontBody: "Karla",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "La casa", title: "", subtitle: "" },
      features: { eyebrow: "Comodidades", title: "Todo lo necesario para no hacer nada", subtitle: "" },
      products: {
        eyebrow: "Habitaciones",
        title: "Cuatro habitaciones con ventana a la sierra",
        subtitle: "Todas con baño propio, calefacción y ropa de cama de algodón. Precio por noche para dos personas, desayuno aparte.",
      },
      gallery: { eyebrow: "Fotos", title: "La casa y sus alrededores", subtitle: "" },
      testimonials: { eyebrow: "Huéspedes", title: "Lo que nos escriben al volver a casa", subtitle: "" },
      faqs: {
        eyebrow: "Preguntas",
        title: "Antes de reservar",
        subtitle: "Para cualquier otra duda, escríbenos por WhatsApp y te contestamos en el día.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Cómo llegar",
        subtitle:
          "Estamos a dos horas de Madrid por la A-6 y la N-502, y a 50 minutos de Ávila. El último kilómetro es un camino de tierra en buen estado.",
      },
    },
    brand: { name: "La Solana de Gredos", logo: "" },
    hero: {
      eyebrow: "Casa rural en la Sierra de Gredos",
      title: "Una casa de piedra para bajar el ritmo",
      subtitle:
        "Cuatro habitaciones, chimenea y un huerto frente a los picos de Gredos. Reserva directamente con nosotros, sin comisiones.",
      backgroundImage: photo("photo-1597241673028-8ee11ba6fe8c"),
      ctaText: "Consultar disponibilidad",
      ctaLink: "#contact",
      secondaryCtaText: "Ver habitaciones",
      secondaryCtaLink: "#products",
    },
    about: {
      heading: "El pajar de los abuelos, restaurado piedra a piedra",
      content:
        "La Solana era el pajar y la cuadra de la familia de Pilar. En 2015 la restauramos con granito de la zona, vigas de madera recuperadas y mucha paciencia.\n\nHoy tiene cuatro habitaciones, un salón con chimenea y un jardín con huerto desde el que se ve el Almanzor en los días claros. Vivimos al lado y os recibimos nosotros mismos.",
      image: photo("photo-1623421851403-15b5be5f5b24"),
    },
    features: [
      { icon: "flame", title: "Chimenea de leña", description: "En el salón, con leña de roble incluida durante toda la estancia." },
      { icon: "waves", title: "Piscina de agua salada", description: "Abierta de junio a septiembre, rodeada de prado y robles." },
      { icon: "paw-print", title: "Se admiten perros", description: "Sin coste extra, con jardín vallado y cuencos en la entrada." },
      { icon: "wifi", title: "Wifi por fibra", description: "Para trabajar unos días o ver una película en el sofá." },
      { icon: "coffee", title: "Desayuno casero", description: "Pan del pueblo, huevos de nuestras gallinas y mermeladas de la casa. 9\u00a0€ por persona." },
      { icon: "mountain", title: "Rutas desde la puerta", description: "Senderos que salen de la finca y la Plataforma de Gredos a 15 minutos." },
      { icon: "car", title: "Aparcamiento", description: "Gratuito y dentro de la finca, con punto de carga para coche eléctrico." },
      { icon: "sprout", title: "Huerto y gallinas", description: "Coge lo que te apetezca para la cena: tomates, calabacines y hierbas." },
    ],
    products: [
      {
        title: "El Almendro",
        description: "2 personas · cama de 160 cm\nBaño con ducha de obra y vistas al jardín",
        price: "desde 95\u00a0€/noche",
        image: photo("photo-1658595149209-c935e9a01b4e"),
        badge: "",
        link: "#contact",
      },
      {
        title: "La Solana",
        description: "2 personas · dos camas de 90 cm\nTerraza privada orientada al sur",
        price: "desde 105\u00a0€/noche",
        image: photo("photo-1658595149097-d8542848bc94"),
        badge: "Con terraza",
        link: "#contact",
      },
      {
        title: "El Pajar",
        description: "2 personas · cama de 180 cm\nBuhardilla con chimenea propia",
        price: "desde 125\u00a0€/noche",
        image: photo("photo-1727270921836-3d51d25d9e33"),
        badge: "Con chimenea",
        link: "#contact",
      },
      {
        title: "La Fragua",
        description: "Hasta 4 personas · cama de 160\u00a0cm y litera\nPara familias, con salita propia",
        price: "desde 140\u00a0€/noche",
        image: photo("photo-1775744244614-beb197cfac53"),
        badge: "Familias",
        link: "#contact",
      },
    ],
    gallery: [
      { image: photo("photo-1787625380403-8c21fb2b3f8a"), caption: "El salón, con la chimenea encendida" },
      { image: photo("photo-1775922428717-fe41d4ce5751"), caption: "Despertar en La Solana" },
      { image: photo("photo-1787237849351-5dcba5f478c4"), caption: "La piscina, entre robles" },
      { image: photo("photo-1766766788517-4bc7b9aff43a"), caption: "Desayuno en el porche" },
      { image: photo("photo-1634147971095-59699d8e8496"), caption: "Paseos junto al Tormes" },
      { image: photo("photo-1759332776691-d827612ebdbf"), caption: "El pueblo, a cinco minutos andando" },
    ],
    testimonials: [
      {
        name: "Laura y Miguel",
        role: "Fin de semana en octubre",
        quote:
          "Llegamos con prisa y nos fuimos con otro ritmo. La chimenea, el silencio y el desayuno de Pilar, de diez. Volveremos en primavera.",
        avatar: "",
      },
      {
        name: "Familia Serrano",
        role: "Una semana en agosto",
        quote: "Los niños no salieron de la piscina y Tobi, nuestro perro, fue uno más. La casa es todavía más bonita que en las fotos.",
        avatar: "",
      },
      {
        name: "Ana Belén",
        role: "Escapada para teletrabajar",
        quote: "Trabajé cuatro días con una conexión impecable y, al terminar, salía a caminar hacia la laguna. Un sitio para repetir.",
        avatar: "",
      },
      {
        name: "Jordi Puig",
        role: "Subida al Almanzor",
        quote: "La base perfecta para la montaña. Nos dejaron el desayuno preparado a las seis de la mañana sin tener que pedirlo dos veces.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿A qué hora es la entrada y la salida?",
        answer: "La entrada es a partir de las 16:00 y la salida, hasta las 12:00. Si necesitas otro horario, avísanos y lo intentamos ajustar.",
      },
      {
        question: "¿Hay un mínimo de noches?",
        answer: "Dos noches los fines de semana y tres en puentes, Semana Santa y agosto. Entre semana puedes reservar una sola noche.",
      },
      {
        question: "¿Puedo ir con mi perro?",
        answer: "Sí, sin coste extra, en El Almendro y La Fragua. Solo te pedimos que no suba a las camas ni a los sofás.",
      },
      {
        question: "¿Se puede alquilar la casa entera?",
        answer: "Sí, para grupos de hasta 10 personas. Escríbenos con las fechas y te enviamos el precio.",
      },
      {
        question: "¿Cómo se paga la reserva?",
        answer: "Con una señal del 30\u00a0% por transferencia o Bizum para confirmarla. El resto se paga al llegar.",
      },
    ],
    cta: {
      title: "¿Te escapas a Gredos?",
      text: "Escríbenos con tus fechas y el número de personas. Reservando directamente con nosotros no pagas comisiones.",
      buttonText: "Consultar disponibilidad",
      buttonLink: "#contact",
    },
    contact: {
      email: "reservas@lasolanadegredos.es",
      phone: "920 00 00 00",
      address: "Camino de la Ermita s/n, 05634 Hoyos del Espino (Ávila)",
      hours: "Entrada: de 16:00 a 21:00\nSalida: hasta las 12:00",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Casa rural de alquiler completo y por habitaciones. Registro de Turismo de Castilla y León: CR-05/412.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
