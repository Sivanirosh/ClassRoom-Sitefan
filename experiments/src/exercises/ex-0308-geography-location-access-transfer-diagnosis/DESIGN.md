# EX-0308 — Le bureau des accès

## Decision summary

Cette étude de transfert place l’élève dans un rôle de conseil : un service temporaire doit être installé dans un territoire proche mais inconnu, décrit uniquement par un dossier fictif. L’élève ne récite pas une définition et ne classe pas des exemples répétés ; il assemble une recommandation composée d’un site et de deux faits, puis vérifie si le service peut arriver et si les publics peuvent accéder au lieu malgré une limite. Cette piste mérite un essai parce qu’elle rend interprétables plusieurs stratégies fragiles — proximité seule, limite oubliée, accès coupé ou faits décalés — tout en permettant une révision sans score ni profil d’élève.

## Curriculum alignment

- **Framework:** PER
- **Cycle / year used by the prototype:** Cycle 2 / `6H`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Canonical source:** `src-per-0002` — *Plan d’études romand, Cycle 2*, version 3.0, août 2024, géographie pp. 70–82 ; accès vérifié le 2026-07-15
- **Canonical cluster:** `geo56-location-access` — *Site, situation, limites, accès*
- **Research trace:** `experiments/curriculum/research/6h-geography-coverage.md`
- **Normalized note:** `experiments/curriculum/notes/6h-geography.md`
- **Coverage matrix:** `experiments/curriculum/mappings/6h-coverage-matrix.json`
- **Allocated lens:** `transfer-diagnosis`

### Exact statement classifications

| Canonical statement ID | Official classification in the matrix | Use in this study |
|---|---|---|
| `PER-C2-GEO-P56-00` | **5H–6H progression**, shared spatial framework | Situations fictives documentées à l’échelle d’une région proche, avec un lien explicite vers un dépôt ou centre régional plus lointain. |
| `PER-C2-GEO-P56-L01` | **5H–6H progression** | Description d’un lieu et raisons de localisation par les caractéristiques du site, la situation, les relations extérieures, les limites et les accès. |
| `PER-C2-GEO-AF-C2-03` | **Unbanded end-of-Cycle-2 expectation**, directional or diagnostic only | Horizon diagnostique : coordonner site/situation, limites/accès et plusieurs raisons. Ce n’est pas une attente explicitement fixée à la fin de 6H. |

Il n’existe **aucune attente fondamentale explicitement marquée 6e** dans la source canonique SHS 21–23 consultée. Le prototype ne transforme donc pas `PER-C2-GEO-AF-C2-03` en seuil de réussite obligatoire en 6H et ne prétend pas mesurer une acquisition de fin de cycle.

### Source-backed curriculum account

La progression 5H–6H place l’étude dans un espace vécu, fréquenté ou documenté de la région proche, relié lorsque c’est pertinent à des espaces plus lointains (`PER-C2-GEO-P56-00`). Elle prévoit la description d’un lieu et des raisons de sa localisation en considérant notamment le site, la proximité, les relations avec l’extérieur, les limites et les accès (`PER-C2-GEO-P56-L01`). L’attente non bandée de fin de Cycle 2 donne comme horizon la description d’un lieu par site/situation, limites/accès et au moins deux raisons de localisation (`PER-C2-GEO-AF-C2-03`).

Les thèmes *Approvisionnement*, *Loisirs*, *Habitat* et *Échanges* restent des contextes transversaux ; les trois dossiers en mobilisent plusieurs sans prétendre qu’un lieu n’aurait qu’une fonction.

### Design interpretation — not source evidence

Le rôle de conseil, les territoires fictifs, la recommandation en trois pièces, la taxonomie de réponses, l’ordre des dossiers et tous les retours sont des choix de conception originaux. Le PER ne prescrit ni cette interface ni ces scénarios. La citation curriculaire justifie le contenu géographique visé ; elle ne prouve pas que l’interaction l’enseigne, qu’elle est adaptée à tous les élèves de 6H ou que les codes diagnostiques correspondent à des conceptions stables.

