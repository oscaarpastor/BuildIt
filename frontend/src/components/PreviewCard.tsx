import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type PreviewCardProps = {
  id: string;
  name: string;
  createdAt: string;
};

export const PreviewCard: React.FC<PreviewCardProps> = ({
  id,
  name,
  createdAt,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const link = `${window.location.origin}/project/${id}/view`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition flex flex-col justify-between w-full">
      <div className="overflow-hidden rounded-lg mb-4 relative h-[200px] bg-white">
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-10" />
        )}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[166.66%] h-[400px] scale-[0.6] origin-top pointer-events-none transition-opacity duration-500">
          <iframe
            src={`http://localhost:3000/api/projects/${id}/preview?preview=true`}
            className={`w-full h-full border-0 rounded-lg ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            title={`Preview de ${name}`}
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold truncate">{name}</h4>
        <p className="text-sm text-gray-500 mb-3">
          {new Date(createdAt).toLocaleDateString()}
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={`/project/${id}/view`}
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
            ✏️ {t("projects.edit_button", "Editar")}
          </Link>

          <button
            onClick={copyToClipboard}
            className="text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 text-center"
          >
            🔗 {t("projects.share_button", "Compartir")}
          </button>

          {copied && (
            <p className="text-xs text-green-600 text-center">
              ✅ Enlace copiado al portapapeles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
