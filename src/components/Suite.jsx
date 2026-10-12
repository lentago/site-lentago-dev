import { Eyebrow, Tag } from "./Shared.jsx";
import { showRoadmap } from "../config.js";

// The suite — a dark section drawn as the six-promise map (lentago/.github
// ADR-0012). Six promises every shop needs, then three for when you need them
// (dashed, lighter), then the free primitives the map leans on. The codenames
// are parts under exactly one promise: genus mark, gold mono codename, the
// plain-words role from the ADR's table, and a tier chip. Codenames never go in
// a headline. The guide (asclepias + lupinus) is a spine line under the map, not
// a card; the pledge is linked (#pledge), not repeated. Promise names and
// one-liners are copied verbatim from the "The six promises" block in
// lentago/.github docs/voice.md — change them there first.
//
// Shipped parts and free primitives always render. Projected work (open issues
// on the offerings epic, lentago/.github#134) renders only as the per-promise
// "next:" line, gated on showRoadmap, so nothing projected is advertised.

const gh = "https://github.com/lentago";
const issue = (repo, n) => `${gh}/${repo}/issues/${n}`;

// Tiers copied from lentago/lupinus guide/tiers.md on 2026-10-12. That file is
// the ONLY source of truth for a part's tier; re-copy from it, never decide a
// tier here. Where it lists two rows for one repo, both are shown with the
// row's scope. uvularia has no row there yet (lentago/lupinus#24), so it shows no tier.
const KIT = "Kit", PLATFORM = "Platform", PATTERN = "Pattern";

const PARTS = {
  monarda:   { role: "campaign page",         tiers: [[KIT]] },
  uvularia:  { role: "records and deadlines", tiers: [] },
  kalmia:    { role: "machine setup",         tiers: [[KIT, "workstations"], [PATTERN, "Proxmox guests"]] },
  drosera:   { role: "alerts and status",     tiers: [[KIT, "status page"], [PATTERN, "full stack"]] },
  betula:    { role: "capture and keep",      tiers: [[PATTERN]] },
  mitchella: { role: "front desk",            tiers: [[PATTERN]] },
  ledger:    { role: "what you'd lose",       tiers: [[KIT]],
               name: "lock-in ledger", mark: "/lentago-mark-square.svg",
               href: `${gh}/.github/tree/main/fleet-reports/lock-in` },
  epigaea:   { role: "building sensors",      tiers: [[PATTERN]] },
  brasenia:  { role: "lobby screen",          tiers: [[PATTERN]] },
  solidago:  { role: "cloud you own",         tiers: [[PLATFORM]] },
  osmunda:   { role: "cloud you own",         tiers: [[KIT, "drills"], [PATTERN, "Kubernetes"]] },
  claytonia: { role: "AI with receipts",      tiers: [[PATTERN]] },
};

const PROMISES = [
  {
    id: "site", name: "Your site and giving page",
    line: "a campaign page you own outright, with a donate button that goes straight to your payment processor.",
    parts: ["monarda"],
    next: [
      { label: "digital custody audit", href: issue(".github", 124) },
      { label: "accessible by default", href: issue(".github", 247) },
    ],
  },
  {
    id: "records", name: "Your records and your proof",
    line: "minutes, policies, and filings in one vault, the posting rules beside them, and a public board that shows what went up on time. When the board, the auditor, the funder, or the insurer asks, you send a link.",
    parts: ["uvularia"],
    next: [
      { label: "good-standing kit", href: issue(".github", 122) },
      { label: "insurance receipts", href: issue(".github", 125) },
      { label: "board pack", href: issue(".github", 249) },
      { label: "funder report", href: issue(".github", 130) },
      { label: "privacy posture", href: issue(".github", 131) },
    ],
  },
  {
    id: "machines", name: "Your machines and logins",
    line: "every laptop set up the same way, every login with a named owner, and leaving is a pull request, a proposed change someone else reviews before it lands.",
    parts: ["kalmia"],
    next: [
      { label: "donated-hardware profiles", href: issue("kalmia", 107) },
      { label: "credential register", href: issue(".github", 243) },
      { label: "end-of-life radar", href: issue(".github", 248) },
    ],
  },
  {
    id: "alarms", name: "Your alarms and status",
    line: "know when something breaks before the executive director does, and a file that says who gets the call.",
    parts: ["drosera", "betula"],
    next: [
      { label: "are we open", href: issue("drosera", 197) },
      { label: "sensor trip opens a work order", href: issue(".github", 195) },
    ],
  },
  {
    id: "helpdesk", name: "Your help desk and runbooks",
    line: "requests land in a list, answers come from runbooks you wrote once, and the front desk answers at 9 pm.",
    parts: ["mitchella"],
    next: [
      { label: "help-desk starter", href: issue(".github", 196) },
      { label: "institutional memory", href: issue(".github", 126) },
    ],
  },
  {
    id: "exit", name: "Your data and your exit",
    line: "every export you'd need to leave a vendor, on a schedule, into a repo you own, with a restore you've drilled.",
    parts: ["ledger"],
    // betula serves two promises; it's listed once (alarms) and cross-referenced here (ADR-0012).
    seeAlso: { part: "betula", role: "exports", promise: "alarms" },
    next: [
      { label: "liberation pipeline", href: issue(".github", 123) },
    ],
  },
];

