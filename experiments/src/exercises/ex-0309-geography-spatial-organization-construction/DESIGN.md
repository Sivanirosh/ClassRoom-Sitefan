# EX-0309 — L’atelier des trois maillons

## Decision summary

Cette étude fait construire la relation **fonction → aménagement → effet observable** dans trois organisations fictives de la région proche. L’élève pose trois cartes, voit le croquis changer dès le choix de l’aménagement, soumet la chaîne, puis répare le premier lien incohérent sans perdre sa réponse. Cette manipulation mérite d’être testée parce qu’elle traite un aménagement comme une relation entre des parties et des usages, et non comme un objet à reconnaître dans une question à choix multiple.

## Curriculum alignment

- **Framework :** PER, Cycle 2
- **Année du catalogue et du prototype :** `6H` uniquement
- **Statut :** `prototyping`
- **Lentille :** `lens-construction` uniquement
- **Cluster canonique :** `geo56-spatial-organization`
- **Titre du cluster dans la matrice :** *Parties, zones, réseaux, aménagements, impacts*
- **Objective codes :** `SHS 21`, `SHS 23`
- **Source ID canonique :** `src-per-0002`
- **Traçabilité locale :** `experiments/curriculum/mappings/6h-coverage-matrix.json` et `experiments/curriculum/research/6h-geography-coverage.md`
- **Source officielle décrite par le dossier :** PER Cycle 2, version 3.0, août 2024, pages imprimées 70, 74–77 pour le périmètre mobilisé.

### Compte curriculaire fondé sur la source

Les quatre énoncés suivants sont des **progressions officielles 5H–6H**. Ils sont en portée pour le programme 6H, mais ne sont pas présentés comme des attentes explicitement marquées « 6e » :

| Statement ID canonique | Statut dans la matrice | Compte concis |
|---|---|---|
| `PER-C2-GEO-P56-00` | progression `5H-6H`, cadre partagé | Étudier un espace vécu, fréquenté ou documenté de la région proche, avec mise en évidence de liens vers des espaces plus lointains. |
| `PER-C2-GEO-P56-O01` | progression `5H-6H`, relation cross-cluster | Identifier les parties d’un lieu, leurs relations, leurs fonctions et leurs utilisations. |
| `PER-C2-GEO-P56-O02` | progression `5H-6H`, relation primaire | Localiser ou identifier des aménagements servant notamment à délimiter, relier, approvisionner ou évacuer, embellir, sécuriser, attirer ou réduire des nuisances. |
| `PER-C2-GEO-P56-O03` | progression `5H-6H`, relation primaire | Identifier quelques impacts environnementaux, sociaux et économiques des activités humaines et des aménagements. |

Les cinq énoncés suivants sont des **attentes non bandées de fin de Cycle 2** (`cycle-2-unbanded`, usage `directional-or-diagnostic-only`). Ils ne sont pas des seuils obligatoires de 6H :

| Statement ID canonique | Statut officiel conservé | Direction donnée au design, sans la transformer en exigence 6H |
|---|---|---|
| `PER-C2-GEO-AF-C2-05` | attente de fin de Cycle 2 | Délimiter des zones. Les scénarios font distinguer zone, limite et liaison. |
| `PER-C2-GEO-AF-C2-06` | attente de fin de Cycle 2 | Identifier des découpages politiques, économiques, linguistiques et naturels en Suisse et en zone frontalière. Le prototype ne mesure pas cette attente ; il montre seulement une zone économique fictive et une limite naturelle proche. |
| `PER-C2-GEO-AF-C2-07` | attente de fin de Cycle 2 | Relier des aménagements à leurs buts. La chaîne de construction offre une occasion précoce de travailler cette relation. |
| `PER-C2-GEO-AF-C2-08` | attente de fin de Cycle 2 | Comparer deux lieux selon au moins trois critères. La synthèse juxtapose trois cas, mais ne constitue pas une évaluation de comparaison à trois critères. |
| `PER-C2-GEO-AF-C2-09` | attente de fin de Cycle 2 | Relier aménagements et impacts sur la qualité de vie ou l’environnement. Les « regards d’impact » sont directionnels et ne prétendent pas établir un effet réel. |

La matrice attribue ces neuf statement IDs au cluster, avec `P56-00` comme cadre partagé. La source associe SHS 23 aux démarches et outils intégrés à SHS 21 ; le prototype ne traite donc pas SHS 23 comme un apprentissage autonome. Le dossier de géographie indique qu’aucune attente de cette page n’est explicitement marquée « 6e ».

