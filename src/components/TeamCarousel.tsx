"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { TEAM, type TeamAccent } from "@/lib/team";

const TRANSITION_MS = 650;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const AUTOPLAY_MS = 5000;

const ACCENT_RING: Record<TeamAccent, string> = {
  blue: "ring-blue-500/45",
  emerald: "ring-emerald-500/45",
  orange: "ring-orange-400/50",
  violet: "ring-violet-500/45",
  amber: "ring-amber-400/50",
};

const ACCENT_TAG: Record<TeamAccent, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-100",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-100",
  violet: "border-violet-500/30 bg-violet-500/10 text-violet-100",
  amber: "border-amber-500/35 bg-amber-500/10 text-amber-100",
};

const ACCENT_STAT: Record<TeamAccent, string> = {
  blue: "border-blue-500/20 bg-blue-950/40",
  emerald: "border-emerald-500/20 bg-emerald-950/30",
  orange: "border-orange-500/20 bg-orange-950/30",
  violet: "border-violet-500/20 bg-violet-950/30",
  amber: "border-amber-500/25 bg-amber-950/30",
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
    <section id="nosotros" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Sobre el equipo</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
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
            className="absolute left-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/10 md:-left-2 lg:-left-5"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/10 md:-right-2 lg:-right-5"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="touch-pan-y overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black/60 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)]"
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
                        className={`relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-zinc-950 ${ACCENT_RING[member.accent]}`}
                      >
                        <Image
                          src={member.imageSrc}
                          alt={member.name}
                          width={280}
                          height={280}
                          className="h-full w-full object-cover"
                          sizes="140px"
                          priority={i === 0}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">{member.role}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                          {member.stats.map((s) => (
                            <div
                              key={s.value + s.label}
                              className={`rounded-xl border px-3 py-2.5 text-center ${ACCENT_STAT[member.accent]}`}
                            >
                              <p className="text-lg font-bold tabular-nums text-white sm:text-xl">
                                {s.value}
                              </p>
                              <p className="text-[11px] leading-tight text-zinc-500 sm:text-xs">
                                {s.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-left text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
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
                      className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-sm text-zinc-400 transition hover:text-white sm:justify-start"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                      <span className="break-all text-left font-medium text-zinc-300">
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
                    ? "w-8 bg-blue-500"
                    : "w-2.5 bg-zinc-600 hover:bg-zinc-500"
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
