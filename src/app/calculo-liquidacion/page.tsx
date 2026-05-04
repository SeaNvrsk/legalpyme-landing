"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";

export default function CalculoLiquidacionPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader ctaLabel="Evaluar mi caso gratis" />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition hover:text-neutral-950"
        >
          ← Volver al inicio
        </Link>
        <Scale className="mb-6 h-12 w-12 text-neutral-950" />
        <h1 className="text-4xl font-bold">Cálculo de liquidación</h1>
        <p className="mt-4 text-neutral-600">
          La liquidación por despido incluye varios conceptos: indemnización constitucional (90 días de salario, o 20 días por año si optas por ello), prima de antigüedad (12 días de salario por año, con tope), proporcional de aguinaldo y vacaciones, y en algunos casos otras partidas.
        </p>
        <p className="mt-4 text-neutral-600">
          En la página principal tienes una calculadora de estimación. Para un cálculo detallado y personalizado según tu salario, antigüedad y tipo de despido, envíanos tu caso por el formulario o por WhatsApp y te respondemos sin costo.
        </p>
        <a href="/#calculadora" className="mt-4 inline-block font-medium text-neutral-950 underline underline-offset-4 hover:text-neutral-700">
          Ir a la calculadora →
        </a>
        <a
          href="/#contacto"
          className="mt-8 inline-block rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
        >
          Recibir cálculo completo
        </a>
      </main>
      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
