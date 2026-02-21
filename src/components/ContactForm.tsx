"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: подключить отправку (API, email, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-white/10 bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-4 text-zinc-400">
            Cuéntanos tu proyecto y te respondemos a la brevedad.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-zinc-300">
                Nombre de la empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Empresa o PyME"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-300">
                WhatsApp / Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-300">
                Descripción del proyecto o consulta
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-y rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Describe brevemente en qué necesitas asesoría legal o fiscal."
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "Mensaje enviado"
                  : "Enviar consulta"}
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
