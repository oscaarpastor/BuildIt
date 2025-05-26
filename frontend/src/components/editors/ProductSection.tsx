import { useTranslation } from "react-i18next";

type Product = {
  title: string;
  description: string;
  price: string;
  image: string;
};

type Props = {
  products: Product[];
  onChange: (path: string, value: unknown) => void;
};

export default function ProductSection({ products, onChange }: Props) {
  const { t } = useTranslation();

  const handleItemChange = (index: number, key: keyof Product, value: string) => {
    const updated = [...products];
    updated[index][key] = value;
    onChange("config.products", updated);
  };

  const addProduct = () => {
    onChange("config.products", [
      ...products,
      { title: "", description: "", price: "", image: "" },
    ]);
  };

  const removeProduct = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    onChange("config.products", updated);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">🛒 {t("productsection.title")}</h2>

      {products.map((product, index) => (
        <div key={index} className="space-y-2 border p-4 rounded bg-gray-50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("productsection.title_label")}
            </label>
            <input
              type="text"
              value={product.title}
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("productsection.title_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("productsection.description")}
            </label>
            <textarea
              value={product.description}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("productsection.description_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("productsection.price")}
            </label>
            <input
              type="text"
              value={product.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("productsection.price_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("productsection.image")}
            </label>
            <input
              type="text"
              value={product.image}
              onChange={(e) => handleItemChange(index, "image", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder={t("productsection.image_placeholder")}
            />
          </div>

          <button
            onClick={() => removeProduct(index)}
            className="text-sm text-red-500 mt-2"
          >
            {t("productsection.remove")}
          </button>
        </div>
      ))}

      <button
        onClick={addProduct}
        className="text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90"
      >
        {t("productsection.add")}
      </button>
    </section>
  );
}
