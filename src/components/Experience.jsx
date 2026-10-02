import { Eyebrow, TimelineItem } from "./Shared.jsx";
import { bookingLine } from "../config.js";

// Sticky intro + vertical timeline built from TimelineItem primitives. The most
// recent entry is marked `current` for the gold node.
export function Experience() {
  const years = [
    { range: "2022 —", title: "Moving the discipline; keeping the rigor", desc: "Moved to cloud-native work: infrastructure written as code, every change reviewed where the whole team can see it. The tools changed; the habits didn't. Rehearse the failure, write down the fix, make the next change boring. Lentago is where I practice those habits in the open, on an estate anyone can copy." },
    { range: "2017 — 2021", title: "Internet engineering; public cloud", desc: "A much larger company bought us and put real money behind the platform. I ran disaster-recovery drills, cut recovery times, and made every component within reach redundant. Led the capacity buildout team, with a lot of vendor evaluation along the way. The job grew to cover internet routing, large email domains, DNS, CDNs, and cloud integrations." },
    { range: "2007 — 2016", title: "Operator number three at a startup; IPO five years later", desc: "Joined a small startup of fewer than 50 people in 2007 as its third infrastructure operator. Each instance of the platform was hardware we designed and racked ourselves: load balancers, storage, layers of network switching, one cabinet at first and later several. I made the buildouts repeatable and added redundancy wherever it would fit. Every hardware generation changed something, so I used configuration management and orchestration to keep those differences away from the support team." },
    { range: "1997 — 2006", title: "Graveyard shift to principal; left it better than I found it", desc: "Started as the overnight operator: data-center keys, orders to change the backup tapes, and escalations from support. I learned AIX and VMS from the career sysadmins I'd just woken for the third time that night, and never called anyone about the same thing twice. I earned the day shift by doing a full sysadmin's job on nights, trained my own replacement, and kept leading the night shift from days. By 2005 I was a principal operator who'd brought two new data centers from construction to production." },
  ];
  return (
    <section id="about" className="ll-section" style={{ background: "var(--color-bg-alt)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "96px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ll-stack ll-stack-gap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)", gap: 72, alignItems: "start" }}>
          <div className="ll-exp-intro" style={{ position: "sticky", top: 100 }}>
            <Eyebrow tone="accent" marker style={{ marginBottom: 14 }}>About</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px", color: "var(--fg1)" }}>
              Nearly thirty years <span style={{ color: "var(--color-accent)" }}>carrying the pager.</span>
            </h2>
            <p style={{ fontSize: 16.5, color: "var(--fg2)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 420 }}>
              I've kept production running around the clock since 1997: first
              in server rooms where every change had physical consequences, now
              in cloud systems defined entirely in code. These days I help
              organizations that run on donations run that same kind of reliable
              setup on infrastructure they own, and I do it in the open.
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)", lineHeight: 1.8 }}>
              <div>Based: New England, US</div>
              <div>Working: remote · async-friendly</div>
              <div>{bookingLine}</div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: "var(--color-border-strong)" }} />
            {years.map((y, i) => (
              <TimelineItem key={y.range} {...y} current={i === 0} last={i === years.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
