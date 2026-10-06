import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/layout/AppLayout";
import SiteThumbnail from "../components/SiteThumbnail";
import Button from "../components/ui/Button";
import { buttonClass } from "../components/ui/buttonClass";
import Icon from "../components/ui/Icon";
import { api, templatePreviewUrl } from "../lib/api";
import { errorKey } from "../lib/errors";
import { templateDescription, templateName } from "../lib/templates";
import type { BaseTemplate, Project } from "../types";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewing, setPreviewing] = useState<BaseTemplate | null>(null);
  const [creating, setCreating] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    api<BaseTemplate[]>("/api/base-templates")
      .then(setTemplates)
      .catch((err) => setError(errorKey(err, "newProject.load_error")))
      .finally(() => setLoading(false));
  }, []);

  // <dialog> nativo: atrapa el foco y se cierra con Escape
  useEffect(() => {
    if (previewing) dialogRef.current?.showModal();
  }, [previewing]);

  const createProject = async (tpl: BaseTemplate) => {
    setCreating(tpl._id);
    setError("");
    try {
      const project = await api<Project>("/api/projects", {
        method: "POST",
        body: { templateId: tpl._id, name: templateName(t, tpl) },
      });
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      setError(errorKey(err, "newProject.create_error"));
      setCreating(null);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link to="/projects" className={buttonClass("quiet", "sm", "-ml-3 mb-6 pl-1.5")}>
          <Icon name="back" className="size-4" />
          {t("nav.sites")}
        </Link>
        <h1 className="titular text-3xl">{t("newProject.title")}</h1>
        <p className="mt-3 max-w-xl text-andamio">{t("newProject.subtitle")}</p>

        {error && (
          <p role="alert" className="mt-8 rounded-bloque border border-derribo/30 bg-[#fdf1f0] px-4 py-3 text-sm text-derribo">
            {t(error)}
          </p>
        )}

        {loading ? (
          <p className="mt-10 text-andamio">{t("newProject.loading")}</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl) => {
              const name = templateName(t, tpl);
              return (
                <li key={tpl._id}>
                  <article aria-labelledby={`tpl-${tpl._id}`} className="flex h-full flex-col">
                    <button
                      type="button"
                      onClick={() => setPreviewing(tpl)}
                      aria-label={t("newProject.view_template_named", { name })}
                      className="block overflow-hidden rounded-lg border border-junta bg-papel text-left transition-colors hover:border-grafito"
                    >
                      <SiteThumbnail src={templatePreviewUrl(tpl._id)} title={t("newProject.preview_of", { name })} />
                    </button>
                    <h2 id={`tpl-${tpl._id}`} className="mt-4 text-lg font-semibold">
                      {name}
                    </h2>
                    <p className="mt-1 text-sm text-andamio">{templateDescription(t, tpl)}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <Button size="sm" onClick={() => createProject(tpl)} disabled={creating !== null}>
                        {creating === tpl._id ? t("newProject.creating") : t("newProject.use_template")}
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setPreviewing(tpl)}>
                        {t("newProject.view_template")}
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {previewing && (
        <dialog
          ref={dialogRef}
          aria-label={t("newProject.preview_of", { name: templateName(t, previewing) })}
          onClose={() => setPreviewing(null)}
          className="m-auto h-[90dvh] w-[min(80rem,94vw)] max-w-none overflow-hidden rounded-lg border border-junta bg-papel p-0 backdrop:bg-grafito/70"
        >
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-junta px-4 py-2.5">
              <p className="titular min-w-0 flex-1 truncate text-lg">{templateName(t, previewing)}</p>
              <Button size="sm" onClick={() => createProject(previewing)} disabled={creating !== null}>
                {creating === previewing._id ? t("newProject.creating") : t("newProject.use_template")}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => dialogRef.current?.close()}>
                {t("common.close")}
              </Button>
            </div>
            <iframe
              src={templatePreviewUrl(previewing._id)}
              className="min-h-0 w-full flex-1 border-0"
              title={t("newProject.preview_of", { name: templateName(t, previewing) })}
            />
          </div>
        </dialog>
      )}
    </AppLayout>
  );
}
