import { writeFile } from 'node:fs/promises';

// Explicit legacy aliases avoid case-insensitive redirect loops on Apache.
const pages = {
  index: '',
  'image-de-marque': 'image-de-marque',
  'Web&Erp': 'web-erp',
  Telecom: 'telecom',
  'IT-et-cybersecurite': 'it-cybersecurite',
  Impression: 'impression',
  contact: 'contact',
  'mentions-legales': 'mentions-legales',
};
const aliases = [];
for (const [old, current] of Object.entries(pages)) {
  for (const language of ['fr', 'nl', 'en']) {
    const suffix = language === 'fr' ? '' : `-${language}`;
    const target = `/${language === 'fr' ? '' : language + '/'}${current ? current + '/' : ''}`;
    aliases.push([`${old}${suffix}.html`, target]);
    if (suffix || old !== current) aliases.push([`${old}${suffix}`, target]);
  }
}
aliases.push(
  ['Contact-1.html', '/contact/'],
  ['conditions-generales', '/conditions-generales.pdf'],
  ['conditions-générales', '/conditions-generales.pdf'],
);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const apache = [
  '# Deploy ONLY the contents of dist/ into the web root.',
  'Options -Indexes',
  'DirectoryIndex index.html',
  'ErrorDocument 404 /404.html',
  '<IfModule mod_rewrite.c>',
  'RewriteEngine On',
  '# Block legacy private files if any remain on an existing host.',
  'RewriteRule (^|/)(?:MDP\\.txt|backup\\.pst|public_html|\\.env|node_modules)(?:/|$) - [F,L,NC]',
  'RewriteRule \\.(?:pst|docx?|xlsx?|indd|zip)$ - [F,L,NC]',
  ...aliases.flatMap(([from, to]) => [
    ...(from === 'index.html' ? ['RewriteCond %{THE_REQUEST} "\\s/+index\\.html(?:[?\\s])"'] : []),
    `RewriteRule ^${escape(from)}/?$ ${to} [R=301,L,NE]`,
  ]),
  '</IfModule>',
  '<IfModule mod_headers.c>',
  'Header always set X-Content-Type-Options "nosniff"',
  'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  'Header always set X-Frame-Options "SAMEORIGIN"',
  '</IfModule>',
  '<IfModule mod_expires.c>',
  'ExpiresActive On',
  'ExpiresByType image/webp "access plus 30 days"',
  'ExpiresByType font/woff2 "access plus 1 year"',
  '</IfModule>',
  '',
].join('\n');
await writeFile(new URL('../public/.htaccess', import.meta.url), apache);
await writeFile(
  new URL('../public/_redirects', import.meta.url),
  aliases.map(([from, to]) => `/${from} ${to} 301`).join('\n') + '\n',
);
console.log(`Generated ${aliases.length} legacy redirects for Apache and Netlify.`);
