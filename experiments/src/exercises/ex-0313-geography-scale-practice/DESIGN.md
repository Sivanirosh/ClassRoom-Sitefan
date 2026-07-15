# EX-0313 — L’aiguillage des deux échelles

## Decision summary

Cette étude de **pratique variée** demande d’aiguiller quatre demandes d’information vers l’un de deux documents déjà caractérisés par leur étendue et leurs détails. La stratégie reste la même — **contenir tous les lieux cités, puis conserver le détail demandé** — tandis que les couples changent réellement : appartement/quartier, quartier/ville, puis marché local/région proche. Le tableau de routage se recompose à chaque choix, mais rien n’est corrigé avant une soumission distincte.

La piste mérite d’être testée parce qu’elle coordonne deux dimensions souvent en tension : une vue plus étendue contient davantage de lieux, mais simplifie les petits détails ; une vue rapprochée garde ces détails, mais peut couper une liaison. Ce travail de tri et de comparaison est volontairement distinct d’une construction de vues emboîtées : ici, les deux cadrages sont fournis et l’élève pratique une stratégie stable sur douze demandes variées.

Dans le triplet, `EX-0312` construit d’abord l’inclusion et le repère commun, cette étude **pratique** le routage par étendue et détail, puis `EX-0314` transfère la stratégie à des documents sans carte classique et consigne des familles de réponses. Cette diversité annoncée reste à confirmer par la revue indépendante des trois prototypes ; elle n’est pas une preuve de validation.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years du prototype:** Cycle 2 / `6H`, dans le cadre de progressions officielles 5H–6H
- **Objective codes:** `SHS 21`, avec `SHS 23` intégré
- **Canonical cluster ID:** `geo56-scale` — Deux échelles locales
- **Lens:** `practice` / `lens-practice`
- **Canonical evidence source ID:** `src-per-0002`
- **Research brief:** `experiments/curriculum/research/6h-geography-coverage.md`
- **Coverage matrix:** `experiments/curriculum/mappings/6h-coverage-matrix.json`
- **Official document:** CIIP, *Plan d’études romand, Cycle 2 — Mathématiques et Sciences de la nature – Sciences humaines et sociales*, version 3.0, août 2024, pages imprimées 70, 74–79 pour le périmètre mobilisé.
- **Institutional context:** `src-per-0003` confirme l’autorité institutionnelle de la CIIP, la version courante du PER et l’association de la géographie de Cycle 2 à SHS 21 et SHS 23. Il ne crée ni énoncé supplémentaire ni seuil annuel ; le texte et la pagination des énoncés viennent de `src-per-0002`, seul source ID conservé dans la métadonnée de cet exercice.

### Exact statement trace and classification

| Canonical statement ID | Classification in the approved matrix | Use in this study |
|---|---|---|
| `PER-C2-GEO-P56-00` | **Progression 5H–6H** (`statementType: progression`, `yearBand: 5H-6H`) | Cadre partagé : espace vécu, fréquenté ou documenté de la région proche et liens, lorsque pertinent, avec des espaces plus lointains. Les cas fictifs partent du logement et du quartier ; le troisième rend explicite une liaison marché–communes–fermes dans une région proche. |
| `PER-C2-GEO-P56-E01` | **Progression 5H–6H** (`statementType: progression`, `yearBand: 5H-6H`) | Identification de deux échelles locales, avec les couples appartement/quartier, quartier/ville et local/régional. L’élève doit choisir le cadrage utile plutôt que réciter une étiquette. |
| `PER-C2-GEO-AF-C2-10` | **Attente de fin de Cycle 2 non bandée** (`statementType: cycle-end-expectation`, `yearBand: cycle-2-unbanded`) | Horizon **directionnel seulement** : identifier l’échelle d’un document. L’exercice attire l’attention sur l’étendue et l’information visible, sans présenter cette attente comme un endpoint obligatoire de 6H et sans prétendre l’évaluer entièrement. |

