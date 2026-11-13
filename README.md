# Portfolio - Abdelfattah Bouabid

Portfolio personnel développé avec **Angular 21** et **Tailwind CSS v4**, présentant mes compétences, expériences et projets en développement web, DevOps et sécurité réseau.

## Fonctionnalités

- **Scrollspy actif** : mise en évidence de la section active dans la navbar au défilement
- **Thème clair / sombre** : bascule persistée dans le `localStorage`
- **Internationalisation FR / EN / AR** : changement de langue à chaud avec support RTL
- **Scroll reveal** : animations d'apparition au défilement (respectant `prefers-reduced-motion`)
- **Filtrage des projets** : sélection d'une technologie depuis la section Compétences
- **Chat IA** : assistant conversationnel chargé en différé
- **Prérendu statique** : HTML généré au build pour le SEO, hydratation incrémentale au viewport
- **Déploiement automatisé** : GitHub Pages via GitHub Actions

## Stack technique

- **Framework** : Angular 21 (standalone components, Signals, nouvelle syntaxe `@if` / `@for` / `@defer`)
- **Styling** : Tailwind CSS v4 (configuration CSS-first dans `src/styles.css`)
- **Icônes** : `@lucide/angular`
- **i18n** : `@ngx-translate/core` (FR / EN / AR avec RTL)
- **Rendu** : prérendu statique (`RenderMode.Prerender`) + hydratation incrémentale
- **Tests** : Vitest + jsdom (builder `@angular/build:unit-test`)
- **CI/CD** : GitHub Actions
- **Hébergement** : GitHub Pages

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Barre de navigation (scrollspy, thème, langues)
│   │   ├── hero/            # Section d'accueil
│   │   ├── about/           # À propos
│   │   ├── services/        # Services proposés
│   │   ├── skills/          # Compétences techniques (+ filtrage projets)
│   │   ├── experience/      # Expériences professionnelles
│   │   ├── projects/        # Projets réalisés
│   │   ├── contact/         # Section de contact
│   │   ├── footer/          # Pied de page
│   │   └── chat/            # Assistant IA (chargement différé)
│   ├── directives/
│   │   └── scroll-reveal.ts # Directive d'animation au scroll
│   ├── services/
│   │   ├── theme.ts               # Thème clair / sombre
│   │   ├── language.service.ts    # Langue courante + balises SEO
│   │   ├── project-filter.service.ts # Filtre de projets partagé
│   │   └── ai-chat.service.ts     # Appels du chat IA
│   ├── app.config.ts        # Providers de l'application cliente
│   ├── app.config.server.ts # Configuration du prérendu
│   ├── app.routes.ts        # Routes client
│   ├── app.routes.server.ts # Règles de rendu serveur (prerender)
│   ├── app.html / app.ts    # Composant racine
│   └── *.spec.ts            # Tests unitaires
├── main.ts                  # Bootstrap navigateur
├── main.server.ts           # Bootstrap serveur (prérendu)
├── index.html
└── styles.css               # Tailwind + styles globaux

public/
└── assets/
    ├── certificat/          # Certifications (PDF)
    ├── cv/                  # CV en PDF (FR / EN / AR)
    ├── i18n/                # Traductions fr.json / en.json / ar.json
    └── logo/                # Logos des technologies
```

## Installation & développement

### Prérequis

- Node.js 22 (version utilisée en CI) ou >= 20
- npm >= 10

### Étapes

1. **Cloner le repo**

   ```bash
   git clone https://github.com/AbdelfattahBOUABID05/Portfolio.git
   cd Portfolio
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**

   ```bash
   npm start
   ```

   Ouvre `http://localhost:4200/`.

### Scripts disponibles

| Script        | Description                                            |
| ------------- | ------------------------------------------------------ |
| `npm start`   | Serveur de développement                                |
| `npm run build` | Build de production (prérendu statique)               |
| `npm run watch` | Build en continu (configuration development)          |
| `npm test`    | Tests unitaires (Vitest, exécution unique)             |

### Build de production

```bash
npm run build
```

Le site prérendu est généré dans `dist/portfolio/browser/` (le fichier `index.html` contient le HTML rendu).

## Déploiement

Le déploiement sur GitHub Pages est automatisé par le workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) :

- Il se déclenche à chaque push sur la branche `main` (ou manuellement via `workflow_dispatch`)
- Il installe les dépendances (`npm ci`), build le projet avec `--base-href "/<nom-du-repo>/"` puis publie le dossier `dist/portfolio/browser`
- La publication utilise les actions officielles GitHub Pages (`actions/upload-pages-artifact` + `actions/deploy-pages`)

### Pour activer GitHub Pages

1. Aller dans les paramètres du dépôt → **Pages**
2. Dans **Build and deployment** → **Source**, choisir **GitHub Actions**
3. Le déploiement se fait ensuite automatiquement à chaque push sur `main`

> Le `base-href` est passé par le workflow, déduit du nom du dépôt (`/Portfolio/`). En local, `npm run build` utilise `/` par défaut.

## Licence

MIT

## Contact

- LinkedIn : [Abdelfattah Bouabid](https://www.linkedin.com/in/abdelfattah-bouabid-150a56335)
- GitHub : [AbdelfattahBOUABID05](https://github.com/AbdelfattahBOUABID05)
- Email : abdelfattahbouabid123@gmail.com