### Interprétation de conception, séparée de la source

Le PER ne prescrit ni les trois lieux fictifs, ni les cartes à poser, ni l’ordre des maillons, ni le croquis réactif, ni les formulations de feedback. Le prototype interprète les progressions en rendant manipulable une chaîne causale bornée : une fonction visée oriente un aménagement ; l’aménagement change les relations visibles dans un schéma ; cet état permet d’examiner un effet ou un impact possible.

La place publique, la boucle de collecte et la passerelle sont des situations originales. Elles ne décrivent aucune commune réelle et ne fournissent ni mesure de trafic, ni donnée économique, ni conclusion environnementale. Le cas de collecte rend seulement visible un lien entre le quartier et des productions de la région ; il ne transforme pas cette fiction en fait géographique à mémoriser.

### Tags de traçabilité attendus

`exercise.ts` porte `program-per-6h`, `cluster-geo56-spatial-organization`, exactement `lens-construction`, ainsi que les neuf tags normalisés :

- `statement-per-c2-geo-p56-00`
- `statement-per-c2-geo-p56-o01`
- `statement-per-c2-geo-p56-o02`
- `statement-per-c2-geo-p56-o03`
- `statement-per-c2-geo-af-c2-05`
- `statement-per-c2-geo-af-c2-06`
- `statement-per-c2-geo-af-c2-07`
- `statement-per-c2-geo-af-c2-08`
- `statement-per-c2-geo-af-c2-09`

## Learning objective

**Assembler puis, si nécessaire, réviser dans trois schémas de la région proche une chaîne cohérente `fonction → aménagement → effet observable`.**

L’objectif devient observable lorsque l’élève :

1. choisit ce que le lieu doit permettre ;
2. ajoute une organisation compatible avec cette fonction ;
3. lit dans le croquis transformé l’effet correspondant ;
4. repère et remplace un maillon incohérent après un retour ciblé.

Il s’agit d’un objectif unique de construction de relation, pas de trois objectifs indépendants sur la place, le marché et le ruisseau.

## Ce que l’exercice n’établit pas

Le prototype n’établit pas :

- une compréhension durable ou un transfert autonome ;
- une maîtrise de `P56-O01–O03` ;
- l’atteinte de `AF-C2-05–09`, qui restent des horizons non bandés de fin de Cycle 2 ;
- la capacité d’identifier les découpages suisses et frontaliers de `AF-C2-06` ;
- une comparaison de lieux selon trois critères au sens de `AF-C2-08` ;
- un impact réel sur la qualité de vie, l’environnement ou l’économie ;
- qu’un choix correct est fondé sur le raisonnement plutôt que sur la position ou l’élimination ;
- une validation pédagogique par des élèves ou des enseignants.

Une complétion, un clic correct ou le passage du smoke automatisé ne constituent pas une preuve d’apprentissage.

## Prerequisites et vocabulaire nécessaire

### Prérequis

- Lire une phrase courte et repérer des éléments nommés dans un schéma simple.
- Comprendre qu’un lieu peut contenir plusieurs parties et plusieurs usages.
- Suivre une liaison ou reconnaître une interruption entre deux parties.
- Distinguer une action souhaitée d’un objet ajouté.
- Activer un bouton et reconnaître l’état textuel « Carte posée ».

### Vocabulaire défini en contexte

- **Fonction :** ce que le lieu doit permettre de faire.
- **Aménagement :** réalisation ou organisation ajoutée pour faciliter une fonction.
- **Effet observable :** changement que le croquis permet effectivement de constater après l’ajout.
- **Zone :** partie d’un espace à laquelle un usage ou une limite donne une organisation particulière.
- **Réseau :** ensemble de points reliés par un trajet commun.
- **Limite naturelle :** élément du milieu qui sépare ici deux parties, comme le ruisseau dans le schéma fictif.

Le mot *impact* est introduit prudemment dans le retour correct : il invite à examiner une autre conséquence, sans affirmer qu’elle se produit dans un lieu réel.

## Misconceptions and productive difficulty

Aucune réponse n’est qualifiée de misconception documentée par la source PER. Les éléments ci-dessous sont des **hypothèses de conception à observer**, pas des caractéristiques attribuées à un élève :

