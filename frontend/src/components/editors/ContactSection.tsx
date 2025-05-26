import { useTranslation } from "react-i18next";

type Props = {
  contact: {
    email: string;
    phone: string;
    address: string;
    formEnabled: boolean;
  };
  onChange: (path: string, value: unknown) => void;
};

export default function ContactSection({ contact, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">📞 {t("contactsection.title")}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactsection.email")}</label>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => onChange("config.contact.email", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactsection.phone")}</label>
        <input
          type="text"
          value={contact.phone}
          onChange={(e) => onChange("config.contact.phone", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactsection.address")}</label>
        <input
          type="text"
          value={contact.address}
          onChange={(e) => onChange("config.contact.address", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={contact.formEnabled}
          onChange={(e) => onChange("config.contact.formEnabled", e.target.checked)}
          className="w-4 h-4 border-gray-300 rounded"
        />
        <label className="text-sm font-medium text-gray-700">{t("contactsection.form_enabled")}</label>
      </div>
    </section>
  );
}
