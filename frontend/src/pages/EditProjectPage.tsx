import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { api, ApiError, downloadFile, siteUrl } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { HideableSection, Project, SectionKey } from "../types";

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

const HIDEABLE_SECTIONS: HideableSection[] = [
  "hero",
  "about",
  "features",
  "products",
  "gallery",
  "video",
  "testimonials",
  "documentation",
  "faqs",
  "inspiration",
  "program",
  "contact",
  "footer",
];

// Vacía = sin texto en ningún campo, también en objetos anidados (p. ej. program.cta1).
const isEmpty = (section: unknown): boolean => {
  if (section == null || section === "") return true;
  if (Array.isArray(section)) return section.length === 0;
  if (typeof section === "object") return Object.values(section).every(isEmpty);
  return false;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [showSectionToggle, setShowSectionToggle] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api<Project>(`/api/projects/${id}`)
      .then(setProject)
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => () => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
  }, []);

  const save = useCallback(
    async (data: Project) => {
      setSaveState("saving");
      setSaveError("");
      try {
        await api<Project>(`/api/projects/${id}`, {
          method: "PUT",
          body: { name: data.name, config: data.config, hiddenSections: data.hiddenSections },
        });
        setSaveState("saved");
        setIframeKey(Date.now());
      } catch (err) {
        setSaveState("error");
        if (err instanceof ApiError && err.status === 400 && err.errors?.length) {
          const first = err.errors[0];
          setSaveError(t("editPage.invalid_field", { field: first.path, message: first.message }));
        } else {
          setSaveError(t(errorKey(err, "editPage.save_error")));
        }
      }
    },
    [id, t]
  );

  const handleChange = (path: string, value: unknown) => {
    if (!project) return;
    const updated = setNestedValue(project, path, value);
    setProject(updated);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => save(updated), 800);
  };

  const saveNow = () => {
    if (!project) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    save(project);
  };

  const deleteProject = async () => {
    if (!window.confirm(t("editPage.delete_confirm"))) return;
    setDeleting(true);
    try {
      await api(`/api/projects/${id}`, { method: "DELETE" });
      navigate("/projects");
    } catch (err) {
      setSaveError(t(errorKey(err, "editPage.delete_error")));
      setDeleting(false);
    }
  };

  const exportHtml = async () => {
    if (!project) return;
    try {
      await downloadFile(`/api/projects/${project._id}/export`, `${project.name}.html`);
    } catch (err) {
      setSaveError(t(errorKey(err, "editPage.export_error")));
    }
  };

  // Ocultar o mostrar una sección en la web generada; se guarda al momento.
  const toggleSection = (key: HideableSection) => {
    if (!project) return;
    const hidden = project.hiddenSections ?? [];
    const updated: Project = {
      ...project,
      hiddenSections: hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key],
    };
    setProject(updated);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    save(updated);
  };

  if (loading) return <p className="p-6">{t("editPage.loading")}</p>;
  if (!project) {
    return (
      <div className="p-6 space-y-4">
        <p>{t("editPage.not_found")}</p>
        <button onClick={() => navigate("/projects")} className="text-sm text-primary hover:underline">
          ← {t("editPage.back")}
        </button>
      </div>
    );
  }

  const { config } = project;
  const hiddenSections = new Set<SectionKey>(project.hiddenSections ?? []);
  const visible = (key: SectionKey) => !hiddenSections.has(key) && !isEmpty(config[key]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r overflow-y-auto">
        <iframe
          key={iframeKey}
          src={siteUrl(project.publicId, true)}
          className="w-full h-full"
          title={t("editPage.preview_title")}
        />
      </div>

      <div className="w-1/2 overflow-y-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-2 gap-2">
          <h1 className="text-xl font-bold">{t("editPage.title", { name: project.name })}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/projects")}
              className="text-sm border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              {t("editPage.back")}
            </button>
            <button
              onClick={exportHtml}
              className="text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
            >
              {t("editPage.export")}
            </button>
            <button
              onClick={deleteProject}
              className="text-sm border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition"
              disabled={deleting}
            >
              {deleting ? t("editPage.deleting") : t("editPage.delete")}
            </button>
          </div>
        </div>

        <p role="status" className="text-xs text-gray-500 min-h-4">
          {saveState === "saving" && t("editPage.saving")}
          {saveState === "saved" && t("editPage.saved")}
        </p>
        {saveError && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
            {saveError}
          </p>
        )}

        <div>
          <label htmlFor="project-name" className="font-semibold">
            {t("editPage.project_name")}
          </label>
          <input
            id="project-name"
            value={project.name}
            maxLength={120}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setShowSectionToggle(!showSectionToggle)}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-2"
            aria-expanded={showSectionToggle}
          >
            {showSectionToggle ? "▼" : "▶"} {t("editPage.toggle_sections")}
          </button>
          {showSectionToggle && (
            <>
            <p className="mt-2 text-xs text-gray-500">{t("editPage.hidden_hint")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HIDEABLE_SECTIONS.filter((key) => !isEmpty(config[key])).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleSection(key)}
                  aria-pressed={!hiddenSections.has(key)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                    hiddenSections.has(key)
                      ? "bg-gray-200 text-gray-500 line-through"
                      : "bg-primary/10 text-primary border border-primary/30"
                  }`}
                >
                  {t(`editPage.sections.${key}`)}
                </button>
              ))}
            </div>
            </>
          )}
        </div>

        <ThemeSection theme={config.theme} onChange={handleChange} />
        {visible("brand") && <BrandSection brand={config.brand} onChange={handleChange} />}
        {visible("hero") && <HeroSection hero={config.hero} onChange={handleChange} />}
        {visible("about") && <AboutSection about={config.about} onChange={handleChange} />}
        {visible("features") && <FeatureSection features={config.features} onChange={handleChange} />}
        {visible("products") && <ProductSection products={config.products} onChange={handleChange} />}
        {visible("gallery") && <GallerySection gallery={config.gallery} onChange={handleChange} />}
        {visible("video") && <VideoSection video={config.video} onChange={handleChange} />}
        {visible("testimonials") && (
          <TestimonialsSection testimonials={config.testimonials} onChange={handleChange} />
        )}
        {visible("documentation") && (
          <DocumentationSection documentation={config.documentation} onChange={handleChange} />
        )}
        {visible("faqs") && <FaqsSection faqs={config.faqs} onChange={handleChange} />}
        {visible("inspiration") && <InspirationSection inspiration={config.inspiration} onChange={handleChange} />}
        {visible("program") && <ProgramSection program={config.program} onChange={handleChange} />}
        {visible("contact") && <ContactSection contact={config.contact} onChange={handleChange} />}
        {visible("footer") && <FooterSection footer={config.footer} onChange={handleChange} />}

        <button
          onClick={saveNow}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
          disabled={saveState === "saving"}
        >
          {saveState === "saving" ? t("editPage.saving") : t("editPage.save")}
        </button>
      </div>
    </div>
  );
}
