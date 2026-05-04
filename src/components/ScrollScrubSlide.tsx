"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

type ScrollScrubSlideProps = {
  children: ReactNode;
  className?: string;
  from: "left" | "right";
};

/**
 * Horizontal offset is a linear function of window scrollY (no easing): while you scroll,
 * the block moves; when scroll stops, it stops. Reverses when scrolling up.
 */
export default function ScrollScrubSlide({
  children,
  className = "",
  from,
}: ScrollScrubSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const rafId = useRef<number | null>(null);

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStyle({ opacity: 1, transform: "none", willChange: "auto" });
      return;
    }

    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const vh = window.innerHeight || 1;
    const w = window.innerWidth || 1;
    const maxX = clamp(w * 0.26, 80, 200);

    const elTop = rect.top + scrollY;
    const rangeStart = elTop - vh * 1.02;
    const rangeEnd = elTop - vh * 0.2;
    const span = Math.max(rangeEnd - rangeStart, 1);
    const p = clamp((scrollY - rangeStart) / span, 0, 1);

    const sign = from === "right" ? 1 : -1;
    const x = sign * (1 - p) * maxX;
    const opacity = clamp(0.08 + 0.92 * p, 0, 1);

    setStyle({
      transform: `translate3d(${x}px, 0, 0)`,
      opacity,
      willChange: "transform, opacity",
    });
  }, [from]);

  useLayoutEffect(() => {
    tick();
  }, [tick]);

  useEffect(() => {
    const schedule = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        tick();
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const el = ref.current;
    const ro = new ResizeObserver(schedule);
    if (el) ro.observe(el);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
