# EX-0314 — Le passeport des documents

## Decision summary

Cette étude de transfert présente trois documents fictifs qui ne ressemblent pas à une suite de cartes scolaires : une grille de capteurs dans un jardin, un journal de casiers de jeux et un bordereau de bibliobus. L’élève compose pour chacun un « passeport » en deux parties — l’étendue spatiale effectivement couverte, puis une information que le document permet réellement d’établir — avant une soumission distincte. Cette mécanique mérite d’être testée parce que le couple étendue/information, la révision et une petite famille de réponses rendent la stratégie interprétable sans score, profil ni affirmation sur l’élève.

## Curriculum alignment

- **Framework :** PER
- **Cycle / année de catalogue :** Cycle 2 / `6H`
- **Programme :** `per-6h-msn-shs` ; tag de catalogue `program-per-6h`
- **Cluster canonique :** `geo56-scale` — *Deux échelles locales*
- **Lentille allouée :** `transfer-diagnosis` ; le catalogue contient exactement `lens-transfer-diagnosis`
- **Objective codes exacts :** `SHS 21`, `SHS 23`
- **Source ID de statement et de métadonnées :** `src-per-0002`
- **Source institutionnelle complémentaire consultable :** `src-per-0003` confirme l’autorité CIIP, la version et le routage SHS 21–23 ; elle n’ajoute pas un seuil annuel.
- **Matrice autorisée :** `experiments/curriculum/mappings/6h-coverage-matrix.json`
- **Synthèse de recherche :** `experiments/curriculum/research/6h-geography-coverage.md`

### Traçabilité statement par statement

| Statement ID canonique | Classification conservée | Usage borné dans l’étude | Source et pages |
|---|---|---|---|
| `PER-C2-GEO-P56-00` | **progression 5H–6H**, cadre spatial partagé | Les trois dossiers fictifs portent sur un espace proche vécu, fréquenté ou documenté ; chacun signale un lien avec un espace plus lointain sans confondre ce renvoi avec l’étendue observée. | `src-per-0002`, pages imprimées 70 et 74 |
| `PER-C2-GEO-P56-E01` | **progression 5H–6H** | Identifier et distinguer des étendues locales emboîtées : zone/site/quartier, point/parc/ville, commune/région proche. | `src-per-0002`, pages imprimées 74–76 |
| `PER-C2-GEO-AF-C2-10` | **attente non bandée de fin du Cycle 2**, `directional-or-diagnostic-only` | Donner un horizon diagnostique à l’identification de l’étendue d’un document, sans en faire une attente obligatoire de fin de 6H. | `src-per-0002`, page imprimée 77 |

Les tags normalisés correspondants sont `statement-per-c2-geo-p56-00`, `statement-per-c2-geo-p56-e01` et `statement-per-c2-geo-af-c2-10`. Ils ne remplacent pas les identifiants canoniques ci-dessus.

### Compte rendu curriculaire directement appuyé par la source

La progression 5H–6H de géographie se situe dans un espace vécu, fréquenté ou documenté de la région proche, en faisant apparaître des liens avec des espaces plus lointains (`PER-C2-GEO-P56-00`). Elle inclut l’identification de deux échelles locales, par exemple appartement/quartier, quartier/ville ou local/régional (`PER-C2-GEO-P56-E01`). La matrice rattache `SHS 21` et l’objectif de méthodes intégré `SHS 23` à ce cluster. L’attente `PER-C2-GEO-AF-C2-10` concerne l’identification de l’échelle d’un document **au plus tard à la fin du Cycle 2**.

La source canonique de géographie consultée ne publie aucune attente fondamentale explicitement marquée « 6e ». `PER-C2-GEO-AF-C2-10` reste donc un horizon diagnostique non bandé ; ce prototype ne dit jamais qu’il doit être acquis en 6H.

### Interprétation de conception — séparée des éléments PER

Le PER ne prescrit ni des documents ayant perdu leur couverture, ni un passeport en deux réglages, ni les données fictives, ni cette interface, ni les familles de réponses. La conception fait l’hypothèse qu’obliger à associer **champ spatial** et **portée de l’information** révèle mieux une stratégie qu’une demande isolée « quelle est l’échelle ? ». Le renvoi lointain placé au bord de chaque dossier sert à tester si l’élève distingue un espace relié d’un espace effectivement représenté ; ce distracteur est une invention de conception, pas un constat de misconception documentée.

### Ce que l’exercice n’établit pas