- choisir un objet attirant ou familier sans revenir à la fonction demandée ;
- croire qu’un aménagement est adéquat dès qu’il « fait quelque chose », même si cette action ne répond pas à la mission ;
- confondre **délimiter** une partie et **relier** plusieurs parties ;
- sélectionner l’effet souhaité sans vérifier l’état réellement représenté après l’ajout ;
- supposer qu’un but positif exclut tout autre impact ;
- réutiliser la même position de bouton au lieu de lire les relations, malgré l’ordre varié des options.

La difficulté productive consiste à coordonner trois représentations : une intention verbale, une réalisation spatiale et un état visible. Les difficultés accidentelles seraient une phrase trop longue, un symbole incompris, une cible imprécise, un ordre de tabulation peu clair ou un croquis qui se replie mal à 320 px. Elles doivent être observées séparément des erreurs de relation.

## Evidence of learning

Au-delà de la correction automatisée, des essais futurs chercheront les indices suivants :

- l’élève consulte la mission avant de choisir l’objet ;
- le choix du deuxième maillon provoque une inspection du croquis transformé ;
- le troisième maillon décrit l’état visible plutôt qu’un effet seulement souhaitable ;
- après une erreur mixte, l’élève change le maillon signalé plutôt que toutes les cartes au hasard ;
- la révision conserve les maillons déjà cohérents ;
- le contraste *délimiter / relier* est réutilisé dans le cas de collecte ;
- le cas du ruisseau est résolu en suivant les parties dans l’ordre, et non par reconnaissance du mot « passerelle » seul ;
- une verbalisation peut prendre la forme : « Cet aménagement convient parce qu’il relie ces parties ; je vois que… » ;
- l’élève peut distinguer l’effet directement visible d’un impact réel qui demanderait d’autres informations.

Le prototype ne collecte aucune justification. Une verbalisation éventuelle appartient au protocole d’observation en présence d’un adulte et ne doit pas être enregistrée par l’interface.

## Core interaction hypothesis

> Si l’élève pose successivement une **fonction**, un **aménagement** et un **effet**, tout en voyant le schéma changer au deuxième maillon et en recevant un retour sur le premier lien incohérent, alors la relation entre organisation spatiale, but et conséquence devient visible et révisable.

## Exercise loop

1. L’introduction distingue fonction, aménagement et effet et montre les commandes.
2. Une situation présente des parties, une relation manquante et une mission.
3. L’élève pose une carte de fonction.
4. L’élève pose une carte d’aménagement ; le croquis bascule immédiatement de l’état initial à l’état correspondant à cette réalisation.
5. L’élève choisit l’effet que le nouveau croquis permet d’observer.
6. Une action distincte **Vérifier les trois liens** engage la chaîne.
7. En cas d’incohérence, la chaîne soumise reste visible ; le retour nomme le premier lien rompu.
8. **Reprendre avec un indice** ouvre un échafaudage ciblé et conserve les cartes, que l’élève peut remplacer.
9. Une chaîne correcte reçoit une explication spécifique et un « regard d’impact » prudent.
10. Une action visible conduit à la variation suivante ; après trois variations correctes, une synthèse distincte apparaît.

Le choix d’une carte n’est jamais traité comme une soumission accidentelle. Il n’existe ni score, ni temps limite, ni progression automatique.

## Progression et variations délibérées

Les trois cas sont proches géographiquement mais font varier le type de partie, la relation et le but de l’aménagement :

| Ordre | Variation stable | Dimension conceptuelle | Fonction cible | Aménagement cible | Effet directement lisible |
|---|---|---|---|---|---|
| 1 | `place-pauses-passages` | Organiser deux zones d’usage tout en préservant un axe | permettre une pause et des rencontres sans couper la traversée | deux groupes de bancs au bord d’un passage central | deux zones d’assise apparaissent ; la liaison entre les rues reste continue |
| 2 | `collecte-halle-reseau` | Passer de points séparés à un réseau d’approvisionnement | relier trois points de collecte à la même halle | boucle balisée, trois arrêts et zone de déchargement | le même trajet dessert A, B, C et la halle ; il longe aussi des maisons |
| 3 | `ruisseau-sentiers-passage` | Franchir une limite naturelle en un point identifié | relier deux sentiers séparés par le ruisseau | passerelle alignée et munie de garde-corps | le trajet devient continu et le passage se concentre sur la passerelle |

