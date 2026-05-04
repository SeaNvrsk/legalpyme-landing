"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * Single progress 0→1 while the element's vertical center moves toward the viewport center.
 * All children can share this so they align together when the block is centered on screen.
 */
export function useFoldProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  const rafId = useRef<number | null>(null);

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const mid = rect.top + rect.height / 2;
    const targetY = vh * 0.5;
    const startY = vh * 0.88;
    const span = Math.max(startY - targetY, 1);
    const next = clamp((startY - mid) / span, 0, 1);
    setP((prev) => (Math.abs(next - prev) < 0.002 ? prev : next));
  }, []);

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

  return p;
}

type ScrollScrubSlideProps = {
  children: ReactNode;
  className?: string;
  from: "left" | "right";
  /** 0 = at side, 1 = centered (typically shared from useFoldProgress). */
  progress: number;
};

/**
 * Horizontal offset from shared scroll progress (linear, no time-based animation).
 */
export default function ScrollScrubSlide({
  children,
  className = "",
  from,
  progress,
}: ScrollScrubSlideProps) {
  const [maxX, setMaxX] = useState(160);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const sync = () => setMaxX(clamp(window.innerWidth * 0.26, 80, 200));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useLayoutEffect(() => {
    const rm =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = clamp(progress, 0, 1);
    const sign = from === "right" ? 1 : -1;
    const x = rm ? 0 : sign * (1 - p) * maxX;
    const opacity = rm ? 1 : clamp(0.08 + 0.92 * p, 0, 1);
    setStyle({
      transform: `translate3d(${x}px, 0, 0)`,
      opacity,
      willChange: rm ? "auto" : "transform, opacity",
    });
  }, [from, progress, maxX]);

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
