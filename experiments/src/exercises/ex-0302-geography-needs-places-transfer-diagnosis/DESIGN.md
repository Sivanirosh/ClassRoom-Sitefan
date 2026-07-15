# EX-0302 — L’atelier des plans utiles

## Decision summary

L’étude place l’élève devant trois plans-propositions inédits à auditer, plutôt que devant les lieux déjà construits ou triés. Il faut confronter des indices de besoin à la fonction réelle de deux modifications possibles, puis réviser le plan. Ce mécanisme de transfert mérite d’être testé parce qu’il rend la stratégie interprétable par une petite famille de réponses, sans produire de score ni de profil.

## Curriculum alignment

- **Framework:** PER, Cycle 2
- **Years represented by the prototype:** 6H comme contexte de diagnostic exploratoire des progressions 5H–6H ; aucune attente de fin de cycle ne devient un seuil 6H.
- **Cluster canonique:** `geo56-needs-places`
- **Objective codes:** `SHS 21`, `SHS 23`
- **Source ID canonique:** `src-per-0002`
- **Trace:** matrice `experiments/curriculum/mappings/6h-coverage-matrix.json`, recherche `experiments/curriculum/research/6h-geography-coverage.md`, source PER v3.0 pp. 70, 74–77.

### PER evidence

La matrice classe comme **progressions 5H–6H** :

- `PER-C2-GEO-P56-00` — cadre spatial proche et liens pertinents avec des espaces plus lointains ;
- `PER-C2-GEO-P56-Q01` — observation, questionnement et hypothèses sur l’aménagement selon les besoins ;
- `PER-C2-GEO-P56-Q02` — identification/catégorisation de besoins vitaux et secondaires ;
- `PER-C2-GEO-P56-Q03` — identification de lieux qui répondent plus spécifiquement aux besoins ;
- `PER-C2-GEO-P56-O01` — fonctions, utilisations, parties et relations d’un lieu.

`PER-C2-GEO-AF-C2-01` et `PER-C2-GEO-AF-C2-04` sont des **attentes non bandées de fin de Cycle 2**, jamais des attentes explicitement marquées 6H. Elles orientent seulement le diagnostic : aucune interface ni conclusion ne dit qu’un élève de 6H doit déjà les avoir acquises.

### Design interpretation

Le PER ne propose pas cet audit, les plans temporaires ni les familles de réponse. Le refuge communal, l’épicerie mobile et la fête du quartier sont des contextes originaux utilisés pour transférer la relation besoin–fonction vers des formes nouvelles : reconversion temporaire, service en réseau et organisation éphémère. Ils ne décrivent aucun lieu réel et ne reprennent aucun contenu propriétaire.

## Learning objective

**Réviser, dans trois contextes nouveaux, un plan de lieux en choisissant la modification dont la fonction répond au besoin attesté par les indices.**

L’évidence observable est le trajet de réponse pour chaque plan, la correction après retour et la mobilisation conjointe des indices ; la somme de réponses correctes n’est pas interprétée comme un niveau d’élève.

## Prerequisites

- Relier un besoin à une activité et à la fonction d’un lieu.
- Lire une mini-légende textuelle avec des symboles simples.
- Comprendre qu’un même espace peut changer de fonction selon son aménagement et son usage.
- Comparer deux modifications de plan et décider sans geste précis.

## Misconceptions and productive difficulty

Aucune source citée ne documente des misconceptions. Le diagnostic emploie donc des **familles de réponses de conception**, qui décrivent une action et jamais une personne :

- `ATTRACTIVENESS_OVER_NEED` — la modification séduisante est choisie malgré une fonction sans rapport avec le besoin attesté ;
- `LABEL_OVER_EVIDENCE` — un nom familier est privilégié alors que les indices décrivent une autre activité ;
- `LOCAL_ONLY` — le lieu immédiat est choisi sans l’accès ou la liaison nécessaire à sa fonction ;
- `FUNCTION_MATCH` — la modification retenue relie les indices au besoin et à la fonction attendue.