## Learning objective

À partir d’un dossier sur un lieu proche mais inconnu, l’élève recommande un emplacement pour un service temporaire et justifie sa décision par **exactement deux faits convergents** portant sur la situation, une limite ou un accès.

L’action observable complète est : sélectionner un site, sélectionner deux faits, soumettre, puis si nécessaire modifier au moins une pièce de la recommandation à la lumière d’une contrainte documentée.

## Prerequisites and vocabulary

### Prerequisites

- Lire un croquis simple accompagné d’une légende textuelle.
- Suivre une liaison entre une origine, un trajet et une destination.
- Repérer un symbole de fermeture, une limite en pointillés et une plage horaire.
- Distinguer « le dossier indique… » de « je préfère… ».
- Sélectionner et désélectionner des boutons au clavier, au toucher ou au pointeur.

### Vocabulary kept available in the interface

- **Site :** ce qu’on trouve à l’endroit même : pente, sol, rive, abri.
- **Situation :** sa position par rapport aux habitations, routes et autres lieux.
- **Limite :** ce qui sépare ou restreint : rivière, périmètre, horaire.
- **Accès :** le trajet réellement utilisable pour arriver au lieu.
- **Fait du dossier :** information fournie par le croquis ou la fiche ; ce n’est pas encore une conclusion.
- **Recommandation :** choix argumenté construit à partir de plusieurs faits.

## Possible response strategies and productive difficulty

La recherche citée ne documente pas une « misconception » propre à ces dossiers. Les familles suivantes sont donc des **hypothèses de conception liées à des réponses observables**, jamais des étiquettes attribuées à un élève :

- privilégier le site le plus proche d’un groupe d’habitations sans vérifier le trajet depuis l’origine du service ;
- retenir un site vaste, visible ou central alors qu’une limite naturelle, administrative ou horaire le rend impropre à la mission ;
- choisir le bon site mais joindre des faits décoratifs, généraux ou concernant un autre site ;
- confondre un accès des usagers avec l’accès du véhicule qui apporte le service.

La difficulté productive consiste à coordonner trois relations : **origine du service → trajet ouvert → publics desservis**, puis à choisir deux faits qui soutiennent vraiment le même site. La difficulté accidentelle à éviter est la lecture d’une carte dense, la précision d’un placement libre, la mémorisation de symboles ou l’obligation de faire glisser un objet. Le prototype utilise donc des choix discrets, répète toutes les informations essentielles en texte et limite chaque dossier à trois sites et cinq faits.

## Evidence of learning

Une réussite isolée n’est pas considérée comme une preuve suffisante. Les indices à observer sont :

- l’élève consulte les contraintes d’accès avant de recommander, plutôt que seulement le nombre de logements proches ou la taille du terrain ;
- les deux faits épinglés concernent le site choisi et jouent des rôles complémentaires, par exemple arrivée du service et accès des usagers ;
- après un retour, l’élève peut indiquer quelle limite ou quel accès a changé sa recommandation ;
- la stratégie « partir de l’origine, suivre le trajet, vérifier les publics » réapparaît dans un dossier où la limite change de nature ;
- l’élève distingue explicitement le fait (« la route 7 est ouverte ») de son interprétation (« ce site peut recevoir la camionnette ») ;
- un choix correct persiste dans les dossiers 2 et 3 sans reprendre mot à mot la justification du dossier 1.

Le passage à l’écran final, le nombre de clics, la vitesse et le seul choix du site correct ne constituent pas une preuve de compréhension.

## Core interaction hypothesis

> Si l’élève doit conseiller un site dans un lieu documenté inconnu en épinglant deux faits au même avis, puis réviser cet avis face à une limite précise, alors sa manière de relier site, situation et accès devient observable et transférable d’une contrainte spatiale à une autre.

## Why this is transfer/diagnosis

