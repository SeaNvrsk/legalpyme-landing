"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";

export default function DerechosLaboralesMexicoPage() {
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
        <BookOpen className="mb-6 h-12 w-12 text-neutral-950" />
        <h1 className="text-4xl font-bold">Derechos laborales en México</h1>
        <p className="mt-4 text-neutral-600">
          La Ley Federal del Trabajo te protege con derechos como: un contrato escrito, salario digno, prestaciones (aguinaldo, vacaciones, prima vacacional, prima dominical cuando aplique), reparto de utilidades (PTU), indemnización por despido injustificado, prima de antigüedad, y protección frente a acoso o discriminación.
        </p>
        <p className="mt-4 text-neutral-600">
          Si tu empleador no cumple con estas obligaciones, puedes exigir el pago o acudir a conciliación y arbitraje. En LegalPyme.mx te orientamos sobre qué te corresponde y cómo reclamarlo.
        </p>
        <a
          href="/#contacto"
          className="mt-8 inline-block rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
        >
          Consultar mi caso
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
