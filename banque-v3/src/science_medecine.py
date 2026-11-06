from _lib import q, Q

CAT = 'science-medecine'
P = 'science-medecine-'

# ---------- 24 questions média ----------
q('i', "De quel célèbre atlas d'anatomie de 1543 vient ce squelette pensif ?", "De humani corporis fabrica, de Vésale", ["Le Traité de l'homme, de Descartes", "Gray's Anatomy", "Les carnets de Léonard de Vinci"],
  "André Vésale a corrigé des siècles d'erreurs héritées de Galien en disséquant lui-même des corps humains.", m=P+'0001')
q('i', "Quelle substance utile sécrètent ces animaux, encore utilisés en médecine ?", "Un anticoagulant", ["De l'insuline", "Un antibiotique", "De l'adrénaline"],
  "La salive des sangsues contient de l'hirudine, qui empêche le sang de coaguler.", m=P+'0002')
q('i', "Comment cette chauve-souris d'Amérique latine se nourrit-elle de sang ?", "Elle entaille la peau et lape le sang", ["Elle suce le sang par des crocs creux", "Elle pique comme un moustique", "Elle avale de petites proies entières"],
  "Le vampire commun pratique une petite incision avec ses incisives ; un anticoagulant dans sa salive, la draculine, fait couler le sang.", m=P+'0004')
q('i', "Quel système du corps cette planche anatomique « écorchée » met-elle en évidence ?", "Les muscles", ["Les nerfs", "Les vaisseaux sanguins", "Les ganglions lymphatiques"],
  "L'écorché montre plus de 600 muscles squelettiques une fois la peau retirée.", p=True, m=P+'0005')
q('i', "Quel organisme a pris le contrôle de cette fourmi ?", "Un champignon", ["Un virus", "Un ver parasite", "Une bactérie"],
  "Ophiocordyceps pousse la fourmi à grimper et à mordre une feuille, puis jaillit de sa tête pour répandre ses spores.", m=P+'0014')
q('d', "À qui appartient la main de cette première radiographie célèbre, prise en 1895 ?", "À l'épouse de Wilhelm Röntgen", ["À Wilhelm Röntgen lui-même", "À Marie Curie", "À un patient blessé par balle"],
  "On distingue l'alliance d'Anna Bertha Röntgen. En voyant l'image, elle aurait dit : « J'ai vu ma mort. »", p=True, m=P+'0021')
q('i', "Quel objet a traversé le crâne de cet homme en 1848 ?", "Une barre de fer", ["Une flèche", "Une balle de mousquet", "Un pic à glace"],
  "Phineas Gage a survécu, mais sa personnalité a changé : c'est un cas fondateur sur le lobe frontal… et sur la réadaptation.", p=True, m=P+'0023')
q('i', "Quelle structure, visible en bas à l'arrière, coordonne l'équilibre et la précision des mouvements ?", "Le cervelet", ["L'hippocampe", "Le thalamus", "L'hypophyse"],
  "Une atteinte du cervelet donne une ataxie : démarche élargie, titubante… d'allure assez « zombie ».", p=True, m=P+'0026')
q('i', "Avec quoi a-t-on « peint » cette œuvre d'art ?", "Avec des bactéries vivantes", ["Avec des moisissures de pain", "Avec du sang", "Avec de la peinture fluorescente"],
  "L'« agar art » utilise des bactéries naturellement colorées, qui poussent dans une boîte de Petri.", m=P+'0027')
q('i', "Quel peintre a représenté cette leçon d'anatomie publique ?", "Rembrandt", ["Vermeer", "Rubens", "Frans Hals"],
  "La Leçon d'anatomie du docteur Tulp (1632) montre la dissection de l'avant-bras d'un criminel pendu.", m=P+'0028')
q('d', "De quoi se nourrit ce champignon orangé ?", "De larves d'insectes", ["De bois mort", "De racines d'arbres", "D'excréments d'animaux"],
  "Cordyceps militaris momifie ses hôtes enterrés, puis dresse ses massues orange hors du sol.", m=P+'0034')
q('i', "Combien d'os compte environ ce segment du corps ?", "26", ["12", "33", "52"],
  "Le pied compte 26 os ; les deux pieds réunis en comptent 52, soit environ le quart des os du squelette.", p=True, m=P+'0038')
