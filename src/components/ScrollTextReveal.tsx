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

type ScrollTextRevealProps = {
  children: string;
  className?: string;
  /** HTML tag for the wrapper */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** How to split text: "word" or "char" */
  splitBy?: "word" | "char";
  /** Style object for the wrapper element */
  style?: CSSProperties;
  /** Custom ref to measure scroll progress from (defaults to self) */
  progressRef?: RefObject<HTMLElement | null>;
};

/**
 * Text reveal driven by scroll position: splits text into spans and
 * animates each with offset opacity and Y-transform as the element
 * approaches the viewport center.
 */
export default function ScrollTextReveal({
  children,
  className = "",
  as: Tag = "h2",
  splitBy = "word",
  style,
  progressRef,
}: ScrollTextRevealProps) {
  const selfRef = useRef<HTMLElement>(null);
  const rafId = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const measureRef = progressRef ?? selfRef;

  const tick = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const mid = rect.top + rect.height / 2;
    const startY = vh * 0.92;
    const targetY = vh * 0.4;
    const span = Math.max(startY - targetY, 1);
    setProgress(clamp((startY - mid) / span, 0, 1));
  }, [measureRef]);

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
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  const units = splitBy === "char" ? children.split("") : children.split(/(\s+)/);
  const wordCount = units.filter((u) => u.trim().length > 0).length;

  let wordIdx = 0;

  return (
    <Tag
      ref={selfRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {units.map((unit, i) => {
        if (unit.trim().length === 0) {
          return <span key={`sp-${i}`}>{unit}</span>;
        }
        const idx = wordIdx++;
        const stagger = wordCount > 1 ? idx / (wordCount - 1) : 0;
        const wordP = clamp((progress - stagger * 0.45) / 0.55, 0, 1);
        const opacity = clamp(0.08 + 0.92 * wordP, 0, 1);
        const y = (1 - wordP) * 18;
        return (
          <span
            key={`w-${i}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translate3d(0, ${y}px, 0)`,
              willChange: "opacity, transform",
              whiteSpace: splitBy === "word" ? "pre" : undefined,
            }}
          >
            {unit}
          </span>
        );
      })}
    </Tag>
  );
}
