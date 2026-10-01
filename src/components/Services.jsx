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
      desc: "A public-record website for your community — the minutes, bylaws, and documents people keep asking for — with an Ask box that answers only from those documents. It lives in a repository your organization owns, updates when you approve a change, and runs on a free tier. The day we finish, it's yours.",
      meta: ["Astro", "static site", "grounded Ask"],
      receipt: { label: "lentago/site-pondviewlane-com", href: `${gh}/site-pondviewlane-com` } },
    { num: "02", tag: "PLATFORM", title: "Cloud you own, not rent", status: "ok",
      desc: "A complete AWS environment written entirely as code: private networking, containers behind a load balancer, a managed database, a firewall, budgets and alarms. Every change is reviewed before it's applied, and no long-lived cloud passwords exist anywhere. It's AWS run the way it should be, in an account you hold the keys to — and because it costs real money, the runbook also tells you how to turn it off.",
      meta: ["Terraform", "ECS Fargate", "RDS", "OIDC"],
      receipt: { label: "lentago/solidago", href: `${gh}/solidago` } },
    { num: "03", tag: "OBSERVABILITY", title: "See your systems on a free tier", status: "info",
      desc: "Dashboards and alerts for everything you run, on Grafana Cloud's free tier. One small collector per machine, dashboards kept as files you can review before they change, and the free tier's limits treated as real constraints to plan around — not something to buy past.",
      meta: ["Grafana Cloud", "Alloy", "Terraform"],
      receipt: { label: "lentago/drosera", href: `${gh}/drosera` } },
    { num: "04", tag: "ENABLEMENT", title: "We show your people how to run it", status: "ok",
      desc: "The guide, in two volumes. Vol. 1 walks through how our own estate works, with labs you can run against it for free, starting with nothing but a browser. Vol. 2 gets a product into your accounts and running from an ops vault you own. Ownership is only real if your people can operate it.",
      meta: ["Guide", "Labs", "Ops vault"],
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
          in the open, because we practice what we publish. Every offering links
          to a live receipt: a public repo you can read, fork, and run today.
          Nothing here is a slide about something unbuilt.
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
