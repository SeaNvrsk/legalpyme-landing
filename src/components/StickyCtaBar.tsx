"use client";

import { ChevronRight, MessageCircle } from "lucide-react";

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
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:justify-center sm:gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#25D366] px-3 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_22px_-10px_rgba(37,211,102,0.55)] transition hover:bg-[#20bd5a] sm:min-h-[44px] sm:px-5 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="hidden min-[420px]:inline">Consulta por WhatsApp</span>
            <span className="min-[420px]:hidden">WhatsApp</span>
          </a>
          <a
            href="#contacto"
            className="flex min-h-[46px] items-center justify-center gap-1 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-3 py-2.5 text-[13px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:bg-white/10 sm:min-h-[44px] sm:px-5 sm:text-sm"
          >
            <span className="hidden min-[420px]:inline">Evaluar mi caso gratis</span>
            <span className="min-[420px]:hidden">Evaluar gratis</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
