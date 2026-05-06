"use client";

import Link from "next/link";
import {
  Users,
  AlertTriangle,
  Receipt,
  Scale,
  FileWarning,
  UserCircle,
  Layers,
  ShieldCheck,
  Building2,
  Gavel,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
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

const PROBLEMAS = [
  { text: "Estás contratando personal sin protección legal", icon: Users },
  { text: "Ya tienes un problema legal y no sabes por dónde empezar", icon: AlertTriangle },
  { text: "Estás pagando impuestos sin una estrategia clara", icon: Receipt },
  { text: "Tu negocio no está completamente en regla y puede generarte multas", icon: Scale },
  { text: "Tienes conflictos con socios, clientes o proveedores", icon: FileWarning },
  { text: "Tu empresa está a tu nombre personal y no sabes si eso te pone en riesgo", icon: UserCircle },
];

const SERVICIOS = [
  {
    title: "Estructura legal y fiscal desde el inicio",
    description:
      "Definimos la mejor base para tu empresa y evitamos errores que después cuestan tiempo y dinero.",
    icon: Layers,
  },
  {
    title: "Protege tu operación y tu patrimonio",
    description:
      "Contratos claros con socios, clientes y proveedores para que tu negocio no dependa de acuerdos de palabra.",
    icon: ShieldCheck,
  },
  {
    title: "Prevención de riesgos legales y fiscales",
    description:
      "Detectamos problemas antes de que se conviertan en multas, demandas o pérdidas.",
    icon: Building2,
  },
  {
    title: "Resolución de problemas legales",
    description:
      "Si ya estás en una situación complicada, diseñamos una estrategia para resolverla y reducir el impacto en tu negocio.",
    icon: Gavel,
  },
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
      "Aclaramos un contrato ambiguo, fijamos entregas y penalidades y acordamos una salida ordenada si fallaba el cumplimiento. La cadena de suministro se restableció sin juicio.",
  },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta trabajar con ustedes?",
    a: "Trabajamos con esquemas flexibles: por proyecto, por hora o con una tarifa mensual fija según el nivel de acompañamiento que necesite su empresa. En la primera consulta —que es gratuita— le presentamos una propuesta concreta basada en su situación real. No hay sorpresas ni letras pequeñas.",
  },
  {
    q: "¿Qué pasa en la primera orientación gratuita?",
    a: "Escuchamos su situación, identificamos los riesgos más urgentes y le explicamos con claridad qué opciones tiene. Al terminar, sabrá exactamente en qué situación se encuentra su empresa y cuáles son los siguientes pasos, sin compromiso de contratación.",
  },
  {
    q: "¿Cuánto tiempo toma regularizar mi empresa?",
    a: "Depende del punto de partida, pero en la mayoría de los casos el proceso toma entre tres y seis meses. Lo que sí podemos garantizar es que, desde el primer mes, su empresa ya estará en una posición más sólida y con los riesgos más críticos bajo control.",
  },
  {
    q: "¿Qué pasa si revisamos mi empresa y encontramos irregularidades graves?",
    a: "No entre en pánico: encontrar un problema es el primer paso para resolverlo. Hacemos una evaluación de riesgos, le explicamos el panorama completo y priorizamos las acciones según urgencia e impacto. Nuestro trabajo es acompañarle en ese proceso, no dejarlo solo frente a un diagnóstico.",
  },
  {
    q: "Ya tengo un problema legal activo, ¿todavía pueden ayudarme?",
    a: "Sí. Contamos con un área de litigio laboral activa y experimentada. Cuanto antes nos contacte, más opciones tenemos para actuar. No espere a que el problema escale.",
  },
  {
    q: "¿Cómo sé si realmente necesito un abogado?",
    a: "Una señal clara: si ya tuvo un problema y lo resolvió usted solo, probablemente pagó más de lo necesario o dejó un precedente que puede repetirse. Los conflictos laborales mal gestionados cuestan mucho más que la asesoría que los habría evitado. La consulta inicial es gratuita: en un día le decimos si realmente necesita apoyo o no.",
  },
  {
    q: "¿Trabajan solo con empresas grandes?",
    a: "No. Trabajamos con empresas de todos los tamaños, incluyendo negocios pequeños y emprendimientos en crecimiento. De hecho, acompañar a una empresa desde sus primeras etapas es una de las formas más efectivas de evitar problemas costosos más adelante.",
  },
  {
    q: "Llevo años operando sin toda la documentación en regla. ¿Es demasiado tarde?",
    a: "Nunca es tarde, pero sí hay un costo de esperar: cada mes que pasa sin regularizarse es un mes de exposición innecesaria. Lo importante es saber exactamente en qué situación está su empresa hoy. A partir de ahí, trazamos un plan realista. Muchos de nuestros clientes llegaron en situaciones similares y hoy operan con total tranquilidad.",
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

  const onMobileNavClick = useCallback(
    (targetId: string) => {
      setMobileMenuOpen(false);
      onTopNavClick(targetId);
    },
    [onTopNavClick]
  );

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
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <BrandLogo size="md" variant="onLight" />
            <span
              className="text-lg font-normal tracking-tight"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              LegalPyme<span className="text-neutral-400">.mx</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#servicios"
              onClick={(e) => { e.preventDefault(); onTopNavClick("servicios"); }}
              className="text-sm text-neutral-600 transition hover:text-neutral-950"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={(e) => { e.preventDefault(); onTopNavClick("nosotros"); }}
              className="text-sm text-neutral-600 transition hover:text-neutral-950"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-sm font-medium text-neutral-950 transition hover:opacity-70"
            >
              Contacto
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-900 transition hover:bg-neutral-100 md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`border-t border-neutral-100 bg-white px-6 md:hidden ${
            mobileMenuOpen ? "max-h-52 pb-5 pt-4" : "max-h-0 overflow-hidden pb-0 pt-0"
          } transition-[max-height,padding] duration-300 ease-out`}
        >
          <div className="flex flex-col gap-3">
            <button type="button" onClick={() => onMobileNavClick("servicios")} className="text-left text-sm text-neutral-700">
              Servicios
            </button>
            <button type="button" onClick={() => onMobileNavClick("nosotros")} className="text-left text-sm text-neutral-700">
              Nosotros
            </button>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-neutral-950">
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero (1.0) ─── */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-20">
        <p className="absolute left-6 top-24 font-mono text-xs tracking-widest text-neutral-400 sm:left-10">
          1.0
        </p>

        <div className="max-w-5xl text-center">
          <ScrollTextReveal
            as="h1"
            className="text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-8xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Derecho con visión de negocio.
          </ScrollTextReveal>
          <ScrollReveal delayMs={200}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-500 sm:text-xl">
              Asesoría legal y fiscal para empresas que quieren operar con tranquilidad.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-auto flex flex-col items-center pb-10 pt-16">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">
            Scroll to explore
          </span>
          <ChevronDown className="lp-scroll-hint mt-2 h-5 w-5 text-neutral-400" aria-hidden />
        </div>
      </section>

      {/* ─── Company (1.1) — Stats ─── */}
      <section className="border-t border-neutral-100 py-28 lg:py-40">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest text-neutral-400">1.1</p>
          </ScrollReveal>

          <ScrollTextReveal
            as="p"
            className="mt-6 max-w-3xl text-xl leading-relaxed text-neutral-700 sm:text-2xl"
          >
            LegalPyme es un equipo de abogados con experiencia real en la operación de negocios. Asesoramos empresas de todos los tamaños en las áreas más complejas del derecho empresarial.
          </ScrollTextReveal>

          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <ScrollReveal delayMs={0}>
              <div className="text-center">
                <p
                  className="text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  <ScrollCountUp end={25} />
                </p>
                <p className="mt-3 text-sm text-neutral-500">años de experiencia</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={100}>
              <div className="text-center">
                <p
                  className="text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  +<ScrollCountUp end={50} />k
                </p>
                <p className="mt-3 text-sm text-neutral-500">casos asesorados</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={200}>
              <div className="text-center">
                <p
                  className="text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  <ScrollCountUp end={4} />
                </p>
                <p className="mt-3 text-sm text-neutral-500">áreas de práctica</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Services (1.2) ─── */}
      <section id="servicios" className="scroll-mt-20 border-t border-neutral-100 bg-[var(--lp-band-bg)] py-28 lg:py-40">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest text-neutral-400">1.2</p>
          </ScrollReveal>
          <ScrollTextReveal
            as="h2"
            className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Nuestros servicios
          </ScrollTextReveal>
          <ScrollReveal delayMs={100}>
            <p className="mt-6 max-w-xl text-neutral-500">
              Servicios legales y fiscales para empresas en las áreas más complejas.
            </p>
          </ScrollReveal>

          <div className="mt-16 space-y-0 divide-y divide-neutral-200">
            {SERVICIOS.map((s, i) => (
              <ScrollReveal key={s.title} delayMs={Math.min(i * 80, 320)}>
                <div className="flex items-start gap-6 py-8 sm:gap-10">
                  <span className="font-mono text-sm text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works (1.3) ─── */}
      <section className="border-t border-neutral-100 py-28 lg:py-40">
        <div className="mx-auto max-w-4xl overflow-x-hidden px-6 text-center sm:px-8">
          <div ref={comoFoldRef}>
            <ScrollReveal>
              <p className="font-mono text-xs tracking-widest text-neutral-400">1.3</p>
            </ScrollReveal>
            <ScrollTextReveal
              as="h2"
              className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              ¿Cómo funciona?
            </ScrollTextReveal>

            <div className="mt-16 space-y-12">
              {[
                {
                  step: "1",
                  title: "Analizamos tu situación",
                  body: "Nos cuentas cómo funciona tu negocio o qué problema tienes.",
                },
                {
                  step: "2",
                  title: "Definimos la mejor estrategia",
                  body: "Te explicamos qué hacer, cómo hacerlo y qué riesgos evitar.",
                },
                {
                  step: "3",
                  title: "Te acompañamos en la ejecución",
                  body: "Implementamos contigo las soluciones necesarias.",
                },
              ].map((row, i) => (
                <ScrollScrubSlide key={row.step} from={i % 2 === 0 ? "right" : "left"} progress={comoFoldProgress}>
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white">
                      {row.step}
                    </span>
                    <p className="text-xl font-semibold text-neutral-950 sm:text-2xl">{row.title}</p>
                    <p className="text-neutral-500">{row.body}</p>
                  </div>
                </ScrollScrubSlide>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problems (1.4) ─── */}
      <section id="problemas" className="scroll-mt-20 border-t border-neutral-100 bg-[var(--lp-band-bg)] py-28 lg:py-40">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest text-neutral-400">1.4</p>
          </ScrollReveal>
          <ScrollTextReveal
            as="h2"
            className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            ¿Te está pasando esto?
          </ScrollTextReveal>
          <ScrollReveal delayMs={100}>
            <p className="mt-6 text-neutral-500">Identificamos riesgos antes de que escalen.</p>
          </ScrollReveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMAS.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delayMs={Math.min(i * 75, 450)}>
                  <div className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-sm">
                    <Icon className="h-5 w-5 shrink-0 text-neutral-950" />
                    <span className="text-sm text-neutral-700">{item.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Case Studies (1.5) ─── */}
      <section className="border-t border-neutral-100 py-28 lg:py-40">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest text-neutral-400">1.5</p>
          </ScrollReveal>
          <ScrollTextReveal
            as="h2"
            className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Casos reales
          </ScrollTextReveal>
          <ScrollReveal delayMs={100}>
            <p className="mt-6 text-neutral-500">Ejemplos de cómo hemos ayudado a empresas.</p>
          </ScrollReveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 lg:grid-cols-2">
            {CASOS.map((c, i) => (
              <ScrollReveal key={c.titulo} delayMs={Math.min(i * 70, 420)}>
                <div className="flex h-full flex-col bg-white p-7">
                  <p className="font-mono text-xs text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-semibold text-neutral-950">{c.titulo}</p>
                  <p className="mt-1 text-xs text-neutral-400">{c.subtitulo}</p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">{c.resultado}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ (1.6) ─── */}
      <section
        ref={faqSectionRef}
        id="faq"
        className="scroll-mt-20 border-t border-neutral-100 bg-[var(--lp-band-bg)] py-28 lg:py-40"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-10">
            <div className="md:col-span-7">
              <ScrollReveal>
                <p className="font-mono text-xs tracking-widest text-neutral-400">1.6</p>
              </ScrollReveal>
              <ScrollTextReveal
                as="h2"
                className="mt-6 text-4xl tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Preguntas frecuentes
              </ScrollTextReveal>

              <div className="mt-10 md:hidden">
                <FaqScrollArt sectionRef={faqSectionRef} />
              </div>

              <div className="mt-12 space-y-2">
                {FAQ.map((f, i) => (
                  <ScrollReveal key={f.q} delayMs={Math.min(i * 40, 320)}>
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-neutral-950"
                      >
                        {f.q}
                        <HelpCircle className="h-4 w-4 shrink-0 text-neutral-400" />
                      </button>
                      {openFaq === i && (
                        <p className="border-t border-neutral-100 px-6 py-4 text-sm text-neutral-600">{f.a}</p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="relative hidden md:col-span-5 md:flex md:items-center md:justify-center md:py-2">
              <FaqScrollArt sectionRef={faqSectionRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <ScrollReveal>
        <TeamCarousel />
      </ScrollReveal>

      {/* ─── CTA ─── */}
      <section className="border-t border-neutral-100 py-28 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollTextReveal
            as="h2"
            className="text-4xl tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Agenda tu orientación gratuita
          </ScrollTextReveal>
          <ScrollReveal delayMs={100}>
            <p className="mt-6 text-neutral-500">
              Sin compromiso. En 30 minutos sabes exactamente en qué situación está tu empresa.
            </p>
            <a
              href="#contacto"
              className="mt-10 inline-block border-b-2 border-neutral-950 pb-1 text-sm font-semibold text-neutral-950 transition hover:opacity-70"
            >
              Enviar mi caso
            </a>
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
