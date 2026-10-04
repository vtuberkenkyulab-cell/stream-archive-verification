import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const [owner = 'example', repository = 'stream-archive-verification'] = (process.env.GITHUB_REPOSITORY ?? 'example/stream-archive-verification').split('/');
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.PUBLIC_SITE_URL ?? `https://${owner}.github.io`;
const base = process.env.PUBLIC_BASE_PATH ?? (isUserSite ? '/' : `/${repository}`);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404/')
    })
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
