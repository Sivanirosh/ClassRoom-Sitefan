<!-- Managed by pi-project-memory. Canonical project memory; prefer staged updates in pending/ unless the user explicitly asks to edit. -->
# Vision

## Long-term Direction
ClassRoom-Sitefan should become an adventure-first classroom portal: pupils learn through worlds/missions that feel fun at the core, while teachers get strong, trustworthy signals about student progress.

The topology is **one hub, many worlds**. The hub is a minimal command center with identity, available worlds, and a lightweight progress snapshot. Each world may have its own tone and progression model. PCP / Orientation is a distinct Future Path workshop world rather than a math RPG.

The product should support two presentation layers over progress/radar data:
- **Teacher view**: formal, analytic, intervention-first.
- **Student view**: visual, fun, map/constellation-like, framed as exploration rather than evaluation.

## Product / Technical Taste
- Prefer strategic programming over tactical patches: working code is not enough if it increases long-term complexity.
- Complexity means structure that makes the system hard to understand or modify. Reduce change amplification, cognitive load, and unknown unknowns.
- Prefer deep modules: small interfaces, useful behavior hidden behind clear seams, strong locality, and information hiding.
- Keep visible product changes minimal where possible, but make the internal design scalable and reliable.
- Choose boring, explicit foundations over framework sprawl.

## Principles
- Prefer explicit project memory over unstated assumptions.
- Adventure is the learning shape, not reward frosting.
- Students navigate freely; teacher guidance belongs in the teacher panel.
- Teacher metrics exist to support teaching, not surveillance.
- Dashboard hierarchy: intervention signals first, formal evidence second, quest/world progression third, ranking/private comparison last.
- World-level radar axes are the first implementation because they are intuitive and actionable; cross-world competencies may come later.
- Security is a day-one product requirement, not a later hardening pass.
- SvelteKit routes should remain thin; domain logic belongs in deep server modules.

## Things We Refuse To Become
- A public ranking/leaderboard product.
- A punitive diagnostic tool for pupils.
- A direct Firebase/static-page prototype with persistence scattered through activities.
- A waterfall rewrite that freezes a massive design before learning from implementation.
- A tactical-tornado codebase where small changes require many edits.
- A system where AI behavior is implied before its educational role is decided.
