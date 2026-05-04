import {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import LegalHeader from "@/components/LegalHeader";

const iconMap = {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} as const;

export default function BlogPage() {
  const posts = blogPosts.map((post) => ({
    ...post,
    icon: (() => {
      const Icon = iconMap[post.icon];
      return Icon ? <Icon className="h-8 w-8 text-white" /> : null;
    })(),
  }));

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader ctaLabel="Contactar" />

      <section className="flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center lg:pt-40 lg:pb-28">
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl">
          Blog de LegalPyme<span className="text-neutral-500">.mx</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl">
          Recursos legales para pequeñas y medianas empresas en México.
        </p>
      </section>

      <section className="border-t border-neutral-200 bg-[var(--lp-graphite)] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Últimas publicaciones</h2>
            <p className="mt-4 text-white/75">Conoce más sobre legalidad para tu PyME.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <a
                key={index}
                href={`/blog/${post.slug}`}
                className="group relative rounded-2xl border border-white/15 bg-white/5 p-8 transition-all hover:border-white/30 hover:bg-white/10"
              >
                <div className="mb-6 inline-block rounded-xl border border-white/20 bg-white/10 p-3 text-white">
                  {post.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{post.title}</h3>
                <p className="leading-relaxed text-white/75">{post.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-neutral-500">
          <p>© 2026 LegalPyme.mx. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
