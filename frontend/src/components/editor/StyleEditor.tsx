import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import Segmented from "../ui/Segmented";
import { FONT_KINDS, SITE_FONTS } from "../../lib/fonts";
import type { SiteConfig, SiteLanguage } from "../../types";

type Theme = SiteConfig["theme"];
type OnChange = (path: string, value: unknown) => void;

const HEX = /^#[0-9a-f]{6}$/i;
const FONT_NAMES = Object.keys(SITE_FONTS);

function FontSelect({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="campo" aria-describedby={`${id}-pista`}>
        {FONT_KINDS.map((kind) => (
          <optgroup key={kind} label={t(`themeselector.font_kinds.${kind}`)}>
            {FONT_NAMES.filter((font) => SITE_FONTS[font] === kind).map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <p id={`${id}-pista`} className="mt-1.5 text-xs text-andamio">
        {hint}
      </p>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const id = useId();
  // Borrador del texto: solo se guarda cuando es un #rrggbb válido
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }
  const invalid = !HEX.test(draft);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          aria-label={t("themeselector.pick_color", { name: label })}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded border border-junta bg-papel p-1"
        />
        <input
          id={id}
          value={draft}
          maxLength={7}
          spellCheck={false}
          aria-invalid={invalid || undefined}
          onChange={(e) => {
            setDraft(e.target.value);
            if (HEX.test(e.target.value)) onChange(e.target.value.toLowerCase());
          }}
          className="campo w-28 uppercase"
        />
      </div>
      {invalid && <p className="mt-1.5 text-xs text-derribo">{t("themeselector.invalid_color")}</p>}
    </div>
  );
}

/** Ajustes que afectan a toda la web: colores, letras, idioma y modo oscuro. */
export default function StyleEditor({ theme, onChange }: { theme: Theme; onChange: OnChange }) {
  const { t } = useTranslation();
  const darkId = useId();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ColorField
          label={t("themeselector.primary_color")}
          value={theme.colorPrimary}
          onChange={(v) => onChange("config.theme.colorPrimary", v)}
        />
        <ColorField
          label={t("themeselector.secondary_color")}
          value={theme.colorSecondary}
          onChange={(v) => onChange("config.theme.colorSecondary", v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FontSelect
          label={t("themeselector.font_heading")}
          hint={t("themeselector.font_heading_hint")}
          value={theme.fontFamily}
          onChange={(v) => onChange("config.theme.fontFamily", v)}
        />
        <FontSelect
          label={t("themeselector.font_body")}
          hint={t("themeselector.font_body_hint")}
          value={theme.fontBody ?? theme.fontFamily}
          onChange={(v) => onChange("config.theme.fontBody", v)}
        />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <p className="text-sm font-medium">{t("themeselector.language")}</p>
          <p className="mt-0.5 max-w-xs text-xs text-andamio">{t("themeselector.language_hint")}</p>
        </div>
        <Segmented<SiteLanguage>
          label={t("themeselector.language")}
          value={theme.language ?? "es"}
          onChange={(v) => onChange("config.theme.language", v)}
          options={[
            { value: "es", label: "Español", lang: "es" },
            { value: "en", label: "English", lang: "en" },
          ]}
        />
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <p id={darkId} className="text-sm font-medium">
            {t("themeselector.dark_mode")}
          </p>
          <p className="mt-0.5 text-xs text-andamio">{t("themeselector.dark_mode_hint")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(theme.darkMode)}
          aria-labelledby={darkId}
          onClick={() => onChange("config.theme.darkMode", !theme.darkMode)}
          className="relative h-6 w-11 shrink-0 rounded-full bg-junta transition-colors aria-checked:bg-azul"
        >
          <span
            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-papel transition-transform ${
              theme.darkMode ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
