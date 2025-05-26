import { useTranslation } from "react-i18next";

type InspirationItem = {
  category: string;
  name: string;
  image: string;
  link: string;
  description: string;
};

type Props = {
  inspiration: InspirationItem[];
  onChange: (path: string, value: unknown) => void;
};

export default function InspirationSection({ inspiration, onChange }: Props) {
  const { t } = useTranslation();

  const updateItem = (index: number, field: keyof InspirationItem, value: string) => {
    const updated = [...inspiration];
    updated[index][field] = value;
    onChange("config.inspiration", updated);
  };

  const addItem = () => {
    onChange("config.inspiration", [
      ...inspiration,
      { category: "", name: "", image: "", link: "", description: "" },
    ]);
  };

  const removeItem = (index: number) => {
    const updated = inspiration.filter((_, i) => i !== index);
    onChange("config.inspiration", updated);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">✨ {t("inspirationsection.title")}</h2>

      {inspiration.map((item, index) => (
        <div key={index} className="space-y-3 border rounded p-4 bg-gray-50 relative">
          <button
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 text-sm text-red-500"
          >
            ✖
          </button>

          <div>
            <label className="block text-sm font-medium mb-1">{t("inspirationsection.category")}</label>
            <input
              type="text"
              value={item.category}
              onChange={(e) => updateItem(index, "category", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("inspirationsection.category_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("inspirationsection.name")}</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("inspirationsection.name_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("inspirationsection.image")}</label>
            <input
              type="text"
              value={item.image}
              onChange={(e) => updateItem(index, "image", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("inspirationsection.image_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("inspirationsection.link")}</label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => updateItem(index, "link", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("inspirationsection.link_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("inspirationsection.description")}</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("inspirationsection.description_placeholder")}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
      >
        ➕ {t("inspirationsection.add")}
      </button>
    </section>
  );
}
