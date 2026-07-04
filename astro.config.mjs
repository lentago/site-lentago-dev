// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// The design components are React (ported from the Lentago Labs Design System
// handoff). They are rendered SERVER-SIDE ONLY at build time — no client
// directive, so no React ships to the browser. This is a static marketing
// site; the output is plain HTML + the design-system CSS in public/.
export default defineConfig({
  // Final destination FQDN. Until promotion, the site is also reachable via a
  // hidden subdomain of icecreamtofightwith.com (see README / solidago platform).
  site: 'https://lentago.dev',
  integrations: [react()],
});
