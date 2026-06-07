// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from "node:url";
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
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