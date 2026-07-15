# EX-0310 — La table des calques utiles

## Decision summary

Cette étude stabilise la stratégie **fonction → limite → réseau → effet** sur trois plans fictifs de la région proche. L’élève superpose une délimitation, une liaison et une conséquence à l’aide de grands boutons, vérifie leur cohérence, puis reprend le premier calque qui ne suit pas la mission. Cette pratique mérite d’être testée parce qu’elle fait varier la nature des limites et des réseaux sans transformer les notions de zone, relation et aménagement en une suite de questions de vocabulaire.

## Curriculum alignment

- **Framework :** PER, Cycle 2
- **Année du catalogue et du prototype :** `6H` uniquement
- **Statut :** `prototyping`
- **Lentille :** `lens-practice` uniquement
- **Cluster canonique :** `geo56-spatial-organization`
- **Titre de cluster :** *Parties, zones, réseaux, aménagements, impacts*
- **Objective codes :** `SHS 21`, `SHS 23`
- **Source ID canonique :** `src-per-0002`
- **Traçabilité :** `experiments/curriculum/mappings/6h-coverage-matrix.json` et `experiments/curriculum/research/6h-geography-coverage.md`
- **Pages imprimées mobilisées :** PER Cycle 2 v3.0, août 2024, pp. 70 et 74–77.

### PER evidence

Les quatre énoncés ci-dessous sont des **progressions 5H–6H** dans la matrice finalisée :

| Statement ID | Statut | Compte curriculaire concis |
|---|---|---|
| `PER-C2-GEO-P56-00` | progression 5H–6H, cadre partagé | Le champ est un espace vécu, fréquenté ou documenté de la région proche, relié lorsque pertinent à des espaces plus lointains. |
| `PER-C2-GEO-P56-O01` | progression 5H–6H, relation cross-cluster | Identifier les parties d’un lieu, leurs relations, leurs fonctions et leurs utilisations. |
| `PER-C2-GEO-P56-O02` | progression 5H–6H, relation primaire | Localiser ou identifier des aménagements qui servent notamment à délimiter, relier, approvisionner, sécuriser ou réduire des nuisances. |
| `PER-C2-GEO-P56-O03` | progression 5H–6H, relation primaire | Identifier quelques impacts environnementaux, sociaux et économiques liés aux activités humaines et à l’aménagement. |

Les cinq énoncés suivants sont des **attentes non bandées de fin de Cycle 2**, à usage `directional-or-diagnostic-only` dans la matrice :

- `PER-C2-GEO-AF-C2-05` — délimiter des zones ;
- `PER-C2-GEO-AF-C2-06` — identifier des découpages politiques, économiques, linguistiques et naturels en Suisse ou en zone frontalière ;
- `PER-C2-GEO-AF-C2-07` — relier des aménagements et leurs buts ;
- `PER-C2-GEO-AF-C2-08` — comparer deux lieux selon au moins trois critères ;
- `PER-C2-GEO-AF-C2-09` — relier aménagements et impacts sur la qualité de vie ou l’environnement.

La source canonique ne marque **aucune attente fondamentale de géographie comme point d’arrivée explicite 6H**. Le prototype travaille donc des progressions 5H–6H et utilise `AF-C2-05–09` comme horizons de conception ; il ne les présente jamais comme des acquis obligatoires en fin de 6H. En particulier, il n’évalue ni les découpages suisses de `AF-C2-06`, ni une comparaison formelle de deux lieux selon trois critères au sens de `AF-C2-08`.

SHS 23 est intégré aux démarches de SHS 21. Les plans et la lecture des relations servent cette intégration ; le prototype ne transforme pas SHS 23 en objectif isolé.

### Design interpretation

Le PER ne prescrit ni la table de calques, ni les grilles de neuf cases, ni les trois lieux, ni les choix et feedbacks. Le design interprète les progressions en demandant de coordonner quatre questions stables : à quoi servent les parties, où s’arrête la zone, quelles parties le réseau relie, et quel effet le plan permet réellement d’affirmer.

Les lieux et données sont originaux et fictifs. La cour, les jardins et la halle ne représentent aucune commune réelle. Les symboles, horaires et relations servent seulement un modèle borné ; ils ne constituent pas des faits territoriaux à mémoriser.

### Tags de traçabilité

`exercise.ts` porte `program-per-6h`, `cluster-geo56-spatial-organization`, exactement `lens-practice` et les neuf tags normalisés :

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

**Délimiter une zone à partir de sa fonction, choisir le réseau qui la relie utilement, puis associer un effet directement soutenu par le plan dans trois organisations proches.**

L’objectif est observable dans l’assemblage de trois calques, la soumission distincte, la révision du premier lien incohérent et la réutilisation de la même stratégie quand la limite devient construite, naturelle puis temporelle.

