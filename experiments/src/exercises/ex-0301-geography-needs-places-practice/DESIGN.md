# EX-0301 — Le tri des lieux utiles

## Decision summary

Cette étude entraîne la stratégie **indice d’activité → besoin → fonction**, en faisant acheminer une fiche-lieu vers une catégorie justifiée. Les trois cas font varier la forme de l’indice : action sur place, circulation de biens puis liaison entre espaces. Le tri mérite d’être testé parce qu’il oblige à utiliser ce qu’un lieu rend possible plutôt que son apparence ou un mot isolé.

## Curriculum alignment

- **Framework:** PER, Cycle 2
- **Years represented by the prototype:** 6H, au titre des progressions 5H–6H ; aucun seuil obligatoire de fin de 6H n’est affirmé.
- **Cluster canonique:** `geo56-needs-places`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source ID canonique:** `src-per-0002`
- **Trace:** `experiments/curriculum/mappings/6h-coverage-matrix.json`, recherche normalisée `experiments/curriculum/research/6h-geography-coverage.md`, PDF PER v3.0 pp. 70, 74–77.

### PER evidence

Sont classés dans la matrice comme **progressions 5H–6H** :

- `PER-C2-GEO-P56-00` — espace proche vécu, fréquenté ou documenté, relié lorsque pertinent à des espaces plus lointains ;
- `PER-C2-GEO-P56-Q01` — observation, questionnement et hypothèses autour des besoins et de l’aménagement ;
- `PER-C2-GEO-P56-Q02` — identification et catégorisation des besoins vitaux et secondaires ;
- `PER-C2-GEO-P56-Q03` — identification de lieux répondant plus spécifiquement à ces besoins ;
- `PER-C2-GEO-P56-O01` — identification des parties d’un lieu, de leurs fonctions et utilisations.

`PER-C2-GEO-AF-C2-01` et `PER-C2-GEO-AF-C2-04` sont des **attentes de fin de Cycle 2 non bandées**, utilisables comme direction ou repère diagnostique seulement. Le prototype n’en fait pas des objectifs obligatoires de 6H. Aucune attente explicitement marquée 6H n’est enregistrée pour ce cluster.

### Design interpretation

Le tri, les catégories proposées et les lieux choisis ne sont pas prescrits par le PER. Ils constituent une interprétation de design bornée qui met les relations officielles en action. La bibliothèque relève du besoin d’apprendre et d’échanger des idées, le marché de l’approvisionnement, et l’arrêt de car des échanges/déplacements entre le quartier et un bourg proche ; ces formulations sont originales et ne reproduisent pas un moyen d’enseignement.

## Learning objective

**Classer, dans trois cas variés, un lieu selon la fonction attestée par une activité ou un indice observable.**

Le classement, sa révision et l’usage stable de l’indice d’activité sont observables ; finir les trois fiches ne suffit pas à établir l’objectif.

## Prerequisites

- Distinguer le lieu (où ?) de l’activité (qu’y fait-on ?).
- Comprendre les verbes *apprendre*, *emprunter*, *acheter*, *livrer*, *se déplacer* et *relier*.
- Lire une phrase-indice et deux étiquettes de catégorie.
- Utiliser des boutons comme alternative visible à un glisser-déposer.

## Misconceptions and productive difficulty

La documentation PER ne qualifie pas de misconceptions. Les réponses suivantes sont donc des **hypothèses de conception** :

- classer selon la façade, le nom ou la personne présente plutôt que selon l’activité ;
- confondre l’objet transporté avec la fonction du lieu ;
- ignorer qu’une liaison vers un autre espace peut constituer l’indice déterminant ;
- considérer toute fonction secondaire plausible comme réponse, même lorsque la consigne demande celle attestée par l’indice en évidence.

La difficulté productive est de conserver un invariant malgré des indices de nature différente. Une mauvaise lecture, une catégorie tronquée ou une cible de tri imprécise serait une friction d’interface, pas une erreur conceptuelle.

## Evidence of learning

- Pointer verbalement ou par l’action l’indice qui justifie le classement.
- Corriger une fiche après un retour qui oppose l’activité observée à la catégorie choisie.
- Réutiliser « ce qu’on peut y faire » quand le troisième cas décrit un réseau plutôt qu’une activité dans un bâtiment.
- Éventuellement signaler qu’un lieu peut avoir plusieurs fonctions tout en choisissant celle prouvée dans la situation.

Le prototype ne mesure ni mémorisation à long terme, ni autonomie hors interface, ni maîtrise de l’ensemble du cluster.

## Core interaction hypothesis

> Si l’élève trie des lieux à partir d’indices d’activité volontairement variés et reçoit un retour qui relie chaque indice à une fonction, alors la stratégie de catégorisation devient plus stable qu’un classement par apparence.

## Exercise loop

1. Lire la fiche d’un lieu et repérer l’indice mis en avant.
2. Comparer les deux bacs de fonction.
3. Acheminer la fiche en activant le bac choisi ; l’action dépose et soumet la décision.
4. Lire pourquoi l’indice soutient ou non ce classement.
5. En cas d’erreur, afficher une question-guide centrée sur le verbe d’activité puis retrier la même fiche.
6. Après réussite, faire venir la fiche suivante.
7. Revoir l’invariant dans un état final distinct.

## Progression

