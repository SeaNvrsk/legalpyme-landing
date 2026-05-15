"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealRuleProps = {
  className?: string;
  variant?: "light" | "dark" | "band";
  threshold?: number;
  /** Extra delay before the width expand starts (ms), after the row enters view. */
  revealDelayMs?: number;
};

const barClass = {
  light: "bg-neutral-200",
  dark: "bg-white/10",
  band: "bg-[var(--lp-band-fg)]/12",
} as const;

/**
 * Full-width horizontal rule that grows left → right on first intersection (once).
 */
export default function ScrollRevealRule({
  className = "",
  variant = "light",
  threshold = 0.12,
  revealDelayMs = 0,
}: ScrollRevealRuleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden ${className}`} aria-hidden>
      <div
        className={`h-full w-full origin-left transform-gpu will-change-transform transition-transform duration-[900ms] ease-out motion-reduce:duration-0 motion-reduce:transition-none ${barClass[variant]} ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
        style={visible && revealDelayMs > 0 ? { transitionDelay: `${revealDelayMs}ms` } : undefined}
      />
    </div>
  );
}