- Il n’établit ni maîtrise de `SHS 21`/`SHS 23`, ni atteinte de `AF-C2-10`, ni niveau d’un élève.
- Il ne valide pas la taxonomie interne des erreurs et ne prouve pas un transfert durable.
- Il ne teste pas une échelle cartographique numérique, un calcul de distance, une orientation ou une légende conventionnelle complète.
- Il ne permet pas d’inférer qu’un élève identifierait l’étendue de n’importe quel document réel.
- Une arrivée à l’écran final, un clic correct, le nombre d’essais ou le temps ne valent pas preuve d’apprentissage.
- Aucun essai avec élèves ni validation enseignante n’a été réalisé pendant cette implémentation ; le statut demeure `prototyping`.

## Learning objective

**Composer, pour trois documents inhabituels, un passeport associant l’étendue spatiale couverte et une information réellement soutenue par les repères du document, puis réviser cette association.**

L’action observable comprend deux choix distincts, une soumission explicite, la conservation de la proposition pendant le retour et, si nécessaire, la modification du cadre ou de l’information. La réussite n’est pas réduite au nom d’une catégorie d’échelle : l’information sélectionnée doit aussi rester dans le champ du document.

## Prerequisites

- Comprendre qu’un document représente une portion d’espace et ne montre pas automatiquement tout lieu qu’il cite.
- Reconnaître les relations d’inclusion usuelles : une zone appartient à un site ; plusieurs zones et chemins peuvent appartenir à un parc ; plusieurs communes peuvent être reliées dans une région proche.
- Repérer des noms de lieux, des heures, des valeurs et un ordre de liaison dans de courts documents.
- Comparer des nombres entiers simples et lire une température en degrés sans calcul complexe.
- Utiliser des boutons de sélection et comprendre qu’une sélection peut être changée avant l’envoi.

### Vocabulaire maintenu dans l’interface

- **Étendue :** portion d’espace comprise dans le document ; elle ne désigne pas la quantité de détails.
- **Bords du document :** début et fin du champ effectivement observé, pas les simples provenances ou destinations citées.
- **Information vérifiable :** phrase dont chaque élément utile apparaît dans le document.
- **Renvoi :** lien vers un lieu extérieur au champ ; il peut montrer une relation proche–lointain sans agrandir le document.
- **Passeport :** association proposée entre une étendue et une information ; c’est une métaphore de conception, définie avant l’activité.

## Misconceptions and productive difficulty

La source citée ne documente pas des misconceptions propres aux trois documents. Les motifs suivants sont donc des **hypothèses de conception ou stratégies possibles à observer**, jamais des étiquettes attribuées à un élève :

1. **Renvoi lointain pris pour le champ :** agrandir l’étendue dès qu’un atelier, une gare ou une provenance extérieure est cité en marge.
2. **Premier lieu pris pour tout le document :** réduire un journal ou une chaîne au premier point nommé malgré plusieurs lieux couverts.
3. **Détail confondu avec étendue :** supposer qu’un document très détaillé couvre nécessairement un espace plus grand, ou l’inverse.
4. **Information au-delà des bords :** choisir une phrase plausible sur le quartier, la ville, la bibliothèque ou les pays voisins alors que les données ne portent pas sur ces espaces.
5. **Mot saillant sans coordination :** faire correspondre « gare », « région » ou « bibliothèque » entre le document et une réponse sans vérifier ce qui est réellement mesuré.

La difficulté productive est de coordonner deux contrôles : **quels lieux sont tous inclus ?** puis **quelle phrase reste prouvable à l’intérieur de ce cadre ?** La longueur des textes, le vocabulaire de « renvoi », une sélection peu visible, un bouton hors écran ou une grille difficile à parcourir sont des frictions d’interface possibles et ne doivent pas être interprétés comme une stratégie géographique.

## Evidence of learning

Un faisceau d’indices plus riche que la correction comprend :

- parcourir tous les lieux ou toutes les étapes avant de régler l’étendue ;
- distinguer les éléments qui possèdent une mesure des lieux seulement cités en marge ;
- expliquer oralement, lors d’un futur essai autorisé, « mon cadre commence ici et finit là » ;
- sélectionner une information dont l’heure, le groupe comparé et les lieux sont tous présents ;
- après retour, modifier précisément l’étendue en cas de cadre trop grand/serré, ou seulement la phrase en cas d’information hors champ ;
- réutiliser le même double contrôle dans un document non cartographique où les relations sont données par un journal ou un ordre d’agrafage ;
- ne pas convertir automatiquement un lien vers un espace plus lointain en étendue régionale.

Le prototype conserve seulement les choix soumis pour rendre ce trajet inspectable en mémoire de composant. Une future observation verbale serait nécessaire pour distinguer un raisonnement d’une élimination ou d’une activation accidentelle.

