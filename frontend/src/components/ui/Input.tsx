import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`px-4 py-2 border border-text rounded-md bg-transparent text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}
