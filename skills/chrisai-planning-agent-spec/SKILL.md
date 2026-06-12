---
name: chrisai-planning-agent-spec
description: Use when planning should create or maintain an AI-readable file-based agent spec under `.agents/specs/`, including greenfield prompts, imported planning docs, brownfield codebases, readiness review, or conversion into implementation progress.
---

# ChrisAI Planning Agent Spec

Use this router when the deliverable is an AI-readable planning source of truth
under `.agents/specs/`.

The agent spec creates an AI-readable planning layer for new work. It ingests
the same kinds of inputs as traditional planning, but separates compact
AI-readable records from human-authored or human-requested deliverables.

## Layer Model

Use these boundaries:

- `.agents/plans/`: original planning documents, PRDs, stakeholder notes, and
  imported source material that should be preserved in human form.
- `.agents/poc/`: POC findings, results, snippets, and implementation notes.
  Actual prototype code should live outside `.agents/`.
- `.agents/references/`: arbitrary reusable context files such as detailed
  explanations, examples, snippets, research, rationale, and implementation
  patterns that keep specs and progress packets compact.
- `.agents/specs/`: durable intent, requirements, decisions, risks, evidence,
  reviews, indexes, and proposed task records.
- `.agents/sprints/`: optional timeboxed execution plans that group accepted
  tasks or progress items without redefining product scope.
- `.agents/progress/`: active execution state, assigned work packets, batches,
  progress logs, and handoffs.
- `.agents/releases/`: release plans, release notes, readiness summaries, and
  verification evidence for shipped or prepared releases.
- User-requested human deliverables: first-class outputs in the location and
  shape the user requested, including folders such as root `plans/`.

Use consistent planning terms:

- A `spec` is the durable source of truth for product intent and acceptance. It
  is not a sprint, work queue, or status log.
- A `sprint` is an optional timeboxed execution view assembled from approved
  spec records and progress state. Do not create a spec folder per sprint.
- A `TASK` record is proposed implementation work. It becomes active only after
  it is converted into an agent-progress item.
- A progress item is an executable delivery packet with an owner, output,
  status, acceptance checks, and verification.

When the user uses `spec`, `sprint`, `task`, or `item` interchangeably, preserve
the user's intent but normalize the durable artifacts to these boundaries.

Use [README](README.md) when the user needs the mental model for how specs,
sprints, tasks, progress items, POC, MVP, references, and releases fit
together.

## POC To MVP Boundary

A POC step is valid and often should happen before MVP implementation.

Use POCs to answer feasibility questions, validate risky technical paths,
compare architecture options, test integration behavior, or prove a workflow can
work in principle. Keep POC scope explicit, narrow, and disposable unless the
user asks to harden it.

Before treating POC output as MVP scope, run a POC-to-MVP promotion step:

1. Record what the POC proved, failed to prove, and left unknown.
2. Decide which POC behavior should be kept, replaced, or discarded.
3. Extract customer-facing capabilities, workflows, data behavior, states,
   acceptance criteria, and verification into spec records.
4. Record the viability gaps between the proof and the intended MVP.
5. Freeze or create progress items from the intended MVP records, not directly
   from the POC artifact.

Treat MVP as minimal viable product, not proof of concept.

An MVP scope must describe the smallest customer-usable product slice that can
support a real target workflow. It may be narrow, but it must be coherent enough
for the intended customer or evaluator to use without reading the underlying
POC notes.

Do not mark work as MVP-ready when it only proves a technical concept, renders
placeholder UI, or exposes raw implementation scaffolding. A POC can inform an
MVP, but the spec must extract customer-facing capabilities, workflows,
acceptance criteria, data behavior, error or empty states, and verification
from the POC before freeze or execution planning.

When a project already has POC screens or prototypes, record them as current
state or evidence. Then write intended-state requirements and acceptance
criteria for the customer-facing MVP instead of continuing to build the POC as
the product surface.

Do not recreate a large human planning document forest inside `.agents/specs/`.
Preserve or link source material when it contains useful detail, rationale,
validation history, or stakeholder context that compact records should not
copy.

