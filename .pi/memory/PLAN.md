<!-- Managed by pi-project-memory. Canonical project memory; prefer staged updates in pending/ unless the user explicitly asks to edit. -->
# Plan

## Current Objective
Reset the static prototype into a reliable, scalable SvelteKit full-stack product while preserving the existing five-world learning experience and teacher score-following concept.

## Active Milestones
1. **Foundation slice**
   - Initialize SvelteKit with TypeScript strict mode.
   - Add Drizzle ORM + SQLite with migrations.
   - Add backend-managed teacher auth/session and protected teacher endpoints/views.
   - Add server modules for Student, WorldProgress, ActivityResult, and TeacherNote.
   - Migrate all current pages/worlds to SvelteKit routes on day one.
   - Replace Firebase writes with server-side ActivityResult recording.
   - Add a basic teacher dashboard reading from SQLite.

2. **Product polish**
   - Add student world-progress view.
   - Add formal teacher radar and fun student map/constellation skin.
   - Improve teacher dashboard UX around intervention-first signals.

3. **Advanced insight**
   - Add temporal radar evolution.
   - Add error families and trend summaries.
   - Improve best/last score and recent-attempt analytics.

4. **Realtime dashboard**
   - Add live or near-live teacher dashboard updates after the basic database-backed dashboard is stable.

5. **Deployment**
   - Support classroom-local deployment on a teacher machine or school server.
   - Add hosted deployment option without changing product-domain modules.

6. **AI foundation**
   - Add provider-compatible server seam/API foundation.
   - Assume a simple OpenWebUI-like page may exist.
   - Do not define tutoring/grading/intervention behavior yet.

## Next Actions
- Scaffold the SvelteKit project in strict TypeScript.
- Design the Drizzle schema and migrations for Student, WorldProgress, ActivityResult, TeacherNote, teacher sessions/access, and later student auth.
- Define deep server module interfaces before wiring routes.
- Migrate hub and five worlds into SvelteKit routes/components.
- Replace direct Firebase/local prototype writes with server calls.
- Add initial tests/checks around persistence, auth, and activity-result recording.
- Update README after the reset architecture is scaffolded.

## Blockers / Risks
- Scope creep: expanded MVP v1 features must stay sequenced, not merged into one tactical slice.
- SvelteKit can become complex if routes contain domain logic instead of thin adapters.
- Security cannot remain frontend-only; teacher access and protected data must be backend-managed.
- Activity result schemas must be normalized early to avoid inconsistent score fields.
- Radar/analytics can become misleading if polished before the data model is stable.

## Recently Completed
- Vision-level grilling session established product soul, trust boundaries, target architecture, first data model, and MVP v1 roadmap.
