import { Eyebrow, ServiceCard } from "./Shared.jsx";

// The offerings grid. Every card maps to a LIVE, linkable receipt — a public
// repo you can read, fork, and run today — so nothing here is an unbuilt
// product. Built from ServiceCard primitives laid out with hairline dividers
// (1px gap over a border-colored background). The section keeps id="practice"
// (the nav anchor) even though the framing moved from generic services to
// receipt-backed offerings; the old generic-consulting services now live in the
// bespoke-engagements shelf, where custom work belongs.
export function ServicesGrid() {
  const gh = "https://github.com/lentago";
  const offerings = [
    { num: "01", tag: "PUBLIC RECORD", title: "A public record your community can trust", status: "ok",
      desc: "A version-controlled public-record site with a grounded Ask box, built into a repo the organization owns. Facts live in git, the site rebuilds on merge, and it serves from a free tier — the fact base is yours to fork the day we finish.",
      meta: ["Astro", "static site", "grounded Ask"],
      receipt: { label: "lentago/site-pondviewlane-com", href: `${gh}/site-pondviewlane-com` } },
    { num: "02", tag: "PLATFORM", title: "Cloud you own, not rent", status: "ok",
      desc: "A reference three-tier AWS platform, 100% Terraform — VPC across two AZs, ECS Fargate behind an ALB, RDS, WAF. Plan on PR, apply on merge, OIDC-only. It's AWS run the way today's standards say it should be, in an account you hold the keys to.",
      meta: ["Terraform", "ECS Fargate", "RDS", "OIDC"],
      receipt: { label: "lentago/solidago", href: `${gh}/solidago` } },
    { num: "03", tag: "OBSERVABILITY", title: "See your systems on a free tier", status: "info",
      desc: "Git-driven observability into the Grafana Cloud free tier — one Alloy collector per host, dashboards that live as JSON and apply by Terraform on merge. Caps and retention windows are managed as real constraints, not billed past.",
      meta: ["Grafana Cloud", "Alloy", "Terraform"],
      receipt: { label: "lentago/drosera", href: `${gh}/drosera` } },
    { num: "04", tag: "ENABLEMENT", title: "We teach your people to run it", status: "ok",
      desc: "The field guide: an operations manual, a day-one path, and hands-on labs that ladder from asking the fleet a question up to owning a pattern. A glossary maps it all onto common enterprise practice. Ownership is only real if your people can operate it.",
      meta: ["Field guide", "Labs", "Glossary"],
      receipt: { label: "lentago/asclepias", href: `${gh}/asclepias` } },
  ];
  return (
    <section id="practice" className="ll-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 40px" }}>
      <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(220px, 340px) 1fr", gap: 64, marginBottom: 56, alignItems: "end" }}>
        <div>
          <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>Offerings</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, color: "var(--fg1)" }}>
            What we build. Where to check.
          </h2>
        </div>
        <p className="ll-services-intro" style={{ fontSize: 16.5, color: "var(--fg2)", margin: 0, maxWidth: 520, lineHeight: 1.6, justifySelf: "end" }}>
          Four things we deliver into estates you own — each one already running
          in the open. Every offering links to a live receipt: a public repo you
          can read, fork, and run today. Nothing here is a slide about something
          unbuilt.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 1, background: "var(--color-border)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--r-lg)", overflow: "hidden",
      }}>
        {offerings.map(s => <ServiceCard key={s.num} {...s} />)}
      </div>
    </section>
  );
}
