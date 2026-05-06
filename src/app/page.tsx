"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import FaqScrollArt from "@/components/FaqScrollArt";
import ContactSection from "@/components/ContactSection";
import ScrollCountUp from "@/components/ScrollCountUp";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollScrubSlide, { useFoldProgress } from "@/components/ScrollScrubSlide";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import SiteFooter from "@/components/SiteFooter";
import TeamCarousel from "@/components/TeamCarousel";

const SERVICIOS = [
  "Estructura legal y fiscal",
  "Protección de operación y patrimonio",
  "Prevención de riesgos legales",
  "Resolución de conflictos",
  "Contratos corporativos",
  "Cumplimiento laboral",
  "Defensa fiscal",
  "Asesoría para socios",
];

const CASOS = [
  {
    titulo: "Su socio intentó quedarse con el negocio",
    subtitulo: "Empresa comercial · Ciudad de México",
    resultado:
      "El cliente recuperó el control total de la empresa. Reestructuramos el pacto de socios para evitar que se repita.",
  },
  {
    titulo: "Startup con irregularidades corporativas",
    subtitulo: "Tecnología · Guadalajara",
    resultado:
      "Regularizamos actas, contratos y estructura accionaria en 6 semanas. La empresa cerró su ronda de inversión sin contratiempos.",
  },
  {
    titulo: "Costos laborales ocultos",
    subtitulo: "Sector salud",
    resultado:
      "Rediseñamos el esquema de contratación. Eliminamos una contingencia laboral de millones de pesos.",
  },
  {
    titulo: "Conflicto que amenazaba a una escuela",
    subtitulo: "Educación · Estado de México",
    resultado:
      "Contingencia resuelta sin juicio. La institución cuenta hoy con reglamentos y contratos que la protegen.",
  },
  {
    titulo: "Dividendos y revisión fiscal",
    subtitulo: "Sector inmobiliario",
    resultado:
      "Reparto de utilidades blindado fiscalmente. Marcas vigentes, sin contingencias pendientes.",
  },
  {
    titulo: "Proveedor clave que frenaba la operación",
    subtitulo: "Retail · Monterrey",
    resultado:
      "Aclaramos un contrato ambiguo, fijamos entregas y penalidades. La cadena de suministro se restableció sin juicio.",
  },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const faqSectionRef = useRef<HTMLElement | null>(null);
  const comoFoldRef = useRef<HTMLDivElement>(null);
  const comoFoldProgress = useFoldProgress(comoFoldRef);

  const onTopNavClick = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] selection:bg-neutral-200">
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-250 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 z-50 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <BrandLogo size="md" variant="onDark" />
            <span className="text-lg font-medium tracking-tight text-white">
              LegalPyme<span className="text-white/50">.mx</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#servicios"
              onClick={(e) => { e.preventDefault(); onTopNavClick("servicios"); }}
              className="text-sm text-white/70 transition hover:text-white"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={(e) => { e.preventDefault(); onTopNavClick("nosotros"); }}
              className="text-sm text-white/70 transition hover:text-white"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Contacto
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`bg-neutral-950/95 px-6 backdrop-blur-lg md:hidden ${
            mobileMenuOpen ? "max-h-52 pb-5 pt-4" : "max-h-0 overflow-hidden pb-0 pt-0"
          } transition-[max-height,padding] duration-300 ease-out`}
        >
          <div className="flex flex-col gap-4">
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Servicios</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Nosotros</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Contacto</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO + STATS (dark photo section)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-neutral-950 text-white">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero-building.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10">
          {/* Hero area */}
          <div className="flex min-h-[100dvh] flex-col px-6 pb-12 pt-28 sm:px-8">
            {/* Intro line + 1.0 */}
            <div className="flex items-baseline justify-between">
              <p className="max-w-sm text-sm italic leading-relaxed text-white/60">
                LegalPyme es un despacho con más de 25 años de experiencia en derecho empresarial.
              </p>
              <span className="font-mono text-xs text-white/40">1.0</span>
            </div>

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
          <div className="border-t border-white/10 px-6 py-24 sm:px-8 lg:py-32">
            {/* Section header */}
            <div className="flex items-baseline justify-between pb-6">
              <span className="text-sm text-white/50">Company</span>
              <span className="font-mono text-xs text-white/40">1.1</span>
            </div>

            {/* Description */}
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div />
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                Un equipo de abogados con experiencia real en la operación de negocios.
                Asesoramos empresas de todos los tamaños en las áreas más complejas del derecho empresarial.
              </p>
            </div>

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
          {/* Section header */}
          <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
            <span className="text-sm text-neutral-500">Nuestros servicios</span>
            <span className="font-mono text-xs text-neutral-400">1.2</span>
          </div>

          {/* Large heading */}
          <ScrollTextReveal
            as="h2"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Servicios legales para las áreas más complejas del derecho empresarial.
          </ScrollTextReveal>

          {/* Two-column ruled list */}
          <div className="mt-16 grid gap-x-12 border-t border-neutral-200 sm:grid-cols-2">
            {SERVICIOS.map((name, i) => (
              <ScrollReveal key={name} delayMs={Math.min(i * 60, 400)}>
                <div className="flex items-baseline justify-between border-b border-neutral-100 py-5">
                  <span className="text-[15px] text-neutral-900">{name}</span>
                  <span className="font-mono text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA card */}
          <ScrollReveal className="mt-16">
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-5 transition hover:border-neutral-300 hover:bg-neutral-100"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Servicios</p>
                <p className="mt-1 text-sm font-medium text-neutral-900">Agenda una consulta gratuita.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-neutral-400" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Photo break (2 images side by side) ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2" aria-hidden>
        <div className="relative h-[50vh] sm:h-[60vh]">
          <Image
            src="/img/section-lawyer.jpg"
            alt=""
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative h-[50vh] sm:h-[60vh]">
          <Image
            src="/img/section-arch.jpg"
            alt=""
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS (1.3)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-6xl overflow-x-hidden px-6 sm:px-8">
          {/* Section header */}
          <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
            <span className="text-sm text-neutral-500">¿Cómo funciona?</span>
            <span className="font-mono text-xs text-neutral-400">1.3</span>
          </div>

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
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          {/* Section header */}
          <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
            <span className="text-sm text-neutral-500">Casos reales</span>
            <span className="font-mono text-xs text-neutral-400">1.4</span>
          </div>

          <ScrollTextReveal
            as="h2"
            className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ayudamos a nuestros clientes a alcanzar sus objetivos.
          </ScrollTextReveal>

          <div className="mt-16 space-y-0 divide-y divide-neutral-100">
            {CASOS.map((c, i) => (
              <ScrollReveal key={c.titulo} delayMs={Math.min(i * 60, 360)}>
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
        </div>
      </section>

      {/* ─── Photo break (single full-bleed) ─── */}
      <section className="relative h-[50vh] sm:h-[60vh]" aria-hidden>
        <Image
          src="/img/section-lawyer.jpg"
          alt=""
          fill
          className="object-cover"
          loading="lazy"
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ (1.5)
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={faqSectionRef}
        id="faq"
        className="scroll-mt-20 py-28 lg:py-40"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-12 md:grid-cols-12 md:items-start md:gap-10">
            <div className="md:col-span-7">
              {/* Section header */}
              <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
                <span className="text-sm text-neutral-500">Preguntas frecuentes</span>
                <span className="font-mono text-xs text-neutral-400">1.5</span>
              </div>

              <ScrollTextReveal
                as="h2"
                className="mt-10 text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl"
              >
                Resolvemos tus dudas.
              </ScrollTextReveal>

              <div className="mt-10 md:hidden">
                <FaqScrollArt sectionRef={faqSectionRef} />
              </div>

              <div className="mt-12 divide-y divide-neutral-100">
                {FAQ.map((f, i) => (
                  <ScrollReveal key={f.q} delayMs={Math.min(i * 40, 280)}>
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-sm text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-[15px] font-medium text-neutral-950">{f.q}</span>
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
            <div className="relative hidden md:col-span-5 md:flex md:items-center md:justify-center md:py-12">
              <FaqScrollArt sectionRef={faqSectionRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <ScrollReveal>
        <TeamCarousel />
      </ScrollReveal>

      {/* ─── Contact ─── */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      <SiteFooter />
    </div>
  );
}
