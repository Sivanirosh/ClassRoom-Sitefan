# EX-0306 — Le portrait d’un lieu

## Decision summary

Cette étude de **construction** transforme une fiche de lieu en plan simplifié superposé. L’élève n’a pas quatre phrases à classer dans quatre catégories. Les fonctions sont déjà fixées par quatre ateliers de manipulation différents :

1. **poser** un terrain sous le lieu pour rendre le site visible ;
2. **relier** un repère voisin pour construire la situation ;
3. **tracer** un bord naturel ou construit pour matérialiser la limite ;
4. **ouvrir** une voie jusqu’à l’entrée, avec ou sans franchissement de la limite.

Chaque activation modifie le même plan et une conséquence textuelle authored. Une soumission distincte n’est disponible qu’après la pose des quatre composants. Trois planches fictives font varier le caractère naturel ou construit du terrain et du bord, puis la relation entre limite et accès.

Cette mécanique est volontairement distincte d’EX-0307 : EX-0307 classe quatre cartes-indices dans quatre rubriques ordonnées ; EX-0306 manipule des composants spatiaux dans quatre ateliers déjà nommés et produit une représentation en couches. Aucune phrase n’est déplacée dans une catégorie.

## Curriculum alignment and claim boundary

- **Framework :** PER, Cycle 2
- **Année du prototype :** `6H`
- **Cluster canonique :** `geo56-location-access` — « Site, situation, limites, accès »
- **Objective codes :** `SHS 21`, `SHS 23`
- **Source ID :** `src-per-0002`
- **Matrice canonique :** `experiments/curriculum/mappings/6h-coverage-matrix.json`
- **Synthèse de recherche :** `experiments/curriculum/research/6h-geography-coverage.md`

### Statut exact des énoncés mappés

| Statement ID canonique | Statut dans la matrice | Usage borné dans EX-0306 |
|---|---|---|
| `PER-C2-GEO-P56-00` | progression officielle **5H–6H** | Les trois fiches représentent des lieux fictifs d’une région proche et les relient à une école, des logements, une gare, des commerces, un village ou un réseau de chemins. |
| `PER-C2-GEO-P56-L01` | progression officielle **5H–6H** | La manipulation rend visibles des caractéristiques du site, une position par rapport à d’autres lieux, une limite et un accès. Les conséquences authored montrent comment ces composants se coordonnent dans un plan. |
| `PER-C2-GEO-AF-C2-03` | attente fondamentale **non bandée de fin du Cycle 2** ; usage `directional-or-diagnostic-only` | Elle donne une direction de conception autour de site/situation et limites/accès. Le prototype ne transforme pas cette attente en seuil de 6H et ne recueille pas les deux raisons autonomes demandées à l’horizon de fin de cycle. |

Il n’existe **aucun point d’arrivée explicitement marqué 6H** dans cette couverture géographique. La réussite technique des trois planches n’établit donc ni une attente officielle propre à la 6H, ni l’atteinte de `PER-C2-GEO-AF-C2-03`.

### Source-backed account

La synthèse de `src-per-0002` rattache la progression 5H–6H à des espaces vécus, fréquentés ou documentés de la région proche. Elle associe `P56-L01` à la description d’un lieu et à l’examen de raisons de localisation à partir du site, de la proximité, des relations avec l’extérieur, des limites et des accès. SHS 23 est intégré à SHS 21 et soutient notamment le passage entre espace et représentation ainsi que l’emploi d’un lexique spatial.

### Design interpretation

La table lumineuse, les quatre verbes **poser / relier / tracer / ouvrir**, les composants binaires, les tracés SVG, les conséquences écrites, Valdoux et les trois lieux sont des choix de design authored. Le PER ne prescrit ni ce dispositif, ni ces options, ni leur ordre, ni cette règle de correction. Les plans ne représentent aucune commune réelle et ne sont pas à l’échelle.

### What this study does not establish

Le prototype n’observe pas et ne peut pas établir que l’élève :

- produit une explication autonome de la localisation ;
- formule deux raisons de localisation sans aide ;
- observe seul un lieu réel ou choisit ses propres informations ;
- dessine un plan conventionnel, emploie une échelle ou mesure une distance ;
- transfère la stratégie à un quatrième lieu non guidé ;
- atteint une maîtrise durable ou l’attente de fin de Cycle 2.

