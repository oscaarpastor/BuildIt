import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import ThemeSection from "../components/editors/ThemeSection";
import BrandSection from "../components/editors/BrandSection";
import HeroSection from "../components/editors/HeroSection";
import AboutSection from "../components/editors/AboutSection";
import FeatureSection from "../components/editors/FeatureSection";
import ProductSection from "../components/editors/ProductSection";
import GallerySection from "../components/editors/GallerySection";
import VideoSection from "../components/editors/VideoSection";
import TestimonialsSection from "../components/editors/TestimonialsSection";
import DocumentationSection from "../components/editors/DocumentationSection";
import FaqsSection from "../components/editors/FaqsSection";
import InspirationSection from "../components/editors/InspirationSection";
import ProgramSection from "../components/editors/ProgramSection";
import ContactSection from "../components/editors/ContactSection";
import FooterSection from "../components/editors/FooterSection";

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const newObj: T = JSON.parse(JSON.stringify(obj));
  let current: unknown = newObj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof current === "object" && current !== null && keys[i] in current) {
      current = (current as Record<string, unknown>)[keys[i]];
    } else {
      throw new Error(`Ruta no válida: ${keys.slice(0, i + 1).join(".")}`);
    }
  }
  if (typeof current === "object" && current !== null) {
    (current as Record<string, unknown>)[keys[keys.length - 1]] = value;
  }
  return newObj;
}

type Project = {
  _id: string;
  name: string;
  config: {
    theme: {
      colorPrimary: string;
      colorSecondary: string;
      fontFamily: string;
      darkMode?: boolean;
    };
    brand: {
      name: string;
      logo: string;
    };
    hero: {
      title: string;
      subtitle: string;
      backgroundImage: string;
      ctaText: string;
      ctaLink: string;
    };
    about: {
      heading: string;
      content: string;
      image: string;
    };
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
    products: {
      title: string;
      description: string;
      price: string;
      image: string;
    }[];
    gallery: {
      image: string;
    }[];
    video: {
      url: string;
      thumbnail: string;
    };
    testimonials: {
      name: string;
      quote: string;
      avatar: string;
    }[];
    documentation: {
      title: string;
      url: string;
    }[];
    faqs: {
      question: string;
      answer: string;
    }[];
    inspiration: {
      category: string;
      name: string;
      image: string;
      link: string;
      description: string;
    }[];
    program: {
      title: string;
      image: string;
      reason: string;
      functioning: string;
      methodology: string;
      selection: string;
      cta1: { text: string; link: string };
      cta2: { text: string; link: string };
    };
    contact: {
      email: string;
      phone: string;
      address: string;
      formEnabled: boolean;
    };
    footer: {
      text: string;
      links: { label: string; url: string }[];
    };
  };
};

