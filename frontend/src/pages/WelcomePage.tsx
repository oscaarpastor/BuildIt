import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicHeader from "../components/layout/PublicHeader";
import SiteThumbnail from "../components/SiteThumbnail";
import { buttonClass } from "../components/ui/buttonClass";
import Icon from "../components/ui/Icon";
import { LogoMark } from "../components/ui/Logo";
import { useAuth } from "../context/useAuth";
import { api, templatePreviewUrl } from "../lib/api";
import { templateDescription, templateName } from "../lib/templates";
import type { TFunction } from "i18next";
import type { BaseTemplate, SectionKey } from "../types";

// La web de ejemplo de la portada: la plantilla Restaurante, de arriba abajo.
const exampleSection = (t: TFunction, key: SectionKey) => t([`welcome.sections.${key}`, `editPage.sections.${key}`]);
// Plantillas que se enseñan en la portada (la galería completa está al crear una web)
const FEATURED = 6;
// hint: un esbozo del contenido de cada bloque (líneas de texto o tarjetas)
type Example = { key: SectionKey; height: string; hidden?: boolean; selected?: boolean; hint?: "lines" | "tiles" };
const EXAMPLE_STACK: Example[] = [
  { key: "brand", height: "h-11" },
  { key: "hero", height: "h-40 sm:h-44", selected: true },
  { key: "about", height: "h-20", hint: "lines" },
  { key: "products", height: "h-28", hint: "tiles" },
  { key: "testimonials", height: "h-12", hidden: true },
  { key: "contact", height: "h-16", hint: "lines" },
  { key: "footer", height: "h-9" },
];

function ContentHint({ kind }: { kind: "lines" | "tiles" }) {
  if (kind === "tiles") {
    return (
      <span aria-hidden="true" className="mt-auto grid grid-cols-3 gap-1.5">
        <span className="h-10 rounded-[1px] bg-white/12" />
        <span className="h-10 rounded-[1px] bg-white/12" />
        <span className="h-10 rounded-[1px] bg-white/12" />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="mt-auto flex flex-col gap-1.5 pb-0.5">
      <span className="h-1.5 w-3/5 rounded-full bg-white/15" />
      <span className="h-1.5 w-2/5 rounded-full bg-white/15" />
    </span>
  );
}

function HeroStack() {
  const { t } = useTranslation();
  const total = EXAMPLE_STACK.length;

  return (
    <figure className="w-full max-w-md justify-self-center lg:justify-self-end">
      <ol className="flex flex-col gap-[3px]" aria-label={t("welcome.stack_label")}>
        {EXAMPLE_STACK.map(({ key, height, hidden, selected, hint }, index) => {
          const tone = hidden
            ? "border border-dashed border-andamio/60 text-andamio"
            : selected
              ? "bg-azul text-white"
              : "bg-grafito text-white";
          return (
            <li
              key={key}
              // Se apila de abajo arriba: el pie llega primero y la cabecera la última
              style={{ "--orden": total - 1 - index } as CSSProperties}
              className={`bloque-apilado relative flex ${height} flex-col rounded-bloque px-4 py-2.5 ${tone}`}
            >
              <div className="flex items-center justify-between text-sm font-medium">
                <span>
                  {exampleSection(t, key)}
                  {hidden && <span className="text-andamio"> ({t("editPage.hidden")})</span>}
                </span>
                {key !== "brand" && <Icon name={hidden ? "eyeOff" : "eye"} className="size-4 opacity-70" />}
              </div>
              {hint && <ContentHint kind={hint} />}
              {selected && (
                <div className="mt-auto pb-1">
                  <p className="titular text-3xl leading-none sm:text-4xl">{t("welcome.example_title")}</p>
                  <p className="mt-2 text-sm text-white/80">{t("welcome.example_subtitle")}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-3 text-xs text-andamio">{t("welcome.stack_caption")}</figcaption>
    </figure>
  );
}

const STEPS = ["step1", "step2", "step3"] as const;

export default function WelcomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user } = useAuth();
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);

  useEffect(() => {
    api<BaseTemplate[]>("/api/base-templates")
      .then(setTemplates)
      .catch(() => setTemplates([])); // sin plantillas, la sección no se muestra
  }, []);

  const startLink = user ? "/projects" : "/register";

  return (
    <div className="min-h-dvh">
      <PublicHeader>
        {user ? (
          <Link to="/projects" className={buttonClass("secondary", "sm")}>
            {t("nav.sites")}
          </Link>
        ) : (
          <Link to="/login" className={buttonClass("secondary", "sm")}>
            {t("welcome.login")}
          </Link>
        )}
      </PublicHeader>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-28">
          <div>
            <h1 className="titular text-4xl sm:text-5xl">{t("welcome.headline")}</h1>
            <p className="mt-6 max-w-[34rem] text-lg text-andamio">{t("welcome.description")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link to={startLink} className={buttonClass("primary", "lg")}>
                {user ? t("nav.sites") : t("welcome.cta")}
              </Link>
              {!user && (
                <Link to="/login" className="text-sm font-semibold text-azul hover:underline">
                  {t("welcome.have_account")}
                </Link>
              )}
            </div>
          </div>
          <HeroStack />
        </section>

        <section className="border-t border-junta bg-papel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="titular text-2xl">{t("welcome.how_title")}</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step}>
                  <p aria-hidden="true" className="titular text-4xl text-azul">
                    {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{t(`welcome.${step}_title`)}</h3>
                  <p className="mt-2 max-w-xs text-andamio">{t(`welcome.${step}_text`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {templates.length > 0 && (
          <section className="border-t border-junta">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
              <h2 className="titular text-2xl">{t("welcome.templates_title")}</h2>
              <p className="mt-3 max-w-xl text-andamio">{t("welcome.templates_text")}</p>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {templates.slice(0, FEATURED).map((tpl) => (
                  <li key={tpl._id}>
                    <Link
                      to={startLink}
                      className="group block rounded-lg focus-visible:outline-offset-4"
                      aria-label={t("welcome.template_link", { name: templateName(lang, tpl) })}
                    >
                      <div className="overflow-hidden rounded-lg border border-junta bg-papel transition-colors group-hover:border-grafito">
                        <SiteThumbnail src={templatePreviewUrl(tpl._id)} title={templateName(lang, tpl)} />
                      </div>
                      <h3 className="mt-4 font-semibold">{templateName(lang, tpl)}</h3>
                      <p className="mt-1 text-sm text-andamio">{templateDescription(lang, tpl)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              {templates.length > FEATURED && (
                <Link to={user ? "/projects/new" : "/register"} className={buttonClass("secondary", "md", "mt-12")}>
                  {t("welcome.all_templates", { count: templates.length })}
                </Link>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-junta">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-8 text-sm text-andamio sm:px-6">
          <LogoMark className="h-5 w-auto" />
          <span>{t("welcome.footer", { year: new Date().getFullYear() })}</span>
        </div>
      </footer>
    </div>
  );
}
