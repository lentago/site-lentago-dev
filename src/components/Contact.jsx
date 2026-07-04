import { Eyebrow, Input, Select, Textarea, BrandMark, StatusDot } from "./Shared.jsx";
import { queueCopy } from "../config.js";

// Contact rows + a field-station "consult" form. The design-system version is
// an interactive React form (useState → fake 202 transcript); this is the
// STATIC site, so the form is a styled MOCK for v1 (no backend, no hydration).
// Wiring it (mailto/Formspree) is a separate, intentional change. The prompt
// glyph is the gold ▲ triangulation marker + `lentago` — never `$` or `>`.
export function Contact() {
  return (
    <section id="contact" style={{ background: "var(--color-ink-strong)", color: "var(--fg-on-dark)", padding: "112px 40px 96px", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 1080 480" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        fill="none" stroke="var(--color-accent)" strokeOpacity="0.08" strokeWidth="1.4">
        <path d="M-40 380 C 200 320 320 420 540 370 S 900 290 1120 370" />
        <path d="M-40 320 C 200 260 320 360 540 310 S 900 230 1120 310" />
        <path d="M-40 260 C 200 200 320 300 540 250 S 900 170 1120 250" />
        <path d="M-40 200 C 200 140 320 240 540 190 S 900 110 1120 190" />
      </svg>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 72, alignItems: "start" }}>
        <div>
          <Eyebrow tone="dark" marker style={{ color: "var(--color-accent)", marginBottom: 16 }}>Contact · POST /consult</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(44px, 5.5vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.035em", margin: "0 0 24px" }}>
            Queue's <span style={{ color: "var(--color-accent)" }}>{queueCopy.queueWord}</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--color-on-dark-soft)", lineHeight: 1.55, margin: "0 0 40px", maxWidth: 480 }}>
            Short engagements, long ones, and one-off audits. If you know what
            you need, send the repo. If you don't, send the symptoms.
          </p>
          <div style={{ display: "grid", gap: 20, maxWidth: 480 }}>
            {[
              { k: "Email", v: "chris@lentago.dev", href: "mailto:chris@lentago.dev" },
              { k: "GitHub", v: "github.com/lentago", href: "https://github.com/lentago" },
              { k: "Signal", v: "available on request" },
              { k: "Response", v: "< 24h on weekdays" },
            ].map(row => (
              <div key={row.k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", paddingBottom: 16, borderBottom: "1px solid rgba(243,240,232,0.1)", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{row.k}</span>
                {row.href
                  ? <a href={row.href}
                       {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                       style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--color-on-dark)", textDecoration: "none" }}>{row.v}</a>
                  : <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--color-on-dark)" }}>{row.v}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Field-station consult form — static styled MOCK for v1 (no backend). */}
        <div style={{ background: "var(--color-term-bg)", border: "1px solid var(--color-term-border)", borderRadius: 10, padding: "28px 28px 32px", fontFamily: "var(--font-mono)", fontSize: 13, boxShadow: "var(--shadow-term)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid var(--color-term-border)" }}>
            <span style={{ color: "var(--color-on-dark-faint)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>~/consult.sh</span>
            <span style={{ display: "flex", gap: 5 }}>
              {[0,1,2].map(n => <span key={n} style={{ width: 8, height: 8, borderRadius: 999, background: "#4a4540" }} />)}
            </span>
          </div>

          <div style={{ color: "var(--color-on-dark-soft)", lineHeight: 1.9, display: "grid", gap: 12 }}>
            <Input terminal label="▲ lentago ./new-consult --your=" placeholder="name" />
            <Input terminal label="--email=" type="email" placeholder="you@company.com" />
            <Select terminal label="--scope="
              options={["cost-and-posture-audit", "platform-engineering", "incident-oncall-setup", "ci-cd-supply-chain", "other"]} />
            <Textarea terminal label="--symptoms <<EOF" rows={3} placeholder="NAT gateway eating budget. IAM roles nobody owns." />
            <button type="button" style={{
              marginTop: 8, width: "100%", background: "var(--color-accent)", color: "var(--color-on-accent)",
              border: 0, padding: "12px 18px", borderRadius: "var(--r-md)",
              fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.02em",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>./send --priority=normal</span>
              <span>↵</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)", padding: "40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandMark size={48} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--fg1)", letterSpacing: "-0.02em" }}>Lentago Labs</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", marginLeft: 12, letterSpacing: "0.05em" }}>v2026.07.04</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)" }}>
          Christopher Pitzi · <a href="mailto:chris@lentago.dev" style={{ color: "inherit", textDecoration: "none" }}>chris@lentago.dev</a> · © 2026
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", display: "flex", alignItems: "center", gap: 8 }}>
          <StatusDot status="ok" size={6} /> all systems operational
        </div>
      </div>
    </footer>
  );
}
