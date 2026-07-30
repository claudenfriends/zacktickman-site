import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zacktickman.com',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
