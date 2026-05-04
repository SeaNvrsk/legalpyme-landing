"use client";

import Link from "next/link";
import {
  Building2,
  AlertTriangle,
  Receipt,
  Scale,
  Users,
  UserCircle,
  Layers,
  ShieldCheck,
  FileWarning,
  Gavel,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import FaqScrollArt from "@/components/FaqScrollArt";
import ContactSection from "@/components/ContactSection";
import HeroScrollBackground from "@/components/HeroScrollBackground";
import ScrollCountUp from "@/components/ScrollCountUp";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollRevealSlide from "@/components/ScrollRevealSlide";
import SiteFooter from "@/components/SiteFooter";
import StickyCtaBar from "@/components/StickyCtaBar";
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
  const onTopNavClick = useCallback((targetId: string, label: string) => {
    if (typeof window === "undefined") return;

    const debug = window.location.search.includes("debugNav=1");
    const t0 = performance.now();
    const target = document.getElementById(targetId);

    if (debug) {
      console.info(`[TopNav] click "${label}" -> #${targetId}`, {
        y: Math.round(window.scrollY),
        t: Math.round(t0),
        targetFound: Boolean(target),
      });
    }

    if (!target) {
      if (debug) console.warn(`[TopNav] target not found: #${targetId}`);
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);

    if (debug) {
      const probe = (ms: number) => {
        window.setTimeout(() => {
          console.info(`[TopNav] ${label} +${ms}ms`, {
            y: Math.round(window.scrollY),
            elapsed: Math.round(performance.now() - t0),
          });
        }, ms);
      };
      probe(150);
      probe(400);
      probe(900);
    }
  }, []);

  const onMobileNavClick = useCallback(
    (targetId: string, label: string) => {
      setMobileMenuOpen(false);
      onTopNavClick(targetId, label);
    },
    [onTopNavClick]
  );

  return (
    <div className="min-h-screen bg-white pb-28 text-neutral-950 selection:bg-neutral-200">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-neutral-950/30 transition-opacity duration-250 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <BrandLogo size="md" variant="onLight" />
            <span className="text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">
              LegalPyme<span className="text-neutral-500">.mx</span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex md:gap-3">
            <a
              href="#ubicacion"
              onClick={(e) => {
                e.preventDefault();
                onTopNavClick("ubicacion", "Dónde estamos");
              }}
              className="rounded-full border border-neutral-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50 sm:px-4 sm:text-sm"
            >
              Dónde estamos
            </a>
            <a
              href="#nosotros"
              onClick={(e) => {
                e.preventDefault();
                onTopNavClick("nosotros", "Nosotros");
              }}
              className="rounded-full border border-neutral-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50 sm:px-4 sm:text-sm"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="shrink-0 rounded-full bg-neutral-950 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-neutral-800 sm:px-5 sm:py-2 sm:text-sm"
            >
              <span className="hidden min-[400px]:inline">Evaluar mi caso gratis</span>
              <span className="min-[400px]:hidden">Evaluar gratis</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:bg-neutral-50 md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`overflow-hidden border-t border-neutral-200 bg-white px-4 sm:px-6 md:hidden ${
            mobileMenuOpen ? "max-h-64 pb-4 pt-3" : "max-h-0 pb-0 pt-0"
          } transition-[max-height,padding] duration-300 ease-out`}
        >
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onMobileNavClick("ubicacion", "Dónde estamos")}
              className={`rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-left text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-100 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? "40ms" : "0ms" }}
            >
              Dónde estamos
            </button>
            <button
              type="button"
              onClick={() => onMobileNavClick("nosotros", "Nosotros")}
              className={`rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-left text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-100 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? "110ms" : "0ms" }}
            >
              Nosotros
            </button>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl bg-neutral-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? "180ms" : "0ms" }}
            >
              Evaluar mi caso gratis
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] overflow-hidden bg-neutral-950">
        <HeroScrollBackground />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/75 via-neutral-950/55 to-neutral-950/85"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-28 pt-28 text-center sm:pt-32 lg:pb-36">
          <div className="min-h-[18vh] w-full flex-1 shrink-0 sm:min-h-[22vh]" aria-hidden />
          <div className="w-full max-w-4xl shrink-0">
            <ScrollReveal className="flex justify-center">
              <BrandLogo size="lg" variant="onLight" decorative />
            </ScrollReveal>
            <ScrollReveal delayMs={80} className="mt-5">
              <h1
                className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Evita problemas laborales que pueden costarte caro
              </h1>
            </ScrollReveal>
            <ScrollReveal delayMs={140}>
              <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-white/95 sm:text-2xl">
                Te ayudamos a proteger tu negocio desde hoy.
              </p>
            </ScrollReveal>
            <ScrollReveal delayMs={200}>
              <p className="mx-auto mt-4 max-w-2xl text-center text-white/80">
                Cumplimiento laboral y fiscal, contratos, manejo de personal y prevención de demandas. Te ayudamos a tomar decisiones seguras y mantener tu negocio en orden.
              </p>
            </ScrollReveal>
            <ScrollReveal delayMs={260}>
              <p className="mx-auto mt-3 text-sm text-white/55">Respuesta rápida. Sin compromiso.</p>
            </ScrollReveal>
            <ScrollReveal delayMs={320}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/5215512345678?text=Hola%2C%20necesito%20orientaci%C3%B3n%20legal%20para%20mi%20empresa%20(LegalPyme.mx)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#20bd5a]"
                >
                  Consulta por WhatsApp
                </a>
                <a
                  href="#contacto"
                  className="flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-950"
                >
                  Evaluar mi caso gratis <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
          <div className="mt-auto flex flex-col items-center pb-6 pt-10">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Desplázate para explorar
            </span>
            <ChevronDown className="lp-scroll-hint mt-2 h-6 w-6 text-white/70" aria-hidden />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--lp-band-fg)]/10 bg-[var(--lp-band-bg)] py-16 text-neutral-900 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-5">
            <ScrollReveal delayMs={0}>
              <div className="group flex h-full flex-col rounded-2xl border border-[var(--lp-band-fg)]/10 bg-white/60 px-5 py-8 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--lp-band-fg)]/20 hover:bg-white/85 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.12)]">
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 transition group-hover:text-neutral-700">
                  01
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-[var(--lp-band-fg)] sm:text-xl">
                  Especialistas
                </p>
                <span className="mx-auto mt-4 block h-px w-12 max-w-[5rem] bg-gradient-to-r from-transparent via-[var(--lp-band-fg)]/20 to-transparent" />
                <p className="mt-4 text-sm text-neutral-600">en derecho empresarial</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={90}>
              <div className="group flex h-full flex-col rounded-2xl border border-[var(--lp-band-fg)]/10 bg-white/60 px-5 py-8 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--lp-band-fg)]/20 hover:bg-white/85 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.12)]">
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 transition group-hover:text-neutral-700">
                  02
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-[var(--lp-band-fg)] sm:text-xl">
                  Experiencia real
                </p>
                <span className="mx-auto mt-4 block h-px w-12 max-w-[5rem] bg-gradient-to-r from-transparent via-[var(--lp-band-fg)]/20 to-transparent" />
                <p className="mt-4 text-sm text-neutral-600">en operación y gestión de negocios</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={180}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--lp-band-fg)]/15 bg-gradient-to-b from-white/95 to-white/55 px-5 py-8 shadow-[0_24px_48px_-14px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-[var(--lp-band-fg)]/10 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--lp-band-fg)]/25 hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.14)] sm:py-9">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--lp-band-fg)]/25 to-transparent"
                  aria-hidden
                />
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
                  03
                </p>
                <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight text-[var(--lp-band-fg)] sm:text-4xl lg:text-[2.5rem]">
                  <ScrollCountUp end={50000} prefix="+" />
                </p>
                <span className="mx-auto mt-4 block h-px w-16 max-w-[6rem] bg-gradient-to-r from-transparent via-[var(--lp-band-fg)]/22 to-transparent" />
                <p className="mt-4 text-sm font-semibold text-[var(--lp-band-fg)]">casos asesorados</p>
                <p className="mt-2 text-sm text-neutral-600">Trayectoria y volumen que respaldan el criterio</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={270}>
              <div className="group flex h-full flex-col rounded-2xl border border-[var(--lp-band-fg)]/10 bg-white/60 px-5 py-8 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--lp-band-fg)]/20 hover:bg-white/85 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.12)]">
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 transition group-hover:text-neutral-700">
                  04
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-[var(--lp-band-fg)] sm:text-xl">
                  Primera orientación
                </p>
                <span className="mx-auto mt-4 block h-px w-12 max-w-[5rem] bg-gradient-to-r from-transparent via-[var(--lp-band-fg)]/20 to-transparent" />
                <p className="mt-4 text-sm text-neutral-600">gratuita</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="problemas" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">1.1</p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-950 sm:text-4xl">¿Te está pasando esto?</h2>
            <p className="mt-4 text-neutral-600">Identificamos riesgos antes de que escalen.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMAS.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delayMs={Math.min(i * 75, 450)}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-neutral-400 hover:shadow-md">
                    <Icon className="h-6 w-6 shrink-0 text-neutral-950" />
                    <span className="text-left text-neutral-900">{item.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal className="mt-10 text-center">
            <a
              href="#contacto"
              className="inline-block rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
            >
              Revisar mi empresa
            </a>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="servicios"
        className="scroll-mt-20 border-t border-[var(--lp-band-fg)]/10 bg-[var(--lp-band-bg)] py-20 text-neutral-900 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">1.2</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--lp-band-fg)] sm:text-4xl">
              Qué podemos hacer por ti
            </h2>
            <p className="mt-4 text-neutral-600">Servicios legales y fiscales para empresas.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s, i) => (
              <ScrollReveal key={s.title} delayMs={Math.min(i * 80, 400)}>
                <div className="h-full rounded-2xl border border-[var(--lp-band-fg)]/12 bg-white/55 p-6 transition hover:border-[var(--lp-band-fg)]/22 hover:bg-white/85">
                  <span className="font-mono text-xs text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="mt-3 h-10 w-10 text-[var(--lp-band-fg)]" />
                  <h3 className="mt-4 text-lg font-bold text-[var(--lp-band-fg)]">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl overflow-x-hidden px-6 text-center">
          <ScrollReveal>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">1.3</p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-950 sm:text-4xl">¿Cómo funciona?</h2>
          </ScrollReveal>
          <div className="mt-12 space-y-8">
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
              <ScrollRevealSlide
                key={row.step}
                from={i % 2 === 0 ? "right" : "left"}
                delayMs={i * 140}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="rounded-full bg-neutral-950 px-4 py-1 text-sm font-bold text-white">
                    {row.step}
                  </span>
                  <p className="text-xl font-semibold text-neutral-950">{row.title}</p>
                  <p className="text-neutral-600">{row.body}</p>
                </div>
              </ScrollRevealSlide>
            ))}
          </div>
          <ScrollReveal className="mt-10">
            <p className="rounded-xl border border-neutral-300 bg-neutral-100 px-6 py-4 text-neutral-800">
              Sin procesos complicados. Sin lenguaje legal innecesario.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-[var(--lp-band-fg)]/10 bg-[var(--lp-band-bg)] py-20 text-neutral-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">1.4</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--lp-band-fg)] sm:text-4xl">Casos reales</h2>
            <p className="mt-4 text-neutral-600">Ejemplos de cómo hemos ayudado a empresas.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {CASOS.map((c, i) => (
              <ScrollReveal key={c.titulo} delayMs={Math.min(i * 70, 420)}>
                <div className="h-full rounded-2xl border border-[var(--lp-band-fg)]/12 bg-white/55 p-6 text-left transition hover:border-[var(--lp-band-fg)]/22 hover:bg-white/85">
                  <p className="font-mono text-xs text-neutral-500">Caso {String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-semibold text-[var(--lp-band-fg)]">{c.titulo}</p>
                  <p className="mt-1 text-sm text-neutral-500">{c.subtitulo}</p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-700">{c.resultado}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={faqSectionRef}
        id="faq"
        className="scroll-mt-20 border-t border-neutral-200 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-10">
            <div className="md:col-span-7 md:min-h-0">
              <ScrollReveal className="text-left">
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">
                  1.5
                </p>
                <h2 className="mt-2 text-3xl font-bold text-neutral-950 sm:text-4xl">
                  Preguntas frecuentes
                </h2>
              </ScrollReveal>
              <div className="mt-10 md:hidden">
                <FaqScrollArt sectionRef={faqSectionRef} />
              </div>
              <div className="mt-12 space-y-2 md:mt-12">
                {FAQ.map((f, i) => (
                  <ScrollReveal key={f.q} delayMs={Math.min(i * 40, 320)}>
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-neutral-950"
                      >
                        {f.q}
                        <HelpCircle className="h-5 w-5 shrink-0 text-neutral-950" />
                      </button>
                      {openFaq === i && (
                        <p className="border-t border-neutral-200 px-6 py-4 text-neutral-600">{f.a}</p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="relative hidden md:col-span-5 md:flex md:min-h-0 md:items-center md:justify-center md:py-2">
              <FaqScrollArt sectionRef={faqSectionRef} />
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <TeamCarousel />
      </ScrollReveal>

      <section className="border-t border-neutral-200 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-neutral-950 sm:text-4xl">Agenda tu orientación gratuita</h2>
            <p className="mt-4 text-sm text-neutral-600">
              Sin compromiso. En 30 minutos sabes exactamente en qué situación está tu empresa.
            </p>
            <a
              href="#contacto"
              className="mt-8 inline-block rounded-full bg-neutral-950 px-12 py-5 text-lg font-bold text-white transition hover:bg-neutral-800"
            >
              Enviar mi caso
            </a>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
      <StickyCtaBar />

      <SiteFooter />
    </div>
  );
}
