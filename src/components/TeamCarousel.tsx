"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { TEAM, type TeamAccent } from "@/lib/team";

const TRANSITION_MS = 650;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const AUTOPLAY_MS = 5000;

const ACCENT_RING: Record<TeamAccent, string> = {
  blue: "ring-white/35",
  emerald: "ring-white/35",
  orange: "ring-white/35",
  violet: "ring-white/35",
  amber: "ring-white/35",
};

const ACCENT_TAG: Record<TeamAccent, string> = {
  blue: "border-white/25 bg-white/10 text-white/95",
  emerald: "border-white/25 bg-white/10 text-white/95",
  orange: "border-white/25 bg-white/10 text-white/95",
  violet: "border-white/25 bg-white/10 text-white/95",
  amber: "border-white/25 bg-white/10 text-white/95",
};

const ACCENT_STAT: Record<TeamAccent, string> = {
  blue: "border-white/20 bg-white/5",
  emerald: "border-white/20 bg-white/5",
  orange: "border-white/20 bg-white/5",
  violet: "border-white/20 bg-white/5",
  amber: "border-white/20 bg-white/5",
};

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const [pauseHover, setPauseHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const n = TEAM.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const restartAutoplayTimer = useCallback(() => {
    setAutoplayEpoch((x) => x + 1);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      restartAutoplayTimer();
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return n - 1;
        if (next >= n) return 0;
        return next;
      });
    },
    [n, restartAutoplayTimer]
  );

  const goTo = useCallback(
    (i: number) => {
      restartAutoplayTimer();
      setIndex(((i % n) + n) % n);
    },
    [n, restartAutoplayTimer]
  );

  useEffect(() => {
    if (pauseHover) return;
    const ms = reducedMotion ? Math.round(AUTOPLAY_MS * 1.75) : AUTOPLAY_MS;
    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setIndex((i) => (i + 1) % n);
    }, ms);
    return () => window.clearInterval(id);
  }, [reducedMotion, pauseHover, autoplayEpoch, n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      id="nosotros"
      className="scroll-mt-20 border-t border-white/10 bg-[var(--lp-graphite)] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Sobre el equipo</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-white/65">
          Abogados con experiencia en PyMEs, negocio y cumplimiento.
        </p>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPauseHover(true)}
          onMouseLeave={() => setPauseHover(false)}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 md:-left-2 lg:-left-5"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 md:-right-2 lg:-right-5"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="touch-pan-y overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.35)]"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              touchStartX.current = null;
              if (start == null) return;
              const end = e.changedTouches[0].clientX;
              const dx = end - start;
              if (Math.abs(dx) < 40) return;
              if (dx < 0) go(1);
              else go(-1);
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translate3d(-${index * 100}%, 0, 0)`,
                transition: `transform ${TRANSITION_MS}ms ${EASE}`,
                backfaceVisibility: "hidden",
              }}
            >
              {TEAM.map((member, i) => (
                <article
                  key={member.id}
                  className="w-full shrink-0 px-4 py-6 sm:px-8 sm:py-8"
                  aria-hidden={index !== i}
                >
                  <div className="mx-auto max-w-xl">
                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
                      <div
                        className={`relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-[var(--lp-graphite)] ${ACCENT_RING[member.accent]}`}
                      >
                        <Image
                          src={member.imageSrc}
                          alt={member.name}
                          width={280}
                          height={280}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: member.imagePosition ?? "50% 50%" }}
                          sizes="140px"
                          priority={i === 0}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/65">{member.role}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                          {member.stats.map((s) => (
                            <div
                              key={s.value + s.label}
                              className={`rounded-xl border px-3 py-2.5 text-center ${ACCENT_STAT[member.accent]}`}
                            >
                              <p className="text-lg font-bold tabular-nums text-white sm:text-xl">
                                {s.value}
                              </p>
                              <p className="text-[11px] leading-tight text-white/55 sm:text-xs">
                                {s.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-left text-sm leading-relaxed text-white/85 sm:text-[15px]">
                      {member.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                      {member.tags.map((t) => (
                        <span
                          key={t}
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs ${ACCENT_TAG[member.accent]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`mailto:${member.email}`}
                      className="mt-6 flex items-center justify-center gap-2 border-t border-white/15 pt-5 text-sm text-white/65 transition hover:text-white sm:justify-start"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
                      <span className="break-all text-left font-medium text-white/90">
                        {member.email}
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TEAM.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
                aria-label={`Perfil ${i + 1} de ${n}: ${m.name}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
