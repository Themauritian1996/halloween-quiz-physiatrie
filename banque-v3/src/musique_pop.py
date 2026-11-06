from _lib import q, Q

CAT = 'musique-pop'
P = 'musique-pop-'

# ---------- 24 questions média (surtout audio) ----------
q('i', "Quel tube reconnaît-on ?", "Thriller — Michael Jackson", ["Bad — Michael Jackson", "Beat It — Michael Jackson", "Smooth Criminal — Michael Jackson"],
  "Thriller (1982) et son clip-court-métrage de 14 minutes réalisé par John Landis.", m=P+'0001')
q('i', "Quel film d'horreur a rendu célèbre ce morceau ?", "L'Exorciste", ["Halloween", "Rosemary's Baby", "Shining"],
  "C'est Tubular Bells (1973) de Mike Oldfield, utilisé dans L'Exorciste ; l'album a lancé le label Virgin.", m=P+'0007')
q('i', "De quel film vient cette chanson ?", "SOS Fantômes (Ghostbusters)", ["Gremlins", "Beetlejuice", "Retour vers le futur"],
  "Ray Parker Jr. l'a écrite en quelques jours en 1984 ; « Who you gonna call? »", m=P+'0008')
q('d', "Quelle superstar chante le refrain de ce titre de Rockwell (1984) ?", "Michael Jackson", ["Prince", "Stevie Wonder", "Lionel Richie"],
  "Somebody's Watching Me : Rockwell, fils du patron de la Motown, y raconte sa paranoïa ; Michael Jackson chante le refrain.", m=P+'0016')
q('i', "Dans quelle série ce morceau de 1985 a-t-il sauvé un personnage d'un monstre ?", "Stranger Things", ["Dark", "Euphoria", "Mercredi"],
  "Running Up That Hill de Kate Bush protège Max de Vecna (saison 4) et revient au sommet des palmarès en 2022.", m=P+'0023')
q('i', "Qui a composé ce morceau pour orgue, devenu le cliché musical du vampire ?", "Jean-Sébastien Bach", ["Wolfgang Amadeus Mozart", "Antonio Vivaldi", "Georg Friedrich Haendel"],
  "La Toccata et fugue en ré mineur, souvent attribuée à Bach (son authenticité est discutée par certains musicologues).", m=P+'0028')
q('i', "Quelle chanteuse interprète ce titre ?", "Rihanna", ["Beyoncé", "Lady Gaga", "Katy Perry"],
  "Disturbia (2008) : son clip au décor de cellule et de chambre de torture en a fait un classique des listes d'Halloween.", m=P+'0032')
q('i', "De quelle série vient ce thème ?", "Squid Game", ["Alice in Borderland", "Sweet Home", "All of Us Are Dead"],
  "Pink Soldiers, de Jung Jae-il, accompagne les gardes en combinaison rose.", m=P+'0036')
q('d', "Qui a composé cette danse de squelettes jouée au violon et au xylophone ?", "Camille Saint-Saëns", ["Franz Liszt", "Hector Berlioz", "Modeste Moussorgski"],
  "La Danse macabre (1874) : la Mort accorde son violon à minuit et le xylophone imite le claquement des os.", m=P+'0037')
q('i', "Quelle artiste chante ce titre, écrit du point de vue du monstre caché sous son lit ?", "Billie Eilish", ["Lorde", "Olivia Rodrigo", "Halsey"],
  "bury a friend (2019), coécrit avec son frère Finneas, sur l'album When We All Fall Asleep, Where Do We Go?", m=P+'0040')
q('i', "Qui chante ce titre de 2011, redevenu viral sur TikTok en 2022 ?", "Lady Gaga", ["Madonna", "Dua Lipa", "Taylor Swift"],
  "Bloody Mary, de l'album Born This Way, a été accélérée et associée par les internautes à la danse de Mercredi.", m=P+'0043')
q('d', "Quelle chanteuse reprend ici le standard Season of the Witch ?", "Lana Del Rey", ["Florence Welch", "Lorde", "Adele"],
  "Pour le film Histoires effrayantes à raconter dans le noir (2019), produit par Guillermo del Toro. L'original est de Donovan (1966).", m=P+'0044')
