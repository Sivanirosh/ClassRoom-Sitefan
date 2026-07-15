# EX-0319 — La boussole des mini-plans

## Decision summary

Cette étude de pratique demande de déplacer un jeton depuis un repère nommé sur trois plans déjà construits mais diversement orientés. La stratégie stable est de lire la flèche du nord, traduire la direction cardinale en un déplacement sur la page, puis vérifier la cible avec la légende. Le prototype observe une pratique guidée et révisable ; il ne certifie pas l’orientation autonome hors interface.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / `6H`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source IDs:** `src-per-0002`
- **Canonical cluster ID:** `geo56-represent-map` — *Schématiser, repérer, orienter, localiser*
- **Canonical statement IDs:** `PER-C2-GEO-P56-00`, `PER-C2-GEO-P56-I03`, `PER-C2-GEO-P56-R01`, `PER-C2-GEO-P56-R02`, `PER-C2-GEO-AF-C2-14`, `PER-C2-GEO-AF-C2-15`

### PER evidence

La matrice de couverture finalisée associe les six énoncés ci-dessus au cluster. `PER-C2-GEO-P56-00` est la progression 5H–6H qui encadre le travail par un espace vécu, fréquenté ou documenté de la région proche. `PER-C2-GEO-P56-I03` est une progression 5H–6H sur schéma, plan ou maquette, légende pertinente et lisibilité. `PER-C2-GEO-P56-R01` est une progression 5H–6H sur l’identification de repères, la relation réalité–documents et les conventions. `PER-C2-GEO-P56-R02` est une progression 5H–6H sur le choix et l’orientation des outils ainsi que la localisation sur des représentations à différentes échelles.

`PER-C2-GEO-AF-C2-14` et `PER-C2-GEO-AF-C2-15` sont des **attentes de fin de Cycle 2 non bandées**, utilisables ici comme direction de conception ou repère diagnostique seulement. Elles ne sont pas des objectifs obligatoires de fin de 6H. La source ne contient aucun endpoint géographique explicitement marqué 6H. Références : `src-per-0002`, PDF PER pp. 70, 74, 78–79, et `experiments/curriculum/research/6h-geography-coverage.md`.

### Design interpretation

Le PER ne prescrit ni une grille 3 × 3, ni un déplacement d’une case, ni les lieux fictifs et symboles du prototype. Le design isole une stratégie de pratique : **repère de départ → flèche du nord → direction cardinale → cible confirmée par la légende**. La rotation du plan, plutôt que le nombre de pas ou la vitesse, porte la variation conceptuelle.

## Learning objective

Depuis un lieu nommé, l’élève localise un lieu voisin en transformant une direction cardinale en déplacement sur un plan dont le nord n’est pas toujours en haut.

## Prerequisites

- Reconnaître nord, est, sud et ouest dans une consigne courte.
- Distinguer haut, droite, bas et gauche sur la page.
- Lire une légende de quatre symboles textuels.
- Maintenir un point de départ nommé pendant un déplacement unique.

Les relations utiles restent affichées. L’activité n’exige ni boussole physique ni connaissance d’un lieu réel.

## Misconceptions and productive difficulty

Ce sont des **hypothèses de conception** à observer, et non des profils d’élèves documentés :

- traiter le haut de l’écran comme le nord sans lire la flèche ;
- déplacer le jeton vers le mot demandé sans vérifier la direction cardinale ;
- repartir d’une case saillante au lieu du repère central nommé ;
- utiliser la forme du symbole sans consulter sa légende.

La difficulté productive est la conversion entre direction cardinale et direction sur la page quand le plan pivote. Une icône incomprise, un ordre de tabulation déroutant, une cible trop petite ou un texte qui déborde est une friction d’interface à traiter séparément.

## Evidence of learning

Le prototype permet d’observer :

- la direction de déplacement choisie avant la soumission ;
- la correction d’un déplacement opposé après un scaffold qui fait relire la flèche du nord ;
- le maintien du point de départ sur les trois cas ;
- l’usage conjoint de la direction et de la légende plutôt qu’une reconnaissance décorative ;
- le transfert de la stratégie à des rotations haut, droite et bas du nord.

Un bon taux de complétion, un clic correct ou un test automatisé ne prouvent pas cette coordination.

