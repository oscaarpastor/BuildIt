import mongoose from "mongoose";
import dotenv from "dotenv";
import { BaseTemplate } from "../models/BaseTemplate";

dotenv.config();

const templates = [
  {
    name: "Landing Page (Startup/SaaS)",
    description: "Hero, features, pricing, CTA — ideal for startups and SaaS products.",
    view: "templateStartup",
    config: {
      theme: { colorPrimary: "#6366f1", colorSecondary: "#818cf8", fontFamily: "Inter", darkMode: false },
      brand: { name: "LaunchPad", logo: "" },
      hero: { title: "Build Better Products, Faster", subtitle: "The all-in-one platform for modern teams to ship, iterate, and grow.", backgroundImage: "", ctaText: "Start Free Trial", ctaLink: "#contact" },
      about: { heading: "Why Teams Choose Us", content: "We help startups go from idea to launch in weeks, not months. Our platform combines project management, analytics, and collaboration in one seamless experience.", image: "" },
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
      program: { title: "From Zero to Launch", image: "", reason: "Most startups fail because of slow execution. We eliminate that bottleneck.", functioning: "Sign up, connect your tools, and start shipping within minutes.", methodology: "Agile-first approach with built-in sprint planning and retrospectives.", selection: "Open to all teams. Enterprise clients get dedicated onboarding support.", cta1: { text: "Get Started", link: "#contact" }, cta2: { text: "Book a Demo", link: "#contact" } },
      contact: { email: "hello@launchpad.io", phone: "+1 (555) 123-4567", address: "San Francisco, CA", formEnabled: true },
      footer: { text: "2024 LaunchPad Inc. All rights reserved.", links: [{ label: "Privacy", url: "#" }, { label: "Terms", url: "#" }] }
    }
  },
  {
    name: "Portfolio Personal",
    description: "About, projects, skills, contact — perfect for designers and developers.",
    view: "templatePortfolio",
    config: {
      theme: { colorPrimary: "#e11d48", colorSecondary: "#fb7185", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "Alex Morgan", logo: "" },
      hero: { title: "Designer & Creative Developer", subtitle: "I craft digital experiences that people love to use.", backgroundImage: "", ctaText: "View My Work", ctaLink: "#gallery" },
      about: { heading: "About Me", content: "I'm a multidisciplinary designer with 8+ years of experience creating brands, websites, and digital products. I believe great design solves real problems while delighting users along the way.", image: "" },
      features: [
        { icon: "🖥️", title: "UI/UX Design", description: "User-centered interfaces built with research, wireframes, and high-fidelity prototypes." },
        { icon: "🎯", title: "Brand Identity", description: "Logos, style guides, and visual systems that tell your brand's story." },
        { icon: "💻", title: "Web Development", description: "Clean, responsive front-end code using modern frameworks and best practices." }
      ],
      products: [],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Laura Kim", quote: "Alex transformed our brand from forgettable to unforgettable.", avatar: "" },
        { name: "David Park", quote: "The attention to detail and user empathy was remarkable.", avatar: "" },
        { name: "Rachel Foster", quote: "Working with Alex felt like having a creative partner.", avatar: "" }
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
    name: "Tienda Online",
    description: "Hero, productos destacados, categorias, CTA — for e-commerce brands.",
    view: "templateShop",
    config: {
      theme: { colorPrimary: "#059669", colorSecondary: "#34d399", fontFamily: "Montserrat", darkMode: false },
      brand: { name: "Verde Store", logo: "" },
      hero: { title: "Sustainable Fashion, Delivered", subtitle: "Ethically made clothing and accessories for the conscious consumer.", backgroundImage: "", ctaText: "Shop Now", ctaLink: "#products" },
      about: { heading: "Our Story", content: "Founded in 2020, Verde Store was born from a simple idea: fashion shouldn't cost the earth. Every product is ethically sourced, sustainably made, and shipped carbon-neutral.", image: "" },
      features: [
        { icon: "🌿", title: "100% Sustainable", description: "Every product meets our strict eco-friendly certification standards." },
        { icon: "📦", title: "Free Shipping", description: "Carbon-neutral delivery on all orders over $50, worldwide." },
        { icon: "♻️", title: "Easy Returns", description: "30-day hassle-free returns. We'll even pick up from your door." }
      ],
      products: [
        { title: "Organic Cotton Tee", description: "Soft, breathable, GOTS-certified organic cotton.", price: "$35", image: "" },
        { title: "Recycled Denim Jacket", description: "Classic style meets circular fashion.", price: "$89", image: "" },
        { title: "Bamboo Sneakers", description: "Lightweight sneakers with bamboo fiber uppers.", price: "$72", image: "" }
      ],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Maria G.", quote: "Incredible quality for sustainable fashion. My new favorite brand!", avatar: "" },
        { name: "James W.", quote: "Finally, a store that walks the talk on sustainability.", avatar: "" },
        { name: "Priya S.", quote: "The denim jacket is a masterpiece. Gets compliments every time.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "What materials do you use?", answer: "Exclusively organic, recycled, and sustainably sourced materials certified by GOTS and Fair Trade." },
        { question: "Do you ship internationally?", answer: "Yes! We ship to over 40 countries with carbon-neutral delivery." },
        { question: "How do I return an item?", answer: "Free returns within 30 days. Initiate in your account and we'll arrange pickup." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "shop@verdestore.com", phone: "+1 (555) 234-5678", address: "Austin, TX", formEnabled: true },
      footer: { text: "2024 Verde Store. Fashion for the planet.", links: [{ label: "Shipping", url: "#" }, { label: "Returns", url: "#" }, { label: "Sustainability", url: "#" }] }
    }
  },
  {
    name: "Agencia Creativa",
    description: "Servicios, portfolio, equipo, contacto — for creative agencies.",
    view: "templateAgencia",
    config: {
      theme: { colorPrimary: "#dc2626", colorSecondary: "#fbbf24", fontFamily: "Montserrat", darkMode: false },
      brand: { name: "Pixel Studio", logo: "" },
      hero: { title: "We Create Digital Experiences", subtitle: "Award-winning creative agency specializing in brand, web, and product design.", backgroundImage: "", ctaText: "Start a Project", ctaLink: "#contact" },
      about: { heading: "Who We Are", content: "Pixel Studio is a team of 25 designers, developers, and strategists. Since 2015, we've helped over 200 brands tell their stories and grow their digital presence.", image: "" },
      features: [
        { icon: "🎨", title: "Brand Strategy", description: "Research-driven brand positioning, visual identity, and messaging." },
        { icon: "📱", title: "Product Design", description: "End-to-end UX/UI design from discovery to pixel-perfect handoff." },
        { icon: "🌐", title: "Web Development", description: "Custom websites and web apps with modern tech stacks." }
      ],
      products: [
        { title: "Starter Package", description: "Logo, brand guide, and single-page website", price: "From $3,000", image: "" },
        { title: "Growth Package", description: "Full brand identity + multi-page site + SEO", price: "From $8,000", image: "" },
        { title: "Enterprise Package", description: "Complete digital transformation + ongoing support", price: "Custom quote", image: "" }
      ],
      gallery: [],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "Tom Bradley", quote: "Pixel Studio didn't just redesign our website — they redefined our brand.", avatar: "" },
        { name: "Nina Rossi", quote: "The most professional and creative agency we've ever worked with.", avatar: "" },
        { name: "Alex Wu", quote: "They delivered a product that our users genuinely love.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "How long does a project take?", answer: "Brand: 4-6 weeks, websites: 6-10 weeks, product design: 8-12 weeks." },
        { question: "What's your pricing?", answer: "Fixed-price packages and custom quotes. Most projects range from $3K to $50K+." },
        { question: "Do you work remotely?", answer: "70% of our clients are remote. We use Figma, Slack, and weekly video calls." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "hello@pixelstudio.co", phone: "+1 (555) 345-6789", address: "New York, NY", formEnabled: true },
      footer: { text: "2024 Pixel Studio. Crafting digital experiences.", links: [{ label: "Instagram", url: "#" }, { label: "Behance", url: "#" }, { label: "LinkedIn", url: "#" }] }
    }
  },
  {
    name: "Blog / Magazine",
    description: "Hero, posts destacados, categorias, newsletter — for content creators.",
    view: "templateBlog",
    config: {
      theme: { colorPrimary: "#7c3aed", colorSecondary: "#c084fc", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "The Curious Mind", logo: "" },
      hero: { title: "Stories Worth Reading", subtitle: "Deep dives into technology, design, and the future of creativity.", backgroundImage: "", ctaText: "Subscribe", ctaLink: "#contact" },
      about: { heading: "About the Author", content: "Hi, I'm Jordan — a writer, technologist, and lifelong learner. I started The Curious Mind to share ideas at the intersection of design, code, and culture.", image: "" },
      features: [],
      products: [],
      gallery: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
      video: { url: "", thumbnail: "" },
      testimonials: [
        { name: "@designthink", quote: "The only newsletter I never skip. Always insightful.", avatar: "" },
        { name: "@codecraft", quote: "A gift for making complex topics accessible and engaging.", avatar: "" },
        { name: "@futureflux", quote: "Every article gives me something new to think about.", avatar: "" }
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
    name: "Restaurante",
    description: "Menu, reservas, galeria, ubicacion — for restaurants and cafes.",
    view: "templateRestaurante",
    config: {
      theme: { colorPrimary: "#b45309", colorSecondary: "#f59e0b", fontFamily: "Playfair Display", darkMode: false },
      brand: { name: "Casa del Sol", logo: "" },
      hero: { title: "A Taste of the Mediterranean", subtitle: "Authentic cuisine crafted with fresh, local ingredients and timeless recipes.", backgroundImage: "", ctaText: "Reserve a Table", ctaLink: "#contact" },
      about: { heading: "Our Story", content: "For three generations, Casa del Sol has brought the warmth and flavor of the Mediterranean to every plate. Our chefs combine traditional recipes with modern techniques.", image: "" },
      features: [
        { icon: "🥘", title: "Seasonal Menu", description: "Our menu changes with the seasons, featuring the freshest produce and catch of the day." },
        { icon: "🍷", title: "Wine Cellar", description: "Over 200 labels from around the world, curated by our sommelier." },
        { icon: "🌿", title: "Farm to Table", description: "We partner with 12 local farms for fresh, organic, sustainable ingredients." }
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
        { name: "Jennifer L.", quote: "Perfect for date night. The wine pairing was exceptional.", avatar: "" },
        { name: "Robert K.", quote: "Every course was a masterpiece. An unforgettable evening.", avatar: "" }
      ],
      documentation: [],
      faqs: [
        { question: "Do you take reservations?", answer: "Yes, we recommend booking 48 hours in advance for weekends." },
        { question: "Vegetarian options?", answer: "Yes, we have a dedicated vegetarian menu and accommodate vegan/gluten-free diets." },
        { question: "Parking available?", answer: "Private lot with complimentary valet on Friday and Saturday evenings." }
      ],
      inspiration: [],
      program: { title: "", image: "", reason: "", functioning: "", methodology: "", selection: "", cta1: { text: "", link: "" }, cta2: { text: "", link: "" } },
      contact: { email: "reservas@casadelsol.com", phone: "+1 (555) 456-7890", address: "123 Olive Street, Miami, FL", formEnabled: true },
      footer: { text: "2024 Casa del Sol. All rights reserved.", links: [{ label: "Instagram", url: "#" }, { label: "TripAdvisor", url: "#" }, { label: "Google Maps", url: "#" }] }
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/buildit");
    console.log("Connected to MongoDB");

    await BaseTemplate.deleteMany({});
    console.log("Cleared existing templates");

    const created = await BaseTemplate.insertMany(templates);
    console.log(`Seeded ${created.length} templates`);

    created.forEach((t) => {
      console.log(`  - ${t.name} (${t.view})`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
