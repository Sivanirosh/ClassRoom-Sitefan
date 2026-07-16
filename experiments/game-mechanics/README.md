# Game Mechanics Memory

This repository-local, Obsidian-compatible collection preserves reusable mechanic research and prototype learning.

Its purpose is simple:

```text
approve the learning contract → search established classroom tasks
→ search existing memory → research only gaps → explain semantic fit
→ test owner-approved candidates as catalog grayboxes → write outcomes back
```

It is **not** a certification system, an exhaustive game catalog, or a replacement for owner playtesting.

## Layout

```text
game-mechanics/
├── precedents/     # PRE-* factual records about real games/platforms
├── mechanics/      # MEC-* reusable mechanic abstractions
├── applications/   # APP-* project adaptations and owner findings
├── templates/      # Copyable record templates
├── mechanics.base  # Obsidian views
└── README.md
```

## Record types

### `PRE-*` — precedent

Captures source-backed facts about an actual game or interactive-learning platform:

- primary player verbs;
- constraints and challenge source;
- visible feedback/recovery behavior when documented;
- transferable observations;
- explicit unknowns;
- first-party source URLs and access dates.

A precedent record describes what the source supports. It does not claim that our adaptation will work.

### `MEC-*` — mechanic pattern

Abstracts a reusable design pattern across one or more precedents:

- moment-to-moment loop;
- state model;
- meaningful decisions;
- challenge and failure structure;
- recovery pattern;
- potential learning affordances;
- accessibility risks;
- conditions where the pattern is a poor fit.

### `APP-*` — application outcome

Records what happened when this project used or rejected a mechanic:

- sequence and exercise links;
- hypothesis and adaptation;
- owner observations;
- revisions and rejected forms;
- gate disposition;
- reusable lessons and cautions.

Applications may preserve failures. A rejected approach can be more valuable than a polished screenshot.

## Read path

1. Open `mechanics.base` in Obsidian for table views.
2. Search by frontmatter properties such as `primary_verbs`, `challenge_sources`, `state_model`, `learning_affordances`, or `sequence_id`.
3. Follow wikilinks from a mechanic to its precedents and prior applications.
4. Read source-backed facts separately from local interpretation.

Plain-text examples from the repository root:

```bash
rg -l 'primary_verbs:|  - program' experiments/game-mechanics
rg -l 'spatial-constraints|ordered-checkpoints' experiments/game-mechanics
rg -l 'sequence_id: SEQ-N1' experiments/game-mechanics/applications
rg -n '^## (Source-backed loop|Transferable pattern|Owner findings)' experiments/game-mechanics
```

## Write path

### Before semantic-fit rationales

1. Start from the approved sequence spine and one owner-approved checkpoint learning contract.
2. Search repository curriculum research for established classroom problem/task families first.
3. Search this mechanics memory next; research only missing or stale facts.
4. Add/update `PRE-*` and `MEC-*` records.
5. Cite the task sources and relevant memory records in every candidate rationale.
6. Do not invent candidates to fill a quota or present an uncited synthesis as established practice.

### After semantic-fit disposition and catalog grayboxing

1. Create/update an `APP-*` record for the sequence, checkpoint, and catalog exercise—or for a rejected pre-catalog adaptation when its lesson is durable.
2. Preserve approved, revised, and rejected forms without confusing rejection of an adaptation with evidence against an abstract mechanic.
3. Record the actual owner disposition and gate scope; never infer or propagate approval.
4. Link back to the learning contract, semantic-fit rationale, source tasks, and catalog `DESIGN.md`.

### After final production

Update the application with final interaction, accessibility, asset, motion, and validation lessons. Synchronize the exercise design record with what was actually built.

## Frontmatter conventions

Every real record has:

- a stable `PRE-*`, `MEC-*`, or `APP-*` ID;
- `record_type`;
- a concise `summary`;
- dates;
- the tag `game-mechanics/record`;
- retrieval properties appropriate to its type;
- wikilinks to related records.

Use lowercase hyphenated vocabulary for retrieval fields. Add a new term when it conveys a real distinction; do not manufacture a rigid taxonomy before repeated use demonstrates one.

Choose the next unused numeric ID within the record type. IDs never change when titles change.

## Evidence and copying boundary

- Prefer official rules, manuals, developer pages, and first-party platform documentation.
- Store concise paraphrases and URLs, not copied manuals or substantial protected text.
- Clearly label source-backed facts, project interpretation, and unknowns.
- Extract abstract mechanics only.
- Do not copy levels, datasets, problems, solutions, characters, dialogue, terminology, UI composition, screenshots, branding, artwork, audio, or source code.

## Workflow authority

The binding process is [`../design/prototype-production-workflow.md`](../design/prototype-production-workflow.md).

The initial records were seeded from the first `SEQ-N1` retrospective on 2026-07-15; later records preserve first-party research for subsequent checkpoint cycles. They are research memory only. An approved learning contract and semantic-fit rationale authorize a low-fi catalog graybox; only replay plus explicit owner judgment scoped to the catalog exercise, sequence, and checkpoint can approve expansion.
