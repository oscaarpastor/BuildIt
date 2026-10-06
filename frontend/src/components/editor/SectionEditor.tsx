import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextAreaField, TextField } from "../ui/Field";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import SiteIcon from "./SiteIcon";
import { HEADING_FIELDS, SECTION_FIELDS, type FieldDef } from "./sectionFields";
import { PICKER_ICONS, SITE_ICONS } from "../../lib/siteIcons";
import type { Heading, SectionKey } from "../../types";

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

/** Selector de icono: los de la colección de las webs, en una rejilla desplegable. */
function IconField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const id = useId();
  const known = Boolean(SITE_ICONS[value]);

  return (
    <div>
      <p id={id} className="mb-1.5 text-sm font-medium">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-bloque border border-junta bg-yeso text-lg"
        >
          {known ? <SiteIcon name={value} /> : value || <span className="text-andamio">–</span>}
        </span>
        <Button variant="secondary" size="sm" aria-expanded={open} aria-controls={`${id}-rejilla`} onClick={() => setOpen(!open)}>
          {open ? t("iconpicker.close") : t("iconpicker.choose")}
        </Button>
        {value && (
          <Button variant="quiet" size="sm" onClick={() => onChange("")}>
            {t("iconpicker.none")}
          </Button>
        )}
      </div>
      {open && (
        <div
          id={`${id}-rejilla`}
          role="group"
          aria-labelledby={id}
          className="mt-3 grid max-h-64 grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-1 overflow-y-auto rounded-bloque border border-junta bg-papel p-2"
        >
          {PICKER_ICONS.map((name) => (
            <button
              key={name}
              type="button"
              title={name}
              aria-label={t("iconpicker.icon", { name })}
              aria-pressed={value === name}
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              className="grid size-10 place-items-center rounded-sm text-grafito transition-colors hover:bg-yeso aria-pressed:bg-azul aria-pressed:text-white"
            >
              <SiteIcon name={name} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FieldInput({ def, value, onChange }: { def: FieldDef; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const label = t(def.label);
  const placeholder = def.placeholder ? t(def.placeholder) : undefined;
  const hint = def.hint ? t(def.hint) : undefined;

  switch (def.kind) {
    case "icon":
      return <IconField label={label} value={value} onChange={onChange} />;
    case "textarea":
      return (
        <TextAreaField label={label} value={value} placeholder={placeholder} hint={hint} onChange={(e) => onChange(e.target.value)} />
      );
    case "image":
      return <ImageField label={label} value={value} placeholder={placeholder} onChange={onChange} />;
    case "link":
      return (
        <TextField
          label={label}
          value={value}
          placeholder={placeholder ?? "https://"}
          hint={hint ?? t("editPage.link_hint")}
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
          hint={hint}
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

/** Antetítulo, título y entradilla de una sección (config.headings). */
export function HeadingEditor({ section, value, onChange }: { section: SectionKey; value?: Heading; onChange: OnChange }) {
  const { t } = useTranslation();
  const fields = HEADING_FIELDS[section];
  if (!fields) return null;
  const heading: Heading = value ?? { eyebrow: "", title: "", subtitle: "" };
  const defs: FieldDef[] = fields.map((key) => ({
    key,
    label: `headings.${key}`,
    kind: key === "subtitle" ? "textarea" : "text",
    hint: key === "eyebrow" ? "headings.eyebrow_hint" : undefined,
  }));

  return (
    <fieldset className="rounded-bloque border border-junta p-4">
      <legend className="px-1 text-sm font-semibold">{t("headings.legend")}</legend>
      <FieldGrid
        fields={defs}
        source={heading}
        onField={(key, v) => onChange(`config.headings.${section}`, { ...heading, [key]: v })}
      />
    </fieldset>
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