q('i', "De quel film d'animation vient cette chanson ?", "L'Étrange Noël de monsieur Jack", ["Coraline", "Les Noces funèbres", "Frankenweenie"],
  "This Is Halloween ouvre le film : les habitants de la ville d'Halloween se présentent en chanson.", m=P+'0046')
q('d', "Quel est cet instrument électronique, star des musiques de films de science-fiction ?", "Le thérémine", ["Les ondes Martenot", "Le synthétiseur Moog", "L'harmonica de verre"],
  "Inventé en 1920 par Léon Theremin, on en joue sans le toucher, en bougeant les mains près de deux antennes.", m=P+'0047')
q('i', "Quel groupe joue ce morceau, entendu dans un épisode culte de Stranger Things ?", "Metallica", ["Iron Maiden", "Megadeth", "Slayer"],
  "Master of Puppets (1986) : Eddie Munson le joue sur le toit de la caravane, dans le Monde à l'envers.", m=P+'0051')
q('i', "Quel titre reconnaît-on ?", "Spooky, Scary Skeletons", ["Monster Mash", "Dem Bones", "The Addams Family Theme"],
  "La chanson d'Andrew Gold (1996) est devenue un mème grâce aux vidéos de squelettes dansants.", m=P+'0052')
q('d', "Quel groupe new-yorkais joue ce titre (2009) au clip de loup-garou danseur ?", "Yeah Yeah Yeahs", ["The Strokes", "Arctic Monkeys", "The Killers"],
  "Heads Will Roll : « Off with your head, dance 'til you're dead ».", m=P+'0058')
q('d', "Quel groupe avait créé l'original de cette reprise inquiétante ?", "Eurythmics", ["Depeche Mode", "Duran Duran", "Tears for Fears"],
  "Sweet Dreams (1983) d'Annie Lennox et Dave Stewart, transformé en cauchemar industriel par Marilyn Manson en 1995.", m=P+'0064')
q('d', "Quelle œuvre de musique classique accompagne cette vidéo ?", "Dans l'antre du roi de la montagne (Grieg)", ["Une nuit sur le mont Chauve (Moussorgski)", "Le Boléro (Ravel)", "La Marche funèbre (Chopin)"],
  "Extrait de Peer Gynt (1875) : la musique accélère à mesure que les trolls pourchassent Peer.", m=P+'0080')
q('d', "Quel compositeur, fidèle complice de Tim Burton, signe ce générique ?", "Danny Elfman", ["Hans Zimmer", "John Williams", "Howard Shore"],
  "Danny Elfman a composé le thème de Mercredi (2022), après ceux de Beetlejuice et de L'Étrange Noël de monsieur Jack.", m=P+'0088')
q('d', "Qui est l'interprète original de cette chanson ?", "Screamin' Jay Hawkins", ["Nina Simone", "Ray Charles", "Chuck Berry"],
  "I Put a Spell on You (1956) : arrivé ivre en studio, Hawkins en a fait un rituel hurlé. Nina Simone en a fait une reprise célèbre en 1965.", m=P+'0093')
q('i', "Quel groupe joue ce titre ?", "Imagine Dragons", ["OneRepublic", "Coldplay", "Twenty One Pilots"],
  "Demons (2013) parle des démons intérieurs qu'on cache à ceux qu'on aime.", m=P+'0098')
q('i', "Quelle chanteuse chante ce titre de 2023 sur un ex « vampire » ?", "Olivia Rodrigo", ["Billie Eilish", "Sabrina Carpenter", "Taylor Swift"],
  "vampire (2023) compare un ex manipulateur à un vampire qui l'a « saignée à blanc ».", m=P+'0099')
q('i', "Grâce à quoi ce titre punk de 1981 est-il devenu viral en 2022 ?", "Une scène de la série Mercredi", ["Un défi Fortnite", "Une publicité de parfum", "Une scène de Stranger Things"],
  "Goo Goo Muck des Cramps : c'est la vraie musique de la scène du bal, même si TikTok l'a souvent remplacée par Bloody Mary.", m=P+'0100')

