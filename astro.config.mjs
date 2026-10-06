import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://noveodigital.be',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: {
    server: { fs: { deny: ['**/public_html/**', '**/.env*', '**/*.{pem,crt}'] } },
    // Never inline scripts into the HTML: the contact endpoint must stay out of the page source,
    // where spam bots harvest it. Other assets keep Vite's default (undefined = 4 KB limit).
    build: { assetsInlineLimit: (filePath) => (filePath.endsWith('.js') ? false : undefined) },
  },
});
