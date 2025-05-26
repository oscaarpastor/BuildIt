import { useTranslation } from "react-i18next";

type Props = {
  about: {
    heading: string;
    content: string;
    image: string;
  };
  onChange: (path: string, value: unknown) => void;
};

export default function AboutSection({ about, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">ℹ️ {t("aboutsection.title")}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("aboutsection.heading")}
        </label>
        <input
          type="text"
          value={about.heading}
          onChange={(e) => onChange("config.about.heading", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("aboutsection.content")}
        </label>
        <textarea
          value={about.content}
          onChange={(e) => onChange("config.about.content", e.target.value)}
          className="w-full border px-3 py-2 rounded min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("aboutsection.image")}
        </label>
        <input
          type="text"
          value={about.image}
          onChange={(e) => onChange("config.about.image", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </section>
  );
}
