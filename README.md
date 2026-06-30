# lentagolabs-dev — Lentago Labs landing site

The landing site for **Lentago Labs**, the infrastructure-operations consulting
practice — destined for [lentago.dev](https://lentago.dev). It's an Astro static
site served as a container on the
[foundry-platform-demo](https://github.com/lentago/foundry-platform-demo)
AWS stack (GitHub OIDC → ECR → ECS Fargate → ALB), the same platform that runs
[icecreamtofightwith.com](https://icecreamtofightwith.com).

> **Rebrand note.** Lentago Labs is the rebrand of the former **Pitzi Labs** —
> same business, same operator, same fonts and runbook voice. What changed: the
> name, the palette (navy + orange + cream → **teal + copper + limestone**), and
> the brand motif (terminal `<pl:>` command-prompt → a **five-petal blossom mark
> + survey contour lines**). The original site lives at
> [pitzilabs-dev](https://github.com/lentago/pitzilabs-dev).

**Authorship:** The code and design in this repo are co-written with
[Claude](https://claude.ai) (Anthropic). I direct the work, supply the brand and
the copy, and review the output; Claude writes the code, and the design system
was authored in [Claude Design](https://claude.ai/design). I'm an infrastructure
operator, not a software engineer or a designer — please don't read this repo as
a portfolio of either.

## Why this exists

Lentago Labs needed a front door. Rather than reach for a site builder, the page
was designed as a [Claude Design](https://claude.ai/design) design system — a
one-page consulting landing with a deliberately infrastructure-engineer
aesthetic (monospace-forward, survey/terrain feel, a teal brand with a single
warm copper accent, anchored by the blossom mark) — and then
rebuilt as a real, production static site on the same platform the practice
itself showcases. The case study on the page is that platform, running live.

## What's here

| Path | Purpose |
|---|---|
| `BRAND.md` | The brand contract for the live site — mark, palette, type, conventions. Canonical token *values* live in `public/design-system/`. |
| `src/` | The Astro site (source of truth for layout + copy): `layouts/Layout.astro` (HTML shell + tokens), `pages/index.astro` (the page), `components/` (the ported sections + design-system primitives). |
| `public/design-system/` | The served design tokens (`styles.css` → `tokens/*.css`) and self-hosted fonts (Space Grotesk, JetBrains Mono). |
| `public/favicon.svg` · `public/lentago-mark-square.svg` · `public/banner.svg` | The blossom brand assets (favicon, square mark, README/og banner). |
| `Dockerfile` / `nginx.conf` | Packages the built `dist/` into an `nginx` container on port `8080` with a `/health` endpoint for the ALB. |
| `.github/workflows/deploy.yml` | Build → ECR → ECS rollout via OIDC. Live since 2026-06-30 — runs on every push to `main` (see below). |

## How it's built & served

```bash
npm install
npm run build      # → dist/ (static HTML + CSS, no client JS)
npm run preview    # local preview
```

The design components are **rendered server-side at build time** (no client
hydration) — the output is plain HTML plus the design-system CSS, with no React
shipped to the browser. Docker copies `dist/` into `nginx` (`:8080`, `/health`);
GitHub Actions builds the image, pushes it to ECR, and rolls the ECS service via
the foundry-platform OIDC role, no long-lived credentials.

> **Deploy is live (since 2026-06-30).** The ECR repo, ECS service, and the OIDC
> trust for *this* repo are provisioned by `foundry-platform-demo`
> (`modules/site`), mirroring the pitzilabs-dev wiring. `deploy.yml` runs on
> **every push to `main`** (build → ECR → ECS rollout); `workflow_dispatch` is
> kept for manual redeploys.

## Preview → promotion

While the design is iterated, the site is intended to be reachable only at a
**hidden, unguessable subdomain** of `icecreamtofightwith.com` (covered by that
domain's wildcard certificate, not linked anywhere). Once it's ready it gets
**promoted to the `lentago.dev` FQDN** — see the `modules/site` notes in
foundry-platform-demo. The skeleton service and image are reused unchanged; the
hidden subdomain is then retired.

---

*Part of the [Lentago Labs](https://github.com/lentago) portfolio.*