**Aucune attente fondamentale de géographie SHS 21–23 n’est explicitement marquée « 6e année » dans la source canonique consultée.** Il n’existe donc pas d’endpoint officiel propre à la 6H à revendiquer pour ce cluster. `PER-C2-GEO-AF-C2-10` demeure une attente non bandée à atteindre au plus tard à la fin du Cycle 2.

### Source-backed curriculum account

Le PER place la géographie 5H–6H dans des espaces vécus, fréquentés ou documentés de la région proche, en faisant apparaître leurs liens avec des espaces plus lointains. La progression `P56-E01` porte sur l’identification de deux échelles locales et cite notamment des relations du type appartement/quartier, quartier/ville ou local/régional. SHS 23 est intégré à SHS 21 et soutient la lecture et la comparaison de représentations d’espaces à différentes échelles. L’attente `AF-C2-10` mentionne l’identification de l’échelle d’un document, mais sous l’en-tête non bandé de fin de Cycle 2.

Ce compte rendu est une paraphrase courte et traçable. Le prototype ne reproduit ni tableau officiel, ni page PER, ni moyen d’enseignement. Les précisions cantonales et les MER ne sont pas traités comme sources normatives.

### Design interpretation, kept separate

Le PER ne prescrit ni régie d’aiguillage, ni tickets, ni fenêtres, ni étendues chiffrées fictives. Le choix de faire router des demandes est une **interprétation de conception** : un cadrage ne devient utile que si son étendue contient les repères nécessaires **et** si sa simplification ne supprime pas l’information demandée. Les valeurs « environ 18 m », « 1,4 km », etc. sont des propriétés authored de documents fictifs ; elles servent à rendre les écarts inspectables, pas à enseigner des mesures réelles ou un rapport cartographique officiel.

Le prototype évite les expressions ambiguës *grande échelle* et *petite échelle*, dont le sens cartographique peut être contre-intuitif. Il emploie **cadrage rapproché** et **cadrage élargi**, puis nomme explicitement l’espace représenté : échelle de l’appartement, du quartier, de la ville, du marché ou de la région proche.

## Learning objective

À partir de deux documents décrits par leur étendue et les informations qu’ils conservent, l’élève affecte chaque demande géographique au cadrage utile en vérifiant deux conditions :

1. tous les lieux ou tout le trajet cités entrent dans l’étendue ;
2. le détail précis demandé reste visible.

L’évidence observable comprend le routage d’un ensemble de quatre demandes, la lecture des piles produites, une décision soumise séparément, une éventuelle révision ciblée et la réutilisation de la stratégie sur trois couples d’échelles.

### What this exercise does not establish

Le prototype ne permet pas d’établir :

- que l’élève sait déterminer seul l’échelle numérique ou le rapport de réduction d’une carte ;
- qu’il sait mesurer une distance réelle à partir d’un document ;
- qu’il sait produire, orienter ou légender une carte ;
- qu’il atteint l’attente non bandée `PER-C2-GEO-AF-C2-10` de fin de Cycle 2 ;
- qu’il transfère la stratégie à tout document inédit sans aide ;
- qu’un routage correct démontre une compréhension durable, une maîtrise ou un niveau ;
- que l’interaction a été validée auprès d’élèves.

## Prerequisites and necessary vocabulary

### Prerequisites

- Comprendre les inclusions usuelles : un appartement se trouve dans un quartier ; un quartier appartient à une ville ; un lieu local appartient à une région.
- Lire quatre questions courtes et les descriptions de deux documents.
- Comprendre les relations *dans*, *près de*, *entre*, *relier*, *par rapport à* et *autour de*.
- Distinguer les lieux nécessaires pour répondre de l’information précise demandée à leur sujet.
- Utiliser de grands boutons de sélection ; aucun glisser-déposer, zoom gestuel ou dessin fin n’est requis.

### Vocabulary available in the interface

