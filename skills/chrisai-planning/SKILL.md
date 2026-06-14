---
name: chrisai-planning
description: Use when a ChrisAI planning task needs routing for project-local `.agents` setup, repair, migration, standardization, workflow installation, or initial AI-readable records before coding begins.
---

# ChrisAI Planning Router

Use this family router when a product, application, or major initiative needs a
project-local `.agents` operating surface before implementation or coordinated
execution begins.

This family is intentionally heavy. It is not for normal feature planning,
bugfix scoping, refactors, existing app additions, or small tools. Route those
requests to the relevant coding, design, docs, process, or agent-progress
skills.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-planning-agent-spec` to create, repair, migrate, or standardize
  `.agents/AGENTS.md`, `.agents/workflows/`, folder structure, manifests, and
  initial records.

## Scope Gate

Use this family when all of these are true:

1. The project is a large app or product surface, not a narrow feature.
2. The user wants `.agents` setup, standardization, migration, or initial
   planning state before execution.
3. The output should live in the `.agents/` project knowledge base, with
   durable scope under `.agents/specs/`. Do not create root-level `plans/`
   deliverables from this route.

If any condition is false, use a narrower existing ChrisAI route instead.

## Sequence

Prefer this sequence for new `.agents` work:

1. `chrisai-planning-agent-spec`
2. local `.agents/AGENTS.md`
3. the relevant `.agents/workflows/*.md` file for review, validation, freeze,
   progress, handoff, or source retirement
4. implementation work through the relevant coding, design, docs, or process
   skills

Do not start implementation from this router.

## Decision Rules

- Prefer `.agents/workflows/progress.md` for large implementation or migration
  work in an existing codebase that already has the current `.agents` setup.
- Use `chrisai-planning-agent-spec` when existing document-heavy planning
  artifacts need to be preserved, reconciled, or converted into active spec
  records.
- Prefer `chrisai-coding-engineering` for architecture analysis of existing
  code, libraries, plugins, adapters, or runtime boundaries.
- Prefer `chrisai-docs` for documentation-only planning artifacts.
- Prefer `chrisai-design` for visual concepting, wireframes, prototypes, or
  design-system work.
- For current `.agents` projects, route unresolved blockers, high-risk
  findings, assumptions, questions, or decisions through
  `.agents/workflows/validation.md` before freeze.