q('d', "Quelle pseudoscience illustre ce buste aux zones numérotées ?", "La phrénologie", ["La physiognomonie", "La craniométrie", "La chiromancie"],
  "Gall prétendait lire les talents et les vices sur les bosses du crâne.", m=P+'0043')
q('i', "Quel parasite voit-on sur cette gravure de 1665 ?", "Une puce", ["Un pou", "Une tique", "Une punaise de lit"],
  "Robert Hooke l'a dessinée dans Micrographia, le premier grand livre de microscopie.", m=P+'0047')
q('i', "Quel virus montre cette illustration ?", "Le SARS-CoV-2", ["Le virus de la grippe", "Le VIH", "Le virus Ebola"],
  "L'image des CDC (2020) est devenue l'icône de la pandémie de COVID-19 ; les pointes rouges sont les protéines de spicule.", m=P+'0048')
q('i', "D'où viennent ces deux bruits qu'on entend en boucle ?", "De la fermeture des valves du cœur", ["De la contraction des oreillettes", "De l'air dans les bronches", "Du sang dans les grosses veines"],
  "« Poum-tak » : B1, fermeture des valves mitrale et tricuspide ; B2, des valves aortique et pulmonaire.", m=P+'0058')
q('i', "Comment s'appelle ce champignon de conte de fées ?", "L'amanite tue-mouches", ["L'amanite phalloïde", "Le bolet de Satan", "La girolle"],
  "Rouge à points blancs, toxique et hallucinogène ; l'amanite phalloïde, elle, est la plus mortelle.", m=P+'0062')
q('d', "Quelle est cette araignée, l'une des plus grosses du monde ?", "La mygale de Leblond", ["La veuve noire", "La recluse brune", "L'araignée-loup"],
  "Theraphosa blondi peut dépasser 25 cm d'envergure. Malgré son surnom de « mangeuse d'oiseaux », elle mange surtout des insectes.", m=P+'0063')
q('i', "Que plaçait-on dans le bec de ce masque de médecin de peste ?", "Des herbes aromatiques", ["De la glace pilée", "De l'eau bénite", "Du charbon ardent"],
  "On croyait la peste transmise par les « mauvais airs » (miasmes) ; les parfums devaient les filtrer.", m=P+'0064')
q('i', "Ce cœur bat nettement plus vite qu'au repos. Quel terme décrit ce rythme ?", "La tachycardie", ["La bradycardie", "La fibrillation", "L'asystolie"],
  "Au-delà de 100 battements par minute chez l'adulte ; ici, simplement après un effort physique.", m=P+'0070')
q('d', "Quel phénomène fait briller ces champignons dans le noir ?", "La bioluminescence", ["La phosphorescence", "La fluorescence", "La radioactivité"],
  "Une réaction chimique (luciférine et luciférase) produit la lumière, comme chez les lucioles.", m=P+'0086')
q('i', "Quels organes forment les grandes zones sombres de cette radiographie ?", "Les poumons", ["Le cœur", "Le foie", "L'estomac"],
  "Remplis d'air, les poumons laissent passer les rayons X et paraissent noirs ; les os, denses, sont blancs.", m=P+'0094')
q('i', "Comment s'appelle cette araignée à la marque rouge en sablier ?", "La veuve noire", ["La tarentule", "La recluse brune", "L'épeire diadème"],
  "Son venin est neurotoxique : douleurs et contractures musculaires intenses, rarement mortelles.", m=P+'0095')
q('d', "Comment appelle-t-on ce bruit anormal qui s'ajoute aux battements ?", "Un souffle cardiaque", ["Un bruit de galop", "Un frottement péricardique", "Un sibilant"],
  "Le souffle naît d'un flux sanguin turbulent ; ici, une communication entre les deux ventricules.", m=P+'0100')

# ---------- 3 clins d'œil physiatrie supplémentaires (texte) ----------
q('i', "Combien d'os compte le squelette d'un adulte ?", "206", ["186", "250", "300"],
  "Un nouveau-né en a environ 300 : beaucoup fusionnent pendant la croissance.", p=True)