## Core interaction hypothesis

> Si l’élève doit calibrer séparément **l’étendue couverte** et **l’information soutenue**, puis reçoit un retour qui cible le réglage en cause, alors sa manière d’interpréter un document à une échelle inhabituelle devient observable et révisable.

## Transfer/diagnosis distinction

La structure de décision est un **passeport documentaire**, pas une répétition de zooms imbriqués ou un entraînement à nommer des couples déjà enseignés. Les représentations cibles sont volontairement étrangères à la carte conventionnelle : mesures dans les zones d’un jardin, journal de casiers d’un parc et reçus de bibliobus reliés par leur ordre. L’élève doit reconstruire l’étendue depuis les éléments couverts, puis contrôler l’ambition d’une phrase.

Distinction de rôle prévue pour le triplet, à confirmer par la revue indépendante des trois prototypes réels :

- `EX-0312` construction devrait rendre visible l’inclusion et ce qui change lorsque le champ s’élargit ;
- `EX-0313` pratique devrait stabiliser la comparaison de couples d’échelles locales dans des cas variés ;
- `EX-0314` transfère à des documents sans couverture ni carte classique et diagnostique séparément le cadre choisi et l’information attribuée.

Cette phrase décrit une intention de diversité, pas un résultat de revue ni une preuve que les deux exercices frères l’ont effectivement réalisée.

## Exercise loop

1. L’introduction définit *étendue*, explique le renvoi au-delà du bord et annonce deux réglages.
2. Un document fictif sans couverture est présenté avec tous ses éléments utiles en texte.
3. L’élève choisit une étendue parmi trois niveaux emboîtés ; la sélection est visible et réversible.
4. L’élève choisit une information parmi trois phrases ; aucune sélection seule n’est évaluée.
5. Le bouton **Apposer le passeport** soumet explicitement le couple complet.
6. À chaque couple soumis, la même fonction calcule une famille, ajoute un enregistrement à `responsePath` et garde `applicableFamily` en mémoire du composant.
7. En cas de non-succès, le passeport soumis reste visible avec un retour spécifique et une action de reprise.
8. La reprise remet les contrôles à zéro, conserve un résumé du dernier passeport et fournit un repère propre à la famille sans sélectionner la réponse.
9. Une association cohérente reçoit une explication qui relie les bords à l’information.
10. Une action visible ouvre le document suivant ; après trois variations réussies, un écran distinct résume les deux contrôles sans score ni revendication de maîtrise.

La section **Lecture groupée** est une alternative ordinaire de réponse : deux passeports complets et visibles combinent les mêmes deux réglages. Apposer l’un de ces passeports appelle la même fonction de diagnostic que la composition détaillée. Elle sert aussi à la compatibilité du pilote générique actuel ; ce n’est ni un bouton caché ni une règle différente.

## Progression

La variation ne repose ni sur la vitesse ni sur un ajout arbitraire de décor. Trois dimensions conceptuelles changent :

1. **Inclusion dans un site :** quatre zones d’un même jardin partagé, avec beaucoup de détails mais une petite étendue.
2. **Réseau local sans carte :** quatre casiers répartis dans un parc de loisirs, avec une navette vers la gare régionale.
3. **Chaîne entre communes :** un dépôt de livres et trois communes forment une région proche, tandis que la provenance antérieure reste hors du bord.

La représentation change aussi : grille spatiale, journal tabulaire, puis succession temporelle. Le renvoi lointain change de rôle (provenance matérielle, correspondance, arrivage antérieur) afin d’éviter une règle superficielle liée à un mot fixe. Le soutien ne s’accumule pas automatiquement ; une reprise fournit un seul masque mental ou contrôle verbal adapté au motif soumis.

### Trois variations authored et inspectables

#### 1. `fiche-capteurs-jardin` — grille de capteurs

- **Contexte :** loisirs ; jardin partagé fictif de l’espace proche.
- **Éléments couverts :** serre 24 °C, mare 18 °C, verger 20 °C, kiosque 21 °C, tous à 17 h.
- **Lien plus lointain :** les capteurs sont dits livrés par un atelier régional ; cet atelier n’est pas mesuré.
- **Étendues proposées :** `jardin-partage` (rang 1, valide), `parc-communal` (rang 2), `quartier` (rang 3).
- **Information valide unique :** `serre-plus-chaude` — la serre est la zone relevée la plus chaude à 17 h.
- **Informations hors champ :** prétendre que le quartier est le plus chaud de la région ; calculer la moyenne de tout le parc.
- **Chemin incorrect planifié `6H-SMOKE-1` et pilote actuel :** `quartier` + `quartier-plus-chaud`.
- **Famille non-succès déterministe :** `CADRE_TROP_LARGE`.

