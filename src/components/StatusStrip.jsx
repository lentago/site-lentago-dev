import { StatusDot } from "./Shared.jsx";
import { showStatusStrip } from "../config.js";

// A live ops band of monitored services beneath the hero. The LIVE marker
// pulses (CSS animation, no JS); the rest are static signal dots. The signals
// now read as codenamed systems (drosera ingest, solidago ECS) rather than the
// retired ice-cream host. Hidden entirely when showStatusStrip is off.
export function StatusStrip() {
  if (!showStatusStrip) return null;
  const items = [
    { label: "drosera · ingest",  status: "ok",   value: "6 hosts · 15s push" },
    { label: "solidago · ECS",    status: "ok",   value: "2/2 healthy" },
    { label: "RDS · postgres",    status: "warn", value: "CPU 73%" },
    { label: "terraform apply",   status: "ok",   value: "2h ago · 0 drift" },
    { label: "pager",             status: "ok",   value: "0 open" },
  ];
  return (
    <section style={{
      background: "var(--color-bg-alt)",
      borderBottom: "1px solid var(--color-border)",
      padding: "16px 32px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg3)",
          letterSpacing: "0.1em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 8,
          paddingRight: 24, borderRight: "1px solid var(--color-border)",
        }}>
          <StatusDot status="ok" size={6} pulse />
          LIVE
        </div>
        {items.map(i => (
          <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <StatusDot status={i.status} size={6} />
            <span style={{ color: "var(--fg1)" }}>{i.label}</span>
            <span style={{ color: "var(--fg3)" }}>{i.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
