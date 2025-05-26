import { useTranslation } from "react-i18next";

type GalleryItem = { image: string };

type Props = {
  gallery: GalleryItem[];
  onChange: (path: string, value: unknown) => void;
};

export default function GallerySection({ gallery, onChange }: Props) {
  const { t } = useTranslation();

  const handleItemChange = (index: number, value: string) => {
    const updated = [...gallery];
    updated[index].image = value;
    onChange("config.gallery", updated);
  };

  const addImage = () => {
    onChange("config.gallery", [...gallery, { image: "" }]);
  };

  const removeImage = (index: number) => {
    const updated = [...gallery];
    updated.splice(index, 1);
    onChange("config.gallery", updated);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">🖼 {t("gallerysection.title")}</h2>

      {gallery.map((item, index) => (
        <div key={index} className="space-y-2 border p-4 rounded bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("gallerysection.image_label")}
          </label>
          <input
            type="text"
            value={item.image}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={t("gallerysection.image_placeholder")}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={() => removeImage(index)}
            className="text-sm text-red-500"
          >
            {t("gallerysection.remove")}
          </button>
        </div>
      ))}

      <button
        onClick={addImage}
        className="text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90"
      >
        {t("gallerysection.add")}
      </button>
    </section>
  );
}
