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
- `.agents/plans/` answers: where did the original planning material come from?
- `poc/` answers: what did feasibility work prove, fail, or leave unknown?
- `releases/` answers: what shipped or is being prepared to ship?

## Folder Model

```text
.agents/
  AGENTS.md

  workflows/
    import.md
    poc.md
    mvp.md
    post-mvp.md
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
    original planning docs, PRDs, stakeholder notes, imports

  poc/
    POC findings, results, snippets, and implementation notes
    actual prototype code should live outside .agents

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

## POC To MVP To Feature Sprints

For Lean or Agile product work, the default lifecycle is:

```text
Product idea
  -> POC
  -> POC-to-MVP promotion
  -> MVP
  -> post-MVP feature specs
  -> sprints and releases
```

The POC can continue after MVP as a place to test future features before they
are accepted into the product. POC work should answer feasibility questions.
It should not become product scope automatically.

Before POC work becomes MVP or feature scope, run a promotion step:

1. Record what the POC proved.
2. Record what failed or remains unknown.
3. Decide whether to keep, replace, discard, or continue investigating the
   result.
4. Convert accepted learning into customer-facing requirements, acceptance
   criteria, and tasks.
5. Create progress items only from the promoted product or feature records.

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
Follow .agents/workflows/poc.md. Create POC records only for specific
feasibility questions, risky integrations, architecture options, or workflow
proofs that need evidence before MVP. Record the expected proof, verification,
and promotion or discard decision.
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
Follow .agents/AGENTS.md and .agents/workflows/progress.md. Convert accepted
tasks into active progress items only when execution is requested. Each item
should link to spec records, relevant references, outputs, and verification.
```

Reconcile post-MVP feedback:

```text
Follow .agents/workflows/post-mvp.md and
.agents/workflows/batch-reconciliation.md. Audit feedback first, pick 8-15
related mismatches, implement them together, verify changed surfaces, and
update progress once at the end.
```
