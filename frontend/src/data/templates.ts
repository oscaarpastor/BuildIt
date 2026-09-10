export type TemplateConfig = {
  theme: {
    colorPrimary: string;
    colorSecondary: string;
    fontFamily: string;
    darkMode: boolean;
  };
  brand: { name: string; logo: string };
  hero: { title: string; subtitle: string; backgroundImage: string; ctaText: string; ctaLink: string };
  about: { heading: string; content: string; image: string };
  features: { icon: string; title: string; description: string }[];
  products: { title: string; description: string; price: string; image: string }[];
  gallery: { image: string }[];
  video: { url: string; thumbnail: string };
  testimonials: { name: string; quote: string; avatar: string }[];
  documentation: { title: string; url: string }[];
  faqs: { question: string; answer: string }[];
  inspiration: { category: string; name: string; image: string; link: string; description: string }[];
  program: {
    title: string; image: string; reason: string; functioning: string;
    methodology: string; selection: string;
    cta1: { text: string; link: string };
    cta2: { text: string; link: string };
  };
  contact: { email: string; phone: string; address: string; formEnabled: boolean };
  footer: { text: string; links: { label: string; url: string }[] };
};

export type TemplateDef = {
  id: string;
  name: string;
  description: string;
  view: string;
  gradient: string;
  icon: string;
  config: TemplateConfig;
};