# ---------- 8 clins d'œil physiatrie ----------
q('i', "Le « Prince des Ténèbres » Ozzy Osbourne a révélé en 2020 être atteint de quelle maladie ?", "La maladie de Parkinson", ["La sclérose en plaques", "La maladie d'Alzheimer", "La sclérose latérale amyotrophique"],
  "Ozzy a donné son dernier concert avec Black Sabbath en juillet 2025, assis sur un trône, peu avant son décès.", p=True)
q('i', "Quelle vieille chanson, chantée à Halloween, énumère les os reliés les uns aux autres ?", "Dem Bones (Dry Bones)", ["Spooky, Scary Skeletons", "Monster Mash", "Thriller"],
  "« The toe bone connected to the foot bone… » : une leçon d'anatomie… approximative.", p=True)
q('d', "Dans la chanson Dem Bones, à quel os l'os de la hanche (« hip bone ») est-il relié ?", "À l'os de la cuisse", ["À l'os du dos", "À l'os du genou", "À l'os de l'épaule"],
  "« The hip bone connected to the thigh bone » : articulation coxo-fémorale validée.", p=True)
q('d', "Dans le jeu vidéo d'horreur Dead Space, comment vient-on à bout des nécromorphes ?", "En tranchant leurs membres", ["En visant la tête", "En visant le cœur", "En les brûlant au lance-flammes"],
  "Le « démembrement stratégique » : viser la tête ne sert à rien. Un cauchemar pour la clinique d'amputés.", p=True)
q('i', "Billie Eilish, icône de l'esthétique sombre, a parlé publiquement de quel trouble neurologique ?", "Le syndrome de Gilles de la Tourette", ["L'épilepsie", "La sclérose en plaques", "La migraine hémiplégique"],
  "Elle a expliqué vivre avec des tics depuis l'enfance, pour briser les préjugés.", p=True)
q('i', "Lady Gaga, interprète de Bloody Mary, a révélé souffrir de quel syndrome de douleur chronique ?", "La fibromyalgie", ["La polyarthrite rhumatoïde", "La spondylarthrite ankylosante", "Le lupus"],
  "Elle en parle dans le documentaire Gaga: Five Foot Two (2017) — un grand classique des cliniques de douleur.", p=True)
q('d', "Comment Michael Jackson réalisait-il sa célèbre inclinaison à 45° sur scène ?", "Avec des chaussures spéciales", ["Avec des câbles invisibles", "Grâce à la force de ses mollets", "Avec un harnais dans le dos"],
  "Brevet de 1993 : une encoche au talon s'emboîtait dans une cheville du plancher. Les neurochirurgiens ont écrit sur les risques de l'imiter… pour la colonne.", p=True)
q('i', "Dans la série Mercredi, comment La Chose, une main vivante, communique-t-elle ?", "En langue des signes", ["En morse", "En écrivant sur ses paumes", "Par télépathie"],
  "La Chose « parle » avec ses doigts ; Mercredi traduit. Une main sans poignet ni bras : un beau défi d'ergothérapie.", p=True)

# ---------- 48 questions texte ----------
q('d', "Qui a enregistré Monster Mash, le tube d'Halloween de 1962 ?", "Bobby « Boris » Pickett", ["Elvis Presley", "Chuck Berry", "Buddy Holly"],
  "Il y imite la voix de Boris Karloff ; le titre est revenu dans les palmarès en 1973.")
q('i', "Quel acteur d'horreur prête sa voix et son rire inquiétant à la fin de Thriller ?", "Vincent Price", ["Christopher Lee", "Boris Karloff", "Bela Lugosi"],
  "Son monologue parlé et son rire final sont devenus aussi célèbres que la chorégraphie des zombies.")
q('i', "Combien de temps dure environ le clip de Thriller ?", "14 minutes", ["4 minutes", "7 minutes", "30 minutes"],
  "Un vrai court-métrage, premier clip ajouté au National Film Registry américain.")
q('d', "Qui a réalisé le clip de Thriller ?", "John Landis", ["Steven Spielberg", "John Carpenter", "Tim Burton"],
  "Michael Jackson l'a choisi pour Le Loup-garou de Londres (1981), d'où la transformation au début du clip.")
