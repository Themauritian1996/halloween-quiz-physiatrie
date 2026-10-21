# Banque de questions — structure et suivi

Cible : 200 questions / catégorie x 6 = 1 200 questions
Niveau : intermédiaire à difficile uniquement
Médias : 30-40 par catégorie (image ou audio), hébergés dans `/media`, crédit + licence obligatoires, aucun hotlink

| Catégorie | Fichier | Cible | Dont image | Dont audio |
|---|---|---:|---:|---:|
| Histoire & origines | histoire.json | 200 | ~20 | ~10 |
| Cinéma & séries | cinema-series.json | 200 | ~25 | ~15 |
| Littérature, légendes & monstres | litterature.json | 200 | ~20 | ~10 |
| Science, anatomie & médecine macabre | science-medecine.json | 200 | ~20 | ~10 |
| Musique & pop culture | musique-pop.json | 200 | ~15 | ~20 |
| Traditions, bonbons & géographie | traditions.json | 200 | ~25 | ~5 |

## Exemples de types média
- Image : « De quel film culte vient cette affiche (titre masqué) ? », « Quel monstre est représenté sur cette gravure ancienne du domaine public ? »
- Audio : « De quel film d'horreur vient ce thème joué au piano ? », « Quel instrument produit ce son associé aux films de science-fiction des années 50 ? » (thérémine)

## État Lot 1 (2026-10-20) — 120 / 1 200
- 20 questions livrées et vérifiées par catégorie (fichiers JSON ci-dessus, miroir dans `app/src/data/`)
- Par catégorie : 17-18 texte, 1 image réelle (illustration originale CC0), 1-2 audio (réels synthétisés CC0 pour science et musique ; marqués `a-completer` — et exclus du jeu — pour histoire, cinéma, littérature, traditions)
- Reste : +180 questions par catégorie pour atteindre 200/catégorie, médias audio définitifs des questions `a-completer`

## Contrôle qualité par lot
- [ ] Aucun doublon de question / de bonne réponse détournée
- [ ] 4 choix plausibles, 1 seule bonne réponse défendable
- [ ] Explication avec fait vérifiable pour chaque question
- [ ] Média : fichier présent, crédit + licence remplis, alt text rempli
- [ ] Difficulté calibrée : intermédiaire = connu d'un amateur d'Halloween ; difficile = détail précis (année, nom, origine)

## État Lot 2 (2026-10-20) — 300 / 1 200
- **Histoire & origines : 200 / 200 — TERMINÉE** (200 jouables : 167 texte, 21 image, 12 audio ; médias = 33 questions, 16,5 %)
  - Sous-thèmes : Samhain et Celtes (30 nouvelles), Toussaint/christianisation (25), Día de los Muertos — origines (20), Salem et chasses aux sorcières européennes (30), Stingy Jack et lanternes (15), Halloween aux États-Unis XIXe-XXe s. (35), folklores européens des nuits des ancêtres (25) — en plus des 20 du Lot 1
  - histoire-0019 complétée : vrai média audio CC0 (glas) — plus aucune question « à compléter » dans cette catégorie
  - Contrôles automatisés : 200 id uniques, 200 textes de questions uniques, 4 choix distincts par question, correctIndex valide ; bonnes réponses des nouvelles réparties 45/45/45/45 sur les 4 positions ; difficultés totales : 94 intermédiaires / 106 difficiles
  - Médias : fichiers originaux CC0 ajoutés (10 SVG + 5 WAV synthétisés) dans app/public/media + media/, crédits dans CREDITS.md
- Autres catégories : inchangées au Lot 2 (20 chacune, 19-20 jouables ; 4 audio « à compléter » restantes : cinéma-0020, litterature-0019, musique-0015, traditions-0018)
- Reste : +180 par catégorie pour cinéma, littérature, science, musique, traditions → 1 200