La difficulté productive consiste à coordonner deux indices dans une représentation nouvelle. Une légende incomprise, un bouton hors écran ou un symbole non expliqué relève de l’interface et doit être distingué d’une famille de réponse conceptuelle.

## Evidence of learning

- Consulter les indices avant de modifier le plan.
- Choisir une modification dont l’activité possible répond au besoin décrit.
- Réviser après un retour qui montre l’indice ignoré, sans recevoir une avance automatique.
- Maintenir la relation dans une reconversion, un service mobile puis un événement temporaire.
- Lors d’observations futures, expliquer quelle fonction changerait si l’on retenait l’autre proposition.

Le prototype ne produit aucune conclusion sur l’élève, ne conserve aucun résultat et n’établit ni transfert durable ni maîtrise.

## Core interaction hypothesis

> Si l’élève audite des plans nouveaux en reliant plusieurs indices à la fonction créée, tandis qu’un retour diagnostique nomme l’indice négligé, alors sa stratégie de transfert devient observable et révisable.

## Exercise loop

1. Lire le mandat et les deux indices du dossier.
2. Examiner le plan actuel et les deux patchs possibles.
3. Appliquer un patch ; ce choix constitue une décision soumise.
4. Enregistrer en mémoire de composant le chemin courant et la famille de réponse applicable.
5. Lire un retour spécifique, puis en cas d’erreur ouvrir une grille « besoin / activité / lieu » et réviser le même plan.
6. Après une décision étayée, passer au dossier suivant.
7. Terminer avec une synthèse de la méthode, sans afficher de code diagnostique ni de score.

## Progression

1. **Salle communale reconvertie après une tempête :** besoin vital d’abri temporaire ; deux indices directs ; opposition entre équipement de loisir et couchages/zone calme. Famille incorrecte `ATTRACTIVENESS_OVER_NEED`.
2. **Hameau sans commerce fixe :** besoin d’approvisionnement ; horaires et trajet d’une épicerie mobile ; opposition entre un nom familier sans service et un arrêt relié à la tournée. Famille incorrecte `LABEL_OVER_EVIDENCE`.
3. **Fête sur deux places :** besoin d’échanges et de déplacement entre activités ; mini-réseau avec passage ; opposition entre embellissement isolé et chemin signalé reliant les zones. Famille incorrecte `LOCAL_ONLY`.

Les contextes, représentations et structures de décision n’ont pas été répétés textuellement dans EX-0300 ou EX-0301. Aucun temps limite ni hausse artificielle de vitesse n’est utilisée.

## Feedback and scaffolding

Chaque retour incorrect mentionne le patch soumis, l’activité qu’il permet réellement et l’indice laissé sans réponse. **Ouvrir la grille d’audit** affiche trois questions (« De quoi a-t-on besoin ? », « Quelle action doit devenir possible ? », « Quel patch la rend possible ? ») mais ne sélectionne rien. Le retour correct cite les indices et explique la fonction obtenue. La décision reste visible dans la phrase de retour jusqu’à la continuation.

## Content model

Les trois dossiers sont écrits et inspectables dans `Prototype.svelte`. Chaque dossier contient : identifiant stable, mandat, deux indices, état initial, deux patchs, clé correcte, famille incorrecte, grille de récupération et retours spécifiques.

**Validité :** un patch est correct si, et seulement si, sa conséquence répond aux deux indices nécessaires au mandat. Le distracteur crée une fonction plausible mais laisse explicitement un indice sans réponse. Il n’existe pas de combinaison générée ni de résultat partiel. L’ambiguïté multifonctionnelle est évitée par un mandat local et deux indices suffisants. Les codes sont internes, écrasés à chaque tentative et réinitialisés au démarrage/rechargement.

## Diagnostic memory model

- `responsePath`: tableau en mémoire du composant, mis à jour à chaque patch soumis sous la forme dossier/choix ;
- `errorFamily`: code courant parmi les quatre familles ci-dessus ;
- une tentative incorrecte marquée pour le smoke produit toujours le code non-succès documenté du dossier ;
- une tentative correcte remplace le code courant par `FUNCTION_MATCH` ;
- démarrage et rechargement réinitialisent ces valeurs ;
- aucune identité, saisie libre, persistance, console, analytics, requête réseau ou soumission n’existe.

