import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    load: "languageOnly",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}.json", // Cargará los archivos desde public/locales/
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Mantener el atributo lang del documento sincronizado (accesibilidad y SEO)
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng.split("-")[0];
});

export default i18n;
