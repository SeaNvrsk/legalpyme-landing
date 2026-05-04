"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader />

      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-12 text-center shadow-sm">
          <CheckCircle className="mx-auto h-24 w-24 text-neutral-950 sm:h-28 sm:w-28" strokeWidth={1.5} />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            ¡Recibimos tu caso!
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
            Revisaremos tu situación y nos pondremos en contacto contigo en un plazo de{" "}
            <strong className="text-neutral-950">24 horas</strong> para la evaluación.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Si necesitas una respuesta urgente, escríbenos por WhatsApp.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
