import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionStack, { type EditorTarget } from "../components/editor/SectionStack";
import SectionEditor from "../components/editor/SectionEditor";
import StyleEditor from "../components/editor/StyleEditor";
import Button from "../components/ui/Button";
import { buttonClass } from "../components/ui/buttonClass";
import Icon from "../components/ui/Icon";
import Segmented from "../components/ui/Segmented";
import { api, ApiError, downloadFile, siteUrl } from "../lib/api";
import { errorKey } from "../lib/errors";
import { sectionName, sectionsOf } from "../lib/templates";
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

const projectBody = (p: Project) => ({ name: p.name, config: p.config, hiddenSections: p.hiddenSections });

type SaveState = "idle" | "pending" | "saving" | "saved" | "error";
type Device = "desktop" | "mobile";

// Dónde empieza cada sección dentro de la web generada (ver backend/src/views)
function sectionAnchor(doc: Document, key: SectionKey): Element | null {
  if (key === "footer") return doc.querySelector("footer");
  return doc.getElementById(key === "faqs" ? "faq" : key);
}

/** Lleva la vista previa a la sección que se está editando. */
function scrollToSection(frame: HTMLIFrameElement | undefined, key: EditorTarget, smooth: boolean) {
  if (!frame || key === "style") return;
  try {
    const win = frame.contentWindow;
    const doc = frame.contentDocument;
    if (!win || !doc) return;
    const target = key === "brand" ? null : sectionAnchor(doc, key);
    if (key !== "brand" && !target) return; // sección oculta: no está en la página
    const top = target ? target.getBoundingClientRect().top + win.scrollY : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    win.scrollTo({ top, behavior: smooth && !reduce ? "smooth" : "auto" });
  } catch {
    // La vista previa es de otro origen (API en otro dominio): no se puede desplazar
  }
}

