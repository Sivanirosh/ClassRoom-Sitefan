# EX-0312 — L’atlas à deux fenêtres

## Decision summary

L’étude construit la relation **espace contenu → espace contenant → repère commun**. L’élève ne choisit pas seulement le nom d’une échelle : il règle deux fenêtres, voit immédiatement quelles informations entrent ou sortent du cadre, puis pose une « agrafe » qui doit rester identifiable dans les deux vues. La réponse n’est décidée qu’avec le bouton de soumission, après inspection de l’emboîtement.

La mécanique est volontairement une construction et non un QCM générique. Remplacer les lieux par un autre domaine ferait perdre le sens des étendues emboîtées, de la disparition des détails et du repère géographique partagé. Les trois paires imposées sont **appartement/quartier**, **quartier/ville** et **local/régional**.

Dans le triplet, le rôle primaire de cette étude est de **construire** trois relations emboîtées ; `EX-0313` fournit ensuite des cadrages pour y router des demandes, tandis que `EX-0314` infère l’étendue et la portée d’informations dans des documents inhabituels. Cette distinction de rôle est une intention de conception à vérifier lors de la revue indépendante, pas une validation des trois interfaces.

## Curriculum alignment

- **Framework:** PER
- **Cycle / année représentée:** Cycle 2 / `years: ['6H']`
- **Cluster canonique:** `geo56-scale`
- **Lentille:** construction du concept (`construction`, tag unique `lens-construction`)
- **Objective codes:** `SHS 21`, `SHS 23`
- **Statement source ID utilisé dans les métadonnées:** `src-per-0002`
- **Source institutionnelle de contexte:** `src-per-0003` confirme l’autorité de la CIIP, la version PER 3.0 et l’association de la géographie de Cycle 2 à SHS 21 avec SHS 23 intégré. Elle ne remplace pas `src-per-0002` comme source des énoncés et n’est donc pas ajoutée à `curriculum.sourceIds`.
- **Matrice canonique:** `experiments/curriculum/mappings/6h-coverage-matrix.json`
- **Compte rendu de recherche approuvé:** `experiments/curriculum/research/6h-geography-coverage.md`

### Traçabilité statement-by-statement

| ID canonique | Statut officiel dans la matrice | Usage borné dans EX-0312 |
|---|---|---|
| `PER-C2-GEO-P56-00` | **Progression 5H–6H** | Les trois territoires sont fictifs, proches, vécus/fréquentés ou documentables. Les vues montrent un lien vers un espace plus lointain : centre de la ville, localités voisines ou continuation vers d’autres régions. |
| `PER-C2-GEO-P56-E01` | **Progression 5H–6H** | L’élève identifie et construit successivement deux échelles locales : appartement/quartier, quartier/ville et local/régional. |
| `PER-C2-GEO-AF-C2-10` | **Attente non bandée de fin de Cycle 2**, usage uniquement directionnel ou diagnostique | L’identification de l’échelle d’un document guide le vocabulaire, le retour et l’observation future. Elle n’est pas transformée en seuil obligatoire de 6H et le prototype ne la certifie pas. |

`PER-C2-GEO-AF-C2-10` est donc **unbanded end-of-Cycle-2 directional only** : aucune validation auprès d’élèves (*no pupil validation*) n’a eu lieu et aucune réussite dans l’interface ne prouve l’atteinte de cette attente.

La matrice ne contient **aucune attente de géographie explicitement marquée 6H** pour ces énoncés. Le prototype travaille une progression 5H–6H ; il ne fabrique pas un point d’arrivée 6H.

### Compte curriculaire appuyé par la source

La synthèse approuvée de `src-per-0002` situe SHS 21 avec SHS 23 intégré dans des espaces vécus, fréquentés ou documentés de la région proche, reliés lorsque pertinent à des espaces plus lointains (`P56-00`, pages imprimées 70 et 74). Dans la progression 5H–6H, elle mentionne l’identification de deux échelles locales, avec les paires appartement/quartier, quartier/ville et local/régional (`P56-E01`, pages 74–76). L’identification de l’échelle d’un document (`AF-C2-10`, page 77) figure sous l’en-tête non bandé de fin de Cycle 2.

