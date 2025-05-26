import { useTranslation } from "react-i18next";

type Props = {
  theme: {
    colorPrimary: string;
    colorSecondary: string;
    fontFamily: string;
    darkMode?: boolean;
  };
  onChange: (path: string, value: unknown) => void;
};

const fontOptions = [
  "Arial", "Helvetica", "Georgia", "Times New Roman",
  "Courier New", "Verdana", "Roboto", "Inter",
];

export default function ThemeSection({ theme, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">
         {t("themeselector.title")}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("themeselector.primary_color")}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={theme.colorPrimary}
            onChange={(e) =>
              onChange("config.theme.colorPrimary", e.target.value)
            }
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer shadow-inner"
          />
          <span className="text-sm font-mono text-gray-600">
            {theme.colorPrimary}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("themeselector.secondary_color")}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={theme.colorSecondary}
            onChange={(e) =>
              onChange("config.theme.colorSecondary", e.target.value)
            }
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer shadow-inner"
          />
          <span className="text-sm font-mono text-gray-600">
            {theme.colorSecondary}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("themeselector.font")}
        </label>
        <select
          value={theme.fontFamily}
          onChange={(e) =>
            onChange("config.theme.fontFamily", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
