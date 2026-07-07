<!-- Managed by pi-project-memory. Canonical project memory; prefer staged updates in pending/ unless the user explicitly asks to edit. -->
# Project

Project: ClassRoom-Sitefan
Project ID: classroom-sitefan
Status: Vision reset captured

## Mission
Create a classroom learning portal where pupils explore fun, adventure-like learning worlds while the teacher gets reliable signals to follow each pupil's evolution and intervene when useful.

## What This Project Is
- A local-first classroom web product for pupils and teachers.
- A minimal command-center hub (QG/base camp) with multiple learning worlds.
- Current worlds to preserve: L'Atelier des Livrets, Le Défi des Formes, Le Calcul Décimal, Les Royaumes de Numéria, and Espace PCP / Orientation.
- A teacher monitoring space focused on intervention signals, formal evidence, world progression, and careful/private comparison.
- A planned SvelteKit full-stack application backed by SQLite.

## Primary Users / Operators
- **Students / pupils**: enter the hub, choose worlds freely, complete activities, and see fun progress/map/constellation views.
- **Teacher / classroom operator**: runs or administers the classroom server, monitors pupils, reviews activity results, and uses signals to guide learning.

## Non-goals
- Do not become a Duolingo-like streak/badge habit app.
- Do not add a public class leaderboard or shame/discourage weaker pupils.
- Do not become surveillance software; teacher analytics exist for teaching support.
- Do not keep Firebase/client-side persistence as the product architecture.
- Do not preserve inline mega-scripts, hardcoded frontend teacher password, or static-page architecture.
- Do not define AI tutoring/grading behavior until the AI product role is explicitly decided.

## Current Truth
- The existing repo is a static HTML prototype with useful activity mechanics and visual direction.
- The reset target is a real product architecture: SvelteKit full-stack, TypeScript strict, Drizzle ORM, SQLite, day-one security, and deep server modules.
