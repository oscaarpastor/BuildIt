// Iconos de trazo a 20 px. Son decorativos: el texto o el aria-label del botón
// que los contiene es lo que se anuncia.
const PATHS = {
  back: "M12.5 4.5 7 10l5.5 5.5",
  eye: "M1.75 10S5 4.25 10 4.25 18.25 10 18.25 10 15 15.75 10 15.75 1.75 10 1.75 10Z M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  eyeOff:
    "M3 3l14 14 M8.2 4.5A8.6 8.6 0 0 1 10 4.25C15 4.25 18.25 10 18.25 10a14 14 0 0 1-2.4 3.1 M5.1 6.1C3 7.6 1.75 10 1.75 10S5 15.75 10 15.75a8 8 0 0 0 3.9-1 M8.3 8.3a2.5 2.5 0 0 0 3.4 3.4",
  plus: "M10 4v12 M4 10h12",
  close: "M5 5l10 10 M15 5 5 15",
  external: "M8 4.5H4.5v11h11V12 M11 4.5h4.5V9 M15.5 4.5 9 11",
  desktop: "M2.5 4h15v9.5h-15Z M7 16.5h6 M10 13.5v3",
  phone: "M6.5 2.5h7v15h-7Z M9.25 15h1.5",
  download: "M10 3v10 M6 9.5l4 4 4-4 M3.5 16.5h13",
  link: "M8.5 11.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L10 5 M11.5 8.5a3.5 3.5 0 0 0-5 0L4 11a3.5 3.5 0 0 0 5 5l1-1",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