Les explications visibles après un choix et après une réussite sont écrites par le prototype. Elles ne sont jamais présentées comme des paroles ou une justification de l’élève.

## Observable learning objective

À partir d’une fiche qui donne quatre repères, **construire un plan simplifié en choisissant le terrain du site, le repère voisin de la situation, la limite et la voie d’accès, puis remplacer le composant signalé après un retour ciblé**.

Les actions réellement observées par l’interface sont : activation d’un composant dans chaque atelier, état du plan soumis, remplacement éventuel d’un composant, nouvelle soumission et continuation. Le prototype n’évalue aucune réponse libre.

## Prerequisites and working vocabulary

### Prérequis

- Lire quatre repères courts dans un tableau.
- Comprendre qu’un plan simplifié représente un espace vu de dessus sans conserver toutes les proportions.
- Reconnaître une surface sous un lieu, un repère voisin, un bord et une voie.
- Utiliser un bouton à choix exclusif ; aucune compétence de dessin ou de glisser-déposer n’est requise.

### Vocabulaire opératoire affiché

| Terme | Action rendue visible dans l’étude |
|---|---|
| **Site** | Poser le terrain occupé par le lieu : terrasse, dalle ou clairière. |
| **Situation** | Relier le lieu à un repère voisin : quartier, gare/commerces ou village/bois. |
| **Limite** | Tracer l’élément qui marque un bord : rivière, rails clôturés ou torrent. |
| **Accès** | Ouvrir la voie qui atteint l’entrée ; elle peut rester du même côté ou franchir une limite à un passage aménagé. |

Ces définitions sont bornées à la tâche. Elles ne prétendent pas épuiser le sens géographique de ces termes.

## Design hypotheses and productive difficulty

Aucune erreur n’est décrite comme une misconception documentée, faute de recherche nommée sur cette interface et ce public. Les points suivants sont des **hypothèses de conception à observer** :

1. un élève peut choisir la surface la plus saillante sans vérifier si le site demandé est naturel ou construit ;
2. la liaison à un voisin peut être traitée comme un décor et non comme la construction d’une position relative ;
3. toute ligne peut être interprétée comme une route, même lorsque sa fonction est de marquer le bord ;
4. une voie qui longe une limite peut être prise pour un accès alors qu’elle n’atteint pas l’entrée ;
5. l’existence d’une passerelle ou d’un passage sous voie peut faire oublier que la rivière ou les rails restent une limite ailleurs ;
6. les conséquences textuelles peuvent soutenir la lecture du plan ou, au contraire, donner trop directement la correspondance attendue.

La difficulté productive consiste à coordonner quatre opérations spatiales sur **un même lieu** et à observer la différence entre un trait de situation, un trait de limite et un tracé d’accès. La friction accidentelle à éviter comprend le dessin précis, le glisser-déposer, les cibles petites, une carte indispensable à voir, les états exprimés par couleur seule et une soumission qui se déclencherait pendant la construction.

## Core interaction hypothesis

> Si l’élève traduit une fiche par quatre opérations spatiales distinctes — poser un terrain, relier un voisin, tracer un bord et ouvrir une route — et voit le plan ainsi que la conséquence de chaque opération se mettre à jour avant une soumission séparée, alors les rôles de site, situation, limite et accès deviennent manipulables dans une représentation commune plutôt que mémorisés comme quatre étiquettes.

Cette hypothèse porte sur l’interaction. Elle n’affirme pas que le montage entraîne une explication autonome ni un apprentissage mesuré.

## Exercise loop and complete states

