"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter hover:text-blue-400 transition-colors"
          >
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
        </div>
      </nav>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
        {/* Фон: image_3d8d1d.jpg + размытие и оверлей */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image_3d8d1d.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto max-w-xl text-center">
          <CheckCircle className="mx-auto h-24 w-24 text-blue-500 sm:h-28 sm:w-28" strokeWidth={1.5} />
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            ¡Gracias por contactarnos!
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-zinc-300">
            Hemos recibido tu solicitud. Revisaremos tu consulta y nos pondremos en contacto contigo en un plazo de <strong className="text-white">24 horas</strong>.
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Si necesitas una respuesta urgente, escríbenos por WhatsApp.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
