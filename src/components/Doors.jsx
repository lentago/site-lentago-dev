import { Eyebrow, StatusDot, Tag } from "./Shared.jsx";
import { PARTS } from "./Suite.jsx";
import { AVAILABILITY_STATE, showRoadmap } from "../config.js";

// Need-based doors (site-lentago-dev#112, from the 2026-11-01 external review,
// lentago/.github#304). A director arrives with one need, not a product name, so
// three doors sit between the hero and the catalog (offerings + suite map) and
// say, in the visitor's words, where to start. The parts behind the doors
// (monarda, uvularia, the lock-in ledger) and their monthly cost come from the
// lentago/lupinus picker (guide/picker.md). The operations review itself is the
// hands-on audit from the Bespoke shelf, not a picker row. Tiers are read from
// PARTS in Suite.jsx, which copies lupinus guide/tiers.md, so the doors and the
// map can never disagree; a tier is never decided here.
//
// Each door keeps what works today apart from what is planned. The "planned"
// line is projected work and follows the same showRoadmap gate as the map's
// "next:" lines, so nothing projected is advertised when the roadmap is off.

const gh = "https://github.com/lentago";

// Whether help is available now, derived from the same flag as the nav pill
// and the contact headline (config.js), so the three can't drift apart.
const HELP = AVAILABILITY_STATE === "available"
  ? { dot: "ok",   text: "available now" }
  : AVAILABILITY_STATE === "limited"
  ? { dot: "warn", text: "limited this quarter" }
  : { dot: "warn", text: "waitlist only" };

const tierOf = (part) => PARTS[part].tiers.map(([t, scope]) => (scope ? `${t} · ${scope}` : t));

const DOORS = [
  {
    id: "site",
    need: "Our website is on a volunteer's account.",
    title: "Move your site to an account you own",
    today: "The campaign-site kit puts up a site your organization owns outright, on your own GitHub Pages, with a donate button that goes straight to your payment processor. Moving a site you already have, with its pages, domain and logins, is hands-on work we do with you.",
    planned: { text: "A digital-custody audit that lists every account your site and domain depend on.", href: `${gh}/.github/issues/124` },
    part: "monarda",
    readiness: tierOf("monarda"),
    cost: "$0 a month on GitHub Pages",
    receipt: { label: "timed drill, 3 min 01 s", href: `${gh}/monarda/blob/main/receipts/2026-10-12-agent-run.md` },
    links: [
      { label: "Your first kit", href: `${gh}/lupinus/blob/main/guide/first-kit.md` },
    ],
  },
  {
    id: "records",
    need: "We can't find our records.",
    title: "Publish your public records",
    today: "One repository from a template holds your minutes, notices, bylaws and policies, with the posting rules beside them. A public “Is it posted?” board shows what went up on time. It runs on a free GitHub account. That first rung is the part with a timed receipt; the later rungs (a branded site, an Ask box, an operator's dashboard) are optional.",
    planned: { text: "A good-standing check against the state registry, Massachusetts first.", href: `${gh}/.github/issues/122` },
    part: "uvularia",
    readiness: ["Kit · first rung"],
    cost: "$0 a month on GitHub",
    receipt: { label: "timed drill, 6 min 09 s", href: `${gh}/uvularia/blob/main/receipts/2026-10-12-agent-run-rung1.md` },
    links: [
      { label: "See the demo board", href: "https://lentago.github.io/uvularia-demo-records/" },
    ],
  },
  {
    id: "review",
    need: "Something's off and we don't know what.",
    title: "Ask for an operations review",
    today: "Send the symptoms and we'll look at what it costs, who owns what, and what you'd lose if a vendor disappeared. You get a one-page report. If you'd rather start on your own, the lock-in ledger is a review you run yourself.",
    planned: { text: "Scheduled exports of your vendor data into a repository you own, with restores you've practiced.", href: `${gh}/.github/issues/123` },
    part: "ledger",
    readiness: tierOf("ledger").map(t => `${t} · lock-in ledger`),
    cost: "$0 for nonprofits and volunteer-run orgs",
    receipt: { label: "pending", href: `${gh}/lupinus/blob/main/guide/tiers.md#where-each-product-stands` },
    links: [
      { label: "Send the symptoms", href: "#contact", internal: true },
    ],
  },
];