q('d', "Quel membre de Kiss, maquillé en démon, crache du « sang » sur scène ?", "Gene Simmons", ["Paul Stanley", "Ace Frehley", "Peter Criss"],
  "« The Demon » crache aussi du feu et tire une langue démesurée.")
q('i', "Qu'a fait Ozzy Osbourne de façon tristement célèbre en concert, en 1982 ?", "Il a mordu la tête d'une chauve-souris", ["Il a avalé un serpent vivant", "Il a mis le feu à sa guitare", "Il s'est fait enterrer vivant"],
  "Il croyait que la chauve-souris lancée par un fan était en caoutchouc ; il a dû recevoir des vaccins contre la rage.")
q('i', "Quel chanteur est surnommé « le Prince des Ténèbres » ?", "Ozzy Osbourne", ["Alice Cooper", "Marilyn Manson", "Rob Zombie"],
  "Le chanteur de Black Sabbath, pionnier du heavy metal.")
q('d', "Avant de réaliser des films d'horreur, quel groupe Rob Zombie menait-il ?", "White Zombie", ["Black Sabbath", "Slipknot", "The Misfits"],
  "Son groupe tire son nom d'un film de 1932 avec Bela Lugosi.")
q('d', "Quel costume porte le chanteur du groupe suédois Ghost ?", "Celui d'un pape-squelette", ["Celui d'un pharaon momifié", "Celui d'un vampire victorien", "Celui d'un médecin de peste"],
  "Tobias Forge a incarné plusieurs « Papa Emeritus », puis le Cardinal Copia et Papa V Perpetua.")
q('i', "Quel DJ porte une immense tête de souris lumineuse ?", "deadmau5", ["Marshmello", "Skrillex", "Daft Punk"],
  "Joel Zimmerman a fait de son casque de souris un logo ; Marshmello porte un casque de guimauve.")
q('d', "Combien de membres masqués comptait le groupe Slipknot à ses débuts ?", "9", ["4", "6", "12"],
  "Chaque membre porte un numéro de 0 à 8 et un masque différent.")
q('d', "Comment s'appelle l'événement annuel d'Halloween du jeu Fortnite ?", "Fortnitemares", ["Spooky Royale", "Halloween Havoc", "Night of Fright"],
  "Depuis 2017, avec des zombies, des citrouilles lance-roquettes et des skins d'horreur.")
q('i', "Dans les jeux Super Mario, comment s'appellent les fantômes qui se cachent quand on les regarde ?", "Les Boo", ["Les Goomba", "Les Bloups", "Les Maskass"],
  "Ils couvrent leur visage quand Mario les fixe et avancent quand il tourne le dos.")
q('i', "Combien de fantômes poursuivent Pac-Man dans le jeu original ?", "4", ["3", "5", "6"],
  "Blinky, Pinky, Inky et Clyde, chacun avec sa propre stratégie de poursuite.")
q('d', "Quel fantôme rouge de Pac-Man poursuit le joueur le plus directement ?", "Blinky", ["Pinky", "Inky", "Clyde"],
  "Blinky cible la case de Pac-Man ; Pinky tente de lui couper la route.")
q('i', "Dans Luigi's Mansion, avec quoi Luigi capture-t-il les fantômes ?", "Un aspirateur", ["Un filet à papillons", "Une lampe magique", "Un piège à fantômes"],
  "Un aspirateur à fantômes conçu par un vieux professeur farfelu ; Luigi y aspire aussi les pièces d'or.")
q('i', "De quel type est le Pokémon Ectoplasma (Gengar) ?", "Spectre et Poison", ["Ténèbres et Psy", "Psy seulement", "Spectre et Ténèbres"],
  "Il se cacherait dans les ombres pour voler la chaleur de ses proies.")
q('i', "Dans quelle ville fictive se déroulent les premiers Resident Evil ?", "Raccoon City", ["Silent Hill", "Hawkins", "Arkham"],
  "Le virus T de la société Umbrella transforme ses habitants en zombies.")
q('i', "Quel monstre de Silent Hill porte un énorme casque triangulaire ?", "Pyramid Head", ["Nemesis", "Slender Man", "Leatherface"],
  "Apparu dans Silent Hill 2 (2001), il incarne la culpabilité du héros.")
