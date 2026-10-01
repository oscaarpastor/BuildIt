import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { shareUrl, siteUrl } from "../lib/api";
import type { ProjectStats } from "../types";

type PreviewCardProps = {
  id: string;
  publicId: string;
  name: string;
  createdAt: string;
  stats: ProjectStats;
};

export function PreviewCard({ id, publicId, name, createdAt, stats }: PreviewCardProps) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(publicId));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition flex flex-col justify-between w-full">
      <div className="overflow-hidden rounded-lg mb-4 relative h-[200px] bg-white">
        {loading && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-10" />}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[166.66%] h-[400px] scale-[0.6] origin-top pointer-events-none transition-opacity duration-500">
          <iframe
            src={siteUrl(publicId, true)}
            className={`w-full h-full border-0 rounded-lg transition-opacity duration-500 ease-in-out ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            title={t("projects.preview_of", { name })}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold truncate">{name}</h4>
        <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString(i18n.language)}</p>

        <div className="text-xs text-gray-600 mt-2 mb-3" data-testid="project-stats">
          <span>👁 {t("projects.views", { count: stats.views })}</span>
          <span className="mx-2">·</span>
          <span>🖱 {t("projects.clicks", { count: stats.clicks })}</span>
          <p className="text-gray-400 mt-1">
            {stats.lastAccess
              ? t("projects.last_visit", { date: new Date(stats.lastAccess).toLocaleString(i18n.language) })
              : t("projects.no_visits")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`/project/${publicId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 text-center"
          >
            {t("projects.view_button")}
          </a>

          <Link
            to={`/projects/${id}/edit`}
            className="text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 text-center"
          >
            ✏️ {t("projects.edit_button")}
          </Link>

          <button
            onClick={copyToClipboard}
            className="text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 text-center"
          >
            🔗 {t("projects.share_button")}
          </button>

          {copyState !== "idle" && (
            <p role="status" className={`text-xs text-center ${copyState === "copied" ? "text-green-600" : "text-red-600"}`}>
              {t(copyState === "copied" ? "projects.link_copied" : "projects.link_copy_error")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
