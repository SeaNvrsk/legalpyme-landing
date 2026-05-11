"use client";

import type { ArticleBlock } from "@/lib/blog-articles";

export default function ArticleBodyBlocks({ blocks }: { blocks: ArticleBlock[] }) {
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