const SECTION_LABELS: Record<string, string> = {
  theme: "Tema",
  brand: "Marca",
  hero: "Hero",
  about: "Nosotros",
  features: "Caracteristicas",
  products: "Productos",
  gallery: "Galeria",
  video: "Video",
  testimonials: "Testimonios",
  documentation: "Documentacion",
  faqs: "FAQ",
  inspiration: "Inspiracion",
  program: "Programa",
  contact: "Contacto",
  footer: "Footer",
};

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
  const [showSectionToggle, setShowSectionToggle] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`${API_URL}/api/projects/${id}`);
      const data = await res.json();
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshPreview = useCallback(() => {
    setIframeKey(Date.now());
  }, []);

  const handleChange = (path: string, value: unknown) => {
    if (!project) return;

    const updated = setNestedValue(project, path, value);
    setProject(updated);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      autoSave(updated);
    }, 800);
  };

  const autoSave = async (updatedProject: Project) => {
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      refreshPreview();
    } catch (err) {
      console.error(err);
      alert(t("editPage.save_error"));
    }
  };

  const saveChanges = async () => {
    if (!project) return;
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      refreshPreview();
    } catch (err) {
      console.error(err);
      alert(t("editPage.save_error"));
    }
    setSaving(false);
  };

  const deleteProject = async () => {
    if (!window.confirm(t("editPage.delete_confirm"))) return;
    setDeleting(true);
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert(t("editPage.delete_error"));
    }
    setDeleting(false);
  };

  const toggleSection = (key: string) => {
    setHiddenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (loading) return <p className="p-6">{t("editPage.loading")}</p>;
  if (!project) return <p className="p-6">{t("editPage.not_found")}</p>;

  const isEmpty = (section: unknown): boolean => {
    if (section == null) return true;
    if (Array.isArray(section)) return section.length === 0;
    if (typeof section === "object") return Object.values(section).every((val) => val === "" || val == null);
    return false;
  };

  const sectionEntries: [string, unknown][] = [
    ["theme", project.config.theme],
    ["brand", project.config.brand],
    ["hero", project.config.hero],
    ["about", project.config.about],
    ["features", project.config.features],
    ["products", project.config.products],
    ["gallery", project.config.gallery],
    ["video", project.config.video],
    ["testimonials", project.config.testimonials],
    ["documentation", project.config.documentation],
    ["faqs", project.config.faqs],
    ["inspiration", project.config.inspiration],
    ["program", project.config.program],
    ["contact", project.config.contact],
    ["footer", project.config.footer],
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r overflow-y-auto">
        <iframe
          key={iframeKey}
          src={`${API_URL}/api/projects/${id}/preview?preview=true`}
          className="w-full h-full"
          title="Vista previa"
        />
      </div>

      <div className="w-1/2 overflow-y-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">
            {t("editPage.title", { name: project.name })}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/projects")}
              className="text-sm border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              {t("editPage.back")}
            </button>
            <a
              href={`${API_URL}/api/projects/${project._id}/export`}
              className="text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              download
            >
              {t("editPage.export")}
            </a>
            <button
              onClick={deleteProject}
              className="text-sm border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition"
              disabled={deleting}
            >
              {deleting ? t("editPage.deleting") : t("editPage.delete")}
            </button>
          </div>
        </div>

        <div>
          <label className="font-semibold">{t("editPage.project_name")}</label>
          <input
            value={project.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setShowSectionToggle(!showSectionToggle)}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-2"
          >
            {showSectionToggle ? "▼" : "▶"} Mostrar/ocultar secciones
          </button>
          {showSectionToggle && (
            <div className="mt-3 flex flex-wrap gap-2">
              {sectionEntries
                .filter(([, section]) => !isEmpty(section))
                .map(([key]) => (
                  <button
                    key={key}
                    onClick={() => toggleSection(key)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                      hiddenSections.has(key)
                        ? "bg-gray-200 text-gray-500 line-through"
                        : "bg-primary/10 text-primary border border-primary/30"
                    }`}
                  >
                    {SECTION_LABELS[key] || key}
                  </button>
                ))}
            </div>
          )}
        </div>

        {!hiddenSections.has("theme") && !isEmpty(project.config.theme) && (
          <ThemeSection theme={project.config.theme} onChange={handleChange} />
        )}
        {!hiddenSections.has("brand") && !isEmpty(project.config.brand) && (
          <BrandSection brand={project.config.brand} onChange={handleChange} />
        )}
        {!hiddenSections.has("hero") && !isEmpty(project.config.hero) && (
          <HeroSection hero={project.config.hero} onChange={handleChange} />
        )}
        {!hiddenSections.has("about") && !isEmpty(project.config.about) && (
          <AboutSection about={project.config.about} onChange={handleChange} />
        )}
        {!hiddenSections.has("features") && !isEmpty(project.config.features) && (
          <FeatureSection features={project.config.features} onChange={handleChange} />
        )}
        {!hiddenSections.has("products") && !isEmpty(project.config.products) && (
          <ProductSection products={project.config.products} onChange={handleChange} />
        )}
        {!hiddenSections.has("gallery") && !isEmpty(project.config.gallery) && (
          <GallerySection gallery={project.config.gallery} onChange={handleChange} />
        )}
        {!hiddenSections.has("video") && !isEmpty(project.config.video) && (
          <VideoSection video={project.config.video} onChange={handleChange} />
        )}
        {!hiddenSections.has("testimonials") && !isEmpty(project.config.testimonials) && (
          <TestimonialsSection testimonials={project.config.testimonials} onChange={handleChange} />
        )}
        {!hiddenSections.has("documentation") && !isEmpty(project.config.documentation) && (
          <DocumentationSection documentation={project.config.documentation} onChange={handleChange} />
        )}
        {!hiddenSections.has("faqs") && !isEmpty(project.config.faqs) && (
          <FaqsSection faqs={project.config.faqs} onChange={handleChange} />
        )}
        {!hiddenSections.has("inspiration") && !isEmpty(project.config.inspiration) && (
          <InspirationSection inspiration={project.config.inspiration} onChange={handleChange} />
        )}
        {!hiddenSections.has("program") && !isEmpty(project.config.program) && (
          <ProgramSection program={project.config.program} onChange={handleChange} />
        )}
        {!hiddenSections.has("contact") && !isEmpty(project.config.contact) && (
          <ContactSection contact={project.config.contact} onChange={handleChange} />
        )}
        {!hiddenSections.has("footer") && !isEmpty(project.config.footer) && (
          <FooterSection footer={project.config.footer} onChange={handleChange} />
        )}

        <button
          onClick={saveChanges}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
          disabled={saving}
        >
          {saving ? t("editPage.saving") : t("editPage.save")}
        </button>
      </div>
    </div>
  );
}