## Core interaction hypothesis

> Si l’élève déplace un jeton depuis un repère stable tout en reliant la flèche du nord, une direction cardinale et un symbole de légende, alors une stratégie de localisation reste utilisable lorsque le plan pivote.

## Exercise loop

1. Lire le point de départ, la direction et le lieu à trouver.
2. Inspecter la flèche du nord et la légende du mini-plan.
3. Déplacer le jeton d’une case avec quatre boutons directionnels ou choisir directement une case nommée, alternative visible utilisant la même règle.
4. Soumettre la position volontairement.
5. En cas d’erreur, comparer direction cardinale et page, puis réinitialiser le jeton au départ.
6. En cas de réussite, lire pourquoi la rotation et la légende concordent, puis continuer.
7. Après trois rotations, atteindre une synthèse sans score ni revendication de maîtrise.

## Progression

Trois cas authored font varier la relation pertinente :

1. **`square-north-up` — échanges :** nord vers le haut ; depuis l’arrêt central, la fontaine à l’est demande un déplacement à droite. Le premier cas stabilise la stratégie.
2. **`park-north-right` — loisirs :** nord vers la droite ; depuis la place centrale, le terrain à l’ouest se trouve en haut de la page. La direction cardinale et la page ne coïncident plus.
3. **`market-north-down` — approvisionnement :** nord vers le bas ; depuis la bibliothèque, le marché à l’est se trouve à gauche de la page. Le plan effectue une seconde rotation distincte.

Les symboles et thèmes changent avec la légende, mais la rotation, le point de départ et la direction cible — non le décor — constituent la variation principale. Chaque cible est adjacente afin que l’erreur observée concerne l’orientation, pas la mémoire d’une longue suite.

## Feedback and scaffolding

- Le résultat incorrect affiche le mouvement soumis, un signe `↺` et une explication propre à la rotation courante.
- Le scaffold demande de poser mentalement le doigt sur la flèche du nord puis de faire un quart de tour vers la direction demandée ; il ne déplace pas le jeton et ne donne pas le bouton final.
- La reprise remet le jeton au repère central, conserve le même cas et rend tous les boutons disponibles.
- Le retour correct garde le déplacement lisible, nomme le repère de départ, la direction et la cible de légende.
- La continuation attend une action explicite après lecture.

## Content model

Le composant contient exactement trois objets avec : identifiant stable, thème, point de départ, instruction, orientation textuelle et glyphe de la flèche du nord, quatre lieux adjacents et leurs symboles, déplacement correct, déplacement incorrect planifié, feedbacks, scaffold et règle synthétique.

Règles :

- un déplacement remplace le jeton dans l’une des quatre cases adjacentes ;
- la soumission est désactivée tant qu’aucun déplacement n’a été choisi ;
- le déplacement est correct seulement s’il égale `correctMove` du cas courant ;
- l’alternative de cases complètes appelle la même validation avec un déplacement explicitement nommé ;
- le retry remet `selectedMove` à `null` et `position` à `center` ;
- la continuation ne peut suivre qu’un résultat correct et la complétion ne survient qu’après les trois cas.

Gardes d’ambiguïté : une seule cible porte le symbole demandé ; le départ est toujours nommé au centre ; chaque direction ne demande qu’un pas ; l’orientation est donnée à la fois par texte et par flèche ; aucune distance réelle n’est inférée ; les lieux sont fictifs et bornés.

## Interaction states

- **Introduction / `intro` :** méthode, vocabulaire et bouton de départ.
- **Active / `active` :** plan, légende, jeton au départ et contrôles directionnels.
- **Decision :** soumission explicite du déplacement.
- **Incorrect / `incorrect` :** déplacement soumis, retour relationnel et retry.
- **Retry / `retry` :** jeton réinitialisé, indice visible et même variation.
- **Correct / `correct` :** preuve textuelle et visuelle de la localisation.
- **Continuation :** action visible vers la rotation suivante.
- **Complete :** synthèse de la stratégie après trois variations.

Le chemin `6H-SMOKE-1` suit `intro → active → incorrect → retry → correct + continuation` sur les trois IDs authored avant `complete`. Dans chaque plan, un seul vrai bouton directionnel porte le marqueur de tentative incorrecte et un autre le marqueur correct ; le jeton se déplace réellement, puis le bouton `submit` applique la règle `selectedMove === correctMove`.

