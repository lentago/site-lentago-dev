# site-lentago-dev — Lentago Labs landing site

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/lentago/site-lentago-dev)

The landing site for **Lentago Labs**, the infrastructure-operations consulting
practice, live at [lentago.dev](https://lentago.dev). It's an Astro static
site served as a container on the
[solidago](https://github.com/lentago/solidago)
AWS stack (GitHub OIDC → ECR → ECS Fargate → ALB), the same platform that runs
[icecreamtofightwith.com](https://icecreamtofightwith.com).

> **Rebrand note.** Lentago Labs is the rebrand of the former **Pitzi Labs** —
> same business, same operator, same fonts and runbook voice. What changed: the
> name, the palette (navy + orange + cream → **teal + gold + limestone**), and
> the brand motif (terminal `<pl:>` command-prompt → a **five-petal blossom mark
> + survey contour lines**). The original site lives at
> [site-pitzilabs-dev](https://github.com/lentago/site-pitzilabs-dev).

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
anther-gold accent, anchored by the blossom mark) — and then
rebuilt as a real, production static site on the same platform the practice
itself showcases. The systems the page names are real: the site ships on
`solidago`, the cloud platform listed in its own suite section.

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
the solidago platform OIDC role, no long-lived credentials.

> **Deploy is live (since 2026-06-30).** The ECR repo, ECS service, and the OIDC
> trust for *this* repo are provisioned by `solidago`
> (`modules/site`), mirroring the `site_pitzilabs` wiring. `deploy.yml` runs on
> **every push to `main`** (build → ECR → ECS rollout); `workflow_dispatch` is
> kept for manual redeploys.

## Live at lentago.dev

The site is live at **[lentago.dev](https://lentago.dev)** (apex + `www`), served
from the shared solidago ALB. During design it was reachable only at a hidden,
unguessable subdomain of `icecreamtofightwith.com`; that preview host was retired
on promotion. The promotion is Terraform-managed in solidago via
`modules/apex-domain` (`module.lentago_domain`): its own Route 53 zone + ACM cert
(apex + `www`, attached to the shared HTTPS listener via SNI) + a host-header rule
to the existing `site_lentago` backend. The service and image are unchanged.

---

*Part of the [Lentago Labs](https://github.com/lentago) portfolio.*
