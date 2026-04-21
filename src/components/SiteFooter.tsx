import Link from "next/link";

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

/** Centro aproximado CDMX — sustituye por embed con tu dirección exacta cuando la tengas */
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=19.4326,-99.1332&hl=es&z=13&output=embed";

export default function SiteFooter() {
  return (
    <footer id="ubicacion" className="scroll-mt-20 border-t border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Mapa izquierda, enlaces derecha — 2 columnas desde sm (640px); en pantallas muy estrechas, columna única */}
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 sm:items-start sm:gap-x-6 md:gap-x-10 lg:gap-x-14">
          <aside
            className="order-2 flex min-w-0 flex-col sm:order-1"
            aria-label="Ubicación"
          >
            <h2 className="text-lg font-semibold tracking-tight text-white">Ubicación</h2>
            <p className="mt-1.5 text-sm leading-snug text-zinc-500">
              Ciudad de México, CDMX — orientación y citas previa coordinación.
            </p>
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-inner">
              <iframe
                title="Mapa — LegalPyme.mx, Ciudad de México"
                src={MAP_EMBED_SRC}
                className="h-[220px] w-full border-0 sm:h-[248px] lg:h-[260px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ciudad+de+M%C3%A9xico+CDMX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 text-xs text-zinc-500 transition hover:text-zinc-300"
            >
              Abrir en Google Maps →
            </a>
          </aside>

          <div className="order-1 min-w-0 sm:order-2 sm:border-l sm:border-white/10 sm:pl-6 md:pl-10 lg:pl-14 flex flex-col gap-5 text-sm text-zinc-500">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white">Contacto</h3>
              <p className="mt-1.5 leading-relaxed">
                WhatsApp · +52 55 1234 5678 · contacto@legalpyme.mx
              </p>
              <p className="mt-1 text-zinc-600">Ciudad de México, CDMX</p>
            </div>

            <div>
              <p className="font-medium text-zinc-400">Guías</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {FOOTER_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-zinc-400">Más temas</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <Link href="/guias/como-proteger-mi-patrimonio-personal" className="hover:text-white">
                  Patrimonio personal
                </Link>
                <Link href="/guias/contratos-con-clientes-y-proveedores" className="hover:text-white">
                  Contratos clientes
                </Link>
                <Link href="/guias/contrato-de-confidencialidad-empresa" className="hover:text-white">
                  Confidencialidad
                </Link>
                <Link href="/guias/como-constituir-una-empresa-en-mexico" className="hover:text-white">
                  Constituir empresa
                </Link>
                <Link href="/guias/diferencia-persona-fisica-moral" className="hover:text-white">
                  Persona física vs moral
                </Link>
              </div>
            </div>

            <Link href="/aviso-de-privacidad" className="w-fit underline hover:text-zinc-400">
              Aviso de privacidad
            </Link>
            <p className="text-xs text-zinc-600">© 2026 LegalPyme México. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
