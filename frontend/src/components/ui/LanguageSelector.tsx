import { useTranslation } from "react-i18next";
import Segmented from "./Segmented";

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <Segmented
      label={t("language.label")}
      value={i18n.resolvedLanguage ?? "es"}
      onChange={changeLanguage}
      options={[
        { value: "es", label: "ES", title: "Español", lang: "es" },
        { value: "en", label: "EN", title: "English", lang: "en" },
      ]}
    />
  );
}
