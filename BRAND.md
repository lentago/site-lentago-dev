# Lentago Labs — Brand & Design System

Brand contract for the LIVE site. Canonical token *values* live in
`public/design-system/tokens/*.css` (imported by `public/design-system/styles.css`)
— those files win. This doc is the rules and rationale.

Lentago Labs is the rebrand of the former *Pitzi Labs* — same business, same
operator, same fonts and runbook voice. What changed is **the name, the palette,
and the brand mark**; this contract is authoritative for all three.

## Brand mark

The mark is a **five-petal blossom** — limestone petals carried by teal contour
outlines, a spray of deep-teal stamens tipped in gold anthers, and a pale
center. It reads as something cultivated and quietly exact: order and growth
rooted to a fixed center (the name leans on *lento* — measured, unhurried). It
is net-new to "Tidewater" and replaced the former Pitzi-era benchmark disk.
Common renderings:

- **Inline mark** — the blossom in place, teal outlines on limestone petals
  (nav, footer, business cards).
- **Chip** — the blossom reversed to cream lines + gold anthers on a deep-teal
  square. `favicon.svg` is the rounded chip (simplified to five stamens for
  legibility at tab size); `lentago-mark-square.svg` is the sharp-cornered,
  full-detail variant for favicons/og/print.
- **Watermark** — a giant translucent blossom bleeding off a corner. Use
  sparingly on dark surfaces (the hero does this).
- **Field prompt** — the gold **▲ triangulation marker** + `lentago` as a
  runbook/CLI prompt glyph. **Never `$` or `>`.**

The mark is drawn (SVG), not typed — `BrandMark` (inline/chip) and
`BlossomWatermark` (ghost) in `src/components/Brand.jsx` are the source of truth
for the geometry; the static `public/*.svg` files mirror it.

## Palette — "Tidewater"

Warm forest-teal is the brand, anther gold is the accent, limestone is the
paper. (The 2026-07 recolor warmed the original slate-teal ~28° toward green and
traded the copper accent for the gold of the blossom's anthers.) Hexes below
mirror the CSS; the CSS is authoritative.

| Token                  | Hex      | Notes                                     |
|------------------------|----------|-------------------------------------------|
| `--color-accent`       | `#E0A81C`| Anther gold. Primary action / link / contour. |
| `--color-accent-hover` | `#C48F0C`| Hover / pressed.                          |
| `--color-on-accent`    | `#241d08`| Text/glyphs on an accent fill (dark, not white). |
| `--color-brand`        | `#1b4b2e`| Brand teal (mid, warmed green).           |
| `--color-ink`          | `#12311f`| Primary text — warm forest-teal.          |
| `--color-ink-strong`   | `#0e2b1a`| Hero / dark surfaces (near-black green).  |
| `--color-bg`           | `#f3f0e8`| Warm limestone paper.                     |
| `--color-bg-alt`       | `#ece7da`| Subtle band.                              |
| `--color-surface`      | `#fffefb`| Cards, inputs.                            |

Status (mirrors the CSS; the CSS is authoritative): `#4a9e82` ok · `#c98a2b`
warn · `#E0A81C` info (== accent) · `#bb4a33` err — each tuned warm to sit on teal.

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
- Gold is an accent color — **one element per region, never a fill.** A whole
  gold button is the single CTA; don't paint surfaces gold. Text on a gold fill
  is dark (`--color-on-accent`), never white.
- Dark surfaces carry faint **topographic contour lines** (nested gold curves
  at ~8–16% opacity) and often a **giant translucent blossom watermark**.
  The only gradient is the hero's `150deg #0e2b1a → #1b4b2e` (`--grad-hero`).
- Corners are small and sharp (2–12px). Hairline borders `#ddd6c6` do the
  structural work; cards lean on the border, not elevation.
- The ◆ diamond is the section-eyebrow marker (gold).
- Field-station / terminal mocks use the **▲ triangulation marker** + `lentago`
  as the prompt glyph, not `$` or `>`.
- No icon font / icon library, and no emoji on brand surfaces — the visual
  language is typographic and survey/terrain. The only glyphs are ▲ ◆ ● and
  arrows → ↗ ↵.
