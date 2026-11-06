from _lib import q, Q

CAT = 'cinema-series'
P = 'cinema-series-'

# ---------- 24 questions média (le média EST la question) ----------
q('i', "Comment s'appelle le clown maléfique de ce film ?", "Pennywise", ["Art le Clown", "Twisty", "Captain Spaulding"],
  "Ça (2017) : Pennywise, le « clown dansant », hante la ville de Derry et réapparaît tous les 27 ans.", m=P+'0001')
q('i', "Quel est le nom de ce vampire du cinéma muet ?", "Le comte Orlok", ["Le comte Dracula", "Lestat de Lioncourt", "Le comte Yorga"],
  "Nosferatu (1922) adaptait Dracula sans autorisation : les noms ont été changés, d'où le comte Orlok joué par Max Schreck.", m=P+'0002')
q('i', "Dans ce film, qu'est-ce qui sert à hypnotiser le héros ?", "Une cuillère dans une tasse de thé", ["Un pendule doré qui oscille", "Une boîte à musique ancienne", "Un métronome sur le piano"],
  "Dans Get Out (2017), Missy plonge Chris dans le « Sunken Place » en faisant tinter sa cuillère contre sa tasse.", m=P+'0005')
q('d', "Dans ce film, que fabrique la mère, qui est artiste ?", "Des maisons et pièces miniatures", ["Des masques mortuaires en cire", "Des marionnettes de bois", "Des poupées de porcelaine"],
  "Dans Hérédité (2018), Annie construit des miniatures qui reproduisent sa propre vie de famille — y compris ses drames.", m=P+'0011')
q('i', "Quel couple d'enquêteurs du paranormal ce film met-il en scène ?", "Ed et Lorraine Warren", ["Fox Mulder et Dana Scully", "Sam et Dean Winchester", "Peter Venkman et Ray Stantz"],
  "Conjuring (2013) s'inspire des dossiers des Warren, démonologues américains bien réels, qui ont aussi « inspiré » Annabelle.", m=P+'0012')
q('i', "Dans ce film, qu'est-ce qui attire les créatures ?", "Le moindre bruit", ["La lumière", "L'odeur du sang", "Le mouvement"],
  "Dans Sans un bruit (2018), les créatures sont aveugles mais ont une ouïe surdéveloppée : la famille communique en langue des signes.", m=P+'0020')
q('i', "Quel est le surnom du tueur masqué de ce film ?", "Ghostface", ["Jigsaw", "Le Croque-mitaine", "Leatherface"],
  "Scream (1996) : le masque de Ghostface s'inspire du Cri d'Edvard Munch.", m=P+'0029')
q('d', "Qui a réalisé ce film ?", "Jordan Peele", ["Ari Aster", "James Wan", "Mike Flanagan"],
  "Us (2019) est le deuxième film de Jordan Peele, après Get Out ; il a ensuite signé Nope (2022).", m=P+'0031')
q('i', "Dans quel pays se déroule ce film ?", "En Suède", ["En Norvège", "En Islande", "En Finlande"],
  "Midsommar (2019) d'Ari Aster se passe pendant la fête du solstice d'une commune suédoise isolée, en plein jour permanent.", m=P+'0036')
q('d', "De quel film de 1968 vient cette image ?", "La Nuit des morts-vivants", ["Rosemary's Baby", "Les Oiseaux", "Carnival of Souls"],
  "George Romero a tourné La Nuit des morts-vivants avec un budget minuscule et a inventé le zombie moderne, lent et cannibale.", m=P+'0041')
q('i', "Quelle actrice reprend ici son rôle de Laurie Strode, 40 ans après le film original ?", "Jamie Lee Curtis", ["Sigourney Weaver", "Neve Campbell", "Linda Hamilton"],
  "Halloween (2018) ignore toutes les suites précédentes : Jamie Lee Curtis y affronte de nouveau Michael Myers.", m=P+'0045')
