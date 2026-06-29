# Lentago Labs — Brand & Design System

Brand contract for the LIVE site. Canonical token *values* live in
`public/design-system/tokens/*.css` (imported by `public/design-system/styles.css`)
— those files win. This doc is the rules and rationale.

Lentago Labs is the rebrand of the former *Pitzi Labs* — same business, same
operator, same fonts and runbook voice. What changed is **the name, the palette,
and the brand mark**; this contract is authoritative for all three.

## Brand mark

The mark is a **benchmark disk** — a surveyor's survey marker: a copper ring
with a cream crosshair, a center point, and a station tick, set in a deep-teal
rounded chip. It reads as instrument precision rooted to a fixed point in place
(the name leans on *lento* — measured, unhurried — and a sense of place). Three
rendering scales are common:

- **Chip** — the rounded benchmark-disk square (favicon, nav, business cards).
  `lentago-mark-square.svg` is the sharp-cornered variant for favicons/og/print.
- **Watermark** — a giant translucent benchmark disk bleeding off a corner. Use
  sparingly on dark surfaces (the hero does this).
- **Field prompt** — the copper **▲ triangulation marker** + `lentago` as a
  runbook/CLI prompt glyph. **Never `$` or `>`.**

The mark is drawn (SVG), not typed — render it via the `BrandMark` component in
`src/components/Brand.jsx`, or from the static files in `public/`.

## Palette — "Tidewater"

Slate-teal is the brand, copper is the accent, limestone is the paper. Hexes
below mirror the CSS; the CSS is authoritative.

| Token                  | Hex      | Notes                                     |
|------------------------|----------|-------------------------------------------|
| `--color-accent`       | `#c2643c`| Warm copper. Primary action / link / contour. |
| `--color-accent-hover` | `#a8502d`| Hover / pressed.                          |
| `--color-brand`        | `#1c4a44`| Brand teal (mid).                         |
| `--color-ink`          | `#13302d`| Primary text — deep slate-teal.           |
| `--color-ink-strong`   | `#0e2b28`| Hero / dark surfaces (near-black teal).   |
| `--color-bg`           | `#f3f0e8`| Warm limestone paper.                     |
| `--color-bg-alt`       | `#ece7da`| Subtle band.                              |
| `--color-surface`      | `#fffefb`| Cards, inputs.                            |

Status (mirrors the CSS; the CSS is authoritative): `#4a9e82` ok · `#c98a2b`
warn · `#c2643c` info (== accent) · `#bb4a33` err — each tuned warm to sit on teal.

## Type

- **Display + body**: Space Grotesk (400–700). Display is heavy and tight
  (`700`, `-0.035em`).
- **Mono**: JetBrains Mono (400–600) — eyebrows, tags, meta, stats labels,
  runbook lines, the field prompt. Mono labels are UPPERCASE, ~11px, tracked
  `0.06–0.1em`.
- Self-hosted under `public/design-system/tokens/fonts/` and wired up in
  `tokens/fonts.css`.

## Conventions

- Limestone paper (`--color-bg`) is the default surface; deep teal
  `--color-ink-strong` is the reserved dark surface (heroes, dark cards,
  field-station mocks). Light surfaces are flat paper — no gradients on light.
- Copper is an accent color — **one element per region, never a fill.** A whole
  copper button is the single CTA; don't paint surfaces copper.
- Dark surfaces carry faint **topographic contour lines** (nested copper curves
  at ~8–16% opacity) and often a **giant translucent benchmark-disk watermark**.
  The only gradient is the hero's `150deg #0e2b28 → #1c4a44` (`--grad-hero`).
- Corners are small and sharp (2–12px). Hairline borders `#ddd6c6` do the
  structural work; cards lean on the border, not elevation.
- The ◆ diamond is the section-eyebrow marker (copper).
- Field-station / terminal mocks use the **▲ triangulation marker** + `lentago`
  as the prompt glyph, not `$` or `>`.
- No icon font / icon library, and no emoji on brand surfaces — the visual
  language is typographic and survey/terrain. The only glyphs are ▲ ◆ ● and
  arrows → ↗ ↵.
