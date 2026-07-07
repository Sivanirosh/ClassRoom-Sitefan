# Classe Numérique locale

Application SvelteKit pour une classe. Les élèves ouvrent un QG, explorent cinq mondes de travail, puis les résultats sont enregistrés dans SQLite. Le tableau enseignant est protégé par une session serveur.

## Pages

1. `/`

   QG de la classe

2. `/livrets`

   Atelier des Livrets

3. `/geometrie`

   Défi des Formes

4. `/calculs`

   Calcul Décimal

5. `/numeria`

   Royaumes de Numéria

6. `/pcp`

   Espace PCP et Orientation

7. `/teacher`

   Tableau enseignant protégé

## Installation

```bash
npm install
```

## Base locale

SQLite crée par défaut le fichier suivant.

```bash
data/classroom.sqlite
```

Pour choisir un autre fichier, utilisez cette variable.

```bash
DATABASE_URL="file:./data/ma_classe.sqlite"
```

Créer ou mettre à jour le schéma.

```bash
npm run db:migrate
```

## Accès enseignant

Pour un essai local rapide.

```bash
TEACHER_PASSWORD="test" npm run dev
```

Pour un usage de classe, générez un hash.

```bash
TEACHER_PASSWORD_INPUT="mot de passe long" npm run teacher:hash
```

Puis démarrez avec la valeur obtenue.

```bash
TEACHER_PASSWORD_HASH="pbkdf2_sha256$..."
```

## Développement

```bash
npm run dev
npm run check
npm run build
npm audit
```

## Serveur construit

Fixez `ORIGIN` avec la vraie adresse ouverte dans le navigateur. SvelteKit en a besoin pour accepter les formulaires protégés.

```bash
npm run build
HOST=127.0.0.1 PORT=3000 ORIGIN=http://127.0.0.1:3000 node build
```

Sur le réseau de classe.

```bash
HOST=0.0.0.0 PORT=3000 ORIGIN=http://ordinateurclasse.local:3000 node build
```

## Données

Les activités enregistrent le prénom, le monde, la mission, le score, les erreurs et la date dans SQLite. Le tableau enseignant lit ces données et permet de noter une intervention.