#### 2. `journal-casiers-parc` — journal de quatre casiers de jeux

- **Contexte :** loisirs et échanges ; quatre zones d’un parc fictif.
- **Éléments couverts à 16 h 30 :** Ponton 3, Grande pelouse 8, Kiosque 1, Terrain rouge 5 jeux ; trajets de 2 à 7 minutes entre les casiers.
- **Lien plus lointain :** une navette sort du parc vers la gare régionale ; le journal n’y compte rien.
- **Étendues proposées :** `un-casier` (rang 1), `parc-des-rives` (rang 2, valide), `ville-entiere` (rang 3).
- **Information valide unique :** `pelouse-maximum` — Grande pelouse a le plus de jeux parmi les quatre casiers relevés à cette heure.
- **Informations hors champ :** prétendre un usage dans toute la ville ; attribuer huit jeux à la gare.
- **Chemin incorrect planifié :** `un-casier` + `ponton-ville`.
- **Famille non-succès déterministe :** `CADRE_TROP_SERRE`.

#### 3. `bordereau-bibliobus-region` — reçus d’une tournée

- **Contexte :** échanges et lecture itinérante ; dépôt et communes fictifs de la région proche.
- **Éléments couverts dans l’ordre :** Dépôt des Livres 07 h 30, Clairval 08 h 10, Roche-Basse 08 h 45, Mont-Fauve 09 h 25.
- **Lien plus lointain :** certains livres arrivent d’une ville plus lointaine avant le dépôt ; le bordereau commence seulement au dépôt.
- **Étendues proposées :** `un-arret` (rang 1), `une-commune` (rang 2), `region-proche` (rang 3, valide).
- **Information valide unique :** `depot-trois-communes` — le document soutient l’ordre dépôt, Clairval, Roche-Basse, Mont-Fauve.
- **Informations hors champ :** emplacement des bandes dessinées dans la bibliothèque de Clairval ; origine dans tous les pays voisins.
- **Chemin incorrect planifié :** `une-commune` + `rayon-clairval`.
- **Famille non-succès déterministe :** `CADRE_TROP_SERRE`.

Tous les noms et toutes les données sont inventés pour le prototype. Ils ne décrivent aucun jardin, parc, service, commune ou itinéraire réel.

## Feedback and scaffolding

### Retour ciblé par réglage

- **Cadre trop large :** le retour nomme le lieu extérieur ou la provenance qui a été ajoutée sans être couverte, puis oppose les lieux mesurés aux simples renvois.
- **Cadre trop serré :** le retour énumère les lieux ou étapes laissés hors du passeport et rappelle qu’un cadre doit les contenir ensemble.
- **Information hors champ :** le retour conserve l’étendue lorsque celle-ci convient, puis nomme les espaces ou valeurs absents qui rendent la phrase invérifiable.
- **Passeport cohérent :** le retour cite les éléments du document et explique pourquoi l’étendue et la phrase concordent.

Les titres « À ajuster »/« Champ juste », les symboles ↺/✓ et le texte portent le résultat en plus de la couleur. Aucun message ne qualifie l’élève.

### Reprise récupérable

Le bouton **Réexaminer le même document** ouvre un état `retry` distinct. Le passeport précédent reste résumé ; les choix redeviennent libres. Le repère dépend de la famille : masquer une provenance, vérifier que tous les lieux tiennent dans le cadre, ou souligner uniquement les mots retrouvables. Il ne nomme jamais l’option valide, ne la sélectionne pas, ne réduit pas le choix à un seul bouton et n’avance pas automatiquement.

### Soumission séparée

Dans la composition détaillée, les deux sélections n’ajoutent aucune tentative au chemin. **Apposer le passeport** est une décision séparée et n’est activé que lorsque les deux parties sont remplies. Une activation incomplète n’est pas possible via le contrôle désactivé ; les annonces indiquent ce qui manque pendant la composition. La voie groupée présente, elle, chaque couple complet comme un passeport prêt à être apposé : son bouton est à la fois le choix de ce couple et son envoi explicite, sans raccourci vers un résultat.

## Content model

### Modèle borné

`Prototype.svelte` contient exactement trois objets `Variation`. Chaque objet porte :

- un ID stable et un type de document ;
- un contexte, une note de réception et quatre éléments documentaires authored ;
- un renvoi extérieur explicite ;
- exactement trois options d’étendue avec un rang ordinal 1–3 ;
- exactement trois informations ;
- une clé d’étendue et une clé d’information valides ;
- une paire incorrecte planifiée ;
- des retours et échafaudages authored pour les trois familles non-succès ;
- un retour correct spécifique ;
- un ordre authored pour les deux passeports groupés.