| Term | Working definition in the prototype |
|---|---|
| **Échelle** | Niveau de vue d’un document : quelle étendue il couvre et quels détails y restent lisibles. |
| **Étendue** | Portion d’espace réel couverte par la fenêtre du document. |
| **Détail utile** | Information assez précise pour répondre à la demande, par exemple une porte, une petite rue ou une route entre communes. |
| **Cadrage rapproché** | Fenêtre qui couvre moins d’espace et conserve de petits détails. |
| **Cadrage élargi** | Fenêtre qui couvre plus d’espace et simplifie certains petits détails. |
| **Région proche** | Espace fictif plus étendu que la ville et comprenant plusieurs communes reliées dans le dernier dossier. |

## Possible strategies and productive difficulty

La source curriculaire ne documente pas de misconception propre à ce prototype. Les conduites suivantes sont donc des **hypothèses de conception à observer**, jamais des étiquettes attribuées à un élève :

- choisir systématiquement la vue la plus étendue parce qu’elle « montre plus » ;
- choisir systématiquement la vue la plus rapprochée parce qu’elle « montre mieux » ;
- s’arrêter au premier lieu nommé sans vérifier la seconde extrémité d’une liaison ;
- ne regarder que l’étendue et oublier que la porte, le passage piéton ou le quai peut être simplifié ;
- ne regarder que le détail et oublier qu’un trajet vers l’école, la gare ou une autre commune sort du cadrage ;
- mémoriser une alternance de boutons au lieu d’appliquer les deux filtres.

La difficulté productive est la coordination de deux contraintes qui ne pointent pas toujours vers la même fenêtre. La difficulté accidentelle à éviter serait de devoir connaître une commune réelle, décoder un rapport numérique, viser une petite zone, retenir les caractéristiques des fenêtres de mémoire ou interpréter une différence de couleur seule.

## Evidence of learning

Une suite de clics corrects ne suffit pas. Les observations utiles forment un faisceau :

- l’élève nomme ou désigne les deux lieux extrêmes avant de choisir l’étendue ;
- il utilise ensuite le nom du détail demandé pour départager deux fenêtres qui contiennent toutes deux le lieu ;
- après un retour incorrect, il modifie le ticket signalé ou explique pourquoi il conserve un autre ticket ;
- les piles finales associent les demandes intérieures/locales au cadrage détaillé et les liaisons plus étendues au cadrage qui les contient ;
- la stratégie reste utilisable quand « quartier » passe de fenêtre élargie dans le premier cas à fenêtre rapprochée dans le deuxième ;
- elle reste utilisable quand la variation finale change aussi la nature du lien : circulation de produits entre un marché et des fermes de communes voisines ;
- lors d’une future observation, l’élève peut expliquer pourquoi la carte la plus étendue n’est pas toujours la plus utile.

Le composant conserve seulement le routage courant et la réponse soumise. Il ne calcule pas de score, ne profile pas une stratégie et n’enregistre aucune observation.

## Core interaction hypothesis

> Si l’élève route plusieurs demandes vers deux cadrages explicitement décrits, inspecte les piles obtenues et reçoit un contraste précis entre **étendue couverte** et **détail conservé**, alors la procédure « contenir puis préciser » peut devenir une stratégie réutilisable sur des couples d’échelles variés.

Cette hypothèse reste à tester avec des élèves.

## Deliberate variation

Les lieux et documents sont entièrement fictifs. Les nombres donnent seulement un ordre d’étendue authored ; aucun fait local réel n’est affirmé.

| Variation stable | Pair of scales | Concept-relevant change | Purpose |
|---|---|---|---|
| `appartement-quartier` | appartement, environ 18 m / quartier, environ 1,4 km | Passage de détails intérieurs (pièce, porte) à des relations entre lieux du quartier (école, bibliothèque, arrêts). | Cas d’entrée : rendre visible qu’un cadrage élargi contient les trajets mais efface l’intérieur du logement. |
| `quartier-ville` | quartier, environ 1,6 km / ville, environ 9 km | Le **quartier change de rôle** : il devient le cadrage rapproché. Contraste entre passage piéton/petite rue et gare/ligne principale. | Empêcher l’association fixe « quartier = toujours large » et faire coordonner étendue et grain d’information. |
| `local-regional` | marché local, environ 220 m / région proche, environ 38 km | Passage de l’organisation interne d’un site à des flux d’approvisionnement entre communes et fermes. | Réutiliser l’invariant sur un lien local–régional et rendre explicites les relations avec des espaces plus lointains. |

