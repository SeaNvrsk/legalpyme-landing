"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingSiteNav from "@/components/MarketingSiteNav";
import SectionIndexRail from "@/components/SectionIndexRail";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import SiteFooter from "@/components/SiteFooter";
import { SERVICIOS } from "@/lib/site-content";

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] selection:bg-neutral-200">
      <MarketingSiteNav />

      <section className="scroll-mt-20 py-28 pt-32 lg:py-40 lg:pt-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Nuestros servicios" />

          <ScrollTextReveal
            as="h1"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Servicios legales para las áreas más complejas del derecho empresarial.
          </ScrollTextReveal>

          <div className="mt-16 grid gap-x-12 border-t border-neutral-200 sm:grid-cols-2">
            {SERVICIOS.map((name, i) => (
              <ScrollReveal key={name} delayMs={Math.min(i * 60, 400)}>
                <div className="border-b border-neutral-100 py-5">
                  <span className="text-[15px] text-neutral-900">{name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-5 transition hover:border-neutral-300 hover:bg-neutral-100"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Servicios</p>
                <p className="mt-1 text-sm font-medium text-neutral-900">Agenda una consulta gratuita.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-neutral-400" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
