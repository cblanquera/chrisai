---
name: chrisai-planning
description: Use when a ChrisAI planning task needs routing for AI-readable agent specs, legacy greenfield planning corpuses, readiness review, evidence-backed validation, MVP freeze, or implementation backlog generation before coding begins.
---

# ChrisAI Planning Router

Use this family router for product, application, or major initiative planning
before implementation or coordinated execution begins.

This family is intentionally heavy. It is not for normal feature planning,
bugfix scoping, refactors, existing app additions, or small tools. Route those
requests to the relevant coding, design, docs, process, or agent-progress
skills.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-planning-agent-spec` for new AI-native planning under
  `.agent/specs/`, including prompt-only greenfield discovery, imported human
  planning documents, existing brownfield projects, readiness review,
  evidence-backed validation, and freeze into implementation planning.
- Use `chrisai-planning-greenfield-discovery` when the user wants to plan a
  large app into the legacy `plans/` corpus that has not been built yet,
  starting from intake, research,
  requirements, specifications, ADR candidates, spikes, MVP scope, acceptance
  criteria, and non-goals.
- Use `chrisai-planning-greenfield-grill-review` when a greenfield planning
  corpus already exists and the user wants a deep adversarial readiness review
  before implementation planning.
- Use `chrisai-planning-greenfield-validation-cycle` after grill review and
  before freeze-and-plan when `BLOCKER` or `HIGH` findings, unresolved ADRs,
  risky assumptions, open questions, or Phase 0 gates need evidence-backed
  validation.
- Use `chrisai-planning-greenfield-freeze-and-plan` when grill review is
  complete or explicitly skipped and the user wants to resolve readiness
  findings, freeze the MVP, and convert the plan into epics, tasks, and build
  order.

## Scope Gate

Use this family when all of these are true:

1. The project is a large app or product surface, not a narrow feature.
2. The user wants planning, specification, readiness review, or implementation
   backlog generation before execution.
3. The output should live in `.agent/specs/` or a legacy `plans/` planning
   corpus.

If any condition is false, use a narrower existing ChrisAI route instead.

## Sequence

Prefer the agent-spec sequence for new work:

1. `chrisai-planning-agent-spec`
2. the narrowest agent-spec specialist
3. `chrisai-planning-agent-spec-review`, when readiness or risk should be
   challenged
4. `chrisai-planning-agent-spec-validation`, when blockers, high-risk findings,
   assumptions, questions, or decisions need evidence
5. `chrisai-planning-agent-spec-freeze`, when records should become
   implementation-facing indexes, proposed task records, or `.agent/progress/`
   work packets
6. implementation work through the relevant coding, design, docs, or process
   skills

Use the legacy greenfield sequence when the user explicitly wants or already
has a `plans/` corpus:

1. `chrisai-planning-greenfield-discovery`
2. `chrisai-planning-greenfield-grill-review`
3. `chrisai-planning-greenfield-validation-cycle`, when review findings,
   risks, open questions, assumptions, unresolved ADRs, or Phase 0 gates still
   need evidence before decisions can be trusted. Required artifacts live under
   `plans/validation/`.
4. `chrisai-planning-greenfield-freeze-and-plan`
5. implementation work through the relevant coding, design, docs, or process
   skills

Do not start implementation from this router.

## Decision Rules

- Prefer `chrisai-process-agent-progress` for large implementation or migration
  work in an existing codebase.
- Prefer `chrisai-planning-agent-spec` over legacy greenfield skills for new
  AI-readable planning that should live under `.agent/specs/`.
- Prefer legacy greenfield skills only for existing `plans/` corpuses or when
  the user explicitly requests the old document-heavy planning format.
- Prefer `chrisai-coding-engineering` for architecture analysis of existing
  code, libraries, plugins, adapters, or runtime boundaries.
- Prefer `chrisai-docs` for documentation-only planning artifacts.
- Prefer `chrisai-design` for visual concepting, wireframes, prototypes, or
  design-system work.
- For agent specs, route unresolved blockers, high-risk findings, assumptions,
  questions, or decisions to `chrisai-planning-agent-spec-validation` before
  freeze.
- For legacy greenfield corpuses, if the user asks to skip grill review, record
  that as an explicit decision before using the freeze-and-plan specialist.
- For legacy greenfield corpuses, if unresolved `BLOCKER` or `HIGH` findings
  remain after review or freeze-and-plan preflight, explain exactly what
  validation work would be performed and route to
  `chrisai-planning-greenfield-validation-cycle` before proceeding.
