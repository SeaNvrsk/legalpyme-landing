"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog-posts";
import { getArticleContent } from "@/lib/blog-articles";
import MarketingSiteNav from "@/components/MarketingSiteNav";
import SectionIndexRail from "@/components/SectionIndexRail";
import ArticleBodyBlocks from "@/components/ArticleBodyBlocks";
import SiteFooter from "@/components/SiteFooter";
import { BLOG_POST_ICON_MAP } from "@/lib/blog-post-icons";

export default function ArticuloSlugPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : null;

  const post = slug ? blogPosts.find((p) => p.slug === slug) : null;
  const content = slug ? getArticleContent(slug) : null;

  if (!post || !content) {
    return notFound();
  }

  const IconComponent = BLOG_POST_ICON_MAP[post.icon as keyof typeof BLOG_POST_ICON_MAP];

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <MarketingSiteNav />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        <Link
          href="/articulos"
          className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
        >
          ← Volver a artículos
        </Link>

        <SectionIndexRail label="Artículo" className="mb-8" />

        <div className="mb-8 inline-flex rounded-xl border border-neutral-200 bg-neutral-100 p-3">
          {IconComponent && <IconComponent className="h-8 w-8 text-neutral-950" />}
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-neutral-600">{post.description}</p>

        <div className="mt-12 border-t border-neutral-200 pt-12">
          <ArticleBodyBlocks blocks={content} />
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="rounded-full bg-neutral-950 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
          >
            Solicitar asesoría
          </Link>
          <Link
            href="/articulos"
            className="rounded-full border-2 border-neutral-950 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
          >
            Más artículos
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
