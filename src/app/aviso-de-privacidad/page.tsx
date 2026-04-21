"use client";

import Link from "next/link";

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-blue-400 mb-8">← Volver al inicio</Link>
        <h1 className="text-4xl font-bold">Aviso de privacidad</h1>
        <p className="mt-6 text-zinc-400 leading-relaxed">
          LegalPyme México es responsable del tratamiento de sus datos personales. Los datos que nos proporcione (nombre, correo, teléfono, WhatsApp y descripción de su consulta) serán utilizados para dar seguimiento a su solicitud y, en su caso, prestar servicios de asesoría legal y fiscal. Puede ejercer sus derechos ARCO contactándonos. No realizamos transferencias de sus datos sin su consentimiento. Más información: contacto@legalpyme.mx.
        </p>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500 text-sm">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
