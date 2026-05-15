"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MarketingSiteNav from "@/components/MarketingSiteNav";
import SectionIndexRail from "@/components/SectionIndexRail";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import SiteFooter from "@/components/SiteFooter";
import { CASOS } from "@/lib/site-content";

export default function CasosPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] selection:bg-neutral-200">
      <MarketingSiteNav />

      <section className="scroll-mt-20 py-28 pt-32 lg:py-40 lg:pt-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Casos reales" />

          <ScrollTextReveal
            as="h1"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ayudamos a nuestros clientes a alcanzar sus objetivos.
          </ScrollTextReveal>

          <div className="mt-16 flex flex-col gap-4 sm:gap-5">
            {CASOS.map((c, i) => {
              const open = openIndex === i;
              const panelId = `caso-panel-${i}`;

              return (
                <ScrollReveal key={c.titulo} delayMs={Math.min(i * 60, 360)}>
                  <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <button
                      type="button"
                      id={`caso-trigger-${i}`}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-start gap-4 p-5 text-left sm:gap-6 sm:p-6"
                    >
                      <span className="shrink-0 pt-0.5 text-sm font-normal tabular-nums text-neutral-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-950">{c.titulo}</p>
                        <p className="mt-1 text-xs text-neutral-400">{c.subtitulo}</p>
                      </div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={`caso-trigger-${i}`}
                          className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
                        >
                          <div className="flex gap-4 sm:gap-6">
                            <span className="invisible shrink-0 select-none text-sm font-normal tabular-nums" aria-hidden>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="min-w-0 flex-1 text-sm leading-relaxed text-neutral-600">{c.resultado}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
