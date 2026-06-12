# Agent Spec Record Model

Use stable record IDs inside grouped Markdown files. Keep records short and
link them explicitly.

Compact records are short, stable, source-linked planning facts. They are the
routing and durable-fact layer for AI workers, not a mandate to discard or
flatten every useful source document. Preserve or link source material when it
contains detail, rationale, validation history, examples, or stakeholder
context that would make records too large.

## Record Types

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

## MVP And POC Semantics

POC records are first-class planning records when a feasibility step is needed
before MVP. Use them to capture evidence, decisions, risks, and proposed follow
up work from technical validation without pretending the proof is already a
customer-usable product.

Use `MVP: yes` only for records that belong to the smallest viable
customer-facing product slice. Minimal means narrow scope; viable means usable
for the target workflow with enough UI, data behavior, feedback, and
verification to demonstrate product value.

Do not use `MVP: yes` for a proof of concept by default. POCs, spikes,
prototype screens, demo scaffolds, and raw technical validations should be
recorded as evidence, current state, risks, POC-labeled requirements, or
non-MVP tasks until a POC-to-MVP promotion step defines the customer-facing
behavior that turns them into a usable product slice.

When importing or reviewing POC material, separate:

- current POC behavior: what the prototype or code proves now
- MVP intended behavior: what a customer or evaluator must be able to do
- viability gap: missing UI, workflow, data, permissions, empty states, error
  handling, copy, persistence, integration, or verification
- promotion decision: keep, replace, discard, or continue investigating

Create `AC` records for product viability, not only technical proof. Acceptance
criteria should be observable from the customer-facing workflow whenever the
feature has a GUI.

## Source Confidence

Use these confidence labels:

- `proposed`: from prompt or brainstorming
- `imported`: extracted from human documentation
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
Phase: poc | mvp | post-mvp | unknown
Viability: poc-only | customer-usable | internal-only | unknown
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

## Brownfield Records

Brownfield records must distinguish:

- current state: what the code or product appears to do now
- intended state: what the user or docs say it should do
- gap: the difference that must be resolved

Use `Current State`, `Intended State`, and `Gap` headings where confusion is
likely.

## Index Rules

Indexes summarize and route. They do not replace records.

Good indexes:

- traceability from requirement to acceptance and task
- open questions by blocking impact
- MVP record list
- MVP viability gaps
- records by source confidence

Avoid narrative indexes that repeat whole record bodies.

## Human Deliverable, Sprint, And Release Inputs

User-requested human deliverables are first-class outputs. Create them in the
requested location and use specs, references, reviews, source references, and
active progress state to keep them traceable. Before producing a human-facing
document, check that the required source layers exist and call out missing
information instead of inventing scope, delivery state, or commitments.

Common project-management views usually need:

- Statement of work: brief, requirements, capabilities, constraints,
  acceptance, risks, decisions, and source references
- Work order: requirements, tasks, acceptance, constraints, dependencies,
  risks, and progress handoff context
- Sprint plan: a timeboxed execution view based on approved task records,
  traceability, open questions, risks, and progress batches or proposed batches
- Sprint results or burndown: progress manifest, progress items, logs, outputs,
  acceptance, evidence, and remaining risks
- Release readiness summary: acceptance, evidence, risks, findings, status, and
  verified outputs
- Stakeholder update: brief, status, accepted scope, completed outputs,
  active risks, decisions, and next recommended action
- Source retirement review: source-document inventory, records, indexes,
  reviews, evidence, active progress state, and any remaining linked-only
  source material

If a human-facing document introduces new requirements, decisions, risks,
assumptions, acceptance criteria, evidence, or tasks, promote those facts back
into records or progress before treating them as durable.

## Source Retirement Audit

Run a source retirement audit before declaring legacy planning, progress, or
documentation sources removable. Discover source locations from the workspace
and `.agents/plans/source-documents.md`; do not rely on fixed folder names.

For each source, answer:

- What durable facts were extracted into records?
- What active execution state was moved into progress?
- What facts are still only linked by reference?
- What rationale, validation history, examples, rejected alternatives, or
  stakeholder context remains unique to the source?
- Should the source be kept, archived, deleted after confirmation, or marked
  unknown?

If the source contains new durable facts, promote them into records or progress
before recommending deletion. If preserving full detail is more appropriate
than extraction, recommend archiving instead of deletion.

## Split Rules

Start with grouped files directly under the spec folder. Split into folders or
one-file records only when:

- a grouped file approaches 500 lines
- multiple agents must edit independent records concurrently
- a record requires a large evidence trail
- a record needs separate ownership or review
