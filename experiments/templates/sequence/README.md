# Learning-sequence workflow templates

Use these templates after a roadmap or explicitly bounded roadmap slice is approved.

The sequence is the **coherence unit**. Its stable `SEQUENCE-SPINE.md` defines progression, prerequisites, and checkpoint handoffs. One checkpoint exercise is then the **learning-contract, mechanic-graybox, and expansion unit**.

```text
full SEQUENCE-SPINE
→ owner sequence-spine gate
→ select one checkpoint exercise
→ focused LEARNING-BRIEF
   (core learning + successful-pupil statement + cognitive process)
→ owner learning-contract gate
→ established classroom-task and mechanics-memory research
→ one or more MECHANIC-FIT rationales
→ owner semantic-fit disposition per candidate
→ one catalog graybox per approved candidate
→ owner mechanic gate scoped to catalog exercise + sequence + checkpoint
→ full exercise expansion
→ sequence-handoff review
→ next checkpoint exercise
```

There is no fixed candidate count. Do not invent weak alternatives to fill a quota. The prior `MECHANIC-PITCHES.template.md` remains only as a supersession notice for historical records.

Recommended working location:

```text
experiments/design/sequences/<sequence-id-lowercase>/
├── SEQUENCE-SPINE.md
├── <checkpoint-id-lowercase>/
│   ├── LEARNING-BRIEF.md
│   ├── MECHANIC-FIT.md
│   └── GRAYBOX-SCRIPT.md             # optional working aid only
└── <next-checkpoint-id-lowercase>/
    └── ...
```

Approved semantic-fit candidates proceed directly into distinct stable catalog folders under `experiments/src/exercises/`. The catalog exercise’s `DESIGN.md` is the graybox source of truth. Do not create a standalone HTML comparison between the rationale and catalog graybox.

Never overwrite one checkpoint’s brief, rationales, catalog links, or gate history when starting another. Amend `SEQUENCE-SPINE.md` through a dated revision and preserve prior owner dispositions. A material spine change may return affected checkpoint mechanics to review; it never grants approval to a new one.

The binding process is [`../../design/prototype-production-workflow.md`](../../design/prototype-production-workflow.md). Search established classroom tasks and [`../../game-mechanics/`](../../game-mechanics/) before proposing a mechanic.
