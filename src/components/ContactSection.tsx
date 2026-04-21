"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactSection() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // TODO: conectar envío (API, email, etc.)
      await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
      router.push("/thanks");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/10 py-24 lg:py-32"
    >
      {/* Фон: те же небоскрёбы + размытие и оверлей */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image_3d84fb.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <h2
          className="text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Agenda tu orientación gratuita
        </h2>
        <p className="mt-6 text-center text-zinc-300">
          Cuéntanos sobre tu empresa o tu situación legal. Respuesta rápida. Sin compromiso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="cs-name" className="mb-2 block text-sm font-medium text-zinc-300">
                Nombre
              </label>
              <input
                id="cs-name"
                name="name"
                type="text"
                required
                className={inputClass}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="cs-email" className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="cs-email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="cs-whatsapp" className="mb-2 block text-sm font-medium text-zinc-300">
                WhatsApp
              </label>
              <input
                id="cs-whatsapp"
                name="whatsapp"
                type="tel"
                className={inputClass}
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              <label htmlFor="cs-message" className="mb-2 block text-sm font-medium text-zinc-300">
                Mensaje
              </label>
              <textarea
                id="cs-message"
                name="message"
                rows={4}
                required
                className={`${inputClass} resize-y`}
                placeholder="Describe tu empresa o el tema legal que necesitas resolver."
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 disabled:opacity-60"
            >
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "Caso enviado"
                  : "Enviar mi caso"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-center text-sm text-red-400">
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
