# EX-0322 — Le carnet de terrain précis

## Decision summary

Ce prototype entraîne la précision terminologique en faisant **réviser** des notes de terrain plutôt qu’en interrogeant un glossaire. L’élève remplace une expression vague, soumet la phrase réparée, lit un retour lié à l’indice exact et recommence sur une famille lexicale différente. Cette piste est à tester parce que l’invariant est une stratégie de rédaction — observer l’action spatiale, puis nommer avec précision — et non une série de définitions isolées.

## Curriculum alignment

- **Framework:** PER, Cycle 2
- **Cycle / years du prototype:** 6H dans le cadre de la progression 5H–6H
- **Cluster canonique:** `geo56-lexicon`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source ID:** `src-per-0002`, pages imprimées 70, 74, 78–79
- **Statement IDs:**
  - `PER-C2-GEO-P56-00` — progression 5H–6H, espace proche vécu, fréquenté ou documenté et liens avec plus loin;
  - `PER-C2-GEO-P56-I04` — progression 5H–6H, appropriation/utilisation de vocabulaire et notions géographiques;
  - `PER-C2-GEO-P56-I05` — progression 5H–6H, noyau lexical dont zone/réseau/limite, éléments naturels et construits, échelons territoriaux et échelle;
  - `PER-C2-GEO-AF-C2-13` — attente non bandée de fin de Cycle 2 sur l’emploi à bon escient de nomenclature/vocabulaire, uniquement directionnelle ou diagnostique ici.

### PER evidence

La matrice canonique associe ces quatre énoncés au cluster `geo56-lexicon`; I04 et I05 relèvent de la progression 5H–6H. SHS 23 est intégré à la géographie de SHS 21. Le PER consulté ne marque aucune attente géographique comme point d’arrivée explicite 6H: AF-C2-13 reste donc une attente à atteindre au plus tard en fin de Cycle 2.

### Design interpretation

Les notes fictives, l’édition par banque de mots et l’ordre des trois cas sont des choix de prototype. Le PER ne prescrit pas cette activité. La réussite indique seulement qu’une formulation authored a été réparée dans ces cas; elle n’établit ni maîtrise générale du vocabulaire ni atteinte de l’attente de fin de cycle.

## Learning objective

Dans une note d’observation courte, l’élève remplace une expression vague par le terme géographique qui nomme précisément la relation ou l’échelle indiquée, puis relit une phrase cohérente.

## Prerequisites

- Lire une phrase descriptive de deux lignes.
- Comprendre `relier`, `séparer`, `autour de`, `plus vaste`.
- Connaître la fonction d’un carnet de terrain: conserver une observation utile.
- Reconnaître qu’un mot plus précis n’est pas nécessairement plus long ou plus rare.

L’aide définit `réseau` comme ensemble de lieux reliés, `zone` comme partie d’espace ayant un caractère commun, et `région` comme espace plus étendu qu’une commune dans les situations authored.

## Misconceptions and productive difficulty

Ce projet ne dispose d’aucune misconception documentée par des observations d’élèves. Hypothèses de conception à tester:

- considérer `coin`, `chose`, `endroit` et les termes géographiques comme également informatifs;
- choisir un mot du décor plutôt que celui qui nomme la relation décrite;
- employer `zone` dès qu’une surface est visible, même sans caractère commun;
- confondre commune et région lorsqu’un cas change d’étendue.

La difficulté productive est de conserver le sens de la note tout en augmentant sa précision. Les longues phrases, la compréhension du scénario, un bouton trop petit ou un focus peu visible seraient des difficultés accidentelles.

## Evidence of learning

- Identifier l’expression vague soulignée comme partie à réviser.
- Choisir le mot dont la définition est soutenue par l’indice en marge.
- Conserver la phrase et la réponse soumise visibles pendant l’explication.
- Corriger un choix en s’appuyant sur le verbe ou l’indication d’échelle du cas.
- Réappliquer la stratégie sur trois dimensions: relation entre lieux, caractère commun d’une partie d’espace, étendue territoriale.

