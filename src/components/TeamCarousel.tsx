"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { TEAM, type TeamAccent, type TeamMember } from "@/lib/team";

const TRANSITION_MS = 650;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const AUTOPLAY_MS = 5000;
/** Two cards side-by-side from this breakpoint up */
const TWO_COL_MEDIA = "(min-width: 1024px)";

const ACCENT_RING: Record<TeamAccent, string> = {
  blue: "ring-blue-500/45",
  emerald: "ring-emerald-500/45",
  orange: "ring-orange-500/45",
  violet: "ring-violet-500/45",
  amber: "ring-amber-500/45",
};

const ACCENT_TAG: Record<TeamAccent, string> = {
  blue: "border-neutral-200 bg-white text-neutral-800",
  emerald: "border-neutral-200 bg-white text-neutral-800",
  orange: "border-neutral-200 bg-white text-neutral-800",
  violet: "border-neutral-200 bg-white text-neutral-800",
  amber: "border-neutral-200 bg-white text-neutral-800",
};

const ACCENT_STAT: Record<TeamAccent, string> = {
  blue: "border-neutral-200 bg-neutral-50",
  emerald: "border-neutral-200 bg-neutral-50",
  orange: "border-neutral-200 bg-neutral-50",
  violet: "border-neutral-200 bg-neutral-50",
  amber: "border-neutral-200 bg-neutral-50",
};

type ExtSlide = { member: TeamMember; reactKey: string };

function buildExtendedSlides(members: TeamMember[], cloneCount: number): ExtSlide[] {
  const n = members.length;
  const k = Math.min(cloneCount, n);
  const prepend = members.slice(-k).map((m, i) => ({
    member: m,
    reactKey: `pre-${k}-${i}-${m.id}`,
  }));
  const middle = members.map((m) => ({
    member: m,
    reactKey: `mid-${m.id}`,
  }));
  const append = members.slice(0, k).map((m, i) => ({
    member: m,
    reactKey: `post-${k}-${i}-${m.id}`,
  }));
  return [...prepend, ...middle, ...append];
}

/** First TEAM index shown at this extended track index (for pagination). */
function extIndexToTeamFirst(extIndex: number, k: number, n: number): number {
  if (extIndex < k) return n - k + extIndex;
  if (extIndex < k + n) return extIndex - k;
  return extIndex - k - n;
}

