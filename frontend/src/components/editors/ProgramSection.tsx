import { useTranslation } from "react-i18next";

type CTA = {
  text: string;
  link: string;
};

type Program = {
  title: string;
  image: string;
  reason: string;
  functioning: string;
  methodology: string;
  selection: string;
  cta1: CTA;
  cta2: CTA;
};

type Props = {
  program: Program;
  onChange: (path: string, value: unknown) => void;
};

export default function ProgramSection({ program, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">📘 {t("programsection.title")}</h2>

      {/* Campos simples */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.program_title")}
        </label>
        <input
          type="text"
          value={program.title}
          onChange={(e) => onChange("config.program.title", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.image")}
        </label>
        <input
          type="text"
          value={program.image}
          onChange={(e) => onChange("config.program.image", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.reason")}
        </label>
        <input
          type="text"
          value={program.reason}
          onChange={(e) => onChange("config.program.reason", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.functioning")}
        </label>
        <input
          type="text"
          value={program.functioning}
          onChange={(e) => onChange("config.program.functioning", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.methodology")}
        </label>
        <input
          type="text"
          value={program.methodology}
          onChange={(e) => onChange("config.program.methodology", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("programsection.selection")}
        </label>
        <input
          type="text"
          value={program.selection}
          onChange={(e) => onChange("config.program.selection", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* CTA 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("programsection.cta1_text")}
          </label>
          <input
            type="text"
            value={program.cta1.text}
            onChange={(e) => onChange("config.program.cta1.text", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("programsection.cta1_link")}
          </label>
          <input
            type="text"
            value={program.cta1.link}
            onChange={(e) => onChange("config.program.cta1.link", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* CTA 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("programsection.cta2_text")}
          </label>
          <input
            type="text"
            value={program.cta2.text}
            onChange={(e) => onChange("config.program.cta2.text", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("programsection.cta2_link")}
          </label>
          <input
            type="text"
            value={program.cta2.link}
            onChange={(e) => onChange("config.program.cta2.link", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
    </section>
  );
}
