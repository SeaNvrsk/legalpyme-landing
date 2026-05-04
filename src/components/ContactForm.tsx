"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15";

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-neutral-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Contacto</h2>
          <p className="mt-4 text-neutral-600">Cuéntanos tu proyecto y te respondemos a la brevedad.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClass}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-neutral-700">
                Nombre de la empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className={inputClass}
                placeholder="Empresa o PyME"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-700">
                WhatsApp / Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={inputClass}
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-700">
                Descripción del proyecto o consulta
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`${inputClass} resize-y`}
                placeholder="Describe brevemente en qué necesitas asesoría legal o fiscal."
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-neutral-950 px-6 py-4 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "Mensaje enviado"
                  : "Enviar consulta"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-center text-sm text-red-600">No se pudo enviar. Intenta de nuevo.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