export const TEMPLATES: TemplateDef[] = [
  {
    id: "startup",
    name: "Landing Page (Startup/SaaS)",
    description: "Hero, features, pricing, CTA — ideal for startups and SaaS products.",
    view: "templateStartup",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "🚀",
    config: {
      theme: { colorPrimary: "#6366f1", colorSecondary: "#818cf8", fontFamily: "Inter", darkMode: false },
      brand: { name: "LaunchPad", logo: "" },
      hero: {
        title: "Build Better Products, Faster",
        subtitle: "The all-in-one platform for modern teams to ship, iterate, and grow.",
        backgroundImage: "",
        ctaText: "Start Free Trial",
        ctaLink: "#contact"
      },
      about: {
        heading: "Why Teams Choose Us",
        content: "We help startups go from idea to launch in weeks, not months. Our platform combines project management, analytics, and collaboration in one seamless experience.",
        image: ""
      },
      features: [
        { icon: "⚡", title: "Lightning Fast", description: "Deploy in seconds with our optimized infrastructure and one-click releases." },
        { icon: "🔒", title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption and role-based access control." },
        { icon: "📊", title: "Real-time Analytics", description: "Track every metric that matters with beautiful, actionable dashboards." }
      ],
      products: [
        { title: "Starter", description: "Perfect for small teams getting started", price: "$29/mo", image: "" },
        { title: "Pro", description: "Advanced features for growing teams", price: "$79/mo", image: "" },
        { title: "Enterprise", description: "Custom solutions for large organizations", price: "Contact us", image: "" }
      ],
      gallery: [],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Sarah Chen", quote: "LaunchPad cut our deployment time by 80%. Game changer for our team.", avatar: "" },
        { name: "Marcus Rivera", quote: "The analytics alone paid for the subscription in the first week.", avatar: "" },
        { name: "Emma Thompson", quote: "Best developer experience I've ever had with a SaaS tool.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "How long is the free trial?", answer: "Our free trial lasts 14 days with full access to all Pro features. No credit card required." },
        { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time. No hidden fees or penalties." },
        { question: "Do you offer discounts for startups?", answer: "Yes! We offer 50% off for the first year for qualified startups. Contact our sales team." }
      ],
      inspiration: [],
      program: {
        title: "From Zero to Launch",
        image: "",
        reason: "Most startups fail because of slow execution. We eliminate that bottleneck.",
        functioning: "Sign up, connect your tools, and start shipping within minutes.",
        methodology: "Agile-first approach with built-in sprint planning and retrospectives.",
        selection: "Open to all teams. Enterprise clients get dedicated onboarding support.",
        cta1: { text: "Get Started", link: "#contact" },
        cta2: { text: "Book a Demo", link: "#contact" }
      },
      contact: { email: "hello@launchpad.io", phone: "+1 (555) 123-4567", address: "San Francisco, CA", formEnabled: true },
      footer: { text: "2024 LaunchPad Inc. All rights reserved.", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }
    }
  },
  {
    id: "portfolio",
    name: "Portfolio Personal",
    description: "About, projects, skills, contact — perfect for designers and developers.",
    view: "templatePortfolio",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: "🎨",
    config: {
      theme: { colorPrimary: "#e11d48", colorSecondary: "#fb7185", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "Alex Morgan", logo: "" },
      hero: {
        title: "Designer & Creative Developer",
        subtitle: "I craft digital experiences that people love to use.",
        backgroundImage: "",
        ctaText: "View My Work",
        ctaLink: "#gallery"
      },
      about: {
        heading: "About Me",
        content: "I'm a multidisciplinary designer with 8+ years of experience creating brands, websites, and digital products. I believe great design solves real problems while delighting users along the way.",
        image: ""
      },
      features: [
        { icon: "🖥️", title: "UI/UX Design", description: "User-centered interfaces built with research, wireframes, and high-fidelity prototypes." },
        { icon: "🎯", title: "Brand Identity", description: "Logos, style guides, and visual systems that tell your brand's story." },
        { icon: "💻", title: "Web Development", description: "Clean, responsive front-end code using modern frameworks and best practices." }
      ],
      products: [],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Laura Kim, CEO at Bloom", quote: "Alex transformed our brand from forgettable to unforgettable. Truly talented.", avatar: "" },
        { name: "David Park, CTO at NovaTech", quote: "The attention to detail and user empathy in every design decision was remarkable.", avatar: "" },
        { name: "Rachel Foster, Founder", quote: "Working with Alex felt like having a creative partner, not just a contractor.", avatar: "" }
      ],
      documentation: [],
      faqs: [],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "alex@morgandesign.co", phone: "+1 (555) 987-6543", address: "Portland, OR", formEnabled: true },
      footer: { text: "2024 Alex Morgan. Crafted with passion.", links: [{ label: "LinkedIn", url: "#" }, { label: "Dribbble", url: "#" }, { label: "GitHub", url: "#" }] }
    }
  },
  {
    id: "shop",
    name: "Tienda Online",
    description: "Hero, productos destacados, categorias, CTA — for e-commerce brands.",
    view: "templateShop",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: "🛒",
    config: {
      theme: { colorPrimary: "#059669", colorSecondary: "#34d399", fontFamily: "Montserrat", darkMode: false },
      brand: { name: "Verde Store", logo: "" },
      hero: {
        title: "Sustainable Fashion, Delivered",
        subtitle: "Ethically made clothing and accessories for the conscious consumer.",
        backgroundImage: "",
        ctaText: "Shop Now",
        ctaLink: "#products"
      },
      about: {
        heading: "Our Story",
        content: "Founded in 2020, Verde Store was born from a simple idea: fashion shouldn't cost the earth. Every product in our catalog is ethically sourced, sustainably made, and shipped carbon-neutral.",
        image: ""
      },
      features: [
        { icon: "🌿", title: "100% Sustainable", description: "Every product meets our strict eco-friendly certification standards." },
        { icon: "📦", title: "Free Shipping", description: "Carbon-neutral delivery on all orders over $50, worldwide." },
        { icon: "♻️", title: "Easy Returns", description: "30-day hassle-free returns. We'll even pick up from your door." }
      ],
      products: [
        { title: "Organic Cotton Tee", description: "Soft, breathable, and made from 100% GOTS-certified organic cotton.", price: "$35", image: "" },
        { title: "Recycled Denim Jacket", description: "Classic style meets circular fashion. Made from post-consumer recycled denim.", price: "$89", image: "" },
        { title: "Bamboo Sneakers", description: "Lightweight and durable sneakers with bamboo fiber uppers and natural rubber soles.", price: "$72", image: "" }
      ],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Maria G.", quote: "The quality is incredible for sustainable fashion. My new favorite brand!", avatar: "" },
        { name: "James W.", quote: "Finally, a store that walks the talk on sustainability. Fast shipping too.", avatar: "" },
        { name: "Priya S.", quote: "The denim jacket is a masterpiece. Gets compliments every time I wear it.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "What materials do you use?", answer: "We exclusively use organic, recycled, and sustainably sourced materials certified by GOTS, Fair Trade, and other leading standards." },
        { question: "Do you ship internationally?", answer: "Yes! We ship to over 40 countries with carbon-neutral delivery. Free shipping on orders over $50." },
        { question: "How do I return an item?", answer: "Returns are free within 30 days. Just initiate a return in your account and we'll arrange pickup." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "shop@verdestore.com", phone: "+1 (555) 234-5678", address: "Austin, TX", formEnabled: true },
      footer: { text: "2024 Verde Store. Fashion for the planet.", links: [{ label: "Shipping Policy", url: "#" }, { label: "Returns", url: "#" }, { label: "Sustainability", url: "#" }] }
    }
  },
  {
    id: "agencia",
    name: "Agencia Creativa",
    description: "Servicios, portfolio, equipo, contacto — for creative agencies.",
    view: "templateAgencia",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: "✨",
    config: {
      theme: { colorPrimary: "#dc2626", colorSecondary: "#fbbf24", fontFamily: "Montserrat", darkMode: false },
      brand: { name: "Pixel Studio", logo: "" },
      hero: {
        title: "We Create Digital Experiences",
        subtitle: "Award-winning creative agency specializing in brand, web, and product design.",
        backgroundImage: "",
        ctaText: "Start a Project",
        ctaLink: "#contact"
      },
      about: {
        heading: "Who We Are",
        content: "Pixel Studio is a team of 25 designers, developers, and strategists who believe in the power of design to transform businesses. Since 2015, we've helped over 200 brands tell their stories and grow their digital presence.",
        image: ""
      },
      features: [
        { icon: "🎨", title: "Brand Strategy", description: "Research-driven brand positioning, visual identity, and messaging that resonates." },
        { icon: "📱", title: "Product Design", description: "End-to-end UX/UI design from discovery to pixel-perfect handoff." },
        { icon: "🌐", title: "Web Development", description: "Custom websites and web apps built with modern tech stacks and best practices." }
      ],
      products: [
        { title: "Starter Package", description: "Logo, brand guide, and single-page website", price: "From $3,000", image: "" },
        { title: "Growth Package", description: "Full brand identity + multi-page site + SEO", price: "From $8,000", image: "" },
        { title: "Enterprise Package", description: "Complete digital transformation + ongoing support", price: "Custom quote", image: "" }
      ],
      gallery: [],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Tom Bradley, CEO at Apex", quote: "Pixel Studio didn't just redesign our website — they redefined our brand. Revenue up 40%.", avatar: "" },
        { name: "Nina Rossi, Founder of Bloom", quote: "The most professional and creative agency we've ever worked with. Period.", avatar: "" },
        { name: "Alex Wu, VP at TechFlow", quote: "They delivered a product that our users genuinely love. Incredible attention to detail.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "How long does a typical project take?", answer: "Brand projects take 4-6 weeks, websites 6-10 weeks, and product design 8-12 weeks depending on scope." },
        { question: "What's your pricing model?", answer: "We offer fixed-price packages and custom quotes. Most projects range from $3,000 to $50,000+." },
        { question: "Do you work with remote clients?", answer: "Absolutely. 70% of our clients are remote. We use Figma, Slack, and weekly video calls to stay aligned." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "hello@pixelstudio.co", phone: "+1 (555) 345-6789", address: "New York, NY", formEnabled: true },
      footer: { text: "2024 Pixel Studio. Crafting digital experiences.", links: [{ label: "Instagram", url: "#" }, { label: "Behance", url: "#" }, { label: "LinkedIn", url: "#" }] }
    }
  },
  {
    id: "blog",
    name: "Blog / Magazine",
    description: "Hero, posts destacados, categorias, newsletter — for content creators.",
    view: "templateBlog",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    icon: "📝",
    config: {
      theme: { colorPrimary: "#7c3aed", colorSecondary: "#c084fc", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "The Curious Mind", logo: "" },
      hero: {
        title: "Stories Worth Reading",
        subtitle: "Deep dives into technology, design, and the future of creativity.",
        backgroundImage: "",
        ctaText: "Subscribe",
        ctaLink: "#contact"
      },
      about: {
        heading: "About the Author",
        content: "Hi, I'm Jordan — a writer, technologist, and lifelong learner. I started The Curious Mind to share ideas at the intersection of design, code, and culture. Every week I publish essays, interviews, and tutorials for creative thinkers.",
        image: ""
      },
      features: [],
      products: [],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Reader @designthink", quote: "The Curious Mind is the only newsletter I never skip. Always insightful.", avatar: "" },
        { name: "Reader @codecraft", quote: "Jordan has a gift for making complex topics accessible and engaging.", avatar: "" },
        { name: "Reader @futureflux", quote: "Every article gives me something new to think about. Highly recommend.", avatar: "" }
      ],
      documentation: [],
      faqs: [],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "hello@curiousmind.blog", phone: "", address: "", formEnabled: true },
      footer: { text: "2024 The Curious Mind. Written with care.", links: [{ label: "Twitter", url: "#" }, { label: "RSS Feed", url: "#" }] }
    }
  },
  {
    id: "restaurante",
    name: "Restaurante",
    description: "Menu, reservas, galeria, ubicacion — for restaurants and cafes.",
    view: "templateRestaurante",
    gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    icon: "🍽️",
    config: {
      theme: { colorPrimary: "#b45309", colorSecondary: "#f59e0b", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "Casa del Sol", logo: "" },
      hero: {
        title: "A Taste of the Mediterranean",
        subtitle: "Authentic cuisine crafted with fresh, local ingredients and timeless recipes.",
        backgroundImage: "",
        ctaText: "Reserve a Table",
        ctaLink: "#contact"
      },
      about: {
        heading: "Our Story",
        content: "For three generations, Casa del Sol has brought the warmth and flavor of the Mediterranean to every plate. Our chefs combine traditional recipes with modern techniques, sourcing ingredients from local farms and trusted purveyors.",
        image: ""
      },
      features: [
        { icon: "🥘", title: "Seasonal Menu", description: "Our menu changes with the seasons, featuring the freshest produce and catch of the day." },
        { icon: "🍷", title: "Wine Cellar", description: "Over 200 labels from around the world, curated by our sommelier to complement every dish." },
        { icon: "🌿", title: "Farm to Table", description: "We partner with 12 local farms to ensure every ingredient is fresh, organic, and sustainable." }
      ],
      products: [
        { title: "Paella Valenciana", description: "Saffron rice with seafood, chicken, and seasonal vegetables. Serves 2.", price: "$38", image: "" },
        { title: "Grilled Octopus", description: "Tender charred octopus with smoked paprika, olive oil, and roasted potatoes.", price: "$26", image: "" },
        { title: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.", price: "$12", image: "" }
      ],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Carlos M.", quote: "The best paella I've had outside of Spain. The atmosphere is magical.", avatar: "" },
        { name: "Jennifer L.", quote: "Perfect for date night. The wine pairing was exceptional and the service impeccable.", avatar: "" },
        { name: "Robert K.", quote: "We hosted our anniversary dinner here. Every course was a masterpiece.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "Do you take reservations?", answer: "Yes, we recommend booking at least 48 hours in advance for weekends. You can reserve online or by phone." },
        { question: "Do you have vegetarian options?", answer: "Absolutely. We have a dedicated vegetarian menu and can accommodate vegan and gluten-free diets with advance notice." },
        { question: "Is there parking available?", answer: "Yes, we have a private lot with complimentary valet service on Friday and Saturday evenings." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "reservas@casadelsol.com", phone: "+1 (555) 456-7890", address: "123 Olive Street, Miami, FL", formEnabled: true },
      footer: { text: "2024 Casa del Sol. All rights reserved.", links: [{ label: "Instagram", url: "#" }, { label: "TripAdvisor", url: "#" }, { label: "Google Maps", url: "#" }] }
    }
  }
];
