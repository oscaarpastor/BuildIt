import { useTranslation } from "react-i18next";

type DocumentationItem = {
  title: string;
  url: string;
};

type Props = {
  documentation: DocumentationItem[];
  onChange: (path: string, value: unknown) => void;
};

export default function DocumentationSection({ documentation, onChange }: Props) {
  const { t } = useTranslation();

  const updateDoc = (index: number, field: keyof DocumentationItem, value: string) => {
    const newList = [...documentation];
    newList[index][field] = value;
    onChange("config.documentation", newList);
  };

  const addDoc = () => {
    const newList = [...documentation, { title: "", url: "" }];
    onChange("config.documentation", newList);
  };

  const removeDoc = (index: number) => {
    const newList = [...documentation];
    newList.splice(index, 1);
    onChange("config.documentation", newList);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">📄 {t("documentationsection.title")}</h2>

      {documentation.map((doc, index) => (
        <div key={index} className="space-y-3 border rounded p-4 bg-gray-50 relative">
          <button
            type="button"
            onClick={() => removeDoc(index)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            ✖
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("documentationsection.doc_title")}
            </label>
            <input
              type="text"
              value={doc.title}
              onChange={(e) => updateDoc(index, "title", e.target.value)}
              placeholder={t("documentationsection.doc_title_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("documentationsection.doc_url")}
            </label>
            <input
              type="text"
              value={doc.url}
              onChange={(e) => updateDoc(index, "url", e.target.value)}
              placeholder={t("documentationsection.doc_url_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addDoc}
        className="text-sm text-primary font-medium border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        ➕ {t("documentationsection.add_button")}
      </button>
    </section>
  );
}