La variation ne repose ni sur la vitesse ni sur un simple changement de noms. Elle passe de **zones dans une surface**, à **nœuds dans un réseau**, puis à **liaison à travers une limite naturelle**. Le type d’effet à examiner varie aussi : usage social et circulation, approvisionnement et nuisance possible, continuité de trajet et concentration du passage.

L’ordre des propositions correctes change entre les maillons et les situations afin de limiter une stratégie de position fixe.

## Feedback and scaffolding

### Principe général

Le validateur cherche le premier maillon incohérent dans l’ordre `fonction`, `aménagement`, `effet`. Le feedback ne dit jamais seulement « faux » : il cite la proposition soumise, la confronte aux parties du cas et nomme la relation à revoir. Le choix reste affiché dans l’état incorrect et encore posé dans l’état de retry.

### Récupération spécifique

| Cas | Si la fonction rompt la chaîne | Si l’aménagement rompt la chaîne | Si l’effet rompt la chaîne |
|---|---|---|---|
| Place | Revenir aux deux actions *s’arrêter* et *traverser*. | Chercher où l’on peut s’asseoir et par où l’on peut encore passer. | Suivre rue nord → rue sud puis compter les zones d’assise. |
| Collecte | Suivre A → B → C → halle et opposer séparer / relier. | Distinguer une limite qui entoure d’un trajet qui continue. | Compter les arrêts de la même ligne et regarder son arrivée, sans oublier les maisons. |
| Ruisseau | Nommer sentier → ruisseau → sentier et identifier la relation manquante. | Chercher une réalisation qui touche les deux rives. | Parcourir le trajet depuis l’ouest et nommer le point exact du franchissement. |

L’indice ne sélectionne aucune carte, ne révèle pas un identifiant de réponse et n’avance pas. Le retour correct explique pourquoi les trois éléments s’accordent. Le « regard d’impact » distingue l’effet présent dans le schéma d’une conclusion qui nécessiterait une enquête réelle.

## Content model

Tout le contenu est écrit et inspectable dans `Prototype.svelte`. Il n’existe aucune génération aléatoire.

### Modèle authored de chaque `Scenario`

Chaque scénario contient :

- un `id` de variation stable ;
- un folio, un lieu, une observation de départ, une mission et un cadre spatial ;
- deux cartes de fonction : une cible et une autre fonction plausible ;
- deux cartes d’aménagement : une compatible avec la cible et une réalisation qui organise autrement l’espace ;
- deux cartes d’effet : l’effet du croquis cible et celui de l’autre aménagement ;
- un croquis initial et deux croquis après ajout, tous décrits en texte, composés de groupes relationnels authored ; chaque groupe nomme ses nœuds et ses arêtes `passage`, `trajet`, `borde` ou `interrompu`, sans relier les groupes indépendants ;
- trois feedbacks d’erreur, un par famille de maillon ;
- trois indices de reprise ;
- un feedback correct et une note d’impact ;
- un ordre authored des deux chaînes complètes de l’alternative à gros bouton.

### Chaînes authored complètes

| Variation | Chaîne cible | Chaîne de contraste |
|---|---|---|
| Place | pause/rencontre + bancs latéraux/passage + assises et traversée | stationnement + cases centrales + centre occupé par les voitures |
| Collecte | relier A/B/C à la halle + boucle/arrêts/déchargement + réseau continu | isoler les points + barrières continues + points délimités mais non reliés |
| Ruisseau | relier les sentiers + passerelle/garde-corps + trajet continu au point de passage | embellir une rive + parterre + rive modifiée mais trajet interrompu |

### Règle de validité

Une chaîne est correcte si et seulement si ses trois choix sont les options `correct` du scénario courant. Toute combinaison mixte est incorrecte. Le retour vise le premier choix `incorrect` afin qu’une combinaison imprévue reste explicable sans écrire huit retours presque identiques. Cette règle est bornée : `2 × 2 × 2 = 8` chaînes possibles par scénario, soit 24 états de sélection inspectables.

La sélection d’une nouvelle carte remplace uniquement le choix du même maillon. La soumission est désactivée tant que les trois maillons ne sont pas remplis. Une mauvaise soumission ne change pas de scénario. La complétion n’est accessible qu’après une chaîne correcte dans chacune des trois variations.

### État du croquis

Le croquis dépend du maillon **aménagement**, et non du résultat du validateur :

