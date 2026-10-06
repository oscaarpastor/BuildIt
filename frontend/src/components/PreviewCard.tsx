import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SiteThumbnail from "./SiteThumbnail";
import { buttonClass } from "./ui/buttonClass";
import Icon from "./ui/Icon";
import { shareUrl, siteUrl } from "../lib/api";
import type { ProjectStats } from "../types";

type PreviewCardProps = {
  id: string;
  publicId: string;
  name: string;
  updatedAt: string;
  stats: ProjectStats;
};

/** Una web de la lista: miniatura real, cifras y acciones. */
export function PreviewCard({ id, publicId, name, updatedAt, stats }: PreviewCardProps) {
  const { t, i18n } = useTranslation();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const date = (value: string) => new Date(value).toLocaleDateString(i18n.language, { dateStyle: "medium" });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(publicId));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 2500);
  };

  return (
    <article className="flex flex-col">
      <Link
        to={`/projects/${id}/edit`}
        aria-label={t("projects.edit_named", { name })}
        className="block overflow-hidden rounded-lg border border-junta bg-papel transition-colors hover:border-grafito"
      >
        <SiteThumbnail src={siteUrl(publicId, true)} title={t("projects.preview_of", { name })} />
      </Link>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h2 className="truncate text-lg font-semibold">{name}</h2>
        <p className="shrink-0 text-xs text-andamio">{t("projects.updated", { date: date(updatedAt) })}</p>
      </div>

      <div data-testid="project-stats" className="mt-1 flex flex-wrap gap-x-4 text-sm text-andamio">
        <span>
          <strong className="font-semibold text-grafito">{stats.views}</strong>{" "}
          {t("projects.views_word", { count: stats.views })}
        </span>
        <span>
          <strong className="font-semibold text-grafito">{stats.clicks}</strong>{" "}
          {t("projects.clicks_word", { count: stats.clicks })}
        </span>
        {stats.lastAccess && <span>{t("projects.last_visit", { date: date(stats.lastAccess) })}</span>}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to={`/projects/${id}/edit`} className={buttonClass("primary", "sm")}>
          {t("projects.edit_button")}
        </Link>
        <a href={`/project/${publicId}/view`} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "sm")}>
          {t("projects.view_button")}
        </a>
        <button type="button" onClick={copyToClipboard} className={buttonClass("quiet", "sm")}>
          <Icon name="link" className="size-4" />
          {t("projects.share_button")}
        </button>
        <span role="status" className={`text-xs ${copyState === "error" ? "text-derribo" : "text-verde"}`}>
          {copyState !== "idle" && t(copyState === "copied" ? "projects.link_copied" : "projects.link_copy_error")}
        </span>
      </div>
    </article>
  );
}
