import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";

type ShellProps = {
  label: string;
  hint?: ReactNode;
  className?: string;
  children: (ids: { id: string; hintId?: string }) => ReactNode;
};

// Etiqueta visible y asociada al campo, con una pista opcional debajo.
function FieldShell({ label, hint, className = "", children }: ShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-pista` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children({ id, hintId })}
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-andamio">
          {hint}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: ReactNode;
};

export function TextField({ label, hint, className, ...props }: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      {({ id, hintId }) => <input id={id} aria-describedby={hintId} className="campo" {...props} />}
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  label: string;
  hint?: ReactNode;
};

export function TextAreaField({ label, hint, className, rows = 3, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      {({ id, hintId }) => <textarea id={id} rows={rows} aria-describedby={hintId} className="campo" {...props} />}
    </FieldShell>
  );
}
