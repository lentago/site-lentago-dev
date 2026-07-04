// Build-time site flags carried over from the Claude Design handoff.
//
// The design prototype exposed three live preview props (queueOpen /
// showStatusStrip / showRoadmap) via its `renderVals()`. This static site has
// no runtime, so those toggles bake in here at their defaults. Flip one and the
// whole site re-renders in that state on the next build — no per-component edits.
export const queueOpen = true;        // false → waitlist pill + "Queue's waitlisted."
export const showStatusStrip = true;  // false → hide the live ops band under the hero
export const showRoadmap = true;      // false → hide each system's "first → next" line

// Nav + contact copy derived from queueOpen (mirrors the design's renderVals()).
// navDot is a StatusDot status key; the whole object keeps the two surfaces in sync.
export const queueCopy = queueOpen
  ? { navPill: "Available · Q2 '26", navDot: "ok",   queueWord: "open." }
  : { navPill: "Waitlist · Q3 '26",  navDot: "warn", queueWord: "waitlisted." };
