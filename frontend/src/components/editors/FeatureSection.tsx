import { useTranslation } from "react-i18next";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  features: Feature[];
  onChange: (path: string, value: unknown) => void;
};

export default function FeatureSection({ features, onChange }: Props) {
  const { t } = useTranslation();

  const handleItemChange = (index: number, key: keyof Feature, value: string) => {
    const updated = [...features];
    updated[index][key] = value;
    onChange("config.features", updated);
  };

  const addFeature = () => {
    onChange("config.features", [
      ...features,
      { icon: "", title: "", description: "" },
    ]);
  };

  const removeFeature = (index: number) => {
    const updated = [...features];
    updated.splice(index, 1);
    onChange("config.features", updated);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">⚙️ {t("featuresection.title")}</h2>

      {features.map((feature, index) => (
        <div key={index} className="space-y-2 border p-4 rounded bg-gray-50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("featuresection.icon")}
            </label>
            <input
              type="text"
              value={feature.icon}
              onChange={(e) => handleItemChange(index, "icon", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("featuresection.icon_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("featuresection.title")}
            </label>
            <input
              type="text"
              value={feature.title}
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("featuresection.title_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("featuresection.description")}
            </label>
            <textarea
              value={feature.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
              placeholder={t("featuresection.description_placeholder")}
            />
          </div>

          <button
            onClick={() => removeFeature(index)}
            className="text-sm text-red-500 mt-2"
          >
            {t("featuresection.remove")}
          </button>
        </div>
      ))}

      <button
        onClick={addFeature}
        className="text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90"
      >
        {t("featuresection.add")}
      </button>
    </section>
  );
}
