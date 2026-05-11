"use client";

import { useRouter } from "next/navigation";
import SectionIndexRail from "@/components/SectionIndexRail";
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
    "w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-950 placeholder-neutral-400 outline-none transition focus:border-neutral-950";

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 border-t border-neutral-100 py-28 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionIndexRail label="Contacto" />

        <h2 className="mt-10 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Escríbenos
        </h2>
        <p className="mt-4 max-w-xl text-neutral-500">
          Cuéntanos sobre tu empresa o tu situación legal. Respuesta rápida. Sin compromiso.
        </p>

        <form onSubmit={handleSubmit} className="mt-14 max-w-2xl space-y-8">
          <div>
            <label htmlFor="cs-name" className="block text-xs font-medium uppercase tracking-wider text-neutral-400">
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
            <label htmlFor="cs-email" className="block text-xs font-medium uppercase tracking-wider text-neutral-400">
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
            <label htmlFor="cs-whatsapp" className="block text-xs font-medium uppercase tracking-wider text-neutral-400">
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
            <label htmlFor="cs-message" className="block text-xs font-medium uppercase tracking-wider text-neutral-400">
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
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-neutral-950 px-10 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "Caso enviado"
                  : "Enviar mi caso"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
