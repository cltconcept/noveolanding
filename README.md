# Noveo Digital — Astro

Refonte statique du site Noveo Digital. Le projet Astro se trouve directement à la racine. L’original reste dans `public_html/` comme référence et n’est pas inclus dans le site produit.

## Démarrer

Node.js 22.12+ (version paire) et npm.

```sh
npm install
npm run dev
```

Le site est disponible à l’adresse affichée dans le terminal, généralement `http://localhost:4321`.

```sh
npm run check   # vérification TypeScript et Astro
npm run build   # vérification + génération du site dans dist/
npm run preview
npm run format  # formatage des sources
```

## Organisation

- `src/pages/[...path].astro` : génération des 24 pages en français, néerlandais et anglais.
- `src/layouts/Layout.astro` : structure commune, référencement, langues et métadonnées.
- `src/components/` : pages et composants de navigation, portfolio, FAQ, animation du logo.
- `src/data/translations.ts` : contenus généraux et traductions.
- `src/data/services.ts` : contenus des cinq expertises.
- `src/data/site.ts` : coordonnées, routes, équipe et projets.
- `src/styles/global.css` : styles, tokens graphiques, mises en page responsive et réduction des animations.
- `src/scripts/site.ts` : animations GSAP, menu clavier/mobile, portfolio.
- `src/scripts/contact.ts` : formulaire, validation, état d’envoi, confirmation et erreurs.
- `public/assets/` : sélection des visuels d’origine optimisés en WebP. Les fichiers administratifs de l’ancien dossier ne sont pas copiés.

Le français est à la racine ; les autres langues utilisent `/nl/` et `/en/`. Le sélecteur de langue conserve la page courante. Les polices sont locales. Aucun service de suivi publicitaire ou d’audience n’est chargé.

## Contact

Le formulaire reprend le destinataire FormBold de l’ancien site : `https://formbold.com/s/oylpz`. Pour le changer, recopier `.env.example` vers `.env` et modifier `PUBLIC_CONTACT_ENDPOINT`, puis reconstruire le site.

L’envoi nécessite que le compte FormBold existant soit actif et accepte le domaine de déploiement. Les tests simulent les réponses du service pour éviter d’envoyer des demandes fictives. Ils ne vérifient pas la réception effective d’un e-mail.

Les coordonnées et l’hébergement Hostinger des mentions légales sont repris du site d’origine ; les mettre à jour si l’hébergement ou l’entreprise change.

## Déployer sur l’hébergement existant

1. Exécuter `npm run build`.
2. Sauvegarder la version actuellement en ligne.
3. Déployer **uniquement le contenu de `dist/`**, y compris `.htaccess`, comme nouvelle racine publique. Ne pas superposer les anciens fichiers administratifs au nouveau site.

Le fichier Apache `.htaccess` contient les redirections permanentes des anciennes URL (notamment `Web&Erp`, `Telecom`, `IT-et-cybersecurite`, les variantes `.html` et les langues), la page 404 et quelques en-têtes de sécurité. Il suppose `mod_rewrite` activé et une publication à la racine du domaine. `_redirects` fournit les mêmes correspondances pour Netlify. Sur un autre hébergement, adapter ces règles à son système de redirection.

Pour régénérer ces fichiers après un changement de routes :

```sh
node scripts/generate-redirects.mjs
```

Le domaine canonique se configure dans `astro.config.mjs`. Le sitemap est généré à la compilation. Aucun déploiement n’est effectué automatiquement.

## Vérifications navigateur

Les scripts nécessitent Python avec `playwright` et Google Chrome installés. Démarrer `npm run dev`, puis :

```sh
python scripts/verify.py  # routes, mobile, clavier, langues, formulaire simulé, animations réduites
python scripts/review.py # captures et contrôles axe-core sur six pages/écrans représentatifs
```

Les rapports et captures sont enregistrés dans `.qa/` (hors publication). La variable `QA_URL` permet de viser un serveur de prévisualisation différent. Le contrôle automatique d’accessibilité complète les vérifications clavier ; il ne constitue pas un audit exhaustif de conformité.
