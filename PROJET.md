# Noveo Digital — site vitrine
> Site statique multilingue (FR / NL / EN) de Noveo Digital, servi sur https://noveodigital.be.

## Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | Astro 7 (sortie `static`) |
| Langage | TypeScript |
| Animations | GSAP 3 |
| Polices | Inter + Manrope (fontsource, locales) |
| Formulaire | FormBold (service externe, envoi depuis le navigateur) |
| SEO | `@astrojs/sitemap`, hreflang, JSON-LD |
| Vérifications | `astro check`, Playwright (Python) + axe-core |
| Hébergement | Coolify (nginx statique), `188.245.156.214` |

## Démarrage rapide

```bash
# Installation (Node 22.12+)
npm install

# Développement (http://127.0.0.1:4321)
npm run dev

# Build production (astro check + build → dist/)
npm run build

# Vérifications navigateur (serveur lancé ; QA_URL pour viser une autre adresse)
python scripts/verify.py
python scripts/review.py
```

## Architecture

```
noveo-landing/
├── src/
│   ├── pages/          [...path].astro (24 pages FR/NL/EN), 404.astro
│   ├── layouts/        Layout.astro — structure, SEO, langues
│   ├── components/     HomePage, ServicePage, ContactPage, LegalPage, Header, Footer…
│   ├── data/           translations.ts, services.ts, site.ts, assets.json
│   ├── scripts/        site.ts (GSAP, menu, portfolio), contact.ts (formulaire)
│   └── styles/         global.css
├── public/             assets WebP, .htaccess, _redirects, robots.txt, PDF des CGV
├── scripts/            verify.py, review.py, generate-redirects.mjs
└── public_html/        ancien site — référence, gitignoré, jamais publié
```

- **Pages** : le français est à la racine, `/nl/` et `/en/` pour les autres langues ; le sélecteur garde la page courante.
- **Contact** : `ContactPage.astro` rend le formulaire **sans attribut `action`** ; `contact.ts` valide, vérifie le piège `_gotcha` et envoie à FormBold en `fetch`.
- **Flux du formulaire** : saisie → validation navigateur → piège `_gotcha` rempli = faux succès, rien n'est envoyé → `POST` FormBold (piège transmis vide) → e-mail de FormBold.
- **Config clé** : `astro.config.mjs` (domaine canonique, sitemap, `assetsInlineLimit` qui interdit d'intégrer un script dans le HTML).

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `PUBLIC_CONTACT_ENDPOINT` | Adresse FormBold du formulaire, inlinée au build dans le JS (publique par nature) | ❌ (défaut dans `contact.ts`) |

## Roadmap & Features

| Feature | Statut | Date |
|---------|--------|------|
| Refonte Astro multilingue (24 pages) | ✅ Done | 2026-09-23 |
| Lien TeamViewer QuickSupport dans le pied de page | ✅ Done | 2026-09-23 |
| Anti-spam du formulaire (adresse hors HTML, piège `_gotcha`) | ✅ Done | 2026-10-06 |
| Nouvelle adresse FormBold `6lnvy` | ✅ Done | 2026-10-06 |

## Journal des changements

### 2026-10-06
- 🐛 Fix : spam massif via `/contact/`. L'adresse FormBold était dans `<form action>` depuis la refonte, et les robots y envoyaient directement, sans passer par la page. Le piège `website`, lui, n'était vérifié que dans le navigateur, puis retiré de l'envoi. Désormais : plus d'`action`, script jamais intégré au HTML (`assetsInlineLimit`), piège renommé `_gotcha` et transmis à FormBold.
- 🔒 Sécurité : nouvelle adresse FormBold `6lnvy`. L'ancienne, `oylpz`, était connue des robots et doit être supprimée dans FormBold.
- ✨ Ajout : `verify.py` contrôle que la page ne contient pas l'adresse et qu'un piège rempli n'est pas envoyé.

### 2026-09-23
- ✨ Ajout : lien TeamViewer QuickSupport dans le pied de page.
- 🗑️ Supprimé : références à Calendly.
- ✨ Ajout : refonte Astro multilingue du site (remplace l'ancien `public_html/`).

## Problèmes connus

- **Ancien formulaire FormBold `oylpz` à supprimer** : il n'est plus utilisé par le site, mais les robots le connaissent et peuvent continuer d'y envoyer tant qu'il existe dans FormBold.
- **Redirections des anciennes URL inactives en prod** : le site est servi par nginx, qui ignore `public/.htaccess`. `/contact.html`, `/Telecom`, `/image-de-marque-en.html`… répondent 404 (constaté le 2026-10-06).
- **Sans JavaScript, le formulaire ne s'envoie pas** : c'est la contrepartie de l'adresse retirée du HTML. L'adresse e-mail et le téléphone restent affichés sur la page.

## Déploiement

- **Plateforme** : Coolify (`188.245.156.214`), conteneur nginx statique. Dépôt `github.com/cltconcept/noveolanding`, branche `main`.
- **Étapes** : push sur `main`, puis **Deploy à la main dans Coolify**. Le push du 2026-10-06 n'a pas redéployé tout seul : rien après 10 min, en ligne seulement après un déploiement manuel.
- **Contrôle après déploiement** : `curl -s https://noveodigital.be/contact/ | grep -ci formbold` doit répondre `0`.
- **Production** : https://noveodigital.be
