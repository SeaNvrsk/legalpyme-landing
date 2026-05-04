"use client";

import { useEffect, useRef, useState } from "react";

type ScrollCountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  locale?: string;
};

/**
 * Counts up to `end` when the span enters the viewport (once).
 */
export default function ScrollCountUp({
  end,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  className = "",
  locale = "es-MX",
}: ScrollCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(end);
      return;
    }

    let raf = 0;
    const t0 = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const raw = Math.min((now - t0) / durationMs, 1);
      const eased = easeOutCubic(raw);
      setValue(Math.round(end * eased));
      if (raw < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, durationMs]);

  const formatted = new Intl.NumberFormat(locale).format(value);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
