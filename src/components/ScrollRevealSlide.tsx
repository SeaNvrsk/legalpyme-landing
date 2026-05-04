"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type SlideFrom = "left" | "right";

type ScrollRevealSlideProps = {
  children: ReactNode;
  className?: string;
  from: SlideFrom;
  /** Extra delay when entering view (ms). */
  delayMs?: number;
  threshold?: number;
};

/**
 * Slides in horizontally when the block intersects the viewport; slides back out
 * when it leaves (works when scrolling up or down). Respects prefers-reduced-motion.
 */
export default function ScrollRevealSlide({
  children,
  className = "",
  from,
  delayMs = 0,
  threshold = 0.18,
}: ScrollRevealSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(!!entry?.isIntersecting);
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const dirClass = from === "right" ? "lp-reveal-slide--from-right" : "lp-reveal-slide--from-left";

  return (
    <div
      ref={ref}
      className={`lp-reveal-slide ${dirClass} ${visible ? "lp-reveal-slide--visible" : ""} ${className}`}
      style={visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