Ces phrases sont des paraphrases courtes de traçabilité. Aucun tableau PER, PDF, habillage CIIP ou texte substantiel protégé n’est reproduit.

### Interprétation de design

Le PER ne prescrit ni un atlas à fenêtres, ni une agrafe de repère, ni les territoires fictifs Valrive et Belrive, ni les options, ni la correction automatique. Le design interprète le changement d’échelle comme trois conséquences manipulables :

1. l’étendue couverte par le cadre change ;
2. certains détails disparaissent tandis que de nouvelles relations spatiales apparaissent ;
3. un repère commun permet de retrouver le lieu contenu dans l’espace contenant.

Le terme *échelle* désigne ici l’échelle géographique comme étendue représentée, pas un calcul de rapport cartographique. Le prototype ne demande aucune mesure de distance ni lecture d’une échelle numérique.

### Ce que l’exercice n’établit pas

Le prototype n’établit pas la maîtrise, la mémorisation durable, le transfert à une carte réelle, la lecture d’un rapport d’échelle, l’atteinte de `AF-C2-10`, ni une progression mesurée. Il ne valide pas l’interface auprès d’élèves et ne démontre pas qu’elle enseigne la relation visée. Trois soumissions correctes et l’état de fin attestent seulement que la boucle technique a été parcourue.

## Learning objective

**Construire, dans trois contextes proches, une petite vue et une vue plus large qui l’englobe, puis les relier par un repère présent aux deux échelles.**

L’unité observable n’est pas un clic isolé. Elle comprend un réglage de petite fenêtre, un réglage de grande fenêtre, la pose d’un repère, l’inspection de la conséquence, une soumission séparée et, si nécessaire, une révision ciblée.

## Prerequisites and necessary vocabulary

### Prérequis

- Comprendre qu’un logement est contenu dans un immeuble et un quartier, qu’un quartier est une partie d’une ville, et qu’un secteur local appartient à un espace régional plus étendu.
- Lire de courtes descriptions de lieux fictifs.
- Distinguer « détail d’un lieu » et « relation entre plusieurs lieux » dans une liste simple.
- Utiliser des boutons à état choisi puis un bouton séparé pour soumettre.
- Comprendre qu’un repère sert à retrouver un lieu ; aucune convention cartographique complexe n’est nécessaire.

### Vocabulaire disponible dans l’interface

- **Échelle (dans cet atelier) :** étendue de territoire montrée par une vue.
- **Petite fenêtre / vue détaillée :** cadre serré qui rend visibles des éléments fins du lieu.
- **Grande fenêtre / vue plus étendue :** cadre qui contient le premier espace et fait apparaître d’autres lieux ou liaisons.
- **Emboîtement :** la petite étendue appartient à la grande ; il ne s’agit pas seulement d’agrandir la même image.
- **Repère commun / agrafe :** lieu identifiable dans les deux vues, sous forme détaillée dans l’une et localisée dans l’autre.
- **Local / régional :** ici, secteur autour d’une gare / ensemble de plusieurs localités proches et de leurs liaisons. Ces définitions sont propres au cas fictif pour éviter une frontière absolue ou ambiguë.

## Misconceptions and productive difficulty

Aucune réponse ci-dessous n’est déclarée « misconception documentée ». Le PER soutient le contenu curriculaire, pas ces explications causales. Ce sont des **hypothèses de conception ou stratégies possibles à observer** :

1. choisir deux vues de même étendue et les traiter comme deux documents indépendants ;
2. croire qu’une vue plus large garde tous les petits détails et les affiche seulement « en plus grand » ;
3. confondre un objet minuscule visible de près avec un repère utilisable aux deux échelles ;
4. choisir l’espace le plus large disponible même lorsqu’il efface les relations demandées ;
5. associer automatiquement « régional » à « très loin » au lieu d’observer les localités proches reliées dans le cas ;
6. réussir par la position d’un bouton plutôt que par comparaison des informations.

La difficulté productive consiste à coordonner **inclusion, changement d’information et continuité du repère**. Les difficultés accidentelles à distinguer sont la compréhension du mot *échelle*, la lecture des trois groupes de commandes, l’identification de l’état « Réglé », la découverte de la soumission séparée, la charge de texte et le défilement à 320 px.

## Evidence of learning to observe

Au-delà de la correction automatisée, des essais futurs chercheraient à observer si l’élève :

