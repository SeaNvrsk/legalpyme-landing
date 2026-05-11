type SectionIndexRailProps = {
  /** Left label (e.g. section title in small caps style). */
  label: string;
  /** Right index, e.g. "1.2" — matches editorial numbering across the site. */
  index: string;
  /** `light`: white pages. `dark`: hero on photo. `band`: green editorial band. */
  variant?: "light" | "dark" | "band";
  className?: string;
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
}: SectionIndexRailProps) {
  const v = variants[variant];
  return (
    <div className={`flex items-baseline justify-between border-b pb-4 ${v.row} ${className}`}>
      <span className={`text-sm ${v.label}`}>{label}</span>
      <span className={`font-mono text-xs ${v.index}`}>{index}</span>
    </div>
  );
}
