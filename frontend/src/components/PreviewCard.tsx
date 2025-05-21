import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition flex flex-col justify-between w-full">
      <div className="overflow-hidden rounded-lg mb-4 relative h-[200px] border">
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-10" />
        )}

        <iframe
          src={`http://localhost:3000/api/projects/${id}/preview?preview=true`}
          className={`w-full h-full rounded-lg pointer-events-none transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          title={`Preview de ${name}`}
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </div>

      <div>
        <h4 className="text-lg font-bold truncate">{name}</h4>
        <p className="text-sm text-gray-500 mb-3">
          {new Date(createdAt).toLocaleDateString()}
        </p>

        <a
          href={`http://localhost:3000/api/projects/${id}/preview`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 inline-block text-center w-full"
        >
          {t("projects.view_button")}
        </a>
      </div>
    </div>
  );
};
