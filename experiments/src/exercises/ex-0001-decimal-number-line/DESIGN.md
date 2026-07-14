# EX-0001 — La balise décimale

## Decision summary

Des élèves peuvent comparer `3,5` et `3,45` comme s’ils comparaient séparément `5` et `45`, un obstacle explicitement relevé par le PER. L’exercice leur demande de prédire l’ordre, puis de placer les deux nombres sur une droite graduée avant de révéler l’alignement `3,50` / `3,45`. Cette piste mérite d’être testée parce qu’elle confronte une règle erronée à deux représentations cohérentes — valeur de position et espace — sans remplacer le raisonnement par un simple verdict.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / 7H–8H
- **Objective codes:** MSN 22
- **Source IDs:** `src-per-0001`
- **Research synthesis:** `curriculum/notes/msn-22-decimal-ordering-7h-8h.md`
- **Direct curriculum statements:** pour la 7H–8H, le PER prévoit la comparaison, le classement, l’encadrement et l’intercalation de nombres écrits sous forme décimale, ainsi que leur représentation sur une droite graduée. Au plus tard à la fin du cycle, l’élève compare, ordonne, encadre et intercale des décimaux ayant au plus deux décimales.
- **Design interpretation:** la prédiction suivie d’un placement, d’un alignement en centièmes et d’une justification guidée devrait rendre l’obstacle observable et révisable dans une boucle courte. Le PER ne prescrit ni cette interface ni cette séquence.

## Learning objective

Face à deux nombres décimaux positifs ayant la même partie entière et au plus deux décimales, l’élève détermine leur ordre et le justifie par leur position sur une droite graduée ou par la valeur des dixièmes et centièmes.

## Prerequisites

- Lire une écriture décimale utilisant la virgule.
- Distinguer unités, dixièmes et centièmes.
- Lire une droite graduée de gauche à droite.
- Comparer des nombres naturels.

## Misconceptions and productive difficulty

L’erreur cible est de considérer le nombre décimal comme la juxtaposition de deux entiers : `3,5 < 3,45` parce que `5 < 45`. Deux variantes doivent aussi être observées : « plus de chiffres signifie plus grand » et « ajouter un zéro final change le nombre ».

La difficulté productive consiste à coordonner trois idées : `3,5 = 3,50`, cinq dixièmes sont supérieurs à quatre dixièmes, et `3,50` se situe à droite de `3,45`. La manipulation doit laisser l’élève s’engager dans une prédiction avant de montrer cette coordination.

Les difficultés accidentelles à éviter sont une graduation trop dense, un glisser-déposer imprécis, une obligation de viser un pixel exact, un vocabulaire non expliqué et une correction dépendant uniquement de la couleur.

## Evidence of learning

Une seule réussite ne suffit pas. Les actions suivantes constituent un faisceau d’indices :

- placer les deux balises dans le bon ordre avant validation ;
- choisir le symbole `<`, `>` ou `=` cohérent avec le placement ;
- accepter et utiliser l’équivalence `3,5 = 3,50` ;
- compléter une justification portant sur les dixièmes ou centièmes ;
- réussir une nouvelle paire dont les écritures n’ont pas la même longueur ;
- corriger une première prédiction en nommant ce qui a changé dans le raisonnement.

## Core interaction hypothesis

> Si l’élève prédit l’ordre de deux décimaux, puis les place sur une droite graduée avant de voir leurs chiffres alignés par valeur de position, alors la différence entre « comparer deux entiers juxtaposés » et « comparer des valeurs décimales » devient visible et réutilisable.

## Exercise loop

