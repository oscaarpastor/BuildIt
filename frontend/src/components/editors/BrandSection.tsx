import { useTranslation } from "react-i18next";

type Props = {
  brand: {
    name: string;
    logo: string;
  };
  onChange: (path: string, value: unknown) => void;
};

export default function BrandSection({ brand, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">
        {t("brandsection.title")}
      </h2>

      {/* Nombre de marca */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("brandsection.name")}
        </label>
        <input
          type="text"
          value={brand.name}
          onChange={(e) => onChange("config.brand.name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder={t("brandsection.name_placeholder")}
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("brandsection.logo")}
        </label>
        <input
          type="url"
          value={brand.logo}
          onChange={(e) => onChange("config.brand.logo", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder={t("brandsection.logo_placeholder")}
        />
      </div>
    </section>
  );
}
