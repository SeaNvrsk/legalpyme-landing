import Link from "next/link";
import { notFound } from "next/navigation";
import { guiasContent } from "@/lib/guias-content";
import LegalHeader from "@/components/LegalHeader";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(guiasContent).map((slug) => ({ slug }));
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  const content = guiasContent[slug];
  if (!content) notFound();

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader ctaLabel="Evaluar mi caso gratis" />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-neutral-500 transition hover:text-neutral-950"
        >
          ← Volver al inicio
        </Link>
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="mt-6 leading-relaxed text-neutral-600">{content.body}</p>
        <a
          href="/#contacto"
          className="mt-10 inline-block rounded-full bg-neutral-950 px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
        >
          Solicitar orientación
        </a>
      </main>
      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
          © 2026 LegalPyme México. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
