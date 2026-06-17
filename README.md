# Portfolio - Abdelfattah Bouabid

Portfolio personnel développé avec **Angular 17+** et **Tailwind CSS**, présentant mes compétences, expériences et projets en développement web, DevOps et sécurité réseau.

## 🚀 Fonctionnalités

- **Scrollspy Actif** : Mise en évidence de la section active dans la barre de navigation lors du défilement
- **Thème Clair/Sombre** : Switcher entre le mode clair et sombre
- **Design Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Scroll Reveal** : Animations de défilement fluides
- **Routage Hashless** : Navigation fluide entre les sections
- **Déploiement Automatisé** : GitHub Pages via GitHub Actions

## 🛠️ Stack Technique

- **Framework** : Angular 17+ (Standalone Components, Signals)
- **Styling** : Tailwind CSS
- **Icons** : Lucide Angular
- **CI/CD** : GitHub Actions
- **Hosting** : GitHub Pages

## 📂 Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Barre de navigation avec scrollspy
│   │   ├── hero/            # Section d'accueil
│   │   ├── about/           # À propos avec physique des icônes
│   │   ├── services/        # Services proposés
│   │   ├── skills/          # Compétences techniques
│   │   ├── experience/      # Expériences professionnelles
│   │   ├── projects/        # Projets réalisés
│   │   ├── contact/         # Section de contact
│   │   └── footer/          # Pied de page
│   ├── directives/
│   │   └── scroll-reveal/   # Directive pour les animations de scroll
│   └── services/
│       └── theme/           # Service de gestion du thème clair/sombre
└── assets/
    ├── certificats/         # Certifications professionnelles
    ├── data/                # CV en PDF
    └── logo/                # Logos technologies
```

## 🔧 Installation & Développement

### Prérequis
- Node.js >= 20
- npm >= 10

### Étapes
1. **Cloner le repo**
   ```bash
   git clone https://github.com/[TON-PSEUDO]/[TON-REPO].git
   cd Portfolio
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run start
   ```
   Ouvre `http://localhost:4200/` dans ton navigateur.

### Build pour la Production
```bash
npm run build
```
Les fichiers de build sont générés dans le dossier `dist/portfolio/browser/`.

## 🚀 Déploiement

Le déploiement sur GitHub Pages est automatisé via GitHub Actions :
- Le workflow se déclenche automatiquement à chaque push sur la branche `main`
- Il build le projet en mode production
- Il déploie le contenu du dossier `dist/portfolio/browser/` sur la branche `gh-pages`

### Pour activer GitHub Pages :
1. Allez dans les paramètres du repo
2. Clique sur "Pages" (section "Code and automation")
3. Choisis "Deploy from a branch"
4. Sélectionne la branche `gh-pages` et le dossier `/ (root)`
5. Clique sur "Save"

## 📄 License

MIT

## 📬 Contact

- LinkedIn : [Abdelfattah Bouabid](https://www.linkedin.com/in/abdelfattah-bouabid-150a56335)
- GitHub : [AbdelfattahBOUABID05](https://github.com/AbdelfattahBOUABID05)
- Email : abdelfattahbouabid123@gmail.com