## Ce que l’exercice n’établit pas

Le prototype n’établit ni compréhension durable, ni transfert autonome, ni maîtrise de `P56-O01–O03`. Il n’établit aucune des attentes `AF-C2-05–09` comme endpoint 6H, ne mesure pas un impact réel et ne valide pas la capacité à dessiner une zone. Une complétion, une activation correcte ou un smoke automatisé ne prouvent pas l’apprentissage. Aucun essai avec des élèves n’a encore eu lieu.

## Prerequisites

- Lire un plan schématique de neuf grandes cases nommées.
- Comprendre les relations *inclure*, *rester hors de*, *traverser* et *relier*.
- Distinguer la fonction d’une partie de son apparence.
- Comprendre qu’une limite peut être construite, naturelle ou liée à un horaire.
- Distinguer un réseau de liaison d’une simple suite d’objets.
- Utiliser des boutons à état persistant et engager une réponse par un bouton de validation.

### Vocabulaire gardé visible

- **Zone :** partie d’un espace dont les éléments partagent ici une fonction.
- **Limite :** bord qui rend cette zone repérable ; il peut être matériel, naturel ou temporel.
- **Réseau :** lieux ou parties reliés par des voies ou des flux.
- **Aménagement :** réalisation ou organisation mise en place pour un but.
- **Effet :** conséquence que les calques assemblés permettent de constater sans inventer une information absente.

## Misconceptions and productive difficulty

Aucune misconception n’est documentée comme fait par la source PER. Les réponses suivantes sont des **hypothèses de conception à observer** :

- regrouper des cases parce qu’elles ont une apparence semblable plutôt qu’une fonction commune ;
- confondre une limite qui entoure et un réseau qui relie ;
- choisir le trajet le plus court sans vérifier les parties traversées ;
- prendre un effet désirable pour un effet démontré par le plan ;
- ignorer qu’une même surface peut changer de fonction selon l’horaire ;
- répéter une position de bouton plutôt que la stratégie, malgré l’ordre variable des propositions.

La difficulté productive consiste à coordonner trois calques avec une fonction donnée. La difficulté accidentelle serait de ne pas percevoir l’état sélectionné, de ne pas comprendre les symboles, de perdre le focus ou de devoir viser une case fine. Le prototype emploie donc des boutons natifs, de grandes cibles et une description textuelle de chaque calque.

## Evidence of learning

Au-delà de la correction, de futurs essais chercheraient à observer si l’élève :

- nomme d’abord la fonction des cases avant de tracer mentalement une zone ;
- suit chaque destination du réseau au lieu de reconnaître seulement son nom ;
- utilise simultanément la limite et la liaison pour choisir l’effet ;
- révise le calque cité par le feedback sans changer les trois au hasard ;
- maintient la stratégie avec une limite végétale puis un créneau horaire ;
- peut expliquer « cette case est dedans parce que… » et « ce trajet convient parce qu’il relie… » ;
- distingue ce que le plan montre d’une conséquence réelle qui demanderait une enquête.

Le composant ne recueille ni parole, ni justification libre, ni observation. Ces indices relèvent d’un futur protocole accompagné.

## Core interaction hypothesis

> Si l’élève superpose une **limite**, un **réseau** et un **effet** tout en gardant la fonction comme point de départ, puis reçoit un retour sur le premier calque incohérent, alors une stratégie stable de lecture des relations spatiales peut devenir visible et réutilisable dans des cas variés.

## Exercise loop

1. L’introduction définit les quatre repères et les commandes.
2. Un plan présente neuf parties, une fonction et une mission.
3. L’élève choisit une délimitation ; les cases concernées portent le texte visible `zone`.
4. L’élève choisit un réseau ; les cases reliées portent le texte visible `liaison`.
5. L’élève associe un effet puis engage l’assemblage avec **Vérifier les trois calques**.
6. Une erreur conserve les trois choix, nomme le premier lien incohérent et explique la relation à reprendre.
7. **Reprendre avec la méthode** ouvre un échafaudage, garde l’essai posé et permet de remplacer le calque signalé sans reconstruire les liens déjà cohérents.
8. Une réponse cohérente explique la zone, le réseau et l’effet propres au cas.
9. Une action visible ouvre la variation suivante.
10. Après trois plans, un écran distinct résume la stratégie sans score ni affirmation de maîtrise.

L’alternative visible de deux plans complets utilise les mêmes règles de soumission. Elle sert une lecture groupée à gros boutons et la compatibilité du pilote générique ; elle n’est ni cachée ni réservée au test.

## Progression

Les trois variations changent une dimension conceptuelle, et pas seulement les noms :