q('i', "Ce film adapte un jeu vidéo. Où se déroule l'action ?", "Dans une pizzeria remplie d'animatroniques", ["Dans un parc d'attractions abandonné", "Dans un hôpital psychiatrique", "Dans un centre commercial la nuit"],
  "Five Nights at Freddy's (2023) : un gardien de nuit doit survivre à la pizzeria Freddy Fazbear's et à ses robots meurtriers.", m=P+'0051')
q('d', "Comment s'appelle le monde des esprits que visite l'enfant de ce film ?", "Le Lointain (The Further)", ["Le Monde à l'envers", "Les Limbes rouges", "L'Autre Côté"],
  "Dans Insidious (2010), Dalton n'est pas hanté : il est perdu en projection astrale dans « le Lointain ». (Le Monde à l'envers, c'est Stranger Things.)", m=P+'0054')
q('i', "D'où surgit le monstre de ce film ?", "D'un livre pour enfants", ["D'une cassette vidéo", "D'un miroir ancien", "D'un jeu de société"],
  "Mister Babadook (2014) : le monstre sort d'un livre animé dont les pages se réécrivent à chaque lecture.", m=P+'0059')
q('i', "Qu'est-ce que ce personnage ?", "Une poupée robot avec une IA", ["Une poupée possédée", "Le fantôme d'une fillette", "Un clone humain raté"],
  "M3GAN (2023) : un prototype de poupée IA, programmé pour protéger une enfant, interprète sa mission un peu trop littéralement.", m=P+'0061')
q('i', "Dans quelle ville fictive se déroule cette série ?", "Hawkins", ["Derry", "Castle Rock", "Twin Peaks"],
  "Stranger Things se passe à Hawkins, dans l'Indiana des années 1980 ; Derry et Castle Rock sont des villes de Stephen King.", m=P+'0064')
q('i', "Quelle actrice incarne ce personnage dans la série de 2022 ?", "Jenna Ortega", ["Christina Ricci", "Florence Pugh", "Mia Goth"],
  "Jenna Ortega joue Mercredi Addams ; Christina Ricci, la Mercredi des films des années 1990, joue une enseignante dans la série.", m=P+'0067')
q('d', "Quel créateur est derrière cette série d'anthologie ?", "Ryan Murphy", ["Mike Flanagan", "Vince Gilligan", "Jordan Peele"],
  "American Horror Story (2011), créée par Ryan Murphy et Brad Falchuk, change d'histoire à chaque saison avec les mêmes acteurs.", m=P+'0070')
q('i', "Quel jeu d'enfants constitue la toute première épreuve de cette série ?", "1, 2, 3, soleil", ["La marelle", "Les billes", "Le tir à la corde"],
  "Dans Squid Game, la poupée géante « Young-hee » surveille le jeu 1, 2, 3, soleil : bouger après le chant est éliminatoire.", m=P+'0072')
q('i', "De quel film vient ce thème au piano ?", "Halloween (1978)", ["Vendredi 13", "Les Griffes de la nuit", "L'Exorciste"],
  "John Carpenter a composé lui-même le thème d'Halloween, en mesure 5/4 inhabituelle, ce qui le rend si déstabilisant.", m=P+'0080')
q('i', "Dans cette série, qu'est-ce qui transforme les humains en monstres ?", "Un champignon parasite", ["Un virus de la rage modifié", "Des radiations", "Un parasite extraterrestre"],
  "The Last of Us (2023) s'inspire du vrai Ophiocordyceps, qui « zombifie » les fourmis.", m=P+'0081')
q('i', "Ce thème au synthétiseur ouvre quelle série ?", "Stranger Things", ["Dark", "Black Mirror", "The OA"],
  "Le générique de Stranger Things est signé Kyle Dixon et Michael Stein, du groupe S U R V I V E, sur synthétiseurs analogiques.", m=P+'0086')