La mécanique n’est ni une construction guidée de définitions ni une série d’items d’entraînement à formulation constante. Chaque dossier est une petite commission d’aménagement inédite : le service a une origine extérieure, les sites présentent des avantages séduisants mais non décisifs, la limite change de nature et la réponse est une recommandation argumentée. Le chemin de réponse — site, faits, révision et famille applicable — rend la stratégie interprétable au lieu de produire un score total.

Une phrase de distinction attendue au niveau du triplet est : **EX-0308 transfère le raisonnement de localisation à une décision de service non répétée et diagnostique la contrainte réellement prise en compte dans l’avis assemblé.**

## Exercise loop

1. L’introduction définit les quatre mots nécessaires et montre la recommandation attendue : un site + deux faits.
2. Un dossier fictif inédit présente la mission, un croquis schématique, les liaisons, les limites et trois fiches de site.
3. L’élève épingle un site dans la « note de conseil ».
4. L’élève épingle exactement deux faits du dossier. Un troisième remplace le premier afin d’éviter une impasse de sélection.
5. Le bouton **Envoyer la recommandation** constitue la décision explicite ; une sélection seule n’est jamais corrigée.
6. À chaque soumission complète, le composant ajoute le chemin courant en mémoire et calcule la famille de réponse applicable.
7. Une réponse non réussie reste lisible avec ses trois pièces, reçoit un retour spécifique et ouvre un atelier de reprise avec un seul repère méthodologique.
8. L’élève recompose et soumet sans rechargement. Une réponse réussie reçoit une explication reliant les deux faits au site.
9. Une action visible ouvre le dossier suivant.
10. Après trois recommandations réussies, un écran distinct résume la stratégie sans score ni affirmation de maîtrise.

## Three authored variations

Tous les noms, données, croquis et contraintes ci-dessous sont **fictifs et créés pour ce prototype**. Ils ne décrivent aucune commune réelle et ne doivent pas être lus comme des données régionales.

### Variation 1 — `rive-claire` : une coupure physique

- **Contextes :** approvisionnement et échanges.
- **Mission :** installer pendant deux jours un relais alimentaire réfrigéré alimenté par un dépôt régional situé à 12 km à l’ouest.
- **Limite structurante :** le pont du Saule est fermé ; il coupe la liaison routière vers la place du Bac.
- **Sites :**
  - `bac` — Place du Bac : grande dalle et 46 logements proches, mais le seul trajet depuis le dépôt traverse le pont fermé ; famille `ACCES_BLOQUE`.
  - `vergers` — Halte des Vergers : terrain plat au croisement de la route 7 et des sentiers des deux rives ; **site valide**.
  - `belvedere` — Pré du Belvédère : proche du secteur sud, mais au bout d’une voie à 14 % interdite aux camionnettes ; famille `PROXIMITE_SEULE`.
- **Faits valides avec `vergers` :** la route 7 ouverte relie le dépôt à la halte ; deux sentiers habités atteignent la halte sans franchir le pont.
- **Chemin incorrect marqué :** `bac` + « 46 logements à quatre minutes » + « dalle plane de 18 × 20 m » → `ACCES_BLOQUE`.

### Variation 2 — `mont-fauve` : une limite de service

- **Contextes :** loisirs, habitat et échanges.
- **Mission :** placer un comptoir de prêt de jeux le mercredi de 13 h à 18 h pendant les travaux du gymnase.
- **Limites structurantes :** le service doit rester dans le périmètre communal ; la cour de l’école est fermée pendant les travaux.
- **Sites :**
  - `ecole` — Cour de l’École : centrale, mais portail fermé de 12 h à 19 h ; famille `ACCES_BLOQUE`.
  - `mail` — Kiosque du Mail : dans le périmètre, à la jonction de la ligne de bus et de deux rampes de quartier ; **site valide**.
  - `col` — Parking du Col : vaste et visible, mais au-delà de la limite communale autorisée ; famille `LIMITE_IGNOREE`.
