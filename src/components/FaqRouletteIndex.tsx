"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const CELL_PX = 30;
const CYCLES = 5;

function DigitRoll({
  digit,
  delayMs,
  spinKey,
}: {
  digit: number;
  delayMs: number;
  spinKey: number;
}) {
  const d = Math.min(9, Math.max(0, digit));
  const finalIdx = CYCLES * 10 + d;
  const stripLen = (CYCLES + 2) * 10;
  const digits = Array.from({ length: stripLen }, (_, i) => i % 10);
  const finalY = finalIdx * CELL_PX;

  const [y, setY] = useState(finalY);
  const [transitionOn, setTransitionOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setTransitionOn(false);
      setY(finalY);
      return;
    }

    if (spinKey === 0) {
      setTransitionOn(false);
      setY(finalY);
      return;
    }

    setTransitionOn(false);
    setY(0);
    const tid = window.setTimeout(() => {
      requestAnimationFrame(() => {
        setTransitionOn(true);
        setY(finalY);
      });
    }, delayMs);

    return () => window.clearTimeout(tid);
  }, [spinKey, d, delayMs, finalY]);

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ width: "0.72rem", height: CELL_PX }}
    >
      <span
        className="flex flex-col"
        style={{
          fontFamily: "var(--font-faq-roulette), system-ui, sans-serif",
          transform: `translate3d(0, -${y}px, 0)`,
          transition: transitionOn
            ? "transform 1.35s cubic-bezier(0.18, 0.72, 0.22, 1)"
            : "none",
          willChange: transitionOn ? "transform" : undefined,
        }}
      >
        {digits.map((n, i) => (
          <span
            key={`${i}-${n}`}
            className="flex shrink-0 items-center justify-center text-lg font-semibold tracking-tight text-neutral-800 tabular-nums"
            style={{ height: CELL_PX, minHeight: CELL_PX }}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Two-digit FAQ index (01–06) with slot-style roll on spinKey change.
 */
export default function FaqRouletteIndex({
  value,
  rowIndex,
  spinKey,
}: {
  value: number;
  rowIndex: number;
  spinKey: number;
}) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const baseDelay = rowIndex * 110;

  return (
    <span className="inline-flex h-[30px] shrink-0 items-center gap-px" aria-hidden>
      <DigitRoll digit={tens} delayMs={baseDelay} spinKey={spinKey} />
      <DigitRoll digit={ones} delayMs={baseDelay + 70} spinKey={spinKey} />
    </span>
  );
}

/**
 * Bumps `spinKey` when the FAQ section scrolls into view (replay roulette each time).
 */
export function useFaqRouletteSpin(sectionRef: RefObject<HTMLElement | null>) {
  const [spinKey, setSpinKey] = useState(0);
  const wasVisible = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        const v = e.isIntersecting;
        if (v && !wasVisible.current) {
          setSpinKey((k) => k + 1);
        }
        wasVisible.current = v;
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  return spinKey;
}
