import {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

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
      return Icon ? <Icon className="h-8 w-8 text-blue-500" /> : null;
    })(),
  }));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tighter">
            LegalPyme<span className="text-blue-500">.mx</span>
          </div>
          <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700">
            Contactar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl">
          Blog de LegalPyme<span className="text-blue-500">.mx</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          Recursos legales para pequeñas y medianas empresas en México.
        </p>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Últimas publicaciones</h2>
          <p className="mt-4 text-zinc-400">Conoce más sobre legalidad para tu PyME.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <a
              key={index}
              href={`/blog/${post.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:border-blue-500/50 hover:bg-zinc-900"
            >
              <div className="mb-6 inline-block rounded-xl bg-blue-500/10 p-3">
                {post.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{post.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {post.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500">
          <p>© 2026 LegalPyme.mx. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}