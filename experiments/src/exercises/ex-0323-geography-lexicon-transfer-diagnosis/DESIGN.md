# EX-0323 — Radio Quartier : le mot juste

## Decision summary

Le transfert place l’élève dans trois situations inédites de coordination locale où un message ambigu peut conduire au mauvais endroit ou à une mauvaise action. L’élève compose un message avec un **terme** et un **indice justificatif**, puis décide de l’envoyer; le prototype conserve en mémoire la trajectoire de réponses et une petite famille d’erreur décrivant uniquement le message soumis. Cette mécanique est à tester parce qu’elle exige un emploi fonctionnel du lexique dans une décision nouvelle, et non la répétition des définitions des exercices de construction ou de pratique.

## Curriculum alignment

- **Framework:** PER, Cycle 2
- **Cycle / years du prototype:** 6H dans la progression 5H–6H
- **Cluster canonique:** `geo56-lexicon`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source ID:** `src-per-0002`, pages imprimées 70, 74, 78–79
- **Statement IDs:**
  - `PER-C2-GEO-P56-00` — progression 5H–6H, espaces proches vécus/fréquentés/documentés et liens plus lointains;
  - `PER-C2-GEO-P56-I04` — progression 5H–6H sur l’appropriation et l’emploi du vocabulaire/notions géographiques;
  - `PER-C2-GEO-P56-I05` — progression 5H–6H et noyau lexical géographique;
  - `PER-C2-GEO-AF-C2-13` — attente non bandée de fin de Cycle 2 sur l’emploi à bon escient, conservée comme horizon diagnostique et jamais comme endpoint obligatoire 6H.

### PER evidence

La matrice finalisée mappe exactement ces énoncés au cluster. I04/I05 sont des progressions 5H–6H; P56-00 impose le cadre proche. SHS 23 est intégré à SHS 21. La source ne présente aucune attente géographique explicitement 6e; AF-C2-13 ne peut donc être utilisée ici que pour orienter une tâche de transfert et non pour conclure à une acquisition exigible en 6H.

### Design interpretation

Les appels radio fictifs, les couples terme–indice et les familles d’erreur sont authored pour cette étude. Le PER ne prescrit ni messages radio ni diagnostic automatisé. Le code d’erreur décrit une réponse observable du moment, pas un élève, et ne produit ni profil ni jugement. Réussir ces trois messages n’établit pas la maîtrise de l’attente de fin de cycle.

## Learning objective

Dans une situation spatiale nouvelle, l’élève compose et, si nécessaire, révise un message qui associe le terme géographique précis à l’indice rendant l’instruction non ambiguë.

## Prerequisites

- Comprendre une mission courte et lire un mini-croquis textuel.
- Connaître en contexte les notions `limite`, `réseau`, `aménagement`, `zone` et `région` sans devoir réciter une définition.
- Prélever une preuve explicite parmi deux formulations.
- Comprendre qu’un message utile doit dire à la fois **quoi** et **pourquoi ici**.

## Misconceptions and productive difficulty

Aucune famille ci-dessous n’est une misconception documentée sur des élèves. Ce sont des **catégories authored de réponses** et des hypothèses à observer:

- `GENERIC_TERM`: le message emploie un terme trop général alors qu’une relation plus précise est visible;
- `NEARBY_CONCEPT`: le message choisit un concept voisin mais sa fonction spatiale ne correspond pas;
- `EVIDENCE_MISMATCH`: le terme pourrait convenir, mais l’indice sélectionné ne le justifie pas dans ce contexte.

Les codes ne sont jamais affichés comme étiquettes de personne. La difficulté productive est de coordonner deux éléments concordants dans un contexte non répété. La lecture du dispositif, l’ordre de focus ou la densité du croquis sont des frictions d’interface à observer séparément.

## Evidence of learning

- Le message soumis contient un terme et un indice plutôt qu’un choix isolé.
- La révision modifie l’élément effectivement contredit par le feedback.
- Le response path permet au futur observateur de distinguer un terme voisin, un mot générique et une preuve incohérente.
- L’élève maintient la stratégie `nommer + justifier` sur trois structures: bord d’une zone, liaison de lieux, ouvrage facilitant un franchissement.
- Une verbalisation future peut demander: « Une autre personne saurait-elle agir avec ce message? Pourquoi? »

Le composant ne calcule aucun score, niveau ou diagnostic de l’élève.

