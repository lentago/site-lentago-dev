# ADR-0003: Hosted on the shared platform ALB with a strict platform/workload boundary

**Status:** Accepted (2026-06-30; reconstructed 2026-08-13)

## Context

The site is served as an `nginx` container on ECS Fargate behind the shared
solidago platform ALB, not from its own dedicated infrastructure. Every push to
`main` builds the Astro site, pushes the image to ECR, and rolls the ECS service
via the platform's GitHub OIDC role (no long-lived AWS credentials). The deploy
went live 2026-06-30.

The infrastructure that backs this — the ECR repo, the ECS cluster/service, the
OIDC trust for this repo, and even the production DNS records — is **owned by
the platform**, provisioned in the [solidago](https://github.com/lentago/solidago)
repo (`modules/site`), mirroring the predecessor's `site_pitzilabs` entry. There
is **no Terraform in this repo.** This repo's only coupling to the platform is a
small, editable surface: the resource names in `.github/workflows/deploy.yml`.

That coupling surface was exercised and proven cheap. On 2026-07-08 the platform
renamed every `foundry-dev-*` AWS resource to the `solidago-dev-*` codename
(solidago #102), which recreated the ECR repo, ECS cluster/service, and OIDC
role under new names. This repo's deploy still pointed at the now-deleted
`foundry-dev-*` names, and the site returned HTTP 503 from an empty ECR repo.
The fix (#37, merged 2026-07-08) was a one-surface edit: repoint `deploy.yml`'s
env block at the renamed `solidago-dev-*` resources. The documentation followed
in #38 (merged 2026-07-20), updating `DEPLOYMENT.md`'s resource names.

## Decision

Keep infrastructure ownership on the platform side of a strict boundary. This
repo holds no Terraform and provisions nothing; it consumes platform-owned ECR /
ECS / OIDC / DNS. The workload's entire knowledge of the platform is confined to
the resource-name env block in `deploy.yml` — a single, cheaply-editable
surface. When the platform changes underneath (as with the `foundry-*` →
`solidago-*` rename), the workload adapts by editing that one surface, not by
owning or duplicating infrastructure state.

## Alternatives

**Recorded at the time:**

- **Platform-owned infrastructure, workload holds only a deploy workflow.**
  *Chosen.* The `foundry-*` → `solidago-*` ripple demonstrated the coupling is
  narrowed to one file: #37 repointed `deploy.yml`, #38 repointed the docs,
  nothing else in the repo had to move.
- **Dedicated infrastructure for this site** (its own ALB / cluster / DNS
  stack), the shape a standalone deploy would take. *Worse for a marketing
  page:* it duplicates load-balancer and cluster cost and operational surface
  for a single static site, and abandons the shared-platform model the whole
  fleet is built on. The site does not need isolation that expensive.

**Retrospective — not considered at the time:**

- **Vendor the platform resource names into Terraform in this repo** so the
  workload owns its own view of the infrastructure. *Worse:* it would move
  infrastructure state into the workload repo, widening exactly the coupling
  this decision narrows. The rename incident is the counter-example — with state
  here, `foundry-*` → `solidago-*` would have been a Terraform reconciliation
  with drift and blast radius, instead of a one-line env edit.
- **A static object-store + CDN host** (e.g. an S3/CloudFront-style setup)
  instead of nginx-on-ECS behind the shared ALB. *Lateral, arguably better in
  isolation:* for a purely static site it could be cheaper and simpler to
  operate. But it would sever the site from the shared-platform model that the
  fleet standardizes on — the same OIDC deploy path, ALB, and health-check
  contract every Lentago site uses — trading fleet consistency for a marginal
  per-site cost win. Reasonable in a vacuum; off-pattern for this fleet.

## Consequences

- Platform changes (resource renames, ALB/DNS moves) reach this repo only
  through `deploy.yml`'s resource names. The blast radius of a platform rename
  on the workload is one file.
- The site cannot deploy independently of the platform: if the platform-owned
  ECR/ECS/OIDC resources are absent or renamed without a corresponding
  `deploy.yml` edit, deploys fail (as the 503 incident showed). This is the
  accepted cost of not duplicating infrastructure.
- Production DNS for `lentago.dev` is platform-owned; DNS changes are made in
  solidago, not here.
- `DEPLOYMENT.md` and `CLAUDE.md`'s build/deploy reference must be kept in sync
  with the platform's current resource names, since they are the human-facing
  record of a boundary defined elsewhere.