q('i', "Dans Minecraft, quel monstre vert explose quand il s'approche du joueur ?", "Le Creeper", ["L'Enderman", "Le Slime", "Le Zombie"],
  "Né d'une erreur de modélisation d'un cochon.")
q('i', "Dans Minecraft, que craignent les zombies et les squelettes ?", "La lumière du soleil", ["L'eau", "Les chats", "Les citrouilles"],
  "Ils brûlent au soleil, sauf s'ils portent un casque… ou une citrouille !")
q('i', "Où est né le personnage de Slender Man, en 2009 ?", "Sur un forum internet", ["Dans un roman de Stephen King", "Dans un film d'horreur", "Dans un jeu de société"],
  "Créé lors d'un concours de photos truquées sur le forum Something Awful.")
q('i', "Que signifie le plus souvent l'émoji 💀 dans un message ?", "« Je suis mort de rire »", ["« Je suis triste »", "« Joyeux Halloween »", "« Danger »"],
  "Il a remplacé le 😂 chez beaucoup de jeunes adultes.")
q('i', "Qu'est-ce que Spirit Halloween ?", "Des boutiques de costumes éphémères", ["Une marque de bonbons", "Un festival de musique", "Une appli de maisons hantées"],
  "Ses boutiques s'installent dans des locaux vides chaque automne, ce qui est devenu un mème.")
q('i', "Dans Squid Game, quelle confiserie faut-il découper sans la casser ?", "Une galette de sucre", ["Une guimauve", "Un biscuit au gingembre", "Un caramel mou"],
  "La série a lancé une mode mondiale de recettes de dalgona.")
q('i', "Combien de joueurs participent aux jeux de la première saison de Squid Game ?", "456", ["100", "300", "1 000"],
  "Le héros, Seong Gi-hun, porte le numéro 456.")
q('i', "Dans Hocus Pocus, quelle chanson Winifred Sanderson interprète-t-elle au bal d'Halloween ?", "I Put a Spell on You", ["Season of the Witch", "Witchy Woman", "Black Magic Woman"],
  "Bette Midler en fait un numéro culte, qui ensorcelle toute la salle.")
q('i', "Quelle danse culte accompagne The Rocky Horror Picture Show ?", "Le Time Warp", ["Le Monster Mash", "La Macarena", "Le Moonwalk"],
  "« It's just a jump to the left… » : le public la danse dans les séances de minuit depuis 1975.")
q('d', "Avant le cinéma, Danny Elfman était le chanteur de quel groupe ?", "Oingo Boingo", ["Devo", "The Cure", "Talking Heads"],
  "Leur tube Dead Man's Party est un classique des fêtes d'Halloween.")
q('d', "À quel personnage Danny Elfman prête-t-il sa voix chantée ?", "Jack Skellington", ["Beetlejuice", "Edward aux mains d'argent", "Le Joker"],
  "Chris Sarandon fait la voix parlée de Jack, Elfman la voix chantée.")
q('i', "Comment s'appelle le chat noir qui parle dans Sabrina, l'apprentie sorcière ?", "Salem", ["Binx", "Jiji", "Luna"],
  "Salem est un sorcier condamné à vivre 100 ans en chat pour avoir voulu dominer le monde.")
q('d', "Dans Hocus Pocus, quel garçon est transformé en chat noir immortel ?", "Thackery Binx", ["Max Dennison", "Billy Butcherson", "Ernie « Ice »"],
  "Il veille sur la maison des Sanderson pendant 300 ans.")
q('i', "Comment s'appelle le chat noir de Kiki la petite sorcière ?", "Jiji", ["Salem", "Luna", "Totoro"],
  "Dans le film de Miyazaki (1989), Kiki finit par ne plus le comprendre.")
q('d', "Comment s'appelle le grimoire des sœurs Halliwell dans Charmed ?", "Le Livre des Ombres", ["Le Necronomicon", "Le Grimoire noir", "Le Livre des Morts"],
  "Les trois sœurs y trouvent sorts et démons ; le Necronomicon est celui de Lovecraft et d'Evil Dead.")
