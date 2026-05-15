"use client";

import Image from "next/image";
import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import MarketingSiteNav from "@/components/MarketingSiteNav";
import ContactSection from "@/components/ContactSection";
import ScrollCountUp from "@/components/ScrollCountUp";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollScrubSlide, { useFoldProgress } from "@/components/ScrollScrubSlide";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import SectionIndexRail from "@/components/SectionIndexRail";
import FaqRouletteIndex, { useFaqRouletteSpin } from "@/components/FaqRouletteIndex";
import SiteFooter from "@/components/SiteFooter";
import { CASOS, SERVICIOS } from "@/lib/site-content";

const FAQ = [
  {
    q: "¿Cuánto cuesta trabajar con ustedes?",
    a: "Trabajamos con esquemas flexibles: por proyecto, por hora o con una tarifa mensual fija según el nivel de acompañamiento que necesite su empresa. En la primera consulta —que es gratuita— le presentamos una propuesta concreta basada en su situación real.",
  },
  {
    q: "¿Qué pasa en la primera orientación gratuita?",
    a: "Escuchamos su situación, identificamos los riesgos más urgentes y le explicamos con claridad qué opciones tiene. Al terminar, sabrá exactamente en qué situación se encuentra su empresa.",
  },
  {
    q: "¿Cuánto tiempo toma regularizar mi empresa?",
    a: "En la mayoría de los casos el proceso toma entre tres y seis meses. Desde el primer mes, su empresa ya estará en una posición más sólida y con los riesgos más críticos bajo control.",
  },
  {
    q: "Ya tengo un problema legal activo, ¿todavía pueden ayudarme?",
    a: "Sí. Contamos con un área de litigio laboral activa y experimentada. Cuanto antes nos contacte, más opciones tenemos para actuar.",
  },
  {
    q: "¿Trabajan solo con empresas grandes?",
    a: "No. Trabajamos con empresas de todos los tamaños. Acompañar a una empresa desde sus primeras etapas es una de las formas más efectivas de evitar problemas costosos más adelante.",
  },
  {
    q: "Llevo años operando sin toda la documentación en regla. ¿Es demasiado tarde?",
    a: "Nunca es tarde. Lo importante es saber exactamente en qué situación está su empresa hoy. A partir de ahí, trazamos un plan realista.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqSectionRef = useRef<HTMLElement | null>(null);
  const darkHeroRef = useRef<HTMLElement | null>(null);
  const comoFoldRef = useRef<HTMLDivElement>(null);
  const comoFoldProgress = useFoldProgress(comoFoldRef);
  const faqSpinKey = useFaqRouletteSpin(faqSectionRef);

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] selection:bg-neutral-200">
      <MarketingSiteNav darkBackdropRef={darkHeroRef} />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO + STATS (dark photo section)
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={darkHeroRef} className="relative bg-neutral-950 text-white">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero-building.jpg"
            alt="Torre de oficinas con fachada de cristal en Polanco, Ciudad de México"
            fill
            className="object-cover object-[center_22%] sm:object-center"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/28 to-black/68" />
        </div>

        <div className="relative z-10">
          {/* Hero area */}
          <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 pb-12 pt-28 sm:px-8">
            <SectionIndexRail variant="dark" label="LegalPyme" className="mb-4" />
            <p className="max-w-sm text-sm italic leading-relaxed text-white/60">
              LegalPyme es un despacho con más de 25 años de experiencia en derecho empresarial.
            </p>

            {/* Main headline */}
            <div className="my-auto flex items-center py-20">
              <ScrollTextReveal
                as="h1"
                className="text-5xl font-normal leading-[0.95] tracking-tight sm:text-7xl lg:text-[7.5rem]"
              >
                Derecho con visión de negocio.
              </ScrollTextReveal>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">
                Scroll to explore
              </span>
              <ChevronDown className="lp-scroll-hint h-4 w-4 text-white/50" aria-hidden />
            </div>
          </div>

          {/* Stats area (still on dark photo) */}
          <div className="mx-auto w-full max-w-6xl border-t border-white/10 px-6 py-24 sm:px-8 lg:py-32">
            <SectionIndexRail variant="dark" label="Company" className="mb-8" />

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Un equipo de abogados con experiencia real en la operación de negocios.
              Asesoramos empresas de todos los tamaños en las áreas más complejas del derecho empresarial.
            </p>

            {/* Numbers */}
            <div className="mt-20 grid gap-8 sm:grid-cols-3">
              <ScrollReveal>
                <div>
                  <p className="text-6xl font-normal tracking-tight sm:text-7xl lg:text-8xl">
                    <ScrollCountUp end={25} />
                  </p>
                  <p className="mt-2 text-sm text-white/50">años</p>
                  <p className="mt-1 text-xs text-white/40">experiencia en derecho empresarial</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delayMs={120}>
                <div>
                  <p className="text-6xl font-normal tracking-tight sm:text-7xl lg:text-8xl">
                    +<ScrollCountUp end={50} />k
                  </p>
                  <p className="mt-2 text-sm text-white/50">casos</p>
                  <p className="mt-1 text-xs text-white/40">asesorados exitosamente</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delayMs={240}>
                <div>
                  <p className="text-6xl font-normal tracking-tight sm:text-7xl lg:text-8xl">
                    <ScrollCountUp end={4} />
                  </p>
                  <p className="mt-2 text-sm text-white/50">áreas</p>
                  <p className="mt-1 text-xs text-white/40">de práctica legal</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES (1.2)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="scroll-mt-20 py-28 lg:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Nuestros servicios" />

          <ScrollTextReveal
            as="h2"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Servicios legales para las áreas más complejas del derecho empresarial.
          </ScrollTextReveal>

          <ul className="mt-12 space-y-0 border-t border-neutral-200">
            {SERVICIOS.slice(0, 4).map((name, i) => (
              <ScrollReveal key={name} delayMs={Math.min(i * 60, 240)}>
                <li className="border-b border-neutral-100 py-4">
                  <span className="text-[15px] text-neutral-900">{name}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-950 underline-offset-4 transition hover:underline"
            >
              Ver todos los servicios
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-medium text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100"
            >
              Agenda una consulta gratuita
              <ArrowRight className="h-4 w-4 text-neutral-400" aria-hidden />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Photo break (2 images side by side with parallax) ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2" aria-hidden>
        <ParallaxImage
          src="/img/section-lawyer.jpg"
          className="h-[50vh] sm:h-[60vh]"
        />
        <ParallaxImage
          src="/img/section-arch.jpg"
          className="h-[50vh] sm:h-[60vh]"
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS (1.3)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-6xl overflow-x-hidden px-6 sm:px-8">
          <SectionIndexRail label="¿Cómo funciona?" />

          <div ref={comoFoldRef} className="mt-10">
            <ScrollTextReveal
              as="h2"
              className="max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Tres pasos para proteger tu empresa.
            </ScrollTextReveal>

            <div className="mt-16 space-y-14">
              {[
                {
                  step: "01",
                  title: "Analizamos tu situación",
                  body: "Nos cuentas cómo funciona tu negocio o qué problema tienes.",
                },
                {
                  step: "02",
                  title: "Definimos la mejor estrategia",
                  body: "Te explicamos qué hacer, cómo hacerlo y qué riesgos evitar.",
                },
                {
                  step: "03",
                  title: "Te acompañamos en la ejecución",
                  body: "Implementamos contigo las soluciones necesarias.",
                },
              ].map((row, i) => (
                <ScrollScrubSlide key={row.step} from={i % 2 === 0 ? "right" : "left"} progress={comoFoldProgress}>
                  <div className="flex items-start gap-6 border-b border-neutral-100 pb-10">
                    <span className="font-mono text-sm text-neutral-400">{row.step}</span>
                    <div>
                      <p className="text-xl font-medium text-neutral-950 sm:text-2xl">{row.title}</p>
                      <p className="mt-2 text-neutral-500">{row.body}</p>
                    </div>
                  </div>
                </ScrollScrubSlide>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CASE STUDIES (1.4)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="casos" className="scroll-mt-20 py-28 lg:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Casos reales" />

          <ScrollTextReveal
            as="h2"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ayudamos a nuestros clientes a alcanzar sus objetivos.
          </ScrollTextReveal>

          <div className="mt-12 space-y-0 divide-y divide-neutral-100">
            {CASOS.slice(0, 2).map((c, i) => (
              <ScrollReveal key={c.titulo} delayMs={Math.min(i * 60, 200)}>
                <div className="py-8">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-sm text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
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

          <ScrollReveal className="mt-8">
            <Link
              href="/casos"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-950 underline-offset-4 transition hover:underline"
            >
              Ver todos los casos
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Photo break (single full-bleed with parallax) ─── */}
      <ParallaxImage
        src="/img/section-docs.jpg"
        className="h-[50vh] sm:h-[60vh]"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ (1.5)
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={faqSectionRef}
        id="faq"
        className="scroll-mt-20 py-28 lg:py-40"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Preguntas frecuentes" />

          <ScrollTextReveal
            as="h2"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Resolvemos tus dudas.
          </ScrollTextReveal>

          <div className="mt-12 divide-y divide-neutral-100">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delayMs={Math.min(i * 40, 280)}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <FaqRouletteIndex value={i + 1} rowIndex={i} spinKey={faqSpinKey} />
                      <span className="text-[15px] font-medium leading-snug text-neutral-950">{f.q}</span>
                    </div>
                    <HelpCircle className={`h-5 w-5 shrink-0 transition ${openFaq === i ? "rotate-45 text-neutral-950" : "text-neutral-300"}`} />
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 pl-10 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team teaser → /equipo ─── */}
      <section id="nosotros" className="scroll-mt-20 py-28 lg:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionIndexRail label="Equipo" />
          <h2 className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Sobre el equipo
          </h2>
          <p className="mt-4 max-w-xl text-neutral-500">
            Abogados con experiencia en PyMEs, negocio y cumplimiento.
          </p>
          <ScrollReveal className="mt-10">
            <Link
              href="/equipo"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-950 underline-offset-4 transition hover:underline"
            >
              Conocer al equipo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      <SiteFooter />
    </div>
  );
}