q('i', "Comment s'appelle l'ancien shérif adjoint, héros de cette série ?", "Rick Grimes", ["Daryl Dixon", "Negan", "Glenn Rhee"],
  "The Walking Dead (2010-2022) commence quand Rick Grimes se réveille du coma dans un monde envahi de rôdeurs.", m=P+'0094')
q('d', "Qui a créé cette série pour Netflix ?", "Mike Flanagan", ["Ryan Murphy", "Les frères Duffer", "Jordan Peele"],
  "The Haunting of Hill House (2018) de Mike Flanagan est célèbre pour ses fantômes cachés en arrière-plan de nombreux plans.", m=P+'0100')

# ---------- 8 clins d'œil physiatrie ----------
q('i', "Dans Saw (2004), quelle partie de son corps le Dr Gordon tranche-t-il pour se libérer de sa chaîne ?", "Son pied", ["Sa main", "Son avant-bras", "Sa jambe au genou"],
  "Enchaîné par la cheville, il se scie le pied : une amputation trans-tibiale « artisanale » qui mériterait un bon suivi en prothétique.", p=True)
q('i', "Dans le film Misery (1990), que fait Annie Wilkes pour empêcher l'écrivain de fuir ?", "Elle lui brise les chevilles à la masse", ["Elle lui coupe les tendons d'Achille", "Elle lui retire son fauteuil roulant", "Elle lui plâtre les deux jambes"],
  "La scène du « hobbling » : Paul Sheldon, déjà convalescent de fractures, se fait fracasser les chevilles. Dans le roman, c'est encore pire.", p=True)
q('d', "Dans Frankenstein (1931), qu'est-ce qui donne au monstre sa démarche raide si célèbre ?", "Des attelles et des bottes lestées", ["Une arthrose réelle de l'acteur", "Des câbles tirés en coulisse", "Un tournage image par image"],
  "Boris Karloff portait des renforts aux jambes et de lourdes bottes : une démarche en extension de genoux, sans flexion, vite épuisante.", p=True)
q('i', "Dans Planet Terror (2007), par quoi Cherry remplace-t-elle sa jambe amputée ?", "Par une mitrailleuse", ["Par une épée", "Par une tronçonneuse", "Par une jambe de bois sculptée"],
  "Après une attaque de zombies, la jambe de Cherry devient une mitrailleuse — l'emboîture la plus irréaliste du cinéma.", p=True)
q('i', "Dans la saga Evil Dead, par quoi Ash remplace-t-il sa main coupée ?", "Par une tronçonneuse", ["Par un crochet de pirate", "Par une main mécanique", "Par un fusil à canon scié"],
  "Ash se coupe la main possédée puis y fixe une tronçonneuse — prothèse « activité spécifique » par excellence.", p=True)
q('i', "Dans Incassable (2000), de quelle maladie souffre Elijah Price, alias M. Glass ?", "L'ostéogenèse imparfaite", ["L'hémophilie sévère", "L'ostéoporose précoce", "La myasthénie grave"],
  "Elijah se fracture au moindre choc : l'ostéogenèse imparfaite est un défaut du collagène de type I.", p=True)
q('i', "Dans Fenêtre sur cour (1954) d'Hitchcock, pourquoi le héros espionne-t-il ses voisins ?", "Il est immobilisé avec une jambe dans le plâtre", ["Il est aveugle et écoute à travers le mur", "Il est en convalescence d'une pneumonie", "Il est assigné à résidence par la police"],
  "Le photographe joué par James Stewart, en fauteuil roulant avec un plâtre jusqu'à la hanche, s'occupe en observant la cour… et un possible meurtre.", p=True)
q('d', "Dans le slasher Hush (2016), quelle particularité a l'héroïne traquée par un tueur ?", "Elle est sourde et muette", ["Elle est aveugle", "Elle se déplace en fauteuil roulant", "Elle est amnésique"],
  "Maddie, écrivaine sourde depuis une méningite à 13 ans, doit déjouer un tueur qu'elle ne peut pas entendre arriver.", p=True)

