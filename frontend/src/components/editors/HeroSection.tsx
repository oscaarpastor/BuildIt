import { useTranslation } from "react-i18next";

type Props = {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  onChange: (path: string, value: unknown) => void;
};

export default function HeroSection({ hero, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">{t("herosection.title")}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("herosection.main_title")}
        </label>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => onChange("config.hero.title", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("herosection.subtitle")}
        </label>
        <input
          type="text"
          value={hero.subtitle}
          onChange={(e) => onChange("config.hero.subtitle", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("herosection.background")}
        </label>
        <input
          type="text"
          value={hero.backgroundImage}
          onChange={(e) => onChange("config.hero.backgroundImage", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("herosection.cta_text")}
        </label>
        <input
          type="text"
          value={hero.ctaText}
          onChange={(e) => onChange("config.hero.ctaText", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("herosection.cta_link")}
        </label>
        <input
          type="text"
          value={hero.ctaLink}
          onChange={(e) => onChange("config.hero.ctaLink", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </section>
  );
}
