# CLAUDE.md — lentagolabs-dev

> Read [README.md](README.md) for what this repo is, how it builds, and how it
> deploys. This file is operational notes for Claude: where the source of truth
> lives, how this site was built, and the conventions to respect. Lentago Labs
> fleet-wide rules (PR workflow, attribution) live in `~/repos/CLAUDE.md` and
> are NOT restated here.

## Persona — introduce yourself

When Claude initializes in this directory, open the first response with a brief
self-introduction as **Site Claude** — keeper of the Lentago Labs landing site:
the Astro build, the design-fidelity port, and the foundry deploy wiring. One
sentence is plenty; don't make a meal of it.

## What this repo is

A single-page Astro static site that reproduces a Claude Design handoff
faithfully and serves it (nginx on ECS Fargate) via the `foundry-platform-demo`
platform. There is no CMS and no database — the page is static HTML built from
React components rendered **server-side only** (no client hydration). Live at
`lentago.dev` (previewed on a hidden subdomain of `icecreamtofightwith.com`
during design; that preview host is now retired).

**Rebrand lineage.** Lentago Labs is the "Tidewater" rebrand of the former Pitzi
Labs. The layout, copy skeleton, and Astro architecture were ported from
[pitzilabs-dev](https://github.com/lentago/pitzilabs-dev); the **palette and
brand mark are net-new** (teal + gold + limestone; the five-petal blossom mark).

## Source of truth

- **`src/`** is authoritative for layout + copy — the live site is what ships.
- **`/BRAND.md`** is the brand contract (mark, palette, type, conventions).
- **`public/design-system/`** holds the canonical design tokens
  (`styles.css` → `tokens/colors.css` · `typography.css` · `spacing.css` ·
  `fonts.css` · `base.css`) and self-hosted fonts.
- The upstream design system is the **"Lentago Labs Design System"** project in
  [Claude Design](https://claude.ai/design) (a design-system project, synced via
  the `claude_design` MCP / `DesignSync`). This repo is the *built* product, not
  a mirror — re-pull from Claude Design only when intentionally re-syncing, and
  re-evaluate against `/BRAND.md`. There is no in-repo `design/` or `lab/` tier.

## How this site was built (port notes)

The components under `src/components/` are a static port of the design system's
`ui_kits/landing/` section components, which target the design system's
interactive browser preview. The port:

- **Primitives** (`Brand.jsx`, `Shared.jsx`) — `BrandMark`, `Eyebrow`,
  `StatusDot`, `Button`, `Tag`, `ServiceCard`, `Stat`, `TimelineItem`,
  `Input`/`Select`/`Textarea` — are ES-module versions of the design-system
  components, recolored via tokens. Hover/pulse are CSS (embedded `<style>` /
  `:hover`), not shipped JS.
- **Sections** swap the prototype's `window.PitziLabsDesignSystem_*` globals and
  `onNav` smooth-scroll callbacks for ES imports and plain in-page `#anchors`,
  and the interactive `useState` consult form for a static styled mock.

## Brand quick reference (full contract in `/BRAND.md`)

- Mark: the **five-petal blossom** (limestone petals + teal contour outlines +
  deep-teal stamens with gold anther tips + pale center; reversed to cream +
  gold on a teal chip for favicon/og). Field prompt glyph: gold **▲** + `lentago`.
- Palette: warm forest-teal `#1b4b2e` / `#0e2b1a`, anther gold `#E0A81C`,
  limestone `#f3f0e8`. Gold is an accent, not a fill — one element per region;
  text on a gold fill is dark (`--color-on-accent`), never white.
- Type: Space Grotesk (display/body), JetBrains Mono (mono). Self-hosted.
- Dark surfaces get contour lines + a blossom watermark; light surfaces
  are flat paper. Terminal/field-station mocks use ▲ `lentago`, not `$` or `>`.

## Build / deploy quick reference

| Item | Value |
|---|---|
| Build | `npm install && npm run build` → `dist/` |
| Container | `nginx:latest`, `listen 8080`, `/health` → 200 (ALB health check) |
| ECR repo | `foundry-dev-lentago` |
| ECS cluster / service | `foundry-dev-cluster` / `foundry-dev-lentago` |
| Public domain | `lentago.dev` (+ `www`) — apex/www ALIAS → shared ALB, dedicated ACM cert via SNI |
| OIDC deploy role | `arn:aws:iam::365184644049:role/foundry-dev-github-actions` |
| Platform repo | [foundry-platform-demo](https://github.com/lentago/foundry-platform-demo) (`modules/site`) |

**Deploy is live.** Every push to `main` builds the Astro site, pushes to ECR
(`foundry-dev-lentago`), and rolls the ECS service. The provisioning was
completed 2026-06-30 (see `deploy.yml` preamble for details). Manual redeploys
are available via `workflow_dispatch`.

## CI & branch protection (fleet standard)

This repo follows the Lentago Labs fleet standard (`~/repos/dotgithub/fleet-ops`):
squash-only merge button, auto-merge, delete-branch, the `pitzilabs`+`claude`
topic spine, and a `main` branch ruleset (PR required, no force-push, no deletion).

- **`Build` is a required check.** `.github/workflows/build.yml` runs
  `npm ci && npm run build` on every PR; the `main` ruleset requires the `Build`
  context, so **a PR can't merge unless the Astro build is green.**
- `claude-code-review` / `claude` workflows are **advisory** (AI review + the
  `@claude` bot), not merge gates. (`claude-code-review` is `workflow_dispatch`
  only, matching the fleet 2026-06-25 default.)
- Arm merges with `gh pr merge <N> --auto --squash --delete-branch`; let the
  `Build` check gate it. Don't hand-merge past a red build.

## Conventions to respect

- Static output only: if you ever need a `client:*` directive, stop and
  reconsider — this site has no interactive runtime by design. No React should
  ship to the browser; verify the built `dist/index.html` has no `<script>` tag.
- The contact form is a styled **mock** for v1 (no backend). Wiring it
  (mailto/Formspree) is a separate, intentional change.
- Founder credit in the footer reads the operator's real name (Christopher
  Pitzi) under the Lentago brand — intentional; confirm before changing.
- GitHub references in the site copy read `github.com/LentagoLabs` (the
  brand-forward future org) while the repo itself lives under `Lentago Labs` —
  reconcile when/if a LentagoLabs org is created.

## When in doubt

- Visual/brand question → `/BRAND.md` + `public/design-system`; live truth is
  `src/`.
- Deploy question → mirror [ice-cream-book](https://github.com/lentago/ice-cream-book)'s
  `deploy.yml` / `Dockerfile` / `nginx.conf`, swapping the ECR/ECS names above.