# ---------- 48 questions texte ----------
q('i', "Dans Psychose (1960), où se déroule la célèbre scène du meurtre ?", "Sous la douche", ["Dans un ascenseur", "Dans la cave", "Dans une cabine téléphonique"],
  "La scène de la douche dure environ 3 minutes à l'écran mais a demandé une semaine de tournage et près de 80 plans.")
q('i', "Quel tueur porte un gant muni de lames dans Les Griffes de la nuit ?", "Freddy Krueger", ["Jason Voorhees", "Michael Myers", "Chucky"],
  "Freddy attaque ses victimes dans leurs rêves ; Wes Craven lui a donné un pull rayé rouge et vert, deux couleurs qui « jurent » à l'œil.")
q('d', "Dans le premier Vendredi 13 (1980), qui est le tueur ?", "La mère de Jason", ["Jason lui-même", "Le cuisinier du camp", "Le shérif local"],
  "Jason n'apparaît qu'à la toute fin : c'est sa mère qui tue les moniteurs pour le venger.")
q('i', "Quel objet Jason Voorhees porte-t-il sur le visage à partir du troisième Vendredi 13 ?", "Un masque de hockey", ["Un sac de toile", "Un masque de soudeur", "Un masque à gaz"],
  "Dans le deuxième film, il porte un sac ; le masque de gardien de but apparaît dans Meurtres en 3 dimensions (1982).")
q('d', "Dans Halloween (1978), quel masque l'équipe a-t-elle modifié pour créer celui de Michael Myers ?", "Un masque du capitaine Kirk", ["Un masque de Ronald Reagan", "Un masque d'Elvis Presley", "Un masque de Frankenstein"],
  "Faute de budget, le masque de William Shatner a été peint en blanc et ses yeux élargis.")
q('i', "Dans Shining (1980), comment s'appelle l'hôtel isolé ?", "L'Overlook", ["Le Bates Motel", "Le Grand Budapest", "L'hôtel Cortez"],
  "Jack Torrance en devient le gardien d'hiver ; l'hôtel Cortez est celui d'American Horror Story : Hotel.")
q('i', "Quel mot le petit Danny répète-t-il dans Shining ?", "« Redrum »", ["« Nevermore »", "« Here's Johnny »", "« Ils sont là »"],
  "Lu dans un miroir, redrum devient murder (« meurtre »). « Here's Johnny! » est la réplique de son père.")
q('i', "Quelle est la réplique culte du petit Cole dans Sixième Sens (1999) ?", "« Je vois des gens qui sont morts »", ["« Ils sont là »", "« Tout le monde flotte »", "« Tu veux jouer à un jeu ? »"],
  "Le film de M. Night Shyamalan est resté célèbre pour son retournement final.")
q('i', "Dans quel film une fillette annonce-t-elle « Ils sont là ! » devant une télévision ?", "Poltergeist (1982)", ["Le Cercle (The Ring)", "Paranormal Activity", "L'Exorciste"],
  "Carol Anne parle aux esprits à travers la neige de l'écran ; le film est coécrit et produit par Steven Spielberg.")
q('i', "Dans Le Cercle (The Ring, 2002), combien de jours reste-t-il à vivre après avoir vu la cassette maudite ?", "7 jours", ["3 jours", "13 jours", "1 jour"],
  "Le téléphone sonne, une voix murmure « sept jours »… C'est le remake américain du japonais Ring (1998).")
q('i', "Quelle poupée tueuse abrite l'âme du tueur en série Charles Lee Ray ?", "Chucky", ["Annabelle", "Brahms", "Billy"],
  "Dans Jeu d'enfant (1988), le tueur transfère son âme dans une poupée « Good Guy » par un rituel vaudou.")
