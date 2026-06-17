# JavaScript Module Design

Use this reference when the JavaScript task is not only about syntax or style,
but also about file boundaries, helper extraction, and module responsibilities.

## When To Split A File

Consider splitting a file when:

- one file mixes unrelated responsibilities
- setup, parsing, branching, and output formatting all live in one long flow
- private helpers start competing with the public API for attention
- one function grows large enough that comments are explaining structure more
  than behavior

Do not split files just to create more files. Split when the boundary makes the
reader's job easier.

## Boundary Rules

- Keep one clear responsibility per module when practical.
- Keep public exports obvious near the bottom or in one readable section.
- Move reusable helpers into sibling modules when they serve more than one call
  site.
- Keep package-private helpers local when they are only meaningful inside one
  module.
- Prefer small modules with explicit names over generic utility dumping
  grounds.

## Extraction Heuristics

- Extract helper functions when a function mixes validation, transformation,
  and side effects.
- Extract modules when a cluster of helpers forms one concept with its own
  inputs and outputs.
- Leave code in place when extraction would create indirection without
  improving understanding.

## Review Questions

- Can a reader identify the module's main job in a few seconds?
- Are exported names the smallest useful public surface?
- Would changing one helper force unrelated callers to care?
- Did the split reduce complexity, or only move lines around?
