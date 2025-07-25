import { useEffect, useState } from "react";
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
      cta1: {
        text: string;
        link: string;
      };
      cta2: {
        text: string;
        link: string;
      };
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

  const handleChange = (path: string, value: unknown) => {
    if (!project) return;

    const updated = setNestedValue(project, path, value);
    setProject(updated);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      autoSave(updated);
    }, 1000);
  };

  const autoSave = async (updatedProject: Project) => {
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      setIframeKey(Date.now());
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
      setIframeKey(Date.now());
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

  if (loading) return <p className="p-6">{t("editPage.loading")}</p>;
  if (!project) return <p className="p-6">{t("editPage.not_found")}</p>;

  const isEmpty = (section: unknown): boolean => {
    if (section == null) return true;

    if (Array.isArray(section)) {
      return section.length === 0;
    }

    if (typeof section === "object") {
      return Object.values(section).every((val) => val === "" || val == null);
    }

    return false;
  };

  return (
    <div className="flex h-screen">
      {/* Preview en tiempo real */}
      <div className="w-1/2 border-r overflow-y-auto">
        <iframe
          key={iframeKey}
          src={`${API_URL}/api/projects/${id}/preview?preview=true`}
          className="w-full h-full"
          title="Vista previa"
        />
      </div>

      {/* Formulario */}
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

        {/* SECCIONES */}

        {!isEmpty(project.config.theme) && (
          <ThemeSection theme={project.config.theme} onChange={handleChange} />
        )}
        {!isEmpty(project.config.brand) && (
          <BrandSection brand={project.config.brand} onChange={handleChange} />
        )}
        {!isEmpty(project.config.hero) && (
          <HeroSection hero={project.config.hero} onChange={handleChange} />
        )}
        {!isEmpty(project.config.about) && (
          <AboutSection about={project.config.about} onChange={handleChange} />
        )}
        {!isEmpty(project.config.features) && (
          <FeatureSection
            features={project.config.features}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.products) && (
          <ProductSection
            products={project.config.products}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.gallery) && (
          <GallerySection
            gallery={project.config.gallery}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.video) && (
          <VideoSection video={project.config.video} onChange={handleChange} />
        )}
        {!isEmpty(project.config.testimonials) && (
          <TestimonialsSection
            testimonials={project.config.testimonials}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.documentation) && (
          <DocumentationSection
            documentation={project.config.documentation}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.faqs) && (
          <FaqsSection faqs={project.config.faqs} onChange={handleChange} />
        )}
        {!isEmpty(project.config.inspiration) && (
          <InspirationSection
            inspiration={project.config.inspiration}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.program) && (
          <ProgramSection
            program={project.config.program}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.contact) && (
          <ContactSection
            contact={project.config.contact}
            onChange={handleChange}
          />
        )}
        {!isEmpty(project.config.footer) && (
          <FooterSection
            footer={project.config.footer}
            onChange={handleChange}
          />
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
