"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import SectionIndexRail from "@/components/SectionIndexRail";

export default function QueHacerSiMeDespidenPage() {
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
        <SectionIndexRail label="Legal laboral" index="3.4" className="mb-8" />
        <AlertCircle className="mb-6 h-12 w-12 text-neutral-950" />
        <h1 className="text-4xl font-bold">Qué hacer si me despiden</h1>
        <p className="mt-4 text-neutral-600">
          Si te despiden: (1) No firmes nada bajo presión. Revisa si lo que te ofrecen corresponde a tu liquidación según la ley. (2) Guarda pruebas: contrato, nóminas, correos, mensajes. (3) Tienes un año para demandar ante la Junta de Conciliación y Arbitraje. (4) Si te presionaron a firmar renuncia, esa firma puede impugnarse.
        </p>
        <p className="mt-4 text-neutral-600">
          Lo más importante es saber cuánto te corresponde y si el despido fue legal. En LegalPyme.mx te hacemos una evaluación gratuita de tu caso y te decimos los pasos a seguir.
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
