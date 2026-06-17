# ChrisAI Agents

`chrisai-agents` creates and maintains a project-local `.agents/` folder for
agent-readable context, workflows, product planning, research, progress, and
handoffs.

Source skill: [`skills/chrisai-agents`](../skills/chrisai-agents/SKILL.md)

## Purpose

The skill sets up or repairs `.agents` so future agents can continue from
project-local rules and workflow files without needing the ChrisAI skill
active. It should not create empty folders or placeholder files just to match
the full folder model; each folder is materialized when a workflow, context
entry, record, progress item, design artifact, research note, or release view
needs it.

It supports two related jobs:

- generating a local workflow for building a Markdown knowledge base from
  files, links, pasted text, or user input
- planning and tracking development for a singular product or bounded product
  stream

## Context Knowledge Base

Use `.agents/context/` as the project knowledge-base surface once context
exists. The generated `.agents/workflows/context-ingestion.md` workflow handles
prompts such as:

- "Can you ingest this document?"
- "Can you add this file to the kb?"
- "Can you intake this link?"
- "What are the marketing guidelines for this product?"
- "What does the CEO want?"

For ingestion, this skill should generate or repair
`.agents/workflows/context-ingestion.md`. Future agents then follow that local
workflow to convert useful source content to Markdown and update
`.agents/context/index.md`.

If generated context would exceed 500 lines, all chunks go under
`.agents/references/context/<source-slug>/`; `.agents/context/index.md` gets
only the compact summary and links.

The skill does not create `source-documents.md`. Original file paths and links
can move, so the retained Markdown context is the durable lookup surface.

## Folder Model

```text
.agents/
  AGENTS.md
  context/
  workflows/
  development/
    specs/
    progress/
    research/
      poc/
      grill/
      adr/
  references/
  wireframes/
  creatives/
```

Top-level `wireframes`, `creatives`, `references`, and `workflows` remain at
the top of `.agents`. Product specs, active progress, and research live under
`.agents/development/`.

## Development Model

`.agents/development/specs/` stores durable product truth such as requirements,
capabilities, decisions, risks, acceptance criteria, evidence, and proposed
tasks.

`.agents/development/progress/` stores active execution state.

`.agents/development/sprints/` stores optional timeboxed execution views
derived from specs and progress state.

`.agents/development/research/` stores POCs, grill reports, ADRs, validation
notes, feasibility findings, and research records.

Feature-goal intake lives in `.agents/context/feature-goals.md`, not in a
separate plans folder.

Detailed setup, record, and workflow behavior lives in the skill references so
the main skill stays small while preserving operational rules from the previous
agent-spec model.

## Mental Model

`chrisai-agents` does not create one giant plan and hand it to a developer. It
creates a recoverable local operating surface so humans and agents can move
through planning, proofs, design, implementation, QA, feedback, and feature
development without losing state.

Short version:

- `.agents/context/` answers: what does this project know?
- `.agents/workflows/` answers: how should future agents work here?
- `.agents/development/specs/` answers: what should exist?
- `.agents/development/progress/` answers: what is actively being worked on?
- `.agents/development/sprints/` answers: what are we doing in this timebox?
- `.agents/development/research/` answers: what did proofs, ADRs, grill
  reports, and validation work prove, fail, or leave unknown?
- `.agents/references/` answers: where is the supporting detail?
- `.agents/releases/` answers: what shipped or is being prepared to ship?

The usual flow is:

```text
idea
  -> setup or repair .agents
  -> clarify goals, non-goals, gaps, and feature goals
  -> review or grill the plan for blockers and weak assumptions
  -> reconcile gaps into records, risks, questions, and next workflows
  -> prototype narrow POCs for uncertain concepts
  -> run wireframe and creative review rounds when UX or direction matters
  -> promote accepted POC, wireframe, creative, review, and QA outcomes
  -> freeze MVP scope into traceable proposed tasks
  -> create progress items or batches only when execution is requested
  -> implement, verify, and document work through progress
  -> validate feedback before fixing it
  -> repeat the feedback loop until the MVP or feature-development goal closes
```

Manual reviews and grill reports are inputs, not product truth. Reconcile them
into `.agents` records before development continues.

## Workflow Roles

- `goal-manager.md` orchestrates documented goals across planning, design,
  implementation, QA, documentation, and handoff loops.
- `context-ingestion.md` turns files, links, pasted text, or raw resources into
  project context.
- `document-integrity.md` checks that context, records, indexes, progress,
  status, releases, and derived views still agree.
- `review.md` checks readiness, risk, evidence, and traceability.
- `validation.md` gathers evidence for assumptions, blockers, risky claims, QA
  feedback, and user feedback before expensive work.
- `poc.md` defines and records narrow feasibility proofs before results affect
  MVP or feature scope.
- `wireframes.md` and `creatives.md` handle review rounds for UX, flow, visual
  direction, assets, and copy.
- `mvp.md` defines, narrows, validates, and freezes the first customer-usable
  product slice.
- `freeze.md` turns accepted records into implementation-facing tasks and
  views.