1. **Bibliothèque de quartier — action directe :** « lire, emprunter, chercher une information » ; distinguer apprendre/échanger des idées de se protéger/habiter.
2. **Marché couvert — chaîne d’approvisionnement :** « livrer puis acheter des aliments » ; distinguer s’approvisionner de jouer/se divertir et rendre visible le lien avec des producteurs de la région.
3. **Arrêt de car — relation spatiale :** « relier le quartier au bourg proche » ; distinguer se déplacer/échanger de se nourrir.

Les variations portent sur la nature de la preuve et le besoin, non sur la couleur. L’échafaudage apparaît seulement après une erreur et conserve la même stratégie sans accélération ni score.

## Feedback and scaffolding

Le retour incorrect cite la catégorie soumise, décrit ce qu’elle permettrait normalement, puis ramène au verbe exact de la fiche. **Relire avec la loupe** ouvre une question-guide et souligne textuellement l’indice ; la bonne catégorie reste à choisir. Le retour correct formule « indice → activité → fonction ». Le choix déposé reste nommé dans le retour. Aucun message ne qualifie l’élève.

## Content model

Le contenu est une liste fixe de trois fiches dans `Prototype.svelte`. Chaque fiche possède un identifiant stable, un lieu, un court contexte, un indice, deux catégories, une clé de bonne catégorie, des explications spécifiques et un guide de récupération.

**Règle :** la catégorie correcte est celle dont la fonction est directement attestée par l’indice cité. La seconde catégorie est plausible dans d’autres lieux mais contredite ou non étayée ici. Pour éviter l’ambiguïté des lieux multifonctionnels, la consigne ne demande jamais « la seule fonction » : elle demande la fonction prouvée par la fiche. Aucun contenu n’est généré, aucun fait local réel n’est revendiqué et toutes les options ont été relues ensemble.

## Interaction states

- `intro` : but, définition de fonction et mode d’acheminement ;
- `active` : fiche, indice et deux bacs activables ;
- `incorrect` : dépôt soumis et explication textuelle avec ✗ ;
- `retry` : loupe/guide visible et même fiche retriable ;
- `correct` : dépôt soumis et justification textuelle avec ✓ ;
- `continuation` : commande visible pour appeler la fiche suivante ;
- `complete` : synthèse après les trois identifiants de variation.

Les attributs historiques du pilote smoke du laboratoire sont posés sur la même racine et les mêmes bacs réels ; ils n’ajoutent aucun raccourci ni branche de réponse.

## Accessibility and devices

- Les bacs sont des boutons natifs avec des noms complets ; le tri ne nécessite aucun glisser-déposer.
- Ordre clavier : fiche, bac gauche, bac droit ; activation standard par `Entrée` ou `Espace`.
- Cibles d’au moins 48 px, espacées, identiques au pointeur et au toucher.
- Les libellés, symboles ✓/✗, titres et messages portent l’information sans dépendre de la couleur.
- Le retour est persistant dans `role="status"` avec `aria-live="polite"`; aucun contenu essentiel n’est transitoire.
- À 320 px les bacs s’empilent, les mots peuvent revenir à la ligne et aucune largeur fixe n’est imposée.
- Aucun son, survol, dessin précis ou mouvement n’est requis ; le média `prefers-reduced-motion` retire les déplacements décoratifs.
- Le contour `:focus-visible` est contrasté et aucune manipulation ne piège le focus.

## Prototype boundaries

### Included

- Trois classements et un invariant explicite.
- Habitat comme contraste, apprentissage/échange d’idées, approvisionnement et déplacement/échanges.
- Un lien quartier–région et un lien quartier–bourg proche.
- Retour spécifique, récupération, continuation et fin.

### Excluded

- Taxonomie exhaustive ou hiérarchie normative de tous les besoins.
- Classement d’acteurs, impacts, localisation, données ou cartes réelles.
- Glisser-déposer obligatoire, chronomètre, points, stockage ou profil d’élève.
- Présentation de `AF-C2-01` ou `AF-C2-04` comme seuil 6H.

## Observation plan

Observer le premier indice cité, les changements de stratégie entre les fiches, les auto-corrections et les commentaires sur la multifonctionnalité. L’hypothèse serait soutenue si l’élève verbalise l’activité et conserve cette stratégie pour l’arrêt de car. Elle serait affaiblie si les choix reposent sur la position des bacs, si la loupe donne une réponse par élimination ou si l’indice de réseau reste incompris.

Pour isoler la friction, demander ce que signifie chaque bac avant le dépôt, noter séparément une mauvaise activation et une justification conceptuelle erronée, vérifier l’ordre de focus et répéter au toucher. Restent à tester avec des élèves : le terme *fonction*, la longueur des indices et la compréhension du marché comme lieu relié à une région.

## Findings and decisions

- **2026-07-15 — Implémentation initiale :** trois fiches, tri par boutons, récupération et smoke contract ajoutés. Le statut reste `prototyping`; aucune observation d’élève n’est disponible.
- **Décision conservée :** fournir une alternative discrète plutôt qu’un glisser-déposer obligatoire afin que la précision motrice ne soit jamais interprétée comme une erreur de classement.

## Promotion criteria

Une promotion exige une revue indépendante sans défaut bloquant, la réussite des parcours clavier/toucher 320 px/mouvement réduit, puis des observations autorisées auprès d’élèves de 6H montrant que l’indice d’activité guide réellement le tri dans les trois formes de preuve. Les ambiguïtés repérées devront être corrigées et documentées. Les tests techniques seuls ne prouvent pas l’apprentissage et ne permettent pas de passer à `validated`.
