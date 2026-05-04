"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Fades the hero photo as the user scrolls, without React setState on scroll
 * (avoids re-rendering the whole page = lag). Opacity is updated via rAF + ref.
 */
export default function HeroScrollBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const t = Math.min(window.scrollY / vh, 1);
      el.style.opacity = String(1 - t);
      /* Subtle Ken Burns-style zoom while fading — reads “premium” on first scroll */
      const scale = 1 + t * 0.06;
      el.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 z-0 will-change-[opacity,transform] origin-center [backface-visibility:hidden]"
      style={{ opacity: 1, transform: "scale(1)" }}
      aria-hidden
    >
      <Image
        src="/image_3d84fb.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}
