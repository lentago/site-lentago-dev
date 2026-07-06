import { Eyebrow } from "./Shared.jsx";

// Six operating principles in a ruled 3-column grid.
export function Principles() {
  const items = [
    { n: "01", title: "Build it, break it, operate it.", desc: "The person who designs the system is the person who carries the pager for it. Otherwise the design is a suggestion, not a commitment." },
    { n: "02", title: "Blast radius over blast capacity.", desc: "Least-privilege isn't a checkbox — it's the default. If a compromised pipeline can reach production, the problem is the pipeline, not the compromise." },
    { n: "03", title: "Runbooks beat heroics.", desc: "An incident handled by a sleepy engineer following the runbook is better than a hero who remembers. Write the doc. Update it when it lies." },
    { n: "04", title: "Observable from day one.", desc: "You cannot operate what you cannot see. Logs, metrics, traces, and a single dashboard a human actually opens. No 'we'll add it later.'" },
    { n: "05", title: "Plan on PR. Apply on merge.", desc: "Infrastructure changes are code review. OIDC, no long-lived credentials, signed artifacts. The pipeline is the contract." },
    { n: "06", title: "Cost is a posture.", desc: "A NAT gateway you forgot about is a security problem. A forgotten log bucket is a compliance problem. Run the audit monthly, not yearly." },
  ];
  return (
    <section id="principles" className="ll-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 40px" }}>
      <div style={{ marginBottom: 56, maxWidth: 720 }}>
        <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>Operating principles</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px", color: "var(--fg1)" }}>
          How we think about production.
        </h2>
        <p style={{ fontSize: 17, color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>
          The full runbook is longer, drier, and in the repo. These are the six
          we'd bring into a room on day one.
        </p>
      </div>
      <div className="ll-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--color-border)" }}>
        {items.map((item, i) => (
          <div key={item.n} className="ll-principle" style={{
            padding: "36px 32px",
            borderBottom: "1px solid var(--color-border)",
            borderRight: (i % 3 !== 2) ? "1px solid var(--color-border)" : "none",
            paddingLeft: (i % 3 === 0) ? 0 : 32,
            paddingRight: (i % 3 === 2) ? 0 : 32,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.1em", marginBottom: 16 }}>{item.n}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--fg1)", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--fg2)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