- règle d’abord l’étendue à partir de la mission plutôt qu’à partir du nom le plus familier ;
- verbalise que l’appartement appartient au quartier ou que le quartier est une partie de la ville ;
- remarque qu’une pièce, une fontaine ou un quai disparaît dans la vue plus étendue ;
- justifie le repère commun par sa présence dans les deux listes, pas seulement par sa proximité thématique ;
- révise le composant signalé sans reconstruire au hasard toute la paire ;
- réutilise la structure sur la troisième variation local/régional ;
- peut expliquer après coup « ce qui part » et « ce qui apparaît » quand l’étendue s’élargit.

Les sélections et révisions restent en mémoire du composant pendant la session et disparaissent au rechargement. Aucun score, profil ou résultat n’est conservé ou transmis.

## Core interaction hypothesis

> Si l’élève règle deux cadres emboîtés, voit en direct les listes d’informations changer et doit poser un repère réellement présent dans les deux vues avant une soumission séparée, alors la relation entre échelles locales peut devenir visible comme un changement d’étendue et de relations, plutôt que comme deux étiquettes à mémoriser.

## Exercise loop

1. Définir l’échelle comme étendue et montrer un exemple non évalué de petite vue contenue dans une grande.
2. Lire une mission située dans un espace proche fictif et son lien plus lointain.
3. Régler la petite fenêtre parmi trois étendues. Le cadre intérieur et sa liste d’informations changent immédiatement.
4. Régler la grande fenêtre parmi trois étendues. Une réglette et un test textuel indiquent si la seconde étendue peut contenir la première.
5. Poser un repère parmi trois. Le pont affiche séparément sa présence ou son absence dans chaque vue.
6. Inspecter le montage, puis activer **Soumettre cette construction**. Une sélection seule ne soumet jamais dans le constructeur principal.
7. En cas d’incohérence, conserver les trois éléments soumis, expliquer précisément chaque réglage inadéquat et offrir un bouton de reprise.
8. En reprise, conserver le montage et afficher trois questions ciblées sans sélectionner la réponse.
9. Après une construction cohérente, expliquer l’inclusion et le changement d’information, puis attendre une action visible de continuation.
10. Parcourir les trois variations et terminer dans un état distinct qui résume la stratégie sans score ni revendication de maîtrise.

## Deliberate authored variations

L’ordre constitue une rampe de conception à tester, pas une progression officielle entre années.

| ID stable | Paire exigée | Dimension conceptuelle qui varie | Petit cadre correct | Grand cadre correct | Repère commun correct | Mauvais montage marqué |
|---|---|---|---|---|---|---|
| `apartment-neighborhood` | appartement / quartier | Passage d’éléments intérieurs à des rues et équipements ; habitat et loisirs | `samia-apartment` — pièces et porte | `willow-neighborhood` — immeuble, bibliothèque, rues/parc | `samia-home` — logement entier / repère dans l’immeuble | `single-room` + `building-surroundings` + `samia-balcony` |
| `neighborhood-city` | quartier / ville | Une partie urbaine est située parmi d’autres ; approvisionnement et échanges | `market-neighborhood` — marché, école, arrêt/rues | `belrive-city` — quartier des Halles, autres quartiers, gare/rivière | `arcades-market` — bâtiment / repère urbain | `market-street` + `same-neighborhood` + `market-fountain` |
| `local-regional` | local / régional | Un lieu détaillé devient un nœud dans un réseau de localités proches | `station-local-area` — gare, bus, place/marché | `nearby-region` — Valrive, Montel, Clairpré et lignes | `valrive-station` — gare et accès / nœud régional nommé | `station-building` + `repeat-local-area` + `platform-two` |

Les dimensions changent réellement : niveau d’inclusion, type d’information visible, fonction du repère, organisation surfacique ou en réseau, et lien proche–plus lointain. Les seuls changements de noms ou de couleur ne porteraient pas cette variation.

## Complete bounded content model

Tout le contenu est écrit dans `Prototype.svelte`; il n’existe ni génération, ni hasard, ni données distantes.

### Options de la paire appartement/quartier

