# Agent Spec Mental Model

This skill bootstraps `.agents/` so the project carries its own AI-readable
operating rules. The goal is to keep AI context small while still preserving
enough planning detail for agents and humans to recover the work.

After setup, ongoing work should follow `.agents/AGENTS.md` and the workflow
files in `.agents/workflows/`, even when no ChrisAI skill is active. This skill
is not a root `plans/` document generator.

## Short Version

- `specs/` answers: what should exist?
- `workflows/` answers: how should future agents work here?
- `sprints/` answers: what are we doing in this timebox?
- `progress/` answers: what is actively being worked on?
- `references/` answers: where is the supporting detail?
- `.agents/plans/` answers: where did the original planning material,
  feature-goal intake, and planning references come from?
- `poc/` answers: what did feasibility work prove, fail, or leave unknown?
- `releases/` answers: what shipped or is being prepared to ship?

## Human Process Flow

This skill does not make one giant plan and then hand it to a developer. It
creates a project-local operating surface so humans can move through planning,
proofs, design, implementation, QA, feedback, and feature development without
losing context.

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
  -> freeze the MVP scope into traceable proposed tasks
  -> create progress items or batches only when execution is requested
  -> implement, verify, and document work through progress
  -> validate feedback before fixing it
  -> repeat the feedback loop until the MVP or feature-development goal closes
```

The human can still run manual review steps. For example, a griller may ask
questions and produce a report outside the skill. The important rule is that the
planner then reconciles that report into `.agents` records before development
continues. A report, chat summary, or review comment is input; it is not product
truth until it is promoted into specs, evidence, risks, decisions, acceptance,
or progress.

## Workflow Roles

- `goal-manager.md` orchestrates a documented goal across planning, design,
  implementation, QA, documentation, and handoff loops. It must stop and
  escalate when it would repeat the same item or feedback loop without new
  evidence, a new hypothesis, narrower scope, or a different verification
  method.
- `review.md` checks readiness, risk, evidence, and traceability. Manual grill
  reports are review inputs.
- `validation.md` gathers evidence for assumptions, blockers, risky claims, QA
  feedback, and user feedback before expensive work.
- `poc.md` defines and records narrow feasibility proofs before their results
  can affect MVP or feature scope.
- `wireframes.md` and `creatives.md` handle review rounds for UX, flow, visual
  direction, assets, and copy.
- `mvp.md` defines, narrows, validates, and freezes the first customer-usable
  product slice.
- `freeze.md` turns accepted records into implementation-facing tasks and views.
- `progress.md` tracks active execution items, batches, logs, and handoffs.
- `batch-reconciliation.md` stops repeated micro-passes by grouping validated
  low-to-medium-risk fixes.
- `feature-development.md` handles bounded feature streams, hardening, polish,
  expansion, release readiness, and ongoing product work after MVP.
- `document-integrity.md` checks that records, indexes, progress, status,
  releases, and derived views still agree.

## Folder Model

```text
.agents/
  AGENTS.md

  workflows/
    goal-manager.md
    document-integrity.md
    import.md
    poc.md
    mvp.md
    feature-development.md
    ad-hoc.md
    batch-reconciliation.md
    review.md
    validation.md
    freeze.md
    progress.md
    handoff.md
    source-retirement.md
    wireframes.md
    creatives.md

  plans/
    source-documents.md
    feature-goals.md

  poc/
    POC findings, results, snippets, and implementation notes
    actual prototype code lives on separate poc-<short-name> branches

  wireframes/
    low-fidelity screens, flows, layout notes, and reviews

  creatives/
    visual direction, brand explorations, asset briefs, and reviews

  references/
    arbitrary reusable context files
    detailed explanations, examples, snippets, research, rationale

  specs/
    01-poc/
    02-mvp/
    03-feature-name/
    04-feature-name/

  sprints/
    sprint-001.md
    sprint-002.md

  progress/
    manifest.md
    items/
    batches/
    logs/

  releases/
    release-001/