La variation porte donc sur l’emboîtement, l’ordre de grandeur, le type de détail, la longueur de la relation et la fonction du même niveau spatial ; elle ne repose ni sur des noms ni sur des couleurs interchangeables.

## Exercise loop

1. L’introduction définit échelle, étendue et détail utile, puis montre les deux filtres.
2. Un dossier présente deux fenêtres avec leur espace nommé, leur étendue, ce qu’elles conservent et ce qu’elles simplifient.
3. L’élève choisit une fenêtre pour chacun des quatre tickets. Chaque activation met à jour une pile de routage visible et annoncée ; elle ne corrige rien.
4. Le bouton de soumission devient disponible seulement lorsque les quatre tickets sont routés.
5. La soumission conserve une copie lisible de l’ensemble.
6. Si une affectation est incohérente, le retour cite la première demande concernée, la fenêtre soumise et la raison exacte portant sur étendue ou détail.
7. « Reprendre avec les deux filtres » ouvre un état `retry`, conserve les quatre routes et fournit une question-guide sans choisir de destination.
8. Une nouvelle soumission correcte explique pourquoi chaque demande convient à sa fenêtre.
9. Une action visible mène au couple suivant. Après trois variations correctes, une completion distincte résume la stratégie sans score ni revendication de maîtrise.

## Authored content model

### Fixed window model

Chaque variation contient exactement deux objets `ScaleWindow` :

- `near` : cadrage rapproché ou local ;
- `wide` : cadrage élargi.

Chaque fenêtre déclare un nom d’échelle, une étendue authored, une liste d’informations conservées et une liste d’informations simplifiées. Ces caractéristiques constituent la règle de décision ; les glyphes géométriques ne sont que redondants.

### Complete ticket inventory and valid answers

| Variation | # | Request | Valid window | Planned non-success window |
|---|---:|---|---|---|
| `appartement-quartier` | 1 | Quelle pièce donne directement sur le balcon ? | appartement (`near`) | quartier (`wide`) |
| `appartement-quartier` | 2 | Par quelles rues aller de l’immeuble à l’école ? | quartier (`wide`) | appartement (`near`) |
| `appartement-quartier` | 3 | Quelle porte relie la cuisine au couloir ? | appartement (`near`) | quartier (`wide`) |
| `appartement-quartier` | 4 | Quel arrêt se trouve près de la bibliothèque ? | quartier (`wide`) | appartement (`near`) |
| `quartier-ville` | 1 | Où se situe la gare dans la ville par rapport au quartier des Cerisiers ? | ville (`wide`) | quartier (`near`) |
| `quartier-ville` | 2 | Quel passage piéton permet de traverser entre la place et le parc ? | quartier (`near`) | ville (`wide`) |
| `quartier-ville` | 3 | Quelle ligne principale relie les Cerisiers au centre-ville ? | ville (`wide`) | quartier (`near`) |
| `quartier-ville` | 4 | Quelle petite rue borde le terrain de sport ? | quartier (`near`) | ville (`wide`) |
| `local-regional` | 1 | Par quelle entrée les paniers sont-ils retirés dans la halle ? | marché (`near`) | région (`wide`) |
| `local-regional` | 2 | Quelles routes relient les fermes des communes voisines au marché ? | région (`wide`) | marché (`near`) |
| `local-regional` | 3 | De quels secteurs de la région arrivent les trois trajets d’approvisionnement ? | région (`wide`) | marché (`near`) |
| `local-regional` | 4 | Où se trouve le quai de livraison par rapport à la halle ? | marché (`near`) | région (`wide`) |

