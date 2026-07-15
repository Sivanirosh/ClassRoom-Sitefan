# EX-0320 — Le bureau des cartes utiles

## Decision summary

Cette étude de transfert place l’élève dans un bureau qui prépare une représentation pour une personne absente : livraison, poste de secours ou entretien. Pour chaque demande nouvelle, l’élève compose un bon avec un outil et un contrôle de lisibilité, puis décide si les repères nécessaires sont présents et vérifiables. Le chemin de réponse et une petite famille d’erreur restent seulement dans la mémoire du composant afin de rendre la stratégie interprétable sans profiler l’élève.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / `6H`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source IDs:** `src-per-0002`
- **Canonical cluster ID:** `geo56-represent-map` — *Schématiser, repérer, orienter, localiser*
- **Canonical statement IDs:** `PER-C2-GEO-P56-00`, `PER-C2-GEO-P56-I03`, `PER-C2-GEO-P56-R01`, `PER-C2-GEO-P56-R02`, `PER-C2-GEO-AF-C2-14`, `PER-C2-GEO-AF-C2-15`

### PER evidence

La matrice finalisée mappe ces six énoncés au cluster. `PER-C2-GEO-P56-00` est une progression 5H–6H imposant le cadre d’un espace vécu, fréquenté ou documenté de la région proche. `PER-C2-GEO-P56-I03` est une progression 5H–6H sur la représentation personnelle, la légende pertinente et la lisibilité. `PER-C2-GEO-P56-R01` est une progression 5H–6H sur le choix de repères communs, les conventions et le rapport réalité–documents. `PER-C2-GEO-P56-R02` est une progression 5H–6H sur le choix/orientation d’outils et la localisation sur schémas, plans et cartes.

`PER-C2-GEO-AF-C2-14` et `PER-C2-GEO-AF-C2-15` sont des **attentes non bandées de fin de Cycle 2**, directionnelles ou diagnostiques dans cette étude ; elles ne deviennent pas des seuils obligatoires en 6H. La source géographique canonique n’identifie aucun endpoint explicitement 6H. Références : `src-per-0002`, PDF PER pp. 70, 74, 78–79, et `experiments/curriculum/research/6h-geography-coverage.md`.

### Design interpretation

Le PER ne prescrit ni un bureau de cartes, ni les missions fictives, ni les paires outil–contrôle, ni les codes d’erreur. Le design propose que choisir une représentation ne suffit pas : il faut pouvoir dire **quelle relation la demande exige** et **quel indice permet à une autre personne de l’utiliser**. Les demandes de coordination à distance forment un contexte de transfert nouveau par rapport à la construction d’un calque et au déplacement d’un jeton des deux études sœurs.

## Learning objective

Pour une demande spatiale nouvelle, l’élève choisit une représentation adaptée et un contrôle qui permet d’en vérifier le repérage, l’orientation ou la localisation.

## Prerequisites

- Distinguer photographie, plan simplifié, liste et croquis d’itinéraire.
- Reconnaître le rôle d’un repère nommé, d’une légende et d’une flèche du nord.
- Lire une demande fonctionnelle courte et identifier l’action attendue : localiser, orienter ou suivre.
- Comparer deux propositions sans exigence de vitesse.

Les termes « outil » et « contrôle de lisibilité » sont définis dans l’introduction par des exemples concrets, sans jargon curriculaire ou diagnostique.

## Misconceptions and productive difficulty

Les motifs suivants sont des **hypothèses de conception** :

- choisir la représentation la plus réaliste alors qu’elle ne montre pas les relations utiles ;
- sélectionner un document de la bonne famille sans vérifier son orientation ;
- accepter un itinéraire sans départ partagé ;
- confondre beauté, quantité de détails et lisibilité géographique ;
- choisir une justification vraie en général mais non pertinente pour la mission.

La difficulté productive réside dans la coordination demande → outil → preuve de lisibilité. Le vocabulaire du scénario, une paire de boutons trop proche, un focus perdu ou une mission trop longue serait de la friction et non une stratégie géographique.

## Evidence of learning

Le prototype garde en mémoire locale, pour chaque tentative soumise :

- la mission, l’outil et le contrôle choisis dans `responsePath` ;
- le code de famille applicable à la dernière réponse non réussie ;
- la distinction entre choix d’outil et qualité de lisibilité ;
- la correction après un retour qui décrit le motif observable ;
- la réutilisation de la stratégie sur trois structures documentaires nouvelles.

