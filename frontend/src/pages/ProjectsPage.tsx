import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/useAuth";
import { PreviewCard } from "../components/PreviewCard";
import { api } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { BaseTemplate, ProjectSummary } from "../types";

export default function ProjectsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api<ProjectSummary[]>("/api/projects");
        setProjects(data);
        if (data.length === 0) setTemplates(await api<BaseTemplate[]>("/api/base-templates"));
      } catch (err) {
        setError(errorKey(err, "projects.load_error"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t("projects.greeting", { name: user?.name })}</h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/projects/new")}
            className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow"
          >
            + {t("projects.create_button")}
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg bg-white hover:bg-primary/10 shadow-sm transition-all duration-200"
          >
            {t("projects.settings_button")}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
          {t(error)}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">{t("common.loading")}</p>
      ) : !error && projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold mb-3">{t("projects.empty_title")}</h3>
            <p className="text-gray-500 mb-8">{t("projects.empty_description")}</p>
            <button
              onClick={() => navigate("/projects/new")}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/90 transition shadow-lg"
            >
              + {t("projects.empty_cta")}
            </button>

            {templates.length > 0 && (
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-4 text-left">{t("projects.available_templates")}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {templates.map((tpl) => (
                    <button
                      key={tpl._id}
                      onClick={() => navigate("/projects/new")}
                      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition text-left group"
                    >
                      <div
                        className="h-24 flex items-center justify-center text-white bg-gray-400"
                        style={tpl.gradient ? { background: tpl.gradient } : undefined}
                      >
                        <span className="text-3xl">{tpl.icon}</span>
                      </div>
                      <div className="p-3 bg-white">
                        <p className="font-semibold text-sm truncate group-hover:text-primary transition">{tpl.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-3">{t("projects.your_projects")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <PreviewCard
                key={project._id}
                id={project._id}
                publicId={project.publicId}
                name={project.name}
                createdAt={project.createdAt}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
