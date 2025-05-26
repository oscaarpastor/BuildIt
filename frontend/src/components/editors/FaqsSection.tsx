import { useTranslation } from "react-i18next";

type Faq = {
  question: string;
  answer: string;
};

type Props = {
  faqs: Faq[];
  onChange: (path: string, value: unknown) => void;
};

export default function FaqsSection({ faqs, onChange }: Props) {
  const { t } = useTranslation();

  const updateFaq = (index: number, field: keyof Faq, value: string) => {
    const newList = [...faqs];
    newList[index][field] = value;
    onChange("config.faqs", newList);
  };

  const addFaq = () => {
    onChange("config.faqs", [...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const newList = [...faqs];
    newList.splice(index, 1);
    onChange("config.faqs", newList);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">❓ {t("faqssection.title")}</h2>

      {faqs.map((faq, index) => (
        <div key={index} className="space-y-3 border rounded p-4 bg-gray-50 relative">
          <button
            type="button"
            onClick={() => removeFaq(index)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            ✖
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("faqssection.question")}
            </label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
              placeholder={t("faqssection.question_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("faqssection.answer")}
            </label>
            <input
              type="text"
              value={faq.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              placeholder={t("faqssection.answer_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addFaq}
        className="text-sm text-primary font-medium border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        ➕ {t("faqssection.add_button")}
      </button>
    </section>
  );
}
