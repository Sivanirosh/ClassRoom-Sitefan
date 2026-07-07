# Classe Numérique — fondation SvelteKit locale

Adventure-first classroom learning portal. Static prototype migrated toward a SvelteKit full-stack product with TypeScript strict mode, Drizzle ORM, SQLite, day-one security, student worlds, and a teacher monitoring dashboard.

Current SvelteKit routes:

- `/` : hub / QG de la classe
- `/livrets` : L'Atelier des Livrets
- `/geometrie` : Le Défi des Formes
- `/calculs` : Le Calcul Décimal
- `/numeria` : Les Royaumes de Numéria
- `/pcp` : Espace PCP / Orientation
- `/teacher` : tableau de suivi enseignant protégé côté serveur

Les anciennes URL `*.html` sont redirigées par SvelteKit vers les nouvelles routes.

See `.pi/memory/` for current vision, decisions, and roadmap.

## Installation

```bash
npm install
```

## Configuration SQLite

La base locale SQLite est créée par défaut dans `./data/classroom.sqlite`. Pour utiliser un autre fichier :

```bash
export DATABASE_URL="file:./data/ma-classe.sqlite"
```

Initialiser ou mettre à jour le schéma :

```bash
npm run db:migrate
```

Le schéma Drizzle couvre les tables `students`, `world_progress`, `activity_results`, `teacher_notes` et `teacher_sessions`.

## Configurer l'accès enseignant

Aucun mot de passe enseignant n'est stocké dans le code client. Créez un hash côté serveur :

```bash
npm run teacher:hash -- "un mot de passe long"
```

Puis démarrez le serveur avec :

```bash
export TEACHER_PASSWORD_HASH="pbkdf2_sha256$..."
```

`TEACHER_PASSWORD` est aussi accepté pour un essai local rapide, mais `TEACHER_PASSWORD_HASH` est recommandé pour une classe réelle.

## Développement et vérification

```bash
npm run dev
npm run check
npm run build
```

Pour lancer le serveur construit, fixez explicitement l'origine publique du serveur SvelteKit (nécessaire pour les formulaires POST protégés CSRF) :

```bash
npm run build
HOST=127.0.0.1 PORT=3000 ORIGIN=http://127.0.0.1:3000 node build
```

Sur un réseau de classe, utilisez l'adresse réellement ouverte par les élèves/enseignants, par exemple :

```bash
HOST=0.0.0.0 PORT=3000 ORIGIN=http://ordinateur-classe.local:3000 node build
```

Vérifier les dépendances :

```bash
npm audit --audit-level=low
```

## Persistance des résultats

Les activités n'écrivent plus directement dans Firebase. Les routes élèves envoient leurs fins d'activité à `/api/activity-results`, qui appelle les modules serveur sous `src/lib/server/*` et enregistre dans SQLite : élève, monde, mission, score, base de score, erreurs/familles d'erreurs et horodatage. Le tableau enseignant lit ces données depuis SQLite et permet d'ajouter des notes d'intervention.
