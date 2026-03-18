"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  FileCheck,
  Handshake,
  Gavel,
  AlertCircle,
  ClipboardList,
  BadgeDollarSign,
  UserX,
  Clock,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const PROBLEMAS = [
  { text: "Me despidieron y no me quieren pagar liquidación", icon: BadgeDollarSign },
  { text: "Me obligaron a firmar renuncia", icon: FileCheck },
  { text: "No me pagan horas extra", icon: Clock },
  { text: "Me acosan o me tratan mal en el trabajo", icon: AlertCircle },
  { text: "No tengo contrato ni prestaciones", icon: ClipboardList },
  { text: "Me deben salario", icon: BadgeDollarSign },
];

const SERVICIOS = [
  {
    title: "Despido injustificado",
    description: "Te ayudamos a reclamar liquidación completa según la ley.",
    icon: UserX,
  },
  {
    title: "Cálculo de liquidación",
    description: "Revisamos si te están pagando lo correcto.",
    icon: Scale,
  },
  {
    title: "Conciliación laboral",
    description: "Negociamos con la empresa para resolver tu caso.",
    icon: Handshake,
  },
  {
    title: "Demanda laboral",
    description: "Representación legal si tu caso lo requiere.",
    icon: Gavel,
  },
];

const CASOS = [
  { titulo: "Trabajador despedido sin liquidación", resultado: "Recuperó: $85,000 MXN" },
  { titulo: "Empresa debía salarios atrasados", resultado: "Pago completo + indemnización" },
  { titulo: "Despido sin causa después de 8 años", resultado: "Liquidación + prima de antigüedad" },
  { titulo: "Renuncia forzada anulada", resultado: "Reconocimiento de despido injustificado" },
  { titulo: "Horas extra no pagadas", resultado: "Pago retroactivo + recargos" },
];

const FAQ = [
  { q: "¿Si me despiden sin contrato puedo reclamar?", a: "Sí. La relación laboral puede acreditarse con recibos de nómina, correos, testigos u otros medios. Tienes derecho a reclamar lo que te corresponde por ley." },
  { q: "¿Cuánto tiempo tengo para demandar?", a: "En México generalmente tienes un año a partir del día siguiente al despido para presentar tu demanda ante la Junta de Conciliación y Arbitraje. No conviene esperar." },
  { q: "¿Qué pasa si firmé renuncia?", a: "Si te presionaron o engañaron, la renuncia puede impugnarse. Revisamos tu caso para ver si hay vicios que permitan anularla y reclamar como despido injustificado." },
  { q: "¿Cuánto cuesta un abogado laboral?", a: "En muchos casos los honorarios se pactan por resultado: solo pagas si ganas. La primera evaluación de tu caso es gratuita." },
  { q: "¿Cuánto tarda un juicio laboral?", a: "Depende de la Junta y la complejidad. La conciliación puede resolver en semanas; un juicio puede llevar varios meses. Te explicamos los plazos en la evaluación." },
];

