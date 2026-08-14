# Architecture decision records

These entries were **reconstructed on 2026-08-13** as part of a fleet-wide ADR
recovery, from this repo's commit history, issues and pull requests, `CLAUDE.md`,
and fleet records (the solidago platform repo and the site-pitzilabs-dev
predecessor). They were not written at the time of the decisions. Each record's
**Status** date is the *original* decision date; the reconstruction date is
noted alongside it. Every evidence anchor (issue/PR numbers, files, dates) was
verified against this repo before being asserted; where an option was never
weighed historically it is marked *"retrospective — not considered at the
time"* and assessed on its own terms, not presented as a decision made then.

The format follows the fleet ADR style
([drosera `docs/adr/`](https://github.com/lentago/drosera/tree/main/docs/adr),
[solidago `docs/decisions/`](https://github.com/lentago/solidago/tree/main/docs/decisions)):
`# ADR-NNNN: <title>`, a **Status** line, then **Context**, **Decision**,
**Alternatives**, **Consequences**.

## Index

- [ADR-0001: Zero-JS static Astro; React renders server-side only](0001-zero-js-static-astro.md)
  — the browser output ships no JavaScript; the contact form posts natively to
  Formspree rather than hydrating.
- [ADR-0002: Downstream of an external design system; no in-repo design/lab tiers](0002-downstream-of-external-design-system.md)
  — a deliberate inversion of the predecessor's three-tier pipeline;
  "design behind live" is the intended steady state.
- [ADR-0003: Hosted on the shared platform ALB with a strict platform/workload boundary](0003-shared-platform-alb-boundary.md)
  — no Terraform in-repo; the platform coupling is narrowed to one editable
  surface in `deploy.yml`.
