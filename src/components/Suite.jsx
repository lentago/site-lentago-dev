import { Eyebrow, StatusDot, Tag } from "./Shared.jsx";
import { showRoadmap } from "../config.js";

// The suite — a dark section listing the five internal systems the practice
// runs on. Each row is offering-led (the capability is the headline; the
// botanical codename is a gold mono tag) and honest about what it stands on:
// a "Runs on" column names the underlying platform outright (Grafana Cloud,
// Axiom, Ansible, Claude Code, AWS…). Replaces the retired ice-cream case
// study in the #work slot. The per-row roadmap line is gated on showRoadmap.
const SYSTEMS = [
  {
    num: "01", codename: "solidago", botanical: 'goldenrod — "to make whole"',
    title: "Cloud platform",
    desc: "A Terraform-managed AWS estate, root module down — VPC across two AZs, ECS Fargate behind an ALB, RDS, WAFv2, KMS. Plan on PR, apply on merge, OIDC-only. Plainly: it's AWS, run the way it should be run. The value is the posture.",
    runsOn: ["AWS", "Terraform", "OIDC"],
    roadmap: "live since 2026-06 · serves lentago.dev",
  },
  {
    num: "02", codename: "kalmia", botanical: "mountain laurel",
    title: "Provisioning",
    desc: "Role-based, idempotent provisioning that turns a fresh Linux box into a configured infrastructure workstation — one command, four target profiles. It's Ansible under the hood; ours is the roles, the profiles, and the discipline.",
    runsOn: ["Ansible", "apt / dnf", "4 profiles"],
    roadmap: "first target: workstations → next: VMs, containers",
  },
  {
    num: "03", codename: "drosera", botanical: "sundew",
    title: "Observability",
    desc: "Dashboards live as JSON and apply by Terraform on merge; one declarative Alloy collector per host. Built on Grafana Cloud — Mimir, Loki, Grafana — and we say so. What's ours is the git discipline: if it isn't in the repo, it doesn't exist.",
    runsOn: ["Grafana Cloud", "Alloy", "Terraform"],
    roadmap: "first source: the Lentago lab → next: AWS (solidago)",
  },
  {
    num: "04", codename: "betula", botanical: "birch — where the logs keep",
    title: "Log capture & archive",
    desc: "Per-source collectors shipping full-volume logs — DNS, flows, TLS handshakes — to Axiom for 30-day search at $0/month. Fluent Bit ships, Axiom stores; betula is the persistence, the packaging, and the GitOps around both.",
    runsOn: ["Fluent Bit", "Axiom", "GitOps"],
    roadmap: "first collector: Firewalla → next: AWS CloudTrail",
  },
  {
    num: "05", codename: "claytonia", botanical: "spring beauty — a.k.a. the bullpen",
    title: "Agent fleet",
    desc: "A self-hosted pool of headless coding agents. Drop a job on the NAS, an idle worker claims it, does the work in a clean checkout, opens a PR. It never merges. Today's workers run Claude Code; the queue doesn't care.",
    runsOn: ["Claude Code", "LXC", "NAS queue"],
    roadmap: "first runtime: Claude Code → next: any agent CLI",
  },
];

export function Suite() {
  return (
    <section id="work" className="ll-section" style={{ background: "var(--color-ink-strong)", color: "var(--fg-on-dark)", padding: "96px 40px", position: "relative", overflow: "hidden" }}>
      {/* Topographic contour lines (fainter than the hero — this section is dense) */}
      <svg viewBox="0 0 1280 480" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        fill="none" stroke="var(--color-on-dark)" strokeOpacity="0.05" strokeWidth="1.4">
        <path d="M-40 380 C 240 320 380 420 640 370 S 1080 290 1320 370" />
        <path d="M-40 320 C 240 260 380 360 640 310 S 1080 230 1320 310" />
        <path d="M-40 260 C 240 200 380 300 640 250 S 1080 170 1320 250" />
        <path d="M-40 200 C 240 140 380 240 640 190 S 1080 110 1320 190" />
      </svg>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: 48, maxWidth: 760 }}>
          <Eyebrow tone="dark" marker style={{ color: "var(--color-accent)", marginBottom: 16 }}>The suite · ~/lentago/</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
            Named systems. <span style={{ color: "var(--color-accent)" }}>Honest parts.</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: 0 }}>
            The practice runs on five internal systems — botanical codenames, all
            New England natives. Each separates an agnostic core from its clients:
            the current implementation is always the first client, never the
            product. And where a system stands on someone else's platform, it says
            so by name.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(243,240,232,0.1)" }}>
          {SYSTEMS.map(s => (
            <div key={s.codename} className="ll-stack ll-suite-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0,1fr) 280px", gap: 40, padding: "36px 0", borderBottom: "1px solid rgba(243,240,232,0.1)" }}>
              {/* Left — genus mark, status, numbered codename, botanical note, repo link */}
              <div>
                <img src={`/marks/${s.codename}-mark-square.svg`} width={40} height={40} alt=""
                     style={{ display: "block", marginBottom: 12 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <StatusDot status="ok" size={6} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-accent)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.num} · {s.codename}</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-faint)", lineHeight: 1.7 }}>{s.botanical}</div>
                <a href={`https://github.com/lentago/${s.codename}`} target="_blank" rel="noopener noreferrer"
                   style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-muted)", textDecoration: "none" }}>lentago/{s.codename} ↗</a>
              </div>

              {/* Middle — offering title + honest description */}
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-on-dark)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>{s.desc}</p>
              </div>

              {/* Right — what it runs on, plus the roadmap line */}
              <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--color-on-dark-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Runs on</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {s.runsOn.map(t => <Tag key={t} onDark>{t}</Tag>)}
                </div>
                {showRoadmap && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-muted)", lineHeight: 1.7 }}>{s.roadmap}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fleet acceptance test — the invariant that keeps clients decoupled */}
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-on-dark-muted)", lineHeight: 1.8 }}>
          <span style={{ color: "var(--color-accent)", marginRight: 8 }}>▲</span>
          fleet acceptance test: adding a client must not touch existing clients. betula keeps the archive; drosera keeps the live pane.
        </div>
      </div>
    </section>
  );
}
