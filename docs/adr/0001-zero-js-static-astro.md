# ADR-0001: Zero-JS static Astro; React renders server-side only

**Status:** Accepted (2026-06-28; reconstructed 2026-08-13)

## Context

site-lentago-dev is a single-page marketing site. Its sections are authored as
React components (`src/components/`), ported from the design system's
`ui_kits/landing/` section components, but the page has no interactive runtime
requirement: it presents brand, copy, a systems suite, and one contact form.

Astro renders those components server-side at build time and ships the result
as plain HTML plus the design-system CSS. The standing convention in
`CLAUDE.md` states the invariant directly: *"Static output only: if you ever
need a `client:*` directive, stop and reconsider — this site has no interactive
runtime by design. No React should ship to the browser; verify the built
`dist/index.html` has no `<script>` tag."*

The one feature that pressured this invariant was the contact ("consult") form.
It shipped in v1 as a static styled mock — issue #31 recorded that the `./send`
button was `type="button"` with no handler, so a visitor got no feedback and no
message was sent, an intentional v1 limitation filed so it was tracked rather
than forgotten.

## Decision

Keep the browser output zero-JS. React is a build-time authoring convenience
only; nothing hydrates. The `dist/index.html` is verified to contain no
`<script>` tag.

The contact form is resolved within the invariant: it posts to Formspree via a
**native HTML `POST`** (`<form action method="POST">`) with no `client:*` and no
hydration (#34, merged 2026-07-06). Formspree emails the submission to
`chris@lentago.dev` and 302-redirects to a static, on-brand `/thanks` page
(`src/pages/thanks.astro`) so the handoff stays on `lentago.dev`. The form
endpoint lives in `src/config.js`; the form hash is public by design because it
ships in the HTML, so re-pointing the form is a one-line config change, not a
markup edit.

## Alternatives

**Recorded at the time** — the contact-form options enumerated in issue #31,
smallest first:

- **`mailto:` link with a prefilled subject/body** assembled from the fields.
  No backend, preserves the static invariant — but it depends on a configured
  mail client, exposes the address to scrapers, and delivers a raw pre-filled
  draft rather than a structured submission. *Worse:* weaker UX and
  deliverability for the same constraint the chosen option satisfies cleanly.
- **Formspree (or an equivalent no-backend endpoint) via native POST.**
  *Chosen.* Keeps the zero-JS invariant, delivers a real structured submission,
  and confirms on an on-brand page.
- **Full backend submission.** Explicitly called out as the largest option and
  out of scope for a static site. *Worse* for this site: it would require a
  runtime the architecture deliberately does not have.
- **A platform-hosted form: HTML `POST` → Lambda Function URL → SES.** Not a
  retrospective idea — this was the *designed original*, specified for this
  site's direct predecessor (the portfolio site) in the pre-repo era
  (2026-06-19, per early-era session records): a plain HTML form posting to a
  Lambda Function URL (chosen there over API Gateway as right-sized for one
  endpoint) that validates, checks a honeypot, sends via SES, and 303-redirects
  to a thanks page — zero JS throughout, submission data inside Lentago-owned
  infrastructure. Formspree displaced it when the form actually shipped
  (#31/#34): it needed no new platform surface and no SES sending path.
  *Lateral, better on data ownership* — reviving the designed original remains
  on the table if submission volume or data-residency concerns ever grow.

**Retrospective — not considered at the time:**

- **A hosted-form SaaS with client-side JS embed** (the mainstream option in
  this space). *Worse:* it would break the zero-JS invariant outright — the
  native-POST property is exactly why Formspree fit and a script-embed widget
  would not.

## Consequences

- The build output stays inspectable and cache-friendly: static HTML + CSS, no
  JS bundle. The no-`<script>` check is a cheap, enforceable regression guard.
- Any future interactivity must either be expressed with CSS (as hover/pulse
  already are) or trigger a deliberate revisit of this ADR — a `client:*`
  directive is a red flag, not a routine tool.
- Contact submissions depend on a third party (Formspree) and on Fastmail
  delivery to `chris@lentago.dev`. The public form hash is accepted as
  non-secret by design.
- The `/thanks` page must be maintained as a static route so the post-submit
  handoff stays on-brand and on-domain.
