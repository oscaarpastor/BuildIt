import { useTranslation } from "react-i18next";

type FooterLink = {
  label: string;
  url: string;
};

type Props = {
  footer: {
    text: string;
    links: FooterLink[];
  };
  onChange: (path: string, value: unknown) => void;
};

export default function FooterSection({ footer, onChange }: Props) {
  const { t } = useTranslation();

  const updateLink = (index: number, field: keyof FooterLink, value: string) => {
    const newLinks = [...footer.links];
    newLinks[index][field] = value;
    onChange("config.footer.links", newLinks);
  };

  const addLink = () => {
    const newLinks = [...footer.links, { label: "", url: "" }];
    onChange("config.footer.links", newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = [...footer.links];
    newLinks.splice(index, 1);
    onChange("config.footer.links", newLinks);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">🦶 {t("footersection.title")}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("footersection.text")}</label>
        <input
          type="text"
          value={footer.text}
          onChange={(e) => onChange("config.footer.text", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">{t("footersection.links")}</p>

        {footer.links.map((link, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start border p-4 rounded bg-gray-50">
            <div>
              <label className="text-sm text-gray-600">{t("footersection.label")}</label>
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(index, "label", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("footersection.url")}</label>
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="col-span-2">
              <button
                onClick={() => removeLink(index)}
                className="text-red-500 text-sm hover:underline"
              >
                {t("footersection.remove")}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addLink}
          className="text-sm text-primary hover:underline"
        >
          + {t("footersection.add_link")}
        </button>
      </div>
    </section>
  );
}
