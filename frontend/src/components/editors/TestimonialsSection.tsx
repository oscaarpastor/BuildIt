import { useTranslation } from "react-i18next";

type Testimonial = {
  name: string;
  quote: string;
  avatar: string;
};

type Props = {
  testimonials: Testimonial[];
  onChange: (path: string, value: unknown) => void;
};

export default function TestimonialsSection({ testimonials, onChange }: Props) {
  const { t } = useTranslation();

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const newList = [...testimonials];
    newList[index][field] = value;
    onChange("config.testimonials", newList);
  };

  const addTestimonial = () => {
    const newList = [...testimonials, { name: "", quote: "", avatar: "" }];
    onChange("config.testimonials", newList);
  };

  const removeTestimonial = (index: number) => {
    const newList = [...testimonials];
    newList.splice(index, 1);
    onChange("config.testimonials", newList);
  };

  return (
    <section className="space-y-6 border-t pt-6">
      <h2 className="text-lg font-bold flex items-center gap-2">💬 {t("testimonialssection.title")}</h2>

      {testimonials.map((testimonial, index) => (
        <div key={index} className="space-y-3 border rounded p-4 bg-gray-50 relative">
          <button
            type="button"
            onClick={() => removeTestimonial(index)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            ✖
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("testimonialssection.name")}
            </label>
            <input
              type="text"
              value={testimonial.name}
              onChange={(e) => updateTestimonial(index, "name", e.target.value)}
              placeholder={t("testimonialssection.name_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("testimonialssection.quote")}
            </label>
            <input
              type="text"
              value={testimonial.quote}
              onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
              placeholder={t("testimonialssection.quote_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("testimonialssection.avatar")}
            </label>
            <input
              type="text"
              value={testimonial.avatar}
              onChange={(e) => updateTestimonial(index, "avatar", e.target.value)}
              placeholder={t("testimonialssection.avatar_placeholder")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTestimonial}
        className="text-sm text-primary font-medium border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        ➕ {t("testimonialssection.add_button")}
      </button>
    </section>
  );
}
