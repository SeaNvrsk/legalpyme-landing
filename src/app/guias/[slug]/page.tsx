import Link from "next/link";
import { notFound } from "next/navigation";
import { guiasContent } from "@/lib/guias-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(guiasContent).map((slug) => ({ slug }));
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  const content = guiasContent[slug];
  if (!content) notFound();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
          <a
            href="/#contacto"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700"
          >
            Evaluar mi caso gratis
          </a>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link href="/" className="mb-8 inline-flex text-sm text-zinc-500 hover:text-blue-400">
          ← Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="mt-6 leading-relaxed text-zinc-400">{content.body}</p>
        <a
          href="/#contacto"
          className="mt-10 inline-block rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Solicitar orientación
        </a>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
