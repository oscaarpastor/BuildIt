import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  src: string;
  title: string;
  /** Ancho de pantalla con el que se pinta la web antes de reducirla. */
  viewport?: number;
};

const RATIO = 10 / 16;

/** Miniatura real de una web: se pinta a tamaño de escritorio y se reduce al ancho del hueco. */
export default function SiteThumbnail({ src, title, viewport = 1280 }: Props) {
  const { t } = useTranslation();
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / viewport));
    observer.observe(box);
    return () => observer.disconnect();
  }, [viewport]);

  return (
    <div ref={boxRef} className="relative aspect-[16/10] overflow-hidden bg-yeso" inert>
      {!loaded && (
        <span className="absolute inset-0 grid place-items-center text-xs text-andamio">
          {t("common.loading_preview")}
        </span>
      )}
      {scale > 0 && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-300"
          style={{
            width: viewport,
            height: viewport * RATIO,
            transform: `scale(${scale})`,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