L’ancêtre historique non rendu (`display: contents`) emploie les deux cases nommées visibles comme alternative motrice grossière. Leur ordre alterne au deuxième plan et elles appellent `directSubmit`, qui déplace le même jeton puis appelle `submitMove`; elles ne contournent ni la règle, ni le feedback, ni le retry, ni la suite. Il n’existe aucun contrôle caché ou chemin réservé au test.

## Accessibility and devices

- Les déplacements utilisent quatre boutons natifs de 48 px minimum ; les touches `Tab`, `Entrée` et `Espace`, le pointeur et le toucher suivent la même logique.
- Aucun glisser, dessin, survol ou geste fin n’est requis. L’alternative de placement direct est visible et utilise les mêmes lieux.
- La position du jeton est annoncée en texte et par le symbole `●`; `aria-pressed` expose le dernier déplacement.
- La flèche du nord possède un libellé textuel ; les symboles de légende ne sont jamais la seule source du nom.
- Le focus est visible et réorienté vers le titre de l’état après feedback, retry, continuation et complétion.
- Les états emploient texte, `↺`/`✓`, bordures et titres en plus des couleurs.
- Sous 600 px, carte, légende et contrôles s’empilent ; à 320 px chaque bouton reste dans le viewport sans défilement horizontal.
- Sous `prefers-reduced-motion: reduce`, transitions et transformations non essentielles sont retirées. Aucun son ni délai n’est utilisé.

## Prototype boundaries

### Included

- Trois plans locaux fictifs à grille bornée.
- Quatre directions de page, une flèche du nord et une légende textuelle par cas.
- Déplacement discret, soumission, feedback spécifique, scaffold, continuation et complétion.
- Marqueurs de fumée sur les contrôles et états visibles ordinaires.

### Excluded

- Navigation multi-étapes, coordonnées, distances, calcul d’échelle ou vraie carte.
- Géolocalisation, capteurs, réseau, stockage, télémétrie ou envoi de résultat.
- Score, chronomètre, classement, profil d’erreur persistant ou affirmation de maîtrise.
- Contenus cantonaux ou MER traités comme normatifs.

## Observation plan

Observer l’ordre réel de consultation : point de départ, flèche du nord, direction, légende. L’hypothèse est soutenue si les rotations droite et bas restent résolubles par cette stratégie et si le retry conduit à une correction expliquée. Elle est affaiblie si les réponses reposent sur la position habituelle des boutons, si le jeton masque les lieux, si la légende n’est pas consultée ou si la rotation de la page ajoute une charge sans rendre l’orientation plus claire.

Séparer : choix cardinal opposé malgré une reformulation (erreur conceptuelle possible), oubli du point de départ, mauvaise lecture d’un symbole, ordre de focus, cible hors écran, activation accidentelle et fatigue de lecture. Hypothèses restant à tester : une seule case suffit-elle pour rendre la stratégie visible ? Le mot « ouest » est-il stable pour le public visé ? La flèche textuelle et graphique est-elle comprise sans démonstration supplémentaire ?

## Findings and decisions

- **2026-07-15 — Décision d’implémentation :** un seul pas par plan maintient le diagnostic sur l’orientation plutôt que sur la mémoire d’itinéraire.
- **2026-07-15 — Variation :** le nord pivote réellement entre haut, droite et bas ; les changements de lieux et symboles ne sont pas considérés seuls comme de la variation.
- **2026-07-15 — Distinction de lentille :** cette pratique navigue sur des plans fournis ; elle ne reconstruit pas le calque de EX-0318 et ne choisit pas l’outil de EX-0320.

## Promotion criteria

Le passage éventuel à `testing` nécessite la revue indépendante du trio, l’inspection de tous les cas, l’absence d’erreur de rotation, et la réussite des parcours clavier, pointeur, toucher 320 px, reduced motion et automatisés. Une promotion ultérieure exigerait des observations d’élèves et une revue enseignante/curriculaire autorisée montrant que la stratégie est verbalisable, qu’elle résiste aux rotations sans indices d’interface involontaires et que les erreurs ne viennent pas de la légende ou du contrôle. Cette implémentation reste `prototyping`.
