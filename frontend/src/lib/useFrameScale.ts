import { useLayoutEffect, useState, useSyncExternalStore, type CSSProperties } from "react";

/** Ancho de escritorio con el que se pintan las webs en la vista previa. */
export const DESKTOP_WIDTH = 1280;

/**
 * Estilo de un iframe para enseñar una web a ancho de escritorio dentro de un
 * hueco más estrecho: se pinta a `width` píxeles y se reduce con transform.
 * Desactivado (o si el hueco ya es más ancho), ocupa el hueco tal cual.
 * `ref` va en el hueco (puede aparecer más tarde, por eso es un ref de función).
 */
export function useFrameScale(enabled: boolean, width = DESKTOP_WIDTH): { ref: (el: HTMLElement | null) => void; style: CSSProperties } {
  const [box, setBox] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = box;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height })
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [box]);

  if (!enabled || size.w === 0 || size.w >= width) return { ref: setBox, style: { width: "100%", height: "100%" } };
  const scale = size.w / width;
  return {
    ref: setBox,
    style: { width, height: size.h / scale, transform: `scale(${scale})`, transformOrigin: "0 0" },
  };
}

/** true mientras la consulta de medios se cumple (p. ej. pantalla ancha). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