Before any legacy planning, progress, or documentation source is removed,
archived, or declared obsolete, run a source retirement audit. Discover actual
project sources instead of assuming fixed folder names. Examples may include
`plans/`, `docs/`, `docs/adr/`, `specs/`, `roadmap/`, `.task-bank/`, issue
exports, sprint notes, PRDs, research notes, or project-specific folders. Treat
examples as non-exhaustive; classify every discovered source by whether its
durable facts were extracted into records, its active execution state moved to
progress, and its remaining rationale, validation history, examples, or
stakeholder context must be preserved.

## Specialist Routes

- Use `chrisai-planning-agent-spec-discovery` when starting from a prompt, product
  idea, or sparse greenfield description.
- Use `chrisai-planning-agent-spec-import` when starting from human planning
  documents and little or no existing code.
- Use `chrisai-planning-agent-spec-brownfield` when starting from an existing
  codebase, with or without human documentation.
- Use `chrisai-planning-agent-spec-review` when an agent spec needs adversarial
  readiness, risk, consistency, or evidence review.
- Use `chrisai-planning-agent-spec-validation` when blockers, high-risk
  findings, assumptions, questions, or decisions need evidence before freeze.
- Use `chrisai-planning-agent-spec-freeze` when approved spec records should be
  frozen into implementation-facing indexes, proposed task records, and
  optional agent-progress items.

## Pure Greenfield Readiness Loop

For pure greenfield projects, the agent-spec path must preserve the same
readiness discipline as the legacy greenfield flow while keeping records as the
source of truth:

1. Discovery creates compact records and, when a grill session would otherwise
   lack enough context, a grill-session packet under the spec `reviews/`
   folder or `.agents/references/`.
2. The grill or adversarial review results are saved under `reviews/`, using
   `reviews/readiness-review.md` for the narrative review and
   `reviews/findings.md` for durable findings.
3. When review happened outside the current session, ask for the review file
   path before completing or updating the initial spec records. Import durable
   findings into questions, risks, assumptions, decisions, evidence, or
   acceptance records instead of treating the external file as the only source.
4. After the initial review exists, repeat validation-cycle passes with
   `chrisai-planning-agent-spec-validation`, updating review/status records
   after each pass, until unresolved `BLOCKER` findings are `0` and unresolved
   `HIGH` findings are resolved, accepted, or explicitly deferred with
   rationale.

Do not invoke implementation planning from the pure greenfield agent-spec path
until this validation cycle has completed or the user explicitly accepts the
remaining risk. Do not restart discovery or regenerate the grill-session packet
unless new scope makes the existing records or packet materially stale.

## Core Rules

- Keep spec record files compact.
- Treat compact records as short, stable, source-linked planning facts, not
  lossy replacements for every source document.
- Start with grouped record files, not one file per record.
- Use stable record IDs such as `REQ-001`, `DEC-001`, and `AC-001`.
- Treat unrequested derived docs as disposable views, not source of truth.
- When the user explicitly requests human-facing documents, create them as
  requested. Do not demote them to generated views or replace them with compact
  records.
- When `.agents/` is writable, back requested human-facing deliverables with
  compact `.agents/specs/` records or traceability links so recommendations are
  AI-readable and recoverable.
- When `.agents/` is not writable, still produce the requested human-facing
  deliverables and include traceability sections inside those documents.
- Generate additional human-facing documents only when the user asks for them
  or an established workflow explicitly requires them.
- Before generating human-facing documents, check whether the needed records,
  indexes, reviews, and progress data exist. Report gaps instead of inventing
  missing scope, status, or commitments.
- If a human-facing or derived document introduces new scope, decisions, risks,
  assumptions, acceptance criteria, or tasks, promote that information back into
  records or progress before treating it as durable.
- Before saying a legacy source can be deleted or retired, produce an explicit
  source retirement decision for that source. If source material is only linked
  by reference, do not call it safely removable.
- Promote durable findings from logs or reviews into records.
- Distinguish current state from intended state for brownfield work.
- Route active execution to `chrisai-process-agent-progress`.
  Use `.agents/specs/` for agreed intent and `.agents/progress/` for delivery
  state.

## Structure

Read [agent-spec-structure](references/agent-spec-structure.md) before creating a
new agent spec or changing folder layout.

Read [record-model](references/record-model.md) when creating, importing,
reviewing, or freezing records.

## Standalone Rule

This family is self-contained. Do not load or defer to other planning skill
families for discovery, review, validation, or freeze behavior.

When migrating human planning documents, import them as source material and
extract compact records. Do not copy every legacy document into
`.agents/specs/`.
