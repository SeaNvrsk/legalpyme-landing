"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactSection() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
      router.push("/thanks");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15";

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 overflow-hidden border-t border-[var(--lp-band-fg)]/10 bg-[var(--lp-band-bg)] py-24 text-[var(--lp-band-fg)] lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <h2
          className="text-center text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Agenda tu orientación gratuita
        </h2>
        <p className="mt-6 text-center text-neutral-600">
          Cuéntanos sobre tu empresa o tu situación legal. Respuesta rápida. Sin compromiso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl border border-[var(--lp-band-fg)]/12 bg-white p-6 text-neutral-950 shadow-xl sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="cs-name" className="mb-2 block text-sm font-medium text-neutral-700">
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
              <label htmlFor="cs-email" className="mb-2 block text-sm font-medium text-neutral-700">
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
              <label htmlFor="cs-whatsapp" className="mb-2 block text-sm font-medium text-neutral-700">
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
              <label htmlFor="cs-message" className="mb-2 block text-sm font-medium text-neutral-700">
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
              className="w-full rounded-full bg-neutral-950 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "Caso enviado"
                  : "Enviar mi caso"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-center text-sm text-red-600">
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
