import { Eyebrow, ServiceCard } from "./Shared.jsx";

// The four-up offerings grid, built from ServiceCard primitives laid out with
// hairline dividers (1px gap over a border-colored background).
export function ServicesGrid() {
  const services = [
    { num: "01", tag: "PLATFORM", title: "Platform engineering", status: "ok",
      desc: "Greenfield AWS / GCP / Azure builds. Terraform-managed, multi-AZ, least-privilege, observable from day one. Not a single-app deployment — a platform.",
      meta: ["Terraform", "ECS Fargate", "OIDC", "WAFv2"] },
    { num: "02", tag: "AUDIT", title: "Cost & posture audits", status: "warn",
      desc: "Find the NAT gateway eating your budget. Find the IAM role nobody owns. Find the S3 bucket with 40 TB of forgotten logs. One-page report, no theatre.",
      meta: ["AWS", "IAM", "CUR", "Trusted Advisor"] },
    { num: "03", tag: "ONCALL", title: "Incident & on-call", status: "info",
      desc: "Runbooks, alarms, and rotations that humans can actually live with. Pager hygiene included. SLOs that reflect reality, not aspiration.",
      meta: ["PagerDuty", "CloudWatch", "SLOs", "Runbooks"] },
    { num: "04", tag: "CI/CD", title: "CI/CD & supply chain", status: "err",
      desc: "OIDC, signed images, plan-on-PR, apply-on-merge. No long-lived credentials anywhere. The blast radius of a compromised pipeline is limited to its scope.",
      meta: ["GitHub Actions", "OIDC", "Cosign", "SBOM"] },
  ];
  return (
    <section id="practice" className="ll-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 40px" }}>
      <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(220px, 340px) 1fr", gap: 64, marginBottom: 56, alignItems: "end" }}>
        <div>
          <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>Services</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, color: "var(--fg1)" }}>
            What we'll do for you.
          </h2>
        </div>
        <p className="ll-services-intro" style={{ fontSize: 16.5, color: "var(--fg2)", margin: 0, maxWidth: 520, lineHeight: 1.6, justifySelf: "end" }}>
          Four things, done well. No frameworks, no decks, no "digital transformation."
          Just infrastructure you can read, run, and hand off.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 1, background: "var(--color-border)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--r-lg)", overflow: "hidden",
      }}>
        {services.map(s => <ServiceCard key={s.num} {...s} />)}
      </div>
    </section>
  );
}
