"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TeamMember = {
  name: string;
  photoLabel: string;
  bio: string;
  mission: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Manuel",
    photoLabel: "Foto Manuel",
    bio: "Más de 25 años de experiencia, más de 30 mil casos atendidos. Empresas desde PyMEs hasta multinacionales y emprendedores.",
    mission:
      "Como tercera generación de emprendedores y entendiendo las necesidades de los negocios, los servicios legales son una herramienta de protección patrimonial, idealmente preventiva.",
  },
  {
    name: "Equipo legal corporativo",
    photoLabel: "Foto",
    bio: "Especialistas en contratos, socios y cumplimiento. Acompañamos a empresas en estructura societaria y prevención de conflictos.",
    mission:
      "Documentar y anticipar riesgos para que tu operación crezca con bases sólidas y acuerdos claros entre partes.",
  },
  {
    name: "Asesoría fiscal",
    photoLabel: "Foto",
    bio: "Orientación ante el SAT, regímenes fiscales y regularización. Experiencia con PyMEs y grupos empresariales.",
    mission:
      "Alinear la estrategia fiscal con la realidad del negocio y reducir contingencias ante autoridades.",
  },
  {
    name: "Litigio y conciliación",
    photoLabel: "Foto",
    bio: "Representación en negociaciones y procedimientos cuando el conflicto ya está sobre la mesa.",
    mission:
      "Buscar la mejor salida posible: acuerdo cuando conviene y defensa firme cuando hace falta.",
  },
];

const TRANSITION_MS = 650;
/** Curva suave, sin rebote brusco */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Avance automático (tiempo de lectura + transición) */
const AUTOPLAY_MS = 8000;

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const [pauseHover, setPauseHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  /** Reinicia el temporizador de autoplay tras interacción manual */
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const restartAutoplayTimer = useCallback(() => {
    setAutoplayEpoch((n) => n + 1);
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    restartAutoplayTimer();
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return TEAM.length - 1;
      if (next >= TEAM.length) return 0;
      return next;
    });
  }, [restartAutoplayTimer]);

  const goTo = useCallback(
    (i: number) => {
      restartAutoplayTimer();
      setIndex(((i % TEAM.length) + TEAM.length) % TEAM.length);
    },
    [restartAutoplayTimer]
  );

  useEffect(() => {
    if (pauseHover) return;
    const ms = reducedMotion ? Math.round(AUTOPLAY_MS * 1.75) : AUTOPLAY_MS;
    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setIndex((i) => (i + 1) % TEAM.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [reducedMotion, pauseHover, autoplayEpoch]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section id="nosotros" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/80 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Sobre el equipo</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Conoce a quienes impulsan LegalPyme.mx
        </p>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPauseHover(true)}
          onMouseLeave={() => setPauseHover(false)}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/10 md:-left-3 lg:-left-6"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/10 md:-right-3 lg:-right-6"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="touch-pan-y overflow-hidden rounded-2xl border border-white/5 bg-black/20"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              touchStartX.current = null;
              if (start == null) return;
              const end = e.changedTouches[0].clientX;
              const dx = end - start;
              if (Math.abs(dx) < 40) return;
              if (dx < 0) go(1);
              else go(-1);
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translate3d(-${index * 100}%, 0, 0)`,
                transition: `transform ${TRANSITION_MS}ms ${EASE}`,
                backfaceVisibility: "hidden",
              }}
            >
              {TEAM.map((member, i) => (
                <article
                  key={member.name + i}
                  className="w-full shrink-0 px-3 sm:px-10"
                  aria-hidden={index !== i}
                >
                  <div className="flex flex-col items-center gap-6 py-2 text-center">
                    <div className="flex h-36 w-36 select-none items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 text-sm text-zinc-500 ring-1 ring-white/10">
                      {member.photoLabel}
                    </div>
                    <div className="w-full max-w-xl">
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="mt-3 text-left text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {member.bio}
                      </p>
                      <p className="mt-4 text-left text-sm leading-relaxed text-zinc-400 sm:text-base">
                        <span className="font-medium text-zinc-300">Misión:</span> {member.mission}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {TEAM.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  i === index ? "w-8 bg-blue-500" : "w-2.5 bg-zinc-600 hover:bg-zinc-500"
                }`}
                aria-label={`Slide ${i + 1} de ${TEAM.length}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