- Petite vue : `single-room` (pièce, mauvais marqué), `samia-apartment` (correct), `whole-building` (trop large).
- Grande vue : `building-surroundings` (immeuble, mauvais marqué), `willow-neighborhood` (correct), `whole-city` (trop large pour la mission).
- Repère : `samia-balcony` (petite vue seulement, mauvais marqué), `samia-home` (deux vues, correct), `sports-field` (grande vue seulement).

### Options de la paire quartier/ville

- Petite vue : `market-street` (rue, mauvais marqué), `market-neighborhood` (correct), `belrive-from-near` (déjà ville).
- Grande vue : `same-neighborhood` (même étendue, mauvais marqué), `belrive-city` (correct), `belrive-region` (plus large que demandé).
- Repère : `market-fountain` (quartier seulement, mauvais marqué), `arcades-market` (deux vues, correct), `central-station` (ville seulement).

### Options de la paire local/régional

- Petite vue : `station-building` (bâtiment, mauvais marqué), `station-local-area` (correct), `region-from-near` (déjà régional).
- Grande vue : `repeat-local-area` (même étendue, mauvais marqué), `nearby-region` (correct), `one-neighbor` (une seule liaison, réseau incomplet).
- Repère : `platform-two` (local seulement, mauvais marqué), `valrive-station` (deux vues, correct), `montel-town` (régional seulement).

Chaque option de cadre contient un identifiant, un libellé d’étendue, un rang d’étendue borné de 1 à 5, une conséquence écrite, exactement trois informations visibles, son statut de validité, son statut éventuel de mauvais chemin smoke et une correction spécifique. Chaque repère contient son mode de présence dans la petite vue et dans la grande, ou `null` lorsqu’il y est absent.

## Valid-answer rules

Une soumission est correcte si et seulement si les trois choix du scénario ont `correct === true` :

```text
petiteVue.correct
AND grandeVue.correct
AND repere.correct
```

Le constructeur exige les trois choix avant d’activer le bouton de soumission. La sélection ne déclenche aucune correction et peut être remplacée librement. Le test d’inclusion (`grandeVue.extent > petiteVue.extent`) est une conséquence pédagogique visible, mais il ne suffit pas à lui seul : une pièce peut tenir dans un immeuble tout en ne répondant pas à la paire appartement/quartier. La mission et les informations attendues décident donc de la validité exacte.

L’alternative compacte visible présente deux montages complets déjà assemblés. Son bouton est explicitement libellé **sélectionner et soumettre** ; les trois réglages restent lisibles avant la décision, puis le bouton dépose le même objet à trois champs dans `submitConstruction`, applique la même règle et atteint exactement les mêmes retours. Il fournit les contrôles `data-smoke-answer` requis par le harnais générique actuel sans API cachée, réponse invisible, logique parallèle ou contournement. Le constructeur détaillé reste le mécanisme principal et conserve trois manipulations puis une décision/soumission séparée. L’utilité ou le risque d’élimination de cette alternative compacte reste une hypothèse à observer auprès d’élèves.

Une variation n’est ajoutée à la liste locale des variations terminées qu’après une soumission correcte. La complétion est inaccessible avant les trois IDs distincts corrects et une action de continuation après chacun.

## Edge cases and ambiguity guards

- Les territoires et institutions sont fictifs ; aucune connaissance communale, cantonale ou topographique réelle n’est nécessaire.
- La mission nomme l’information requise, afin que « la bonne échelle » ne soit pas une propriété absolue du lieu.
- Les rangs 1–5 ne sont pas des rapports cartographiques et ne sont jamais présentés comme des mesures.
- Une vue plus large mais excessive est explicitement inadéquate lorsque les détails nécessaires disparaissent ; « toujours choisir le plus grand » ne fonctionne pas.
- Un emboîtement géométriquement possible n’est pas automatiquement correct : le retour distingue inclusion et adéquation à la mission.
- Les repères faux sont plausibles mais volontairement présents dans une seule vue ; l’interface écrit « repère absent » de l’autre côté.
- Le cas local/régional définit localement ses deux étendues par leur contenu, car ces mots n’ont pas une frontière universelle.
- La flèche vers d’autres régions fournit le lien plus lointain de `P56-00` sans faire de ce hors-cadre une réponse attendue.
- Les détails de proche et les relations de loin sont tous en texte HTML ; le dessin décoratif n’est jamais la seule preuve.
- Aucun cas impossible, égalité acceptée, réponse multiple ou option générée n’existe.
- Les positions A/B des alternatives compactes changent sur la variation centrale afin de limiter une stratégie de position fixe.