Aucun contenu n’est tiré au hasard ou généré. L’inversion de chaque destination fournit un routage non réussi complet et authentique pour le parcours smoke ; ce n’est ni une réponse incomplète ni un état fabriqué après coup.

### Valid-answer and transition rules

- `placements[ticket.id]` vaut seulement `near`, `wide` ou demeure absent avant choix.
- Une pile peut recevoir de zéro à quatre tickets ; aucun quota de deux n’est utilisé comme indice de correction.
- Une activation de route remplace la destination précédente du ticket et met à jour les piles, mais ne soumet pas.
- La réponse devient soumissible seulement lorsque les quatre IDs du dossier ont une destination.
- Un dossier est correct seulement si les quatre destinations correspondent à `ticket.correctWindow`. Il n’existe ni score partiel, ni seuil, ni réponse alternative cachée.
- En cas d’erreur, le premier ticket incohérent dans l’ordre authored sélectionne un retour spécifique. Les autres routes restent visibles et ne sont pas automatiquement révélées comme correctes ou incorrectes.
- `retry` conserve `placements` et `submittedPlacements`. L’élève doit modifier activement une ou plusieurs routes, puis soumettre de nouveau.
- La continuation n’est disponible qu’après une soumission entièrement correcte.
- La completion n’est atteignable qu’après les trois IDs de variation.
- Un rechargement réinitialise tout l’état en mémoire.

### Coarse complete-route alternative

Un mode visible « tournée complète » présente deux routages complets avec les mêmes numéros de tickets et les mêmes fenêtres. Il offre une comparaison d’ensemble dont l’utilité et le risque d’élimination restent à observer auprès d’élèves. Son bouton choisit **et soumet** explicitement la tournée ; il appelle `authoredPlacements` puis la même fonction `evaluateRoutes` que la table principale. Il n’existe donc ni résultat parallèle, ni clé cachée, ni raccourci de test. Les marqueurs hérités `data-smoke-answer` décorent ces deux contrôles ordinaires et visibles.

L’ordre A/B alterne entre les dossiers et la répartition correcte des numéros change (`1·3 / 2·4`, puis `2·4 / 1·3`, puis `1·4 / 2·3`). La position ne constitue pas une règle stable.

### Edge cases and ambiguity guards

- Chaque demande nomme soit deux repères, soit un repère et un détail ; la justification explique les deux filtres.
- Quand les deux fenêtres contiennent le lieu (passage piéton, petite rue, porte, quai), l’option large est exclue explicitement parce que son modèle déclare ce détail simplifié.
- Quand la vue rapprochée conserve beaucoup de détail mais coupe une liaison (école, gare, centre, fermes), elle est exclue par l’étendue, pas parce qu’elle serait « moins bonne » en général.
- Le quartier change de rôle d’une variation à l’autre afin d’éviter une règle lexicale fixe.
- Les couples sont nommés ; aucune interprétation de *grande/petite échelle* n’est nécessaire.
- Les étendues approximatives ne demandent aucun calcul et ne prétendent pas représenter une localité réelle.
- Les termes *région* et *commune* décrivent uniquement le dossier fictif ; aucun découpage administratif réel n’est enseigné.
- La demande sur les secteurs d’origine concerne une étendue régionale, pas une direction cardinale exacte ; aucune carte absente n’est nécessaire pour décider du document utile.
- Le marché reste multifonctionnel ; le prototype ne prétend pas que l’approvisionnement serait sa seule fonction.
- Les schémas CSS sont redondants avec le texte et ne portent aucune réponse essentielle.

## Feedback and recovery

### Incorrect feedback

Le retour conserve le routage soumis, affiche le symbole `!`, nomme le numéro du ticket, cite la question et la fenêtre choisie. L’explication authored précise ensuite l’échec : cadrage trop court pour contenir les deux extrémités, ou cadrage assez étendu mais trop simplifié pour conserver la porte, le passage ou le quai. « Faux » ou une couleur seule ne suffisent jamais.