1. **Introduction (`intro`) :** présente les quatre verbes de construction, le caractère fictif de Valdoux, les commandes clavier/toucher, l’absence de dessin précis, de chronomètre et d’enregistrement.
2. **Ouverture (`active`) :** affiche une fiche-tableau avec quatre repères déjà associés à leur atelier. Ce tableau n’est pas un lot de phrases à classer.
3. **Construction :** dans chaque atelier fixe, l’élève choisit l’un de deux composants par un grand bouton. Un terrain apparaît sous le lieu, une liaison rejoint un voisin, une limite se trace et une route se dessine.
4. **Conséquences :** le panneau textuel décrit immédiatement ce que le composant sélectionné fait apparaître. Il s’agit de texte authored, pas d’une justification fournie par l’élève.
5. **Décision :** le bouton « Soumettre ce plan » reste désactivé et sans marqueur de soumission jusqu’à ce que les quatre ateliers aient un choix. L’activation d’un composant ne soumet jamais le plan.
6. **Retour incorrect (`incorrect`) :** une copie textuelle des quatre composants soumis reste visible. Le premier calque non conforme, dans l’ordre stable site → situation → limite → accès, est nommé avec sa conséquence et le repère de fiche à retrouver.
7. **Reprise (`retry`) :** les quatre choix restent en place et modifiables. Une piste concerne uniquement le calque cité ; aucun composant n’est remplacé automatiquement.
8. **Retour correct (`correct`) :** un texte authored décrit la composition exacte du plan et quatre cartes rappellent les composants envoyés.
9. **Continuation (`continuation`) :** une région distincte et un bouton visible ouvrent la planche suivante. Après la troisième réussite, le même type d’action ouvre la fin.
10. **Fin (`complete`) :** résume les quatre opérations sans score, rang, badge de maîtrise ou affirmation de transfert.

Le chemin déterministe de fumée réalise quatre vrais choix incorrects, soumet le plan, ouvre la reprise, remplace les quatre composants par les choix corrects, puis soumet de nouveau. Aucun raccourci, réponse instantanée cachée ou automate parallèle n’existe.

## Authored content model

### Structure bornée

Le composant contient exactement trois objets `Variation`. Chaque variation possède :

- un identifiant stable, un numéro de planche, un lieu, un thème et une mission ;
- un libellé de plan et un texte correct authored ;
- exactement quatre objets `ConstructionLayer`, dans l’ordre `site`, `situation`, `limit`, `access` ;
- pour chaque couche : un verbe, une question, un repère de fiche, un texte de reprise et exactement deux `LayerChoice` ;
- pour chaque choix : identifiant, libellé, détail, libellé court de carte, conséquence textuelle, éventuelle correction, état valide/non valide, rôle dans le chemin de fumée et spécification visuelle locale.

La spécification visuelle fournit seulement des coordonnées et tracés authored dans le `viewBox` local : type de surface, point du voisin, chemin du bord et chemin de l’accès. Elle ne contient aucune donnée distante, mesure réelle ou génération aléatoire.

### Inventaire complet et réponses valides

#### `rives-maison` — Maison des Rives

| Étape / repère de fiche | Choix planifié incorrect | Choix valide | Conséquence conceptuelle |
|---|---|---|---|
| `site` — `terrasse sèche · terrain naturel` | `rives-bas-fond` — **Bas-fond humide** | `rives-terrasse` — **Terrasse alluviale sèche** | Fait varier deux sites naturels, mais seul le second place la maison sur une surface plane et sèche. |
| `situation` — `école + logements · côté ouest` | `rives-depot` — **Dépôt de l’autre rive** | `rives-quartier` — **École et logements** | Le trait relie soit un repère isolé au-delà de la rivière, soit les voisins fréquentés du quartier. |
| `limit` — `rivière · bord est` | `rives-muret` — **Muret au sud** | `rives-riviere` — **Rivière à l’est** | Oppose un bord construit au mauvais côté à la limite naturelle demandée. |
| `access` — `arrêt de bus → entrée · côté ouest` | `rives-sentier-rive` — **Sentier de l’autre rive** | `rives-allee-bus` — **Allée depuis l’arrêt** | Le sentier s’arrête à la rivière ; l’allée atteint l’entrée sans franchir la limite. |

#### `gare-halle` — Halle de la Garette

| Étape / repère de fiche | Choix planifié incorrect | Choix valide | Conséquence conceptuelle |
|---|---|---|---|
| `site` — `dalle minérale · terrain construit` | `gare-pre` — **Pré humide en pente** | `gare-dalle` — **Dalle pavée** | Oppose un terrain naturel irrégulier à un site déjà construit et plan. |
| `situation` — `gare au nord + commerces au sud` | `gare-ferme` — **Prairie et ferme isolée** | `gare-reseau` — **Gare et commerces** | Le second trait place la halle dans un réseau d’échanges local. |
| `limit` — `voie ferrée clôturée · bord nord` | `gare-ruisseau` — **Ruisseau à l’est** | `gare-rails` — **Rails clôturés au nord** | Oppose limite naturelle inventée et limite technique construite demandée. |
| `access` — `route sud + passage sous voie · franchissement autorisé` | `gare-quai-ferme` — **Voie le long des rails** | `gare-sous-voie` — **Route et passage sous voie** | Une voie parallèle n’entre pas ; la route et le passage atteignent la halle et franchissent la limite en un point aménagé. |