q('d', "Pourquoi les morts deviennent-ils raides quelques heures après le décès (rigor mortis) ?", "Le manque d'ATP dans les muscles", ["La coagulation dans les muscles", "Le froid qui fige les articulations", "Le dessèchement des tendons"],
  "Sans ATP, les têtes de myosine ne se détachent plus de l'actine. La raideur disparaît après 1 à 3 jours, quand les fibres se dégradent.", p=True)
q('i', "En médecine moderne, à quoi servent les asticots stériles ?", "À nettoyer les plaies chroniques", ["À traiter l'anémie", "À soigner les migraines", "À remplacer les antibiotiques par voie orale"],
  "La larvothérapie déterge les ulcères diabétiques et de pression en mangeant seulement les tissus morts.", p=True)

# ---------- 53 questions texte ----------
q('i', "Environ combien de muscles squelettiques compte le corps humain ?", "Plus de 600", ["Environ 150", "Environ 300", "Plus de 2 000"],
  "Le plus gros est le grand fessier ; le plus petit, le muscle stapédien de l'oreille.")
q('i', "Quel est l'os le plus long du corps humain ?", "Le fémur", ["Le tibia", "L'humérus", "La colonne vertébrale"],
  "Il représente environ le quart de la taille d'une personne.")
q('i', "Quel est le plus petit os du corps humain ?", "L'étrier, dans l'oreille", ["Le coccyx", "Le pisiforme, au poignet", "L'os hyoïde, au cou"],
  "Il mesure environ 3 mm ; il transmet les vibrations du son à l'oreille interne.")
q('d', "Quels muscles provoquent la chair de poule ?", "Les muscles arrecteurs des poils", ["Les muscles peauciers du cou", "Les muscles lisses des vaisseaux", "Les muscles intercostaux"],
  "Un réflexe hérité des mammifères à fourrure : hérisser le poil pour paraître plus gros… ou garder la chaleur.")
q('i', "Quelle hormone libérée en cas de peur accélère le cœur et prépare le corps à fuir ?", "L'adrénaline", ["L'insuline", "La mélatonine", "L'ocytocine"],
  "La réponse « combat-fuite » : pupilles dilatées, muscles irrigués, digestion en pause.")
q('i', "Quelle structure du cerveau joue un rôle central dans la peur ?", "L'amygdale", ["Le cervelet", "L'hypophyse", "Le corps calleux"],
  "Les personnes dont les amygdales sont détruites peuvent ne plus ressentir la peur.")
q('i', "Pourquoi ne peut-on plus bouger pendant une paralysie du sommeil ?", "L'atonie du rêve se prolonge", ["Un mini-AVC passager", "Une crise d'épilepsie", "Une chute du taux de sucre"],
  "Le cerveau se réveille, mais pas le corps ; les hallucinations de présence ont nourri les mythes de démons assis sur la poitrine.")
q('i', "Pourquoi les ongles et les cheveux semblent-ils pousser après la mort ?", "La peau se dessèche et se rétracte", ["Ils poussent réellement pendant quelques jours", "Le sang y afflue une dernière fois", "Les bactéries les allongent"],
  "C'est une illusion : la peau qui se rétracte découvre davantage d'ongle et de poil.")
q('i', "Environ combien de temps le cerveau tolère-t-il un arrêt de l'oxygène avant des lésions graves ?", "4 à 6 minutes", ["30 secondes", "20 minutes", "1 heure"],
  "D'où l'importance de commencer le massage cardiaque tout de suite.")
q('d', "Pourquoi la rage était-elle surnommée « hydrophobie » ?", "Avaler cause des spasmes", ["L'eau brûle la peau", "Le virus vit dans l'eau", "L'eau perd tout goût"],
  "La seule vue de l'eau peut déclencher des spasmes ; transmise par morsure, la rage a nourri les mythes de vampires et de loups-garous.")
q('i', "Quelle maladie rare du sang est parfois avancée pour expliquer le mythe du vampire ?", "La porphyrie", ["L'hémophilie", "La drépanocytose", "La leucémie"],
  "Sensibilité au soleil, dents parfois rougies : une hypothèse populaire, mais très discutée par les historiens.")