## Interaction states

- `intro` : mandat général, définition d’un patch et commandes ;
- `active` : dossier, indices, plan et deux patchs ;
- `incorrect` : patch soumis, cue ✗ et explication diagnostique ;
- `retry` : grille d’audit visible et patchs de nouveau disponibles ;
- `correct` : patch soumis, cue ✓ et justification ;
- `continuation` : action explicite vers le dossier suivant ;
- `complete` : synthèse après trois variations distinctes.

Les marqueurs de compatibilité du smoke pilote existant sont portés par les mêmes patchs visibles et la même logique ; aucun bouton de test ni solution cachée n’est créé.

## Accessibility and devices

- Les patchs sont des boutons natifs, accessibles dans l’ordre de lecture avec `Tab`, `Entrée` et `Espace`.
- Le plan est aussi décrit en texte ; aucun sens ne dépend du dessin, de la position, du son ou d’une animation.
- Cibles d’au moins 48 px et aucune opération de glisser, dessiner ou viser finement.
- Symboles ✓/✗, titres « À revoir / Décision étayée » et texte complètent la couleur.
- Les retours persistants utilisent `role="status"` et `aria-live="polite"`; le focus visible n’est ni masqué ni piégé.
- À 320 px, indices, plan et patchs deviennent une colonne ; mots et codes internes ne débordent pas car aucun code n’est affiché à l’élève.
- Sous `prefers-reduced-motion: reduce`, les éventuels changements décoratifs sont neutralisés ; toutes les informations restent immédiatement disponibles.

## Prototype boundaries

### Included

- Trois contextes de transfert : reconversion, service mobile et réseau temporaire.
- Un audit à deux indices, récupération et décision révisée.
- Quatre familles de réponse en mémoire locale du composant.
- Couverture directionnelle honnête des attentes de fin de cycle.

### Excluded

- Profil, score, interprétation psychométrique, tableau enseignant ou export de résultats.
- Stockage, cookies, service worker, requête réseau ou données d’élèves.
- Plan réel, urgence réelle, conseil de sécurité ou données communales.
- Affirmation d’acquisition de `AF-C2-01` ou `AF-C2-04` en 6H.

## Observation plan

Observer l’ordre dans lequel les indices sont consultés, les explications données avant/après retour, les révisions et l’usage de la grille. L’hypothèse serait soutenue si les choix corrects sont justifiés par les deux indices et si la grille permet une révision sans élimination aveugle. Elle serait affaiblie si le patch est choisi par longueur/position, si un seul indice suffit par hasard ou si les familles ne distinguent pas les trajets observés.

Pour séparer concept et interface, faire paraphraser les indices et le résultat de chaque patch avant décision, noter les problèmes de lecture/focus à part, puis comparer la justification orale au code de réponse. À tester avec des élèves : familiarité du mot *patch* (défini comme « modification » dans l’interface), compréhension de la reconversion temporaire, et utilité réelle de la grille.

## Findings and decisions

- **2026-07-15 — Implémentation initiale :** trois audits originaux, familles de réponse en mémoire, récupération et smoke contract ajoutés. Le statut demeure `prototyping`; aucune donnée d’élève n’a été recueillie.
- **Décision conservée :** ne jamais afficher les codes de famille à l’élève ; le retour décrit seulement l’action et l’indice à reconsidérer.

## Promotion criteria

Avant promotion : revue indépendante du curriculum, du contenu, des trois familles non-succès et de l’isolation ; réussite des parcours clavier, toucher 320 px et mouvement réduit ; observations autorisées avec des élèves de 6H permettant de vérifier que les codes décrivent des trajets distincts et que les contextes sont compris ; révision documentée des cas ambigus ; autorisation explicite de promotion. Aucun smoke test, taux de réussite ou code interne ne vaut validation pédagogique.