#### `bois-aire` — Aire de Clairbois

| Étape / repère de fiche | Choix planifié incorrect | Choix valide | Conséquence conceptuelle |
|---|---|---|---|
| `site` — `clairière ferme · pente douce` | `bois-beton` — **Plateforme bétonnée** | `bois-clairiere` — **Clairière en pente douce** | Oppose une surface construite à un site naturel ferme. |
| `situation` — `village en contrebas + bois autour` | `bois-parking` — **Parking du col** | `bois-village` — **Village et lisière du bois** | Le trait valide coordonne le village plus bas et le bois qui entoure l’aire. |
| `limit` — `torrent · bord sud` | `bois-cloture` — **Clôture au nord** | `bois-torrent` — **Torrent au sud** | Oppose bord construit et limite naturelle au bon côté. |
| `access` — `arrêt du village → passerelle · traverse le torrent` | `bois-piste-nord` — **Piste forestière du nord** | `bois-passerelle` — **Chemin par la passerelle** | La piste contourne ; le chemin franchit le torrent en un point précis puis atteint l’entrée. |

### Deliberate conceptual variation

| Variation | Site | Situation | Limite | Relation de l’accès à la limite |
|---|---|---|---|---|
| Maison des Rives | naturel, terrasse sèche | école et logements à l’ouest | naturelle, rivière à l’est | l’accès arrive du même côté et ne franchit pas la rivière |
| Halle de la Garette | construit, dalle pavée | entre gare et commerces | construite, rails clôturés | le passage sous voie franchit la limite technique |
| Aire de Clairbois | naturel, clairière en pente douce | village en contrebas et bois autour | naturelle, torrent au sud | la passerelle franchit la limite naturelle en un point précis |

La variation ne repose donc pas sur les noms ou les couleurs. Elle change la nature du support, la fonction des voisins, le type de bord et la topologie du trajet.

### Valid-answer and transition rules

- `selections[layerId]` contient au plus un identifiant de choix par couche.
- Activer l’autre bouton d’une même couche remplace le choix ; aucune autre couche ne bouge.
- Un plan devient soumissible si et seulement si les quatre identifiants de couche possèdent un choix.
- Une soumission est correcte si et seulement si chaque choix porte `correct: true`. Il n’existe ni seuil partiel, ni score, ni parseur de texte.
- Une soumission incorrecte sélectionne le premier écart dans l’ordre stable des quatre couches. Les autres choix restent visibles mais ne reçoivent pas automatiquement une étiquette conceptuelle.
- Retry conserve tout le montage. La nouvelle soumission reste une action volontaire séparée.
- La continuation n’existe qu’après une soumission correcte.
- La fin n’est atteignable qu’après une réussite sur les trois identifiants stables.
- Recharger la page réinitialise l’état en mémoire du composant.

### Ambiguity guards and edge cases

- Les ateliers sont déjà nommés ; aucun choix ne demande de décider si une phrase appartient à « site » ou « situation ».
- Les deux surfaces de chaque atelier de site restent plausibles comme surfaces, mais la fiche précise naturel/construit, sec/humide ou pente.
- Les voisins sont représentés par un point et une liaison ; ils ne servent pas de bord.
- Les limites emploient des traits épais à style distinct et les accès des tracés fléchés qui doivent atteindre l’entrée.
- Lorsqu’un accès franchit une limite, le bord reste visible sous le passage : franchir en un point ne supprime pas la limite ailleurs.
- Dans la Garette, « voie ferrée » reste la limite lorsqu’elle est clôturée ; seul le passage sous voie est l’accès.
- À Clairbois, le torrent est la limite et la passerelle le composant du trajet. Ils ne sont pas fusionnés en une seule option.
- La géométrie de carte est redondante avec le tableau, les libellés de boutons et les conséquences textuelles. Aucune correction ne dépend d’une couleur ou d’une position visuelle seule.
- Aucun tracé n’est interprété comme une distance, une pente mesurée, une autorisation réelle ou une qualité d’accessibilité.

## Feedback and recovery

### Pendant la construction

