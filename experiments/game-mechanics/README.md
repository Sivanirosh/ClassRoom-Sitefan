# Game Mechanics Memory

This repository-local, Obsidian-compatible collection preserves reusable mechanic research and prototype learning.

Its purpose is simple:

```text
search existing memory → research only gaps → save useful findings
→ create grounded pitches → test one graybox → write outcomes back
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

### Before pitches

1. Search this collection first.
2. Research only missing or stale facts.
3. Add/update `PRE-*` and `MEC-*` records.
4. Cite relevant record IDs in every paper pitch.

### After selection and grayboxing

1. Create/update an `APP-*` record.
2. Preserve the selected, revised, and rejected forms.
3. Record the actual owner disposition; never infer approval.
4. Link back to the sequence artifacts and exercise `DESIGN.md`.

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

The initial records were seeded from the first `SEQ-N1` retrospective and first-party research performed on 2026-07-15. They preserve research memory; only a playable graybox and explicit owner judgment can approve an adaptation.
