"use client";

import Link from "next/link";
import { UserX } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import SectionIndexRail from "@/components/SectionIndexRail";

export default function DespidoInjustificadoPage() {
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
        <SectionIndexRail label="Legal laboral" index="3.1" className="mb-8" />
        <UserX className="mb-6 h-12 w-12 text-neutral-950" />
        <h1 className="text-4xl font-bold">Despido injustificado</h1>
        <p className="mt-4 text-neutral-600">
          Si te despidieron sin causa justificada o sin cumplir con los requisitos que marca la ley, tienes derecho a reclamar una liquidación completa: indemnización (90 días de salario), prima de antigüedad, proporcional de aguinaldo y vacaciones, y en su caso reinstalación.
        </p>
        <p className="mt-4 text-neutral-600">
          En LegalPyme.mx te ayudamos a revisar tu caso, calcular lo que te corresponde y acompañarte en conciliación o demanda ante la Junta de Conciliación y Arbitraje.
        </p>
        <a
          href="/#contacto"
          className="mt-8 inline-block rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
        >
          Evaluar mi caso
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
