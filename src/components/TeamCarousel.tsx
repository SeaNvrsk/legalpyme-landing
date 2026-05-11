"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { TEAM } from "@/lib/team";
import ScrollReveal from "@/components/ScrollReveal";
import SectionIndexRail from "@/components/SectionIndexRail";

type TeamCarouselProps = {
  /** On the home page: anchor #nosotros and h2. On /equipo: document h1 and no section id. */
  variant?: "home" | "page";
};

/**
 * Minimal team section matching the Maxima Legal editorial style:
 * section header row, large heading, clean list of team members.
 */
export default function TeamCarousel({ variant = "home" }: TeamCarouselProps) {
  const isPage = variant === "page";
  const HeadingTag = isPage ? "h1" : "h2";

  return (
    <section
      {...(!isPage ? { id: "nosotros" } : {})}
      className="scroll-mt-20 py-28 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionIndexRail label="Equipo" />

        <HeadingTag className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Sobre el equipo
        </HeadingTag>
        <p className="mt-4 max-w-xl text-neutral-500">
          Abogados con experiencia en PyMEs, negocio y cumplimiento.
        </p>

        {/* Team grid */}
        <div className="mt-16 divide-y divide-neutral-100">
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.id} delayMs={Math.min(i * 80, 400)}>
              <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:gap-8">
                {/* Photo */}
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

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-950">{member.name}</h3>
                    <p className="mt-0.5 text-sm text-neutral-500">{member.role}</p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {member.bio}
                  </p>

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