## État Lot 3 (2026-10-20) — 480 / 1 200
- **Cinéma & séries : 200 / 200 — TERMINÉE** (200 jouables : 171 texte, 19 image, 10 audio ; médias = 29 questions, 14,5 %)
  - Sous-thèmes des 180 nouvelles : Universal et monstres classiques, Hammer, slashers (Halloween, Vendredi 13, Freddy, Scream, Candyman...), classiques 1960-70 (Hitchcock, Romero, Argento, King adapté), horreur moderne 2000-2020 (Conjuring, Peele, Aster, Eggers, found footage, horreur française et coréenne), cinéma familial Halloween (Addams, Casper, Laika, Burton), séries (Stranger Things, Mercredi, Buffy, X-Files, Supernatural, anthologies...), techniques et effets spéciaux (maquillage, foley, Steadicam, giallo, Code Hays), répliques et slogans cultes
  - cinema-0020 complétée : vrai média audio CC0 (`orgue-mineur.wav`) — plus aucune question « à compléter » dans cette catégorie
  - Contrôles automatisés : 200 id uniques et séquentiels, 200 textes de questions uniques, 4 choix distincts par question, correctIndex valide, explication partout ; bonnes réponses des nouvelles réparties exactement 45/45/45/45 ; difficultés totales : 89 intermédiaires / 111 difficiles ; contrôle de similarité (Jaccard) : aucune reformulation déguisée — la seule paire > 0,45 (0015/0025) porte sur deux faits distincts du même film (origine de Lugosi vs réalisateur)
  - Médias : 10 nouveaux fichiers originaux CC0 (7 SVG cinéma + 3 WAV synthétisés) dans app/public/media + media/, crédits dans CREDITS.md ; réutilisations propres des médias des Lots 1-2 (orgue, glas, thérémine, feu de camp, citrouille-lanterne...)
- Autres catégories : Histoire 200/200 (Lot 2) ; littérature, science, musique, traditions inchangées (20 chacune, 19-20 jouables ; 3 audio « à compléter » restantes : litterature-0019, musique-0015, traditions-0018)
- Reste : +180 par catégorie pour littérature, science, musique, traditions → 1 200

## État Lot 4 (2026-10-20) — 660 / 1 200
- **Littérature, légendes & monstres : 200 / 200 — TERMINÉE** (200 jouables : 171 texte, 19 image, 10 audio ; médias = 29 questions, 14,5 %)
  - Sous-thèmes des 180 nouvelles : Poe et gothique américain (25), gothique anglais et européen — Walpole, Radcliffe, Brontë, Dickens, Wilde, Maupassant, Hoffmann (25), Dracula, Stoker et vampires littéraires — Polidori, Le Fanu, Rice, Matheson, King (25), Frankenstein, Shelley et savants fous (20), Lovecraft et weird fiction (20), ghost stories, M. R. James et maisons hantées en roman (20), Shirley Jackson, King et horreur contemporaine (25), folklore et légendes du monde, contes sombres et poésie macabre — Baba Yaga, banshee, Llorona, Krampus, yōkai, Grimm, Perrault, Villon, Baudelaire (20)
  - litterature-0019 complétée : vrai média audio CC0 (`ambiance-corbeau.wav`, ambiance originale créée pour le quiz) et question réécrite — l'ancienne affirmation (« The Raven », seul poème du recueil) était inexacte ; la question porte désormais sur Lenore. Plus aucune question « à compléter » dans cette catégorie
  - Contrôles automatisés : 200 id uniques et séquentiels, 200 textes de questions uniques, 4 choix distincts par question, correctIndex valide, explication partout ; bonnes réponses des nouvelles réparties exactement 45/45/45/45 ; difficultés totales : 94 intermédiaires / 106 difficiles ; contrôle de similarité (Jaccard) : aucune reformulation déguisée — la seule paire > 0,45 (0016/0031, à 0,45) porte sur deux faits distincts du même récit (chute de la maison vs noms des jumeaux Usher)
  - Médias : 22 nouveaux fichiers originaux CC0 (14 SVG + 8 WAV synthétisés) dans app/public/media + media/, crédits dans CREDITS.md ; réutilisations propres des médias des Lots 1-3 (corbeau, château, maison de Salem, téléviseur rétro, vent nocturne, grincement de porte)
