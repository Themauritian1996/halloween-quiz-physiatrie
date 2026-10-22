# 🎃 Quiz Halloween — Résidents en physiatrie

Quiz de culture générale **Halloween** multijoueur en temps réel, pour les **résidents en physiatrie** (pas pédiatrie). Un hôte crée une partie, les joueurs rejoignent par **lien unique / code à 6 caractères / QR code**, répondent chacun sur leur appareil, avec **pouvoirs spéciaux**, **modes solo et équipes**, et **classement en direct**.

> Spec de référence : [`SPEC_v2.md`](SPEC_v2.md) à la racine du projet. État : **Lot 8 (refonte après test réel)** — application jouable complète, **multijoueur distant Firestore réellement branché** (repli démo local automatique), **nouvelle banque de 600 questions de culture générale ludique** (100/catégorie). L'ancienne banque de 1 200 questions, jugée trop pointue, est archivée dans `questions/archive-v1-1200/`. Lot 8 corrige aussi : **médias réparés** (résolution par la base Vite + lien « 🔎 Ouvrir le média » sous chaque média), **enchaînement automatique des questions** après la révélation, et **affichage mobile d'abord** (Android Chrome, aucun défilement horizontal).

## 🚀 Démarrage rapide (mode démo local, sans aucun compte)

```bash
cd app
npm install
npm run dev
```

Ouvre l'URL affichée (par défaut http://localhost:5173) :

1. **Créer une partie (hôte)** → configure la partie → un code, un lien et un QR code apparaissent dans le lobby.
2. **Rejoindre** : clique « Ouvrir un onglet joueur » dans le lobby (ou ouvre le lien dans un autre onglet du **même navigateur**), entre un pseudo, choisis ton équipe si le mode l'exige.
3. L'hôte peut ajouter des **🤖 bots de démo** pour tester seul.
4. **Lancer la partie** → questions, timer, pouvoirs, révélations avec explications, classement live, podium final (individuel + équipes).

Le mode démo synchronise les onglets via `localStorage` + `BroadcastChannel` (`src/lib/room.js`). Il fonctionne **sans Firebase, sans serveur, sans clé**.

## ⚙️ Configuration d'une partie (écran hôte)

- **Nombre de questions éditable : 10 à 60** (défaut 30), avec **durée estimée** en direct
- **Répartition** : équilibrée entre catégories / aléatoire / manuelle (nombre par catégorie)
- **Difficulté** : mixte / intermédiaire / difficile — **Médias** : mixte / sans média / médias seulement
- **Timer par question** : 30 / 45 / 60 secondes
- **Enchaînement automatique** (Lot 8) : après la révélation, la question suivante démarre toute seule après **5 / 8 / 12 s** (8 s par défaut), avec barre de compte à rebours et bouton hôte « ⏩ Passer maintenant » ; désactivable pour revenir au clic manuel. À la dernière question, passage automatique au podium.
- **Modes** : Solo · Équipes libres (le joueur choisit, 2 à 6 équipes aux noms éditables) · Équipes aléatoires (assignation équilibrée au lancement)
- **Option vote consensus** (modes équipes) : la réponse majoritaire de l'équipe compte ; égalité → choix du capitaine (le premier membre de l'équipe)
- **Score d'équipe** : somme ou moyenne des membres

## 📏 Règles de scoring

- **Vitesse** : bonne réponse = 500 + 500 × (temps restant / temps total), soit 500 à 1 000 pts
- **Bonus série** : +150 pts chaque fois qu'une série de bonnes réponses atteint un multiple de 3 (le bonus n'est ni doublé ni coupé par la Malédiction)
- **Pouvoirs — 1 utilisation de chacun par partie** :
  - **✖️2 Double points** : double ta base vitesse sur la question en cours
  - **⏭️ Sauter** : 0 pt, série conservée, immunisé à la pénalité de la question (même sous Malédiction)
  - **½ 50/50** : élimine 2 mauvaises réponses, pour toi seul
  - **☠️ MALÉDICTION** : s'applique à **tout le monde** sur la question en cours — bonne réponse = **50 % des points seulement**, mauvaise réponse ou absence de réponse = **−500 pts**. Une seule Malédiction peut être active par question (la première compte, les suivantes ne sont pas consommées), le lanceur subit aussi l'effet, et l'effet est **visible par tous avant de répondre** (bandeau rouge). Le score cumulé ne descend jamais sous 0.

