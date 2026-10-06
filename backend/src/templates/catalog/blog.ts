import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

const template: TemplateDefinition = {
  view: "templateBlog",
  category: "creative",
  sections: ["brand", "hero", "products", "about", "gallery", "video", "testimonials", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Blog y creador",
      description: "Para quien escribe, graba o tiene una newsletter: artículos, autor, vídeo y suscripción.",
      sections: {
        products: "Artículos",
        about: "Autor",
        gallery: "Instagram",
        video: "Vídeo",
        testimonials: "Lectores",
        cta: "Newsletter",
      },
    },
    en: {
      name: "Blog & creator",
      description: "For writers, creators and newsletters: articles, author, video and subscription.",
      sections: {
        products: "Articles",
        about: "Author",
        gallery: "Instagram",
        video: "Video",
        testimonials: "Readers",
        cta: "Newsletter",
      },
    },
  },
  strings: {
    es: { read: "Leer el artículo" },
    en: { read: "Read the article" },
  },
  config: {
    theme: {
      colorPrimary: "#2747c8",
      colorSecondary: "#17181b",
      fontFamily: "Newsreader",
      fontBody: "DM Sans",
      darkMode: false,
      language: "es",
    },
    headings: {
      products: {
        eyebrow: "Artículos",
        title: "Lo último en Pausa",
        subtitle: "Rutas, mercados y recetas para leer con calma. Todos los artículos son gratis.",
      },
      about: { eyebrow: "La autora", title: "", subtitle: "" },
      gallery: {
        eyebrow: "Instagram",
        title: "@pausa.carta",
        subtitle: "Lo que no cabe en la newsletter: mercados, mesas y caminos de los últimos viajes.",
      },
      video: {
        eyebrow: "Vídeo",
        title: "Una mañana en el Mercado Central de València",
        subtitle: "Para acompañar el artículo sobre mercados, el paseo de Visit Comunitat Valenciana por el mercado que más visito.",
      },
      testimonials: { eyebrow: "Lectores", title: "Cartas que llegan de vuelta", subtitle: "" },
      contact: {
        eyebrow: "Contacto",
        title: "Colaboraciones y prensa",
        subtitle: "¿Tienes un proyecto que encaja con Pausa o quieres proponer una ruta? Escríbeme y te contesto en unos días.",
      },
    },
    brand: { name: "Pausa", logo: "" },
    hero: {
      eyebrow: "Una newsletter de Inés Calvo",
      title: "Comer y viajar despacio, una carta cada domingo.",
      subtitle:
        "Rutas sin prisa, mercados, recetas de casa y sitios donde quedarse un rato más. La leen 12.400 personas y es gratis.",
      backgroundImage: photo("photo-1606031901060-971e80cd8bee"),
      ctaText: "Suscribirme gratis",
      ctaLink: "https://pausa.substack.com",
      secondaryCtaText: "Leer los artículos",
      secondaryCtaLink: "#products",
    },
    products: [
      {
        title: "Siete días por la Galicia de interior, sin coche",
        description:
          "Del Miño a la Ribeira Sacra en tren, autobús y a pie: dónde dormir, qué comer y por qué aquí el ritmo lento no es una pose.",
        price: "12 min",
        image: photo("photo-1656925341785-89fdf6aaf62c"),
        badge: "Viajes",
        link: "https://pausa.substack.com/p/galicia-interior",
      },
      {
        title: "Dónde comer arroz en Valencia sin caer en la trampa",
        description: "Leña, socarrat y ni una foto de paella en la puerta: seis casas de comidas que hacen el arroz como toca.",
        price: "8 min",
        image: photo("photo-1650964802649-ef992b574b8c"),
        badge: "Comer",
        link: "https://pausa.substack.com/p/arroz-valencia",
      },
      {
        title: "Mercados de abastos que merecen el viaje",
        description: "Ruzafa, la Ribera de Bilbao o el Central de Almería: cómo visitarlos sin estorbar y qué llevarse a casa.",
        price: "10 min",
        image: photo("photo-1767189522327-d6bf2761c7df"),
        badge: "Mercados",
        link: "https://pausa.substack.com/p/mercados",
      },
      {
        title: "Cádiz en invierno, cuando la ciudad vuelve a ser de los gaditanos",
        description: "Levante, tortillitas de camarones y La Caleta sin toallas. Una guía para ir en enero.",
        price: "7 min",
        image: photo("photo-1689542048320-dc30192afe5e"),
        badge: "Viajes",
        link: "https://pausa.substack.com/p/cadiz-invierno",
      },
      {
        title: "Pan de pueblo en casa, sin amasar",
        description: "La receta que más me habéis pedido: harina, agua, sal, una pizca de levadura y una noche de paciencia.",
        price: "6 min",
        image: photo("photo-1725297952102-ab28892a31ab"),
        badge: "Recetas",
        link: "https://pausa.substack.com/p/pan-sin-amasar",
      },
      {
        title: "Sevilla en tres barras y un paseo",
        description: "Una mañana por el centro con paradas para el café, el montadito y una sobremesa larga a la sombra.",
        price: "5 min",
        image: photo("photo-1737290260399-6fee9b998588"),
        badge: "Escapadas",
        link: "https://pausa.substack.com/p/sevilla",
      },
    ],
    about: {
      heading: "Soy Inés y escribo sobre lo que pasa cuando bajas el ritmo.",
      content:
        "Fui periodista de viajes durante diez años, siempre corriendo para cerrar la siguiente guía. En 2021 empecé Pausa para contar justo lo contrario: lugares que piden quedarse, mesas largas y recetas que no tienen prisa.\n\nCada domingo envío una carta con una ruta, una receta o una conversación con alguien que hace las cosas despacio. Vivo en Valencia, como donde puedo y contesto todos los correos, aunque a veces tarde un poco.",
      image: photo("photo-1726047336543-27a30daeca8a"),
    },
    gallery: [
      { image: photo("photo-1707313864630-7df6a1d0a502"), caption: "Jamón al corte en una feria de Salamanca" },
      { image: photo("photo-1604589198090-496c20c7901c"), caption: "Vacas frente al mar en la costa de Lugo" },
      { image: photo("photo-1758487405374-9a76086d49ff"), caption: "El puesto de los limones, sábado de mercado" },
      { image: photo("photo-1714258940296-34678ad8b59a"), caption: "Tejados blancos de Cádiz" },
      { image: photo("photo-1684362366157-51df7832037c"), caption: "La flecha amarilla del Camino" },
      { image: photo("photo-1606031912115-ed5e3afde250"), caption: "Pimientos secos para el invierno" },
    ],
    video: { url: "https://www.youtube.com/watch?v=h7CHX0JrGeA", thumbnail: "" },
    testimonials: [
      {
        name: "Lucía Ferrer",
        role: "Lectora desde 2022, Bilbao",
        quote: "Es el único correo que espero el domingo. Me ha hecho viajar más despacio y comer bastante mejor.",
        avatar: "",
      },
      {
        name: "Andrés Molina",
        role: "Lector desde el primer número, Zaragoza",
        quote: "Fuimos a Cádiz en enero siguiendo su guía y acertamos con todo, hasta con el levante.",
        avatar: "",
      },
      {
        name: "Carmen Ruiz",
        role: "Lectora, Madrid",
        quote: "La receta del pan sin amasar me ha cambiado los fines de semana. Y las fotos dan ganas de salir de casa.",
        avatar: "",
      },
    ],
    cta: {
      title: "Una carta cada domingo. Gratis.",
      text: "Sin publicidad ni algoritmos: una ruta, una receta o una conversación, directamente en tu correo. Te das de baja cuando quieras.",
      buttonText: "Suscribirme en Substack",
      buttonLink: "https://pausa.substack.com",
    },
    contact: {
      email: "hola@pausacarta.es",
      phone: "",
      address: "",
      hours: "",
      whatsapp: "",
    },
    footer: {
      text: "Pausa es una newsletter independiente sobre comer y viajar despacio, escrita desde Valencia.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/" },
        { label: "Substack", url: "https://substack.com/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