q('i', "Comment s'appellent les épisodes spéciaux d'Halloween des Simpson ?", "Simpson Horror Show", ["Halloween à Springfield", "La Nuit de Bart", "Les Contes de la crypte"],
  "Diffusés chaque année depuis 1990, ils échappent à la continuité de la série.")
q('i', "Dans Scooby-Doo, qui se cache presque toujours derrière le monstre ?", "Un humain déguisé", ["Un vrai fantôme", "Scrappy-Doo", "Un robot"],
  "« Et j'aurais réussi si vous, les enfants, ne vous en étiez pas mêlés ! »")
q('i', "De quelle race est Scooby-Doo ?", "Un dogue allemand", ["Un saint-bernard", "Un beagle", "Un boxer"],
  "Ses créateurs se sont inspirés d'un dogue allemand primé, en exagérant volontairement ses défauts.")
q('i', "Dans Coco (Pixar, 2017), de quel instrument Miguel rêve-t-il de jouer ?", "De la guitare", ["Du violon", "De la trompette", "De l'accordéon"],
  "Sa famille a banni la musique depuis des générations ; il se retrouve au pays des morts.")
q('d', "Comment s'appelle le chien fantôme de Jack Skellington ?", "Zero", ["Sparky", "Casper", "Scraps"],
  "Son nez de citrouille lumineux guide le traîneau de Jack ; Sparky est le chien de Frankenweenie.")
q('i', "Quelle chanteuse annonce chaque 1er novembre, en vidéo, que la saison de Noël commence ?", "Mariah Carey", ["Céline Dion", "Ariana Grande", "Kelly Clarkson"],
  "« It's time! » : All I Want for Christmas Is You remplace aussitôt les chansons d'Halloween.")
q('i', "Quel groupe a chanté Zombie (1994), parfois mal compris comme une chanson d'Halloween ?", "The Cranberries", ["U2", "No Doubt", "Garbage"],
  "Dolores O'Riordan l'a écrite en réaction à un attentat de l'IRA à Warrington, en Angleterre.")
q('i', "Quel titre de Blue Öyster Cult (1976) invite à ne pas craindre la Faucheuse ?", "(Don't Fear) The Reaper", ["Highway to Hell", "Bark at the Moon", "Hells Bells"],
  "Et son célèbre « more cowbell » du sketch de Saturday Night Live.")
q('i', "Quelle chanson de Michael Jackson a pour thème un fantôme qui hante ceux qui le jugent ?", "Ghosts", ["Thriller", "Dirty Diana", "Billie Jean"],
  "Ghosts (1997) a donné un court-métrage de 40 minutes écrit avec Stephen King.")
q('i', "Quel chanteur de rock se fait « exécuter » en spectacle depuis les années 1970 ?", "Alice Cooper", ["Ozzy Osbourne", "Bruce Dickinson", "Gene Simmons"],
  "Guillotine, potence ou chaise électrique : le théâtre de l'horreur fait partie de chaque concert.")
q('i', "Quel rappeur a sorti la chanson Monster (2010) avec Jay-Z et Nicki Minaj ?", "Kanye West", ["Drake", "Eminem", "Lil Wayne"],
  "Le couplet de Nicki Minaj sur Monster est souvent cité comme celui qui a lancé sa carrière.")
q('i', "Quel artiste chante The Monster (2013) avec Rihanna ?", "Eminem", ["Drake", "Kanye West", "Jay-Z"],
  "Le duo parle des « monstres » sous le lit… et de la célébrité.")
q('d', "Jenna Ortega a cité quelle chanteuse post-punk parmi les inspirations de la danse de Mercredi ?", "Siouxsie Sioux", ["Kate Bush", "Debbie Harry", "Patti Smith"],
  "Elle a aussi cité Lisa Loring, la Mercredi des années 1960, et des danseurs goths des années 1980 filmés en boîte de nuit.")
q('i', "Dans Plants vs. Zombies, quelle plante sert de mur pour ralentir les zombies ?", "La Noix", ["Le Tournesol", "Le Pois tireur", "La Cerise bombe"],
  "La Noix (Wall-nut) encaisse les morsures pendant que les autres plantes attaquent ; le Tournesol produit du soleil.")
