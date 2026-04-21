"use client";

import { ChevronRight } from "lucide-react";

const WA =
  "https://wa.me/5215512345678?text=" +
  encodeURIComponent(
    "Hola, necesito orientación legal para mi empresa (LegalPyme.mx)"
  );

export default function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/85 backdrop-blur-lg safe-area-pb">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-center sm:gap-6">
        <p className="text-center text-xs text-zinc-500 sm:text-left">
          Respuesta rápida. Sin compromiso.
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a] sm:flex-initial"
          >
            Consulta por WhatsApp
          </a>
          <a
            href="#contacto"
            className="flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:flex-initial"
          >
            Evaluar mi caso gratis
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