Il n’existe ni génération aléatoire, ni base ouverte, ni calcul cartographique, ni dépendance externe.

### Règle de validité

Un passeport est réussi si et seulement si :

1. l’ID d’étendue soumis est exactement `correctExtentId` ; et
2. l’ID d’information soumis est exactement `correctInformationId`.

La classification traite d’abord l’écart de rang : rang supérieur → `CADRE_TROP_LARGE`, rang inférieur → `CADRE_TROP_SERRE`. Si le rang/ID d’étendue est correct mais la phrase ne l’est pas, la famille est `INFORMATION_HORS_CHAMP`. Seul le couple exact produit `PASSEPORT_COHERENT`.

### Gardes d’ambiguïté

- Chaque étendue valide contient tous les éléments qui portent une valeur ou une étape, sans exiger de savoir local externe.
- Les renvois extérieurs sont explicitement marqués comme non mesurés, non comptés ou antérieurs au début du bordereau.
- L’information valide reprend un groupe, une heure ou un ordre exactement visibles ; aucun calcul implicite autre qu’un maximum parmi quatre entiers n’est requis.
- Les distracteurs ajoutent toujours un espace absent (`tout le parc`, `toute la ville`, intérieur de la bibliothèque, pays voisins) ou une donnée non fournie.
- Les cartes visuelles répètent l’ensemble des informations en texte ; aucune estimation de distance, de taille dessinée ou de couleur n’est nécessaire.
- Les trois niveaux d’étendue sont définis sous chaque bouton, afin que la correction ne dépende pas d’une nomenclature locale cachée.
- Le rang ne prétend pas être une échelle numérique universelle ; il ordonne seulement les trois options authored du dossier.

### Cas limites

- **Une seule partie choisie :** le bouton de soumission reste désactivé ; aucune trace ni famille n’est créée.
- **Changement avant envoi :** le nouveau bouton remplace visiblement le réglage précédent, sans enregistrer l’ancien.
- **Étendue correcte + phrase incorrecte :** `INFORMATION_HORS_CHAMP`, ce qui permet d’isoler le second contrôle.
- **Étendue incorrecte + phrase correcte :** la famille de cadre prévaut, puisque l’interprétation spatiale n’est pas encore stabilisée ; le chemin conserve néanmoins les deux IDs.
- **Ordre des passeports groupés :** il varie (`incorrect/correct`, puis `correct/incorrect`, puis `incorrect/correct`) pour éviter une position fixe.
- **Rechargement :** retour à l’introduction et variables vides ; aucun état n’est restauré.

## Diagnostic response path and error vocabulary

Aucune famille ci-dessous n’est une catégorie de personne ni une misconception validée. Elle décrit uniquement le couple soumis dans un dossier authored.

| Code interne | Succès ? | Motif de réponse observable | Usage du retour |
|---|---:|---|---|
| `CADRE_TROP_LARGE` | non | Rang d’étendue supérieur à l’étendue authored ; le couple inclut un espace seulement cité ou non observé. | Distinguer lieux couverts et renvoi extérieur. |
| `CADRE_TROP_SERRE` | non | Rang inférieur ; au moins un lieu ou une étape qui porte une donnée reste hors du cadre. | Parcourir tous les lieux avant de borner. |
| `INFORMATION_HORS_CHAMP` | non | Étendue exacte, mais phrase qui ajoute une valeur, un lieu ou une généralisation absente. | Vérifier chaque mot dans le document. |
| `PASSEPORT_COHERENT` | oui | Étendue exacte et information exacte. | Expliquer comment les éléments bornent et soutiennent la phrase. |

### Mémoire de composant

À chaque passeport complet effectivement envoyé, `commitPassport()` :

1. calcule la famille depuis les deux IDs réellement sélectionnés ;
2. construit `{ variationId, extentId, informationId, family, attemptNumber }` ;
3. ajoute cet objet au tableau `responsePath` ;
4. remplace `applicableFamily` par la famille courante ;
5. copie la tentative dans `lastSubmitted` pour que le retour corresponde à la proposition visible.

La composition détaillée et les passeports groupés appellent cette même fonction. Les trois paires incorrectes planifiées produisent respectivement `CADRE_TROP_LARGE`, `CADRE_TROP_SERRE` et `CADRE_TROP_SERRE`, toutes des familles non-succès documentées. Un chemin manuel « étendue juste + information hors champ » produit la troisième famille non-succès.

