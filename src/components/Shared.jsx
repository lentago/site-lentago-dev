// Shared design-system primitives for the Lentago Labs landing page.
//
// These are the "Tidewater" component primitives ported from the Lentago Labs
// Design System (slate-teal + copper + limestone). They render SERVER-SIDE
// ONLY — there is no hydration on this site — so any interactivity is
// expressed as CSS (embedded <style> tags / :hover), never shipped JS.
import { BrandMark } from "./Brand.jsx";

export { BrandMark };

/* ---------- Eyebrow — mono uppercase kicker, optional ◆ section marker ---- */
export function Eyebrow({ children, tone = "muted", marker = false, style }) {
  const color =
    tone === "accent" ? "var(--color-accent)" :
    tone === "dark"   ? "var(--color-on-dark-muted)" :
    "var(--fg2)";
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
      textTransform: "uppercase", letterSpacing: "0.08em",
      color, ...style,
    }}>
      {marker && <span style={{ color: "var(--color-accent)", marginRight: 6 }}>◆</span>}
      {children}
    </div>
  );
}

/* ---------- StatusDot — ops signal dot with a soft halo, optional pulse ---- */
const STATUS = {
  ok:   "var(--status-ok)",
  warn: "var(--status-warn)",
  info: "var(--status-info)",
  err:  "var(--status-err)",
};
export function StatusDot({ status = "ok", size = 8, pulse = false }) {
  const color = STATUS[status] || STATUS.ok;
  return (
    <span
      className={pulse ? "ll-statusdot-pulse" : undefined}
      style={{
        display: "inline-block",
        width: size, height: size, borderRadius: 999,
        background: color, flexShrink: 0,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 13%, transparent)`,
        ["--ll-dot"]: color,
      }}
    >
      {pulse && (
        <style>{`
          @keyframes ll-dot-pulse {
            0%,100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--ll-dot) 13%, transparent); }
            50%     { box-shadow: 0 0 0 6px color-mix(in srgb, var(--ll-dot) 0%, transparent); }
          }
          .ll-statusdot-pulse { animation: ll-dot-pulse 2s var(--ease-standard) infinite; }
        `}</style>
      )}
    </span>
  );
}

/* ---------- Button — copper primary (one per region) + secondary/outline --- */
const BTN_SIZES = {
  sm: { padding: "9px 14px", fontSize: 13 },
  md: { padding: "13px 22px", fontSize: 14.5 },
  lg: { padding: "15px 26px", fontSize: 16 },
};
export function Button({
  children, variant = "primary", size = "md", href,
  onDark = false, icon, trailing, disabled = false, style, ...rest
}) {
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const variants = {
    primary: {
      background: "var(--color-accent)", color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-btn-accent)",
    },
    secondary: {
      background: "var(--color-ink-strong)", color: "var(--color-on-dark)",
      border: "1px solid transparent",
    },
    outline: {
      background: "transparent",
      color: onDark ? "var(--color-on-dark)" : "var(--color-ink)",
      border: `1px solid ${onDark ? "rgba(243,240,232,0.25)" : "var(--color-border-strong)"}`,
    },
    ghost: {
      background: "transparent",
      color: onDark ? "var(--color-on-dark)" : "var(--color-accent)",
      border: "1px solid transparent",
    },
  };
  const styles = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    fontFamily: "var(--font-body)", fontWeight: 500,
    padding: s.padding, fontSize: s.fontSize,
    borderRadius: "var(--r-md)",
    textDecoration: "none", whiteSpace: "nowrap",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
    ...variants[variant],
    ...style,
  };
  const inner = (
    <>
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      <span>{children}</span>
      {trailing && <span style={{ opacity: 0.7 }}>{trailing}</span>}
    </>
  );
  if (href && !disabled) {
    return <a href={href} style={styles} {...rest}>{inner}</a>;
  }
  return <button type="button" disabled={disabled} style={styles} {...rest}>{inner}</button>;
}

/* ---------- Tag — mono meta chip on a sunk surface, sharp 2px corners ------ */
export function Tag({ children, onDark = false, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: "var(--font-mono)", fontSize: 10.5,
      letterSpacing: "0.05em",
      color: onDark ? "var(--color-on-dark-soft)" : "var(--fg2)",
      background: onDark ? "rgba(243,240,232,0.06)" : "var(--color-surface-sunk)",
      border: `1px solid ${onDark ? "rgba(243,240,232,0.14)" : "var(--color-border)"}`,
      padding: "3px 7px", borderRadius: "var(--r-xs)",
      whiteSpace: "nowrap", ...style,
    }}>{children}</span>
  );
}

/* ---------- ServiceCard — numbered offering, status rule, hover deepens ---- */
export function ServiceCard({ num, tag, status = "info", title, desc, meta = [], style }) {
  return (
    <div
      className="ll-service-card"
      style={{
        position: "relative",
        padding: "28px 28px 24px",
        minHeight: 280,
        display: "flex", flexDirection: "column",
        background: "var(--color-surface)",
        cursor: "default",
        transition: "background var(--dur-base) var(--ease-standard)",
        ...style,
      }}
    >
      <span style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `var(--status-${status})`,
      }} />
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 18, marginTop: 4,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg3)", letterSpacing: "0.08em" }}>
          {num} / {tag}
        </span>
        <StatusDot status={status} size={6} />
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22,
        color: "var(--fg1)", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15,
      }}>{title}</h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--fg2)",
        lineHeight: 1.6, margin: "0 0 20px", flex: 1,
      }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {meta.map(m => <Tag key={m}>{m}</Tag>)}
      </div>
      <style>{`.ll-service-card:hover { background: var(--color-surface-sunk); }`}</style>
    </div>
  );
}

/* ---------- Stat — mono label + large display value + note ----------------- */
export function Stat({ label, value, note, onDark = false, style }) {
  return (
    <div style={style}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        color: onDark ? "var(--color-on-dark-faint)" : "var(--fg3)",
        textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
      }}>{label}</div>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38,
        color: onDark ? "var(--color-on-dark)" : "var(--fg1)",
        letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6,
      }}>{value}</div>
      {note && (
        <div style={{
          fontFamily: "var(--font-body)", fontSize: 12.5,
          color: onDark ? "var(--color-on-dark-muted)" : "var(--fg2)",
        }}>{note}</div>
      )}
    </div>
  );
}

/* ---------- TimelineItem — node on a vertical rule + range/tag/title/desc -- */
export function TimelineItem({ range, tag, title, desc, current = false, last = false }) {
  return (
    <div style={{ position: "relative", paddingLeft: 44, paddingBottom: last ? 0 : 40 }}>
      <div style={{
        position: "absolute", left: 0, top: 6,
        width: 15, height: 15, borderRadius: 999,
        background: "var(--color-bg-alt)",
        border: `2px solid ${current ? "var(--color-accent)" : "var(--color-border-strong)"}`,
        boxShadow: current ? "0 0 0 4px rgba(194,100,60,0.18)" : "none",
      }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg1)", fontWeight: 600, letterSpacing: "0.02em" }}>
          {range}
        </span>
        {tag && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-on-dark)",
            letterSpacing: "0.1em", background: "var(--color-accent)",
            padding: "2px 6px", borderRadius: "var(--r-xs)",
          }}>{tag}</span>
        )}
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22,
        color: "var(--fg1)", margin: "0 0 8px", letterSpacing: "-0.02em",
      }}>{title}</h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg2)",
        lineHeight: 1.6, margin: 0, maxWidth: 560,
      }}>{desc}</p>
    </div>
  );
}

/* ---------- Form fields (dark "terminal" variant used by the consult mock) - */
function fieldStyle(terminal, extra) {
  if (terminal) {
    return {
      width: "100%",
      background: "var(--color-term-bg-sunk)",
      border: "1px solid var(--color-term-border)",
      borderRadius: "var(--r-sm)",
      color: "var(--color-on-dark)",
      padding: "9px 12px",
      fontFamily: "var(--font-mono)", fontSize: 13,
      outline: "none",
      ...extra,
    };
  }
  return {
    width: "100%",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border-strong)",
    borderRadius: "var(--r-sm)",
    color: "var(--color-ink)",
    padding: "10px 12px",
    fontFamily: "var(--font-body)", fontSize: 14.5,
    outline: "none",
    ...extra,
  };
}

function FieldLabel({ label, htmlFor, terminal }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} style={{
      display: "block", marginBottom: 6,
      fontFamily: "var(--font-mono)", fontSize: 11,
      textTransform: "uppercase", letterSpacing: "0.06em",
      color: terminal ? "var(--color-on-dark-faint)" : "var(--fg2)",
    }}>{label}</label>
  );
}

export function Input({ label, id, terminal = false, style, ...rest }) {
  return (
    <div>
      <FieldLabel label={label} htmlFor={id} terminal={terminal} />
      <input id={id} style={fieldStyle(terminal, style)} {...rest} />
    </div>
  );
}

export function Textarea({ label, id, terminal = false, rows = 4, style, ...rest }) {
  return (
    <div>
      <FieldLabel label={label} htmlFor={id} terminal={terminal} />
      <textarea id={id} rows={rows} style={fieldStyle(terminal, { resize: "vertical", minHeight: 80, ...style })} {...rest} />
    </div>
  );
}

export function Select({ label, id, terminal = false, options = [], children, style, ...rest }) {
  const base = terminal
    ? {
        background: "var(--color-term-bg-sunk)",
        border: "1px solid var(--color-term-border)",
        color: "var(--color-on-dark)",
        fontFamily: "var(--font-mono)", fontSize: 13,
        padding: "9px 34px 9px 12px",
      }
    : {
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-strong)",
        color: "var(--color-ink)",
        fontFamily: "var(--font-body)", fontSize: 14.5,
        padding: "10px 34px 10px 12px",
      };
  const chevron = terminal ? "%23f3f0e8" : "%235c6b66";
  return (
    <div>
      <FieldLabel label={label} htmlFor={id} terminal={terminal} />
      <select id={id} style={{
        width: "100%", borderRadius: "var(--r-sm)", outline: "none",
        appearance: "none", WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='${chevron}' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        cursor: "pointer",
        ...base, ...style,
      }} {...rest}>
        {options.map(o => {
          const value = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return <option key={value} value={value}>{text}</option>;
        })}
        {children}
      </select>
    </div>
  );
}
