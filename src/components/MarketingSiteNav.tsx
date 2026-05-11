"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const NAV_OVERLAY_PX = 76;

type MarketingSiteNavProps = {
  /** When set, bar matches home hero (transparent + light links over dark) while this section overlaps the top. */
  darkBackdropRef?: RefObject<HTMLElement | null>;
};

export default function MarketingSiteNav({ darkBackdropRef }: MarketingSiteNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerOnDark, setHeaderOnDark] = useState(!!darkBackdropRef);
  const scrollEnabled = darkBackdropRef != null;

  useEffect(() => {
    if (!scrollEnabled || !darkBackdropRef) return;

    const update = () => {
      const el = darkBackdropRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const overlaps = rect.top < NAV_OVERLAY_PX && rect.bottom > 0;
      setHeaderOnDark(overlaps);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [darkBackdropRef, scrollEnabled]);

  useEffect(() => {
    if (scrollEnabled) return;
    setHeaderOnDark(false);
  }, [scrollEnabled]);

  const contactHref = pathname === "/" ? "#contacto" : "/#contacto";
  const logoPriority = pathname === "/";

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-250 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        className={`fixed top-0 z-50 w-full transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out ${
          headerOnDark
            ? "border-b border-transparent bg-transparent"
            : "border-b border-neutral-200/90 bg-white/90 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <BrandLogo size="md" variant="onDark" priority={logoPriority} />
            <span
              className={`text-lg font-medium tracking-tight transition-colors duration-300 ${
                headerOnDark ? "text-white" : "text-neutral-950"
              }`}
            >
              LegalPyme
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/servicios"
              className={`text-sm transition-colors duration-300 ${
                headerOnDark ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/casos"
              className={`text-sm transition-colors duration-300 ${
                headerOnDark ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Casos
            </Link>
            <Link
              href="/equipo"
              className={`text-sm transition-colors duration-300 ${
                headerOnDark ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Equipo
            </Link>
            <Link
              href="/articulos"
              className={`text-sm transition-colors duration-300 ${
                headerOnDark ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Artículos
            </Link>
            <a
              href={contactHref}
              className={`text-sm transition-colors duration-300 ${
                headerOnDark ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Contacto
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 md:hidden ${
              headerOnDark
                ? "text-white hover:bg-white/10"
                : "text-neutral-950 hover:bg-neutral-950/5"
            }`}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`backdrop-blur-lg md:hidden ${
            headerOnDark ? "bg-neutral-950/95" : "border-b border-neutral-200/90 bg-white/95"
          } ${
            mobileMenuOpen ? "max-h-80 pb-5 pt-4" : "max-h-0 overflow-hidden pb-0 pt-0"
          } transition-[max-height,padding,background-color,border-color] duration-300 ease-out`}
        >
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col gap-4">
              <Link
                href="/servicios"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors ${headerOnDark ? "text-white/80" : "text-neutral-700"}`}
              >
                Servicios
              </Link>
              <Link
                href="/casos"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors ${headerOnDark ? "text-white/80" : "text-neutral-700"}`}
              >
                Casos
              </Link>
              <Link
                href="/equipo"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors ${headerOnDark ? "text-white/80" : "text-neutral-700"}`}
              >
                Equipo
              </Link>
              <Link
                href="/articulos"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors ${headerOnDark ? "text-white/80" : "text-neutral-700"}`}
              >
                Artículos
              </Link>
              <a
                href={contactHref}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors ${headerOnDark ? "text-white/80" : "text-neutral-700"}`}
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
