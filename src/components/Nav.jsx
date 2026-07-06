import { BrandMark, StatusDot } from "./Shared.jsx";
import { queueCopy } from "../config.js";

// Sticky top bar — brand lockup, section links, availability pill. Static port
// of the design-system Nav: the prototype's smooth-scroll onNav callback is
// replaced with plain in-page #anchors, and the per-link hover (onMouseEnter in
// the prototype) is re-expressed as CSS (.ll-navlink:hover) since nothing
// hydrates on this site. The #work link reads "Systems" — it now targets the
// suite of named systems that replaced the single case study.
export function NavBar({ active = "Practice" }) {
  const items = [
    { label: "Practice",   href: "#practice" },
    { label: "Systems",    href: "#work" },
    { label: "Principles", href: "#principles" },
    { label: "About",      href: "#about" },
    { label: "Contact",    href: "#contact" },
  ];
  return (
    <nav className="ll-nav" style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(243,240,232,0.92)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--color-border)",
      padding: "14px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
        <BrandMark size={48} className="ll-nav-mark" />
        <span className="ll-wordmark ll-nav-wordmark" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--fg1)", letterSpacing: "-0.02em" }}>Lentago Labs</span>
      </a>

      <div className="ll-nav-group" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <ul className="ll-nav-links" style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
          {items.map(i => (
            <li key={i.label}>
              <a href={i.href}
                 className={i.label === active ? "ll-navlink ll-navlink--active" : "ll-navlink"}
                 style={{
                   fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 500,
                   textTransform: "uppercase", letterSpacing: "0.06em",
                   textDecoration: "none",
                 }}>{i.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="ll-nav-pill" style={{
          fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
          color: "var(--color-on-dark)", background: "var(--color-ink-strong)",
          padding: "9px 14px", borderRadius: "var(--r-md)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
        }}>
          <StatusDot status={queueCopy.navDot} size={6} />
          <span>{queueCopy.navPill}</span>
        </a>
      </div>
    </nav>
  );
}