- aucun aménagement posé → état initial ;
- aménagement cible posé → état spatial cible ;
- aménagement de contraste posé → autre état spatial.

Cette indépendance est importante : l’élève peut observer la conséquence avant de savoir si la chaîne est déclarée cohérente. Le troisième maillon doit décrire cet état, pas deviner un message de correction.

### Alternative visible de chaîne complète

Deux boutons ordinaires et visibles permettent de poser les trois cartes en une action. Chaque bouton affiche intégralement fonction, aménagement et effet et annonce qu’il **pose et vérifie** la chaîne selon les mêmes règles. Cette voie est destinée aux élèves pour qui six petites comparaisons successives ajoutent une charge motrice ou de navigation ; elle n’est ni cachée, ni réservée aux tests, ni une API de solution.

Cette alternative introduit un risque réel de réponse par élimination. Elle reste donc secondaire, est documentée comme hypothèse à tester et ne doit pas devenir la seule preuve pédagogique. La manipulation principale demeure la construction maillon par maillon avec croquis réactif.

### Ambiguity guards et cas limites

- Les options de contraste ne sont pas « absurdes » : elles ont une autre fonction identifiable, mais ne répondent pas à la mission.
- La fonction et l’effet ne sont pas traités comme synonymes : la première nomme le but, le dernier décrit l’état obtenu.
- Les croquis et les textes portent les mêmes parties et les mêmes relations.
- Aucun effet réel non représenté n’est nécessaire pour réussir.
- Les mentions de gêne ou d’environnement sont formulées comme points à examiner, jamais comme causalités démontrées.
- Aucun lieu réel, prix, distance, durée, donnée de trafic ou vérité locale n’est requis.
- Une chaîne vide ne peut pas être soumise par la voie principale.
- Recharger la page revient à l’introduction ; aucune réponse ne persiste.

## Interaction states

| État learner-visible | Contenu et transition | Marqueur `6H-SMOKE-1` |
|---|---|---|
| Introduction | But, vocabulaire, commandes et départ explicite | `data-smoke-state="intro"` |
| Active | Mission, croquis, trois groupes de cartes, submit et voie complète visible | `active` + variation |
| Incorrect | Chaîne soumise, symbole `✕`, premier maillon rompu, explication et retry | `incorrect` + variation |
| Retry | Même variation, cartes conservées, indice ciblé et submit disponible après révision | `retry` + variation |
| Correct | Chaîne confirmée, symbole `✓`, explication et regard d’impact | `correct` + variation |
| Continuation | Action volontaire vers un nouveau lieu ou la synthèse | `continuation` + variation |
| Complete | Stratégie résumée après trois variations, sans score ni revendication de maîtrise | `complete` |

Les tentatives smoke de la voie principale utilisent trois contrôles learner-visible avec les étapes contiguës `1`, `2`, `3` pour `data-smoke-attempt="incorrect"` et `data-smoke-attempt="correct"`, puis un unique bouton `data-smoke-action="submit"`. Les trois IDs de variation sont stables et distincts.

### Compatibilité des deux contrats de smoke

- Le `<main>` porte `data-smoke-contract="6h-v1"` et `data-exercise-id="EX-0309"`.
- Le wrapper extérieur porte les marqueurs historiques `data-smoke-root`, `data-smoke-exercise="EX-0309"`, `data-smoke-program="per-6h-msn-shs"` et son état `ready/question/incorrect/correct/complete`.
- Les deux grandes chaînes visibles portent respectivement `data-smoke-answer="incorrect"` et `data-smoke-answer="correct"`; elles appliquent le même validateur que le montage détaillé.
- Les paragraphes explicatifs visibles portent les marqueurs generic feedback détaillés.
- Les actions start, retry, continue et la région de complétion sont uniques dans leur état.

Aucun marqueur ne décore un contrôle masqué, un bouton désactivé de substitution ou une logique parallèle. Les attributs ne changent ni la règle de correction ni le contenu affiché.

## Accessibility and devices

### Clavier et focus

- Tous les choix sont des boutons natifs ; `Tab` suit l’ordre fonction → aménagement → effet → submit → chaînes complètes.
- `Entrée` et `Espace` utilisent le comportement natif du bouton.
- `aria-pressed` expose la carte courante ; le texte visible passe de `○ Poser cette carte` à `● Carte posée`.
- Un contour de focus de 4 px ne dépend pas de la couleur seule, car il ajoute aussi épaisseur et décalage.
- Une action Svelte locale place le focus sur la nouvelle région d’état ; il n’existe aucun piège de focus.
- Le croquis et la chaîne assemblée utilisent des régions visibles `aria-live="polite"` pour annoncer une mise à jour sans son.