const WHEN_NEEDED = [
  {
    id: "building", name: "Your building",
    line: "sensors, and a lobby screen that says whether you're open",
    parts: ["epigaea", "brasenia"],
    next: [
      { label: "facilities telemetry kit", href: issue(".github", 129) },
      { label: "lobby-pane variant", href: issue("brasenia", 41) },
    ],
  },
  {
    id: "cloud", name: "Cloud you own",
    line: "a real AWS environment in your account, as code",
    parts: ["solidago", "osmunda"],
  },
  {
    id: "ai", name: "AI with receipts",
    line: "agents that open pull requests and never merge",
    parts: ["claytonia"],
    next: [
      { label: "the guide page", href: issue(".github", 127) },
    ],
  },
];

// Free primitives: not ours, cost nothing, and the map leans on them.
const FREE = [
  "a free GitHub organization",
  "Grafana Cloud free",
  "a payment processor's hosted page",
  "Google Workspace for Nonprofits or Microsoft 365's free nonprofit plan",
  "Apple Business",
  "Slack for Nonprofits",
  "your own hardware",
];

const GUIDE = [
  { codename: "asclepias", role: "vol. 1 · how our own estate works, with labs you run for free" },
  { codename: "lupinus",   role: "vol. 2 · getting a part into your accounts, run from an ops vault you own" },
];

const hair = "1px solid rgba(243,240,232,0.12)";
const monoLabel = { fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--color-on-dark-faint)", textTransform: "uppercase", letterSpacing: "0.1em" };

function Part({ id }) {
  const p = PARTS[id];
  const name = p.name || id;
  return (
    <li style={{ display: "grid", gridTemplateColumns: "28px minmax(0,1fr)", gap: 12, alignItems: "start", padding: "12px 0", borderTop: hair }}>
      <img src={p.mark || `/marks/${id}-mark-square.svg`} width={28} height={28} alt="" style={{ display: "block" }} />
      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
          <a href={p.href || `${gh}/${id}`} target="_blank" rel="noopener noreferrer" className="ll-part-tag"
             style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-accent)", letterSpacing: "0.04em", textDecoration: "none", padding: "2px 7px", borderRadius: "var(--r-xs)" }}>
            {name} ↗
          </a>
          {p.tiers.map(([tier, scope]) => (
            <Tag key={tier + (scope || "")} onDark>{scope ? `${tier} · ${scope}` : tier}</Tag>
          ))}
        </div>
        <div style={{ fontSize: 13.5, color: "var(--color-on-dark-soft)", lineHeight: 1.4 }}>{p.role}</div>
      </div>
    </li>
  );
}

function Next({ items }) {
  if (!showRoadmap || !items || !items.length) return null;
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-muted)", lineHeight: 1.8, marginTop: 12 }}>
      next:{" "}
      {items.map((n, i) => (
        <span key={n.href}>
          {i > 0 && " · "}
          <a href={n.href} target="_blank" rel="noopener noreferrer" className="ll-next-link"
             style={{ textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: 3 }}>{n.label}</a>
        </span>
      ))}
    </div>
  );
}