export default function TeamCarousel() {
  const [index, setIndex] = useState(1);
  const [perView, setPerView] = useState(1);
  const [viewportW, setViewportW] = useState(0);
  const [pauseHover, setPauseHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const n = TEAM.length;
  const activePerView = Math.max(1, Math.min(perView, n));
  const maxIndex = Math.max(0, n - activePerView);
  const k = activePerView;

  const extended = useMemo(() => buildExtendedSlides(TEAM, k), [k, n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(TWO_COL_MEDIA);
    const sync = () => setPerView(mq.matches ? 2 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportW(el.clientWidth));
    ro.observe(el);
    setViewportW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex(k);
  }, [k]);

  const slideWidth = viewportW > 0 ? viewportW / activePerView : 0;
  const translateX = index * slideWidth;

  const onTrackTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (e.target !== trackRef.current) return;
      setIndex((i) => {
        if (i >= k + n) return i - n;
        if (i < k) return i + n;
        return i;
      });
      setNoTransition(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    },
    [k, n]
  );

  const restartAutoplayTimer = useCallback(() => {
    setAutoplayEpoch((x) => x + 1);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      restartAutoplayTimer();
      if (maxIndex <= 0) return;
      if (reducedMotion) {
        setIndex((i) => {
          const page = ((i - k + (maxIndex + 1)) % (maxIndex + 1) + (maxIndex + 1)) % (maxIndex + 1);
          const nextPage = (page + dir + (maxIndex + 1)) % (maxIndex + 1);
          return k + nextPage;
        });
        return;
      }
      setIndex((i) => i + dir);
    },
    [k, maxIndex, reducedMotion, restartAutoplayTimer]
  );

  const goTo = useCallback(
    (page: number) => {
      restartAutoplayTimer();
      setIndex(k + Math.min(Math.max(0, page), maxIndex));
    },
    [k, maxIndex, restartAutoplayTimer]
  );

  useEffect(() => {
    if (pauseHover) return;
    const ms = reducedMotion ? Math.round(AUTOPLAY_MS * 1.75) : AUTOPLAY_MS;
    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      if (maxIndex <= 0) return;
      if (reducedMotion) {
        setIndex((i) => {
          const page = ((i - k + (maxIndex + 1)) % (maxIndex + 1) + (maxIndex + 1)) % (maxIndex + 1);
          const nextPage = (page + 1) % (maxIndex + 1);
          return k + nextPage;
        });
        return;
      }
      setIndex((i) => i + 1);
    }, ms);
    return () => window.clearInterval(id);
  }, [reducedMotion, pauseHover, autoplayEpoch, maxIndex, k]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const rawFirst = extIndexToTeamFirst(index, k, n);
  const activeDot =
    maxIndex <= 0 ? 0 : rawFirst > maxIndex ? 0 : Math.min(rawFirst, maxIndex);

  return (
    <section
      id="nosotros"
      className="scroll-mt-20 border-t border-[var(--lp-band-fg)]/10 bg-[var(--lp-band-bg)] py-20 text-neutral-900 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 lg:max-w-6xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Sobre el equipo</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-neutral-600">
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
            className="absolute left-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-neutral-300 bg-white/95 p-2.5 text-neutral-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white md:-left-2 lg:-left-4"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-[min(280px,35%)] z-10 -translate-y-1/2 rounded-full border border-neutral-300 bg-white/95 p-2.5 text-neutral-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white md:-right-2 lg:-right-4"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={viewportRef}
            className="touch-pan-y overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_80px_-20px_rgba(0,0,0,0.12)]"
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
              ref={trackRef}
              className="flex items-stretch"
              onTransitionEnd={reducedMotion ? undefined : onTrackTransitionEnd}
              style={{
                transform:
                  slideWidth > 0 ? `translate3d(-${translateX}px, 0, 0)` : undefined,
                transition:
                  noTransition || reducedMotion
                    ? "none"
                    : `transform ${TRANSITION_MS}ms ${EASE}`,
                backfaceVisibility: "hidden",
              }}
            >
              {extended.map((slide, i) => {
                const { member } = slide;
                const inView = i >= index && i < index + activePerView;
                const teamIdx = TEAM.findIndex((t) => t.id === member.id);
                const isFirstOriginal = slide.reactKey.startsWith("mid-") && teamIdx === 0;
                return (
                  <article
                    key={slide.reactKey}
                    className="flex shrink-0 flex-col px-3 py-6 sm:px-6 sm:py-8 lg:px-5 lg:py-8"
                    style={{
                      width: slideWidth > 0 ? `${slideWidth}px` : `${100 / activePerView}%`,
                    }}
                    aria-hidden={!inView}
                  >
                    <div className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col lg:max-w-none">
                      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
                        <div
                          className={`relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-white sm:h-[140px] sm:w-[140px] ${ACCENT_RING[member.accent]}`}
                        >
                          <Image
                            src={member.imageSrc}
                            alt={member.name}
                            width={280}
                            height={280}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: member.imagePosition ?? "50% 50%" }}
                            sizes="(max-width: 1024px) 120px, 140px"
                            priority={isFirstOriginal && inView}
                          />
                        </div>
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                          <h3 className="text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">
                            {member.name}
                          </h3>
                          <p className="mt-1 text-sm text-neutral-600">{member.role}</p>
                          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                            {member.stats.map((s) => (
                              <div
                                key={s.value + s.label}
                                className={`rounded-xl border px-3 py-2.5 text-center ${ACCENT_STAT[member.accent]}`}
                              >
                                <p className="text-lg font-bold tabular-nums text-neutral-950 sm:text-xl">
                                  {s.value}
                                </p>
                                <p className="text-[11px] leading-tight text-neutral-600 sm:text-xs">
                                  {s.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-left text-sm leading-relaxed text-neutral-700 sm:text-[15px]">
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

                      <div className="mt-auto border-t border-neutral-200 pt-5">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950 sm:justify-start"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                          <span className="break-all text-left font-medium text-neutral-900">
                            {member.email}
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  i === activeDot
                    ? "w-8 bg-neutral-900"
                    : "w-2.5 bg-neutral-900/30 hover:bg-neutral-900/50"
                }`}
                aria-label={`Posición ${i + 1} de ${maxIndex + 1}`}
                aria-current={i === activeDot}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
