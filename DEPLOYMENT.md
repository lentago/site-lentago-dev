# Deploying site-lentago-dev (née lentagolabs-dev) on the Foundry Platform

> **Naming note (2026-07-04):** the site repos have since been renamed to the
> `site-<domain>` convention — this repo is now `site-lentago-dev` and
> `pitzilabs-dev` is `site-pitzilabs-dev` (archived). Repo names quoted in the
> historical narrative and Terraform snippets below are as-built at deploy time;
> the OIDC role dual-trusts old and new names during the transition (solidago#89).

A runbook for **Platform Claude** (the Terraform steward of
[solidago](https://github.com/lentago/solidago) (formerly foundry-platform-demo)) to
wire this site onto the shared AWS platform, mirroring how `pitzilabs-dev` is
already hosted.

This site is the **Lentago Labs** landing page — an Astro static site packaged
into an `nginx` container (`:8080`, `/health`), identical in shape to
`pitzilabs-dev`. It rides on the **shared ALB + shared ECS cluster** and is
**live at `lentago.dev`** (apex + `www`). During design it previewed on a hidden
subdomain of `icecreamtofightwith.com` (covered by the `*.icecreamtofightwith.com`
wildcard cert); that preview host was retired on promotion.

> **Status: ✅ provisioned 2026-06-30.** This runbook has been executed — the ECR
> repo, ECS service, and OIDC trust for this repo exist in
> `solidago`, and `deploy.yml` deploys on every push to `main`. The
> steps below are retained as the record of how the wiring was done and as the
> reference for promoting to `lentago.dev` later.
>
> **Why this guide existed.** `lentagolabs-dev/.github/workflows/deploy.yml` was
> already written and parameterised for `foundry-dev-lentago`, but it could not
> authenticate until the platform side existed: the ECR repo, the ECS service,
> and — critically — the **OIDC trust** for this repo, all created in
> `solidago`.

---

## What already exists on the platform (reused, not created)

The `site` module (`modules/site/`) reuses all of this — you do **not** create
any of it again:

- VPC, private app subnets, the **app security group** (already allows
  `ALB → app:8080`)
- The **shared ALB** + its **HTTPS listener** with the `*.icecreamtofightwith.com`
  wildcard cert
- The **shared ECS cluster** (`foundry-dev-cluster`)
- The **ECS task execution + task roles**
- The Route 53 hosted zone for `icecreamtofightwith.com`
- The **app deploy OIDC role** `foundry-dev-github-actions`
  (`arn:aws:iam::365184644049:role/foundry-dev-github-actions`) — its ECR/ECS
  permissions are already account-scoped, so a new workload repo only needs to be
  **added to its trust list**, nothing more.

## What this site needs created (one `site` module instance)

Same unit pitzilabs uses (`module.site_pitzilabs`): its own ECR repo, task
definition, ECS service on the shared cluster, target group, a host-header
listener rule, and a Route 53 alias.

| Thing | Value |
|---|---|
| Site `name` | `lentago` → resources named `foundry-dev-lentago` |
| ECR repo | `foundry-dev-lentago` |
| ECS service | `foundry-dev-lentago` (on shared cluster `foundry-dev-cluster`) |
| Listener rule priority | **`110`** (100 is taken by pitzilabs — must be unique) |
| Preview hostname | a **single-label** subdomain of `icecreamtofightwith.com` (wildcard-covered), supplied out-of-band via an Actions variable |
| OIDC trust to add | `lentagolabs-dev` |
| Region / account | `us-east-1` / `365184644049` |

---

## Step 1 — Add the repo to the app OIDC trust

In `environments/dev/main.tf`, the `module "iam"` block, extend
`additional_app_github_repos`:

```hcl
  # Pitzi Labs landing (pitzilabs-dev) and its Lentago Labs rebrand
  # (lentagolabs-dev) both ride on the shared ALB via the same app OIDC role.
  additional_app_github_repos = ["pitzilabs-dev", "lentagolabs-dev"]
```

This is what lets `lentago/lentagolabs-dev`'s deploy workflow assume
`foundry-dev-github-actions`. Without it the deploy fails at
`configure-aws-credentials` with an STS `AssumeRoleWithWebIdentity` trust error.

## Step 2 — Add the `site` module instance

In `environments/dev/main.tf`, after `module "site_pitzilabs"`, add a sibling
(identical except `name`, `listener_rule_priority`, and `hostname`):

```hcl
# --- Additional site: Lentago Labs landing (lentagolabs-dev) ---
# The "Tidewater" rebrand of pitzilabs-dev. Same shape as module.site_pitzilabs:
# rides the shared ALB + ECS cluster behind a hidden subdomain of
# icecreamtofightwith.com (wildcard cert, no new cert), reuses the app SG and ECS
# task roles. Promoted to lentago.dev later (reuse this module).
module "site_lentago" {
  source = "../../modules/site"

  project     = var.project
  environment = var.environment
  name        = "lentago"
  aws_region  = var.aws_region

  hostname               = var.lentago_preview_host
  listener_rule_priority = 110

  vpc_id            = module.vpc.vpc_id
  app_subnet_ids    = module.vpc.app_subnet_ids
  security_group_id = module.security_groups.app_security_group_id
  ecs_cluster_id    = module.ecs.cluster_id

  https_listener_arn = module.alb.https_listener_arn
  alb_dns_name       = module.alb.alb_dns_name
  alb_zone_id        = module.alb.alb_zone_id
  route53_zone_id    = module.dns.zone_id

  task_execution_role_arn = module.iam.ecs_task_execution_role_arn
  task_role_arn           = module.iam.ecs_task_role_arn

  # Low-traffic preview: one task is plenty.
  desired_count = 1
}
```

## Step 3 — Declare the preview-host variable + outputs

In `environments/dev/variables.tf` (mirror `pitzilabs_preview_host`):

```hcl
variable "lentago_preview_host" {
  description = <<-EOT
    Hidden, unguessable single-label subdomain of icecreamtofightwith.com that
    the Lentago Labs site previews on before promotion to lentago.dev. NOT
    committed to source — supplied by the terraform workflow from the repo
    Actions variable LENTAGO_PREVIEW_HOST (TF_VAR_lentago_preview_host). Must be
    a single label so the *.icecreamtofightwith.com wildcard cert covers it.
  EOT
  type        = string
}
```

In `environments/dev/outputs.tf` (mirror the three `pitzilabs_*` outputs):

```hcl
output "lentago_preview_url" {
  description = "Hidden preview URL for the Lentago Labs site"
  value       = module.site_lentago.url
}
output "lentago_ecr_repository_url" {
  description = "ECR repo the lentagolabs-dev deploy workflow pushes images to"
  value       = module.site_lentago.ecr_repository_url
}
output "lentago_ecs_service_name" {
  description = "ECS service name for the Lentago Labs site"
  value       = module.site_lentago.service_name
}
```

## Step 4 — Supply the hidden host to the Terraform pipeline

1. On `foundry-platform-demo`, create a **repo Actions variable**
   `LENTAGO_PREVIEW_HOST` — a fresh single-label subdomain, e.g.
   `lt-preview-7q2x9k.icecreamtofightwith.com` (don't reuse the pitzilabs one;
   keep it unguessable and out of git).

   ```bash
   gh variable set LENTAGO_PREVIEW_HOST \
     --repo lentago/foundry-platform-demo \
     --body 'lt-preview-7q2x9k.icecreamtofightwith.com'
   ```

2. In `.github/workflows/terraform.yml`, add the `TF_VAR_` line next to the
   existing pitzilabs one in **both** the plan and apply `env:` blocks:

   ```yaml
       TF_VAR_pitzilabs_preview_host: ${{ vars.PITZILABS_PREVIEW_HOST }}
       TF_VAR_lentago_preview_host: ${{ vars.LENTAGO_PREVIEW_HOST }}
   ```

   (For a local `terraform plan/apply`, export `TF_VAR_lentago_preview_host`
   instead.)

## Step 5 — Plan & apply

Open a PR on `foundry-platform-demo` with Steps 1–4. Let the Terraform pipeline
`plan` on the PR; review that it adds **only** the `module.site_lentago.*`
resources (ECR repo, log group, target group, listener rule, task def, ECS
service, Route 53 record) and the IAM trust update — and touches nothing on the
primary app or pitzilabs. Merge to apply.

> **Expected, not a problem:** the ECS service is created with `desired_count = 1`
> but **0 running tasks** until the first image exists — `aws_ecs_service` here
> does not wait for steady state, so `apply` completes cleanly. The service goes
> healthy on the first deploy (Step 6), when an image lands in ECR.

After apply, confirm the new outputs resolve:

```bash
cd environments/dev
terraform output lentago_preview_url
terraform output lentago_ecr_repository_url   # .../foundry-dev-lentago
terraform output lentago_ecs_service_name     # foundry-dev-lentago
```

---

## Step 6 — Hand back to the site repo (first deploy) ✅ done

The only change on `lentagolabs-dev` was the push trigger in its
`.github/workflows/deploy.yml`, now in place:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch: {}
```

The deploy workflow is already correct for the names above
(`ECR_REPO`/`ECS_SERVICE` = `foundry-dev-lentago`, cluster
`foundry-dev-cluster`, role `foundry-dev-github-actions`). Merging that change to
`main` (or a manual **Run workflow**) then:

1. `npm ci && npm run build` → `dist/`
2. `docker build` the nginx image, push `:latest` + `:<sha>` to ECR
   `foundry-dev-lentago`
3. `aws ecs update-service --force-new-deployment` on `foundry-dev-lentago`
4. `aws ecs wait services-stable` — the task pulls `:latest`, passes the
   `/health` check, the target group goes healthy.

## Step 7 — Verify

```bash
# Health endpoint through the ALB on the hidden host
curl -sS https://<LENTAGO_PREVIEW_HOST>/health        # -> OK

# Service is running 1/1
aws ecs describe-services --cluster foundry-dev-cluster \
  --services foundry-dev-lentago --region us-east-1 \
  --query 'services[0].{desired:desiredCount,running:runningCount}' --profile foundry
```

Then load `https://<LENTAGO_PREVIEW_HOST>/` — you should get the teal/copper
Lentago Labs landing page.

## Promotion to lentago.dev — done ✅

The site was promoted to `lentago.dev` on 2026-07-01. Rather than repointing the
preview `hostname`, it was done with a reusable **`modules/apex-domain`** in
foundry (`module.lentago_domain`), which keeps `site_lentago` as the backend and
adds the public domain in front of it:

- Its own Route 53 hosted zone for `lentago.dev` (nameservers re-delegated from
  Squarespace to Route 53 — the two-phase apply).
- A dedicated ACM cert for `lentago.dev` + `www.lentago.dev`, attached to the
  shared HTTPS listener via SNI (the `*.icecreamtofightwith.com` wildcard stays
  the default cert).
- A host-header rule routing `lentago.dev` / `www` to the existing
  `site_lentago` target group, plus apex + `www` A-ALIAS records to the ALB.

The hidden `lt-preview-*.icecreamtofightwith.com` host was then retired
(`site_lentago` sets `create_dns_record = false`). `astro.config.mjs` `site` is
`https://lentago.dev`.

---

## One-glance summary

| | Platform side (`foundry-platform-demo`) | Site side (`lentagolabs-dev`) |
|---|---|---|
| **Edits** | iam trust + `module.site_lentago` + var + 3 outputs + CI `TF_VAR` line + `LENTAGO_PREVIEW_HOST` Actions var | restore `push: [main]` trigger in `deploy.yml` |
| **Creates** | ECR `foundry-dev-lentago`, ECS service, target group, listener rule (prio 110), Route 53 alias, OIDC trust | first container image |
| **Owner** | Platform Claude | Site Claude |
