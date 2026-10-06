import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateInmobiliaria",
  category: "business",
  sections: ["brand", "hero", "products", "features", "stats", "about", "team", "testimonials", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Inmobiliaria",
      description: "Para inmobiliarias y agentes: inmuebles destacados con precio, servicios, equipo y valoración gratis.",
      sections: { products: "Inmuebles", features: "Servicios", stats: "Cifras", about: "La agencia", team: "Agentes", testimonials: "Opiniones", cta: "Valoración" },
    },
    en: {
      name: "Real estate",
      description: "For estate agents: featured properties with prices, services, the team and a free valuation.",
      sections: { products: "Properties", features: "Services", stats: "Numbers", about: "The agency", team: "Agents", testimonials: "Reviews", cta: "Valuation" },
    },
  },
  strings: {
    es: { askAbout: "Pedir información", office: "Oficina" },
    en: { askAbout: "Ask about it", office: "Office" },
  },
  config: {
    theme: {
      colorPrimary: "#1f3b2d",
      colorSecondary: "#d9cbb5",
      fontFamily: "DM Serif Display",
      fontBody: "DM Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      products: {
        eyebrow: "Inmuebles",
        title: "Seleccionados esta semana",
        subtitle: "Viviendas que hemos visitado y fotografiado nosotros. Pregúntanos también por las que aún no están publicadas.",
      },
      features: {
        eyebrow: "Servicios",
        title: "Vender, comprar o alquilar sin perder el tiempo",
        subtitle: "Un mismo agente lleva tu caso de principio a fin, con honorarios claros desde el primer día.",
      },
      stats: { eyebrow: "Cifras", title: "Dieciocho años en el mercado de Málaga", subtitle: "" },
      about: { eyebrow: "La agencia", title: "", subtitle: "" },
      team: {
        eyebrow: "Agentes",
        title: "Las personas que te van a acompañar",
        subtitle: "Cada agente trabaja una zona de la ciudad y la conoce a fondo.",
      },
      testimonials: { eyebrow: "Opiniones", title: "Clientes que ya tienen las llaves", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Pásate por la oficina",
        subtitle: "Estamos a dos minutos de la playa de La Malagueta. Si lo prefieres, te llamamos nosotros.",
      },
    },
    brand: { name: "Alameda Inmobiliaria", logo: "" },
    hero: {
      eyebrow: "Inmobiliaria en Málaga desde 2006",
      title: "Tu próxima casa en Málaga, elegida con calma",
      subtitle:
        "Compraventa y alquiler en el Centro, La Malagueta, El Limonar y Pedregalejo. Te acompañamos desde la primera visita hasta la firma en notaría.",
      backgroundImage: photo("photo-1745761320791-5ae142edee8c"),
      ctaText: "Ver inmuebles",
      ctaLink: "#products",
      secondaryCtaText: "Valora tu vivienda",
      secondaryCtaLink: "#cta",
    },
    products: [
      {
        title: "Ático con terraza en La Malagueta",
        description: "3 hab · 2 baños · 112 m²\nTerraza de 40\u00a0m² con vistas al mar",
        price: "695.000\u00a0€",
        image: photo("photo-1769869173719-997e7be14a56"),
        badge: "Nuevo",
        link: "#contact",
      },
      {
        title: "Piso reformado en el Soho",
        description: "2 hab · 1 baño · 78 m²\nA dos calles del puerto y del CAC Málaga",
        price: "329.000\u00a0€",
        image: photo("photo-1713832139677-a03a41b602e3"),
        badge: "",
        link: "#contact",
      },
      {
        title: "Villa con piscina en Cerrado de Calderón",
        description: "5 hab · 4 baños · 340 m²\nParcela de 900\u00a0m² con vistas a la bahía",
        price: "1.450.000\u00a0€",
        image: photo("photo-1628950752032-06fed9c9d0f8"),
        badge: "Exclusiva",
        link: "#contact",
      },
      {
        title: "Casa adosada en Pedregalejo",
        description: "4 hab · 3 baños · 180 m²\nA 300 m de la playa, con patio y garaje",
        price: "540.000\u00a0€",
        image: photo("photo-1565050191491-0eef29b455db"),
        badge: "Reservado",
        link: "#contact",
      },
      {
        title: "Piso en alquiler en Teatinos",
        description: "2 hab · 2 baños · 85 m²\nPiscina comunitaria y plaza de garaje",
        price: "1.150\u00a0€/mes",
        image: photo("photo-1738168246881-40f35f8aba0a"),
        badge: "Alquiler",
        link: "#contact",
      },
      {
        title: "Apartamento con balcón en El Limonar",
        description: "1 hab · 1 baño · 62 m²\nBalcón orientado al sur, a diez minutos del centro",
        price: "289.000\u00a0€",
        image: photo("photo-1652699140205-792df2fb740f"),
        badge: "",
        link: "#contact",
      },
    ],
    features: [
      {
        icon: "key-round",
        title: "Vender tu vivienda",
        description: "Fotos profesionales, plano y vídeo, publicación en los portales y visitas filtradas. Solo cobramos si vendemos.",
      },
      {
        icon: "house",
        title: "Encontrar casa",
        description: "Te avisamos antes que a nadie de lo que encaja con lo que buscas y te acompañamos a cada visita.",
      },
      {
        icon: "file-text",
        title: "Alquiler gestionado",
        description: "Seleccionamos inquilinos con solvencia comprobada, redactamos el contrato y atendemos las incidencias.",
      },
      {
        icon: "scale",
        title: "Valoración y trámites",
        description: "Valoración gratuita con ventas reales de tu zona. Gestionamos la nota simple, el certificado energético y la notaría.",
      },
    ],
    stats: [
      { value: "18 años", label: "vendiendo y alquilando en Málaga" },
      { value: "+1.200", label: "operaciones cerradas" },
      { value: "47 días", label: "de media hasta la venta" },
      { value: "4,8", label: "de valoración en Google" },
    ],
    about: {
      heading: "Conocemos Málaga calle a calle",
      content:
        "Alameda Inmobiliaria abrió en 2006 en un pequeño local de La Malagueta. Hoy somos seis personas y seguimos trabajando igual: pocas viviendas, muy bien presentadas y un agente que siempre coge el teléfono.\n\nAntes de publicar un inmueble lo visitamos, lo medimos y revisamos su documentación. Así, cuando llamas por una casa, podemos contestarte de verdad.",
      image: photo("photo-1770018895632-a5c3175e8dbc"),
    },
    team: [
      { name: "Marta Ruiz", role: "Directora y agente en el Centro", image: photo("photo-1573497019940-1c28c88b4f3e") },
      { name: "Daniel Soto", role: "La Malagueta y El Limonar", image: photo("photo-1648474484044-bb82df2f5a1f") },
      { name: "Lucía Navas", role: "Pedregalejo y El Palo", image: photo("photo-1581065178047-8ee15951ede6") },
      { name: "Iván Moreno", role: "Alquileres y Teatinos", image: photo("photo-1559718062-361155fad299") },
    ],
    testimonials: [
      {
        name: "Carmen Ortiz",
        role: "Vendió su piso en El Ejido",
        quote:
          "Vendieron el piso de mis padres en seis semanas y se encargaron de todo el papeleo de la herencia. Siempre supe en qué punto estábamos.",
        avatar: "",
      },
      {
        name: "Thomas y Anna Becker",
        role: "Compraron en Pedregalejo",
        quote:
          "Buscábamos desde Alemania y Lucía nos hizo una videollamada en cada visita. Cuando vinimos a firmar, ya sentíamos que conocíamos el barrio.",
        avatar: "",
      },
      {
        name: "Raúl Medina",
        role: "Alquila su vivienda con la agencia",
        quote: "Llevan el alquiler de mi piso desde hace tres años. Inquilinos cuidadosos, pagos puntuales y ninguna llamada a deshora.",
        avatar: "",
      },
      {
        name: "Elena Castro",
        role: "Compró su primera vivienda",
        quote:
          "Me explicaron la hipoteca, los gastos y cada paso de la compra sin ninguna prisa. Para ser mi primera casa, no pude ir más tranquila.",
        avatar: "",
      },
    ],
    cta: {
      title: "Valora tu vivienda gratis",
      text: "En 48 horas te decimos cuánto vale tu casa hoy, con datos de ventas reales en tu calle. Sin compromiso de venta.",
      buttonText: "Solicitar valoración",
      buttonLink: "#contact",
    },
    contact: {
      email: "hola@alamedainmobiliaria.es",
      phone: "952 00 00 00",
      address: "Paseo de Reding 14, 29016 Málaga",
      hours: "Lunes a viernes: 9:30–14:00 y 17:00–20:00\nSábados: 10:00–13:30, con cita",
      whatsapp: "600 00 00 00",
    },
    footer: {
      text: "Agencia inmobiliaria en Málaga desde 2006. Compraventa, alquiler y valoraciones.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