q('d', "Dans la saga Saw, comment s'appelle la marionnette sur tricycle ?", "Billy", ["Slappy", "Brahms", "Hugo"],
  "Jigsaw utilise Billy pour délivrer ses messages ; Slappy est le pantin de Chair de poule.")
q('d', "Qui a réalisé L'Étrange Noël de monsieur Jack (1993) ?", "Henry Selick", ["Tim Burton", "Guillermo del Toro", "Wes Anderson"],
  "Piège classique : Tim Burton a imaginé et produit le film, mais c'est Henry Selick qui l'a réalisé (comme, plus tard, Coraline).")
q('i', "Combien de fois faut-il prononcer le nom de Beetlejuice pour l'invoquer ?", "3 fois", ["5 fois", "7 fois", "13 fois"],
  "Beetlejuice (1988) puis Beetlejuice Beetlejuice (2024), toujours avec Michael Keaton dans le rôle du « bio-exorciste ».")
q('i', "Dans Hocus Pocus (1993), combien de sœurs Sanderson reviennent d'entre les morts ?", "3", ["2", "4", "5"],
  "Winifred, Mary et Sarah, jouées par Bette Midler, Kathy Najimy et Sarah Jessica Parker.")
q('i', "Quelle forme prend le monstre géant final de SOS Fantômes (1984) ?", "Un bonhomme en guimauve", ["Un dragon de fumée", "Une araignée géante", "La statue de la Liberté"],
  "Ray pense malgré lui au « Stay Puft Marshmallow Man », et le destructeur Gozer prend cette forme.")
q('i', "Dans Gremlins (1984), que ne faut-il surtout jamais faire avec un mogwai ?", "Le nourrir après minuit", ["Le caresser à rebrousse-poil", "Lui chanter une chanson", "Le laisser seul la nuit"],
  "Les trois règles : pas de lumière vive, pas d'eau, et jamais de nourriture après minuit.")
q('i', "Comment s'appelle la jeune fille possédée de L'Exorciste (1973) ?", "Regan", ["Carrie", "Samara", "Wednesday"],
  "Regan MacNeil, 12 ans, possédée par le démon Pazuzu ; le film a été le premier film d'horreur nommé à l'Oscar du meilleur film.")
q('i', "Dans La Malédiction (1976), comment s'appelle l'enfant qui serait l'Antéchrist ?", "Damien", ["Danny", "Cole", "Kevin"],
  "Damien Thorn porte la marque 666 sous ses cheveux.")
q('i', "Dans Carrie (1976), qu'est-ce qui tombe sur l'héroïne lors du bal de fin d'année ?", "Un seau de sang de porc", ["Un seau de peinture rouge", "Des plumes et du goudron", "De l'eau glacée"],
  "L'humiliation déclenche sa colère télékinésique. C'est l'adaptation du tout premier roman de Stephen King.")
q('d', "Avec quoi Hannibal Lecter dit-il avoir dégusté le foie d'un recenseur ?", "Des fèves et un bon chianti", ["Des frites et une bière", "Des champignons et un porto", "Du pain et un bordeaux"],
  "La réplique du Silence des agneaux (1991), suivie du célèbre bruit de succion d'Anthony Hopkins.")
q('d', "Dans Alien (1979), comment appelle-t-on la créature qui s'agrippe au visage de ses victimes ?", "Le facehugger", ["Le chestburster", "La reine xénomorphe", "Le Predator"],
  "Le facehugger pond l'embryon ; le chestburster jaillit ensuite de la poitrine dans la scène du repas.")
q('i', "Quel compositeur a créé le thème à deux notes des Dents de la mer (1975) ?", "John Williams", ["Hans Zimmer", "Danny Elfman", "Ennio Morricone"],
  "Deux notes alternées de plus en plus rapides suffisent à annoncer le requin, souvent invisible à l'écran.")
