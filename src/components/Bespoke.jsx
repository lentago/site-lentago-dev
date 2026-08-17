import { Eyebrow } from "./Shared.jsx";

// The bespoke-engagements shelf — a horizontal row of custom work that isn't a
// productized kit. These are the generic-consulting engagements that used to sit
// in the offerings grid; they moved here because bespoke work doesn't map to a
// single shippable receipt the way the kits do. The shelf's own credibility
// anchor is the incident register (post-mortems published verbatim) plus the
// consult form. Everything here is still delivered under the pledge above.
const SHELF = [
  { tag: "AUDIT", title: "Cost & posture audits",
    desc: "Find the NAT gateway eating the budget; the IAM role nobody owns; the bucket with forgotten logs. One-page report, no theatre." },
  { tag: "MIGRATION", title: "Cloud & datacenter migrations",
    desc: "Bare metal through cloud-native, and the platform shifts in between — moved without losing the rigor or a customer-visible outage." },
  { tag: "ONCALL", title: "Incident response & on-call",
    desc: "Runbooks, alarms, and rotations humans can live with. SLOs that reflect reality, not aspiration. Pager hygiene included." },
  { tag: "CI/CD", title: "CI/CD & supply-chain hardening",
    desc: "OIDC, signed images, plan-on-PR, apply-on-merge. No long-lived credentials, so a compromised pipeline stays inside its scope." },
];

export function Bespoke() {
  return (
    <section id="bespoke" className="ll-section" style={{
      background: "var(--color-bg-alt)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
      padding: "88px 40px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 64, alignItems: "end", marginBottom: 44 }}>
          <div>
            <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>Bespoke engagements</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, color: "var(--fg1)" }}>
              When the work isn't a kit.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--fg2)", margin: 0, maxWidth: 560, lineHeight: 1.6, justifySelf: "end" }}>
            Not everything is a template. Custom work — audits, migrations,
            incident response, hardening — sized to your constraints and
            delivered into your estate under the same pledge. Priced as
            engagements and retainers, never a subscription to something we run.
          </p>
        </div>

        {/* The shelf — a row of engagement types on hairline-bordered cards. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {SHELF.map(item => (
            <div key={item.tag} style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--r-md)",
              padding: "22px 22px 24px",
              display: "flex", flexDirection: "column",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{item.tag}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--fg1)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Receipt + CTA — how the work breaks is on the public record. */}
        <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "baseline" }}>
          <a href="https://github.com/lentago/.github/blob/main/fleet-reports/incidents.md"
             target="_blank" rel="noopener noreferrer"
             className="ll-receipt-link"
             style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--color-ink)", textDecoration: "none" }}>
            <span style={{ color: "var(--fg2)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10 }}>Receipt</span>
            <span>incident register · post-mortems, published verbatim ↗</span>
          </a>
          <a href="#contact" style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--color-ink)", textDecoration: "none" }}>
            Send the symptoms →
          </a>
        </div>
      </div>
    </section>
  );
}