| Variation | Limite | Réseau | Relation et effet travaillés |
|---|---|---|---|
| `cour-calme` | ligne au sol et bacs bas autour d’une zone calme | chemin piéton depuis la porte | réunir des usages calmes et éviter le croisement avec les jeux de ballon |
| `jardins-bief` | ruisselet et lisière végétale autour de la zone cultivée | rigoles de la citerne aux trois planches | approvisionner les parties cultivées tout en gardant la prairie humide hors de la culture |
| `halle-creneau` | hachures actives entre 6 h et 8 h | voie latérale entre route régionale, porte et quai | atteindre le quai pendant le créneau sans traverser les étals |

La représentation varie aussi : partage d’usages sociaux, zone de culture bordée naturellement, puis limite temporelle et liaison local–régional. Aucun temps de réponse n’est imposé.

## Feedback and scaffolding

Le validateur compare dans l’ordre `boundary`, `network`, `effect` et explique le premier calque incohérent :

- **Limite :** il cite les parties réunies et rappelle que la fonction, non la couleur ou l’apparence, définit la zone.
- **Réseau :** il suit les cases réellement traversées et nomme la destination manquante ou la zone coupée.
- **Effet :** il confronte l’affirmation aux deux calques déjà posés et refuse une conséquence non documentée.

L’état incorrect garde l’assemblage envoyé. La reprise affiche sa trace et un indice propre au cas, mais ne sélectionne aucune réponse. Le retour correct explique pourquoi les trois calques se soutiennent et mentionne les limites de ce que le plan permet de conclure.

## Content model

Tout le contenu est authored dans `Prototype.svelte` ; aucune génération ni requête n’intervient.

Chaque `PlanStudy` contient :

- un identifiant stable, un titre, un contexte, une mission et une fonction ;
- trois descriptions du type de limite, réseau et effet ;
- exactement neuf `MapCell` avec coordonnée, symbole et nom ;
- deux délimitations, deux réseaux et deux effets ;
- un assemblage exact valide et un assemblage déterministe de contraste ;
- un feedback pour chaque famille de calque, un échafaudage et un retour correct.

### Valid-answer rules

Un assemblage est correct si et seulement si ses trois identifiants sont ceux de `study.correct`. Toute combinaison mixte est non réussie et reçoit le feedback du premier écart dans l’ordre limite → réseau → effet. Les trois choix doivent être présents avant que la soumission principale soit activée. La reprise n’avance jamais automatiquement.

### Ambiguity guards

- Les propositions de contraste sont plausibles mais répondent à une autre organisation ; elles ne reposent pas sur une absurdité.
- Les cellules incluses par chaque calque sont explicitement écrites et finies.
- Une apparence commune ne suffit jamais à définir une zone ; la fonction est donnée.
- Les effets valides décrivent seulement ce que les limites et liaisons affichées soutiennent.
- Le cas de la halle écrit l’horaire ; aucune lecture d’horloge implicite n’est requise.
- Les plans ne sont pas à l’échelle et aucune distance n’est estimée.
- Les lieux sont fictifs ; aucun savoir local n’est nécessaire.
- Recharger la page restaure l’introduction et ne conserve aucune réponse.

L’espace borné comporte `2 × 2 × 2 = 8` assemblages par variation, soit 24 combinaisons inspectables.

## Interaction states

- **Introduction / `intro` :** objectif, stratégie, vocabulaire et départ.
- **Active / `active` :** plan, mission, calques manipulables et décision explicite.
- **Incorrect / `incorrect` :** assemblage soumis, symbole `△`, texte spécifique et bouton de reprise.
- **Retry / `retry` :** même variation, trace de l’essai, indice et nouveaux contrôles.
- **Correct / `correct` :** symbole `✓`, explication spécifique et plan cohérent.
- **Continuation / `continuation` :** action volontaire vers le plan suivant.
- **Complete / `complete` :** synthèse après trois variations.

La voie principale expose les étapes contiguës `1`, `2`, `3` pour les tentatives marquées, puis un unique `data-smoke-action="submit"`. Le `<main>` porte `data-smoke-contract="6h-v1"` et `data-exercise-id="EX-0310"`. Le wrapper de compatibilité générique porte `data-smoke-root`, l’ID, le programme et l’état `ready/question/incorrect/correct/complete`. Les deux plans complets visibles portent les réponses génériques correct/incorrect et appellent le même validateur. Les feedbacks, retry, continuation et complétion sont partagés, pas dupliqués dans une voie test-only.

## Accessibility and devices

