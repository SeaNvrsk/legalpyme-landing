"use client";

import Link from "next/link";
import { UserX } from "lucide-react";

export default function DespidoInjustificadoPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
          <a href="/#contacto" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700">
            Evaluar mi caso gratis
          </a>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-blue-400 mb-8">← Volver al inicio</Link>
        <UserX className="h-12 w-12 text-blue-500 mb-6" />
        <h1 className="text-4xl font-bold">Despido injustificado</h1>
        <p className="mt-4 text-zinc-400">
          Si te despidieron sin causa justificada o sin cumplir con los requisitos que marca la ley, tienes derecho a reclamar una liquidación completa: indemnización (90 días de salario), prima de antigüedad, proporcional de aguinaldo y vacaciones, y en su caso reinstalación.
        </p>
        <p className="mt-4 text-zinc-400">
          En LegalPyme.mx te ayudamos a revisar tu caso, calcular lo que te corresponde y acompañarte en conciliación o demanda ante la Junta de Conciliación y Arbitraje.
        </p>
        <a href="/#contacto" className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
          Evaluar mi caso
        </a>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500 text-sm">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
