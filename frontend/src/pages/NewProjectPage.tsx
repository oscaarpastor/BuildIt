import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/layout/AppLayout";
import SiteThumbnail from "../components/SiteThumbnail";
import Button from "../components/ui/Button";
import { buttonClass } from "../components/ui/buttonClass";
import Icon from "../components/ui/Icon";
import Segmented from "../components/ui/Segmented";
import { api, templatePreviewUrl } from "../lib/api";
import { errorKey } from "../lib/errors";
import { TEMPLATE_CATEGORIES, templateDescription, templateName } from "../lib/templates";
import { useFrameScale, useMediaQuery } from "../lib/useFrameScale";
import type { BaseTemplate, Project, TemplateCategory } from "../types";

type Filter = TemplateCategory | "all";
type Device = "desktop" | "mobile";

/** Vista previa a tamaño real de una plantilla, en escritorio (reducida al hueco) o en móvil. */
function TemplatePreview({ tpl, device, title }: { tpl: BaseTemplate; device: Device; title: string }) {
  const { ref, style } = useFrameScale(device === "desktop");
  return (
    <div className="min-h-0 flex-1 bg-yeso p-0 sm:p-4">
      <div
        ref={ref}
        className={`relative h-full overflow-hidden bg-papel sm:rounded-lg sm:border sm:border-junta ${
          device === "mobile" ? "mx-auto max-w-[390px]" : ""
        }`}
      >
        <iframe src={templatePreviewUrl(tpl._id)} title={title} style={style} className="absolute top-0 left-0 border-0" />
      </div>
    </div>
  );
}

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [previewing, setPreviewing] = useState<BaseTemplate | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [creating, setCreating] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // En pantallas estrechas la vista previa siempre es la de móvil
  const roomy = useMediaQuery("(min-width: 640px)");
  const previewDevice: Device = roomy ? device : "mobile";

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
        body: { templateId: tpl._id, name: templateName(lang, tpl) },
      });
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      setError(errorKey(err, "newProject.create_error"));
      setCreating(null);
      dialogRef.current?.close();
    }
  };

  const counts = new Map<Filter, number>([["all", templates.length]]);
  for (const tpl of templates) counts.set(tpl.category, (counts.get(tpl.category) ?? 0) + 1);
  const categories = TEMPLATE_CATEGORIES.filter((c) => counts.has(c));
  const visible = filter === "all" ? templates : templates.filter((tpl) => tpl.category === filter);

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link to="/projects" className={buttonClass("quiet", "sm", "-ml-3 mb-6 pl-1.5")}>
          <Icon name="back" className="size-4" />
          {t("nav.sites")}
        </Link>
        <h1 className="titular text-3xl">{t("newProject.title")}</h1>
        <p className="mt-3 max-w-xl text-andamio">{t("newProject.subtitle", { count: templates.length || 17 })}</p>

        {error && (
          <p role="alert" className="mt-8 rounded-bloque border border-derribo/30 bg-[#fdf1f0] px-4 py-3 text-sm text-derribo">
            {t(error)}
          </p>
        )}

        {loading ? (
          <p className="mt-10 text-andamio">{t("newProject.loading")}</p>
        ) : (
          <>
            {categories.length > 1 && (
              <div
                role="group"
                aria-label={t("newProject.filter_label")}
                className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              >
                {(["all", ...categories] as Filter[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={filter === option}
                    onClick={() => setFilter(option)}
                    className="flex h-9 shrink-0 items-center gap-2 rounded-bloque border border-junta bg-papel px-3 text-sm font-semibold whitespace-nowrap text-grafito transition-colors hover:border-grafito aria-pressed:border-grafito aria-pressed:bg-grafito aria-pressed:text-white"
                  >
                    {option === "all" ? t("newProject.all") : t(`templateCategories.${option}`)}
                    <span className="text-xs font-medium opacity-70">{counts.get(option)}</span>
                  </button>
                ))}
              </div>
            )}

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tpl) => {
                const name = templateName(lang, tpl);
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
                      <div className="mt-4 flex items-baseline justify-between gap-3">
                        <h2 id={`tpl-${tpl._id}`} className="text-lg font-semibold">
                          {name}
                        </h2>
                        <p className="shrink-0 text-xs text-andamio">{t(`templateCategories.${tpl.category}`)}</p>
                      </div>
                      <p className="mt-1 text-sm text-andamio">{templateDescription(lang, tpl)}</p>
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
          </>
        )}
      </div>

      {previewing && (
        <dialog
          ref={dialogRef}
          aria-label={t("newProject.preview_of", { name: templateName(lang, previewing) })}
          onClose={() => setPreviewing(null)}
          className="m-auto h-[92dvh] w-[min(84rem,96vw)] max-w-none overflow-hidden rounded-lg border border-junta bg-papel p-0 backdrop:bg-grafito/70"
        >
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-junta px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="titular truncate text-lg">{templateName(lang, previewing)}</p>
                <p className="truncate text-xs text-andamio">{t(`templateCategories.${previewing.category}`)}</p>
              </div>
              {roomy && (
                <Segmented
                  label={t("editPage.device")}
                  value={device}
                  onChange={setDevice}
                  options={[
                    {
                      value: "desktop",
                      label: (
                        <>
                          <Icon name="desktop" className="size-4" />
                          {t("editPage.device_desktop")}
                        </>
                      ),
                    },
                    {
                      value: "mobile",
                      label: (
                        <>
                          <Icon name="phone" className="size-4" />
                          {t("editPage.device_mobile")}
                        </>
                      ),
                    },
                  ]}
                />
              )}
              <Button size="sm" onClick={() => createProject(previewing)} disabled={creating !== null}>
                {creating === previewing._id ? t("newProject.creating") : t("newProject.use_template")}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => dialogRef.current?.close()}>
                {t("common.close")}
              </Button>
            </div>
            <TemplatePreview
              key={`${previewing._id}-${previewDevice}`}
              tpl={previewing}
              device={previewDevice}
              title={t("newProject.preview_of", { name: templateName(lang, previewing) })}
            />
          </div>
        </dialog>
      )}
    </AppLayout>
  );
}