- Autres catégories : Histoire 200/200 (Lot 2), Cinéma & séries 200/200 (Lot 3) ; science, musique, traditions inchangées (20 chacune, 19-20 jouables ; 2 audio « à compléter » restantes : musique-0015, traditions-0018)
- **Banque globale : 660 questions, 658 jouables**
- Reste : +180 par catégorie pour science, musique, traditions → 1 200

## État Lot 5 (2026-10-20) — 840 / 1 200
- **Science, anatomie & médecine macabre : 200 / 200 — TERMINÉE** (200 jouables : 170 texte, 19 image, 11 audio ; médias = 30 questions, 15 %)
  - Sous-thèmes des 180 nouvelles : anatomie et histoire de l'anatomie — Vésale, Galien, Harvey, Padoue, Léonard, Mondino, Rembrandt/Tulp, Gray/Carter, squelette, crâne, colonne, nerfs et muscles (30) ; histoire sombre de la médecine — saignées, trépanation, mercure, éther, Semmelweis, Lister, barbiers-chirurgiens, mumia et cannibalisme médical, laudanum, Moniz (30) ; peste, épidémies et conservation des corps — de Lorme, lazarets, danses macabres, momifications égyptienne/Chinchorro/Guanches, corps des tourbières, Capucins, Morgagni, Yersin/Kitasato (25) ; poisons et toxicologie — arsenic, Marsh, ciguë, strychnine, plomb, mercure, cyanure, amanite, Locusta, Orfila, affaire du parapluie bulgare, Minamata (20) ; galvanisme et débuts des neurosciences — débat Galvani/Volta, Aldini, Duchenne, ECT 1938, défibrillation, contexte scientifique de « Frankenstein » (15) ; physiologie de la peur et sommeil — amygdale, adrénaline, piloérection, atonie REM, hallucinations hypnagogiques, somnambulisme vs terreurs nocturnes, Berger, Aserinsky/Kleitman, Jouvet (25) ; monstres lus par la science, avec prudence — lycanthropie clinique, hypertrichose, porphyries (angles nouveaux, liens folkloriques non prouvés), rage, Cotard, Capgras, décomposition post-mortem, hypothèse tétrodotoxine contestée, Mercy Brown (20) ; squelette/MSK, prothèses et curiosités — main de fer de Götz, Petit Lorrain de Paré, masques Ladd, Gillies/Sidcup, Roehampton, taxidermie, cabinets de curiosités, Hunterian, Mütter (15)
  - Corrections à la relecture croisée : science-0047 reformulée (« mis au point » en 1977, pas « breveté ») ; trois doublons inter-lots remplacés avant intégration — adipocire au lieu d'une seconde question plastination, Fracastoro/« De contagione » au lieu d'une seconde question Mondino, « naturalia » des cabinets au lieu d'une seconde question sur la localisation des Écorchés de Fragonard
  - Contrôles automatisés : 200 id uniques et séquentiels, 200 textes de questions uniques, 4 choix distincts par question, correctIndex valide, explication partout ; bonnes réponses des nouvelles réparties exactement 45/45/45/45 ; difficultés totales : 100 intermédiaires / 100 difficiles ; contrôle de similarité (Jaccard) : aucune reformulation déguisée — la seule paire > 0,42 (0031/0032, à 0,44) porte sur deux faits distincts du même tableau de Rembrandt (le peintre vs l'identité du cadavre)
  - Médias : 17 nouveaux fichiers originaux CC0 (14 SVG + 3 WAV synthétisés) dans app/public/media + media/, crédits dans CREDITS.md ; réutilisations propres des médias des Lots 1-4 (main squelettique, thérémine, glas, battement de cœur, flacon de potion, loup-garou, chuchotements, hurlement de loup, vent nocturne, trois coups de glas)
- Autres catégories : Histoire 200/200 (Lot 2), Cinéma & séries 200/200 (Lot 3), Littérature 200/200 (Lot 4) ; musique et traditions inchangées (20 chacune ; 2 audio « à compléter » restantes : musique-0015, traditions-0018)
- **Banque globale : 840 questions, 838 jouables**
- Reste : +180 par catégorie pour musique et traditions → 1 200