q('i', "Quel procédé de tournage a rendu célèbre Le Projet Blair Witch (1999) ?", "Le found footage", ["La 3D relief", "Le plan-séquence unique", "Le noir et blanc granuleux"],
  "Présenté comme les bandes d'étudiants disparus, le film a coûté environ 60 000 $ et rapporté près de 250 millions.")
q('i', "Dans Coraline (2009), qu'ont l'Autre Mère et les habitants de l'autre monde à la place des yeux ?", "Des boutons", ["Des billes de verre", "Des pièces de monnaie", "Des trous noirs"],
  "L'Autre Mère veut coudre des boutons sur les yeux de Coraline pour la garder à jamais.")
q('d', "Quel studio d'animation a réalisé Coraline et L'Étrange Pouvoir de Norman ?", "Laika", ["Pixar", "Aardman", "DreamWorks"],
  "Laika, studio de l'Oregon, est spécialisé dans l'animation en volume (stop-motion).")
q('i', "Dans Scream, quelle question le tueur pose-t-il au téléphone ?", "« Quel est ton film d'horreur préféré ? »", ["« Tu veux jouer à un jeu ? »", "« Tu as vérifié les enfants ? »", "« Qui est là ? »"],
  "« Do you like scary movies? » : Scream joue sans cesse avec les codes du genre.")
q('i', "Dans la saga Destination finale, qui est le véritable « tueur » ?", "La Mort elle-même", ["Un fantôme vengeur", "Un professeur déguisé", "Un démon invoqué"],
  "Les survivants d'un accident évité sont rattrapés un à un par la Mort, au moyen d'accidents absurdes.")
q('i', "Dans le film Smile (2022), quel signe annonce que la malédiction vous a choisi ?", "Des gens qui vous sourient", ["Des gens qui pleurent du sang", "Des rires dans le noir", "Des saignements de nez"],
  "La malédiction se transmet à un témoin, qui voit ensuite des gens lui sourire de façon terrifiante.")
q('d', "Dans Nope (2022) de Jordan Peele, que cache le nuage immobile au-dessus du ranch ?", "Une créature volante prédatrice", ["Un vaisseau extraterrestre habité", "Un dieu ancien", "Une tornade surnaturelle"],
  "Ce qu'on prend pour une soucoupe est un animal qui dévore tout ce qui le regarde dans les yeux.")
q('d', "Dans Talk to Me (2023), quel objet permet de laisser un esprit entrer en soi ?", "Une main embaumée", ["Une planche Ouija", "Un vieux téléphone", "Un miroir brisé"],
  "Des ados australiens se filment en train de serrer la main… et de dire « je te laisse entrer ».")
q('i', "Comment s'appelle le clown tueur de la saga Terrifier ?", "Art le Clown", ["Pennywise", "Twisty", "Krusty"],
  "Art, muet et en noir et blanc, est devenu une icône du gore indépendant ; Twisty est le clown d'American Horror Story.")
q('i', "Dans la saison 4 de Stranger Things, comment s'appelle le grand méchant ?", "Vecna", ["Le Démogorgon", "Le Flagelleur mental", "Le Démodog"],
  "Vecna, alias Henry Creel (le numéro 001), tue ses victimes après les avoir maudites par leurs souvenirs.")
q('i', "Quelle gourmandise Eleven adore-t-elle dans Stranger Things ?", "Les gaufres Eggo", ["Les beignets", "Les crêpes au sirop", "La crème glacée"],
  "La série a fait remonter les ventes des gaufres Eggo, qui ont même fait une publicité rétro.")
q('i', "Comment s'appellent les deux frères chasseurs de démons de Supernatural ?", "Sam et Dean Winchester", ["Stefan et Damon Salvatore", "Fox et Bill Mulder", "Peter et Ray Venkman"],
  "Supernatural a duré 15 saisons (2005-2020) ; les Salvatore sont les vampires de Vampire Diaries.")