## Feedback and scaffolding

### Retour incorrect

- conserve à l’écran les libellés et conséquences des deux fenêtres soumises ainsi que le repère ;
- nomme chaque composant incorrect et explique son effet dans la situation actuelle ;
- utilise le symbole `×`, le titre « construction à réviser », une bordure et du texte, jamais la couleur seule ;
- ne supprime rien, ne donne aucun score et ne caractérise pas l’élève ;
- propose une unique reprise volontaire sans rechargement.

Exemple pour le premier mauvais chemin : la pièce coupe la cuisine et la porte, l’immeuble ne montre ni rues ni bibliothèque, et le balcon disparaît à l’échelle du quartier. Le retour explique les trois conséquences au lieu de dire seulement « faux ».

### Reprise guidée

Le mode reprise garde les choix et affiche trois questions : quelle information doit rester dans la petite vue, quel espace plus large contient les lieux cités, et quel repère est présent des deux côtés. Il ne surligne pas la réponse correcte, ne désactive pas les distracteurs et ne soumet pas automatiquement. L’élève doit remplacer les réglages puis décider à nouveau.

### Retour correct

Le retour nomme les deux étendues, explique pourquoi la grande contient la petite, décrit ce qui devient visible ou disparaît et justifie le repère commun. Le montage soumis reste visible. Un encadré « Ce qui change » explicite l’invariant propre au cas. La continuation est une action séparée ; aucun avancement automatique ou temporisé n’existe.

## Interaction states and smoke lifecycle

| État `6H-SMOKE-1` | Preuve visible et transition |
|---|---|
| `intro` | But, définition d’échelle, exemple d’emboîtement, quatre gestes et action de départ. |
| `active` | Mission, trois groupes de manipulation, modèle emboîté, test d’inclusion, pont de repère et soumission distincte. |
| `incorrect` | Montage soumis préservé, explication spécifique avec cue non coloriel et unique action de reprise. |
| `retry` | Même variation, choix conservés, trois indices, contrôles corrects activables et soumission disponible. |
| `correct` | Montage préservé, justification spécifique et invariant de changement d’échelle. |
| `continuation` | Région visible adjacente au retour correct, avec unique action vers la paire suivante ou le bilan. |
| `complete` | Bilan distinct après trois variations correctes et continuées, sans score ni maîtrise revendiquée. |

Les tentatives `data-smoke-attempt` utilisent trois pas contigus dans chaque variation : petite fenêtre `1`, grande fenêtre `2`, repère `3`, puis le même `data-smoke-action="submit"`. Le mauvais chemin marqué est un vrai montage incohérent ; le bon chemin est le vrai montage valide. Tous les marqueurs décorent des contrôles visibles, natifs et ordinaires.

Le wrapper de compatibilité expose `data-smoke-root/exercise/program/state` pour le harnais courant. Il est `display: contents` et ne crée aucune interface. Les contrôles `data-smoke-answer` sont les deux alternatives compactes visibles ; leur activation sélectionne une réponse complète écrite puis appelle la même fonction de soumission. La racine sémantique `<main>` porte `data-smoke-contract="6h-v1"` et `data-exercise-id="EX-0312"`. Le smoke générique requis traverse cette compatibilité historique ; il ne démontre pas que le parcours détaillé à trois gestes a été exercé. Ce parcours `6H-SMOKE-1` doit donc faire l’objet d’une preuve navigateur séparée lors de la revue.

## Accessibility and responsive operation