- Toutes les actions utilisent des boutons natifs ; `Tab`, `Entrée` et `Espace` gardent leur comportement standard.
- `aria-pressed`, les mots `posé`, les symboles `✓`, les bordures et les libellés rendent la sélection perceptible sans couleur.
- Les cellules portent visiblement `zone` et `liaison` lorsque les calques les concernent ; le plan complet possède aussi une description accessible textuelle.
- Les cibles principales mesurent au moins 48 px et aucun dessin, glissement, survol ou geste précis n’est requis.
- Le focus est visible et les titres d’état peuvent recevoir le focus après transition.
- Les feedbacks sont textuels et annoncés ; aucun son ou mouvement n’est essentiel.
- À 320 px, les colonnes et grilles se replient, les cartes occupent la largeur disponible et les libellés reviennent à la ligne sans panning horizontal.
- `prefers-reduced-motion: reduce` supprime transitions et animations décoratives sans enlever d’état ni de commande.
- Toucher, pointeur et clavier utilisent exactement les mêmes fonctions de composant.

## Prototype boundaries

### Included

- Un objectif observable et trois plans authored.
- Une stratégie constante avec limites construite, naturelle et temporelle.
- Un réseau piéton, un réseau d’eau et une liaison de livraison local–régional.
- Une boucle incorrect → reprise → correct → continuation → achèvement.
- Les marqueurs de smoke sur des contrôles visibles et ordinaires.

### Excluded

- Dessin libre de zones, mesure de distances et carte officielle.
- Découpages administratifs réels, données communales ou savoir cantonal.
- Mesure d’impact social, environnemental ou économique réel.
- Évaluation exhaustive de `AF-C2-05–09`.
- Monde ouvert, contenu aléatoire, score, chronomètre ou classement.
- Identité, analytics, cookies, stockage, persistance, réseau ou soumission de résultat.
- Import de l’application de classe, d’un exercice voisin ou d’un runtime partagé.

## Observation plan

Lors de futurs essais autorisés, observer : l’ordre de consultation fonction/plan/options ; les cases nommées avant la délimitation ; le trajet suivi du doigt ou du regard ; le premier calque changé après feedback ; la compréhension de la limite horaire ; le recours à l’assemblage détaillé ou aux plans complets ; les stratégies de position ; les difficultés de lecture, focus et toucher.

L’hypothèse serait soutenue si plusieurs élèves utilisent la fonction pour former la zone, suivent toutes les destinations du réseau, choisissent un effet à partir des deux calques et maintiennent la stratégie dans le troisième cas. Elle serait affaiblie si la réussite vient d’une position fixe, si la zone est choisie par couleur, si l’effet est deviné par désirabilité, si l’indice donne la réponse ou si la voie de plans complets réduit l’étude à un choix binaire.

Pour distinguer concept et interface, demander avant l’interprétation ce que fera le bouton et quelle option est actuellement posée. Une relation correctement expliquée mais mal activée est une friction d’interface ; une activation fluide qui confond entourer et relier est une réponse conceptuelle à examiner. Le composant ne collecte aucune observation.

### Remaining pupil-testing hypotheses

- La grille de neuf cases est-elle assez lisible à 320 px sans perdre les relations ?
- Le mot *calque* soutient-il la superposition ou ajoute-t-il une métaphore inutile ?
- Les symboles répétés `zone` et `liaison` suffisent-ils sans animation ?
- La limite temporelle est-elle comprise comme une organisation successive de la même surface ?
- Les plans complets aident-ils certains élèves ou favorisent-ils l’élimination ?
- La quantité de texte permet-elle encore une inspection réelle du plan en 6H ?

## Findings and decisions

- **2026-07-15 — Implémentation initiale :** trois études authored, 24 combinaisons bornées, feedbacks ciblés et doubles surfaces de smoke ajoutés. Statut maintenu à `prototyping`.
- **2026-07-15 — Décision de mécanique :** utiliser de grands boutons de calque plutôt qu’un drag ou un dessin afin de ne pas confondre précision motrice et raisonnement spatial.
- **2026-07-15 — Décision de variation :** faire varier la nature de la limite et du réseau tout en gardant la stratégie.
- **2026-07-15 — Décision de causalité :** limiter les effets à ce que le plan fictif permet d’affirmer et ne revendiquer aucun impact réel.
- **2026-07-15 — Limite de preuve :** aucune observation d’élève ni revue indépendante n’a encore été menée.

## Promotion criteria

Une proposition de passage à `testing` exigera une revue curriculaire et technique indépendante, la concordance des trois fichiers, la réussite des parcours clavier, toucher 320 px et mouvement réduit, l’absence de débordement, réseau et persistance, et la confirmation que les trois lentilles du cluster restent distinctes.

Toute promotion vers l’application de classe demandera en plus des observations auprès de plusieurs élèves de 6H montrant que la stratégie fonction → limite → réseau → effet est réellement utilisée, que les erreurs de concept se distinguent des frictions d’interface, que les plans complets ne dominent pas par élimination et que les formulations sont validées par une personne enseignante et une revue curriculaire. Un smoke pass ne suffit jamais à établir apprentissage, maîtrise ou validation.
