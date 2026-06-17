# Development Model

Use this reference when setting up or repairing product planning, research,
specs, progress, releases, and handoffs inside `.agents/development/`.

## Folder Boundaries

- `.agents/context/`: project knowledge base, ingested Markdown context, and
  feature-goal intake.
- `.agents/development/specs/`: durable product or feature truth.
- `.agents/development/progress/`: active execution state.
- `.agents/development/sprints/`: optional timeboxed execution views derived
  from specs and progress state.
- `.agents/development/research/`: POCs, grill reports, ADRs, validation
  notes, feasibility findings, and research records.
- `.agents/references/`: long support material that keeps context, specs, and
  progress compact.
- `.agents/wireframes/` and `.agents/creatives/`: top-level design planning and
  review artifacts.

## Record Types

Use stable IDs inside grouped Markdown files. Keep records short and link them
explicitly.

| Prefix | Type | Purpose |
| --- | --- | --- |
| `REQ` | requirement | Durable product, user, system, or operational requirement |
| `CAP` | capability | User-visible or system capability that may group requirements |
| `CON` | constraint | Technical, business, platform, compliance, or timeline constraint |
| `ASM` | assumption | Unverified claim that may need evidence |
| `Q` | question | Open question that blocks or may change decisions |
| `DEC` | decision | Accepted, rejected, provisional, or deferred decision |
| `RISK` | risk | Known threat to success, quality, security, scope, or delivery |
| `AC` | acceptance | Objective completion or readiness criterion |
| `EVD` | evidence | Source, observation, command result, code finding, or research note |
| `TASK` | task | Proposed work item before it becomes active progress |

## Source Confidence

Use these confidence labels:

- `proposed`: from prompt, brainstorming, or early intake
- `imported`: extracted from human documentation or ingested context
- `inferred`: derived from code, file structure, behavior, or tests
- `evidence-backed`: supported by explicit evidence records
- `conflicting`: contradicted by another source
- `stale`: likely outdated compared with current code or later decisions

## Record Template

```markdown
## REQ-001: <short title>

Status: proposed | accepted | blocked | deferred | superseded
Confidence: proposed | imported | inferred | evidence-backed | conflicting | stale
MVP: yes | no | unknown
Phase: research | poc | mvp | feature-development | unknown
Source:
Related:
- CAP-001
- AC-001

### Statement

### Rationale

### Acceptance Links

### Open Questions

### Viability Notes

### Notes
```

Use the same shape for `CAP`, `CON`, `ASM`, `Q`, `DEC`, `RISK`, `AC`, `EVD`,
and `TASK` records, adapting headings only when a record type clearly needs a
more compact form.

## Spec Structure

```text
.agents/development/specs/
  manifest.md
  <spec-id>/
    brief.md
    index.md
    status.md
    requirements.md
    capabilities.md
    constraints.md
    assumptions.md
    questions.md
    decisions.md
    risks.md
    acceptance.md
    evidence.md
    tasks.md
    traceability.md
    open-questions.md
    by-mvp.md
    mvp-viability-gaps.md
    by-status.md
    by-source.md
    reviews/
      readiness-review.md
      findings.md
    logs/
      YYYY-MM-DD.md
```

Use one `<spec-id>` per bounded product, feature, migration, or major
initiative. Keep the initial/root product spec for the base product shell and
overall architecture. Create a sibling spec when a feature-development goal
becomes a bounded product stream with its own acceptance criteria, risks,
decisions, POCs, or multiple implementation items.

Do not create one spec folder per sprint, topic, requirement, implementation
task, bugfix, single wireframe round, or small UI tweak.

## Progress Structure

```text
.agents/development/progress/
  brief.md
  manifest.md
  decisions.md
  conventions.md
  outputs.md
  batches/
  items/
  logs/
```

A `TASK` record is proposed work. Active execution belongs in progress items or
batches. A task may become one progress item, multiple progress items, or no
progress item yet.

Use these statuses unless the project defines a narrower model:

- `planned`
- `ready`
- `in_progress`
- `blocked`
- `review`
- `done`
- `verified`

Only mark an item `verified` after the stated verification was actually run.

## Sprint Structure

```text
.agents/development/sprints/
  sprint-001.md
```