## ❓ Banque de questions (Lot 9 : 600 questions, dont 150 à média utile)

**Refonte Lot 8** : la première banque (1 200 questions, niveaux intermédiaire à difficile très pointus) a été **remplacée** après le test réel du 2026-10-21 : Christophe la jugeait « beaucoup trop spécifique ». Elle est conservée pour l'historique dans `questions/archive-v1-1200/`.

Nouveau profil : **culture générale Halloween grand public cultivé et ludique** — faits largement partagés (Hadès chez les Grecs, le méchant de la saison 3 de Stranger Things, les grands classiques), calibrés pour qu'**environ la moitié des joueurs puissent répondre**. 4 choix plausibles, 1 seule bonne réponse, **explication courte pour chaque question**, bonnes réponses réparties exactement 25/25/25/25 par catégorie.

| Catégorie | Questions | Dont média | Fichier |
|---|---:|---:|---|
| Histoire & origines | 100 | 25 | `src/data/histoire.json` (copie : `../questions/histoire.json`) |
| Cinéma & séries | 100 | 25 | `src/data/cinema-series.json` |
| Littérature, légendes & monstres | 100 | 25 | `src/data/litterature.json` |
| Science, anatomie & médecine macabre *(clin d'œil physiatrie : nerf sciatique, membre fantôme, prothèses…)* | 100 | 25 | `src/data/science-medecine.json` |
| Musique & pop culture | 100 | 25 | `src/data/musique-pop.json` |
| Traditions, bonbons & géographie | 100 | 25 | `src/data/traditions.json` |
| **Total** | **600** | **150 (25 %)** | 450 intermédiaires / 150 difficiles |

**Lot 9 — le média EST la question** : les 60 anciennes questions à illustration décorative ont été remplacées et 90 questions converties/ajoutées, pour **150 questions où le média est indispensable** (105 images, 32 audio, 13 vidéos) : identifier un film d'après son affiche ou une scène (cinéma d'horreur classique du domaine public : *Nosferatu*, *Caligari*, *Night of the Living Dead*…), un monstre d'après une gravure ancienne (Harry Clarke, Doré, Aldrovandi…), une pièce d'après un extrait sonore (Bach, Saint-Saëns, Moussorgski…), une tradition d'après une photo libre (Krampus, tōrō nagashi, ossuaire de Sedlec…).

**Sources et licences** : uniquement **Wikimedia Commons**, fichiers **domaine public ou licences libres** (CC0, CC BY, CC BY-SA) vérifiés un par un via l'API — aucun contenu protégé réhébergé (pas d'affiche ni de scène de film récent), aucun hotlink. **Anti-fuite** : fichiers renommés en codes neutres (`med-0001.jpg`…), alt et légende génériques pendant le jeu ; la source précise (fichier Commons, auteur, licence) est consignée dans `public/media/CREDITS.md`. Certains fichiers audio/vidéo ont été réduits à un extrait et réencodés (WebM/MP3/OGG) pour garder le site léger. Lecteur intégré pour les 3 types (image affichée, audio avec **replay limité à 2 écoutes** côté joueur, vidéo en `<video controls>`), toujours avec le lien « 🔎 Ouvrir le média » en filet de sécurité. Les anciennes illustrations CC0 du projet restent dans `public/media/` mais ne sont plus utilisées par la banque.