q('i', "Dans quelle ville californienne fictive vit Buffy, la tueuse de vampires ?", "Sunnydale", ["Mystic Falls", "Hawkins", "Forks"],
  "Sunnydale est construite sur la Bouche de l'Enfer ; Forks est la ville de Twilight.")
q('i', "Que fait la peau d'Edward Cullen au soleil, dans Twilight ?", "Elle scintille comme du diamant", ["Elle brûle instantanément", "Elle devient transparente", "Elle se couvre de cendres"],
  "Une entorse célèbre aux règles des vampires classiques, qui craignent mortellement le soleil.")
q('i', "Quel acteur a incarné Dracula dans le film Universal de 1931 ?", "Bela Lugosi", ["Christopher Lee", "Boris Karloff", "Lon Chaney"],
  "Lugosi a été enterré avec sa cape ; Christopher Lee a été le Dracula des films de la Hammer à partir de 1958.")
q('i', "Dans Rosemary's Baby (1968), qui est le père de l'enfant ?", "Le Diable", ["Le voisin âgé", "Le médecin de famille", "Un ange déchu repenti"],
  "Rosemary découvre que ses voisins appartiennent à une secte satanique, de mèche avec son mari.")
q('d', "Dans Shaun of the Dead (2004), où les héros décident-ils de se réfugier ?", "Au pub, le Winchester", ["Au supermarché", "À l'église du quartier", "Dans un cinéma"],
  "Le plan de Shaun : « prendre une bonne pinte au Winchester et attendre que tout ça se tasse ».")
q('d', "Dans Bienvenue à Zombieland (2009), quelle est la règle n° 1 pour survivre ?", "Le cardio", ["Toujours viser la tête deux fois", "Attacher sa ceinture", "Ne jamais jouer les héros"],
  "Les gros sont les premiers rattrapés : règle n° 1, le cardio. La n° 2 est le « double tap ».")
q('i', "Dans quel pays se déroule Dernier Train pour Busan (2016) ?", "En Corée du Sud", ["Au Japon", "En Chine", "À Taïwan"],
  "Une épidémie zombie éclate à bord d'un TGV Séoul-Busan.")
q('d', "Dans Le Labyrinthe de Pan (2006), où l'Homme pâle a-t-il les yeux ?", "Dans ses paumes", ["Sur son front", "Sur ses genoux", "Il n'en a aucun"],
  "Pour voir, il pose ses yeux dans ses paumes et les lève devant son visage.")
q('i', "Quel acteur incarne Ichabod Crane dans Sleepy Hollow (1999) de Tim Burton ?", "Johnny Depp", ["Christopher Walken", "Christian Bale", "Jude Law"],
  "Christopher Walken joue le Cavalier sans tête, avec des dents limées.")
q('i', "Comment s'appelle l'école que fréquente Mercredi Addams dans la série de 2022 ?", "Nevermore", ["Poudlard", "Shermer High", "Sunnydale High"],
  "Nevermore Academy, école pour « parias », doit son nom au poème Le Corbeau d'Edgar Allan Poe.")
q('d', "De quel type de poupée est la vraie Annabelle, conservée par les Warren ?", "Une poupée de chiffon", ["Une poupée de porcelaine", "Une poupée Barbie", "Une marionnette de bois"],
  "Le film l'a remplacée par une poupée de porcelaine bien plus effrayante.")
q('i', "Quelle actrice joue dans The Substance (2024), film d'horreur corporelle primé à Cannes ?", "Demi Moore", ["Nicole Kidman", "Sharon Stone", "Michelle Pfeiffer"],
  "Le film de Coralie Fargeat a valu à Demi Moore un Golden Globe en 2025.")
q('d', "Quel réalisateur a signé le remake de Nosferatu sorti à Noël 2024 ?", "Robert Eggers", ["Ari Aster", "Guillermo del Toro", "Jordan Peele"],
  "Robert Eggers (The Witch, The Lighthouse) y dirige Bill Skarsgård en comte Orlok.")
