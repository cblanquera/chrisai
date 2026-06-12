# Agent Spec Mental Model

This skill uses `.agents/` to separate product truth, execution state, and
supporting reference material. The goal is to keep AI context small while still
preserving enough planning detail for agents and humans to recover the work.

This skill creates and maintains the `.agents/` project knowledge base. It is
not a root `plans/` document generator.

## Short Version

- `specs/` answers: what should exist?
- `sprints/` answers: what are we doing in this timebox?
- `progress/` answers: what is actively being worked on?
- `references/` answers: where is the supporting detail?
- `.agents/plans/` answers: where did the original planning material come from?
- `poc/` answers: what did feasibility work prove, fail, or leave unknown?
- `releases/` answers: what shipped or is being prepared to ship?

## Folder Model

```text
.agents/
  plans/
    original planning docs, PRDs, stakeholder notes, imports

  poc/
    POC findings, results, snippets, and implementation notes
    actual prototype code should live outside .agents

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

Create a product planning structure:

```text
Create the .agents project knowledge base for this product using .agents/plans,
.agents/poc, .agents/references, .agents/specs, .agents/sprints,
.agents/progress, and .agents/releases. Treat specs as scope, sprints as
timeboxes, and progress as active execution. Do not create a root plans/ folder.
```

Plan a POC:

```text
Create the POC spec and POC progress items. Each item should state the
feasibility question, expected proof, verification, and how the result should
be promoted or discarded.
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
Convert accepted tasks into active progress items. Each item should link to the
spec task, relevant references, user workflow, outputs, and verification.
```