Une suite de trois réussites n’est pas une mesure de niveau et le temps n’est jamais interprété.

## Core interaction hypothesis

> Si l’élève répare une formulation vague en comparant chaque mot à l’indice de terrain, alors l’invariant « indice observé → terme précis » devient une stratégie de pratique réutilisable.

## Exercise loop

1. Introduction du carnet, du mot vague et de la banque de révision.
2. Affichage d’une note avec l’expression à remplacer et un indice conceptuel stable.
3. Sélection d’un mot de la banque; la phrase se met à jour avant la décision.
4. Action distincte `Valider la note`.
5. En cas d’erreur, retour précis sur le mot soumis et l’indice non satisfait.
6. Retry avec un repère de relecture qui attire l’attention sur le verbe ou l’échelle sans insérer le mot final.
7. En cas de réussite, affichage de la note réparée et explication de l’invariant.
8. Continuation volontaire vers les trois notes, puis completion distincte.

Une alternative visible permet de valider directement l’une de deux phrases complètes avec de gros boutons. Elle utilise les mêmes règles et feedback et sert aussi de compatibilité au pilote de smoke livré; elle n’est pas cachée.

## Progression

1. **Relation / réseau:** note sur trois arrêts de bus de communes proches reliés par les mêmes lignes; contraste avec `zone`.
2. **Caractère commun / zone:** note sur une partie ombragée du parc réservée aux jeux; contraste avec `limite` qui ne désigne que son bord.
3. **Étendue / région:** note comparant une commune fictive et l’espace plus vaste qui regroupe plusieurs communes; contraste avec `pays`.

Les dimensions changent (connexion, surface fonctionnelle, niveau territorial), tandis que la stratégie de révision reste stable. Les lieux sont fictifs et aucune géographie administrative réelle n’est affirmée.

## Feedback and scaffolding

- Pour `réseau`: le retour cite les trois arrêts **et** les lignes qui les relient; `zone` ne décrit pas cette connexion.
- Pour `zone`: le retour distingue la partie où un usage est commun de la ligne qui en marque le bord.
- Pour `région`: le retour compare explicitement « une commune » et « plusieurs communes réunies dans un espace plus vaste ».
- Le retry affiche `Relis l’indice: que relie-t-on?`, `Nomme-t-on la surface ou son bord?` ou `Quel espace contient plusieurs communes?`.
- Le mot soumis reste dans la note barrée/annotée par texte, jamais effacé immédiatement.
- La réponse correcte explique pourquoi le terme réduit l’ambiguïté.

## Content model

Chaque `NoteCase` authored contient:

- `id` stable et famille (`relation`, `surface`, `territory`);
- rubrique du carnet et contexte de région proche;
- début et fin de phrase autour d’un emplacement;
- expression vague originale;
- indice de terrain;
- mot correct et mot incorrect plausible;
- feedback incorrect, scaffold et feedback correct;
- phrase complète correcte et règle de précision.

Valid-answer rules et ambiguity guards:

- une seule option satisfait entièrement l’indice;
- chaque distracteur appartient au noyau lexical mais échoue sur une relation explicitement décrite;
- les phrases restent grammaticales avec chaque option afin que la correction porte sur le sens, pas sur l’accord;
- aucune question ne dépend d’un nom propre ou d’une connaissance cantonale;
- aucun tirage aléatoire; tous les contenus sont inspectables;
- soumission impossible sans sélection et progression impossible sans réussite.

Au reload, le carnet, le nombre de notes réparées et les sélections reviennent à l’état initial. Aucune donnée ne quitte le composant.

## Interaction states

- `intro`: but, stratégie et commandes;
- `active`: note, indice, banque et soumission;
- `incorrect`: note soumise conservée, explication et retry;
- `retry`: même note avec repère de relecture;
- `correct`: phrase réparée et justification;
- `continuation`: action explicite vers la note suivante;
- `complete`: trois dimensions récapitulées sans score ni affirmation de maîtrise.

