"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

type LegalHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

const navLinkClass =
  "text-sm text-neutral-600 transition hover:text-neutral-950";

/**
 * Shared top bar: square LP + wordmark, in-page links, primary CTA (black on white).
 */
export default function LegalHeader({
  ctaHref = "/#contacto",
  ctaLabel = "Contacto",
}: LegalHeaderProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
          <BrandLogo size="md" variant="onLight" />
          <span className="truncate text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">
            LegalPyme<span className="text-neutral-500">.mx</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
          <Link href="/servicios" className={navLinkClass}>
            Servicios
          </Link>
          <Link href="/casos" className={navLinkClass}>
            Casos
          </Link>
          <Link href="/equipo" className={navLinkClass}>
            Equipo
          </Link>
          <Link href="/articulos" className={navLinkClass}>
            Artículos
          </Link>
          <a
            href={ctaHref}
            className="shrink-0 rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 sm:px-5 sm:text-sm"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