q('i', "Quelle condition est parfois appelée « syndrome du loup-garou » ?", "L'hypertrichose", ["L'albinisme", "La lycanthropie clinique", "Le vitiligo"],
  "Une pousse excessive de poils sur le corps et le visage. La lycanthropie clinique, elle, est un délire de transformation.")
q('d', "Comment s'appelle le trouble où une personne est convaincue d'être morte ?", "Le syndrome de Cotard", ["Le syndrome de Capgras", "Le syndrome de Fregoli", "Le syndrome de Korsakoff"],
  "Décrit par Jules Cotard en 1880 ; dans le Capgras, on croit qu'un proche a été remplacé par un sosie.")
q('d', "Quelle toxine du poisson-globe a été associée aux récits de « zombies » haïtiens ?", "La tétrodotoxine", ["La toxine botulique", "La strychnine", "Le curare"],
  "Elle bloque les canaux sodiques des nerfs : paralysie et respiration très faible pouvant faire croire à la mort.")
q('i', "Comment appelle-t-on la peur des clowns ?", "La coulrophobie", ["La clinophobie", "L'arachnophobie", "La nyctophobie"],
  "La nyctophobie est la peur du noir ; la clinophobie, celle d'aller au lit.")
q('d', "Comment appelle-t-on la peur d'Halloween ?", "La samhainophobie", ["L'hallophobie", "La phasmophobie", "La nécrophobie"],
  "Son nom vient de Samhain ; la phasmophobie est la peur des fantômes.")
q('i', "Comment appelle-t-on la peur du nombre 13 ?", "La triskaïdékaphobie", ["La paraskevidékatriaphobie", "La tétraphobie", "L'hexakosioihexekontahexaphobie"],
  "La peur du vendredi 13 a un nom encore plus long : paraskevidékatriaphobie. Celle du 666 est l'hexakosioihexekontahexaphobie.")
q('i', "Quel pigment donne sa couleur orange à la citrouille ?", "Le bêta-carotène", ["Le lycopène", "La chlorophylle", "L'anthocyane"],
  "Le même que dans la carotte, précurseur de la vitamine A ; le lycopène colore la tomate.")
q('i', "Botaniquement, qu'est-ce qu'une citrouille ?", "Un fruit", ["Un légume-racine", "Un tubercule", "Une tige gonflée"],
  "C'est une baie de la famille des cucurbitacées, comme le concombre et le melon.")
q('i', "Quel est le seul mammifère capable de vol actif ?", "La chauve-souris", ["L'écureuil volant", "Le colugo", "Le phalanger volant"],
  "Les écureuils volants et les colugos ne font que planer.")
q('i', "Comment les chauves-souris se repèrent-elles dans le noir ?", "Par écholocalisation", ["Grâce à leurs yeux infrarouges", "Grâce au champ magnétique", "À l'odorat seulement"],
  "Elles émettent des ultrasons et analysent les échos. Elles ne sont pas aveugles pour autant.")
q('i', "Jusqu'à combien de degrés une chouette peut-elle tourner la tête ?", "270°", ["90°", "180°", "360°"],
  "Ses vaisseaux du cou possèdent des réserves de sang pour ne pas couper la circulation du cerveau.")
q('i', "Pourquoi les yeux des chats brillent-ils dans le noir ?", "Une couche réfléchissante dans l'œil", ["Leurs yeux produisent de la lumière", "Leurs pupilles sont phosphorescentes", "Leurs larmes reflètent la lune"],
  "Le tapetum lucidum double la lumière captée : c'est pourquoi les chats voient si bien la nuit.")
q('i', "Les corbeaux sont-ils capables de reconnaître un visage humain ?", "Oui, et ils s'en souviennent pendant des années", ["Non, ils ne distinguent que les couleurs", "Seulement celui de leur éleveur", "Seulement les visages d'enfants"],
  "Une étude de l'Université de Washington a montré qu'ils transmettent même à leurs petits la « menace » d'un visage.")
q('i', "Comment dit-on « un groupe de corbeaux » en anglais ?", "A murder of crows", ["A coven of crows", "A haunt of crows", "A shadow of crows"],
  "Un nom médiéval lié à leur réputation de messagers de la mort ; coven désigne un groupe de sorcières.")
