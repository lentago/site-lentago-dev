import { Eyebrow, Button, Stat, Tag } from "./Shared.jsx";

// Dark case-study band — topographic contour backing, a browser-chrome mock of
// the live recipe site, and a stat strip built from Stat primitives. The mock's
// action buttons are display-only (href="#"); the page never navigates away.
export function CaseStudy() {
  const stats = [
    { label: "Monthly run cost",   value: "$130",     note: "multi-env, managed" },
    { label: "Cold-start to prod", value: "< 9 min",  note: "terraform apply" },
    { label: "Uptime (90d)",       value: "99.98%",   note: "0 paged incidents" },
    { label: "IAM blast radius",   value: "scoped",   note: "OIDC-only, no keys" },
  ];
  return (
    <section id="work" style={{ background: "var(--color-ink-strong)", color: "var(--fg-on-dark)", padding: "96px 40px", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 1280 480" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        fill="none" stroke="var(--color-on-dark)" strokeOpacity="0.05" strokeWidth="1.4">
        <path d="M-40 380 C 240 320 380 420 640 370 S 1080 290 1320 370" />
        <path d="M-40 320 C 240 260 380 360 640 310 S 1080 230 1320 310" />
        <path d="M-40 260 C 240 200 380 300 640 250 S 1080 170 1320 250" />
        <path d="M-40 200 C 240 140 380 240 640 190 S 1080 110 1320 190" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 72, alignItems: "start" }}>
          <div>
            <Eyebrow tone="dark" marker style={{ color: "var(--color-accent)", marginBottom: 16 }}>Selected work · 2025</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
              Ice Cream to <span style={{ color: "var(--color-accent)" }}>Fight With.</span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 540 }}>
              A live production deployment — recipe site for home cooks, built
              on the Foundry Platform. Not a portfolio piece. A real app, under
              real load, paying real AWS bills.
            </p>
            <p style={{ fontSize: 17, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 540 }}>
              Terraform-managed from the root module down. Plan-on-PR,
              apply-on-merge via OIDC. The blast radius of a compromised
              pipeline is limited to its scope. Runs on personal money.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button size="sm" trailing="↗" href="#">icecreamtofightwith.com</Button>
              <Button size="sm" variant="outline" onDark trailing="↗" href="#">github.com/LentagoLabs</Button>
            </div>
          </div>

          {/* Browser chrome mock */}
          <div style={{ background: "#1f1d1a", border: "1px solid #3a3530", borderRadius: 10, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div style={{ background: "#2a2724", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #3a3530" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0,1,2].map(n => <span key={n} style={{ width: 10, height: 10, borderRadius: 999, background: "#5a524a" }} />)}
              </div>
              <div style={{ flex: 1, background: "#1a1816", fontFamily: "var(--font-mono)", fontSize: 11, color: "#9a948c", padding: "5px 10px", borderRadius: 4 }}>
                <span style={{ color: "var(--status-ok)" }}>●</span> icecreamtofightwith.com/brown-butter
              </div>
            </div>
            <div style={{ background: "var(--color-bg)", padding: "28px 28px 32px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>A Fucking Ordeal · Tier 3</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--fg1)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Brown butter, bourbon, pecan.</h3>
              <p style={{ fontSize: 13, color: "var(--fg2)", margin: "0 0 16px", lineHeight: 1.55 }}>
                A high-wire act of cultural translation. You absolute lunatic.
                We love you for it.
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid var(--color-border)" }}>
                {["45 MIN", "CHURN", "STOVE", "PATIENCE"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(243,240,232,0.1)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {stats.map(s => <Stat key={s.label} {...s} onDark />)}
        </div>
      </div>
    </section>
  );
}