### Toucher et pointeur

- Tous les boutons ont une hauteur minimale de 48 px ; les cartes principales sont nettement plus grandes.
- Les mêmes fonctions sont appelées au clavier, au toucher et au pointeur.
- Aucun glisser, survol, dessin, geste fin ou placement pixel-perfect n’est requis.
- Remplacer une carte constitue une annulation locale simple et ne déclenche jamais une erreur avant submit.

### Perception et langage

- Les états utilisent texte, symboles (`○`, `●`, `✕`, `✓`, `↺`), bordures et positions en plus des couleurs.
- Les croquis sont faits de listes de parties numérotées avec une description textuelle et un nom accessible ; aucune information essentielle n’est dans une image.
- Les phrases learner-facing sont courtes et les termes nécessaires sont définis avant le premier cas.
- Aucun état ne dépend du son, du survol, d’un délai ou d’un déplacement animé.

### 320 px et mouvement réduit

- À 560 px et moins, les colonnes, options, chaînes et récapitulatifs deviennent une pile.
- À 320 CSS px, les paddings restent bornés, les éléments ont `min-width: 0`, les mots peuvent revenir à la ligne et le root coupe tout débordement horizontal décoratif.
- Les commandes requises restent dans le flux vertical et ne sont jamais masquées par un panneau fixe.
- La feuille `prefers-reduced-motion: reduce` supprime animation, transition, transformation et défilement animé. Le prototype ne comporte de toute façon aucune animation essentielle.

## Prototype boundaries

### Included

- Un objectif observable et une boucle complète sur trois variations.
- Une construction en trois maillons avec conséquence visuelle au deuxième.
- Des contrastes entre zone, réseau et franchissement.
- Un feedback spécifique, un retry ciblé et une synthèse sans score.
- Les deux surfaces de smoke sur les mêmes contrôles learner-visible.
- Des schémas CSS/texte entièrement originaux.

### Excluded

- Cartes officielles, géolocalisation, noms de communes et données territoriales réelles.
- Mesure d’impact, enquête de terrain ou conclusion environnementale.
- Couverture exhaustive des catégories d’aménagement de `P56-O02`.
- Évaluation de tous les découpages de `AF-C2-06` ou comparaison formelle de `AF-C2-08`.
- Monde ouvert, génération de situations, score, chronomètre ou classement.
- Identité, profil, analytics, télémétrie, cookies, persistence ou envoi de résultats.
- Import de composant d’un autre exercice, de code de l’application de classe ou d’un moteur partagé.

`Prototype.svelte` est autonome et n’effectue aucun import, appel réseau, accès storage ou enregistrement de service worker. Seul `exercise.ts` utilise le helper local obligatoire du catalogue. Aucun média externe ou asset sous licence n’est nécessaire.

## Observation plan

### Données qualitatives à observer lors de futurs essais autorisés

Pour chaque situation, noter sans profil persistant :

- l’ordre réel de consultation : mission, cartes, croquis ;
- le maillon choisi en premier et les changements avant submit ;
- si le croquis est regardé après le choix d’aménagement ;
- le premier maillon modifié après feedback ;
- une éventuelle verbalisation de la relation entre deux parties ;
- le recours à la voie détaillée ou à la chaîne complète ;
- les signes de stratégie de position, d’élimination ou de lecture partielle ;
- les hésitations de focus, les taps manqués, les retours à la ligne gênants et les mots incompris ;
- la distinction faite entre effet visible et impact à vérifier.

### Ce qui soutiendrait l’hypothèse

L’hypothèse serait soutenue si plusieurs élèves :

- utilisent le croquis transformé pour choisir l’effet ;
- révisent le maillon signalé sans recomposer au hasard ;
- expliquent *relier*, *délimiter* ou *franchir* à partir des parties visibles ;
- maintiennent la stratégie dans le troisième cas, malgré le passage d’un réseau de points à une limite naturelle ;
- peuvent dire qu’un autre impact demanderait des informations supplémentaires.

### Ce qui l’affaiblirait

L’hypothèse serait affaiblie si :

