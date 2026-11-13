# Portfolio — Abdelfattah Bouabid

Portfolio personnel d'**Abdelfattah Bouabid**, ingénieur logiciel full-stack (DevOps, SecOps, Web & Mobile).
Site statique prérendu, trilingue (FR / EN / AR avec RTL), en clair / sombre, construit avec **Angular 21** et **Tailwind CSS v4**.

🔗 En ligne : https://abdelfattahbouabid05.github.io/Portfolio/

## Aperçu

Une page unique qui présente le profil, les compétences, les expériences, les certifications et les projets
(sous forme d'études de cas détaillées). Le HTML est généré au build (prérendu statique) pour un chargement
rapide et un bon référencement, puis hydraté de façon incrémentale côté navigateur.

## Fonctionnalités

- **Internationalisation FR / EN / AR** : changement de langue à chaud, prise en charge complète du **RTL** (arabe)
- **Thème clair / sombre** : bascule persistée, sans flash au chargement (anti-FOUC)
- **Études de cas (case studies)** : pages de projet détaillées (LogSOC, pipeline CI/CD)
- **Filtre de compétences** : sélection d'une technologie dans la section Compétences pour filtrer les projets
- **Formulaire de contact** : envoi via **Formspree** (endpoint public, sans backend)
- **Notifications toast** : retours utilisateur à l'envoi du formulaire
- **Chat IA** : assistant conversationnel chargé en différé (`@defer`)
- **Scrollspy** : mise en évidence de la section active dans la navbar
- **Scroll reveal** : animations d'apparition au défilement, respectant `prefers-reduced-motion`
- **Prérendu statique** + **hydratation incrémentale au viewport**
- **Téléchargement du CV** selon la langue courante

## Stack technique

- **Framework** : Angular 21 (standalone components, Signals, `ChangeDetectionStrategy.OnPush`, syntaxe `@if` / `@for` / `@defer`)
- **Langage** : TypeScript (mode strict)
- **Styling** : Tailwind CSS v4 (configuration CSS-first dans `src/styles.css`)
- **Icônes** : `@lucide/angular`
- **i18n** : `@ngx-translate/core` (FR / EN / AR)
- **Rendu** : prérendu statique (`@angular/ssr`, `RenderMode.Prerender`)
- **Tests** : Vitest + jsdom (builder `@angular/build:unit-test`)
- **CI/CD & hébergement** : GitHub Actions → GitHub Pages

## Scores Lighthouse

Mesurés sur le site en production :

| Catégorie           | Score   |
| ------------------- | ------- |
| Performance         | 95–99   |
| Accessibilité       | 100     |
| Bonnes pratiques    | 100     |
| SEO                 | 100     |
| CLS (stabilité)     | 0       |

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Navigation (scrollspy, thème, langues)
│   │   ├── hero/            # Section d'accueil
│   │   ├── about/           # À propos (+ certifications)
│   │   ├── services/        # Services proposés
│   │   ├── skills/          # Compétences (+ filtre de projets)
│   │   ├── experience/      # Expériences professionnelles
│   │   ├── projects/        # Projets & études de cas
│   │   ├── contact/         # Formulaire de contact (Formspree)
│   │   ├── footer/          # Pied de page
│   │   └── chat/            # Assistant IA (chargé en différé)
│   ├── config/
│   │   └── contact.config.ts      # Configuration publique du formulaire
│   ├── directives/
│   │   └── scroll-reveal.ts       # Animation d'apparition au scroll
│   ├── i18n/
│   │   └── default-language.loader.ts  # Loader i18n (EN inliné, FR/AR via HTTP)
│   ├── services/
│   │   ├── theme.ts               # Thème clair / sombre
│   │   ├── language.service.ts    # Langue courante + balises SEO
│   │   ├── project-filter.service.ts # Filtre de projets partagé
│   │   ├── contact.service.ts     # Envoi du formulaire
│   │   └── ai-chat.service.ts     # Réponses du chat IA
│   ├── shared/
│   │   ├── button/                # Bouton réutilisable
│   │   ├── card/                  # Carte réutilisable
│   │   └── badge/                 # Badge réutilisable
│   ├── app.config.ts        # Providers de l'application cliente
│   ├── app.config.server.ts # Configuration du prérendu
│   ├── app.routes.ts        # Routes client
│   ├── app.routes.server.ts # Règles de rendu serveur (prerender)
│   ├── app.html / app.ts    # Composant racine
│   └── *.spec.ts            # Tests unitaires
├── main.ts                  # Bootstrap navigateur
├── main.server.ts           # Bootstrap serveur (prérendu)
├── index.html               # Métadonnées SEO, Open Graph, JSON-LD
└── styles.css               # Tailwind + styles globaux

public/
├── assets/
│   ├── certificat/          # Certifications (PDF)
│   ├── cv/                  # CV en PDF (EN / AR)
│   ├── fonts/               # Polices auto-hébergées (woff2)
│   ├── i18n/                # Traductions fr.json / en.json / ar.json
│   └── logo/                # Logos des technologies
├── og-image.png             # Image Open Graph (1200×630)
├── robots.txt
└── sitemap.xml
```

## Installation & développement

### Prérequis

- **Node.js 22** (version utilisée en CI)
- npm >= 10

### Étapes

```bash
git clone https://github.com/AbdelfattahBOUABID05/Portfolio.git
cd Portfolio
npm install
npm start
```

Le site est servi sur `http://localhost:4200/`.

### Scripts npm

| Script          | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `npm start`     | Serveur de développement (`ng serve`)                              |
| `npm run build` | Build de production avec prérendu statique                         |
| `npm run watch` | Build en continu (configuration `development`)                     |
| `npm test`      | Tests unitaires Vitest (mode watch) — `npm test -- --watch=false` pour une exécution unique |

### Build de production

```bash
npm run build -- --base-href "/Portfolio/"
```

Le site prérendu est généré dans `dist/portfolio/browser/` (`index.html` contient le HTML rendu au build).

## Internationalisation (i18n)

Le site est disponible en **français**, **anglais** et **arabe** (avec direction **RTL**).

- Les libellés visibles passent tous par `@ngx-translate` via le pipe `translate` — aucun texte en dur dans les templates.
- Les traductions vivent dans `public/assets/i18n/fr.json`, `en.json` et `ar.json` : **toute nouvelle clé doit être ajoutée dans les trois fichiers**.
- L'**anglais** (langue par défaut) est **inliné dans le bundle** (`DefaultLanguageLoader`) : chargement synchrone, aucune requête HTTP.
- Les langues **FR** et **AR** sont chargées à la demande via le loader HTTP depuis `assets/i18n/`.
- La langue choisie est mémorisée dans le `localStorage` (clé `preferredLanguage`).
- Le RTL utilise des propriétés CSS logiques (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`).

## Déploiement

Le déploiement sur **GitHub Pages** est automatisé par le workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) :

- Déclenché à chaque **push sur `main`** (ou manuellement via `workflow_dispatch`)
- Installe les dépendances (`npm ci`), build avec `--base-href "/${{ github.event.repository.name }}/"`, puis publie `dist/portfolio/browser`
- Publication via les actions officielles GitHub Pages (`actions/upload-pages-artifact` + `actions/deploy-pages`)

> Le `base-href` est déduit du nom du dépôt par le workflow (`/Portfolio/`). En local, pensez à passer `--base-href "/Portfolio/"` pour reproduire le comportement de production.

## Licence

MIT

## Contact

- **LinkedIn** : [Abdelfattah Bouabid](https://www.linkedin.com/in/abdelfattah-bouabid-150a56335)
- **GitHub** : [AbdelfattahBOUABID05](https://github.com/AbdelfattahBOUABID05)
- **Email** : abdelfattahbouabid123@gmail.com
