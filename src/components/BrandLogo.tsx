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

/** LegalPyme logo (`/logo_1.png`). Transparent wrapper so the asset’s alpha shows through. */
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
      className={`inline-flex shrink-0 items-center justify-center bg-transparent ${className}`}
      style={{ width: dim, height: dim, ...style }}
    >
      <Image
        src="/logo_1.png"
        alt={decorative ? "" : ariaLabel}
        width={313}
        height={313}
        className="block h-full w-full object-contain object-center select-none"
        sizes={`${dim}px`}
        priority={priority}
      />
    </span>
  );
}