- le mot « passerelle » ou l’apparence des cartes suffit sans lecture des relations ;
- la voie complète devient une simple question binaire par élimination ;
- le croquis change mais n’est pas remarqué ;
- l’indice donne implicitement la réponse plutôt qu’un outil de lecture ;
- les élèves changent toujours les trois cartes après une erreur ciblée ;
- la densité textuelle ou la mise en page empêche de manipuler la chaîne ;
- les effets possibles sont interprétés comme des faits réels garantis.

### Distinguer erreur de concept et friction d’interface

Avant d’interpréter une réponse, demander à l’élève de montrer quelle carte est posée et ce que le bouton fera. Une relation correctement expliquée oralement mais mal activée sera codée comme friction de contrôle, pas comme erreur conceptuelle. À l’inverse, une activation fluide suivie d’une justification qui confond « entourer » et « relier » sera une réponse conceptuelle à examiner. Les erreurs de lecture, de focus et de toucher seront consignées séparément du premier maillon incohérent.

Aucun de ces éléments n’est collecté automatiquement par le prototype.

## Remaining pupil-testing hypotheses

- Trois maillons sont-ils une charge de mémoire appropriée en 6H, même avec la chaîne toujours visible ?
- Le mot *fonction* est-il compris grâce à « ce que le lieu doit permettre » ou nécessite-t-il un exemple corporel ?
- Le changement du croquis est-il assez perceptible sans mouvement ?
- Les élèves distinguent-ils l’effet observable d’un impact futur ou supposé ?
- Le contraste place / stationnement est-il trop normatif ou suffisamment centré sur la mission ?
- La boucle de collecte et la présence des maisons ajoutent-elles trop d’informations ?
- La voie complète améliore-t-elle l’accès ou encourage-t-elle surtout l’élimination ?
- Les lignes de connexion de la carte restent-elles compréhensibles lorsque les nœuds se replient sur deux colonnes à 320 px ?
- Le focus programmatique sur la région d’état est-il utile ou surprenant pour les utilisateurs de lecteur d’écran ?

## Findings and decisions

- **2026-07-15 — Implémentation initiale :** création de trois cas authored, du validateur borné, des états de récupération et des deux surfaces de smoke. Statut conservé à `prototyping`.
- **2026-07-15 — Décision de mécanique :** retenir trois sélections indépendantes et un submit explicite plutôt qu’un drag de cartes. La conséquence spatiale reste visible au moment du deuxième maillon.
- **2026-07-15 — Décision de contenu :** utiliser une fonction de contraste cohérente plutôt qu’un objet absurde ; l’erreur doit porter sur l’adéquation à la mission.
- **2026-07-15 — Décision d’honnêteté :** formuler les impacts comme des éléments à examiner. Un schéma fictif ne démontre pas une amélioration sociale ou environnementale réelle.
- **2026-07-15 — Décision d’accessibilité :** exposer une alternative complète visible à gros boutons, tout en documentant son risque d’élimination.
- **2026-07-15 — Limite de preuve :** aucun essai avec des élèves ni revue curriculaire indépendante n’a eu lieu.

## Promotion criteria

Une proposition de passage à `testing` exigera d’abord :

1. une revue indépendante de la trace `P56-00`, `P56-O01–O03`, `AF-C2-05–09` et de leur statut ;
2. la réussite des parcours filtrés clavier, toucher à 320 px et mouvement réduit, sans réseau ni persistance ;
3. la vérification que les trois lentilles du cluster ont des finalités et mécaniques distinctes ;
4. l’absence de blocker d’accessibilité, de contenu ambigu ou de marqueur smoke non learner-visible.

Toute promotion ultérieure vers l’application de classe devra en plus s’appuyer sur des essais autorisés avec plusieurs élèves de 6H montrant que :

- le croquis est réellement utilisé pour coordonner les trois maillons ;
- un feedback ciblé permet une révision raisonnée ;
- les réponses ne reposent pas principalement sur la position ou l’élimination ;
- les frictions d’interface sont distinguables des erreurs de relation ;
- les formulations d’impact ne sont pas reçues comme des vérités garanties ;
- un enseignant et une personne compétente sur le curriculum jugent les scénarios précis et appropriés.

Même si ces critères techniques sont satisfaits, le statut `validated` restera interdit sans preuves documentées d’essais d’élèves et autorisation prévue par le programme.
