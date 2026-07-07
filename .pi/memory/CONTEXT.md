<!-- Managed by pi-project-memory. Canonical project memory; prefer staged updates in pending/ unless the user explicitly asks to edit. -->
# Context

## Domain Model
- **Student**: a pupil's classroom identity. Initially simple and backend-normalized; fuller student auth/passwords are in the MVP v1 roadmap.
- **Teacher**: the classroom operator with protected access to monitoring and notes.
- **Hub / QG**: the minimal command center where a student sees identity, available worlds, and a lightweight progress snapshot.
- **World**: a top-level learning area in the hub. Current worlds: Livrets, Formes/Géométrie, Calcul Décimal, Numéria, PCP / Orientation.
- **WorldProgress**: per-student per-world state: current level/mission, completed missions, best score, and unlock state.
- **ActivityResult**: evidence emitted by completing an activity/mission: student, world, mission, score, errors/error families, and timestamp.
- **TeacherNote**: optional teacher-authored note attached to a student.
- **Teacher-facing learner profile**: deeper monitoring view built from activity results and notes; visible to teacher, not the same as student progress.
- **Radar**: a summary of world-axis progress/skill appreciation at one point in time, with temporal evolution planned.
- **Future Path workshop**: PCP / Orientation; a side-world focused on CV, letter, and career preparation.

## Terminology
- Use **world** for hub-level learning areas.
- Use **student progress** for pupil-visible world progress only.
- Use **teacher-facing learner profile** for analytics intended for the teacher.
- Use **activity result** for persisted exercise/mission evidence.
- Use **error family** for a recurring category of mistakes useful for teaching intervention.
- Use **skill/world radar** for radar/spider summaries; first axes mirror worlds.
- Use **map/constellation** for the student-facing radar metaphor.

## Constraints
- Classroom-local first: the app should run on a teacher machine or school server with a local database.
- Hub worlds stay mostly open; unlocks can exist inside worlds.
- Students navigate freely; automatic remediation/steering is not the student UX for now.
- No public leaderboard. Competition may exist as personal bests and optional challenges.
- Day-one security: teacher access and protected teacher data cannot live in frontend HTML.
- AI behavior is not defined; only provider-compatible building blocks are planned.

## Architecture Notes
- Chosen stack: **SvelteKit full-stack + TypeScript strict + Drizzle ORM + SQLite**.
- SvelteKit owns UI routes and backend/API routes.
- Domain logic should live in deep server modules under server-side library code; routes are thin adapters.
- Initial server modules: Student, WorldProgress, ActivityResult, TeacherNote, auth/session, radar/analytics later.
- Firebase is not the target architecture and should not be directly accessed by activity pages after reset.
- Current static HTML files are salvage assets for mechanics/content/visual direction, not architecture.

## User Preferences
- For major architecture choices, present a holistic option set and concise trade-off summary before recommending.
- Prefer strategic programming, modular design, deep modules, information hiding, and zero tolerance for accidental complexity.
- Avoid waterfall-style overdesign, but also avoid tactical/vibe-coded patches.
- Keep product changes minimal unless a structural reset is needed for long-term simplicity.