```

## Local Rules And Workflows

`.agents/AGENTS.md` is the local law for future chats. It should stay concise
and cover:

- source-of-truth boundaries
- Markdown-only file-size and split-refactor rules for `.agents/**/*.md`
- workflow routing
- goal-manager and document-integrity routing
- feature-goal intake and next-work comparison rules
- feedback validation before implementation
- artifact promotion before freeze, closeout, or release readiness
- record ID conventions
- no invented scope, status, commitments, or verification
- promotion of durable facts back into records or progress

Detailed procedures belong in `.agents/workflows/*.md`, not in
`.agents/AGENTS.md`.

## Specs Versus Sprints

A spec is about scope. A sprint is about time.

```text
Spec = product or feature definition
Sprint = scheduling container
Task/item = execution unit
```

Specs define the durable product or feature truth:

- requirements
- capabilities
- acceptance criteria
- decisions
- risks
- evidence
- proposed tasks

Sprints choose which accepted tasks or progress items to work on during a
timebox. A sprint can include work from multiple specs.

Example:

```text
Spec: 03-session-management
- Users can rename sessions
- Users can pin sessions
- Users can archive sessions

Sprint 5
- Implement session rename from 03-session-management
- Implement pin/unpin from 03-session-management
- Fix provider setup bug from 02-mvp
- Run release QA checklist
```

That is why active execution belongs in top-level `.agents/progress/`, not
inside every spec folder. The progress bank gives one recoverable dashboard for
current work, while each item links back to the spec records that justify it.

Keep the initial/root product spec for the base product shell and overall
architecture. Create a sibling spec when a feature-development goal becomes a
bounded product stream with its own acceptance criteria, risks, decisions, POCs,
or multiple implementation items. Do not create one spec per sprint, topic,
requirement, implementation task, bugfix, single wireframe round, or small UI
tweak.

`.agents/plans/feature-goals.md` is planning input, not an implementation
queue. Check it when choosing the next goal or deciding whether a new sibling
spec is needed, and record or reconcile new user-identified feature goals there
before routing them.

## Tasks Versus Items

A `TASK` record is proposed work from a spec. It answers:

> What work probably needs to happen to satisfy the product plan?

A progress item is active tracked execution. It answers:

> What is an agent actually working on, with what inputs, outputs, status, and
> verification?

Use this split:

```text
.agents/specs/<spec-id>/tasks.md
  TASK-001: proposed work

.agents/progress/items/item-001.md
  active work packet derived from one or more tasks
```

A task may become one progress item, multiple progress items, or no progress
item yet.

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

The POC can continue after MVP as a place to test future features before they
are accepted into the product. POC work should answer feasibility questions.
It should not become product scope automatically.

Each POC should have its own isolated branch named `poc-<short-name>`. Keep
prototype code for that proof only on its POC branch, and do not combine
multiple unrelated POCs on one branch. Record the branch name in `.agents/poc/`
and in the relevant progress item when active execution tracking exists.

Feature development is not a dumping ground for everything after MVP. Create a
sibling spec when a feature-development goal becomes a bounded product stream
with its own acceptance criteria, risks, decisions, POCs, or multiple
implementation items.

Before POC work becomes MVP or feature scope, run a promotion step:

1. Record what the POC proved.
2. Record what failed or remains unknown.
3. Decide whether to keep, replace, discard, or continue investigating the
   result.
4. Convert accepted learning into customer-facing requirements, acceptance
   criteria, and tasks.
5. Create progress items only from the promoted product or feature records.
6. Promote reusable proof code only through an explicit merge, cherry-pick, or
   reimplementation decision; do not treat the whole POC branch as product code
   by default.

Before MVP freeze, promote accepted POC results, wireframe decisions, creative
direction, review findings, QA results, and validated feedback into specs,
acceptance criteria, risks, evidence, tasks, or progress. Keep rejected
alternatives, invalid feedback, and deferred questions explicit so they do not
return as hidden scope.

## Review Feedback Loop

Use this loop for MVP and feature-development implementation feedback:

```text
user feedback
  -> QA/validation reproduces, rejects, or classifies it
  -> planner reconciles durable scope, records, progress, or questions
  -> goal-manager chooses one fix item or a batch
  -> developer fixes only the selected item or batch
  -> QA verifies changed surfaces
  -> planner updates progress and durable records
  -> repeat only from validated feedback
```

Raw feedback is not an implementation queue. Route uncertain feedback through
`workflows/validation.md`; route related validated fixes through
`workflows/batch-reconciliation.md`; isolate risky or contract-changing fixes
as one progress item at a time.

The loop should not skip the planner step. QA may prove the feedback is real,
but the planner decides whether it is a bug, missed requirement, design
mismatch, new scope, product decision, invalid feedback, a single fix item, or a
batch.

## References

`.agents/references/` is not a static glossary. It is a reusable context folder,
similar to a skill's `references/` folder.

Use it for:

- long explanations
- examples
- code snippets
- research notes
- domain terms
- detailed rationale
- implementation patterns

Specs and progress items should link to references instead of copying long
context into every file.

Example:

```markdown
## Inputs

- .agents/specs/02-mvp/tasks.md#TASK-014
- .agents/references/examples/approval-flow.md
- .agents/references/snippets/tauri-command-pattern.md
```

## Practical Prompt Phrases

Create or repair the local agent operating surface:

```text
Initialize .agents for this project. Create .agents/AGENTS.md and
.agents/workflows/ first, then seed the minimal spec records needed for future
work. Treat specs as product truth, progress as active execution, and workflows
as local operating procedures.
```

Plan a POC:

```text
Follow .agents/workflows/poc.md. Create a separate branch named
poc-<short-name> for this proof, and keep prototype code for that proof only on
that branch. Record the feasibility question, expected evidence, failure signal,
branch name, verification, and promotion or discard decision.
```

Promote POC results:

```text
Run a POC-to-MVP promotion pass. Review what the POC proved, failed to prove,
and left unknown. Convert only accepted learning into MVP requirements,
acceptance criteria, risks, and tasks.
```

Plan a sprint:

```text
Create a sprint plan from accepted tasks and ready progress items. Do not
change product scope; only group work by priority, dependency, and timebox.
```

Start execution:

```text
Follow .agents/AGENTS.md and .agents/workflows/goal-manager.md for documented
goals, or .agents/workflows/progress.md for assigned execution items. Compare
the last/current item, progress manifest next-action text, and
.agents/plans/feature-goals.md before choosing next work. Convert accepted
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
