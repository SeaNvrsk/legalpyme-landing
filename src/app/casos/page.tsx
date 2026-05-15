"use client";

import MarketingSiteNav from "@/components/MarketingSiteNav";
import SectionIndexRail from "@/components/SectionIndexRail";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import SiteFooter from "@/components/SiteFooter";
import { CASOS } from "@/lib/site-content";

export default function CasosPage() {
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

          <div className="mt-16 space-y-0 divide-y divide-neutral-100">
            {CASOS.map((c, i) => (
              <ScrollReveal key={c.titulo} delayMs={Math.min(i * 60, 360)}>
                <div className="py-8">
                  <div className="flex items-start gap-6">
                    <span className="shrink-0 text-sm font-normal tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-neutral-950">{c.titulo}</p>
                      <p className="mt-1 text-xs text-neutral-400">{c.subtitulo}</p>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{c.resultado}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