- **Faits valides avec `mail` :** le kiosque est du côté autorisé de la limite ; bus et rampes restent ouverts pendant toute la permanence.
- **Chemin incorrect marqué :** `col` + « 38 places libres » + « panneau visible depuis la route régionale » → `LIMITE_IGNOREE`.

### Variation 3 — `anse-aux-saules` : des accès selon l’heure

- **Contextes :** échanges, habitat et approvisionnement.
- **Mission :** installer un point temporaire de retrait de colis, livré à 9 h par un centre de tri situé à 18 km.
- **Limites structurantes :** la rue du Marché est piétonne jusqu’à 11 h 30 ; un périmètre de rive est fermé après les pluies.
- **Sites :**
  - `marche` — Halle du Marché : couverte et proche de 92 logements, mais la camionnette de 9 h ne peut pas emprunter la rue ; famille `PROXIMITE_SEULE`.
  - `atelier` — Ancien Atelier : hors du périmètre de rive, relié à la rocade ouverte et au passage piéton-cycle ; **site valide**.
  - `plage` — Esplanade de la Plage : vaste, mais dans le périmètre de rive fermé ; famille `LIMITE_IGNOREE`.
- **Faits valides avec `atelier` :** la rocade permet la livraison à 9 h sans rue piétonne ; le passage piéton-cycle relie les habitations et reste hors du périmètre fermé.
- **Chemin incorrect marqué :** `marche` + « 92 logements à cinq minutes » + « halle couverte » → `PROXIMITE_SEULE`.

Les dimensions conceptuelles varient donc réellement : obstacle physique permanent pendant la mission, frontière de compétence et horaires, puis combinaison d’une restriction horaire et d’un périmètre naturel temporaire. La vitesse n’intervient jamais.

## Content model, valid-answer rules and ambiguity guards

### Bounded authored model

Chaque variation contient exactement :

- un identifiant stable de variation ;
- une mission, une origine extérieure du service et une plage de fonctionnement ;
- un résumé textuel du croquis et deux contraintes explicites ;
- trois sites avec site, situation, accès et famille diagnostique éventuelle ;
- cinq faits courts, dont exactement deux soutiennent ensemble le site valide ;
- un site valide, une paire de faits valide sans ordre ;
- un chemin incorrect déterministe pour `6H-SMOKE-1` ;
- un retour correct, des retours par famille et un repère de reprise.

Aucun contenu n’est généré et aucun cas illimité n’est introduit.

### Validity

Une recommandation est réussie si et seulement si :

1. le site choisi est le `correctSite` de la variation ;
2. exactement deux faits sont épinglés ;
3. l’ensemble non ordonné de leurs identifiants est exactement `correctEvidence`.

Le choix du site correct avec un fait décoratif n’est donc pas accepté. L’ordre de sélection des deux faits ne change pas le verdict. Aucun fait valide ne dépend d’une information cachée dans l’image : les contraintes sont répétées dans le texte, les fiches de site et le registre des liaisons.

### Edge cases and guards

- Une soumission incomplète ne crée pas de trace diagnostique et affiche l’action manquante.
- Un troisième fait remplace le premier avec une annonce, plutôt que de bloquer silencieusement le contrôle.
- Changer de site conserve les faits pour permettre une comparaison consciente ; l’élève peut les désélectionner.
- La reprise efface la sélection de travail mais conserve visiblement la dernière recommandation dans le retour et en mémoire dans le chemin courant.
- Les fermetures sont absolues pendant la mission ; aucun calcul de durée, trafic implicite ou connaissance locale n’est nécessaire.
- Les deux faits valides couvrent des relations différentes et ne sont pas de simples synonymes.
- Les avantages des distracteurs sont vrais dans le monde fictif, mais insuffisants ; le retour ne prétend pas qu’ils sont faux.
- Les cartes sont schématiques et non à l’échelle ; aucune distance ne doit être estimée visuellement.

## Diagnostic response-path model

### Small authored vocabulary

