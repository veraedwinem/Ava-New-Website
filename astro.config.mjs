// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/conferenciafiel2026':
      'https://www.eventbrite.com.mx/e/conferencia-fiel-2026-tickets-1983624421041?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl',
  },
  site: 'https://alianzava.com/', // Replace with your site URL
  integrations: [tailwind(), sitemap(), react()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});