## Core interaction hypothesis

> Si l’élève doit envoyer un message utilisable en associant un terme à un indice concordant, alors l’emploi du lexique à bon escient devient observable dans une situation nouvelle et révisable sans classement.

## Exercise loop

1. L’introduction présente la règle radio: `un mot précis + un indice utile`.
2. Une mission fictive affiche une situation et deux éléments de message.
3. L’élève choisit le terme, puis l’indice; les deux choix restent visibles.
4. `Envoyer le message` soumet la composition.
5. À chaque soumission, le composant ajoute la paire au `responsePath` en mémoire et fixe le code de réponse applicable.
6. Un échec donne un feedback spécifique, conserve le message et propose `Réouvrir le canal`.
7. Le retry attire l’attention sur la discordance sans remplir les deux éléments.
8. Un message correct reçoit une explication de son utilité et une action `Mission suivante`.
9. Après trois messages corrects, completion récapitule la stratégie sans afficher code, score ou maîtrise.

Une voie directe visible propose deux messages complets à gros targets et soumet la même règle. Elle est une alternative ordinaire et porte les hooks de compatibilité du harness actuel; elle ne contourne aucun feedback ni état.

## Progression

1. **Lisière après l’orage — limite:** signaler le bord où commence la zone inondée; contexte de sécurité et de séparation.
2. **Collecte itinérante — réseau:** guider un véhicule entre trois points reliés; contexte d’approvisionnement et de liaison.
3. **Passage vers le terrain — aménagement:** identifier la passerelle créée pour franchir un ruisseau; contexte de loisirs et de fonction d’un ouvrage.

Ces contextes sont nouveaux par leur décision de coordination et leur représentation en message, même si les mots ont été rencontrés dans le cluster. Le contexte, la relation et la structure de preuve varient délibérément.

## Feedback and scaffolding

- **Limite:** une `zone` nomme la surface; la mission demande son bord. Le feedback cite la ligne pointillée et le changement sec/inondé.
- **Réseau:** une `route` isolée ne suffit pas; les trois points et leurs liaisons forment le réseau décrit.
- **Aménagement:** `construction` décrit l’origine, tandis que `aménagement` relie ici l’ouvrage à l’usage de franchissement.
- Pour un mismatch, le feedback nomme le terme soumis et l’indice qui ne le prouve pas.
- Retry pose une question ciblée: `surface ou bord?`, `un tronçon ou plusieurs lieux reliés?`, `objet seul ou fonction rendue possible?`.
- Correct feedback reformule le message complet et explique pourquoi il guiderait l’action.

## Content model

Chaque `Mission` authored contient:

- `id` et variation stable;
- appelant, mission, croquis textuel et symbole non-color;
- deux termes (`correctTerm`, `wrongTerm`);
- deux indices (`correctEvidence`, `wrongEvidence`);
- messages directs correct/incorrect;
- `wrongFamily` parmi les trois codes;
- feedback incorrect, scaffold et feedback correct.

Règle de correction: succès uniquement si **les deux** valeurs correspondent à `correctTerm` et `correctEvidence`. Sinon:

1. terme erroné générique → `GENERIC_TERM`;
2. terme erroné voisin → `NEARBY_CONCEPT` selon le cas authored;
3. terme correct et preuve erronée → `EVIDENCE_MISMATCH`.

Le planned incorrect smoke attempt choisit le message authored erroné et produit toujours un code non-success déclaré. Les options n’exigent aucune donnée réelle; les noms sont fictifs. Une seule paire est entièrement concordante. Le content set est fixe, inspectable et limité à trois missions.

Edge cases: soumission inactive tant que terme et preuve ne sont pas choisis; réponse erronée conservée; retry ne réinitialise que l’édition, pas le chemin local; correct continuation ne saute aucun cas; completion après trois variations; reload réinitialise `responsePath` et `errorFamily` par recréation du composant. Aucun texte libre, identifiant ou timestamp n’est stocké.

## Interaction states

- `intro` — mission, vocabulaire minimal et commandes;
- `active` — composition en deux panneaux et soumission;
- `incorrect` — message, explication, famille formulée en langage neutre et retry;
- `retry` — même mission avec question scaffoldée;
- `correct` — message utile et explication;
- `continuation` — action explicite;
- `complete` — résumé de la stratégie, sans résultat transmis.

