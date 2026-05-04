"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import { useEffect, useRef, useState, type RefObject } from "react";

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

const FAQ_ORB_LOTTIE_SRC =
  "https://lottie.host/01a7214a-0e59-4a82-805f-cab989d00fff/surTa1K2QI.lottie";

/**
 * Lottie scrub: progress through the animation follows scroll position in #faq
 * (scroll down → forward, up → backward). Small horizontal pointer nudge.
 */
export default function FaqScrollArt({ sectionRef }: FaqScrollArtProps) {
  const [scrollP, setScrollP] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reduceRef = useRef(false);
  const playerRef = useRef<DotLottie | null>(null);

  scrollRef.current = scrollP;
  mouseRef.current = mouse;
  reduceRef.current = reduceMotion;
  playerRef.current = dotLottie;

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

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    mqReduce.addEventListener("change", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      mqReduce.removeEventListener("change", updateScroll);
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

  const scrubRef = useRef<() => void>(() => {});

  scrubRef.current = () => {
    const d = playerRef.current;
    if (!d?.isLoaded) return;
    d.pause();
    d.setLoop(false);
    const last = Math.max(0, d.totalFrames - 1);
    const rm = reduceRef.current;
    const nudge = rm ? 0 : mouseRef.current.x * 0.05;
    const p = Math.min(1, Math.max(0, scrollRef.current + nudge));
    d.setFrame(p * last);
  };

  useEffect(() => {
    const d = dotLottie;
    if (!d) return;

    const onLoad = () => scrubRef.current();
    d.addEventListener("load", onLoad);
    if (d.isLoaded) onLoad();

    return () => d.removeEventListener("load", onLoad);
  }, [dotLottie]);

  useEffect(() => {
    scrubRef.current();
  }, [scrollP, mouse.x, reduceMotion, dotLottie]);

  return (
    <div
      ref={panelRef}
      className="relative mx-auto aspect-square w-full max-w-[300px]"
      aria-hidden
    >
      <DotLottieReact
        src={FAQ_ORB_LOTTIE_SRC}
        loop={false}
        autoplay={false}
        speed={1}
        dotLottieRefCallback={setDotLottie}
        backgroundColor="#00000000"
        className="size-full max-h-[300px] max-w-[300px]"
        renderConfig={{ devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 }}
      />
    </div>
  );
}