Chaque bouton affiche le composant réel et son détail. Une fois activé, il porte `✓` et un état textuel propre au geste : « Terrain posé », « Voisin relié », « Bord tracé » ou « Route ouverte ». Le plan et la liste des conséquences se mettent à jour, mais aucun état « juste/faux » n’est annoncé avant la soumission.

### Soumission incorrecte

Le retour :

- nomme le calque et le composant envoyé ;
- explique la contradiction avec le repère authored de la fiche ;
- montre les quatre composants soumis ;
- marque textuellement le premier comme « à revoir » et les autres comme « conservé » ;
- propose un bouton de reprise, sans corriger ni soumettre à la place de l’élève.

Le message décrit toujours le montage, jamais une capacité ou un trait de l’élève.

### Reprise

La piste concerne une opération spatiale : regarder sous le bâtiment, chercher les voisins utiles, suivre le bon bord, ou partir de l’origine de la route jusqu’à l’entrée. Elle ne déplace aucun composant et ne cache aucun bouton. Plusieurs soumissions incorrectes restent récupérables selon la même règle.

### Soumission correcte

Le texte correct coordonne les quatre composants du lieu précis. Il est explicitement authored. Il constitue une conséquence du plan envoyé, pas la preuve que l’élève a formulé cette coordination de manière autonome.

## `6H-SMOKE-1` surface

| État visible | Preuve exposée |
|---|---|
| `intro` | Introduction non vide et unique bouton `data-smoke-action="start"`. |
| `active` | Une variation stable, huit vrais boutons de composants et un bouton de soumission distinct. |
| `incorrect` | Même variation, retour textuel spécifique avec symbole `!`, montage envoyé et unique action `retry`. |
| `retry` | Même variation, choix conservés, piste visible, boutons corrects activables et soumission séparée. |
| `correct` | Même variation, explication spécifique avec symbole `✓`. |
| `continuation` | Région distincte de la réussite et unique action `continue`. |
| `complete` | État distinct après trois variations correctes, avec résumé écrit. |

Pour chaque variation :

- les quatre choix `smokeWrong` portent `data-smoke-attempt="incorrect"` et les étapes contiguës `1` à `4` ;
- les quatre choix valides portent `data-smoke-attempt="correct"` et les mêmes étapes contiguës `1` à `4` ;
- ces marqueurs décorent les boutons visibles ordinaires qui construisent réellement le plan ;
- `data-smoke-action="submit"` n’apparaît sur le bouton réel que lorsque les quatre couches sont remplies ;
- aucun `data-smoke-answer`, doublon masqué, chemin instantané ou logique réservée au test n’est ajouté.

Les identifiants stables sont `rives-maison`, `gare-halle` et `bois-aire`. Les régions `active`, `retry`, `incorrect`, `correct` et `continuation` exposent chacune l’identifiant courant.

Le harnais historique du dépôt qui attend une réponse immédiate appartient à une convention antérieure contradictoire avec la construction multi-étapes et la soumission séparée. Ce prototype conserve le contrat `6H-SMOKE-1` récent sans raccourci caché.

## Accessibility, input and responsive behavior

- Toutes les manipulations sont des boutons natifs. Tab suit les quatre ateliers puis les options dans l’ordre visible ; Espace et Entrée utilisent l’activation native.
- Chaque option expose un nom accessible composé du verbe, du composant et de son détail, ainsi que `aria-pressed`.
- Les boutons de composants ont une hauteur minimale de 76 à 82 CSS px selon la largeur ; les actions principales dépassent 54 px. Les espacements empêchent le chevauchement.
- Aucun glisser-déposer, dessin, geste continu, survol, son, chronomètre ou précision spatiale n’est requis.
- Le choix est signalé par `✓`, texte d’état, bordure et état accessible, en plus de la couleur.
- Les états incorrect et correct possèdent titre, symbole non colorimétrique, texte spécifique et déplacement programmatique du focus. Une région `aria-live` polie annonce aussi les sélections et transitions.
- Le SVG est `aria-hidden` car le tableau, les boutons et la liste de conséquences donnent toute l’information nécessaire sous forme textuelle.
- Le tableau se transforme en blocs lisibles sous 520 px. À 320 CSS px, les options sont sur une colonne, les régions s’empilent et aucune largeur fixe ne demande de panoramique horizontal.
- Le toucher et le pointeur activent les mêmes boutons que le clavier.
- `prefers-reduced-motion: reduce` supprime transitions et déplacements de pression. Aucun contenu, tracé, retour ou contrôle ne dépend d’une animation.
- Les mots peuvent se replier ; aucun libellé essentiel n’est inscrit uniquement dans le SVG.

