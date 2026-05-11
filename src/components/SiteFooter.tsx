import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const FOOTER_LINKS = [
  { href: "/guias/como-despedir-a-un-empleado-sin-riesgos", label: "Despedir sin riesgos" },
  { href: "/guias/contratos-de-trabajo-para-empresas", label: "Contratos de trabajo" },
  { href: "/guias/outsourcing-legal-mexico", label: "Outsourcing legal" },
  { href: "/guias/regularizacion-fiscal-empresas", label: "Regularización fiscal" },
  { href: "/guias/dividendos-socios-sat", label: "Dividendos y SAT" },
  { href: "/guias/regimen-fiscal-para-empresas", label: "Régimen fiscal" },
  { href: "/guias/conflicto-entre-socios", label: "Conflicto entre socios" },
  { href: "/guias/pacto-de-socios-mexico", label: "Pacto de socios" },
];

export default function SiteFooter() {
  return (
    <footer
      id="ubicacion"
      className="scroll-mt-20 border-t border-neutral-100 py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          {/* Left: brand + contact */}
          <div className="min-w-0 max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" variant="onLight" decorative />
              <span className="text-lg font-medium tracking-tight">
                LegalPyme<span className="text-neutral-400">.mx</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Ciudad de México, CDMX
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              contacto@legalpyme.mx · +52 55 1234 5678
            </p>
          </div>

          {/* Right: links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Sitio</p>
              <div className="mt-3 flex flex-col gap-2 text-neutral-600">
                <Link href="/servicios" className="transition hover:text-neutral-950">
                  Servicios
                </Link>
                <Link href="/casos" className="transition hover:text-neutral-950">
                  Casos
                </Link>
                <Link href="/equipo" className="transition hover:text-neutral-950">
                  Equipo
                </Link>
                <Link href="/articulos" className="transition hover:text-neutral-950">
                  Artículos
                </Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Guías</p>
              <div className="mt-3 flex flex-col gap-2 text-neutral-600">
                {FOOTER_LINKS.slice(0, 4).map((l) => (
                  <Link key={l.href} href={l.href} className="transition hover:text-neutral-950">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Más</p>
              <div className="mt-3 flex flex-col gap-2 text-neutral-600">
                {FOOTER_LINKS.slice(4).map((l) => (
                  <Link key={l.href} href={l.href} className="transition hover:text-neutral-950">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 border-t border-neutral-100 pt-8 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LegalPyme México. Todos los derechos reservados.</p>
          <Link href="/aviso-de-privacidad" className="transition hover:text-neutral-950">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