q('i', "Quel champignon cause la majorité des intoxications mortelles en Europe ?", "L'amanite phalloïde", ["L'amanite tue-mouches", "Le cèpe de Bordeaux", "La morille"],
  "Ses toxines détruisent le foie ; les symptômes n'apparaissent qu'après 6 à 24 heures, quand le mal est fait.")
q('d', "Quelle guêpe transforme les blattes en « zombies » qu'elle mène par l'antenne ?", "La guêpe émeraude", ["Le frelon asiatique", "La guêpe germanique", "La guêpe-araignée"],
  "Elle injecte son venin directement dans le cerveau de la blatte, puis la guide jusqu'à son nid comme un chien en laisse.")
q('d', "Que fait le parasite Toxoplasma gondii aux rats qu'il infecte ?", "Il les rend attirés par l'odeur des chats", ["Il les rend aveugles", "Il les fait grossir", "Il les rend agressifs entre eux"],
  "Mangés par un chat, les rats permettent au parasite de se reproduire dans son hôte final.")
q('i', "Quel organe les embaumeurs égyptiens laissaient-ils dans le corps de la momie ?", "Le cœur", ["Le cerveau", "Le foie", "Les poumons"],
  "Siège de l'esprit, il devait être pesé lors du jugement ; le cerveau, jugé inutile, était jeté.")
q('i', "Comment les embaumeurs égyptiens retiraient-ils le cerveau ?", "Par le nez, avec un crochet", ["Par une incision derrière l'oreille", "En ouvrant le crâne à la scie", "Par la bouche"],
  "Ils perçaient l'ethmoïde et extrayaient la matière cérébrale en morceaux.")
q('d', "À quoi servait le natron dans la momification égyptienne ?", "À dessécher le corps", ["À parfumer les bandelettes", "À colorer la peau en doré", "À sceller le sarcophage"],
  "Ce sel naturel absorbait l'eau du corps pendant environ 40 jours.")
q('d', "Quelles molécules aux noms évocateurs donnent son odeur à la décomposition ?", "La putrescine et la cadavérine", ["La mortine et la nécrosine", "La tanatine et la funérine", "La sépulcrine et la cryptine"],
  "Ces amines sont produites quand les bactéries dégradent les protéines.")
q('i', "Quelle explication scientifique donne-t-on aux feux follets des marais ?", "Des gaz qui s'enflamment", ["Des lucioles en essaim", "Des reflets de la lune", "Des champignons lumineux"],
  "Méthane et phosphine issus de la matière organique pourraient s'enflammer à l'air libre.")
q('d', "Pourquoi la Lune devient-elle rouge pendant une éclipse totale ?", "L'atmosphère dévie le rouge vers elle", ["Elle reflète les déserts terrestres", "Elle s'échauffe dans l'ombre", "Sa poussière est rouge"],
  "C'est la même diffusion de Rayleigh qui rend nos couchers de soleil orangés.")
q('d', "Comment appelle-t-on traditionnellement la pleine lune d'octobre ?", "La lune du chasseur", ["La lune des moissons", "La lune de sang", "La lune bleue"],
  "La lune des moissons est la plus proche de l'équinoxe d'automne, souvent en septembre.")
q('i', "Environ combien de litres de sang circulent dans le corps d'un adulte ?", "5 litres", ["2 litres", "10 litres", "15 litres"],
  "Environ 7 % du poids corporel.")
q('i', "Quel groupe sanguin est le « donneur universel » de globules rouges ?", "O négatif", ["AB positif", "A négatif", "B positif"],
  "AB positif est le receveur universel.")
q('d', "Combien de temps vit en moyenne un globule rouge ?", "Environ 120 jours", ["Environ 3 jours", "Environ 1 an", "Environ 10 ans"],
  "Ils sont ensuite recyclés par la rate et le foie.")
q('d', "Qui a découvert les groupes sanguins A, B et O en 1901 ?", "Karl Landsteiner", ["Louis Pasteur", "Alexander Fleming", "Robert Koch"],
  "Cette découverte a rendu les transfusions sûres ; elle lui a valu le prix Nobel en 1930.")
