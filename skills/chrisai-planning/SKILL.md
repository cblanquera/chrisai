---
name: chrisai-planning
description: Use when a ChrisAI planning task needs routing for large greenfield app planning, deep implementation-readiness review, or post-review MVP freeze and implementation backlog generation before any coding begins.
---

# ChrisAI Planning Router

Use this family router for large greenfield application planning before code
exists.

This family is intentionally heavy. It is not for normal feature planning,
bugfix scoping, refactors, existing app additions, or small tools. Route those
requests to the relevant coding, design, docs, process, or task-bank skills.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-planning-greenfield-discovery` when the user wants to plan a
  large app that has not been built yet, starting from intake, research,
  requirements, specifications, ADR candidates, spikes, MVP scope, acceptance
  criteria, and non-goals.
- Use `chrisai-planning-greenfield-grill-review` when a greenfield planning
  corpus already exists and the user wants a deep adversarial readiness review
  before implementation planning.
- Use `chrisai-planning-greenfield-freeze-and-plan` when grill review is
  complete or explicitly skipped and the user wants to resolve readiness
  findings, freeze the MVP, and convert the plan into epics, tasks, and build
  order.

## Scope Gate

Only use this family when all of these are true:

1. The project is a large app or product surface, not a narrow feature.
2. The app has not been built yet or is being planned as a new standalone
   product.
3. The user wants research-first planning before implementation begins.
4. The output should live in a `plans/` planning corpus.

If any condition is false, use a narrower existing ChrisAI route instead.

## Sequence

The intended sequence is:

1. `chrisai-planning-greenfield-discovery`
2. `chrisai-planning-greenfield-grill-review`
3. `chrisai-planning-greenfield-freeze-and-plan`
4. implementation work through the relevant coding, design, docs, or process
   skills

Do not start implementation from this router.

## Decision Rules

- Prefer `chrisai-process-task-bank` for large implementation or migration
  work in an existing codebase.
- Prefer `chrisai-coding-engineering` for architecture analysis of existing
  code, libraries, plugins, adapters, or runtime boundaries.
- Prefer `chrisai-docs` for documentation-only planning artifacts.
- Prefer `chrisai-design` for visual concepting, wireframes, prototypes, or
  design-system work.
- If the user asks to skip grill review, record that as an explicit decision
  before using the freeze-and-plan specialist.
