"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type FaqScrollArtProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Flat 2D “orb”: interwoven ellipses; rotation follows scroll + pointer (lerped).
 */
export default function FaqScrollArt({ sectionRef }: FaqScrollArtProps) {
  const [scrollP, setScrollP] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const rotateLayerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const reduceRef = useRef(false);

  scrollRef.current = scrollP;
  mouseRef.current = mouse;

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

    reduceRef.current = mqReduce.matches;

    const onReduceMediaChange = () => {
      reduceRef.current = mqReduce.matches;
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

  useEffect(() => {
    let id = 0;

    const loop = () => {
      const reduce = reduceRef.current;
      const el = rotateLayerRef.current;
      if (!el) {
        id = requestAnimationFrame(loop);
        return;
      }

      let target: number;
      if (reduce) {
        target = 18;
      } else {
        const sp = scrollRef.current;
        const m = mouseRef.current;
        target = sp * 520 + m.x * 32 + m.y * -26;
      }

      angleRef.current += (target - angleRef.current) * 0.14;
      el.style.transform = `rotate(${angleRef.current}deg)`;

      id = requestAnimationFrame(loop);
    };

    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative mx-auto aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5a6478] via-[#4f5869] to-[#454d5c] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 lg:max-w-sm"
      aria-hidden
    >
      <div
        ref={rotateLayerRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transform: "rotate(0deg)" }}
      >
        <svg
          viewBox="0 0 240 240"
          className="h-[85%] w-[85%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(120 120)">
            {[0, 60, 120].map((deg) => (
              <ellipse
                key={deg}
                cx={0}
                cy={0}
                rx={92}
                ry={30}
                stroke="#f2e6c4"
                strokeWidth={10}
                strokeLinecap="round"
                transform={`rotate(${deg})`}
              />
            ))}
            <ellipse
              cx={0}
              cy={0}
              rx={92}
              ry={30}
              stroke="#ecd9a8"
              strokeWidth={7}
              strokeOpacity={0.65}
              strokeLinecap="round"
              transform="rotate(30)"
            />
            <ellipse
              cx={0}
              cy={0}
              rx={92}
              ry={30}
              stroke="#ecd9a8"
              strokeWidth={7}
              strokeOpacity={0.65}
              strokeLinecap="round"
              transform="rotate(90)"
            />
            <circle r={36} stroke="#f8efd8" strokeWidth={6} strokeOpacity={0.9} />
          </g>
        </svg>
      </div>
    </div>
  );
}