q('i', "Environ quel âge a Ötzi, la momie retrouvée dans un glacier des Alpes ?", "5 300 ans", ["800 ans", "2 000 ans", "12 000 ans"],
  "Découvert en 1991 à la frontière austro-italienne, il porte même 61 tatouages, peut-être thérapeutiques.")
q('i', "De quoi Ötzi est-il probablement mort ?", "D'une flèche reçue dans l'épaule", ["D'une avalanche", "D'une morsure d'ours", "De froid pendant son sommeil"],
  "La pointe de flèche a sectionné une artère sous la clavicule, découverte par radiographie en 2001.")
q('d', "Qu'est-ce qui a si bien conservé les « hommes des tourbières » du nord de l'Europe ?", "L'eau acide des tourbières", ["Le froid du permafrost", "Un embaumement rituel", "Le sel de la mer du Nord"],
  "L'homme de Tollund, au Danemark, a encore les traits de son visage après plus de 2 000 ans.")
q('i', "Environ combien de fois le cœur bat-il par jour ?", "100 000 fois", ["10 000 fois", "1 million de fois", "25 000 fois"],
  "Soit environ 2,5 milliards de battements au cours d'une vie.")
q('i', "Quel organe humain peut repousser après en avoir perdu une partie ?", "Le foie", ["Le cœur", "Le pancréas", "Les reins"],
  "Il peut se régénérer à partir d'environ 25 % de son volume.")
q('i', "Est-il vrai que nous n'utilisons que 10 % de notre cerveau ?", "Non, toutes les régions servent", ["Oui, c'est prouvé par l'IRM", "Oui, sauf pendant le sommeil", "Non, nous n'en utilisons que 1 %"],
  "L'imagerie montre que toutes les zones sont actives selon les tâches ; un mythe tenace du cinéma.")
q('i', "Comment se transmet le plus souvent la rage à l'humain ?", "Par la morsure d'un animal infecté", ["Par une piqûre de moustique", "Par l'eau contaminée", "Par la toux"],
  "Au Canada, la chauve-souris est la principale source de rage humaine. Une fois les symptômes apparus, elle est presque toujours mortelle.")
q('d', "Pour quel usage la FDA a-t-elle autorisé les sangsues médicinales en 2004 ?", "Pour sauver des greffes", ["Pour traiter l'hypertension", "Pour les morsures de serpent", "Pour retirer des tatouages"],
  "Elles décongestionnent les tissus où le sang veineux stagne, en microchirurgie reconstructive.")
q('i', "Pourquoi crie-t-on quand on a très peur ?", "Pour alerter les autres", ["Pour vider ses poumons", "Pour réchauffer la gorge", "Sans raison connue"],
  "Les cris de peur ont une « rugosité » acoustique particulière qui active fortement l'amygdale de ceux qui les entendent.")
q('i', "Quel animal fabrique la soie la plus résistante connue, plus solide que l'acier à poids égal ?", "L'araignée de Darwin", ["Le ver à soie", "La veuve noire", "La mygale"],
  "Elle tisse des toiles géantes au-dessus des rivières de Madagascar.")
q('i', "Pourquoi les araignées ne sont-elles pas des insectes ?", "Elles ont 8 pattes et 2 parties du corps", ["Elles n'ont pas de squelette", "Elles pondent sous l'eau", "Elles ont des poumons comme nous"],
  "Les araignées sont des arachnides, comme les scorpions et les acariens.")
q('d', "Quelle substance, découverte dans la salive de la chauve-souris vampire, porte un nom de film d'horreur ?", "La draculine", ["La nosférine", "La vampyrine", "La lestatine"],
  "Cette protéine anticoagulante a été étudiée pour prévenir les AVC.")
q('i', "Comment s'appelle la peur d'être enterré vivant ?", "La taphophobie", ["La claustrophobie", "La thanatophobie", "La nécrophobie"],
  "La thanatophobie est la peur de la mort en général.")
q('i', "Quel nom donne-t-on à l'étude scientifique des insectes trouvés sur un cadavre pour dater la mort ?", "L'entomologie médico-légale", ["La thanatologie botanique", "La paléopathologie", "L'archéozoologie"],
  "Les mouches arrivent dans les minutes qui suivent le décès : leurs larves servent d'horloge biologique.")
