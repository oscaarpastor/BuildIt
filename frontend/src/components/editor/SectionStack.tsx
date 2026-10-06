import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import { sectionName } from "../../lib/templates";
import type { HideableSection, SectionKey } from "../../types";

export type EditorTarget = SectionKey | "style";

type Props = {
  view: string;
  sections: SectionKey[];
  hidden: ReadonlySet<SectionKey>;
  selected: EditorTarget;
  onSelect: (target: EditorTarget) => void;
  onToggle: (key: HideableSection) => void;
};

/**
 * La web como una pila de bloques, igual que la «B» del logo.
 * Relleno = sección visible, discontinuo = oculta, azul = la que se está editando.
 */
export default function SectionStack({ view, sections, hidden, selected, onSelect, onToggle }: Props) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("editPage.structure_label")} className="space-y-5">
      <button
        type="button"
        aria-current={selected === "style" ? "true" : undefined}
        onClick={() => onSelect("style")}
        className={`flex h-10 w-full items-center gap-3 rounded-bloque border bg-papel px-3 text-left text-sm font-semibold transition-colors ${
          selected === "style" ? "border-azul text-azul" : "border-junta hover:border-grafito"
        }`}
      >
        <span aria-hidden="true" className="flex gap-0.5">
          <span className="size-2.5 rounded-[1px] bg-grafito" />
          <span className="size-2.5 rounded-[1px] bg-azul" />
        </span>
        {t("editPage.style")}
      </button>

      <div>
        <h2 className="mb-2 text-sm font-semibold">{t("editPage.structure")}</h2>
        <ol className="relative -mx-4 flex gap-[3px] overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {sections.map((key) => {
            const name = sectionName(t, view, key);
            const isHidden = hidden.has(key);
            const isSelected = selected === key;
            const tone = isHidden
              ? `border border-dashed bg-transparent ${isSelected ? "border-azul text-azul" : "border-andamio/60 text-andamio"}`
              : isSelected
                ? "bg-azul text-white"
                : "bg-grafito text-white hover:bg-[#383e48]";

            return (
              <li key={key} className={`relative flex h-10 shrink-0 items-stretch rounded-bloque transition-colors ${tone}`}>
                <button
                  type="button"
                  aria-current={isSelected ? "true" : undefined}
                  onClick={() => onSelect(key)}
                  className="flex min-w-0 flex-1 items-center whitespace-nowrap pl-3 pr-2 text-left text-sm font-medium"
                >
                  <span className="truncate">{name}</span>
                  {isHidden && <span className="sr-only"> ({t("editPage.hidden")})</span>}
                </button>
                {key !== "brand" && (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!isHidden}
                    aria-label={t("editPage.show_section", { section: name })}
                    title={t(isHidden ? "editPage.show" : "editPage.hide")}
                    onClick={() => onToggle(key)}
                    className="grid w-9 shrink-0 place-items-center opacity-70 transition-opacity hover:opacity-100"
                  >
                    <Icon name={isHidden ? "eyeOff" : "eye"} className="size-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
