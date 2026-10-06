import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/layout/AppLayout";
import { PreviewCard } from "../components/PreviewCard";
import { buttonClass } from "../components/ui/buttonClass";
import Icon from "../components/ui/Icon";
import { api } from "../lib/api";
import { errorKey } from "../lib/errors";
import type { ProjectSummary } from "../types";

export default function ProjectsPage() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<ProjectSummary[]>("/api/projects")
      .then(setProjects)
      .catch((err) => setError(errorKey(err, "projects.load_error")))
      .finally(() => setLoading(false));
  }, []);

  const isEmpty = !loading && !error && projects.length === 0;

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="titular text-3xl">{t("projects.title")}</h1>
          {!isEmpty && !loading && (
            <Link to="/projects/new" className={buttonClass("primary")}>
              <Icon name="plus" className="size-4" />
              {t("projects.create_button")}
            </Link>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-8 rounded-bloque border border-derribo/30 bg-[#fdf1f0] px-4 py-3 text-sm text-derribo">
            {t(error)}
          </p>
        )}

        {loading && <p className="mt-8 text-andamio">{t("common.loading")}</p>}

        {isEmpty && (
          // Solar vacío: el hueco discontinuo de la pila, donde irá la primera web
          <section className="mt-10 grid gap-8 rounded-lg border border-dashed border-andamio/50 px-6 py-12 sm:px-12 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-lg">
              <h2 className="titular text-2xl">{t("projects.empty_title")}</h2>
              <p className="mt-3 text-andamio">{t("projects.empty_description")}</p>
              <Link to="/projects/new" className={buttonClass("primary", "lg", "mt-8")}>
                {t("projects.empty_cta")}
              </Link>
            </div>
            <div aria-hidden="true" className="hidden w-48 flex-col gap-[3px] md:flex">
              <span className="h-5 rounded-bloque border border-dashed border-andamio/50" />
              <span className="h-14 rounded-bloque border border-dashed border-andamio/50" />
              <span className="h-9 rounded-bloque border border-dashed border-andamio/50" />
              <span className="h-4 rounded-bloque border border-dashed border-andamio/50" />
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <PreviewCard
                key={project._id}
                id={project._id}
                publicId={project.publicId}
                name={project.name}
                updatedAt={project.updatedAt}
                stats={project.stats}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
