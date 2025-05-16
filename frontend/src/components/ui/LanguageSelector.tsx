import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src="/es.png"
        alt="Español"
        className="w-7 h-5 cursor-pointer rounded shadow"
        onClick={() => changeLanguage("es")}
      />
      <img
        src="/en.png"
        alt="English"
        className="w-7 h-5 cursor-pointer rounded shadow"
        onClick={() => changeLanguage("en")}
      />
    </div>
  );
}