| Code interne | Success? | Observable submitted response pattern | Meaning of the code, not of the pupil |
|---|---:|---|---|
| `ACCES_BLOQUE` | No | Site dont le trajet nécessaire traverse une liaison explicitement fermée. | La recommandation envoyée ne respecte pas la continuité du trajet. |
| `LIMITE_IGNOREE` | No | Site situé du mauvais côté d’un périmètre obligatoire ou dans une zone fermée. | La limite documentée n’est pas prise en compte par cette réponse. |
| `PROXIMITE_SEULE` | No | Site séduisant par sa proximité avec un groupe, mais sans accès viable pour le service ou l’ensemble des publics. | La proximité domine les autres relations dans la réponse envoyée. |
| `PREUVES_DECALEES` | No | Site valide accompagné d’au moins un fait qui ne constitue pas la paire justificative. | Les faits soumis ne convergent pas vers la recommandation. |
| `APPUI_CONVERGENT` | Yes | Site valide et paire exacte de faits complémentaires. | La réponse envoyée relie le site aux deux relations attendues dans ce dossier. |

Les trois chemins incorrects marqués produisent respectivement `ACCES_BLOQUE`, `LIMITE_IGNOREE` et `PROXIMITE_SEULE`, donc toujours un code non réussi documenté.

### Memory behavior

Pour chaque soumission **complète**, `submitRecommendation()` :

1. calcule le code à partir du site et des faits effectivement sélectionnés ;
2. remplace `applicableCode` par ce code ;
3. ajoute à `currentResponsePath` un objet `{ variationId, siteId, evidenceIds, code, attempt }` ;
4. copie cette réponse dans `lastSubmitted` afin que le retour visible corresponde à la trace.

Ces variables vivent uniquement dans l’instance du composant Svelte. Il n’existe ni import de runtime, ni identité, ni texte libre, ni score, ni envoi, ni journal global, ni cookie, ni stockage local/de session, ni IndexedDB, ni Cache Storage, ni service worker. Un rechargement reconstruit les valeurs initiales vides. Le bouton de reprise finale appelle le même reset local, sans persistance.

Les codes ne sont pas montrés à l’élève : l’interface formule la relation à revoir en français ordinaire. Ils servent à l’observation locale du prototype et ne décrivent jamais une personne.

## Evidence versus interpretation inside a dossier

Le prototype maintient une séparation explicite :

- **Evidence / fait :** « la route 7 est ouverte entre le dépôt et la halte » ; cette proposition fait partie du monde fictif authored et peut être directement retrouvée dans le dossier.
- **Interpretation / recommendation:** « la halte peut recevoir la camionnette » ; c’est l’inférence spatiale que l’élève construit à partir du fait.

Le retour correct cite les faits puis explicite le lien. Le retour incorrect ne déclare pas qu’un fait vrai est faux ; il explique pourquoi les faits soumis ne suffisent pas ou pourquoi une autre contrainte les contredit.

## Feedback and recovery

- **`ACCES_BLOQUE`:** nommer le site envoyé, la liaison fermée et l’origine qui ne peut plus l’atteindre. Reprise : partir du symbole « origine », suivre un trajet continu et barrer toute liaison marquée fermée.
- **`LIMITE_IGNOREE`:** nommer le périmètre et le côté où se trouve le site. Reprise : repérer la limite avant de comparer les avantages des terrains.
- **`PROXIMITE_SEULE`:** reconnaître la proximité réellement documentée, puis distinguer accès des habitants et arrivée du service. Reprise : vérifier les deux sens d’accès.
- **`PREUVES_DECALEES`:** rappeler le site valide sans donner automatiquement la paire. Reprise : compléter mentalement « ce fait soutient ce site parce que… » pour chaque épingle.
- **`APPUI_CONVERGENT`:** expliquer séparément comment le premier fait permet l’arrivée du service et comment le second relie le site aux publics ou respecte une limite.

À l’état incorrect, les trois pièces soumises restent visibles. **Reprendre avec un repère** ouvre un écran `retry`, conserve le résumé précédent, remet les contrôles à zéro et n’avance jamais automatiquement. Le bon site et les bons faits restent à choisir. Il n’y a ni perte de vie, ni note, ni chronomètre, ni message qui caractérise l’élève.