Ces variables vivent uniquement dans l’instance Svelte. Elles sont remises à vide par `begin()` et disparaissent au rechargement. Elles ne sont jamais affichées sous forme de code, mises en console, additionnées en score, associées à une identité, persistées, transmises ou exposées à un service. Il n’y a ni stockage, cookie, IndexedDB, Cache Storage, service worker, analytics, fetch, XHR, beacon, formulaire réseau ni texte libre.

## Interaction states

| État `6H-SMOKE-1` visible | Contenu et transition |
|---|---|
| `intro` | But, définition d’étendue, deux contrôles et unique `start`. |
| `active` | Document courant, options ordinaires marquées en deux étapes, voie groupée et unique `submit` pour la composition. |
| `incorrect` | Passeport soumis, symbole ↺, retour spécifique et unique `retry`. |
| `retry` | Passeport précédent, échafaudage, options réactivées et même ID de variation. |
| `correct` | Passeport soumis, symbole ✓ et explication spécifique. |
| `continuation` | Région visible séparée avec unique `continue`. |
| `complete` | Synthèse distincte après trois variations réussies. |

Les IDs stables de variation sont `fiche-capteurs-jardin`, `journal-casiers-parc` et `bordereau-bibliobus-region`. `active`, `incorrect`, `retry`, `correct` et `continuation` portent toujours l’ID courant.

### `6H-SMOKE-1` et compatibilité du pilote actuel

Le `<main>` expose `data-smoke-contract="6h-v1"` et `data-exercise-id="EX-0314"`. Les mêmes contrôles d’étendue et d’information visibles portent des étapes contiguës `1` et `2` pour les chemins `data-smoke-attempt="incorrect"` et `"correct"`. Le bouton réel `submit` reste nécessaire ensuite. Aucun marqueur ne modifie la classification.

Un ancêtre structurel en `display: contents` porte les aliases historiques `data-smoke-root`, `data-smoke-exercise="EX-0314"`, `data-smoke-program="per-6h-msn-shs"` et l’état `ready/question/incorrect/correct/complete`, tandis que le `<main>` conserve uniquement le vocabulaire d’état `6H-SMOKE-1` dans ses régions visibles. La section visible **Lecture groupée** fournit exactement un `data-smoke-answer="incorrect"` et un `"correct"` dans chaque état question. Ce sont des alternatives grossières ordinaires : chaque bouton montre l’étendue et la phrase complètes, puis appelle `submitCompactPassport()` et `commitPassport()`. La proposition incorrecte enregistre donc la même paire planifiée et la même famille non-succès que la composition détaillée ; il n’existe pas de solution cachée, de contrôle désactivé de substitution ou de logique réservée au test. Le smoke générique requis traverse cette voie historique ; il ne prouve pas que le chemin détaillé en deux réglages puis soumission a été exercé. Celui-ci demande une preuve navigateur séparée lors de la revue.

## Accessibility and devices

### Clavier et focus

- Toutes les actions sont des boutons natifs ; `Tab` suit document → étendues → informations → soumission → lecture groupée.
- `Entrée` et `Espace` gardent leur comportement natif ; aucun glisser, dessin, survol ou geste précis n’est requis.
- `aria-pressed` et les libellés « Cadre réglé ✓ » / « Retenue ✓ » exposent les deux sélections.
- Après démarrage, soumission, reprise, continuation et arrivée au bilan, le focus est déplacé vers le titre visible du nouvel état avec `tabindex="-1"` ; une région `aria-live` annonce aussi le changement.
- Un contour de focus de 4 px reste visible et ne sert pas à coder la correction : acide autour des boutons, sombre et fortement contrasté autour des titres focalisés programmatiquement.

### Toucher et pointeur

- Tous les boutons ont une hauteur minimale de 48 px ; les options principales offrent une surface bien plus grande et ne se chevauchent pas.
- Les sélections sont discrètes et réversibles avant l’envoi ; aucune imprécision motrice de placement ne peut devenir une famille géographique.
- Le bouton d’envoi est distinct et désactivé tant que les deux parties ne sont pas présentes, ce qui évite une validation accidentelle.
- La voie groupée fournit une comparaison de deux ensembles sans changer le contenu diagnostique ; son utilité et son risque de favoriser l’élimination restent des hypothèses à observer auprès d’élèves.

### Perception, texte et mouvement

- Sélection : `aria-pressed`, texte ✓, bordure et position ; résultat : mots « À ajuster » / « Champ juste », symboles ↺/✓ et explication. La couleur n’est jamais seule.
- Chaque forme graphique répète ses lieux, heures et valeurs en texte HTML ; aucune information essentielle n’est une image.
- Aucun son, délai, animation ou survol n’est nécessaire.
- `prefers-reduced-motion: reduce` supprime transitions et rotations décoratives sans enlever de contenu ni d’état.
- Les formulations utilisent des espaces fictifs et définissent le vocabulaire ; aucun jargon de test, code d’erreur ou mapping curriculaire n’est montré à l’élève.

