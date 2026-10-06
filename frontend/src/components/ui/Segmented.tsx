import type { ReactNode } from "react";

type Option<T extends string> = {
  value: T;
  label: ReactNode;
  title?: string;
  lang?: string;
};

type Props<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

/** Grupo de botones excluyentes (idioma, escritorio/móvil…). */
export default function Segmented<T extends string>({ label, value, options, onChange }: Props<T>) {
  return (
    <div role="group" aria-label={label} className="flex shrink-0 rounded border border-junta bg-papel p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.lang}
          title={option.title}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="flex h-7 items-center gap-1.5 rounded-sm px-2 text-xs font-semibold text-andamio transition-colors hover:text-grafito aria-pressed:bg-grafito aria-pressed:text-white"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
