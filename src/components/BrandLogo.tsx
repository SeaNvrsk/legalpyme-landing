import Image from "next/image";
import type { CSSProperties } from "react";

type BrandLogoProps = {
  /** Kept for API compatibility; mark is the same asset on light or dark UI. */
  variant?: "onLight" | "onDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  /** If true, hide from assistive tech (e.g. next to a text heading). */
  decorative?: boolean;
  /** Prefer for above-the-fold marks (e.g. home nav). */
  priority?: boolean;
  "aria-label"?: string;
};

const sizes = { sm: 36, md: 44, lg: 52 } as const;

/**
 * LP serif mark with rule (brand asset). Scales to a square hit area.
 */
export default function BrandLogo({
  variant: _variant = "onLight",
  size = "md",
  className = "",
  style,
  decorative = false,
  priority = false,
  "aria-label": ariaLabel = "LegalPyme",
}: BrandLogoProps) {
  const dim = sizes[size];

  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[#f6f5ef] ${className}`}
      style={{ width: dim, height: dim, ...style }}
    >
      <Image
        src="/img/brand-lp-mark.png"
        alt={decorative ? "" : ariaLabel}
        width={488}
        height={484}
        className="block h-full w-full object-contain object-center select-none"
        sizes={`${dim}px`}
        priority={priority}
      />
    </span>
  );
}
