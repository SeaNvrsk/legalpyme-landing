"use client";

import Image from "next/image";
import {
  type TransitionEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { TEAM, type TeamMember } from "@/lib/team";
import ScrollReveal from "@/components/ScrollReveal";
import SectionIndexRail from "@/components/SectionIndexRail";

const CARD_GAP_PX = 24;

type SlideItem = { member: TeamMember; slideKey: string; clone: boolean };

type TeamCarouselProps = {
  /** On the home page: anchor #nosotros and h2. On /equipo: document h1 and no section id. */
  variant?: "home" | "page";
};

function buildInfiniteSlides(): SlideItem[] {
  const n = TEAM.length;
  if (n === 0) return [];
  return [
    { member: TEAM[n - 1], slideKey: `${TEAM[n - 1].id}__prev`, clone: true },
    ...TEAM.map((m) => ({ member: m, slideKey: m.id, clone: false })),
    { member: TEAM[0], slideKey: `${TEAM[0].id}__next`, clone: true },
  ];
}

export default function TeamCarousel({ variant = "home" }: TeamCarouselProps) {
  const isPage = variant === "page";
  const HeadingTag = isPage ? "h1" : "h2";

  const slides = useMemo(() => buildInfiniteSlides(), []);
  const lastSlide = slides.length - 1;

  const [slideIndex, setSlideIndex] = useState(1);
  const [transitionOn, setTransitionOn] = useState(true);
  const [stepPx, setStepPx] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const slideIndexRef = useRef(slideIndex);
  slideIndexRef.current = slideIndex;

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    if (!isPage) return;
    const vp = viewportRef.current;
    if (!vp) return;

    const measure = () => {
      const card = vp.querySelector<HTMLElement>("[data-carousel-card]");
      if (card?.offsetWidth) setStepPx(card.offsetWidth + CARD_GAP_PX);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    const first = vp.querySelector<HTMLElement>("[data-carousel-card]");
    if (first) ro.observe(first);
    return () => ro.disconnect();
  }, [isPage]);

  const settleInfinite = useCallback(() => {
    const i = slideIndexRef.current;
    if (i === lastSlide) {
      setTransitionOn(false);
      setSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionOn(true));
      });
    } else if (i === 0) {
      setTransitionOn(false);
      setSlideIndex(TEAM.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionOn(true));
      });
    }
  }, [lastSlide]);

  const onTrackTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      settleInfinite();
    },
    [settleInfinite]
  );

  const bump = useCallback(
    (dir: -1 | 1) => {
      setSlideIndex((prev) => {
        const next = prev + dir;
        if (next < 0 || next > lastSlide) return prev;
        return next;
      });
    },
    [lastSlide]
  );

  const touchStartX = useRef<number | null>(null);

  if (!isPage) {
    return (
      <section id="nosotros" className="scroll-mt-20 py-28 lg:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Equipo" />
          <HeadingTag className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Sobre el equipo
          </HeadingTag>
          <p className="mt-4 max-w-xl text-neutral-500">
            Abogados con experiencia en PyMEs, negocio y cumplimiento.
          </p>
          <div className="mt-16 divide-y divide-neutral-100">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.id} delayMs={Math.min(i * 80, 400)}>
                <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:gap-8">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      width={192}
                      height={192}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: member.imagePosition ?? "50% 50%" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-950">{member.name}</h3>
                      <p className="mt-0.5 text-sm text-neutral-500">{member.role}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                      {member.tags.map((t) => (
                        <span key={t} className="text-xs text-neutral-400">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-950"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const offsetPx = stepPx > 0 ? slideIndex * stepPx : 0;
  const transitionClass =
    transitionOn && !reduceMotion
      ? "transition-transform duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      : "transition-none duration-0";

  return (
    <section className="scroll-mt-20 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionIndexRail label="Equipo" />

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white p-8 sm:p-10">
          <h2 className="text-lg font-medium tracking-tight text-neutral-950 sm:text-xl">
            Un despacho pensado para empresas en México
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
            LegalPyme reúne más de 25 años de práctica en derecho empresarial: cumplimiento laboral y fiscal,
            contratos, prevención de riesgos y acompañamiento en litigios cuando hace falta. Trabajamos con
            PyMEs y equipos corporativos que necesitan respuestas claras, ejecutables y alineadas con la
            operación real del negocio.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
            El equipo que verás a continuación combina formación en las principales universidades del país con
            experiencia recurrente ante autoridades, tribunales y mesas de negociación. Socios, asociados y
            abogados colaboran de forma integrada para que cada asunto tenga el nivel de profundidad que
            merece.
          </p>
        </div>

        <HeadingTag className="mt-14 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Sobre el equipo
        </HeadingTag>
        <p className="mt-4 max-w-xl text-neutral-500">
          Abogados con experiencia en PyMEs, negocio y cumplimiento.
        </p>

        <div className="mt-8 flex items-center justify-end gap-2 sm:mt-10">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => bump(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => bump(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div
          ref={viewportRef}
          className="-mx-6 mt-4 overflow-hidden px-6 pb-2 pt-2 sm:-mx-8 sm:px-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start == null) return;
            const end = e.changedTouches[0]?.clientX ?? start;
            const d = end - start;
            if (d < -52) bump(1);
            else if (d > 52) bump(-1);
          }}
        >
          <div
            className={`flex gap-6 will-change-transform ${transitionClass} ${stepPx === 0 ? "opacity-0" : "opacity-100"}`}
            style={{ transform: `translate3d(-${offsetPx}px, 0, 0)` }}
            onTransitionEnd={onTrackTransitionEnd}
          >
            {slides.map((slide, i) => {
              const { member } = slide;
              return (
                <article
                  key={slide.slideKey}
                  data-carousel-card
                  aria-hidden={slide.clone ? true : undefined}
                  className="w-[min(22rem,calc(100vw-3rem))] shrink-0 sm:w-[26rem]"
                >
                  <div
                    className={`flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${slide.clone ? "pointer-events-none" : ""}`}
                    inert={slide.clone ? true : undefined}
                  >
                    <div className="relative aspect-[3/4] w-full bg-neutral-100">
                      <Image
                        src={member.imageSrc}
                        alt={slide.clone ? "" : member.name}
                        fill
                        sizes="(max-width: 640px) 90vw, 416px"
                        className="object-cover"
                        style={{ objectPosition: member.imagePosition ?? "50% 50%" }}
                        priority={i === 1}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-lg font-medium text-neutral-950">{member.name}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{member.role}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                        {member.tags.map((t) => (
                          <span key={t} className="text-xs text-neutral-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        tabIndex={slide.clone ? -1 : undefined}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-950"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span className="min-w-0 break-all">{member.email}</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
