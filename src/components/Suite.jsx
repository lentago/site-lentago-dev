import { Eyebrow, StatusDot, Tag } from "./Shared.jsx";
import { showRoadmap } from "../config.js";

// The suite — a dark section listing the five internal systems the practice
// runs on. Each row is offering-led (the capability is the headline; the
// botanical codename is a gold mono tag) and honest about what it stands on:
// a "Runs on" column names the underlying platform outright (Grafana Cloud,
// Axiom, Ansible, Claude Code, AWS…). Replaces the retired ice-cream case
// study in the #systems slot. The per-row roadmap line is gated on showRoadmap.
const SYSTEMS = [
  {
    num: "01", codename: "solidago", botanical: 'goldenrod — "to make whole"',
    title: "Cloud platform",
    desc: "Our AWS setup, written entirely as code: network, servers, database, web firewall, and encryption keys. Every change is proposed, reviewed, and applied automatically once it's approved, and nothing stores a long-lived password. It's what serves this site.",
    runsOn: ["AWS", "Terraform", "GitHub Actions"],
    roadmap: "live since 2026-06 · serves lentago.dev",
  },
  {
    num: "02", codename: "kalmia", botanical: "mountain laurel",
    title: "Machine setup",
    desc: "Turns a freshly installed Linux computer into a fully set-up work machine with one command. Running it again is always safe: it only fixes what's out of place. Five ready-made profiles cover different kinds of machines.",
    runsOn: ["Ansible", "Debian / Ubuntu", "Fedora"],
    roadmap: "today: work machines → next: virtual machines and containers",
  },
  {
    num: "03", codename: "drosera", botanical: "sundew",
    title: "Monitoring",
    desc: "Shows what your systems are doing right now, on dashboards anyone can read. One small collector on each machine sends in the numbers and logs. Every dashboard is saved as code and published on approval, so nobody's hand edit gets lost or drifts. If it isn't in the repo, it doesn't exist.",
    runsOn: ["Grafana Cloud", "Grafana Alloy", "Terraform"],
    roadmap: "first: our own machines, then our AWS account → next: one view across several setups",
  },
  {
    num: "04", codename: "betula", botanical: "birch — where the logs keep",
    title: "Log capture & archive",
    desc: "Keeps a complete, searchable record of what happens on a network: every domain looked up, every connection, every encrypted session opened. Each source sends its records wherever suits it: our firewall's go to Grafana's free tier, searchable at $0 a month, and our AWS account's go to Axiom.",
    runsOn: ["Fluent Bit", "Grafana Loki", "Axiom"],
    roadmap: "first source: our Firewalla → next: AWS's record of who changed what (CloudTrail)",
  },
  {
    num: "05", codename: "claytonia", botanical: "spring beauty — a.k.a. the bullpen",
    title: "AI coding agents",
    desc: "A small pool of AI coding assistants that work unattended on our own hardware. Drop a job in a shared folder, and a free worker picks it up, does the work on a fresh copy of the code, and proposes the change for review. It can't approve its own work; a person always decides. Today's workers run Claude Code, but any assistant could take the jobs.",
    runsOn: ["Claude Code", "Proxmox", "GitHub"],
    roadmap: "today: Claude Code → next: any AI coding tool",
  },
];

export function Suite() {
  return (
    <section id="systems" className="ll-section" style={{ background: "var(--color-ink-strong)", color: "var(--fg-on-dark)", padding: "96px 40px", position: "relative", overflow: "hidden" }}>
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
            Five systems run our own shop, and every one is free to take. Each
            is built so the parts specific to us swap out for yours. Where a
            system stands on someone else's platform, the Runs on column names
            it. The codenames are New England native plants.
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

        {/* Built-to-swap promise — the fleet acceptance test, in plain words */}
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-on-dark-muted)", lineHeight: 1.8 }}>
          <span style={{ color: "var(--color-accent)", marginRight: 8 }}>▲</span>
          built to swap: replace any piece with your own without touching the rest. betula keeps the record; drosera shows what's happening now.
        </div>
      </div>
    </section>
  );
}
