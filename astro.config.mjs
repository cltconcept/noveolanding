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
  },
});
