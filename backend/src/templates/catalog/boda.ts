import type { TemplateDefinition } from "../types";

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

// Boda y evento: editorial romántica. Cormorant Garamond (cursiva con mesura)
// con Jost, verde eucalipto (principal) y rosa empolvado (secundario).
const template: TemplateDefinition = {
  view: "templateBoda",
  category: "events",
  sections: ["brand", "hero", "about", "steps", "gallery", "faqs", "cta", "contact", "footer"],
  text: {
    es: {
      name: "Boda y evento",
      description: "Para bodas y celebraciones: vuestra historia, el programa del día, fotos, dudas y confirmación.",
      sections: { about: "Nuestra historia", steps: "Programa", gallery: "Fotos", faqs: "Dudas", cta: "Confirmar asistencia", contact: "Lugar" },
    },
    en: {
      name: "Wedding & event",
      description: "For weddings and celebrations: your story, the day's schedule, photos, FAQ and RSVP.",
      sections: { about: "Our story", steps: "Schedule", gallery: "Photos", faqs: "FAQ", cta: "RSVP", contact: "Venue" },
    },
  },
  strings: {
    es: { questions: "¿Alguna duda?", venue: "Dirección", moment: "Momento" },
    en: { questions: "Any questions?", venue: "Address", moment: "Moment" },
  },
  config: {
    theme: {
      colorPrimary: "#74856c",
      colorSecondary: "#e9d5cf",
      fontFamily: "Cormorant Garamond",
      fontBody: "Jost",
      darkMode: false,
      language: "es",
    },
    headings: {
      about: { eyebrow: "Nuestra historia", title: "", subtitle: "" },
      steps: {
        eyebrow: "El programa",
        title: "Así será el día",
        subtitle: "Sábado 12 de junio de 2027. Los horarios son aproximados: lo importante es disfrutarlo.",
      },
      gallery: { eyebrow: "Fotos", title: "Un poco de nosotros", subtitle: "" },
      faqs: {
        eyebrow: "Dudas",
        title: "Todo lo que necesitas saber",
        subtitle: "Y si te queda cualquier otra pregunta, escríbenos sin problema.",
      },
      contact: {
        eyebrow: "El lugar",
        title: "Finca El Robledal",
        subtitle: "Una antigua casa de labranza entre robles, a diez minutos del Acueducto de Segovia.",
      },
    },
    brand: { name: "L & M", logo: "" },
    hero: {
      eyebrow: "12 de junio de 2027",
      title: "Lucía & Martín",
      subtitle: "Nos casamos en la Finca El Robledal, a las afueras de Segovia, y queremos celebrarlo contigo.",
      backgroundImage: photo("photo-1782786400176-2cd27f0c12b2"),
      ctaText: "Confirmar asistencia",
      ctaLink: "#cta",
      secondaryCtaText: "Ver el programa",
      secondaryCtaLink: "#steps",
    },
    about: {
      heading: "Todo empezó en una biblioteca de Salamanca",
      content:
        "Nos conocimos en 2016 en la biblioteca de la facultad, peleándonos por el último enchufe libre en plena época de exámenes. Él estudiaba Arquitectura y ella Traducción, y el café de después se alargó hasta la hora de cenar.\n\nDiez años, tres pisos y un perro llamado Tofu más tarde, Martín le pidió matrimonio a Lucía en el mirador de Santa Luzia, en Lisboa. Ahora solo nos falta lo más importante: celebrarlo con vosotros.",
      image: photo("photo-1782786398583-204128485db0"),
    },
    steps: [
      { label: "12:30", title: "Ceremonia", description: "En el jardín de los robles. Os pedimos llegar con quince minutos de antelación." },
      { label: "13:30", title: "Cóctel", description: "Aperitivos y vino de la Ribera en la terraza, con vistas a la sierra de Guadarrama." },
      { label: "15:00", title: "Banquete", description: "Comida en el antiguo granero de la finca." },
      { label: "18:00", title: "Baile", description: "Abrimos la pista con un vals y, a partir de ahí, que no pare la música." },
      { label: "21:30", title: "Recena", description: "Algo salado y algo dulce para recuperar fuerzas." },
      { label: "02:30", title: "Último autobús", description: "Salida hacia Segovia. Habrá otro a las 23:00 para quien quiera retirarse antes." },
    ],
    gallery: [
      { image: photo("photo-1782786399294-f4af1c967b9b"), caption: "En la sierra de Guadarrama" },
      { image: photo("photo-1782786660981-08ce2c319a04"), caption: "Ella, siempre bailando" },
      { image: photo("photo-1782786400620-c47ec2217687"), caption: "Espalda con espalda" },
      { image: photo("photo-1782786660976-ce912e79bc1e"), caption: "Las risas de cada día" },
      { image: photo("photo-1782786398261-d95d47002943"), caption: "Casi diez años juntos" },
      { image: photo("photo-1782786400179-ac3a4e8b1409"), caption: "Nos vemos en junio" },
    ],
    faqs: [
      {
        question: "¿Cuál es el código de vestimenta?",
        answer:
          "Formal de día. La ceremonia es sobre césped, así que mejor evitar los tacones finos; habrá alpargatas para quien las necesite.",
      },
      {
        question: "¿Dónde podemos alojarnos?",
        answer:
          "Hemos reservado habitaciones con precio especial en el Hotel Infanta Isabel de Segovia, a quince minutos de la finca. Di que vienes a nuestra boda al reservar.",
      },
      {
        question: "¿Habrá autobús?",
        answer:
          "Sí. Sale a las 11:45 desde el Acueducto de Segovia y hay vuelta a las 23:00 y a las 02:30. Indícanos si lo necesitas al confirmar.",
      },
      {
        question: "¿Pueden venir niños?",
        answer: "¡Claro! Habrá menú infantil y una zona de juegos con monitoras durante el banquete y el baile.",
      },
    ],
    cta: {
      title: "¿Nos acompañas?",
      text: "Confírmanos tu asistencia antes del 15 de marzo de 2027 y cuéntanos si necesitas autobús o tienes alguna alergia.",
      buttonText: "Confirmar asistencia",
      buttonLink: "https://forms.google.com/",
    },
    contact: {
      email: "hola@luciaymartin.es",
      phone: "600 00 00 00",
      address: "Finca El Robledal, Carretera de La Granja km 4, 40196 La Lastrilla, Segovia",
      hours: "",
      whatsapp: "",
    },
    footer: {
      text: "Con muchas ganas de celebrarlo con vosotros.",
      links: [
        { label: "#LuciayMartin2027", url: "https://www.instagram.com/explore/tags/luciaymartin2027/" },
        { label: "Aviso legal", url: "#" },
        { label: "Privacidad", url: "#" },
      ],
    },
  },
};

export default template;
