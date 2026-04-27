"use client";

import Image from "next/image";
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
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import ContactSection from "@/components/ContactSection";
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
  const [scrollFade, setScrollFade] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      setScrollFade(Math.min(window.scrollY / vh, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black pb-28 text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tighter sm:text-xl">
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 md:gap-3">
            <a
              href="#ubicacion"
              className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              Dónde estamos
            </a>
            <a
              href="#nosotros"
              className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-semibold transition hover:bg-blue-700 sm:px-5 sm:py-2 sm:text-sm"
            >
              <span className="hidden min-[400px]:inline">Evaluar mi caso gratis</span>
              <span className="min-[400px]:hidden">Evaluar gratis</span>
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-opacity duration-150"
          style={{ opacity: 1 - scrollFade }}
          aria-hidden
        >
          <Image src="/image_3d84fb.jpg" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-0 bg-black/60" aria-hidden />
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-24 pt-28 text-center sm:pt-32 lg:pb-32">
          <div className="min-h-[28vh] w-full flex-1 shrink-0" aria-hidden />
          <div className="w-full max-w-4xl shrink-0">
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Evita problemas laborales que pueden costarte caro
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-white/95 sm:text-2xl">
              Te ayudamos a proteger tu negocio desde hoy.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-300">
              Cumplimiento laboral y fiscal, contratos, manejo de personal y prevención de demandas. Te ayudamos a tomar decisiones seguras y mantener tu negocio en orden.
            </p>
            <p className="mx-auto mt-3 text-sm text-zinc-500">Respuesta rápida. Sin compromiso.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5215512345678?text=Hola%2C%20necesito%20orientaci%C3%B3n%20legal%20para%20mi%20empresa%20(LegalPyme.mx)"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white transition hover:bg-[#20bd5a]"
              >
                Consulta por WhatsApp
              </a>
              <a
                href="#contacto"
                className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-bold transition hover:bg-white/5"
              >
                Evaluar mi caso gratis <ChevronRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950/80 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-blue-400">Especialistas</p>
              <p className="mt-1 text-zinc-300">en derecho empresarial</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">Experiencia real</p>
              <p className="mt-1 text-zinc-300">en operación y gestión de negocios</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">+50,000</p>
              <p className="mt-1 text-zinc-300">casos asesorados</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">Primera orientación</p>
              <p className="mt-1 text-zinc-300">gratuita</p>
            </div>
          </div>
        </div>
      </section>

      <section id="problemas" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">¿Te está pasando esto?</h2>
          <p className="mt-4 text-center text-zinc-400">Identificamos riesgos antes de que escalen.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMAS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition hover:border-blue-500/40"
                >
                  <Icon className="h-6 w-6 shrink-0 text-blue-500" />
                  <span className="text-left text-white">{item.text}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center">
            <a
              href="#contacto"
              className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Revisar mi empresa
            </a>
          </p>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Qué podemos hacer por ti</h2>
          <p className="mt-4 text-center text-zinc-400">Servicios legales y fiscales para empresas.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-blue-500/40"
              >
                <s.icon className="h-10 w-10 text-blue-500" />
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">¿Cómo funciona?</h2>
          <div className="mt-12 space-y-8">
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">1</span>
              <p className="text-xl font-semibold text-white">Analizamos tu situación</p>
              <p className="text-zinc-400">Nos cuentas cómo funciona tu negocio o qué problema tienes.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">2</span>
              <p className="text-xl font-semibold text-white">Definimos la mejor estrategia</p>
              <p className="text-zinc-400">Te explicamos qué hacer, cómo hacerlo y qué riesgos evitar.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">3</span>
              <p className="text-xl font-semibold text-white">Te acompañamos en la ejecución</p>
              <p className="text-zinc-400">Implementamos contigo las soluciones necesarias.</p>
            </div>
          </div>
          <p className="mt-10 rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-blue-200">
            Sin procesos complicados. Sin lenguaje legal innecesario.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Casos reales</h2>
          <p className="mt-4 text-center text-zinc-400">Ejemplos de cómo hemos ayudado a empresas.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {CASOS.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                <p className="font-semibold text-white">{c.titulo}</p>
                <p className="mt-1 text-sm text-zinc-500">{c.subtitulo}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{c.resultado}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2>
          <div className="mt-12 space-y-2">
            {FAQ.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-white"
                >
                  {f.q}
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-500" />
                </button>
                {openFaq === i && (
                  <p className="border-t border-white/10 px-6 py-4 text-zinc-400">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamCarousel />

      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Agenda tu orientación gratuita</h2>
          <p className="mt-4 text-sm text-zinc-500">
            Sin compromiso. En 30 minutos sabes exactamente en qué situación está tu empresa.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-block rounded-full bg-blue-600 px-12 py-5 text-lg font-bold text-white transition hover:bg-blue-700"
          >
            Enviar mi caso
          </a>
        </div>
      </section>

      <ContactSection />
      <StickyCtaBar />

      <SiteFooter />
    </div>
  );
}
