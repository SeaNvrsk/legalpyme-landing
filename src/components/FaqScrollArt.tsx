"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/** Hosted file for https://app.lottiefiles.com/share/4454358a-c9e1-4a8d-83f6-33ce42e65840 */
const FAQ_ORB_LOTTIE_SRC =
  "https://lottie.host/16b69e12-0efb-4061-b33d-12dc2b93fd84/Ax2k12jKRd.lottie";

/**
 * Lottie orb from LottieFiles share (above). Same background as FAQ section.
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
      className="relative mx-auto aspect-square w-full max-w-[min(100%,17rem)] md:max-w-[min(100%,20rem)]"
      aria-hidden
    >
      <DotLottieReact
        src={FAQ_ORB_LOTTIE_SRC}
        loop
        autoplay
        speed={playbackSpeed}
        className="size-full"
        renderConfig={{ devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 }}
      />
    </div>
  );
}
