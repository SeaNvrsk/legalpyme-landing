"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { TEAM } from "@/lib/team";
import ScrollReveal from "@/components/ScrollReveal";
import SectionIndexRail from "@/components/SectionIndexRail";

type TeamCarouselProps = {
  /** On the home page: anchor #nosotros and h2. On /equipo: document h1 and no section id. */
  variant?: "home" | "page";
};

export default function TeamCarousel({ variant = "home" }: TeamCarouselProps) {
  const isPage = variant === "page";
  const HeadingTag = isPage ? "h1" : "h2";
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-team-card]");
    const gap = 24;
    const w = card?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: direction * (w + gap), behavior: "smooth" });
  };

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
            aria-label="Tarjeta anterior"
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Tarjeta siguiente"
            onClick={() => scrollByCard(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-6 mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 pt-2 [scrollbar-width:thin] sm:-mx-8 sm:px-8"
        >
          {TEAM.map((member, i) => (
            <article
              key={member.id}
              data-team-card
              className="w-[min(22rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-[26rem]"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[3/4] w-full bg-neutral-100">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 90vw, 416px"
                    className="object-cover"
                    style={{ objectPosition: member.imagePosition ?? "50% 50%" }}
                    priority={i === 0}
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
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-950"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="min-w-0 break-all">{member.email}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
