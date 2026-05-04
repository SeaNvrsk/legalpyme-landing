"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Same animation as:
 * <dotlottie-wc src="https://lottie.host/01a7214a-0e59-4a82-805f-cab989d00fff/surTa1K2QI.lottie" />
 * (React uses @lottiefiles/dotlottie-react — not the WC script; same .lottie file.)
 */
const FAQ_ORB_LOTTIE_SRC =
  "https://lottie.host/01a7214a-0e59-4a82-805f-cab989d00fff/surTa1K2QI.lottie";

/**
 * FAQ decorative Lottie. Canvas background transparent so it matches the white section.
 * Playback speed reacts gently to scroll + pointer; slower when reduced motion.
 */
export default function FaqScrollArt({ sectionRef }: FaqScrollArtProps) {
  const [scrollP, setScrollP] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      if (mqReduce.matches) {
        setScrollP(0.35);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = vh + rect.height;
      const raw = denom > 0 ? (vh - rect.top) / denom : 0;
      setScrollP(Math.min(1, Math.max(0, raw)));
    };

    const onReduceMediaChange = () => {
      updateScroll();
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    mqReduce.addEventListener("change", onReduceMediaChange);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      mqReduce.removeEventListener("change", onReduceMediaChange);
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

  const playbackSpeed = useMemo(() => {
    if (reduceMotion) return 0.35;
    const pointerBoost = (Math.abs(mouse.x) + Math.abs(mouse.y)) * 0.18;
    const raw = 0.65 + scrollP * 0.95 + pointerBoost;
    return Math.min(2, Math.max(0.4, raw));
  }, [scrollP, mouse, reduceMotion]);

  return (
    <div
      ref={panelRef}
      className="relative mx-auto aspect-square w-full max-w-[300px]"
      aria-hidden
    >
      <DotLottieReact
        src={FAQ_ORB_LOTTIE_SRC}
        loop
        autoplay
        speed={playbackSpeed}
        backgroundColor="#00000000"
        className="size-full max-h-[300px] max-w-[300px]"
        renderConfig={{ devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 }}
      />
    </div>
  );
}