## Isolation, privacy and source-content integrity

`Prototype.svelte` n’a aucun import. Il ne contient ni `fetch`, XHR, beacon, ressource externe, stockage, cookie, IndexedDB, Cache Storage, service worker, analytics, identité ou envoi de résultat. Tout l’état reste en mémoire du composant et disparaît au rechargement.

Les formes SVG, le système visuel de table lumineuse, la géométrie, les lieux et le texte français sont originaux pour cette étude. Le composant n’importe ni code de classe, ni moteur partagé, ni exercice frère. Les références au PER restent de courtes paraphrases bornées dans ce document.

## Evidence to observe beyond completion

L’interface enregistre seulement l’état courant nécessaire à la boucle. Une future observation humaine pourrait noter, sans l’attribuer automatiquement à l’élève :

- l’ordre dans lequel les quatre ateliers sont utilisés ;
- la consultation ou non du plan après chaque activation ;
- le composant remplacé après un retour ciblé ;
- la conservation des trois autres couches pendant la reprise ;
- la distinction opérationnelle entre une ligne qui borde et une voie qui atteint l’entrée ;
- l’effet du passage d’un site naturel à une dalle construite ;
- l’effet d’un accès qui ne franchit pas la limite, puis d’un passage sous voie et d’une passerelle ;
- les commentaires spontanés éventuels, clairement séparés des preuves recueillies par le prototype.

Une éventuelle explication orale provoquée par un adulte serait une donnée d’observation externe, pas un résultat calculé par EX-0306.

## Observation plan

### Participants and setup

Observer plusieurs élèves travaillant vers la fin de 6H, individuellement ou en dyades, avec au moins un passage clavier et un passage tactile à 320 px. Recharger entre les séances pour repartir d’un état vide. L’adulte peut demander « Qu’est-ce qui vient de changer sur le plan ? », mais doit noter séparément la manipulation, la lecture de la conséquence et toute verbalisation.

### Evidence that would support the interaction hypothesis

- L’élève consulte le plan ou la conséquence après un choix et relie le changement au geste effectué.
- Après un retour, il remplace le calque cité sans modifier au hasard les trois autres.
- Dans la Garette, il conserve les rails comme bord tout en ouvrant le passage sous voie comme trajet.
- À Clairbois, il garde le torrent visible après avoir ajouté la passerelle.
- Le passage terrasse naturelle → dalle construite → clairière naturelle ne provoque pas un choix systématique fondé sur la couleur ou la position du bouton.

Ces indices soutiendraient seulement l’hypothèse d’interaction ; ils ne suffiraient pas à établir un apprentissage durable.

### Evidence that would weaken or falsify it

- Les élèves lisent uniquement les mots du tableau et ne regardent jamais le plan ou les conséquences.
- Les quatre opérations sont vécues comme quatre QCM sans relation entre elles.
- Les tracés de voisin, de limite et d’accès restent indifférenciés malgré les verbes et formes distincts.
- La reprise conduit à inverser de nombreux boutons au hasard plutôt qu’à modifier le calque cité.
- Les élèves pensent que l’ajout d’un passage efface entièrement la limite.
- Les libellés ou la densité de la table imposent une charge de lecture qui masque la relation spatiale.

### Distinguishing concept from interface friction

Noter séparément :

1. le composant que l’élève désigne verbalement ou du doigt ;
2. le bouton réellement activé ;
3. le changement vu sur le plan ;
4. une éventuelle hésitation de vocabulaire ;
5. une erreur de focus, de toucher, de défilement ou de lecture de sélection.

Si l’élève annonce vouloir ouvrir l’allée mais active le sentier voisin, ne voit pas le `✓`, perd le focus après une transition ou touche deux fois le même bouton, classer d’abord l’événement comme friction potentielle. Si le bouton voulu est activé et que l’élève maintient qu’une voie parallèle atteint l’entrée malgré la conséquence visible, cela peut justifier une relance conceptuelle humaine, sans diagnostic automatique.

### Questions remaining for pupil testing

