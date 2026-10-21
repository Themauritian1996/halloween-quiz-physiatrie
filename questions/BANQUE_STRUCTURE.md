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

## État Lot 6 (2026-10-20) — 1 020 / 1 200
- **Musique & pop culture : 200 / 200 — TERMINÉE** (200 jouables : 168 texte, 18 audio, 14 image ; médias = 32 questions, 16 %)
  - Sous-thèmes des 180 nouvelles : musique classique macabre — Dies Irae de Berlioz à Sondheim, Danse macabre et sa scordatura, Requiem de Mozart et de Verdi, Paganini/Tartini et le diable, opéra (Don Giovanni, Salomé, Lucia, le Vaisseau fantôme), Giselle et les Wilis (47) ; bandes originales d'horreur — Herrmann, Carpenter, Goblin, Goldsmith, Morricone, Glass, Disasterpeace, l'Apprehension Engine, le célesta de « Hedwig's Theme » (16) ; chansons et tubes pop — Temperton, le solo de Van Halen, Billie Eilish, Kate Bush, les classiques de 1958-66, le procès Freddy de DJ Jazzy Jeff, les Ramones chez Stephen King (43) ; rock, metal et scène — Black Sabbath, Alice Cooper, Dio, Iron Maiden, KISS, Lordi, Ghost, Judas Priest au tribunal (24) ; télévision et spéciaux — Simpson Horror Show, Peanuts/Guaraldi, Addams/Mizzy, Dark Shadows, X-Files, Buffy, le Grinch de Ravenscroft (13) ; jeux vidéo — Yamaoka/Silent Hill, Castlevania, Resident Evil, le hack Halloween d'EarthBound, Doom, Dead Space, Luigi's Mansion (7) ; parcs Disney — Grim Grinning Ghosts, Haunted Mansion Holiday (2) ; comédies musicales — Little Shop, Sweeney Todd, Rocky Horror, Beetlejuice, Meat Loaf/Steinman (8) ; phénomènes pop — Club des 27, « Paul is dead », Dark Side of the Rainbow, Fela Kuti, les deux « Zombie » (10) ; questions média par écoute et par l'image (29)
  - musique-0015 complétée : vrai média audio CC0 (`boite-musique.wav`, mélodie originale synthétisée légèrement désaccordée) et question réécrite — l'ancienne portait sur le clip de « Thriller », déjà couvert par musique-0001 à 0003 ; elle porte désormais sur le mécanisme de la boîte à musique. Plus aucune question « à compléter » dans cette catégorie
  - Doublons inter-catégories évités avec Cinéma & séries : pas de seconde question sur les parcs Universal/Knott's (histoire-0158/0159), Toccata d'orgue traitée sous l'angle de l'orgue de théâtre plutôt que du film de 1940 (cinema-0020), thérémine sous l'angle de Clara Rockmore plutôt que du film de 1951 (cinema-0144) ; la seule paire Musique × Cinéma > 0,40 (0,42) est préexistante au Lot 1 : musique-0007 (le compositeur de « L'Étrange Noël ») vs cinema-0007 (son réalisateur) — deux angles distincts
  - Contrôles automatisés : 200 id uniques et séquentiels, 200 textes de questions uniques, 4 choix distincts par question, correctIndex valide, explication partout ; bonnes réponses des nouvelles réparties exactement 45/45/45/45, aucune bonne réponse répétée plus de 2 fois ; difficultés totales : 94 intermédiaires / 106 difficiles ; contrôle de similarité (Jaccard) : aucune paire interne > 0,40
  - Médias : 24 nouveaux fichiers originaux CC0 (13 WAV synthétisés + 11 SVG) dans app/public/media + media/, crédits dans CREDITS.md ; réutilisations propres des médias des Lots 1-4 (orgue gothique, glas trois coups, tonnerre et pluie, téléviseur rétro, château, citrouille-lanterne). Aucun extrait protégé, aucune mélodie copyrightée reproduite : les audios sont des timbres et motifs originaux (le sifflement et le chœur spectral évoquent un principe, jamais les mélodies de Herrmann ou de Goldsmith)
- Autres catégories : Histoire 200/200 (Lot 2), Cinéma & séries 200/200 (Lot 3), Littérature 200/200 (Lot 4), Science 200/200 (Lot 5) ; traditions inchangée (20, 19 jouables ; 1 audio « à compléter » restante : traditions-0018)
- **Banque globale : 1 020 questions, 1 019 jouables**
- Reste : +180 pour traditions → 1 200

## État Lot 7 — Banque complète (2026-10-20) — 1 200 / 1 200

- **Traditions, bonbons & géographie : 200 / 200 — TERMINÉE** (200 jouables : 170 texte, 26 image, 4 audio ; médias = 30 questions, 15 %)
  - Sous-thèmes des 180 nouvelles : traditions vivantes et fêtes des ancêtres dans le monde — Pologne, Guatemala, Bolivie, Équateur, Philippines, Obon, Chuseok, Vu Lan, Gai Jatra, Famadihana, Púca, Hop-tu-Naa, Castanyada, Fèt Gede (45) ; bonbons, marques, mythes de distribution et pratiques inclusives — Reese, Mars, Haribo, PEZ, candy corn, UNICEF, Teal Pumpkin Project, Beggars' Night, trunk-or-treat, recherches de Joel Best (45) ; citrouilles, records et pratiques nord-américaines — variétés, records Guinness datés et contextualisés, Keene, Half Moon Bay, Pumpkin Smash, squelette géant, enquêtes NRF 2023-2024 (45) ; géographie lugubre — Salem et Proctor's Ledge, Sleepy Hollow, La Nouvelle-Orléans, Catacombes de Paris, Highgate, Sedlec, Poveglia, lieux hantés des Amériques et d'Europe (45)
  - traditions-0018 complétée : vrai média audio CC0 (`gigue-irlandaise.wav`, composition originale synthétisée) et question reformulée autour de la gigue entendue — **plus aucune question « à compléter » dans toute la banque**
  - Contrôles automatisés : 200 id uniques et séquentiels, 200 textes uniques, 4 choix distincts par question, correctIndex valide, explication partout ; bonnes réponses des nouvelles réparties exactement 45/45/45/45 ; difficultés totales : 100 intermédiaires / 100 difficiles ; contrôle de similarité (Jaccard) interne et croisé avec Histoire pour distinguer traditions vivantes, pratiques et géographie des origines historiques
  - Médias : 12 nouveaux fichiers originaux CC0 (10 SVG + 2 WAV synthétisés) dans app/public/media + media/, crédits dans CREDITS.md ; réutilisations propres des médias des Lots 1-6. Aucun hotlink, aucune photo protégée, aucun extrait commercial
- Autres catégories : Histoire 200/200 (Lot 2), Cinéma & séries 200/200 (Lot 3), Littérature 200/200 (Lot 4), Science 200/200 (Lot 5), Musique 200/200 (Lot 6)
- **Banque globale : 1 200 questions, 1 200 jouables — BANQUE COMPLÈTE**
