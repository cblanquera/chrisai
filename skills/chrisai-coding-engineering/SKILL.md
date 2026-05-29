---
name: chrisai-coding-engineering
description: Use when a programming task is primarily about architecture, abstractions, runtime boundaries, library or framework design, plugin or adapter structure, API ergonomics, or deciding whether to simplify, refactor, or replace an existing design before language-specific implementation details matter.
---

# ChrisAI Coding Engineering

Use this skill for programming tasks where the main difficulty is engineering
judgment, not syntax.

This skill covers architecture, abstraction design, runtime boundaries, API
shape, portability concerns, and simplification decisions across JavaScript,
TypeScript, backend, framework, and library work.

Use the narrowest language or test specialist after this skill when the task
moves from design decisions into concrete implementation.

## When To Use

Use this skill when the task is mainly about:

- framework or library design
- backend or core module architecture
- routers, adapters, loaders, plugins, or lifecycle boundaries
- deciding whether to patch, refactor, simplify, or replace an abstraction
- public API ergonomics and composability
- runtime-model corrections driven by real execution behavior
- packaging, portability, module-boundary, or cross-environment design
- code review where the main question is engineering quality, not formatting

Do not use this skill as the primary specialist for:

- plain syntax or style cleanup in JS, TS, TSX, or HTML/CSS
- test-only implementation details
- docs-only work
- browser QA work

## Role

This skill is the ChrisAI engineering-design pass.

It should help Codex decide what structure ought to exist before the coding
specialist decides exactly how a file should look.

This skill should not duplicate the formatting, comment-density, import, JSX,
or test-style rules from the other ChrisAI coding skills.

## Priority Order

Apply rules in this order:

1. preserve strong local architecture when it is already coherent
2. correct designs that are disproven by runtime behavior or maintenance cost
3. simplify before adding new abstraction layers
4. choose public API clarity over internal cleverness
5. hand off to the narrowest implementation specialist for code-shape details

## Core Principles

### Reality First

Prefer runtime truth over abstract purity.

- Validate design choices against actual execution environments.
- Treat adapter boundaries, request and response flow, packaging, module
  systems, and deployment constraints as first-class design inputs.
- If a design fails in real use, replace it instead of rationalizing it.

### Durable Abstractions

Create abstractions only when they clearly reduce duplication, isolate a real
boundary, or improve the public surface.

- Prefer a small number of strong primitives over many thin wrappers.
- Avoid introducing parallel systems when one coherent path can serve both.
- Make lifecycle boundaries explicit when the system has setup, request,
  processing, teardown, plugin, or event phases.

### Simplification Is Progress

Deletion is a valid improvement.

- Remove abstractions that no longer earn their cost.
- Collapse layers that differ in name more than in responsibility.
- Prefer fewer concepts with cleaner roles over preserving historical shape.

### API Ergonomics Matter

Treat the developer-facing API as a product.

- Optimize for readability, composability, and stable mental models.
- Prefer APIs that are easy to infer from use.
- Keep convenience behavior predictable and aligned with the core model.
- Be cautious with clever inference when it can hide control flow or surprise
  the caller.

### Portability Is Part Of Design

Do not treat packaging and environment support as cleanup work.

- Consider ESM and CJS shape, import paths, case sensitivity, Windows and POSIX
  differences, and runtime adapter differences as part of architecture.
- Use examples to prove the design survives across representative environments.

## Discovery Workflow

Before proposing structure changes, inspect the codebase in this order:

1. the touched files and the immediate public surface they expose
2. adjacent abstractions that claim similar responsibility
3. runtime entry points, adapters, loaders, or plugin boundaries
4. examples, tests, or fixtures that show how the abstraction is consumed
5. packaging and export shape when the work affects library boundaries

Do not jump to a large redesign before understanding:

- what the current abstraction claims to own
- where responsibility actually leaks
- what real callers depend on today

## Decision Framework

When choosing between patching and redesigning, ask:

1. Is the current model conceptually wrong or merely incomplete?
2. Is complexity local, or does it spread across the public surface?
3. Does the abstraction reduce real coupling, or only rename it?
4. Would one stronger primitive replace several weaker ones?
5. Does runtime behavior contradict the architecture story?

If the model is wrong at its core, prefer redesign.
If the model is sound and the issue is local, prefer a targeted fix.

## Common Patterns

### Split Core From Adapters

When a system serves multiple environments, keep:

- one core execution model
- thin environment adapters
- shared request and response semantics where practical

Do not fork the conceptual model per runtime unless the runtimes truly require
different behavior.

### Design Around Lifecycles

When the code handles requests, tasks, or events:

- identify setup, processing, error, and shutdown phases
- make transition points explicit
- ensure plugins or hooks attach to known phases rather than hidden branches

### Prefer Explicit Boundaries

When logic spans loading, routing, dispatch, rendering, or side effects:

- keep each boundary narrow
- make the direction of flow obvious
- avoid helpers that obscure ownership

### Use Examples As Proof

If a library feature claims to support several consumption patterns:

- verify each pattern with a small example
- treat examples as design validation, not just marketing

## Refactor Guidance

When refactoring:

- preserve the stable public contract unless the user asks for a breaking change
- simplify internals before expanding capability
- move duplicate logic toward a shared primitive only after confirming the flows
  are truly equivalent
- update examples and tests that express the public model

Large refactors are acceptable when the old structure is clearly wrong, but the
new model must be more coherent, not merely different.

## Review Guidance

During review, prioritize:

1. conceptual correctness
2. boundary clarity
3. runtime fit
4. API ergonomics
5. maintainability under future change

Flag these issues early:

- abstractions that only rename complexity
- duplicated lifecycle logic in multiple runtimes
- public APIs that require internal knowledge to use correctly
- convenience inference that creates ambiguity
- design layers that exist for history rather than need

## Hand-Off Rules

After using this skill:

- use `chrisai-coding-js` for JavaScript implementation details
- use `chrisai-coding-ts-logic-review` for review-first TypeScript branching,
  decision logic, branch coverage, duplicated rule, or mutation-risk findings
  before applying changes
- use `chrisai-coding-ts` for TypeScript implementation details
- use `chrisai-coding-ts-react` for TSX and React implementation details
- use `chrisai-coding-ts-tests` for test implementation details

This skill should frame the structure and tradeoffs first, then defer code-shape
and style normalization to the language-specific specialist.
