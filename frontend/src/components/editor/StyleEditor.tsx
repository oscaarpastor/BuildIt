import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SiteConfig } from "../../types";

type Theme = SiteConfig["theme"];
type OnChange = (path: string, value: unknown) => void;

// Las mismas que acepta el backend (backend/src/lib/safe.ts)
const FONTS = ["Inter", "Playfair Display", "Montserrat", "Raleway", "Poppins"] as const;
const HEX = /^#[0-9a-f]{6}$/i;

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

/** Ajustes que afectan a toda la web: colores, letra y modo oscuro. */
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

      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t("themeselector.font")}</legend>
        <div className="divide-y divide-junta rounded-bloque border border-junta">
          {FONTS.map((font) => (
            <label
              key={font}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 has-checked:bg-azul-claro/60"
            >
              <input
                type="radio"
                name="font"
                value={font}
                checked={theme.fontFamily === font}
                onChange={() => onChange("config.theme.fontFamily", font)}
                className="size-4 accent-azul"
              />
              <span className="font-medium">{font}</span>
              <span className="text-sm text-andamio">{t(`themeselector.fonts.${font}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

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