- Tous les réglages, soumissions, reprises et continuations utilisent des `<button>` natifs. Tab suit l’ordre petite vue → grande vue → repère → alternative compacte → soumission ; Entrée et Espace conservent le comportement natif.
- Chaque option utilise `aria-pressed` et écrit **Réglé**, **Repère posé** ou l’action disponible. Le changement n’est pas communiqué par couleur seule.
- Chaque cible interactive mesure au moins 52 px de haut ; les jetons décoratifs internes mesurent au moins 44 px et les zones ne se chevauchent pas.
- Aucun glisser, dessin, survol obligatoire, placement fin ou chronomètre n’existe. Pointeur, toucher et clavier empruntent la même logique.
- Le test d’inclusion, les informations des deux fenêtres et la présence du repère sont du texte. Le décor de cadres n’est pas nécessaire pour comprendre la conséquence.
- Les erreurs utilisent `×`/`!` et du texte ; les réussites utilisent `✓`, un titre et une explication. La couleur est redondante.
- Une région `aria-live` annonce les réglages. Après départ, soumission, reprise, continuation et complétion, le titre de l’état reçoit le focus programmatique avec un contour visible ; aucun piège de focus n’existe.
- Le retour reste affiché jusqu’à une action. Aucun indice ne dépend du son, d’un survol, d’une animation ou d’un contenu transitoire.
- À 320 CSS px, les colonnes, options de repère, alternatives, montages soumis et synthèses s’empilent. Les éléments ont `min-width: 0`, les libellés reviennent à la ligne, les décorations sont contenues et la racine coupe uniquement le débordement décoratif horizontal.
- Le parcours incorrect → reprise → correct → continuation → complétion reste accessible par défilement vertical. Aucun contrôle requis n’est sticky à 320 px.
- Sous `prefers-reduced-motion: reduce`, transitions, animations et défilement animé sont supprimés. Le petit changement d’orientation décoratif du pont mobile est aussi supprimé ; toutes les informations textuelles restent présentes.

## Isolation, privacy, and source-content boundary

`Prototype.svelte` est autonome : aucun import, appel réseau, `fetch`, XHR, beacon, service worker, analytics, identité ou code d’application de classe. Il n’importe aucun exercice voisin et ne modifie aucun état global. Il n’écrit ni cookie, ni `localStorage`, ni `sessionStorage`, ni IndexedDB, ni Cache Storage. Les réponses et la liste de variations terminées restent en mémoire du composant et sont réinitialisées au rechargement.

Le prototype utilise seulement HTML et CSS originaux ; il n’embarque aucun média, fonte distante, carte, logo, marque, mise en page CIIP ou asset tiers. Les noms, territoires, textes et géométries sont fictifs et originaux. Les références de curriculum restent dans ce document de conception, sous forme bornée.

## Prototype boundaries

### Inclus

- un objectif unique d’emboîtement de deux échelles locales ;
- trois variations entièrement écrites : appartement/quartier, quartier/ville, local/régional ;
- changement visible d’étendue et d’information avant soumission ;
- repère commun manipulé comme troisième composant ;
- boucle complète avec erreur réelle, reprise, correction, continuation et bilan ;
- clavier, toucher, pointeur, 320 px et réduction du mouvement ;
- liens proches–plus lointains fictifs et explicitement hors des faits à mémoriser.

### Exclu

- échelle numérique, distance, proportion, mesure ou calcul cartographique ;
- cartes réelles, géolocalisation, nomenclature cantonale ou faits locaux ;
- échelles nationale, continentale ou mondiale ;
- dessin libre, déplacement d’un cadre au pixel, zoom gestuel ou lecture d’image satellite ;
- évaluation exhaustive de `AF-C2-10`, diagnostic de l’élève ou profil de stratégie ;
- score, récompense, chronomètre, compte, sauvegarde, réseau, télémétrie ou transmission ;
- affirmation de maîtrise, d’efficacité mesurée ou de validation pédagogique.

## Observation plan

### Données qualitatives à observer lors de futurs essais autorisés

- ordre réel des réglages et attention portée à la mission ;
- lecture ou non des conséquences qui changent en direct ;
- mots employés pour expliquer l’inclusion (« dans », « partie de », « contient ») ;
- différence faite entre un détail et un repère commun ;
- composant révisé après le retour et justification donnée ;
- maintien de la stratégie lorsque la représentation devient un réseau régional ;
- recours à l’alternative compacte et raison de ce recours ;
- hésitations de clavier/toucher, retours de focus, défilement et compréhension des états de bouton.

### Ce qui soutiendrait l’hypothèse

L’hypothèse serait renforcée si plusieurs élèves comparent spontanément le contenu des deux fenêtres, justifient le repère par sa double présence, révisent le composant ciblé plutôt que d’essayer au hasard et réutilisent la structure sur local/régional avec moins d’aide.

### Ce qui l’affaiblirait