### Comportement à 320 px

- À 900 px, document et calibrateur s’empilent ; à 620 px, toutes les grilles de choix deviennent une colonne.
- Le composant utilise `width: 100%`, `max-width: 100%`, `minmax(0, …)`, `overflow-wrap` et `overflow-x: clip` uniquement pour le décor.
- À 320 px, le journal et les reçus passent eux aussi sur deux lignes ; aucun tableau à largeur fixe ni identifiant interne n’est rendu.
- Les actions prennent la largeur disponible, les cibles restent au moins 48 px, et le défilement vertical conserve tous les contrôles atteignables.
- Le chemin complet erreur → reprise → correction → continuation → bilan reste identique au clavier, au toucher et au pointeur.

Ces propriétés techniques doivent encore être confirmées par le navigateur et une inspection manuelle ; elles ne constituent pas une validation avec élèves.

## Prototype boundaries

### Included

- Un objectif unique sur l’association étendue/information.
- Trois documents fictifs, bornés et inspectables.
- Trois formes documentaires et trois niveaux d’étendue locale/proche.
- Un lien explicite vers un espace plus lointain dans chaque variation, distingué du champ couvert.
- Une composition en deux parties, une soumission, un retour ciblé, une reprise et une continuation.
- Une petite famille de réponse et un chemin en mémoire de composant.
- Opération clavier, toucher et pointeur, mise en page prévue pour 320 px et mouvement réduit.

### Excluded

- Échelle numérique, distance réelle, orientation, coordonnées, calcul de surface ou cartographie exacte.
- Documents ou données d’un lieu réel ; conseil de température, prêt réel de jeux ou tournée réelle.
- Recherche libre, génération, aléatoire, texte libre évalué ou traitement automatique du langage.
- Score, chronomètre, classement, badge, profil, tableau enseignant ou interprétation psychométrique.
- Identité, analytics, réseau, résultat soumis, stockage, cookie, IndexedDB, Cache Storage ou service worker.
- Import d’un exercice frère, d’un moteur commun, de l’application de classe, de média externe ou de contenu protégé reproduit.
- Couche cantonale, MER pris comme norme, ou affirmation que l’attente de fin de Cycle 2 est un endpoint 6H.

## Observation plan

### Actions et paroles à observer lors de futurs essais autorisés

- L’élève parcourt-il tous les éléments ou choisit-il après le premier nom saillant ?
- Peut-il montrer où commence et finit le champ, puis distinguer le renvoi extérieur ?
- Utilise-t-il la quantité de détails comme raccourci pour juger l’étendue ?
- Vérifie-t-il l’heure et le groupe comparé avant de retenir une phrase ?
- En reprise, change-t-il le réglage ciblé ou les deux sans raison ?
- La stratégie passe-t-elle de la grille au journal, puis à la chaîne non cartographique ?
- Les mots *étendue*, *renvoi* et *champ* sont-ils compris sans surcharge ?
- La voie groupée aide-t-elle certains élèves ou encourage-t-elle une comparaison superficielle ?

### Ce qui soutiendrait l’hypothèse d’interaction

- L’élève justifie l’étendue en énumérant tous les lieux couverts et exclut verbalement le lieu seulement cité.
- Après `CADRE_TROP_LARGE` ou `CADRE_TROP_SERRE`, il corrige d’abord le cadre en expliquant le bord manquant ou ajouté.
- Après `INFORMATION_HORS_CHAMP`, il conserve l’étendue juste et retire la généralisation non documentée.
- Dans le troisième dossier, il reconstruit spontanément l’étendue depuis la chaîne de reçus sans réclamer une carte.
- Sa justification distingue « relié à » et « compris dans le document ».

### Ce qui affaiblirait ou falsifierait l’hypothèse

- Les réponses sont prédites par la position, la longueur des textes ou un mot identique plutôt que par les bords.
- Les élèves réussissent seulement après avoir découvert que la bonne réponse change de rang 1 → 2 → 3.
- Les renvois extérieurs sont si artificiels qu’ils produisent un piège linguistique plutôt qu’un raisonnement d’échelle.
- Le second contrôle ajoute de la lecture mais ne distingue aucune stratégie supplémentaire.
- Le repère de reprise donne implicitement la réponse ou provoque une simple élimination.
- Les familles internes ne concordent pas avec les explications verbales.

