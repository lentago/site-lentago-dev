// Brand mark — the Lentago Labs blossom. A five-petal field-flower: limestone
// petals carried by teal contour outlines, a spray of deep-teal stamens tipped
// in gold anthers, and a pale center. Net-new "Tidewater" mark (it replaced
// the surveyor's benchmark disk). Drawn as SVG so it scales cleanly from
// favicon to watermark.

// One petal, pointing up from the center (32,32); the five are rotated 72° apart.
const PETAL = "M32 31C24 31 19 26 19 18C19 10 25 5 32 5C39 5 45 10 45 18C45 26 40 31 32 31Z";
// Ten stamens radiating from the center (36° apart), alternating long/short
// reach, each ending in an anther dot — the most distinctive feature of the
// bloom and where the gold accent lives.
const STAMENS = Array.from({ length: 10 }, (_, i) => (i % 2 === 0
  ? { rot: i * 36, tip: 10, filament: "M32 31C31 24 33 17 32 11" }   // long — over a petal
  : { rot: i * 36, tip: 18, filament: "M32 31C31 27 33 23 32 19" })); // short — between petals

export function BrandMark({ size = 28, inverted = false, monochrome = false, square = false, className }) {
  const onDark = inverted || square;                                 // square wraps it in a teal chip
  const line   = onDark ? "var(--color-on-dark)"      : "var(--color-brand)";       // petal contour
  const fill   = onDark ? "none"                      : "var(--color-surface)";     // petal body
  const stem   = onDark ? "var(--color-on-dark-soft)" : "var(--color-brand-deep)";  // filaments
  const anther = monochrome ? line                    : "var(--color-accent)";      // gold tips
  const eye    = onDark ? "var(--color-brand-deep)"   : "var(--color-surface)";     // center
  return (
    <span className={className} style={{ display: "inline-flex", flexShrink: 0, lineHeight: 0 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Lentago Labs">
        {square && <rect width="64" height="64" rx="0" fill="var(--color-brand-deep)" />}
        {[0, 72, 144, 216, 288].map(r => (
          <path key={r} d={PETAL} transform={`rotate(${r} 32 32)`}
                fill={fill} stroke={line} strokeWidth="2.2" strokeLinejoin="round" />
        ))}
        {STAMENS.map((s, i) => (
          <g key={i} transform={`rotate(${s.rot} 32 32)`}>
            <path d={s.filament} stroke={stem} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="32" cy={s.tip} r="2.3" fill={anther} />
          </g>
        ))}
        <circle cx="32" cy="32" r="4.4" fill={eye} stroke={line} strokeWidth="1.4" />
      </svg>
    </span>
  );
}

// Ghost blossom — the mark as a faint stroke-only watermark for dark surfaces
// (the hero, banners). Petals + stamens in cream line; gold anther specks
// carry the accent through. Caller positions it via `style`.
export function BlossomWatermark({ size = 560, opacity = 0.06, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      style={{ userSelect: "none", pointerEvents: "none", opacity, ...style }}>
      {[0, 72, 144, 216, 288].map(r => (
        <path key={r} d={PETAL} transform={`rotate(${r} 32 32)`}
              fill="none" stroke="var(--color-on-dark)" strokeWidth="1.4" strokeLinejoin="round" />
      ))}
      {STAMENS.map((s, i) => (
        <g key={i} transform={`rotate(${s.rot} 32 32)`}>
          <path d={s.filament} stroke="var(--color-on-dark)" strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="32" cy={s.tip} r="2.1" fill="var(--color-accent)" />
        </g>
      ))}
      <circle cx="32" cy="32" r="4.4" fill="none" stroke="var(--color-on-dark)" strokeWidth="1.2" />
    </svg>
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