function SaveStatus({ state }: { state: SaveState }) {
  const { t } = useTranslation();
  const text: Record<SaveState, string> = {
    idle: t("editPage.autosave"),
    pending: t("editPage.unsaved"),
    saving: t("editPage.saving"),
    saved: t("editPage.saved"),
    error: t("editPage.not_saved"),
  };
  // Mismo código que la pila: hueco = por construir, relleno = hecho
  const mark: Record<SaveState, string> = {
    idle: "border border-andamio/60",
    pending: "border border-grafito",
    saving: "bg-azul",
    saved: "bg-verde",
    error: "bg-derribo",
  };
  return (
    <p role="status" className="flex shrink-0 items-center gap-2 text-sm text-andamio">
      <span aria-hidden="true" className={`size-2.5 rounded-[1px] ${mark[state]}`} />
      {text[state]}
    </p>
  );
}

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<EditorTarget>("brand");
  const [device, setDevice] = useState<Device>("desktop");
  const [mobilePane, setMobilePane] = useState<"edit" | "preview">("edit");

  // Vista previa con doble búfer: cada versión guardada carga oculta y sustituye
  // a la anterior cuando termina, así no parpadea mientras se escribe.
  const [version, setVersion] = useState(0);
  const [shownVersion, setShownVersion] = useState(0);
  const frames = useRef(new Map<number, HTMLIFrameElement>());
  const formRef = useRef<HTMLDivElement>(null);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<Project | null>(null);

  useEffect(() => {
    api<Project>(`/api/projects/${id}`)
      .then(setProject)
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Al salir del editor no se pierde lo escrito en los últimos instantes
  useEffect(
    () => () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      const pending = pendingRef.current;
      if (pending) api(`/api/projects/${pending._id}`, { method: "PUT", body: projectBody(pending) }).catch(() => {});
    },
    []
  );

  const save = useCallback(
    async (data: Project) => {
      pendingRef.current = null;
      setSaveState("saving");
      setSaveError("");
      try {
        await api<Project>(`/api/projects/${id}`, { method: "PUT", body: projectBody(data) });
        setSaveState("saved");
        setVersion((v) => v + 1);
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

  const queueSave = (updated: Project, delay: number) => {
    setProject(updated);
    pendingRef.current = updated;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (delay === 0) {
      save(updated);
    } else {
      setSaveState("pending");
      saveTimeoutRef.current = setTimeout(() => save(updated), delay);
    }
  };

  const handleChange = (path: string, value: unknown) => {
    if (project) queueSave(setNestedValue(project, path, value), 800);
  };

  // Ocultar o mostrar una sección en la web generada; se guarda al momento.
  const toggleSection = (key: HideableSection) => {
    if (!project) return;
    const hidden = project.hiddenSections ?? [];
    queueSave(
      { ...project, hiddenSections: hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key] },
      0
    );
  };

  const deleteProject = async () => {
    if (!project || !window.confirm(t("editPage.delete_confirm", { name: project.name }))) return;
    setDeleting(true);
    try {
      pendingRef.current = null;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
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

  const select = (target: EditorTarget) => {
    setSelected(target);
    formRef.current?.scrollTo({ top: 0 });
    scrollToSection(frames.current.get(shownVersion), target, true);
  };

  const onFrameLoad = (v: number) => {
    const frame = frames.current.get(v);
    if (v === shownVersion) {
      scrollToSection(frame, selected, false);
      return;
    }
    if (v !== version) return; // ya hay una versión más nueva en camino
    try {
      const y = frames.current.get(shownVersion)?.contentWindow?.scrollY ?? 0;
      frame?.contentWindow?.scrollTo(0, y);
    } catch {
      // otro origen
    }
    setShownVersion(v);
  };

  if (loading) {
    return <p className="p-6 text-andamio">{t("editPage.loading")}</p>;
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 sm:px-6">
        <h1 className="titular text-3xl">{t("editPage.not_found")}</h1>
        <p className="mt-3 text-andamio">{t("editPage.not_found_hint")}</p>
        <Link to="/projects" className={buttonClass("primary", "md", "mt-8")}>
          {t("editPage.back_to_sites")}
        </Link>
      </main>
    );
  }

  const { config } = project;
  const sections = sectionsOf(project);
  const hidden = new Set<SectionKey>(project.hiddenSections ?? []);
  const current: EditorTarget = selected === "style" || sections.includes(selected) ? selected : (sections[0] ?? "style");
  const frameVersions = version === shownVersion ? [version] : [shownVersion, version];

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-junta bg-papel px-3 py-2 sm:px-4">
        <Link to="/projects" className={buttonClass("quiet", "sm", "pl-1.5")}>
          <Icon name="back" className="size-4" />
          {t("editPage.back")}
        </Link>
        <span aria-hidden="true" className="hidden h-6 w-px bg-junta sm:block" />
        <label htmlFor="project-name" className="sr-only">
          {t("editPage.project_name")}
        </label>
        <input
          id="project-name"
          value={project.name}
          maxLength={120}
          onChange={(e) => handleChange("name", e.target.value)}
          className="titular min-w-0 flex-1 basis-40 rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-xl hover:border-junta focus:border-azul focus:outline-none sm:max-w-sm"
        />
        <SaveStatus state={saveState} />
        <div className="ml-auto flex items-center gap-1">
          <a
            href={`/project/${project.publicId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("quiet", "sm")}
          >
            <Icon name="external" className="size-4" />
            <span className="max-sm:sr-only">{t("editPage.open_site")}</span>
          </a>
          <Button variant="quiet" size="sm" onClick={exportHtml}>
            <Icon name="download" className="size-4" />
            <span className="max-sm:sr-only">{t("editPage.export")}</span>
          </Button>
          <Button variant="danger" size="sm" onClick={deleteProject} disabled={deleting}>
            {deleting ? t("editPage.deleting") : t("editPage.delete")}
          </Button>
        </div>
      </header>

      {saveError && (
        <div role="alert" className="flex shrink-0 items-center gap-3 border-b border-derribo/25 bg-[#fdf1f0] px-4 py-2 text-sm text-derribo">
          <span className="min-w-0 flex-1">{saveError}</span>
          {saveState === "error" && (
            <Button variant="secondary" size="sm" onClick={() => save(project)}>
              {t("editPage.retry")}
            </Button>
          )}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="shrink-0 border-b border-junta bg-papel p-4 lg:w-60 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <SectionStack
            view={project.view}
            sections={sections}
            hidden={hidden}
            selected={current}
            onSelect={select}
            onToggle={toggleSection}
          />
        </aside>

        <div className="flex shrink-0 justify-center border-b border-junta bg-papel p-2 lg:hidden">
          <Segmented
            label={t("editPage.pane")}
            value={mobilePane}
            onChange={setMobilePane}
            options={[
              { value: "edit", label: t("editPage.tab_edit") },
              { value: "preview", label: t("editPage.tab_preview") },
            ]}
          />
        </div>

        <div
          ref={formRef}
          className={`${mobilePane === "edit" ? "block" : "hidden"} min-h-0 flex-1 overflow-y-auto bg-papel lg:block lg:w-[min(30rem,40vw)] lg:flex-none lg:border-r lg:border-junta`}
        >
          <div className="px-5 py-6 sm:px-8">
            <h2 className="titular text-2xl">
              {current === "style" ? t("editPage.style") : sectionName(t, project.view, current)}
            </h2>
            {current === "style" && <p className="mt-1 text-sm text-andamio">{t("editPage.style_hint")}</p>}

            {current !== "style" && current !== "brand" && hidden.has(current) && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-bloque border border-dashed border-andamio/60 px-4 py-3">
                <p className="text-sm">{t("editPage.hidden_notice")}</p>
                <Button variant="secondary" size="sm" onClick={() => toggleSection(current)}>
                  {t("editPage.show")}
                </Button>
              </div>
            )}

            <div className="mt-6">
              {current === "style" ? (
                <StyleEditor theme={config.theme} onChange={handleChange} />
              ) : (
                <SectionEditor key={current} section={current} value={config[current]} onChange={handleChange} />
              )}
            </div>
          </div>
        </div>

        <section
          aria-label={t("editPage.preview_title")}
          className={`${mobilePane === "preview" ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col lg:flex`}
        >
          <div className="hidden items-center gap-3 px-4 py-2.5 lg:flex">
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
          </div>
          <div className="min-h-0 flex-1 lg:px-4 lg:pb-4">
            <div
              className={`relative h-full overflow-hidden bg-papel lg:rounded-lg lg:border lg:border-junta ${
                device === "mobile" ? "lg:mx-auto lg:max-w-[390px]" : ""
              }`}
            >
              {frameVersions.map((v) => (
                <iframe
                  key={v}
                  ref={(el) => {
                    if (!el) return;
                    frames.current.set(v, el);
                    return () => {
                      frames.current.delete(v);
                    };
                  }}
                  src={`${siteUrl(project.publicId, true)}&v=${v}`}
                  title={v === shownVersion ? t("editPage.preview_title") : t("editPage.preview_updating")}
                  aria-hidden={v === shownVersion ? undefined : true}
                  tabIndex={v === shownVersion ? undefined : -1}
                  onLoad={() => onFrameLoad(v)}
                  className={`absolute inset-0 size-full border-0 ${v === shownVersion ? "" : "invisible"}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
