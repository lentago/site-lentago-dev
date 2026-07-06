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

// Consult form → Formspree (issue #31). The form does a native HTML POST (no
// JS, no hydration) straight to `endpoint`; Formspree emails the submission to
// the address the form is configured for (chris@lentago.dev, hosted on
// Fastmail) and 302-redirects the browser to `next` (the on-brand /thanks page).
//
// The form hash is PUBLIC by design — it ships in the built HTML — so there is
// no secret to hide here. Create/manage the form at https://formspree.io and
// paste its 8-char hash below (the part after /f/).
export const consultForm = {
  endpoint: "https://formspree.io/f/mqevjknw",
  subject:  "New consult · lentago.dev",
  next:     "https://lentago.dev/thanks",
};
