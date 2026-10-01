import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, templatePreviewUrl } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { BaseTemplate, Project } from "../types";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);

  useEffect(() => {
    api<BaseTemplate[]>("/api/base-templates")
      .then(setTemplates)
      .catch((err) => setError(errorKey(err, "newProject.load_error")))
      .finally(() => setLoading(false));
  }, []);

  const createProject = async (tpl: BaseTemplate) => {
    setCreating(tpl._id);
    setError("");
    try {
      const project = await api<Project>("/api/projects", {
        method: "POST",
        body: { templateId: tpl._id, name: tpl.name },
      });
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      setError(errorKey(err, "newProject.create_error"));
      setCreating(null);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/projects")}
        className="mb-4 text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        &larr; {t("common.back")}
      </button>

      <h1 className="text-2xl font-bold mb-2">{t("newProject.title")}</h1>
      <p className="text-gray-500 mb-6">{t("newProject.subtitle")}</p>

      {error && (
        <p role="alert" className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
          {t(error)}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">{t("newProject.loading")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="border rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col bg-white"
            >
              <div
                className="rounded-xl mb-4 relative h-[200px] overflow-hidden flex flex-col items-center justify-center p-6 text-white bg-gray-400"
                style={tpl.gradient ? { background: tpl.gradient } : undefined}
              >
                <span className="text-5xl mb-3">{tpl.icon}</span>
                <span className="font-bold text-lg text-center drop-shadow">{tpl.name}</span>
              </div>

              <h3 className="text-lg font-semibold mb-1">{tpl.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{tpl.description}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => setPreviewTemplateId(tpl._id)}
                  className="bg-white border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 text-sm font-medium"
                >
                  {t("newProject.view_template")}
                </button>
                <button
                  onClick={() => createProject(tpl)}
                  disabled={creating !== null}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 text-sm font-medium disabled:opacity-50"
                >
                  {creating === tpl._id ? t("newProject.creating") : t("newProject.use_template")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewTemplateId && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("newProject.preview_title")}
        >
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src={templatePreviewUrl(previewTemplateId)}
              className="w-full h-full border-0"
              title={t("newProject.preview_title")}
            />
            <button
              onClick={() => setPreviewTemplateId(null)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 font-medium"
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
