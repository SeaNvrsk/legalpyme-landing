import ScrollRevealRule from "@/components/ScrollRevealRule";

type SectionIndexRailProps = {
  /** Left label (e.g. section title in small caps style). */
  label: string;
  /** Optional right index (e.g. "1.2"). Omit for label-only rail. */
  index?: string;
  /** `light`: white pages. `dark`: hero on photo. `band`: green editorial band. */
  variant?: "light" | "dark" | "band";
  className?: string;
  /** When set, the bottom rule animates L→R on scroll instead of a static border. */
  revealBottomRule?: boolean;
};

const variants = {
  light: {
    row: "border-neutral-200",
    label: "text-neutral-500",
    index: "text-neutral-400",
  },
  dark: {
    row: "border-white/10",
    label: "text-white/50",
    index: "text-white/40",
  },
  band: {
    row: "border-[var(--lp-band-fg)]/12",
    label: "text-[var(--lp-band-fg)]/70",
    index: "text-[var(--lp-band-fg)]/45",
  },
} as const;

/**
 * Editorial section header: small label + mono index, with a bottom rule (design ref. 1.2).
 */
export default function SectionIndexRail({
  label,
  index,
  variant = "light",
  className = "",
  revealBottomRule = false,
}: SectionIndexRailProps) {
  const v = variants[variant];
  const showIndex = index != null && index !== "";

  const row = (
    <>
      <span className={`min-w-0 text-sm font-normal leading-5 ${v.label}`}>{label}</span>
      {showIndex && (
        <span
          className={`shrink-0 font-mono text-sm font-medium tabular-nums leading-5 tracking-tight ${v.index}`}
        >
          {index}
        </span>
      )}
    </>
  );

  if (!revealBottomRule) {
    return (
      <div
        className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b pb-4 ${showIndex ? "justify-between" : "justify-start"} ${v.row} ${className}`}
      >
        {row}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 pb-4 ${showIndex ? "justify-between" : "justify-start"}`}>
        {row}
      </div>
      <ScrollRevealRule variant={variant} />
    </div>
  );
}
