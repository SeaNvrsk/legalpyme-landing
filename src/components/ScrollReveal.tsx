"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after element enters view (ms). */
  delayMs?: number;
  /** Lower = triggers earlier. */
  threshold?: number;
};

/**
 * Fades/slides content in when it enters the viewport (once).
 */
export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
    <div
      ref={ref}
      className={`lp-reveal ${visible ? "lp-reveal--visible" : ""} ${className}`}
      style={visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
