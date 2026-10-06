import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextAreaField, TextField } from "../ui/Field";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { SECTION_FIELDS, type FieldDef } from "./sectionFields";
import type { SectionKey } from "../../types";

type OnChange = (path: string, value: unknown) => void;
type Item = Record<string, string>;

const getPath = (obj: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((acc, key) => (acc as Record<string, unknown> | undefined)?.[key], obj);

const isHttpUrl = (value: string) => /^https?:\/\/\S+$/i.test(value);

/** Campo de imagen por URL: enseña una miniatura para comprobar que la dirección es buena. */
function ImageField({ label, value, placeholder, onChange }: { label: string; value: string; placeholder?: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState<string | null>(null);
  const showThumb = isHttpUrl(value) && failed !== value;

  return (
    <div className="flex items-end gap-3">
      <TextField
        className="min-w-0 flex-1"
        type="url"
        inputMode="url"
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        hint={failed === value && value ? t("editPage.image_error") : undefined}
        aria-invalid={failed === value && value ? true : undefined}
      />
      <div className="mb-px size-10 shrink-0 overflow-hidden rounded-bloque border border-junta bg-yeso">
        {showThumb && (
          <img key={value} src={value} alt="" className="size-full object-cover" onError={() => setFailed(value)} />
        )}
      </div>
    </div>
  );
}

function FieldInput({ def, value, onChange }: { def: FieldDef; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const label = t(def.label);
  const placeholder = def.placeholder ? t(def.placeholder) : undefined;

  switch (def.kind) {
    case "textarea":
      return <TextAreaField label={label} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "image":
      return <ImageField label={label} value={value} placeholder={placeholder} onChange={onChange} />;
    case "link":
      return (
        <TextField
          label={label}
          value={value}
          placeholder={placeholder ?? "https://"}
          hint={t("editPage.link_hint")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <TextField
          type={def.kind ?? "text"}
          label={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function FieldGrid({ fields, source, onField }: { fields: FieldDef[]; source: unknown; onField: (key: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      {fields.map((def) => (
        <div key={def.key} className={def.half ? "" : "sm:col-span-2"}>
          <FieldInput def={def} value={String(getPath(source, def.key) ?? "")} onChange={(v) => onField(def.key, v)} />
        </div>
      ))}
    </div>
  );
}

type Props = {
  section: SectionKey;
  value: unknown;
  onChange: OnChange;
};

/** Formulario de una sección, generado a partir de SECTION_FIELDS. */
export default function SectionEditor({ section, value, onChange }: Props) {
  const { t } = useTranslation();
  const def = SECTION_FIELDS[section];
  const list = def.list;
  const listPath = list?.path ? `config.${section}.${list.path}` : `config.${section}`;
  const items = (list ? (list.path ? getPath(value, list.path) : value) : []) as Item[];

  const setItems = (next: Item[]) => onChange(listPath, next);

  return (
    <div className="space-y-8">
      {def.fields && (
        <FieldGrid
          fields={def.fields}
          source={value}
          onField={(key, v) => onChange(`config.${section}.${key}`, v)}
        />
      )}

      {list && (
        <div className="space-y-4">
          {items.length === 0 && <p className="text-sm text-andamio">{t("editPage.empty_list")}</p>}

          <ol className="space-y-4">
            {items.map((item, index) => {
              const itemName = t(list.item, { n: index + 1 });
              return (
                <li key={index} className="rounded-bloque border border-junta">
                  <div className="flex items-center justify-between border-b border-junta bg-yeso/60 py-1 pl-4 pr-1">
                    <h3 className="text-sm font-semibold">{itemName}</h3>
                    <Button
                      variant="danger"
                      size="sm"
                      aria-label={t("editPage.remove_item", { item: itemName })}
                      onClick={() => setItems(items.filter((_, i) => i !== index))}
                    >
                      {t("editPage.remove")}
                    </Button>
                  </div>
                  <div className="p-4">
                    <FieldGrid
                      fields={list.fields}
                      source={item}
                      onField={(key, v) => setItems(items.map((it, i) => (i === index ? { ...it, [key]: v } : it)))}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Hueco por construir: mismo borde discontinuo que una sección oculta */}
          <button
            type="button"
            onClick={() => setItems([...items, { ...list.empty }])}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-bloque border border-dashed border-andamio/60 text-sm font-semibold text-andamio transition-colors hover:border-azul hover:text-azul"
          >
            <Icon name="plus" className="size-4" />
            {t(list.add)}
          </button>
        </div>
      )}
    </div>
  );
}