Ces données sont réinitialisées au rechargement, ne contiennent aucune identité ou réponse libre et ne sont ni persistées ni transmises. Elles servent à inspecter le fonctionnement du prototype, pas à caractériser l’élève.

## Core interaction hypothesis

> Si l’élève compose pour une personne absente une paire « représentation + contrôle de lisibilité » et reçoit un retour lié à la demande, alors son choix d’outil et sa stratégie de repérage deviennent interprétables dans un contexte nouveau.

## Exercise loop

1. Recevoir une demande nouvelle et identifier l’action spatiale requise.
2. Choisir l’un des deux outils proposés.
3. Choisir l’un des deux contrôles de lisibilité.
4. Relire le bon complet puis le soumettre.
5. En cas d’échec, lire le motif observable, ouvrir une fiche-scaffold et recomposer le bon.
6. En cas de réussite, lire pourquoi l’outil et le contrôle concordent, puis traiter une autre mission.
7. Terminer après trois missions avec une synthèse sans score ni revendication de maîtrise.

## Progression

Les variations changent la demande, la représentation et la famille d’erreur planifiée :

1. **`delivery-localize` — approvisionnement :** une livreuse doit localiser la maison communale depuis la gare. Un plan simplifié avec rues, repère, légende et nord est utile ; une photo de façade produit `TOOL_MISMATCH`.
2. **`festival-orient` — loisirs :** une équipe doit orienter le poste de secours sur un plan temporaire. Un plan avec entrée et flèche du nord convient ; une version sans orientation produit `ORIENTATION_UNCHECKED`.
3. **`reservoir-route` — entretien/échanges :** une personne distante doit suivre un croquis entre arrêt et réservoir. Un croquis avec départ nommé et arrivée légendée convient ; une paire qui omet ou ne contrôle pas le départ commun produit `REFERENCE_GAP`.

Ce ne sont pas des répétitions verbatim de la construction (assembler un point de vue) ou de la pratique (déplacer un jeton). La structure de décision porte ici sur l’adéquation de l’outil pour autrui.

## Feedback and scaffolding

- Le bon soumis reste visible dans le feedback.
- Le retour incorrect emploie `↺`, un titre textuel et une explication spécifique à la mission ; il décrit la réponse, jamais l’élève.
- Une paraphrase humaine de la famille d’erreur indique soit un outil inadéquat, soit une orientation non vérifiée, soit un repère de départ absent. Les codes internes ne sont pas affichés dans l’interface élève.
- Le retry efface les deux choix, garde la mission et affiche une question-scaffold. Il ne donne pas la paire correcte.
- Le feedback correct emploie `✓` et explicite la relation demande–outil–contrôle.
- La continuation est visible, unique et volontaire.

## Content model

Trois missions locales fictives sont définies dans un tableau fermé. Chaque mission contient : ID stable, thème, destinataire, demande, action spatiale, outil incorrect/correct, contrôle incorrect/correct, famille d’erreur planifiée, famille si seul le contrôle échoue, feedback incorrect, scaffold, feedback correct et formule de décision.

Vocabulaire interne de familles d’erreur :

- `TOOL_MISMATCH` : le document choisi ne représente pas la relation demandée ;
- `ORIENTATION_UNCHECKED` : le document ne permet pas de relier ses directions à l’espace ;
- `REFERENCE_GAP` : la paire soumise omet le repère commun ou choisit un contrôle qui ne le vérifie pas ;
- `null` : aucune famille d’erreur sur une soumission réussie.

Règles : les deux choix sont requis ; toute paire autre que correct/correct est non réussie ; `submitOrder` ajoute la tentative à `responsePath` et met à jour `errorFamily` à chaque soumission ; l’outil incorrect détermine la famille principale de la mission, tandis qu’un outil correct avec contrôle incorrect utilise la famille de preuve ; le chemin direct visible appelle la même fonction ; le retry ne supprime pas le chemin déjà observé ; le reload réinitialise naturellement tout état.

Gardes d’ambiguïté : chaque demande n’a qu’une relation principale ; la proposition correcte contient les éléments nécessaires et aucune information externe ; le distracteur échoue pour une raison nommée ; les lieux sont fictifs ; aucun choix ne dépend de couleur, résolution d’image ou savoir local.

## Interaction states

- **Introduction / `intro` :** rôle, règle outil + contrôle et bouton de départ.
- **Active / `active` :** mission et composition en deux étapes.
- **Decision :** soumission volontaire du bon complet.
- **Incorrect / `incorrect` :** bon soumis, explication, description humaine du motif et retry.
- **Retry / `retry` :** mission conservée, scaffold et contrôles réactivés.
- **Correct / `correct` :** paire soumise et relation utile expliquée.
- **Continuation :** action vers la mission suivante.
- **Complete :** synthèse après exactement trois missions et rappel de non-enregistrement.

