# Simulation des règles — v3 (2026-11-05)

2 000 parties simulées par variante : 12 joueurs, 30 questions, taux de réussite
d'environ 50 %, logique de score identique à `app/src/lib/scoring.js`.
Script : `banque-v3/simulation_regles.py` (`python3 banque-v3/simulation_regles.py`).

| Variante | Questions maudites / 30 | Pénalités subies par joueur | Gain du lanceur vs les autres | Corrélation habileté–rang |
|---|---|---|---|---|
| v2 : −500, aucun délai | 11 | 3,8 | +320 | 0,68 |
| −250, aucun délai | 11 | 3,8 | +228 | 0,69 |
| **v3 : −250 + 4 questions de délai** | **6** | **2,3** | **+241** | **0,68** |
| −15 % du score (proportionnelle) | 8 | — | — | 0,64 |
| Sans malédiction (référence) | 0 | 0 | — | 0,69 |

Conclusions
- La malédiction ne fausse pas le classement : elle frappe tout le monde.
- Le problème de la v2 était la fréquence : plus d'une question sur trois maudite.
- v3 retenue par Christophe : −250, au moins 4 questions entre deux malédictions,
  pouvoir non consommé s'il est bloqué. Timer par défaut : 30 s.

Équité ajoutée en v3
- Écritures atomiques (transaction Firestore) et réponses écrites champ par champ :
  plus aucune réponse perdue quand 12 joueurs répondent en même temps.
- Temps de réponse mesuré sur l'appareil du joueur (l'horloge des téléphones ne joue plus).
- Réponses tardives d'une question précédente ignorées.
- En équipe : pouvoirs partagés par équipe, score d'équipe par défaut = moyenne.