## Interaction states and `6H-SMOKE-1`

| Visible state | Prototype evidence and transition |
|---|---|
| `intro` | Purpose, vocabulary and unique visible `data-smoke-action="start"`. |
| `active` | Current dossier, real candidate/fact controls with ordered `data-smoke-attempt` paths, and unique `submit`; stable variation ID. |
| `incorrect` | Submitted recommendation, non-color « À revoir » cue, specific explanation and unique `retry`. |
| `retry` | Previous response summary, scaffold text, enabled candidate/fact controls and same variation ID. |
| `correct` | Submitted recommendation and specific « Accord du dossier » explanation. |
| `continuation` | Visible region beside the correct feedback with unique `continue`; it opens a new variation or completion. |
| `complete` | Distinct summary after all three stable variation IDs have reached correct. |

The root exposes `data-smoke-contract="6h-v1"` and `data-exercise-id="EX-0308"`. Attempt steps are contiguous: site = `1`, first fact = `2`, second fact = `3`. Markers are attached only to the ordinary visible controls used by every pupil; they do not change answer rules or reveal a hidden route.

## Accessibility and devices

- Candidate and fact selectors are native `button` elements with `aria-pressed`, a written selected state and at least 44 px height.
- The submission, retry, continuation and restart controls are native buttons; no drag, hover, drawing or fine placement is required.
- Tab order follows dossier → sites → facts → submission. Enter and Space use native button behavior.
- Each state transition updates a polite live region and moves focus to a visible state heading with `tabindex="-1"`; focus rings are high-contrast and do not rely on color alone.
- Maps have a concise accessible summary and duplicate every essential fact in surrounding text. They are explicitly marked « schéma non à l’échelle ».
- Open/closed states use words and symbols (`OUVERT`, `FERMÉ`, `×`, dashed limits), not color alone.
- Selection uses text (`Épinglé`), a check symbol, border/position and `aria-pressed`, not only a fill color.
- All text and controls wrap; grids become one column at 720 px and tighter padding applies at 420 px. At 320 CSS px, no minimum content width, long identifiers or horizontal table is present in the pupil interface.
- The component clips decorative overflow, not content. Vertical scrolling remains available and controls remain in document flow.
- Motion is limited to short decorative/hover transitions. `prefers-reduced-motion: reduce` removes transitions and transforms without hiding information.
- The prototype uses no sound, timeout or transient-only message.

## Prototype boundaries

### Included

- One observable objective: recommend one site and justify it with two dossier facts.
- Three fully authored fictional documented places.
- Physical, administrative/hours and natural/temporal access constraints.
- A complete incorrect → feedback → retry/scaffold → correct → continuation → completion path.
- A small response-family vocabulary and component-memory response path.
- Full pointer, touch and keyboard operation.

### Excluded

- Claims about any real commune, current road, population or service.
- A map-reading assessment requiring scale, compass bearings or distance estimation.
- Comparison of real policies, budgets, environmental impact or actor conflict.
- Free-text natural-language grading or automatic interpretation of pupil explanations.
- Unlimited generated territories, randomization, score, time pressure, rank or mastery claim.
- Identity, analytics, persistence, network, teacher dashboard or classroom submission.
- Canton-specific content, MER content or a claim that the end-of-cycle expectation is a 6H endpoint.

## Observation plan

Observe several pupils working toward the end of 6H, without collecting identity in the prototype.

### Actions and talk to record outside the component under an approved pupil-study protocol

- Which dossier region is consulted first: proximity figure, route register, limit, or site description?
- Does the pupil trace from the service origin as well as from homes to the site?
- Can the pupil explain why a true attractive fact is insufficient?
- On retry, which piece changes first: site or facts?
- Does the strategy transfer when the barrier changes from bridge to boundary to schedule/perimeter?
- Are the terms site, situation, limit and access used in ways consistent with the dossier?
- Does any map symbol, card wording, replacement behavior or focus transition cause a manipulation error?