A sprint is a timeboxed execution view, not product truth. Create or update a
sprint only after durable spec scope exists. A sprint can include accepted tasks
or active progress items from multiple specs.

## Research Structure

```text
.agents/development/research/
  poc/
    findings.md
    results.md
    snippets/
  grill/
    findings.md
    reports/
  adr/
    decisions.md
    records/
  validation/
    findings.md
```

POC code should live on separate `poc-<short-name>` branches when
implementation is involved. Record the branch name in research and progress
records. Do not switch branches or create POC branches unless the user
explicitly asks for branch or implementation work.

ADRs under research capture architectural reasoning and decision history. If an
ADR becomes product truth, also promote the durable decision into
`.agents/development/specs/<spec-id>/decisions.md`.

Grill reports are review inputs. Reconcile material findings into questions,
risks, decisions, evidence needs, accepted risks, blockers, or explicit
rejections before implementation.

## Feature Goals

Use `.agents/context/feature-goals.md` for high-level feature-goal intake. It
is planning input, not an implementation queue.

Template:

```markdown
# Feature Goals

Status: planning input
Last Updated:

This file captures high-level feature goals only. Before implementation,
convert goals into bounded spec records, acceptance criteria, and progress
items.

## Goals

- <feature goal>
```

When a user prompt identifies a new feature goal, append or reconcile it here
before deciding whether it belongs in an existing spec, a new sibling spec, or
active progress.

## MVP And POC Semantics

Use `MVP: yes` only for records that belong to the smallest viable
customer-facing product slice. Minimal means narrow scope; viable means usable
for the target workflow with enough UI, data behavior, feedback, and
verification to demonstrate product value.

Do not use `MVP: yes` for a proof of concept by default. POCs, spikes,
prototype screens, demo scaffolds, and raw technical validations should be
recorded as evidence, current state, risks, POC-labeled requirements, or
non-MVP tasks until a promotion step defines the customer-facing behavior.

Before POC work becomes MVP or feature scope:

1. Record what the POC proved.
2. Record what failed or remains unknown.
3. Decide whether to keep, replace, discard, or continue investigating.
4. Convert accepted learning into customer-facing requirements, acceptance
   criteria, and tasks.
5. Create progress items only from promoted product or feature records.

## Brownfield Records

For brownfield work, distinguish:

- current state: what the code or product appears to do now
- intended state: what the user or docs say it should do
- gap: the difference that must be resolved

Use `Current State`, `Intended State`, and `Gap` headings where confusion is
likely.

## Index Rules

Indexes summarize and route. They do not replace records.

Good indexes provide:

- traceability from requirement to acceptance and task
- open questions by blocking impact
- MVP record list
- MVP viability gaps
- records by source confidence

Avoid narrative indexes that repeat whole record bodies.

## Human-Readable Views

Sprint plans, release notes, statements of work, status reports, and handoffs
are derived views. Before generating a view, verify that the needed context,
records, and progress data exist. If inputs are missing, state the gap instead
of inventing commitments or delivery state.

If a derived view introduces new requirements, decisions, risks, assumptions,
acceptance criteria, evidence, or tasks, promote those facts back into records
or progress before treating them as durable.

Common derived views usually need:

- statement of work: brief, requirements, capabilities, constraints,
  acceptance, risks, decisions, and context links
- work order: requirements, tasks, acceptance, constraints, dependencies,
  risks, and progress handoff context
- sprint plan: approved task records, traceability, open questions, risks, and
  proposed or active batches
- sprint results or burndown: progress manifest, progress items, logs, outputs,
  acceptance, evidence, and remaining risks
- release readiness summary: acceptance, evidence, risks, findings, status, and
  verified outputs
- stakeholder update: brief, status, accepted scope, completed outputs, active
  risks, decisions, and next recommended action

## Source Retirement Audit

Run a source retirement audit before declaring legacy planning, progress,
documentation, or source material removable.

For each source, answer:

- What durable facts were extracted into records?
- What active execution state was moved into progress?
- What facts are still only linked by reference?
- What rationale, validation history, examples, rejected alternatives, or
  stakeholder context remains unique to the source?
- Should the source be kept, archived, deleted after confirmation, or marked
  unknown?

If a source contains new durable facts, promote them into records or progress
before recommending deletion. If preserving full detail is more appropriate
than extraction, recommend archiving instead of deletion.
