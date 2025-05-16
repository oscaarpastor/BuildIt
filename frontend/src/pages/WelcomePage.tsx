import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import LanguageSelector from "../components/ui/LanguageSelector";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="cursor-pointer flex items-center" onClick={() => navigate("/")}>
          <img src="/logoLargo-nobg.png" alt="BuildIt logo" className="h-24" />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="primary" onClick={() => navigate("/login")}>
            {t("welcome.login")}
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t("welcome.headline")}
            </h1>
            <p className="text-text/70 mb-6 max-w-lg">
              {t("welcome.description", { app: "BuildIt" })}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={() => navigate("/register")}>
                {t("welcome.cta")}
              </Button>
              <span className="text-sm text-text/60 flex items-center">
                {t("welcome.note")}
              </span>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden">
              <img
                src="/welcomepage.jpg"
                alt="Ilustración bienvenida"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
