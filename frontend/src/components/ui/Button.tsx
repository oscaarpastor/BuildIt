import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger" | "submit" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const base = "font-semibold py-2 px-4 rounded-md transition text-sm focus:outline-none";

  const variants: Record<Variant, string> = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-surface text-primary border border-primary hover:bg-primary/20",
    outline: "border border-text text-text hover:bg-text/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
    submit: "bg-primary text-white hover:bg-primary-hover shadow-md",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${base} ${variants[variant]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