Le root et les régions suivent `6H-SMOKE-1`; les étapes du correct/incorrect path sont contiguës lorsqu’un attempt en demande deux. Les anciens sélecteurs de smoke sont aussi exposés sur les messages directs visibles et ordinaires pour le harness livré, sans condition de test ni backdoor.

## Accessibility and devices

- Boutons natifs pour terme, indice, message direct et actions; parcours complet au clavier.
- Les groupes exposent leur nom et `aria-pressed`; la sélection utilise texte, symbole et bordure en plus de la couleur.
- Cibles de 48 px minimum et espacement de 10 px; aucune précision de glisser-déposer.
- L’ordre mobile est mission → terme → indice → message → soumission.
- Feedback textuel `role="status"`, annonce polie et focus visible.
- À 320 px, le poste radio devient une colonne, les mots se replient et aucune largeur fixe ne déborde.
- Reduced motion supprime les transitions et déplacements; aucun son ni clignotement n’est nécessaire.
- Les croquis sont faits de CSS, caractères et texte accessible; aucune information n’existe seulement dans une image.
- Pointer/touch/keyboard appellent les mêmes fonctions.

## Prototype boundaries

### Included

- Trois missions fictives, trois relations et un message à deux éléments.
- `responsePath` et `errorFamily` en mémoire locale du composant.
- Erreur planned, retry, correction, continuation et completion.
- Trois codes de réponse observables et authored.

### Excluded

- Profil d’élève, score, niveau, prédiction ou inférence psychologique.
- Texte libre, audio, géolocalisation, vraie radio ou service réseau.
- Persistance, analytics, cookie, IndexedDB, cache, résultat soumis ou classroom import.
- Faits administratifs/cantonaux, cartes réelles, média externe ou contenu propriétaire.
- Affirmation que AF-C2-13 est un endpoint obligatoire 6H ou que le prototype est validé.

## Observation plan

Lors de futurs essais, observer:

- si le terme ou l’indice est choisi en premier et pourquoi;
- si le message complet est relu avant l’envoi;
- quelle partie est modifiée après le feedback;
- si le troisième contexte déclenche la stratégie sans reprise mot à mot d’un cas antérieur;
- les response paths et codes uniquement comme descriptions de réponses;
- les erreurs de Tab, de toucher ou de compréhension de la mise en page distinctes du raisonnement lexical.

L’hypothèse serait soutenue si une réponse non-success est révisée sur l’élément contradictoire et si terme+preuve restent concordants dans le troisième contexte. Elle serait affaiblie si l’élève devine le bouton, ignore la preuve, ou si la mise en scène radio détourne de la géographie. On distinguera interface friction et erreur conceptuelle par une demande orale de composer le message sans interface et par l’observation d’actions non prises à cause du focus ou du layout.

Questions résiduelles: deux éléments suffisent-ils à rendre la stratégie interprétable? Les codes couvrent-ils les réponses réellement produites sans surinterpréter? Le contexte de coordination est-il compréhensible en 6H sans explication supplémentaire?

## Findings and decisions

- **2026-07-15 — Conception initiale:** choisir une composition terme+preuve dans une mission de coordination, structure nouvelle par rapport à la définition construite et à la note réparée.
- **2026-07-15 — Diagnostic boundary:** conserver uniquement `responsePath` et `errorFamily` en mémoire du composant; aucun profil, identité, score ou envoi.
- **2026-07-15 — Language decision:** afficher une description neutre de la discordance, jamais le code ni une étiquette de personne.
- **2026-07-15 — Limite de preuve:** aucune utilisation par des élèves; le vocabulaire de codes et les scaffolds restent à valider.

## Promotion criteria

Le passage à `testing` requiert d’abord la revue indépendante complète du cluster, la vérification de la nouveauté du transfert, du reset local, des marqueurs, des parcours clavier/touch/320 px/reduced motion et des commandes automatiques. Toute promotion ultérieure exigerait des observations montrant que:

- le message est composé à partir du contexte, pas de la position des options;
- le feedback conduit à une révision interprétable sans donner la paire finale;
- les codes décrivent les réponses rencontrées sans prétendre diagnostiquer l’élève;
- le troisième contexte constitue bien un transfert et non un rappel verbal;
- un enseignant confirme l’utilité et l’éthique de la trace minimale.

Aucun agent ni test ne pourra marquer ce record `validated` sans essais d’élèves documentés et décision pédagogique autorisée.
