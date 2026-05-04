"use client";

import { useEffect, useState, type RefObject } from "react";

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Decorative SVG driven by scroll position within the FAQ section.
 * Uses transform-only updates (compositor-friendly). See WCAG / MDN guidance on
 * prefers-reduced-motion for scroll-linked effects.
 */
export default function FaqScrollArt({ sectionRef }: FaqScrollArtProps) {
  const [p, setP] = useState(0.35);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      if (reduce) {
        setP(0.45);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = vh + rect.height;
      const raw = denom > 0 ? (vh - rect.top) / denom : 0;
      setP(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => update();
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", onMq);
    };
  }, [sectionRef]);

  const rotate = (p - 0.5) * 32;
  const driftY = (p - 0.5) * 48;
  const ringRotate = p * 72;

  return (
    <div
      className="relative mx-auto flex max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end"
      aria-hidden
    >
      <div
        className="relative aspect-square w-full max-w-[min(100%,22rem)] will-change-transform lg:max-w-sm"
        style={{
          transform: `translate3d(0, ${driftY}px, 0) rotate(${rotate}deg)`,
        }}
      >
        {/* Soft backdrop */}
        <div className="absolute inset-[8%] rounded-[40%] bg-gradient-to-br from-neutral-100/90 to-neutral-50/40 blur-2xl" />

        <svg
          viewBox="0 0 320 320"
          className="relative h-full w-full text-neutral-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="faqStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.65" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="faqFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          <g
            style={{
              transform: `rotate(${ringRotate}deg)`,
              transformOrigin: "160px 160px",
            }}
          >
            <circle cx="160" cy="160" r="118" stroke="url(#faqStroke)" strokeWidth="1.25" />
            <circle cx="160" cy="160" r="92" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <circle cx="160" cy="160" r="64" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="8 14" />
          </g>

          <path
            d="M160 52 L236 96 L236 184 L160 228 L84 184 L84 96 Z"
            stroke="url(#faqStroke)"
            strokeWidth="1.5"
            fill="url(#faqFill)"
            style={{
              transform: `rotate(${-ringRotate * 0.35}deg)`,
              transformOrigin: "160px 140px",
            }}
          />

          <rect
            x="118"
            y="118"
            width="84"
            height="84"
            rx="20"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.25"
            fill="currentColor"
            fillOpacity="0.04"
            style={{
              transform: `rotate(${12 + p * 24}deg)`,
              transformOrigin: "160px 160px",
            }}
          />

          <circle cx="160" cy="160" r="6" fill="currentColor" fillOpacity="0.45" />
          <circle cx="228" cy="96" r="4" fill="currentColor" fillOpacity="0.25" />
          <circle cx="92" cy="224" r="4" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>
    </div>
  );
}
