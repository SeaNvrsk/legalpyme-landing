import type { CSSProperties } from "react";

type BrandLogoProps = {
  /** Use on light backgrounds: near-black square, white “LP”. */
  variant?: "onLight" | "onDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  /** If true, hide from assistive tech (e.g. next to a text heading). */
  decorative?: boolean;
  "aria-label"?: string;
};

const sizes = { sm: 36, md: 44, lg: 52 } as const;
const textClass = { sm: "text-sm", md: "text-base", lg: "text-lg" } as const;

/**
 * Square mark with LP — primary brand glyph.
 * onLight: band-fg fill, white type (default on white/nav).
 * onDark: white fill, black type (on gray bands / footer).
 */
export default function BrandLogo({
  variant = "onLight",
  size = "md",
  className = "",
  style,
  decorative = false,
  "aria-label": ariaLabel = "LegalPyme",
}: BrandLogoProps) {
  const dim = sizes[size];
  const isDarkBg = variant === "onDark";

  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      className={`inline-flex shrink-0 items-center justify-center rounded-[4px] font-bold tabular-nums tracking-tighter ${textClass[size]} ${
        isDarkBg
          ? "bg-white text-neutral-950"
          : "bg-[var(--lp-band-fg)] text-white"
      } ${className}`}
      style={{ width: dim, height: dim, ...style }}
    >
      LP
    </span>
  );
}