- `progress.md` tracks active execution items, batches, logs, and handoffs.
- `batch-reconciliation.md` groups validated low-to-medium-risk fixes.
- `feature-development.md` handles bounded feature streams, hardening, polish,
  expansion, release readiness, and ongoing product work after MVP.

## Spec Templates

The old `agent-spec-structure.md` carried concrete templates that were not
fully present in the first `chrisai-agents` draft. They map to the new
`.agents/development/specs/` layout as follows.

Manifest:

```markdown
# Agent Spec Manifest

| Spec ID | Status | Type | Source | Current Phase | Notes |
| --- | --- | --- | --- | --- | --- |
| 02-mvp | active | greenfield | context | review | |
```

Brief:

```markdown
# <Spec Name> Brief

Spec ID:
Type: greenfield | planned-greenfield | brownfield | planned-brownfield
Status:

## Objective

## Audience

## Source Material

## Scope

## Non-Goals

## MVP Viability

Target customer or evaluator:

Customer-facing workflow:

Minimum usable capabilities:

Known POC-only or prototype-only areas:

Viability gaps:

## Current State

## Intended State

## Definition Of Ready
```

Spec index:

```markdown
# <Spec Name> Index

## Read First

## Record Files

## Reviews

## Optional Generated Views

## Current Open Questions
```

Status:

```markdown
# <Spec Name> Status

Current Phase:
Readiness:
Last Updated:

## Summary

## Blocking Questions

## Next Recommended Action
```

Default output is AI-readable records and indexes: compact record files under
the spec folder, routing and traceability files, concise `status.md`, and
readiness findings under `reviews/`.

## Specs, Sprints, Tasks, And Items

A spec is about scope. A sprint is about time.

```text
Spec = product or feature definition
Sprint = scheduling container
Task = proposed work
Progress item = active execution unit
```

Specs define durable product or feature truth: requirements, capabilities,
acceptance criteria, decisions, risks, evidence, and proposed tasks.

Sprints under `.agents/development/sprints/` choose accepted tasks or progress
items for a timebox. A sprint can include work from multiple specs.

A `TASK` record answers what work probably needs to happen. A progress item
answers what an agent is actively working on, with inputs, outputs, status, and
verification.

Use this split:

```text
.agents/development/specs/<spec-id>/tasks.md
  TASK-001: proposed work

.agents/development/progress/items/item-001.md
  active work packet derived from one or more tasks
```

## Lifecycle

For Lean or Agile product work, the default lifecycle is:

```text
Product idea
  -> POC
  -> POC-to-MVP promotion
  -> MVP
  -> feature-development specs
  -> sprints and releases
```

POC work answers feasibility questions. It should not become product scope
automatically. Before POC work becomes MVP or feature scope:

1. Record what the POC proved.
2. Record what failed or remains unknown.
3. Decide whether to keep, replace, discard, or continue investigating.
4. Convert accepted learning into customer-facing requirements, acceptance
   criteria, and tasks.
5. Create progress items only from promoted product or feature records.
6. Promote reusable proof code only through explicit merge, cherry-pick, or
   reimplementation decisions.

## Practical Prompts

Create or repair the local agent operating surface:

```text
Initialize .agents for this project. Create .agents/AGENTS.md,
.agents/context/index.md, and .agents/workflows/ first, then seed the minimal
development records needed for future work. Treat context as project knowledge,
specs as product truth, progress as active execution, and workflows as local
operating procedures.
```

Ingest project context:

```text
Add this file to the project knowledge base. Convert useful content to
Markdown, update .agents/context/index.md, and put large generated chunks under
.agents/references/context/.
```

Plan a POC:

```text
Follow .agents/workflows/poc.md. Create a separate branch named
poc-<short-name> for this proof only if implementation is requested. Record the
feasibility question, expected evidence, failure signal, branch name when any,
verification, and promotion or discard decision.
```

Promote POC results:

```text
Run a POC-to-MVP promotion pass. Review what the POC proved, failed to prove,
and left unknown. Convert only accepted learning into MVP requirements,
acceptance criteria, risks, and tasks.
```

Plan a sprint:

```text
Create a sprint plan under .agents/development/sprints/ from accepted tasks and
ready progress items. Do not change product scope; only group work by priority,
dependency, and timebox.
```

Start execution:

```text
Follow .agents/AGENTS.md and .agents/workflows/goal-manager.md for documented
goals, or .agents/workflows/progress.md for assigned execution items. Compare
the last/current item, progress manifest next-action text, context index, and
.agents/context/feature-goals.md before choosing next work. Convert accepted
tasks into active progress items only when execution is requested.
```

Reconcile feature-development feedback:

```text
Follow .agents/workflows/feature-development.md and
.agents/workflows/validation.md before fixing raw feedback. Let feature
development classify the phase and route validated bulk feedback, QA
mismatches, or repeated review loops to batch reconciliation. Verify changed
surfaces and update progress once at the end.
```

## Rules

- All generated `.agents` documentation is Markdown.
- Generated or maintained `.agents/**/*.md` files stay under 500 lines.
- Large context chunks always go in `.agents/references/context/`.
- Raw feedback is validated or reconciled before implementation.
- Accepted research, POC, wireframe, creative, review, QA, and feedback
  outcomes are promoted into durable records before freeze or closeout.
