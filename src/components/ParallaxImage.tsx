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
  const [offsetY, setOffsetY] = useState(0);

  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffsetY(0);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const visible = rect.bottom > 0 && rect.top < vh;
    if (!visible) return;

    // progress: 0 when element enters bottom, 1 when exits top
    const progress = (vh - rect.top) / (vh + rect.height);
    // Vertical parallax: stronger shift while scrolling (± ~72px max)
    const y = (progress - 0.5) * 144;
    setOffsetY((prev) => (Math.abs(y - prev) < 0.5 ? prev : y));
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
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.14)`,
          willChange: "transform",
        }}
        loading={priority ? undefined : "lazy"}
        priority={priority}
      />
    </div>
  );
}