### Scaffolded retry

La reprise conserve toutes les destinations et propose deux opérations :

1. repérer mentalement les lieux ou extrémités qui doivent tenir ensemble ;
2. comparer le nom du détail demandé avec les lignes « conserve » et « simplifie » des fenêtres.

Une piste propre au ticket attire l’attention sur la relation utile, sans remplir le bouton, soumettre, marquer toutes les autres réponses ni avancer. Une nouvelle erreur reste récupérable selon la même règle.

### Correct feedback

Le retour correct explique la distribution propre au dossier, puis détaille chaque ticket sous sa fenêtre. Il ne se contente pas de féliciter : il indique quelle étendue contient les repères et quel niveau de détail reste lisible. La règle invariante est répétée, et l’élève décide quand continuer.

## Interaction states and smoke surface

| Visible state | Evidence and transition |
|---|---|
| `intro` | But, vocabulaire, stratégie, commandes et unique action `start`. |
| `active` | Deux fenêtres, quatre tickets routables, piles en direct et soumission distincte. |
| `incorrect` | Routage soumis, question citée, fenêtre choisie, raison spécifique et action `retry`. |
| `retry` | Même variation et mêmes routes, deux filtres visibles, destinations encore modifiables et soumission. |
| `correct` | Explication spécifique, quatre justifications et règle invariante. |
| `continuation` | Région distincte avec une action `continue` volontaire. |
| `complete` | État final distinct après les trois couples, sans score ni affirmation de maîtrise. |

La racine principale expose `data-smoke-contract="6h-v1"` et `data-exercise-id="EX-0313"`. Les variations stables sont `appartement-quartier`, `quartier-ville` et `local-regional`. Dans chaque état actif ou retry, les quatre boutons planned incorrect et les quatre boutons correct portent des `data-smoke-step` contigus `1` à `4`. La soumission marquée devient visible et active une fois le routage complet.

Un wrapper de compatibilité expose les hooks actuels `data-smoke-root`, `data-smoke-exercise="EX-0313"`, `data-smoke-program="per-6h-msn-shs"` et les états hérités `ready/question/incorrect/correct/complete`. Les deux tournées complètes visibles portent `data-smoke-answer="incorrect"` et `data-smoke-answer="correct"`. Elles utilisent les mêmes objets, règles, feedback et transitions que le workbench ; aucun contrôle caché, désactivé de substitution ou logique spéciale au harness n’est présent. Le smoke générique requis exerce cette compatibilité historique, pas les quatre routages marqués suivis de la soumission ; la revue doit donc vérifier séparément le parcours détaillé `6H-SMOKE-1`.

## Accessibility and devices

- Toutes les actions utilisent des `<button>` natifs, hormis le lien d’évitement interne de l’en-tête. `Tab`, `Entrée` et `Espace` suivent le comportement du navigateur.
- Le routage ne requiert aucun glisser-déposer, pincement, hover ou précision. Sélectionner puis changer un bouton est une alternative discrète complète.
- Les contrôles ont une hauteur minimale de 48 px et des espaces non superposés ; à 320 px les deux destinations s’empilent et atteignent au moins 58 px.
- Chaque bouton annonce le numéro du ticket et la destination. `aria-pressed`, une double bordure, une coche et le texte « envoyée ici » rendent la sélection indépendante de la couleur.
- Les piles se mettent à jour en texte dans une région polie. Les transitions majeures déplacent le focus vers un titre `tabindex="-1"` après le rendu et sont aussi annoncées.
- Correct/incorrect utilisent ✓ ou !, des titres et une explication écrite ; la couleur n’est que complémentaire.
- L’ordre de tabulation suit l’ordre de lecture : fenêtres de référence, tickets 1 à 4, tableau/soumission, tournées complètes.
- À 320 CSS px, toutes les grilles passent à une colonne, les mots reviennent à la ligne, aucune largeur minimale fixe ne subsiste et le parcours complet reste verticalement accessible.
- Les motifs, cadres emboîtés et lettres de signal sont décoratifs ou redondants ; les caractéristiques essentielles restent en HTML ordinaire.
- Aucun son, délai, animation essentielle ou contenu temporaire n’est utilisé. `prefers-reduced-motion: reduce` supprime transitions et déplacement de pression sans retirer d’état.
- Le prototype accepte pointeur, toucher et clavier avec les mêmes fonctions et les mêmes règles.

