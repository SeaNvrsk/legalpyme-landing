"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog-posts";
import { getArticleContent, type ArticleBlock } from "@/lib/blog-articles";
import { FileSignature, Stamp, Users, Calculator, Lock } from "lucide-react";

const iconMap = {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} as const;

function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        if (block.type === "intro") {
          return (
            <p
              key={i}
              className="text-lg leading-relaxed text-zinc-300 border-l-4 border-blue-500/60 pl-6"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="text-2xl font-bold text-white mt-12 mb-4 first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i} className="text-zinc-400 leading-relaxed">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="list-disc list-inside space-y-2 text-zinc-400 pl-2"
            >
              {block.items.map((item, j) => (
                <li key={j} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : null;

  const post = slug ? blogPosts.find((p) => p.slug === slug) : null;
  const content = slug ? getArticleContent(slug) : null;

  if (!post || !content) {
    return notFound();
  }

  const IconComponent = iconMap[post.icon];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter hover:text-blue-400 transition-colors"
          >
            LegalPyme<span className="text-blue-500">.mx</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/#contacto"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700"
            >
              Contactar
            </Link>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8"
        >
          ← Volver al blog
        </Link>

        <div className="mb-8 inline-flex rounded-xl border border-white/10 bg-blue-500/10 p-3">
          {IconComponent && <IconComponent className="h-8 w-8 text-blue-500" />}
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-zinc-400">{post.description}</p>

        <div className="mt-12 border-t border-white/10 pt-12">
          <ArticleBody blocks={content} />
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Solicitar asesoría
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Más artículos
          </Link>
        </div>
      </article>

      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500">
          <p>© 2026 LegalPyme.mx. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