### Evidence supporting the interaction hypothesis

- A non-success response is revised by citing the named access or limit rather than by guessing another card.
- The pupil independently checks both arrival of the service and access of the public in later dossiers.
- Two selected facts are explained as evidence for one recommendation, not merely repeated.
- Later success survives the change in barrier type and distractor advantage.

### Evidence weakening or falsifying it

- Pupils succeed by spotting visual styling or repeated card position without reading the relations.
- The scaffold effectively gives away the site and produces imitation rather than a revised inference.
- Pupils cannot tell whether they are selecting a fact or a conclusion.
- The five-family coding repeatedly disagrees with pupils’ verbal reasoning.
- Errors cluster around map layout, terminology, focus, touch replacement or reading load rather than geography.
- The third dossier does not elicit transfer beyond memorizing « choose the middle card ».

### Distinguishing concept response from interface friction

A concept response is counted only after an interpretable complete submission and is compared with the pupil’s explanation. An unselected card, accidental replacement, missed focus, misunderstood button state or inability to find a fact is logged as interface friction, not coded as geographic reasoning. Candidate order differs across analysis notes conceptually, but the implemented version deliberately keeps authored order stable for inspectability; observers must therefore check for position guessing. The internal family remains a tentative design signal and is never treated as a pupil diagnosis without corroborating talk and future review.

### Remaining pupil-testing hypotheses

- Whether five short facts are readable without excessive working-memory demand in 6H.
- Whether « site » and « situation » need an illustrated example before the first dossier.
- Whether replacing the oldest fact when a third is selected is understood from the announcement.
- Whether the administrative boundary in dossier 2 is concrete enough without real local knowledge.
- Whether two facts are sufficient to expose reasoning, or whether pupils need an optional oral explanation prompt.
- Whether the visual dossier encourages genuine inspection rather than card-position heuristics.

## Findings and decisions

- **2026-07-15 — Curriculum boundary:** retain `PER-C2-GEO-AF-C2-03` only as an unbanded end-of-Cycle-2 diagnostic horizon. No explicit 6H endpoint is claimed.
- **2026-07-15 — Transfer mechanic:** choose an unfamiliar service-location commission rather than another identify/label or repeated description task. The recommendation has three independently inspectable pieces.
- **2026-07-15 — Authored scope:** use three fictional near-region dossiers with explicit links to a farther regional service origin; avoid real-world data that could become false or require network lookup.
- **2026-07-15 — Diagnostic vocabulary:** code submitted response patterns, not pupils. Give each planned smoke wrong path a documented non-success family and store all traces only in component memory.
- **2026-07-15 — Motor guard:** reject free map placement. Candidate cards and fact clips are discrete 44 px controls; a third fact replaces the oldest with a written announcement.
- **2026-07-15 — Evidence limit:** no pupil observation has occurred. The interaction, wording, authored difficulty and family validity remain hypotheses.

## Promotion criteria

The study may be considered for `testing` only after independent technical review confirms exact metadata, all `6H-SMOKE-1` states, keyboard operation, 320 px touch behavior, reduced motion, content rules, isolation and no persistence/network. That status would mean testing-ready, not validated.

Any later promotion beyond a prototype requires:

- observations with multiple 6H pupils showing that the dossiers elicit reasoning about site, situation, limits and access rather than card-position guessing;
- evidence that pupils can distinguish a dossier fact from the recommendation inferred from it;
- successful revision after at least two different non-success families without the scaffold revealing the answer;
- transfer to a new authored barrier type not seen in these three dossiers;
- comparison of internal family codes with pupil explanations, with ambiguous or misleading codes revised or removed;
- teacher/curriculum review confirming the language, 6H scope and honest use of the unbanded end-of-cycle horizon;
- accessibility observation with keyboard and touch users, including actual 320 px behavior;
- documented authorization for any classroom integration and a separate privacy decision before any trace leaves component memory.

No automated pass, completion count or correct click can establish learning, mastery or validation.
