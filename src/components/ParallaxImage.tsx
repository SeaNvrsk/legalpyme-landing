"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);

  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffsetX(0);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const visible = rect.bottom > 0 && rect.top < vh;
    if (!visible) return;

    // progress: 0 when element enters bottom, 1 when exits top
    const progress = (vh - rect.top) / (vh + rect.height);
    // map to -30px ... +30px horizontal shift
    const x = (progress - 0.5) * 60;
    setOffsetX((prev) => (Math.abs(x - prev) < 0.3 ? prev : x));
  }, []);

  useEffect(() => {
    tick();

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          transform: `translate3d(${offsetX}px, 0, 0) scale(1.08)`,
          willChange: "transform",
        }}
        loading={priority ? undefined : "lazy"}
        priority={priority}
      />
    </div>
  );
}