Elle serait affaiblie si les élèves traitent l’activité comme trois groupes de choix indépendants, réussissent par élimination ou position, ignorent le modèle en direct, assimilent « plus large » à « toujours meilleur », ou ne peuvent pas expliquer l’inclusion après le retour correct. Une préférence systématique pour l’alternative compacte sans lecture des conséquences indiquerait que le constructeur n’apporte pas le travail conceptuel prévu.

### Distinguer erreur conceptuelle et friction d’interface

Avant d’interpréter une mauvaise soumission, demander à l’élève de montrer quel bouton est choisi, où se trouve la soumission et ce que signifient les deux fenêtres. Coder séparément :

- relation orale correcte mais mauvais bouton ou état non perçu → friction d’interface ;
- incapacité à atteindre un contrôle, focus invisible ou défilement manqué → accessibilité/interface ;
- lecture correcte des contrôles mais deux étendues égales ou repère à une seule échelle justifié comme commun → difficulté conceptuelle possible ;
- mauvaise lecture du vocabulaire *local/régional* → charge langagière à examiner avant toute conclusion conceptuelle ;
- correction obtenue après lecture du retour mais sans justification → réussite technique insuffisante comme preuve.

Aucune de ces catégories ne décrit l’élève ; elles décrivent uniquement une réponse ou une interaction observée.

## Remaining pupil-testing hypotheses

- La métaphore de « fenêtre » aide-t-elle l’inclusion ou fait-elle croire à un zoom photographique continu ?
- La liste de trois informations par vue suffit-elle à rendre la conséquence perceptible sans carte figurative ?
- Le mot « agrafe » soutient-il le repère commun ou ajoute-t-il un vocabulaire inutile ?
- Les élèves de 6H distinguent-ils spontanément *étendue* et taille visuelle du cadre ?
- La troisième variation donne-t-elle un sens assez concret à *local/régional* ?
- Le retour sur plusieurs composants reste-t-il lisible à 320 px ?
- L’alternative compacte est-elle une accommodation utile ou favorise-t-elle trop l’élimination ?
- Le niveau de lecture et la durée sont-ils adaptés sans aide adulte ?

Ces questions exigent des observations auprès d’élèves ; aucune revue de code ou smoke automatisé ne peut les trancher.

## Findings and decisions

- **2026-07-15 — Implémentation initiale :** création de trois cas fictifs, du constructeur à trois gestes, du modèle d’emboîtement en direct, des retours spécifiques et des surfaces `6H-SMOKE-1`/compatibilité générique. Statut maintenu à `prototyping`.
- **Décision :** ne pas représenter l’échelle par un nombre ou une barre de distance, afin de ne pas confondre l’objectif d’étendue locale avec un rapport cartographique.
- **Décision :** valider la paire exacte demandée, pas toute relation mathématiquement emboîtable ; l’interface explique qu’une inclusion possible peut rester inadéquate à la mission.
- **Décision :** garder un repère commun comme troisième manipulation, car il matérialise le passage entre documents plutôt qu’une simple comparaison d’étiquettes.
- **Décision :** fournir une alternative compacte visible pour le harnais générique et pour une lecture globale, mais la faire passer par le même objet-réponse et la même fonction de soumission.
- **État de preuve :** aucun essai auprès d’élèves, aucune revue curriculaire indépendante de cette implémentation et aucune validation pédagogique.

## Promotion criteria

Le passage éventuel de `prototyping` à `testing` exige d’abord une revue indépendante complète selon `6H-REVIEW-1`, l’alignement métadonnées/design/prototype, le passage de la vérification catalogue/Svelte, les parcours automatisés filtrés, puis des inspections manuelles clavier, pointeur, toucher à 320 px, focus, indices non coloriels et mouvement réduit sans finding blocker/high.

Une promotion ultérieure au-delà de la préparation technique exige des **preuves auprès d’élèves** : plusieurs élèves de 6H doivent pouvoir expliquer l’inclusion et le changement d’information, utiliser le repère commun, récupérer après erreur sans devinette et transférer la structure au cas local/régional. Les observations doivent conduire à une revue autorisée enseignant/curriculum et à des révisions documentées. Un smoke pass, une complétion ou trois réponses correctes ne constituent ni validation ni maîtrise.