## Prototype boundaries

### Included

- Un objectif observable et borné : choisir entre deux cadrages avec les filtres étendue/détail.
- Trois couples authored et douze demandes inspectables.
- Un workbench de routage actif, une comparaison complète alternative et une soumission interprétable.
- Un parcours incorrect → feedback → retry → correct → continuation → completion.
- Habitat, loisirs/déplacements, approvisionnement/échanges et un lien explicite local–régional.
- État de session uniquement en mémoire du composant.

### Excluded

- Calcul d’échelle numérique, conversion, mesure de distance ou agrandissement géométrique.
- Carte réelle, donnée cantonale, géolocalisation ou vérité sur une commune.
- Production libre de carte, légende, orientation ou évaluation automatique de texte.
- Score, rang, temps, badge de maîtrise, profil, diagnostic de personne ou analytics.
- Réseau, stockage, cookie, cache, service worker, soumission de résultat ou intégration classroom.
- Toute prétention de valider `AF-C2-10` ou l’apprentissage de l’élève.

## Isolation, privacy and source-content integrity

`Prototype.svelte` importe seulement `tick` depuis Svelte. Il n’importe aucun composant classroom, exercice frère, style partagé, moteur de jeu ou asset externe. Il n’appelle ni `fetch`, ni XHR, ni beacon, ni service worker et n’écrit dans aucun cookie, stockage local/de session, IndexedDB ou Cache Storage. Les cas, routes, réponses soumises et phases restent dans la mémoire du composant et disparaissent au rechargement.

Les lieux, étendues, textes et formes CSS sont originaux et fictifs. Aucun média, logo, police distante, mise en page tierce ou contenu propriétaire n’est copié. Les références PER restent dans ce document et ne sont pas reproduites substantiellement dans l’interface.

## Observation plan

### What to observe

- Le premier filtre utilisé : étendue, détail, nom du lieu ou position du bouton.
- La manière dont l’élève identifie les deux extrémités d’une relation.
- Le recours aux lignes « conserve » et « simplifie » lorsqu’un détail disparaît.
- Les changements de stratégie lorsque le quartier passe de cadrage élargi à rapproché.
- La modification ciblée ou globale après feedback.
- L’usage réel du tableau de piles : comparaison conceptuelle ou simple décoration.
- Le choix entre routage ticket par ticket et tournées complètes, et les raisons de cette préférence.
- La capacité à expliquer pourquoi « plus d’espace » et « plus de détail » ne sont pas synonymes de « plus utile ».

### Evidence that would support the interaction hypothesis

L’hypothèse serait soutenue si des élèves qui font d’abord un choix unidimensionnel utilisent le contraste du feedback pour réviser le ticket concerné, conservent les routes sans rapport, puis appliquent les deux filtres quand le rôle du quartier change et dans le cas local–régional. Une justification orale qui cite à la fois un repère hors cadre et un détail simplifié serait plus probante que la completion seule.

### Evidence that would weaken it

L’hypothèse serait affaiblie si la réussite vient de l’alternance des boutons, si les élèves ne consultent pas les caractéristiques des fenêtres, si le tableau de routage n’aide pas à comparer l’ensemble, si le mot *échelle* reste confondu avec la taille physique de l’écran, ou si le scaffold révèle simplement la destination sans soutenir le raisonnement. Une réussite correcte sans explication utilisable ne suffirait pas.

