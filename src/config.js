// Build-time site flags carried over from the Claude Design handoff.
//
// The design prototype exposed three live preview props (queueOpen /
// showStatusStrip / showRoadmap) via its `renderVals()`. This static site has
// no runtime, so those toggles bake in here at their defaults. Flip one and the
// whole site re-renders in that state on the next build — no per-component edits.
// (queueOpen is now AVAILABILITY_STATE below — a tri-state, so "booked" and
// "limited" are expressible rather than just on/off.)
export const AVAILABILITY_STATE = 'available'; // 'available' | 'limited' | 'booked'
export const showStatusStrip = true;  // false → hide the live ops band under the hero
export const showRoadmap = true;      // false → hide each system's "first → next" line

// Compute current quarter at build time — no hand-bumped date literals.
const _d = new Date();
const _q = Math.ceil((_d.getMonth() + 1) / 3);
const _yr = String(_d.getFullYear()).slice(-2);
const _quarterShort = `Q${_q} '${_yr}`;
const _quarterFull  = `Q${_q} ${_d.getFullYear()}`;

// Nav + contact copy derived from AVAILABILITY_STATE and current quarter.
// navDot is a StatusDot status key; the whole object keeps the two surfaces in sync.
export const queueCopy = AVAILABILITY_STATE === 'available'
  ? { navPill: `Available · ${_quarterShort}`, navDot: "ok",   queueWord: "open." }
  : AVAILABILITY_STATE === 'limited'
  ? { navPill: `Limited · ${_quarterShort}`,   navDot: "warn", queueWord: "limited." }
  : { navPill: `Booked · ${_quarterShort}`,    navDot: "warn", queueWord: "waitlisted." };

// Booking line for the About section — same quarter, single source of truth.
export const bookingLine = `Booking: ${_quarterFull} forward`;

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
