"use client";

import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import SectionIndexRail from "@/components/SectionIndexRail";

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition hover:text-neutral-950"
        >
          ← Volver al inicio
        </Link>
        <SectionIndexRail label="Legal" index="4.1" className="mb-8" />
        <h1 className="text-4xl font-bold">Aviso de privacidad</h1>
        <p className="mt-6 leading-relaxed text-neutral-600">
          LegalPyme México es responsable del tratamiento de sus datos personales. Los datos que nos proporcione (nombre, correo, teléfono, WhatsApp y descripción de su consulta) serán utilizados para dar seguimiento a su solicitud y, en su caso, prestar servicios de asesoría legal y fiscal. Puede ejercer sus derechos ARCO contactándonos. No realizamos transferencias de sus datos sin su consentimiento. Más información: contacto@legalpyme.mx.
        </p>
      </main>
      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
