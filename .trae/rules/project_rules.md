# Règles du projet : Portfolio Abdelfattah Bouabid

## Stack (ne pas changer sans demander)
- Angular 21 (standalone components, Signals), TypeScript strict
- Tailwind CSS v4 (config CSS-first dans styles.css)
- ngx-translate pour l'i18n (FR / EN / AR avec RTL)
- Déploiement : GitHub Pages via GitHub Actions, base-href "/Portfolio/"

## Workflow
- Travaille UNE tâche à la fois, uniquement celle demandée.
- Ne modifie aucun fichier hors du périmètre de la tâche.
- Si la demande est ambiguë ou touche à l'architecture, pose une question avant d'agir.
- Avant de supprimer un fichier ou une dépendance, fais un grep dans tout le projet et montre le résultat.
- Après chaque tâche : lance `npm run build`, corrige les erreurs que tu as causées, puis résume : fichiers modifiés, supprimés, résultat du build.
- Ne lance jamais de commande destructive (rm -rf, git reset --hard, git push --force, réécriture d'historique) sans mon accord explicite.
- Un commit par tâche, en Conventional Commits (feat:, fix:, chore:, perf:, refactor:).

## Code Angular / TypeScript
- Composants standalone uniquement, `inject()` au lieu de l'injection par constructeur.
- État local avec `signal()`, `computed()`, `effect()` ; pas de RxJS si un signal suffit.
- `ChangeDetectionStrategy.OnPush` sur les nouveaux composants.
- Nouvelle syntaxe de template : `@if`, `@for` (avec `track`), `@defer`. Pas de `*ngIf` / `*ngFor`.
- Interdit : `any`, `// @ts-ignore`, accès DOM direct entre composants (`document.querySelector` pour parler à un autre composant).
- Tout accès à `window`, `document`, `localStorage`, `navigator`, `IntersectionObserver` doit être protégé (`isPlatformBrowser` / `afterNextRender`) pour que le prérendu fonctionne.
- Un fichier = une responsabilité ; extrais la logique réutilisable dans un service.

## Style / UI
- Tailwind uniquement ; pas de CSS custom sauf nécessité (animations, canvas).
- Palette : bleu (blue-600) comme primaire, émeraude (emerald-500) comme secondaire, neutres slate. N'introduis pas d'autres couleurs de marque.
- Dark mode ET light mode doivent fonctionner pour tout nouveau composant (variante `dark:`).
- Réutilise les classes existantes (.glass, .glass-card, .text-gradient) avant d'en créer.
- Mobile-first ; vérifie sm / md / lg.

## i18n (obligatoire)
- Aucun texte visible en dur : tout passe par ngx-translate.
- Ajoute chaque nouvelle clé dans fr.json, en.json ET ar.json en même temps.
- Utilise des propriétés logiques pour le RTL (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) au lieu de `ml/mr/pl/pr/left/right`.

## Accessibilité
- Éléments interactifs = vrais `<a href>` ou `<button>`, jamais un `<div>` ou `<a>` sans href avec (click).
- Alt sur toutes les images (alt="" si décorative), `aria-label` sur les boutons-icônes.
- Focus visible, navigation clavier, `Échap` ferme menus/modales.
- Respecte `prefers-reduced-motion` pour toute animation.
- Texte minimum 12px, contraste suffisant.

## Performance
- Images : WebP/AVIF, `width`/`height` explicites, `loading="lazy"` sous le fold.
- N'ajoute pas de dépendance npm sans me demander et justifier (poids, maintenance).
- Pas de grosse librairie pour un effet faisable en CSS.

## Sécurité
- Jamais de clé API, token ou secret dans le code, le front ou `.env.example` (placeholders uniquement).
- Pas de `[innerHTML]` avec du contenu non maîtrisé.
- Liens externes : `target="_blank"` + `rel="noopener noreferrer"`.

## Communication
- Réponds en français, de façon concise.
- Si tu n'es pas sûr d'une information (version, API, comportement), dis-le au lieu d'inventer.
- Ne crée pas de fichiers de documentation (.md) sans que je le demande.

## Git (obligatoire à la fin de chaque tâche)
- Tu peux faire `git add` et `git commit` (un commit par tâche), mais tu ne fais JAMAIS `git push`, `git merge`, `git checkout main`, `git pull` ni `git rebase`.
- À la fin de chaque tâche, termine TOUJOURS ton résumé par un bloc "Commandes git à lancer manuellement" avec :
  1. Vérification : `git branch --show-current` et `git status`
  2. Le push de la branche courante : `git push -u origin <nom-de-la-branche>` (le nom exact de la branche courante)
  3. Si la tâche est prête à être déployée : la séquence de merge vers main (`git checkout main`, `git pull`, `git merge <branche>`, `git push`, puis `git checkout <branche>` et `git merge main`)
  4. Une ligne expliquant ce que chaque commande fait, et ce que je dois voir si tout se passe bien
- Précise si la tâche est "déployable" (le test visuel est-il suffisant ?) ou "à continuer sur la branche avant déploiement".
- Si un fichier non suivi existe (ex: `.trae/*.md`), signale-le et dis-moi s'il faut l'ignorer via `.gitignore`.

- Pour tout composant partagé qui projette du contenu (<ng-content>), ajoute un test de rendu couvrant CHAQUE branche (@if/@else), et vérifie le HTML prérendu (dist) après build pour les liens/boutons à icône.