export default function Home() {
  const [scrollFade, setScrollFade] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcSalario, setCalcSalario] = useState("");
  const [calcAnios, setCalcAnios] = useState("");
  const [calcTipo, setCalcTipo] = useState("injustificado");

  useEffect(() => {
    const onScroll = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      setScrollFade(Math.min(window.scrollY / vh, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const calcEstimacion = () => {
    const s = parseFloat(calcSalario) || 0;
    const a = parseFloat(calcAnios) || 0;
    if (s <= 0 || a <= 0) return null;
    const diasSalario = s / 30;
    const primaAntiguedad = Math.min(12 * diasSalario * a, 12 * diasSalario * 12);
    const indemnizacion = calcTipo === "injustificado" ? 90 * diasSalario : 0;
    const aguinaldoVacaciones = (15 + 6) * diasSalario * (a / 365) * 20;
    const total = Math.round(primaAntiguedad + indemnizacion + aguinaldoVacaciones);
    return total > 0 ? total : null;
  };

  const estimacion = calcEstimacion();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            DerechoLaboral<span className="text-blue-500">.mx</span>
          </Link>
          <a
            href="#contacto"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700"
          >
            Evaluar mi caso gratis
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0 transition-opacity duration-150" style={{ opacity: 1 - scrollFade }} aria-hidden>
          <Image src="/image_3d84fb.jpg" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-0 bg-black/60" aria-hidden />
        <div className="relative z-10">
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            ¿Problemas con tu trabajo?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-white/95 sm:text-2xl">
            Te ayudamos a defender tus derechos laborales en México.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-300">
            Despidos injustificados, falta de pago, abuso laboral o liquidaciones incorrectas. Nuestro equipo te orienta y te acompaña para que recibas lo que te corresponde por ley.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5215512345678?text=Hola,%20necesito%20evaluar%20mi%20caso%20laboral"
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
      </section>

      {/* Bloque de confianza */}
      <section className="border-t border-white/10 bg-zinc-950/80 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <p className="text-sm font-semibold text-blue-400">Especialistas</p>
              <p className="mt-1 text-zinc-300">en derecho laboral</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">Experiencia</p>
              <p className="mt-1 text-zinc-300">en leyes mexicanas</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">+XXX</p>
              <p className="mt-1 text-zinc-300">casos asesorados</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400">Primera evaluación</p>
              <p className="mt-1 text-zinc-300">de caso gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Te está pasando esto? */}
      <section id="problemas" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">¿Te está pasando esto?</h2>
          <p className="mt-4 text-center text-zinc-400">No estás solo. Te ayudamos a revisar tu caso.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMAS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition hover:border-blue-500/40"
              >
                <p.icon className="h-6 w-6 shrink-0 text-blue-500" />
                <p className="text-white">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <a href="#contacto" className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
              Quiero revisar mi caso
            </a>
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Qué podemos hacer por ti</h2>
          <p className="mt-4 text-center text-zinc-400">Servicios de derecho laboral para trabajadores.</p>
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

      {/* Cómo funciona */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">¿Cómo funciona?</h2>
          <div className="mt-12 space-y-8">
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">Paso 1</span>
              <p className="text-xl font-semibold text-white">Cuéntanos tu caso</p>
              <p className="text-zinc-400">Por WhatsApp o con el formulario. Sin compromiso.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">Paso 2</span>
              <p className="text-xl font-semibold text-white">Analizamos tu situación legal</p>
              <p className="text-zinc-400">Te decimos qué opciones tienes y qué puedes reclamar.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-bold">Paso 3</span>
              <p className="text-xl font-semibold text-white">Te acompañamos en el proceso</p>
              <p className="text-zinc-400">Conciliación, demanda o asesoría según tu caso.</p>
            </div>
          </div>
          <p className="mt-10 rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-blue-300">
            En muchos casos los honorarios se pagan <strong>solo si ganas el caso</strong>.
          </p>
        </div>
      </section>

      {/* Casos reales */}
      <section className="border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Casos reales</h2>
          <p className="mt-4 text-center text-zinc-400">Resultados de nuestros asesorados.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CASOS.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="font-medium text-white">{c.titulo}</p>
                <p className="mt-2 text-blue-400 font-semibold">{c.resultado}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2>
          <div className="mt-12 space-y-2">
            {FAQ.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden"
              >
                <button
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

      {/* Calculadora / lead magnet */}
      <section id="calculadora" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-md px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Calculadora de liquidación</h2>
          <p className="mt-4 text-center text-zinc-400">Estimación aproximada. Recibe el cálculo completo por WhatsApp.</p>
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300">Salario mensual (MXN)</label>
              <input
                type="number"
                value={calcSalario}
                onChange={(e) => setCalcSalario(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                placeholder="Ej. 15000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Años trabajados</label>
              <input
                type="number"
                step="0.5"
                value={calcAnios}
                onChange={(e) => setCalcAnios(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                placeholder="Ej. 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Tipo de despido</label>
              <select
                value={calcTipo}
                onChange={(e) => setCalcTipo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
              >
                <option value="injustificado">Despido injustificado</option>
                <option value="justificado">Despido justificado / renuncia</option>
              </select>
            </div>
            {estimacion !== null && (
              <p className="rounded-xl bg-blue-500/20 px-4 py-3 text-center font-bold text-blue-300">
                Estimación aproximada: ${estimacion.toLocaleString("es-MX")} MXN
              </p>
            )}
            <a
              href="https://wa.me/5215512345678?text=Quiero%20recibir%20el%20c%C3%A1lculo%20completo%20de%20mi%20liquidaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-[#25D366] py-4 text-center font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              Recibe cálculo completo por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Sobre el abogado */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Sobre el abogado</h2>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="h-32 w-32 rounded-full bg-zinc-700 flex items-center justify-center text-4xl text-zinc-500">
              Foto
            </div>
            <div>
              <p className="font-semibold text-white">[Nombre del abogado]</p>
              <p className="mt-2 text-zinc-400">Especialista en derecho laboral. [Experiencia]. [Misión — defender los derechos de los trabajadores en México.]</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Revisa tu caso hoy mismo</h2>
          <p className="mt-4 text-zinc-400">Consulta inicial por WhatsApp.</p>
          <a
            href="#contacto"
            className="mt-8 inline-block rounded-full bg-blue-600 px-12 py-5 text-lg font-bold text-white transition hover:bg-blue-700"
          >
            Enviar mi caso
          </a>
        </div>
      </section>

      <ContactSection />
      <WhatsAppButton />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-4 text-center text-sm text-zinc-500">
            <p>WhatsApp · Teléfono · Correo · Ciudad</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              <Link href="/despido-injustificado" className="hover:text-white">Despido injustificado</Link>
              <Link href="/calculo-liquidacion" className="hover:text-white">Cálculo liquidación</Link>
              <Link href="/derechos-laborales-mexico" className="hover:text-white">Derechos laborales</Link>
              <Link href="/que-hacer-si-me-despiden" className="hover:text-white">Qué hacer si me despiden</Link>
            </div>
            <Link href="/aviso-de-privacidad" className="underline hover:text-zinc-400">Aviso de privacidad</Link>
            <p>© 2026 DerechoLaboral México. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