### Distinguer concept et friction d’interface

- Demander à l’élève de montrer le bouton qu’il pensait avoir choisi après une activation manquée ; un écart intention/sélection est une friction.
- Noter séparément perte de focus, texte non lu, terme inconnu, bouton hors écran, incompréhension de `aria-pressed` et couple conceptuellement motivé mais incorrect.
- Faire reformuler le document avant la soumission : une bonne délimitation orale avec un mauvais clic ne doit pas être interprétée comme `CADRE_TROP_SERRE`.
- Vérifier si la personne comprend qu’un passeport groupé est envoyé immédiatement ; une hésitation sur ce contrôle n’est pas une erreur d’échelle.
- Comparer le code interne au raisonnement oral ; le code reste une hypothèse de design et doit être retiré s’il décrit mal les stratégies.

### Hypothèses restant à tester avec des élèves

- La métaphore du passeport est-elle claire sans évoquer un document d’identité réel ?
- « Étendue » et « champ » sont-ils assez concrets pour des élèves travaillant vers la fin de 6H ?
- Quatre éléments plus trois phrases restent-ils lisibles sans surcharge de mémoire de travail ?
- Le renvoi en marge est-il compris comme relation extérieure plutôt que comme consigne à ignorer toujours ?
- L’ordre croissant des étendues sur trois dossiers crée-t-il une attente de progression ?
- La distinction jardin/parc est-elle stable sans plan conventionnel supplémentaire ?
- La phrase « parmi les quatre casiers relevés » rend-elle suffisamment visible la garde d’ambiguïté ?
- La voie groupée reste-t-elle une alternative utile et non un raccourci de comparaison par longueur ?

## Findings and decisions

- **2026-07-15 — Frontière curriculaire :** conserver `PER-C2-GEO-AF-C2-10` uniquement comme attente non bandée de fin de Cycle 2 et horizon diagnostique. Aucun seuil 6H n’est inféré.
- **2026-07-15 — Mécanique de transfert :** employer trois documents sans carte conventionnelle et un passeport en deux réglages, afin de diagnostiquer le rapport entre étendue et information plutôt que le rappel d’un nom d’échelle.
- **2026-07-15 — Cadre spatial :** intégrer dans chaque dossier un lien fictif vers un espace plus lointain, tout en signalant honnêtement qu’il se trouve au-delà du bord observé.
- **2026-07-15 — Contenu :** utiliser uniquement des noms et données inventés, assez complets pour une réponse unique et sans connaissance locale.
- **2026-07-15 — Diagnostic :** enregistrer chaque couple complet soumis dans `responsePath`, y compris les passeports groupés, et ne jamais afficher les codes à l’élève.
- **2026-07-15 — Compatibilité :** maintenir à la fois le contrat `6H-SMOKE-1` à deux étapes + soumission et les aliases visibles du pilote générique actuel, sans contrôle caché ni autre logique de réponse.
- **2026-07-15 — Limite de preuve :** aucune observation avec élèves et aucune revue indépendante du triplet n’ont eu lieu. Le statut reste `prototyping`.

## Promotion criteria

Une revue indépendante pourra envisager le passage à `testing` seulement si :

1. les trois fichiers concordent sur `EX-0314`, le titre, l’objectif, le cluster, les statements, les variations et les familles ;
2. la revue curriculaire confirme `P56-00`/`P56-E01` comme progressions 5H–6H et `AF-C2-10` comme attente non bandée de fin de Cycle 2 uniquement ;
3. la revue du triplet confirme trois mécaniques réellement distinctes pour construction, pratique et transfert/diagnostic ;
4. tous les chemins `6H-SMOKE-1` clavier sous mouvement réduit et toucher à 320 px réussissent trois variations, avec soumission, reprise, retour spécifique, continuation et bilan ;
5. le pilote générique actuel traverse les passeports groupés avec les mêmes familles et sans réseau, stockage, erreur console, overflow ou cible inaccessible ;
6. une inspection manuelle confirme focus, noms accessibles, 44 px, non-couleur, lisibilité des trois documents et absence de solution cachée ;
7. une personne enseignante ou spécialiste relit les règles, données et formulations pour écarter toute ambiguïté de contenu.

Même après ces contrôles, `testing` signifierait seulement prêt pour des essais, pas validé. Toute revendication ultérieure exigerait des observations autorisées avec plusieurs élèves de 6H, la comparaison des codes avec leurs explications, une variation de transfert supplémentaire non répétée, une revue enseignante/curriculaire et une décision explicite. Aucun smoke test, taux de réussite, chemin interne ou écran de fin ne peut établir la maîtrise ou la validation pédagogique.
