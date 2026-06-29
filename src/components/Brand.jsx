// Brand mark — the Lentago Labs benchmark-disk. A deep-teal rounded chip
// holding a surveyor's benchmark: a copper ring with a cream crosshair, a
// center point, and a station tick. Tech precision rooted to a fixed point in
// place. Drawn as SVG so it scales cleanly from favicon to watermark.
export function BrandMark({ size = 28, inverted = false, monochrome = false, square = false }) {
  const chip  = inverted ? "var(--color-on-dark)" : "var(--color-brand-deep)";
  const ring  = monochrome
    ? (inverted ? "var(--color-brand-deep)" : "var(--color-on-dark)")
    : "var(--color-accent)";
  const cross = inverted ? "var(--color-brand)" : "var(--color-on-dark)";
  return (
    <span style={{ display: "inline-flex", flexShrink: 0, lineHeight: 0 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Lentago Labs">
        <rect width="64" height="64" rx={square ? 0 : 14} fill={chip} />
        <circle cx="32" cy="30" r="13" fill="none" stroke={ring} strokeWidth="2.4" />
        <path d="M32 14v32M16 30h32" stroke={cross} strokeWidth="1.6" />
        <circle cx="32" cy="30" r="2.6" fill={ring} />
        <path d="M32 46v5" stroke={ring} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Wordmark — used inline next to the mark.
export function BrandWord({ size = 17, color = "var(--fg1)" }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)", fontWeight: 700,
      fontSize: size, color, letterSpacing: "-0.02em", whiteSpace: "nowrap"
    }}>Lentago Labs</span>
  );
}