const factLabel = {
  fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg2)",
  textTransform: "uppercase", letterSpacing: "0.08em",
};
const linkStyle = { fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--color-ink)", textUnderlineOffset: 3 };

function Door({ d }) {
  const titleId = `door-${d.id}-title`;
  const p = PARTS[d.part];
  const partHref = p.href || `${gh}/${d.part}`;
  return (
    <article id={`door-${d.id}`} aria-labelledby={titleId} style={{
      display: "flex", flexDirection: "column",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--r-md)",
      padding: "26px 24px 22px",
    }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg2)", margin: "0 0 10px", lineHeight: 1.5 }}>
        <span aria-hidden="true">“</span>{d.need}<span aria-hidden="true">”</span>
      </p>
      <h3 id={titleId} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--fg1)", margin: "0 0 18px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        {d.title}
      </h3>

      {/* The three facts a director decides on: readiness, cost, help. */}
      <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 14, rowGap: 9, margin: "0 0 18px", padding: "14px 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", alignItems: "baseline" }}>
        <dt style={factLabel}>Ready</dt>
        <dd style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          {d.readiness.map(t => <Tag key={t}>{t}</Tag>)}
          {d.receipt && (
            <a href={d.receipt.href} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: 11.5, color: "var(--fg2)" }}>
              receipt: {d.receipt.label} ↗
            </a>
          )}
        </dd>
        <dt style={factLabel}>Cost</dt>
        <dd style={{ margin: 0, fontSize: 14, color: "var(--fg1)" }}>{d.cost}</dd>
        <dt style={factLabel}>Help</dt>
        <dd style={{ margin: 0, fontSize: 14, color: "var(--fg1)", display: "flex", alignItems: "center", gap: 8 }}>
          <StatusDot status={HELP.dot} size={7} /> {HELP.text}
        </dd>
      </dl>

      <div style={{ flex: 1 }}>
        <div style={{ ...factLabel, marginBottom: 6 }}>Works today</div>
        <p style={{ fontSize: 14.5, color: "var(--fg1)", lineHeight: 1.55, margin: "0 0 16px" }}>{d.today}</p>
        {showRoadmap && d.planned && (
          <>
            <div style={{ ...factLabel, marginBottom: 6 }}>Planned, not built yet</div>
            <p style={{ fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.55, margin: "0 0 16px" }}>
              {d.planned.text}{" "}
              <a href={d.planned.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg2)", textUnderlineOffset: 3 }}>Tracked ↗</a>
            </p>
          </>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", paddingTop: 4 }}>
        {d.links.map(l => (
          <a key={l.href} href={l.href} style={linkStyle}
             {...(l.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
            {l.label} {l.internal ? "→" : "↗"}
          </a>
        ))}
        <a href={partHref} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, color: "var(--fg2)" }}>
          {p.name || d.part} ↗
        </a>
      </div>
    </article>
  );
}

export function Doors() {
  return (
    <section id="start" className="ll-section" style={{
      background: "var(--color-bg-alt)",
      borderBottom: "1px solid var(--color-border)",
      padding: "80px 40px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 64, alignItems: "end", marginBottom: 40 }}>
          <div>
            <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>Start here</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, color: "var(--fg1)" }}>
              Start from what you need.
            </h2>
          </div>
          <p className="ll-services-intro" style={{ fontSize: 16, color: "var(--fg2)", margin: 0, maxWidth: 560, lineHeight: 1.6, justifySelf: "end" }}>
            Three common places to start. Each says how ready it is (a Kit is one
            you can stand up from the repository alone), what it costs you each
            month, and whether we can help right now. What works today is kept
            apart from what is still planned. The{" "}
            <a href="#systems" style={{ color: "var(--color-ink)", textUnderlineOffset: 3 }}>full map</a>{" "}
            of every part is further down.
          </p>
        </div>

        <div className="ll-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
          {DOORS.map(d => <Door key={d.id} d={d} />)}
        </div>

        <p style={{ fontSize: 13.5, color: "var(--fg2)", margin: "24px 0 0", lineHeight: 1.6, maxWidth: 760 }}>
          The parts behind these doors, and the rest, are in the{" "}
          <a href={`${gh}/lupinus/blob/main/guide/picker.md`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-ink)", textUnderlineOffset: 3 }}>picker in the guide ↗</a>.
          Everything you adopt runs in accounts you own; we host nothing.
        </p>
      </div>
    </section>
  );
}
