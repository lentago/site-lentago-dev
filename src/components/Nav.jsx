import { BrandMark, StatusDot } from "./Shared.jsx";

// Sticky top bar — brand lockup, section links, availability pill. Static port
// of the design-system Nav: the prototype's smooth-scroll onNav callback is
// replaced with plain in-page #anchors, and the per-link hover (onMouseEnter in
// the prototype) is re-expressed as CSS (.ll-navlink:hover) since nothing
// hydrates on this site.
export function NavBar({ active = "Practice" }) {
  const items = [
    { label: "Practice", href: "#practice" },
    { label: "Work",     href: "#work" },
    { label: "Writing",  href: "#writing" },
    { label: "About",    href: "#about" },
    { label: "Contact",  href: "#contact" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(243,240,232,0.92)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--color-border)",
      padding: "14px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
        <BrandMark size={48} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--fg1)", letterSpacing: "-0.02em" }}>Lentago Labs</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
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
        <a href="#contact" style={{
          fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
          color: "var(--color-on-dark)", background: "var(--color-ink-strong)",
          padding: "9px 14px", borderRadius: "var(--r-md)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
        }}>
          <StatusDot status="ok" size={6} />
          <span>Available · Q2 '26</span>
        </a>
      </div>
    </nav>
  );
}
