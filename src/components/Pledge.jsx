import { Eyebrow } from "./Shared.jsx";

// The delivery pledge — a first-class element carrying ADR-0007 (kits into
// client-owned repos and accounts, never hosted-for-you, no multi-tenancy). A
// light limestone band, bordered top and bottom so it reads as a distinct
// contract rather than another content section. The anti-lock-in claim is made
// true BY CONSTRUCTION: the receipt is the decision record itself, linked below.
const GUARANTEES = [
  { n: "01", title: "Client-owned repos",
    desc: "Every kit ships as a repository you own from day one — a template plus an engagement, in open formats. Not a tenancy on ours." },
  { n: "02", title: "Runs in your accounts",
    desc: "Anything that runs continuously runs in your accounts on free primitives — your Actions cron, your static host, your Grafana free tier. We don't host it." },
  { n: "03", title: "No multi-tenancy",
    desc: "We never operate one system serving many organizations. No shared endpoints, no pooled data, no custody of your records." },
  { n: "04", title: "A fireable retainer",
    desc: "Ongoing help is a retainer on your estate, not a subscription. A hand-off runbook stands from day one; firing it leaves you a working system." },
  { n: "05", title: "Forkable is the exit",
    desc: "Reusable logic is open source. Every kit names what it depends on — GitHub and Actions included — and how to leave each one." },
];

export function Pledge() {
  return (
    <section id="pledge" className="ll-section" style={{
      background: "var(--color-bg-alt)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
      padding: "96px 40px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)", gap: 64, alignItems: "start", marginBottom: 56 }}>
          <div>
            <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>The pledge</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1.03, letterSpacing: "-0.035em", margin: 0, color: "var(--fg1)" }}>
              We will never host your systems <span style={{ color: "var(--color-accent)" }}>for you.</span>
            </h2>
          </div>
          <div style={{ alignSelf: "end" }}>
            <p style={{ fontSize: 18, color: "var(--fg1)", lineHeight: 1.55, margin: "0 0 16px", fontWeight: 500, maxWidth: 520 }}>
              You'll own every piece. We'll teach your people. Firing us is a
              runbook — a fork, not a migration off a service we run.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--fg2)", lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
              An anti-lock-in practice is only believable if walking away is
              trivial. So the boundary isn't a promise — it's the standing
              delivery model, true by construction.
            </p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1, background: "var(--color-border)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--r-lg)", overflow: "hidden",
        }}>
          {GUARANTEES.map(g => (
            <div key={g.n} style={{ background: "var(--color-surface)", padding: "26px 24px 24px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.1em", marginBottom: 14 }}>{g.n}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--fg1)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{g.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.55, margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Receipt — the pledge is a documented decision, not marketing copy. */}
        <a href="https://github.com/lentago/.github/blob/main/docs/adr/0007-client-owned-delivery-no-multi-tenant-saas.md"
           target="_blank" rel="noopener noreferrer"
           className="ll-receipt-link"
           style={{ marginTop: 24, display: "inline-flex", alignItems: "baseline", gap: 8, fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--color-ink)", textDecoration: "none" }}>
          <span style={{ color: "var(--fg2)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10 }}>Receipt</span>
          <span>ADR-0007 · client-owned delivery, no multi-tenant SaaS ↗</span>
        </a>
      </div>
    </section>
  );
}