1. Présenter deux balises portant des nombres tels que `3,5` et `3,45`.
2. Demander une prédiction rapide avec `<`, `>` ou `=` ; ne pas la corriger immédiatement.
3. Afficher un intervalle zoomé et faire placer chaque balise sur la droite graduée. Le clavier doit offrir les mêmes déplacements que le pointeur.
4. Demander de confirmer ou modifier la comparaison.
5. Révéler ensemble la position correcte, `3,5 = 3,50` et un tableau unités–dixièmes–centièmes.
6. Proposer une justification courte : « Les unités sont égales ; je compare d’abord les… ».
7. Donner un nouvel item ciblant la même relation avec des valeurs différentes.
8. Terminer après trois comparaisons et résumer la stratégie, sans score ni chronomètre.

## Progression

Cette progression est une rampe propre au prototype, pas une attribution officielle par année HarmoS.

1. **Soutien :** même partie entière, dixièmes distincts et écritures de même longueur (`4,2` / `4,7`).
2. **Obstacle cible :** longueurs différentes et dixièmes distincts (`3,5` / `3,45`).
3. **Attention aux centièmes :** dixièmes identiques (`6,42` / `6,47`).
4. **Contrôle d’équivalence :** zéro final (`2,8` / `2,80`).

La première version implémentée doit contenir les trois premiers paliers. Le quatrième peut servir d’item final si l’observation reste assez courte. La vitesse n’augmente jamais la difficulté.

## Feedback and scaffolding

- Conserver la prédiction visible pour permettre une comparaison « avant / après » sans jugement personnel.
- En cas d’erreur, zoomer l’intervalle et afficher d’abord les dixièmes ; révéler les centièmes seulement si nécessaire.
- Aligner les chiffres dans un tableau de position et compléter visuellement le zéro final : `3,5 → 3,50`.
- Relier chaque colonne du tableau à la graduation correspondante sur la droite.
- Employer un message spécifique : « Les unités sont identiques. Compare les dixièmes : 5 dixièmes et 4 dixièmes. »
- Après une réussite, masquer progressivement le tableau mais le laisser accessible comme indice facultatif.
- Autoriser le déplacement des balises après validation afin que l’élève puisse reconstruire la relation.

## Content model

Chaque item contient :

- deux valeurs décimales exactes stockées comme nombres entiers de centièmes, jamais comme flottants binaires pour la correction ;
- leur écriture d’affichage française avec virgule ;
- un intervalle minimal et maximal ;
- le pas principal et le pas fin de la graduation ;
- le type d’obstacle ciblé ;
- la comparaison correcte ;
- une justification structurée par valeur de position.

Règles de génération ou de sélection :

- valeurs positives avec une partie entière commune ;
- au plus deux décimales dans les réponses attendues ;
- écart suffisant pour que deux balises restent distinguables à l’écran ;
- absence de paire ambiguë due à un arrondi d’affichage ;
- au moins un item à longueurs différentes par session ;
- pas de répétition de la même relation numérique sous un simple changement cosmétique.

Exemples initiaux : `3,5 / 3,45`, `6,42 / 6,47`, `4,7 / 4,25`, puis éventuellement `2,8 / 2,80`.

## Interaction states

1. `introduction` — objectif, exemple neutre et commandes.
2. `prediction` — choix `<`, `>` ou `=`.
3. `placement` — manipulation des deux balises.
4. `confirmation` — comparaison confirmée ou révisée.
5. `feedback` — droite, écriture équivalente et tableau de position synchronisés.
6. `explanation` — justification guidée.
7. `continuation` — item suivant ou indice renforcé.
8. `completion` — stratégie résumée et possibilité de recommencer.

La prédiction, le placement et la réponse finale doivent être conservés séparément pour l’observation locale du prototype, sans persistance ni envoi vers l’application de classe.

## Accessibility and devices

- Chaque balise est un contrôle focalisable avec un nom accessible comprenant sa valeur.
- Les flèches déplacent une balise d’un pas ; `PageUp` et `PageDown` peuvent utiliser le pas principal.
- Les zones tactiles mesurent au moins 44 × 44 px ; la position est aimantée à une graduation valide.
- L’ordre est indiqué par position, symbole, texte et motif, jamais uniquement par couleur.
- La droite conserve ses étiquettes essentielles avec un zoom à 200 % et sur tablette en orientation portrait.
- Les animations de déplacement sont courtes et supprimées avec `prefers-reduced-motion`.
- Le texte emploie « dixième » et « centième » avec une aide contextuelle accessible.
- Une alternative sans glisser-déposer permet de sélectionner une balise puis une graduation.

