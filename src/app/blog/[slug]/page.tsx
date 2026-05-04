"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog-posts";
import { getArticleContent, type ArticleBlock } from "@/lib/blog-articles";
import { FileSignature, Stamp, Users, Calculator, Lock } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";

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
              className="border-l-4 border-neutral-950/40 pl-6 text-lg leading-relaxed text-neutral-700"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={i} className="mb-4 mt-12 text-2xl font-bold text-neutral-950 first:mt-0">
              {block.text}
            </h2>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i} className="leading-relaxed text-neutral-600">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-inside list-disc space-y-2 pl-2 text-neutral-600">
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
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <LegalHeader ctaLabel="Contactar" />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
        >
          ← Volver al blog
        </Link>

        <div className="mb-8 inline-flex rounded-xl border border-neutral-200 bg-neutral-100 p-3">
          {IconComponent && <IconComponent className="h-8 w-8 text-neutral-950" />}
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-neutral-600">{post.description}</p>

        <div className="mt-12 border-t border-neutral-200 pt-12">
          <ArticleBody blocks={content} />
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="rounded-full bg-neutral-950 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
          >
            Solicitar asesoría
          </Link>
          <Link
            href="/blog"
            className="rounded-full border-2 border-neutral-950 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
          >
            Más artículos
          </Link>
        </div>
      </article>

      <footer className="border-t border-neutral-200 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-neutral-500">
          <p>© 2026 LegalPyme.mx. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
