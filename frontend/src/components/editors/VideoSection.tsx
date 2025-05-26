import { useTranslation } from "react-i18next";

type Props = {
  video: {
    url: string;
    thumbnail: string;
  };
  onChange: (path: string, value: unknown) => void;
};

export default function VideoSection({ video, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">🎥 {t("videosection.title")}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("videosection.url")}
        </label>
        <input
          type="text"
          value={video.url}
          onChange={(e) => onChange("config.video.url", e.target.value)}
          placeholder={t("videosection.url_placeholder")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("videosection.thumbnail")}
        </label>
        <input
          type="text"
          value={video.thumbnail}
          onChange={(e) => onChange("config.video.thumbnail", e.target.value)}
          placeholder={t("videosection.thumbnail_placeholder")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </section>
  );
}