## Prototype boundaries

### Included

- Un objectif : comparer deux décimaux ayant la même partie entière.
- Une boucle complète prédiction–placement–justification–retour.
- Trois items couvrant soutien, obstacle cible et comparaison des centièmes.
- Une représentation synchronisée droite graduée / tableau de position.
- Une utilisation complète au clavier, au pointeur et au toucher.

### Excluded

- Encadrement et intercalation comme tâches principales.
- Nombres négatifs, fractions non décimales et plus de deux décimales.
- Calcul posé ou opérations sur les décimaux.
- Chronomètre, score, classement, récompenses ou progression de monde.
- Persistance, identité élève et soumission d’un résultat d’activité.
- Générateur illimité d’items.

## Observation plan

Observer auprès d’élèves de 7H–8H :

- la prédiction initiale et la stratégie verbalisée ;
- l’ordre dans lequel ils regardent les unités, dixièmes et centièmes ;
- l’usage réel de la droite, plutôt qu’un placement effectué après une décision déjà prise ;
- la réaction à `3,5 = 3,50` ;
- la capacité à transférer la stratégie au troisième item ;
- les erreurs de manipulation distinctes des erreurs mathématiques ;
- le besoin spontané ou non du tableau de position.

L’hypothèse est soutenue si un élève ayant produit ou reconnu l’erreur cible révise sa comparaison à partir des représentations, puis réussit une nouvelle paire en justifiant par la valeur de position. Elle est affaiblie si la droite ne change pas le raisonnement, si l’alignement est simplement imité, ou si la réussite disparaît dès que le tableau est masqué.

Questions courtes après la boucle :

- « Qu’est-ce qui t’a fait changer ou garder ta réponse ? »
- « Pourquoi peut-on écrire 3,50 à la place de 3,5 ? »
- « Sans la droite, que regarderais-tu en premier ? »

## Findings and decisions

- **2026-07-14 — Décision papier :** cibler d’abord l’obstacle `3,5 / 3,45` documenté par le PER. Reporter l’intercalation à un autre exercice afin de maintenir une seule boucle d’apprentissage.
- **2026-07-14 — Prototype initial :** construire trois boucles ordonnées — comparaison des dixièmes, obstacle `3,5 / 3,45`, puis comparaison des centièmes — avec prédiction conservée, placement par toucher ou clavier, confirmation, retour synchronisé et justification guidée. Le placement utilise une droite cliquable avec ajustements plutôt qu’un glisser-déposer obligatoire afin de réduire la précision motrice requise.
- **2026-07-14 — Limite de preuve :** aucune observation d’élève n’a encore été réalisée. Les paliers, formulations de retour et interactions restent des hypothèses.

## Promotion criteria

Le travail peut être proposé à l’application de classe lorsque :

- des observations avec plusieurs élèves de 7H–8H montrent que l’interaction distingue erreur mathématique et friction d’interface ;
- au moins des élèves manifestant l’erreur cible peuvent ensuite transférer la stratégie à une paire nouvelle sans aide obligatoire ;
- les élèves peuvent expliquer l’équivalence créée par le zéro final plutôt que seulement répéter une règle ;
- l’usage au clavier, au toucher et au pointeur est vérifié sans dépendance à la couleur ni à une précision motrice fine ;
- les cas qui donnent un faux positif ou une correction ambiguë sont documentés et supprimés ;
- l’enseignant confirme que les traces prévues — prédiction, réponse révisée et famille d’erreur — sont pédagogiquement utiles sans devenir une mesure de surveillance.
