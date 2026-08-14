# ADR-0002: Downstream of an external design system; no in-repo design/lab tiers

**Status:** Accepted (2026-06-28; reconstructed 2026-08-13)

## Context

Lentago Labs is the "Tidewater" rebrand of the former Pitzi Labs. The layout,
copy skeleton, and Astro architecture were ported from the predecessor repo
[site-pitzilabs-dev](https://github.com/lentago/site-pitzilabs-dev), while the
palette and brand mark are net-new (teal + gold + limestone; the five-petal
blossom).

The predecessor carried a three-tier pipeline in-repo — top-level `design/` and
`lab/` directories feeding `src/` — confirmed by inspection of
site-pitzilabs-dev, which still has both `design/` and `lab/` directories
alongside `src/`. The Lentago port deliberately dropped both tiers.

Instead, the canonical design tokens and brand system live **outside** this
repo, in the "Lentago Labs Design System" project in Claude Design (synced via
the `claude_design` MCP / `DesignSync`). This repo is the *built* product, not a
mirror. `CLAUDE.md` records the boundary: *"There is no in-repo `design/` or
`lab/` tier"*, and the design system is re-pulled *"only when intentionally
re-syncing."* The served token values live under `public/design-system/`
(`styles.css` → `tokens/*.css`), and `BRAND.md` is the in-repo brand contract.

## Decision

Treat this repo as strictly downstream of an external, design-system-first
source. No `design/` or `lab/` staging tiers exist in-repo; the design system in
Claude Design is canon for tokens and brand, and `src/` is authoritative for
layout and copy — it is what ships.

Accept an explicit split of authority: **the design system leads on
tokens/brand; the live site leads on copy/layout.** Because the design system is
re-pulled only on intentional re-syncs, the design system trails the live site
between syncs. "Design behind live" is therefore the expected steady state — the
deliberate inverse of the fleet's usual "live state is the source of truth"
posture, adopted here on purpose because it is what made the rebrand cheap:
re-skinning happened design-system-first rather than by hand-editing a
three-tier pipeline.

## Alternatives

**Recorded at the time:**

- **Keep the predecessor's in-repo `design/` → `lab/` → `src/` pipeline.** The
  inherited model, and the path of least resistance for a port. *Worse for the
  rebrand:* it would have meant re-deriving tokens and brand by hand through
  three tiers instead of pulling a net-new palette and mark from a
  design-system source. The inversion is what made the reskin cheap.
- **Downstream of the external design system, no in-repo design/lab tiers.**
  *Chosen.* Tokens/brand are canon upstream; `src/` ships.

**Retrospective — not considered at the time:**

- **Vendor the design tokens into the repo and sever the Claude Design link**
  (treat `public/design-system/` as the sole source, no upstream). *Lateral:* it
  would remove the external dependency and make the repo fully self-contained,
  which simplifies the "design behind live" ambiguity — but it also discards the
  design-system-first workflow that made the rebrand cheap in the first place,
  and would put brand evolution back into hand-editing CSS. Neither strictly
  better nor worse; a different trade of coupling for self-containment that only
  pays off if upstream syncs stop happening.
- **Adopt the fleet's "live state is source of truth" rule uniformly** and drive
  the design system *from* the site. *Worse here:* it would invert the tool that
  produces the brand, forcing the canonical token generator to chase the built
  product. The whole value of the design-system-first setup is that brand
  changes originate upstream; making the site canonical for tokens would negate
  it.

## Consequences

- Token and brand changes originate in Claude Design and land via an
  intentional `DesignSync` re-pull, then get re-evaluated against `BRAND.md`.
  There is no automatic drift from upstream into the repo.
- Between syncs the design system may lag the live site's copy. This is
  expected, not a defect — but it means "check the design system" is not a
  substitute for reading `src/` when the question is about live copy or layout.
- Anyone extending the site must resist re-introducing a `design/` or `lab/`
  tier; staging work belongs upstream in the design system, not in this repo.
- The split of authority (upstream = tokens/brand, `src/` = copy/layout) has to
  be held in mind when reconciling apparent conflicts: brand questions resolve
  against `BRAND.md` + `public/design-system/`; live-copy questions resolve
  against `src/`.