> **Bug média corrigé au Lot 8** : les JSON stockent `media.src` en `/media/…` absolu, ce qui donnait des **404 sous le sous-chemin GitHub Pages**. Tous les médias passent désormais par `src/lib/mediaUrl.js`, qui les résout par rapport à `import.meta.env.BASE_URL` (local `./`, Pages `/<repo>/`, Firebase Hosting `/`). Filet de sécurité demandé : un lien **« 🔎 Ouvrir le média »** sous chaque média, et un encadré avec ce lien si le chargement échoue.

Format d'une question : voir `SPEC_v2.md` §4 (`id`, `category`, `difficulty`, `type`, `question`, `choices`, `correctIndex`, `explanation`, `media {kind, src, alt, credit, licence}`).

## ☁️ Multijoueur distant (Firebase Firestore — branché au Lot 2)

Le mode démo local synchronise les onglets d'**un seul navigateur**. Avec une config Firebase, le store de partie (`app/src/lib/room.js`) bascule **automatiquement** sur Firestore : un document `rooms/{code}` par partie (config, joueurs, réponses, scores), écouté en temps réel par `onSnapshot` — l'hôte et chaque joueur sont alors sur des **appareils différents**, joints par le lien ou le code de partie. Le mapping état local ↔ document est isolé et testé dans `app/src/lib/roomMapping.js` (`npm test`). Sans config dans `.env`, l'app reste en mode démo local.

Pour activer le distant :