function PromiseCard({ p, num, light = false }) {
  const titleId = `promise-${p.id}-title`;
  return (
    <article id={`promise-${p.id}`} tabIndex={0} aria-labelledby={titleId} className="ll-promise-card"
      style={{
        display: "flex", flexDirection: "column",
        padding: light ? "22px 22px 18px" : "26px 24px 20px",
        background: light ? "transparent" : "rgba(243,240,232,0.04)",
        border: light ? "1px dashed rgba(243,240,232,0.24)" : "1px solid rgba(243,240,232,0.14)",
        borderRadius: "var(--r-md)",
      }}>
      {num && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-on-dark-faint)", letterSpacing: "0.1em", marginBottom: 12 }}>{num}</div>}
      <h3 id={titleId} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: light ? 18 : 21, color: "var(--color-on-dark)", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{p.name}</h3>
      <p className="ll-promise-line" style={{ fontSize: light ? 13.5 : 14.5, color: "var(--color-on-dark-soft)", lineHeight: 1.55, margin: "0 0 16px", flex: 1 }}>{p.line}</p>
      <ul aria-label={`Parts of ${p.name.toLowerCase()}`} style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {p.parts.map(id => <Part key={id} id={id} />)}
      </ul>
      {p.seeAlso && (
        <div style={{ fontSize: 13, color: "var(--color-on-dark-soft)", lineHeight: 1.5, padding: "10px 0 0", borderTop: hair }}>
          {p.seeAlso.role}: <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}>{p.seeAlso.part}</span>, listed under{" "}
          <a href={`#promise-${p.seeAlso.promise}`} style={{ color: "var(--color-on-dark)", textUnderlineOffset: 3 }}>
            {PROMISES.find(x => x.id === p.seeAlso.promise).name.toLowerCase()}
          </a>
        </div>
      )}
      <Next items={p.next} />
    </article>
  );
}

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
            Six promises. <span style={{ color: "var(--color-accent)" }}>Honest parts.</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: "0 0 14px" }}>
            Six things every shop needs, and three for when you need them. Under
            each one are the parts that keep it, and every part is free to take.
            The codename is the part's name (they're New England native plants);
            the plain words say what it does.
          </p>
          <p style={{ fontSize: 15, color: "var(--color-on-dark-soft)", lineHeight: 1.6, margin: 0 }}>
            The chip is the part's tier, which is how much work it takes to stand
            up in your own accounts. A Kit you clone and stand up from the repo
            alone. A Platform takes about a day's work with your own accounts. A
            Pattern you read and lift pieces from. Tiers come from the{" "}
            <a href="https://github.com/lentago/lupinus/blob/main/guide/tiers.md" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--color-on-dark)", textUnderlineOffset: 3 }}>tier registry ↗</a>,
            and if it disagrees with this page, it wins.
          </p>
        </div>

        {/* Band 1 — the six promises, three by two (one column on phones) */}
        <div className="ll-stack ll-promise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
          {PROMISES.map((p, i) => <PromiseCard key={p.id} p={p} num={String(i + 1).padStart(2, "0")} />)}
        </div>

        {/* Band 2 — when you need them: dashed and lighter */}
        <div style={{ ...monoLabel, margin: "40px 0 14px" }}>When you need them</div>
        <div className="ll-stack ll-promise-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
          {WHEN_NEEDED.map(p => <PromiseCard key={p.id} p={p} light />)}
        </div>

        {/* Band 3 — what's free and not ours */}
        <div style={{ marginTop: 40 }}>
          <div style={{ ...monoLabel, marginBottom: 6 }}>What's free and not ours</div>
          <p style={{ fontSize: 14, color: "var(--color-on-dark-soft)", lineHeight: 1.55, margin: "0 0 12px", maxWidth: 640 }}>
            The map leans on these. They cost you nothing, and none of them is ours.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FREE.map(f => (
              <li key={f}><Tag onDark style={{ borderRadius: 999, padding: "4px 11px", whiteSpace: "normal" }}>{f}</Tag></li>
            ))}
          </ul>
        </div>

        {/* The spine — the guide runs under the whole map; it's the manual, not a product */}
        <div style={{ marginTop: 44, paddingTop: 18, borderTop: "2px solid rgba(224,168,28,0.45)" }}>
          <div style={{ ...monoLabel, marginBottom: 12 }}>The guide · under every promise</div>
          <div className="ll-stack" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 16 }}>
            {GUIDE.map(g => (
              <div key={g.codename} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={`/marks/${g.codename}-mark-square.svg`} width={28} height={28} alt="" style={{ display: "block", flexShrink: 0 }} />
                <a href={`${gh}/${g.codename}`} target="_blank" rel="noopener noreferrer" className="ll-part-tag"
                   style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-accent)", textDecoration: "none", padding: "2px 7px", borderRadius: "var(--r-xs)", flexShrink: 0 }}>
                  {g.codename} ↗
                </a>
                <span style={{ fontSize: 13.5, color: "var(--color-on-dark-soft)", lineHeight: 1.4 }}>{g.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Built-to-swap promise — the fleet acceptance test, in plain words */}
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-on-dark-muted)", lineHeight: 1.8 }}>
          <span style={{ color: "var(--color-accent)", marginRight: 8 }}>▲</span>
          built to swap: replace any piece with your own without touching the rest. betula keeps the record; drosera shows what's happening now.
        </div>

        {/* The pledge sits under all nine promises — linked, not repeated (it's the section above) */}
        <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-on-dark-muted)", lineHeight: 1.8 }}>
          <span style={{ color: "var(--color-accent)", marginRight: 8 }}>▲</span>
          under all nine promises:{" "}
          <a href="#pledge" style={{ color: "var(--color-on-dark)", textUnderlineOffset: 3 }}>the pledge ↑</a>
        </div>
      </div>

      <style>{`
        .ll-promise-line::first-letter { text-transform: uppercase; }
        .ll-promise-card:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
        .ll-part-tag { border: 1px solid rgba(224,168,28,0.35); }
        .ll-part-tag:hover, .ll-part-tag:focus-visible { border-color: var(--color-accent); }
        .ll-next-link { color: var(--color-on-dark-muted); }
        .ll-next-link:hover { color: var(--color-on-dark-soft); }
      `}</style>
    </section>
  );
}
