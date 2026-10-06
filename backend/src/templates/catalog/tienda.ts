import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const ETSY = "https://www.etsy.com/es/";
const WHATSAPP = "https://wa.me/34600000000";

const template: TemplateDefinition = {
  view: "templateShop",
  category: "shop",
  sections: ["brand", "hero", "products", "features", "about", "gallery", "testimonials", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Tienda",
      description: "Para vender productos o un catálogo artesano: piezas con precio y enlace de compra, envíos, la marca y opiniones.",
      sections: {
        products: "Productos",
        features: "Ventajas",
        about: "La marca",
        gallery: "Inspiración",
        testimonials: "Opiniones",
        cta: "Novedades",
      },
    },
    en: {
      name: "Shop",
      description: "To sell products or a handmade catalogue: items with prices and buy links, shipping, the brand and reviews.",
      sections: {
        products: "Products",
        features: "Perks",
        about: "Our story",
        gallery: "Lookbook",
        testimonials: "Reviews",
        cta: "News",
      },
    },
  },
  strings: {
    es: {
      buyEtsy: "Comprar en Etsy",
      buyWhatsapp: "Pedir por WhatsApp",
      buyWallapop: "Ver en Wallapop",
      buyInstagram: "Pedir por Instagram",
      buyEmail: "Pedir por email",
      buyPhone: "Llamar para pedir",
      writeLabel: "Escríbenos",
    },
    en: {
      buyEtsy: "Buy on Etsy",
      buyWhatsapp: "Order on WhatsApp",
      buyWallapop: "See on Wallapop",
      buyInstagram: "Order on Instagram",
      buyEmail: "Order by email",
      buyPhone: "Call to order",
      writeLabel: "Write to us",
    },
  },
  config: {
    theme: {
      colorPrimary: "#e8b04a",
      colorSecondary: "#3b2a20",
      fontFamily: "Bricolage Grotesque",
      fontBody: "Figtree",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "El taller", title: "", subtitle: "Dos ceramistas, un torno cada uno y un horno que no para." },
      products: {
        eyebrow: "Piezas",
        title: "Recién salidas del horno",
        subtitle: "Series cortas en gres de alta temperatura. Cada pieza es única: el esmalte cambia un poco en cada cocción.",
      },
      features: { eyebrow: "Envíos", title: "Bien embalado y sin sorpresas", subtitle: "" },
      gallery: {
        eyebrow: "Lookbook",
        title: "Nuestras piezas, en casa de quien las usa",
        subtitle: "Fotos que nos mandáis y alguna que hacemos en el taller. Etiquétanos en Instagram con #barroyco.",
      },
      testimonials: { eyebrow: "Opiniones", title: "Lo que nos dicen al abrir la caja", subtitle: "" },
      faqs: {
        eyebrow: "Dudas",
        title: "Envíos, cuidados y encargos",
        subtitle: "¿No encuentras tu respuesta? Escríbenos y te contestamos en menos de 24 horas.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "Pásate por el taller",
        subtitle: "Estamos en Benimaclet, a dos minutos del metro. Si vienes a recoger un pedido, llámanos antes.",
      },
    },
    brand: { name: "Barro & Co.", logo: "" },
    hero: {
      eyebrow: "Cerámica hecha a mano en Valencia",
      title: "Piezas de barro para usar todos los días",
      subtitle:
        "Tazas, platos y jarrones torneados uno a uno en nuestro taller de Benimaclet. Series cortas, esmaltes propios y envíos a toda la península.",
      backgroundImage: photo("photo-1613424777445-f93a2a48e285"),
      ctaText: "Ver las piezas",
      ctaLink: "#products",
      secondaryCtaText: "Visitar el taller",
      secondaryCtaLink: "#contact",
    },
    products: [
      {
        title: "Taza Albufera",
        description: "Gres esmaltado en blanco roto, 350 ml. Apta para lavavajillas y microondas.",
        price: "26 €",
        image: photo("photo-1495100497150-fe209c585f50"),
        badge: "Nuevo",
        link: ETSY,
      },
      {
        title: "Vaso Malvarrosa",
        description: "Sin asa, en gres moteado y sin esmaltar por fuera. Para café con leche o agua.",
        price: "18 €",
        image: photo("photo-1666445844615-0a3930270f13"),
        badge: "",
        link: ETSY,
      },
      {
        title: "Cuenco Huerta",
        description: "16 cm de diámetro. Para desayunos, ensaladas o un buen caldo.",
        price: "22 €",
        image: photo("photo-1519916478825-b1d7aef08f54"),
        badge: "",
        link: ETSY,
      },
      {
        title: "Plato hondo Arena",
        description: "21 cm, esmalte blanco moteado con el borde en barro visto.",
        price: "24 €",
        image: photo("photo-1525973779373-015bdf68e579"),
        badge: "",
        link: ETSY,
      },
      {
        title: "Jarrones Turia",
        description: "Pareja de 12 y 16 cm en esmalte mate. Para una flor o una rama seca.",
        price: "48 €",
        image: photo("photo-1677761640321-b80251be00ca"),
        badge: "Últimas unidades",
        link: ETSY,
      },
      {
        title: "Set de 4 tazas de café",
        description: "Tazas de 90 ml para espresso o cortado, en gres moteado.",
        price: "52 €",
        image: photo("photo-1523367118146-091f762cd8ea"),
        badge: "",
        link: ETSY,
      },
      {
        title: "Jarra Benimaclet",
        description: "Un litro, con el interior azul cobalto. Para agua, flores o limonada.",
        price: "39 €",
        image: photo("photo-1610128361323-6e941c97f023"),
        badge: "",
        link: WHATSAPP,
      },
      {
        title: "Taller de torno (2 h)",
        description: "En grupos de cuatro personas. Te llevas dos piezas cocidas y esmaltadas.",
        price: "45 €",
        image: photo("photo-1607556672044-6110fc499247"),
        badge: "Plazas limitadas",
        link: WHATSAPP,
      },
    ],
    features: [
      {
        icon: "truck",
        title: "Envío en 48 horas",
        description: "A toda la península por 4,90 €. Gratis en pedidos de más de 60 €.",
      },
      {
        icon: "package",
        title: "Embalaje sin plástico",
        description: "Papel kraft y cartón reciclado. Si algo llega roto, te lo reponemos.",
      },
      {
        icon: "map-pin",
        title: "Recogida en el taller",
        description: "Gratis, de martes a sábado. Te avisamos cuando tu pedido esté listo.",
      },
      {
        icon: "palette",
        title: "Encargos a medida",
        description: "Vajillas para restaurantes, bodas y regalos de empresa, desde 20 piezas.",
      },
    ],
    about: {
      heading: "Un taller pequeño con el horno siempre encendido",
      content:
        "Somos Clara y Andrés. Empezamos en 2017 en un bajo de Benimaclet con un torno de segunda mano y muchas ganas de hacer vajilla para usarla de verdad, no para dejarla en la vitrina.\n\nTorneamos cada pieza a mano, la dejamos secar una semana y la cocemos dos veces. Los esmaltes los preparamos nosotros a partir de minerales, así que no hay dos tazas iguales.",
      image: photo("photo-1611013621103-91e10668a120"),
    },
    gallery: [
      { image: photo("photo-1694830470387-2e0f234ecaf7"), caption: "Mesa de domingo con la jarra y los cuencos" },
      { image: photo("photo-1612293905838-667dea27cc79"), caption: "Platos Arena" },
      { image: photo("photo-1610206349499-c932c3b3aacb"), caption: "Piezas esperando la segunda cocción" },
      { image: photo("photo-1631125915973-e0d155a14e4e"), caption: "Jarrones antes de esmaltar" },
      { image: photo("photo-1608491545066-18f37f4dec11"), caption: "Vajilla de encargo para una cena" },
      { image: photo("photo-1536936812504-0e77dc3f0b40"), caption: "Tazas en la estantería del taller" },
    ],
    testimonials: [
      {
        name: "Pilar Soler",
        role: "Compra en Etsy",
        quote:
          "Las tazas son todavía más bonitas en persona. Llegaron perfectamente embaladas y con una nota escrita a mano. Ya he pedido otras dos para regalar.",
        avatar: "",
      },
      {
        name: "Jorge Martí",
        role: "Taller de torno",
        quote: "Fui con mi pareja al taller de torno y vamos a repetir. Clara explica con muchísima paciencia y te llevas tus piezas a casa.",
        avatar: "",
      },
      {
        name: "Nuria Ferrer",
        role: "Encargo para su restaurante",
        quote:
          "Les encargamos sesenta platos para la carta de otoño. Cumplieron los plazos y el esmalte aguanta el lavavajillas industrial sin problema.",
        avatar: "",
      },
      {
        name: "Marta Gil",
        role: "Compra en el taller",
        quote: "Me encanta pasar los sábados y elegir la pieza en mano. El cuenco Huerta es lo que más uso de toda la cocina.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda en llegar mi pedido?",
        answer: "Lo enviamos en 24–48 horas laborables. A la península llega en dos o tres días; a Baleares, en tres a cinco.",
      },
      {
        question: "¿Se pueden meter en el lavavajillas y el microondas?",
        answer:
          "Sí. Todo es gres de alta temperatura con esmaltes sin plomo. Para que el esmalte dure más, usa programas cortos y evita los cambios bruscos de temperatura.",
      },
      {
        question: "¿Hacéis encargos personalizados?",
        answer:
          "Sí, a partir de 20 piezas: vajillas para restaurantes, regalos de boda o de empresa. Cuéntanos qué tienes en mente y te enviamos un presupuesto en una semana.",
      },
      {
        question: "¿Por qué mi pieza no es igual que la de la foto?",
        answer:
          "Porque cada pieza está hecha a mano y el esmalte reacciona distinto en cada cocción. Las pequeñas diferencias de color y tamaño son parte de su encanto.",
      },
      {
        question: "¿Puedo devolver un pedido?",
        answer: "Tienes 14 días desde que lo recibes. Escríbenos y te explicamos cómo enviarlo; te devolvemos el importe en cuanto llegue al taller.",
      },
    ],
    cta: {
      title: "Sábados de taller abierto",
      text: "Ven a vernos trabajar, elige tus piezas en mano y llévate las de segunda selección a mitad de precio. De 10:00 a 14:00, sin cita.",
      buttonText: "Cómo llegar",
      buttonLink: "#contact",
    },
    contact: {
      email: "hola@barroyco.es",
      phone: "960 00 00 00",
      address: "Calle de Emilio Baró 41, 46020 Valencia",
      hours: "Martes a viernes: 10:00–14:00 y 17:00–20:00\nSábado: 10:00–14:00\nDomingo y lunes: cerrado",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Cerámica hecha a mano en Benimaclet, Valencia. Envíos a toda la península.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Etsy", url: ETSY },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
