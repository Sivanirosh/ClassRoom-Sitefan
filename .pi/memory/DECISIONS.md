<!-- Managed by pi-project-memory. Canonical project memory; prefer staged updates in pending/ unless the user explicitly asks to edit. -->
# Decisions

Use short entries here. Major architectural decisions can later move to docs/adr/.

## Accepted

### Product vision
- North star: adventure-first learning with strong teacher-facing signals for each student's evolution.
- Dashboard hierarchy: intervention signals first, formal assessment evidence second, quest/world progression third, ranking/private comparison last.
- Product topology: one hub, many worlds.
- Hub role: minimal command center with student identity, available worlds, and lightweight progress snapshot.
- Student-facing memory/progress stays minimal; teacher-facing profile can be deeper.
- Teacher learner profile should support skill trends, recent attempts, error families, and best/last scores; it is for teaching, not surveillance.
- First radar axes mirror worlds because this is simpler and more actionable; cross-world competencies are deferred.
- Both teacher and student can see radar data through different skins: formal analytic view for teacher, fun map/constellation view for student.
- No public class leaderboard. Competition can exist as personal bests and optional challenges.
- Students navigate freely; weak areas create teacher-panel signals, not automatic student steering.
- Hub worlds remain mostly open; unlocks belong inside worlds.
- PCP / Orientation is a Future Path workshop side-world with its own rhythm/progress.

### Architecture and implementation
- Reset should be minimal in visible product changes but strategic in structure.
- Target architecture is client/server/database with local-first classroom deployment.
- Use SvelteKit full-stack rather than a separate Hono backend.
- Use TypeScript strict mode for client and server.
- Use Drizzle ORM with SQLite.
- Domain logic belongs in deep server modules; SvelteKit routes should be thin adapters.
- Migrate all current HTML pages/worlds to SvelteKit on day one.
- Preserve current prototype assets: five-world hub concept, core exercise mechanics/content, adventure/mission tone, teacher score-following concept, and PCP workshop content.
- Do not preserve Firebase coupling, inline mega-scripts, hardcoded frontend teacher password, inconsistent score fields, or static-page architecture.
- Firebase may only be a future adapter if needed; it is not the product architecture.

### Data, identity, and security
- Initial local database entities: Student, WorldProgress, ActivityResult, TeacherNote.
- Student identity starts simple: pupil enters/selects a name, backend normalizes it into a Student record.
- Full student auth/passwords are part of the MVP v1 roadmap, but exact design is not settled yet.
- Security is required from day one. Teacher access must be backend-managed with protected teacher data.
- Local backend/deployment model: classroom server on teacher machine or school server, with pupils connecting through browsers.

### Roadmap and AI
- Expanded items belong to an MVP v1 roadmap, not one foundation slice.
- Roadmap sequence: foundation, product polish, advanced insight, realtime, deployment, AI foundation.
- AI product behavior is not defined. For now, provide only provider-compatible server/API building blocks and possibly a simple OpenWebUI-like page.

## Candidate
- Cross-world competency radar axes after enough activity data and mapping maturity exist.
- Exact student auth/password model.
- Exact local packaging approach for teacher machines/school servers.
- Hosted deployment architecture.
- AI UX and educational responsibilities.

## Superseded
- **Node/Hono custom backend** was selected briefly, then superseded by SvelteKit full-stack to avoid an unnecessary second server framework.
- **Vite-only client migration** was superseded by SvelteKit.
- **Client-side Firebase seam first** was superseded by immediate SvelteKit full-stack/server/database reset.
- **Cross-world radar axes as first implementation** was superseded by world-axis radar for simplicity/actionability.
- **Student memory only minimal** was refined: student-visible progress is minimal, but the teacher-facing learner profile may be deeper.
