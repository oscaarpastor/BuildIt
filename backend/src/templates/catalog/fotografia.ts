import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateFotografia",
  category: "creative",
  sections: ["brand", "hero", "gallery", "about", "products", "video", "testimonials", "faqs", "contact", "footer"],
  text: {
    es: {
      name: "Fotografía",
      description: "Para fotógrafos y videógrafos: la imagen manda. Galería, packs con precios, vídeo y contacto.",
      sections: { gallery: "Trabajos", about: "Sobre mí", products: "Packs", video: "Vídeo", testimonials: "Clientes" },
    },
    en: {
      name: "Photography",
      description: "For photographers and filmmakers: images first. Gallery, priced packages, film and contact.",
      sections: { gallery: "Work", about: "About", products: "Packages", video: "Film", testimonials: "Clients" },
    },
  },
  strings: {
    es: { askDate: "Consultar fecha", studio: "Estudio" },
    en: { askDate: "Check availability", studio: "Studio" },
  },
  config: {
    theme: {
      colorPrimary: "#9a7350",
      colorSecondary: "#0e0e0e",
      fontFamily: "Italiana",
      fontBody: "Jost",
      darkMode: false,
      language: "es",
    },
    headings: {
      gallery: {
        eyebrow: "Trabajos",
        title: "Bodas, prebodas y retratos",
        subtitle: "Una selección de los dos últimos años. Casi todo con luz natural y sin posados forzados.",
      },
      about: { eyebrow: "Sobre mí", title: "", subtitle: "" },
      products: {
        eyebrow: "Packs",
        title: "Packs y precios",
        subtitle: "Precios con IVA incluido. Si lo vuestro no encaja en ningún pack, lo preparamos a medida.",
      },
      video: {
        eyebrow: "Vídeo",
        title: "Granada, el mejor decorado",
        subtitle: "Casi todas mis bodas pasan por estas calles. Un paseo por la ciudad en el vídeo de Granada Turismo.",
      },
      testimonials: { eyebrow: "Clientes", title: "Parejas que ya tienen sus fotos", subtitle: "" },
      faqs: { eyebrow: "Preguntas", title: "Antes de reservar", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Contadme vuestra fecha",
        subtitle: "Escribidme con la fecha, el lugar y cómo os imagináis el día. Respondo en menos de 48 horas.",
      },
    },
    brand: { name: "Irene Moya", logo: "" },
    hero: {
      eyebrow: "Fotografía de bodas y retrato en Granada",
      title: "Historias de boda contadas con luz natural",
      subtitle: "Fotografía documental para parejas que se casan en Granada, la Alpujarra o donde haga falta ir.",
      backgroundImage: photo("photo-1637014387463-a446e89abb68"),
      ctaText: "Consultar fecha",
      ctaLink: "#contact",
      secondaryCtaText: "Ver trabajos",
      secondaryCtaLink: "#gallery",
    },
    gallery: [
      { image: photo("photo-1519741196428-6a2175fa2557"), caption: "Laura y Dani, Carmen de los Mártires" },
      { image: photo("photo-1564697546537-e71eb2aaad1b"), caption: "La Alhambra, entre arcos" },
      { image: photo("photo-1694231270668-29aed6da9a8f"), caption: "Marina y Pablo, cortijo en la Vega" },
      { image: photo("photo-1751619194419-800a16b539ef"), caption: "Elena, con la mantilla de su abuela" },
      { image: photo("photo-1611607969313-e37723e4b9d9"), caption: "Preboda al atardecer en el Sacromonte" },
      { image: photo("photo-1517456363055-5d162a453d6d"), caption: "Clara y Hugo, boda íntima en el Realejo" },
      { image: photo("photo-1509814047455-cfe301a66b2a"), caption: "El Albaicín desde una ventana de la Alhambra" },
      { image: photo("photo-1535572067568-b2227c7cfe68"), caption: "Treinta botones antes de la ceremonia" },
      { image: photo("photo-1492667154321-99c184cc8b89"), caption: "Ana y Jorge, bajo el velo" },
      { image: photo("photo-1519741414274-5b1ee71137fa"), caption: "Paula y Rafa, entre olivos" },
      { image: photo("photo-1761211488163-67bc659a8180"), caption: "Sara y Tomás, al caer la tarde" },
      { image: photo("photo-1773216282433-1d79669534c6"), caption: "Sesión de retrato en el Albaicín" },
    ],
    about: {
      heading: "Fotografío bodas como me gustaría que fotografiaran la mía: sin prisas, sin posados y con mucha luz de tarde.",
      content:
        "Soy Irene y llevo desde 2016 fotografiando bodas y retratos en Granada. Vengo del fotoperiodismo, así que mi trabajo es más observar que dirigir: estar cerca, pasar desapercibida y esperar el momento.\n\nTrabajo con luz natural, entrego todas las fotos editadas a mano y nunca hago más de veinticinco bodas al año para poder dedicar a cada una el tiempo que merece.",
      image: photo("photo-1601934025804-c631e2777f26"),
    },
    products: [
      {
        title: "Boda completa",
        description:
          "De los preparativos al primer baile\nDos fotógrafas y unas 600 fotos editadas\nGalería online y álbum de 30 × 30 cm",
        price: "2.150 €",
        image: "",
        badge: "La más elegida",
        link: "#contact",
      },
      {
        title: "Media jornada",
        description: "Ceremonia, retratos y cóctel, hasta 6 horas\nUnas 300 fotos editadas\nGalería online para compartir",
        price: "1.350 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Preboda o postboda",
        description: "Dos horas en el Albaicín, la Vega o donde queráis\nUnas 80 fotos editadas\nSe descuenta si reserváis la boda",
        price: "320 €",
        image: "",
        badge: "",
        link: "#contact",
      },
      {
        title: "Sesión de retrato",
        description: "Una hora en exterior o en el estudio del Realejo\n25 fotos editadas\nPara perfiles profesionales, familias o porque sí",
        price: "desde 180 €",
        image: "",
        badge: "",
        link: "#contact",
      },
    ],
    video: { url: "https://www.youtube.com/watch?v=NLPt_0Ch_uY", thumbnail: "" },
    testimonials: [
      {
        name: "Laura y Dani",
        role: "Boda en el Carmen de los Mártires",
        quote: "No nos dimos cuenta de que Irene estaba ahí y, aun así, no se perdió nada. Cuando vimos las fotos volvimos a llorar.",
        avatar: "",
      },
      {
        name: "Marina y Pablo",
        role: "Boda en un cortijo de la Vega",
        quote: "Nos daba pánico posar y no hizo falta. Las fotos parecen de una película, pero somos nosotros tal cual.",
        avatar: "",
      },
      {
        name: "Elena Ruiz",
        role: "Sesión de retrato",
        quote: "Necesitaba fotos para mi web y salí con las mejores fotos que me han hecho nunca. Muy fácil todo.",
        avatar: "",
      },
    ],
    faqs: [
      {
        question: "¿Con cuánta antelación hay que reservar?",
        answer:
          "Las fechas de mayo a octubre suelen ocuparse con un año de antelación. Escríbeme cuanto antes y te digo si la tengo libre; la reserva se confirma con una señal del 30 %.",
      },
      {
        question: "¿Viajas fuera de Granada?",
        answer: "Sí. Por Andalucía no cobro desplazamiento y al resto de España y Portugal voy con un suplemento según la distancia.",
      },
      {
        question: "¿Cuándo tendremos las fotos?",
        answer: "En un mes recibís un avance de 50 fotos para compartir y en ocho semanas la galería completa editada.",
      },
      {
        question: "¿Hacéis también vídeo?",
        answer: "Trabajo con un videógrafo de confianza y podemos presupuestar foto y vídeo juntos.",
      },
    ],
    contact: {
      email: "hola@irenemoya.es",
      phone: "958 00 00 00",
      address: "Calle Santa Escolástica 14, 18009 Granada",
      hours: "Estudio con cita previa\nLunes a viernes: 10:00–14:00",
      whatsapp: "",
    },
    footer: {
      text: "Fotografía de bodas y retrato en Granada desde 2016.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Pinterest", url: "https://www.pinterest.es/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
