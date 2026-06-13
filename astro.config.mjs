// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kaedax.com',
  // Gurukul moved under /demos/ — keep links already shared with schools alive
  redirects: {
    '/gurukul': '/demos/gurukul',
    '/gurukul/readiness': '/demos/gurukul/readiness',
    '/gurukul/schools': '/demos/gurukul/schools',
  },
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Overridable cache dir (useful when node_modules/.vite isn't writable,
    // e.g. CI or sandboxed builds): VITE_CACHE_DIR=/tmp/vite npm run build
    ...(process.env.VITE_CACHE_DIR ? { cacheDir: process.env.VITE_CACHE_DIR } : {}),
  },
});
