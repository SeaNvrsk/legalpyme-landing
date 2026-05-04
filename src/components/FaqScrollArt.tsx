"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type RefObject } from "react";

const FaqOrbCanvas = dynamic(() => import("./FaqOrbCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-[280px] w-full items-center justify-center rounded-[2rem] bg-slate-600/25 lg:min-h-[320px]"
      aria-hidden
    />
  ),
});

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * WebGL orb + scroll progress (Gentlerain-style interaction pattern).
 * Scroll maps to tumble; pointer subtly tilts the form; idle rotation continues.
 */
export default function FaqScrollArt({ sectionRef }: FaqScrollArtProps) {
  const [scrollP, setScrollP] = useState(0.35);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      if (reduce) {
        setScrollP(0.45);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = vh + rect.height;
      const raw = denom > 0 ? (vh - rect.top) / denom : 0;
      setScrollP(Math.min(1, Math.max(0, raw)));
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => updateScroll();
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      mq.removeEventListener("change", onMq);
    };
  }, [sectionRef]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const w = Math.max(r.width, 1);
      const h = Math.max(r.height, 1);
      const x = ((e.clientX - r.left) / w) * 2 - 1;
      const y = -(((e.clientY - r.top) / h) * 2 - 1);
      setMouse({ x, y });
    };

    const onLeave = () => setMouse({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="relative mx-auto flex max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end"
      aria-hidden
    >
      <div
        ref={panelRef}
        className="relative aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5a6478] via-[#4f5869] to-[#454d5c] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 lg:max-w-sm"
      >
        <FaqOrbCanvas scrollP={scrollP} mouse={mouse} />
      </div>
    </div>
  );
}