### Distinguishing concept error from interface friction

Une erreur conceptuelle est suggérée lorsque l’élève peut nommer le bouton activé et décrire la fenêtre, mais applique de façon répétée un seul filtre ou oublie une extrémité. Une friction d’interface est suggérée lorsqu’il indique oralement la bonne destination mais active l’autre, ne remarque pas « envoyée ici », ne comprend pas la pile en direct, perd le focus, ne trouve pas la soumission ou rencontre un texte tronqué à 320 px. L’observateur doit faire reformuler l’intention avant d’interpréter l’activation comme évidence conceptuelle. Aucun code d’erreur ou profil n’est enregistré.

### Remaining pupil-testing hypotheses

- Le mot *cadrage* est-il plus clair que *niveau de vue* pour des élèves travaillant vers la fin de 6H ?
- Les valeurs d’étendue aident-elles à comparer ou ajoutent-elles une charge numérique inutile ?
- Quatre tickets par variation permettent-ils une comparaison de piles sans alourdir la lecture ?
- Les lignes « conserve/simplifie » sont-elles assez courtes et assez visibles ?
- La tournée complète constitue-t-elle une aide motrice utile ou simplifie-t-elle trop le routage ?
- Le passage marché–région rend-il suffisamment visible la relation avec des espaces plus lointains ?
- Les élèves comprennent-ils que le même niveau « quartier » peut être rapproché ou élargi selon l’autre document comparé ?

## Findings and decisions

- **2026-07-15 — Curriculum boundary:** conserver `P56-00` et `P56-E01` comme progressions 5H–6H ; traiter `AF-C2-10` uniquement comme horizon non bandé de fin de Cycle 2. Ne revendiquer aucun endpoint officiel 6H en géographie.
- **2026-07-15 — Practice mechanic:** fournir les deux cadrages, puis faire router un ensemble de demandes. La pratique porte sur une stratégie invariante et non sur la construction initiale de l’emboîtement.
- **2026-07-15 — Conceptual variation:** faire changer le rôle du quartier et varier la portée des relations, le grain d’information et l’ordre des réponses ; ne pas varier seulement les noms ou le décor.
- **2026-07-15 — Terminology:** éviter *grande/petite échelle* dans l’interface et toujours associer rapprochement/élargissement à un espace nommé, une étendue et des détails.
- **2026-07-15 — Recovery:** conserver tout le routage et opposer étendue/détail sur un seul ticket ; ne pas auto-router ni auto-avancer.
- **2026-07-15 — Harness compatibility:** ajouter deux tournées complètes visibles et ordinaires, soumises par la même règle, plutôt qu’un doublon caché ou une API de solution.
- **2026-07-15 — Evidence ceiling:** le prototype reste `prototyping`. Aucune observation d’élève, validation pédagogique ou preuve de maîtrise n’est disponible.

## Promotion criteria

Une éventuelle promotion vers `testing` exige d’abord :

- une revue indépendante de l’identité, des trois IDs d’énoncé, du source ID et de la limite non bandée de `AF-C2-10` ;
- zéro défaut bloquant ou high sur la boucle, la lentille de pratique, l’isolement, le clavier, le toucher, le focus, les indices non colorés, le mouvement réduit et le viewport réel de 320 px ;
- la réussite du check catalogue, du build et des parcours smoke complets avec trois variations distinctes, sans réseau ni persistance ;
- une inspection de tous les contenus authored et des deux routages complets de chaque variation.

Au-delà de la préparation technique, il faudra de futures observations auprès de plusieurs élèves travaillant vers la fin de 6H montrant qu’ils utilisent les deux filtres, révisent de façon ciblée et conservent la stratégie lorsque le rôle du quartier change. Un enseignant ou responsable curriculaire devra confirmer la pertinence de la formulation et des cas. Seuls des essais d’élèves documentés et une revue autorisée pourraient soutenir plus tard le statut `validated` ; aucun contrôle automatisé ne le permet.
