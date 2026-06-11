---
name: chrisai-planning
description: Use when a ChrisAI planning task needs routing for AI-readable agent specs, readiness review, evidence-backed validation, freeze, or implementation backlog generation before coding begins.
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

- Use `chrisai-planning-agent-spec` for AI-native planning under
  `.agent/specs/`, including prompt-only greenfield discovery, imported human
  planning documents, legacy `plans/` corpus import, existing brownfield
  projects, readiness review, evidence-backed validation, and freeze into
  implementation planning.

## Scope Gate

Use this family when all of these are true:

1. The project is a large app or product surface, not a narrow feature.
2. The user wants planning, specification, readiness review, or implementation
   backlog generation before execution.
3. The output should live in `.agent/specs/` records or generated views.

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

Do not start implementation from this router.

## Decision Rules

- Prefer `chrisai-process-agent-progress` for large implementation or migration
  work in an existing codebase.
- Use `chrisai-planning-agent-spec-import` when existing legacy `plans/`
  corpuses or document-heavy planning artifacts need to be preserved,
  reconciled, or converted into active spec records.
- Prefer `chrisai-coding-engineering` for architecture analysis of existing
  code, libraries, plugins, adapters, or runtime boundaries.
- Prefer `chrisai-docs` for documentation-only planning artifacts.
- Prefer `chrisai-design` for visual concepting, wireframes, prototypes, or
  design-system work.
- For agent specs, route unresolved blockers, high-risk findings, assumptions,
  questions, or decisions to `chrisai-planning-agent-spec-validation` before
  freeze.