Le chemin `6H-SMOKE-1` est `intro → active → incorrect → retry → correct + continuation` sur les trois IDs authored avant `complete`. Les tentatives principales choisissent outil (`data-smoke-step="1"`) puis contrôle (`"2"`) et utilisent le vrai bouton `submit`; chaque soumission met à jour `responsePath` et `errorFamily` par la même règle.

Un ancêtre non rendu (`display: contents`) porte les aliases du harnais historique. L’alternative visible « deux bons complets » réunit les mêmes deux dimensions, alterne leur ordre au deuxième cas et appelle `directSubmit` puis `submitOrder`; elle alimente donc les mêmes traces locales, familles, feedbacks et continuations. Aucun bouton caché, code affiché, réponse révélée ou transition de test n’existe.

## Accessibility and devices

- Les choix et actions sont des boutons natifs de 48 px minimum, utilisables au clavier, au pointeur et au toucher.
- Les deux étapes suivent l’ordre de lecture ; `aria-pressed` expose les choix et l’aperçu du bon est en texte.
- Aucun glisser, dessin, survol, son ou geste fin n’est nécessaire ; une alternative de bons complets est visible et suit la même validation.
- Les changements d’état sont annoncés et le focus visible se place sur le titre du nouvel état sans piège.
- Erreur, réussite, sélection et progression associent texte, symbole, bordure et position, jamais la couleur seule.
- À 320 px, les colonnes, fieldsets et bons complets s’empilent ; les libellés se replient et les contrôles restent atteignables sans panoramique horizontal.
- `prefers-reduced-motion: reduce` retire transitions et transformations non essentielles, sans supprimer aucune preuve.

## Prototype boundaries

### Included

- Trois demandes fictives dans la région proche et trois types de défaillance lisible.
- Une décision en deux dimensions et un chemin de réponse local interprétable.
- Feedback, reprise scaffoldée, continuation et complétion.
- Marqueurs de fumée sur les vrais contrôles et états visibles.

### Excluded

- Création ou édition libre de cartes, vraie navigation, GPS, géolocalisation ou données réelles.
- Profil d’élève, texte libre, identité, score, analytics, stockage, réseau ou soumission de résultat.
- Conclusion clinique ou pédagogique fondée sur un code d’erreur.
- Attestation d’une attente de fin de Cycle 2 comme acquisition exigée en 6H.

## Observation plan

Observer si la demande est reformulée avant le choix, si l’élève distingue l’outil de son contrôle, et si le motif de retry conduit à changer la bonne dimension. L’hypothèse est soutenue si les choix restent justifiables sur les trois structures et si une proposition presque adaptée (plan sans nord, croquis sans départ) est reconnue comme insuffisante. Elle est affaiblie si la réussite repose sur la longueur des libellés, la position fixe des boutons, des mots-indices superficiels ou si les familles ne distinguent pas les stratégies observables.

Pour isoler la friction, relever séparément : incompréhension de « contrôle », lecture du scénario, hésitation de vocabulaire, erreur d’outil, omission d’orientation, omission de repère, ordre de focus et cible touch. Questions futures : la situation « pour une personne absente » provoque-t-elle une vérification réelle de lisibilité ? Les familles sont-elles assez distinctes ? La paire en deux étapes soutient-elle une justification ou augmente-t-elle seulement la charge de lecture ?

## Findings and decisions

- **2026-07-15 — Décision diagnostique :** trois codes seulement, liés à des réponses observables et gardés en mémoire du composant ; aucun code n’est affiché comme une étiquette d’élève.
- **2026-07-15 — Nouveauté du transfert :** choisir un document pour autrui diffère de construire un calque (EX-0318) et de se déplacer sur un plan fourni (EX-0319).
- **2026-07-15 — Confidentialité :** aucune identité, persistance, requête réseau, analytics ou transmission n’est implémentée.

## Promotion criteria

Le passage éventuel à `testing` requiert une revue indépendante du trio, l’inspection du reset local et des familles, ainsi que les parcours clavier, pointeur, toucher 320 px, reduced motion et commandes automatiques réussis. Une promotion ultérieure exigerait des observations d’élèves et une revue enseignante/curriculaire autorisée établissant que les missions sont réellement nouvelles, que les motifs restent interprétables sans étiqueter l’élève et que l’interface ne fournit pas d’indices involontaires. Le record reste `prototyping` après cette implémentation.