1. Crée un projet sur [console.firebase.google.com](https://console.firebase.google.com) et active **Firestore** (mode production).
2. Déploie les règles de sécurité fournies à la racine : `firestore.rules` (déjà référencées par `firebase.json`) — elles limitent l'accès à la seule collection `rooms`, interdisent de lister les parties, exigent un document de partie bien formé et ferment tout le reste de la base. Déploiement : `firebase deploy --only firestore:rules` (avec [firebase-tools](https://firebase.google.com/docs/cli)) ou copier-coller dans la console Firebase → Firestore → Règles.
3. Copie `app/.env.example` en `app/.env` et remplis les `VITE_FIREBASE_*` avec la config web de **ton** projet (le fichier `.env` est gitignoré — **aucun secret dans le code ni dans Git**).
4. Rebuild/redéploie : le badge dans l'app indique alors « ☁️ En ligne (Firestore) ».

> Honnêteté Lot 2 : le code Firestore est complet et le mapping est couvert par des tests automatisés, mais **aucun test réseau réel n'a été fait dans l'environnement de développement** (pas de projet Firebase réel ni d'émulateur disponible là-bas). Le premier vrai test se fait en suivant les étapes ci-dessus, puis en jouant une partie entre deux appareils différents.

> Note de modèle : sans authentification (les joueurs rejoignent sans compte, comme les quiz commerciaux à code de salle), la sécurité repose sur le code de partie à 6 caractères et sur les règles ci-dessus — elles ne peuvent pas distinguer l'hôte d'un joueur connaissant le code. Voir les commentaires détaillés en tête de `firestore.rules`.

## 🚀 Mise en ligne (GitHub + GitHub Pages, pas à pas)

Le repo est prêt pour GitHub (git initialisé, `.gitignore` complet : `node_modules`, `dist`, `.env`, `.firebaserc`, `.firebase`).

1. **Créer le repo GitHub** (vide, sans README ni .gitignore auto) — par ex. `halloween-quiz-physiatrie`.
2. **Relier et pousser** depuis la racine du projet :
   ```bash
   git remote add origin git@github.com:<ton-compte>/halloween-quiz-physiatrie.git
   git push -u origin main
   ```
3. **Créer les secrets GitHub** (repo → *Settings → Secrets and variables → Actions → New repository secret*) — ce sont les mêmes valeurs que `app/.env`, lues au build par le workflow :
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.
   ( Sans eux, le site se déploie quand même, en mode démo local. )
4. **Activer Pages** : repo → *Settings → Pages → Build and deployment → Source : **GitHub Actions***.
5. **C'est tout** : le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) se déclenche à chaque push sur `main` — tests, build avec `VITE_BASE_PATH=/<nom-du-repo>/` (sous-chemin Pages, calculé automatiquement), publication. Le site sort à `https://<ton-compte>.github.io/halloween-quiz-physiatrie/`.
6. **Créer le projet Firebase** (si pas déjà fait) : console Firebase → nouveau projet → **Firestore Database → Créer** → déployer `firestore.rules` (étape 2 de la section précédente) → *Paramètres du projet → Tes applications → Web* pour récupérer les valeurs `VITE_FIREBASE_*` à mettre (a) dans les secrets GitHub ci-dessus et (b) dans `app/.env` pour le développement local. Les deux sont indépendants : CI n'utilise PAS ton `.env`.

### Alternative : Firebase Hosting

Plutôt que Pages : `cp .firebaserc.example .firebaserc` (mettre l'ID du projet, fichier gitignoré), installer firebase-tools, puis `bash scripts/deploy-firebase.sh` — le script build avec base `/`, puis déploie Hosting (public = `app/dist`, réécritures SPA déjà dans `firebase.json`) **et** les règles Firestore en une commande.

### Base path Vite (important)

`app/vite.config.js` lit `VITE_BASE_PATH` au build : défaut `./` (local, Firebase Hosting avec `/`), le workflow Pages le fixe à `/<nom-du-repo>/`. N'y touche pas à la main sauf hébergeur exotique.

## 🗂️ Structure

```
halloween-quiz-physiatrie/
├── SPEC_v2.md                  # spec validée (source de vérité)
├── README.md                   # ce fichier (aussi copié dans app/)
├── firestore.rules             # règles Firestore (collection rooms uniquement)
├── firebase.json               # Firestore rules + Hosting (public app/dist, SPA)
├── .firebaserc.example         # modèle de sélection du projet Firebase
├── .github/workflows/deploy-pages.yml  # CI : tests + build + GitHub Pages
├── scripts/deploy-firebase.sh  # alternative : déploiement Firebase Hosting
├── questions/                  # banque source (JSON par catégorie) + BANQUE_STRUCTURE.md
├── media/                      # copies des médias servis
└── app/
    ├── public/media/           # médias servis (SVG CC0, WAV CC0, CREDITS.md)
    ├── tests/                  # node --test : scoring + mapping Firestore
    └── src/
        ├── App.jsx             # écrans : accueil, config, lobby, jeu, révélation, podium
        ├── data/*.json         # banque importée par l'app (miroir de questions/)
        └── lib/
            ├── questions.js    # catalogue, filtres, sélection sans remise
            ├── scoring.js      # scoring vitesse, série, Malédiction, consensus
            ├── room.js         # store de partie asynchrone : Firestore ou démo locale
            ├── roomMapping.js  # mapping pur état <-> document Firestore (testé)
            └── firebase.js     # init Firebase optionnelle via .env
```

## 🛣️ Historique des lots

- **Lots 1-7 (2026-10-20)** : app complète, Firestore distant, banque portée progressivement à 1 200 questions très pointues (200/catégorie), mise en ligne GitHub Pages + Firebase, test multijoueur réel réussi.
- **Lot 8 (2026-10-21, refonte après test réel)** : médias réparés (base Vite + lien d'ouverture + repli en cas d'échec), enchaînement automatique après révélation (5/8/12 s, désactivable), affichage mobile d'abord (aucun débordement à 360-400 px, lobby empilé, réponses tactiles), et **nouvelle banque de 600 questions culture générale ludique** (ancienne archivée dans `questions/archive-v1-1200/`).
- **Lot 9 (2026-10-21, médias utiles)** : **150 questions où le média EST la question** (25/catégorie : 105 images, 32 audio, 13 vidéos) sourcées sur Wikimedia Commons (domaine public / licences libres vérifiées une par une), fichiers codés anti-fuite `med-XXXX`, support **vidéo** ajouté à l'app (lecteur intégré + filtre « Médias seulement »), extraits audio/vidéo allégés par réencodage. Détails : `questions/BANQUE_STRUCTURE.md` et `app/public/media/CREDITS.md`.
