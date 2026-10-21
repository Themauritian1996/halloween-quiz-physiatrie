# Quiz Halloween multijoueur — Résidents en physiatrie
## Spec v2 — 2026-10-20 (remplace v1)

Public : résidents en **physiatrie** (pas pédiatrie). Culture générale Halloween, niveau intermédiaire à difficile.

## 1. Pouvoirs (1 utilisation de chaque par joueur / par équipe en mode équipe)
1. **Double points** — x2 sur ta prochaine question si bonne réponse.
2. **Sauter** — passe une question sans pénalité, série conservée.
3. **50/50** — élimine 2 mauvaises réponses (pour toi seul).
4. **MALÉDICTION (nouveau, remplace Gel du temps)** — activé avant la révélation d'une question, s'applique à **TOUS** les joueurs de la question en cours :
   - Bonne réponse : **50 % des points seulement** (le calcul vitesse est fait, puis divisé par 2)
   - Mauvaise réponse ou pas de réponse : **points négatifs** — `-500 pts` (plancher à 0 pour le score total, on ne passe pas sous zéro au cumul)
   - Règles anti-abus : une seule Malédiction peut être active par question (la première déclenchée compte, les autres ne sont pas consommées) ; le joueur qui la lance subit aussi l'effet ; visible par tous avant de répondre (icône ☠️ + bandeau rouge) pour que ce soit un vrai pari stratégique, pas un piège caché.

## 2. Modes de jeu
- **Solo (chacun pour soi)** — classement individuel.
- **Équipes libres** — l'hôte crée 2 à 6 équipes (noms/couleurs Halloween), les joueurs choisissent leur équipe dans le lobby.
- **Équipes aléatoires** — assignation auto équilibrée par l'app à la fermeture du lobby.
- **Équipe — vote consensus (option dans les modes équipes)** — chaque membre vote, la réponse majoritaire de l'équipe compte ; égalité = réponse du capitaine d'équipe.
- Score d'équipe configurable par l'hôte : **Somme** (défaut) ou **Moyenne** des membres. Podium équipe + podium individuel affichés à la fin dans les deux cas.

## 3. Nombre de questions éditable (écran de configuration hôte)
- Curseur **10 à 60 questions** (défaut 30)
- Durée estimée affichée en direct (ex. 30 q. x ~55 sec = ~28 min)
- Répartition au choix : Équilibrée entre catégories / Aléatoire complète / Manuelle (x questions par catégorie)
- Filtres : difficultés (Intermédiaire / Difficile / Mixte), médias seulement / sans médias / mixte, timer par question (30 / 45 / 60 sec)
- Aucune répétition dans une même partie ; tirage sans remise depuis la banque

## 4. Banque de questions — cible 200 / catégorie
6 catégories x 200 = **1 200 questions**, niveau intermédiaire à difficile.
Catégories :
1. Histoire & origines d'Halloween
2. Cinéma & séries — horreur et culte
3. Littérature, légendes & monstres
4. Science, anatomie & médecine macabre (clin d'œil physiatrie : corps, prothèses et réadaptation dans la fiction et l'histoire — aucune question de pédiatrie)
5. Musique & pop culture
6. Traditions, bonbons & géographie

Format par question (JSON) :
```json
{
  "id": "cinema-0001",
  "category": "cinema-series",
  "difficulty": "intermediaire|difficile",
  "type": "texte|image|audio",
  "question": "...",
  "choices": ["...", "...", "...", "..."],
  "correctIndex": 0,
  "explanation": "Fait / anecdote sourcée affichée après la réponse",
  "media": { "kind": "image|audio|null", "src": "/media/...", "alt": "...", "credit": "...", "licence": "..." }
}
```
- **Médias : ~15-20 % de chaque catégorie** (~30-40 questions / catégorie)
  - Image : affiche / scène à identifier, monstre, lieu, objet, carte — sources libre de droits ou domaine public (Wikimedia Commons, etc.), fichier hébergé dans le repo, jamais de hotlink, crédit + licence consignés
  - Audio : thème musical, bruitage, cri culte, extrait d'ambiance à identifier — courts extraits hébergés dans le repo avec crédit/licence ; lecteur avec replay limité (2 écoutes) côté joueur, lecture synchro côté hôte
- Livraison par lots vérifiés (par catégorie) pour garder la qualité niveau intermédiaire-difficile : pas de doublons, 4 choix plausibles, bonne réponse vérifiée, explication obligatoire.

## 5. Rappel socle v1 (inchangé)
- Hôte + joueurs par lien unique / code 6 lettres / QR, temps réel Firebase, aucun compte joueur
- Score vitesse 0-1000 pts, bonus série +150 après 3 bonnes réponses de suite (la Malédiction prime sur le calcul : le bonus série n'est pas doublé/coupé, à confirmer au build)
- React + Vite + Tailwind, repo GitHub complet + déploiement GitHub Pages / Firebase Hosting