Les régions et contrôles portent `6H-SMOKE-1`. Un wrapper de compatibilité expose les anciens hooks du harness actuel sur les décisions directes visibles, sans raccourci caché.

## Accessibility and devices

- Boutons natifs, ordre Tab conforme au flux et activation Entrée/Espace.
- La banque de mots ne dépend pas d’un drag; choisir un mot remplit le blanc et reste réversible avant soumission.
- Cibles de 48 px minimum avec espace entre elles.
- Sélection annoncée par `aria-pressed`, bordure, coche et texte, pas seulement par couleur.
- Feedback textuel en `role="status"`; annonce polie des changements.
- À 320 px, carnet, marge et banque passent en une colonne; les mots se replient sans déborder.
- Focus visible de 3 px; aucun focus trap.
- Reduced motion annule transitions et translations; aucune information n’est animée ou temporisée.
- Toucher, pointeur et clavier utilisent les mêmes fonctions et règles.

## Prototype boundaries

### Included

- Révision de trois notes originales.
- Trois dimensions lexicales et une stratégie stable de précision.
- Incorrect → retry → correct → continuation → completion.
- État en mémoire du composant uniquement.

### Excluded

- Saisie libre, correction orthographique ou traitement automatique du langage.
- Nomenclature réelle exhaustive, frontières politiques ou données cartographiques.
- Score, vitesse, classement, profil ou prétention d’évaluer AF-C2-13 en 6H.
- Import partagé, réseau, stockage, cookie, résultat soumis ou analytics.
- Média externe ou contenu propriétaire.

## Observation plan

Observer lors de futurs essais:

- si l’élève lit d’abord la phrase, l’indice ou seulement les boutons;
- ce qui fait abandonner un mot vague ou un terme voisin;
- si le repère de retry entraîne une relecture ciblée;
- si la stratégie se maintient lorsque la dimension passe d’une relation à une échelle;
- les hésitations dues au vocabulaire de consigne et celles dues au concept;
- la facilité à expliquer pourquoi la note correcte serait plus utile à une autre personne.

Hypothèse soutenue: les révisions citent l’indice pertinent et la stratégie se transfère au troisième cas. Hypothèse affaiblie: réussite par position, correction devinée, ou absence de différence perçue entre formulations. Une friction d’interface sera suspectée si l’élève peut dire le mot et l’indice mais échoue à le placer ou à trouver l’action; une confusion conceptuelle si l’action est comprise mais la justification reste incohérente.

Hypothèses résiduelles: le carnet est-il assez familier? La phrase complète en alternative simplifie-t-elle trop la tâche? Trois familles lexicales en une boucle restent-elles compatibles avec une durée courte?

## Findings and decisions

- **2026-07-15 — Conception initiale:** retenir l’édition d’une trace écrite comme mécanique de pratique, distincte de la construction d’une notion et du message diagnostique en contexte nouveau.
- **2026-07-15 — Variation:** varier la relation conceptuelle (connexion, surface, échelon), pas les seuls noms de lieux.
- **2026-07-15 — Accessibilité:** remplacer le glisser-déposer de mots par sélection puis validation et proposer des phrases complètes à gros targets.
- **2026-07-15 — Limite de preuve:** aucune observation d’élève n’a été menée; les familles d’erreur restent des hypothèses.

## Promotion criteria

Passage éventuel à `testing` seulement après revue indépendante et succès des contrôles metadata/check/smoke, des parcours clavier, pointer, touch 320 px et reduced motion. Une future extraction exigera aussi des observations montrant que:

- le choix est justifié par l’indice et non mémorisé par position;
- le retry aide à relire sans donner la réponse;
- la troisième variation révèle une stratégie stable plutôt qu’une simple reconnaissance;
- la formulation et la charge de lecture conviennent à des élèves travaillant vers la fin de 6H;
- un enseignant confirme la pertinence et l’honnêteté des observations prévues.

Aucun résultat technique ne permettra de qualifier le prototype de validé sans essais d’élèves documentés.