- La traduction directe d’un repère de fiche en composant est-elle assez productive ou trop facile ?
- Le plan en couches est-il consulté, ou le tableau et les libellés suffisent-ils à réussir par appariement verbal ?
- Les conséquences textuelles aident-elles à lire le plan ou donnent-elles trop d’information avant soumission ?
- Les trois styles de traits sont-ils distinguables sans devenir une convention cartographique non enseignée ?
- Le passage sous voie et la passerelle font-ils comprendre qu’un accès traverse une limite en un point seulement ?
- Quatre ateliers binaires successifs restent-ils supportables avec lecteur d’écran et à 320 px ?

## Prototype boundaries

### Included

- Une capacité bornée : traduire quatre repères en quatre couches d’un plan simplifié.
- Trois fiches fictives et inspectables.
- Huit composants visibles par fiche, dont quatre sont envoyés.
- Mise à jour du plan et conséquences textuelles authored.
- Boucle complète incorrect → reprise → correct → continuation → fin.
- Clavier, pointeur, toucher 320 px et mouvement réduit.

### Excluded

- Classement de quatre phrases dans quatre catégories.
- Production autonome d’une explication ou de deux raisons de localisation.
- Observation d’une commune réelle, géolocalisation ou carte distante.
- Dessin libre, mesure, échelle, orientation évaluée ou convention cartographique complète.
- Évaluation de la sécurité, légalité ou qualité réelle d’un accès.
- Score, rang, durée limite, identité, analytics, persistance ou envoi.
- Toute affirmation que `PER-C2-GEO-AF-C2-03` est une attente obligatoire propre à la 6H.

## Findings and decisions

- **2026-07-15 — Garde curriculaire :** conserver `PER-C2-GEO-P56-00` et `PER-C2-GEO-P56-L01` comme progressions 5H–6H ; garder `PER-C2-GEO-AF-C2-03` comme horizon non bandé de fin de Cycle 2 seulement.
- **2026-07-15 — Finding de revue indépendante :** la première version répétait la boucle d’EX-0307 en demandant de ranger quatre phrases dans quatre rubriques et prêtait à l’élève une justification que l’interface ne recueillait pas.
- **2026-07-15 — Correction mécanique :** remplacer entièrement ce tri par une table de construction à quatre gestes spatiaux fixes. Les options sont des surfaces, voisins, bords et routes ; elles modifient un plan commun et ne changent jamais de catégorie.
- **2026-07-15 — Limite de preuve :** réduire l’objectif et les preuves aux sélections, au plan soumis et à la révision d’un composant. Les conséquences et synthèses sont attribuées au prototype, jamais à une production autonome de l’élève.
- **2026-07-15 — Variation :** distinguer site naturel/construit, limite naturelle/construite et trois topologies d’accès : même côté, passage sous une limite technique, passerelle sur une limite naturelle.
- **2026-07-15 — Accessibilité :** employer de grands boutons natifs et des tracés automatiques ; ne demander aucun placement précis, drag ou dessin.
- **2026-07-15 — Smoke :** conserver les vrais chemins multi-étapes avec soumission séparée du contrat récent. Ne pas ajouter de contrôle immédiat ou caché pour le harnais historique contradictoire.
- **2026-07-15 — Statut :** aucune séance avec élèves, aucune validation enseignante/curriculaire et aucune mesure d’apprentissage n’ont eu lieu ; le statut reste exactement `prototyping`.

## Promotion criteria

Le passage vers `testing` demanderait au minimum :

1. une revue technique indépendante sans défaut bloquant ou élevé sur les vrais chemins `6H-SMOKE-1`, clavier, toucher 320 px, mouvement réduit, absence de réseau et absence de persistance ;
2. une vérification indépendante que les marqueurs décorent seulement les boutons de construction et la soumission visible, sans raccourci ;
3. une revue de contenu par une personne enseignante et une personne compétente sur le curriculum ;
4. des observations avec plusieurs élèves montrant que le plan et les conséquences sont effectivement consultés et que la limite reste visible lors d’un franchissement ;
5. une séparation documentée des erreurs de concept, d’appariement verbal, de focus, de toucher et de lecture du SVG ;
6. le maintien du plafond de preuve : aucune réussite de montage ne doit être décrite comme une explication autonome, une maîtrise ou l’atteinte de l’attente de fin de cycle.

`testing` signifierait seulement « prêt pour des essais encadrés ». `validated` resterait réservé à des observations documentées et à une autorisation externe appropriée.
