# ChrisAI Docs Dev API Reference

This reference guides API reference documentation for junior developers who already
know the surface they need and want accurate, scannable details.

Optimize for lookup, correctness, and integration guidance. Do not turn pure
reference pages into guided-learning tutorials.

## Task Intake

Before drafting or restructuring, identify:

1. the documented surface: class, module, function, CLI, config, or schema
2. the intended reader: caller, integrator, maintainer, or migration reader
3. the missing details: signatures, defaults, errors, examples, or return
   behavior
4. the expected deliverable: single file, multi-file reference set, or index +
   detail pages

If the task is mainly guided learning, switch to `references/guided-learning.md`. If
the task is mainly markdown cleanup, apply `references/formatting.md` after
the reference structure is decided.

## Scope

Use this reference for:

- class and module reference docs
- method, property, and configuration documentation
- type-safe usage examples
- API folder organization and cross-linking

Do not use this reference as the primary rule set for quick starts, tutorials, or
general markdown normalization.

For those cases, use:

- `references/guided-learning.md`
- `references/formatting.md`

## File Organization

When a project has multiple API reference files:

- place them in an `api/` directory when that matches the repo's docs layout
- use an `api/README.md` or equivalent index page when several reference files
  exist
- prefer one file per major class, module, or component
- use descriptive filenames that match the documented subject

## Default Page Structure

Unless the codebase has a stronger local pattern, organize API pages in this
order:

1. title and short description
2. minimal import or instantiation example
3. TOC when the page is long enough to need one
4. static properties or exports when relevant
5. static methods when relevant
6. instance properties or configuration
7. instance methods or operations
8. integration examples
9. related links

## Method Standard

For each public method or operation:

- describe what it does and when to use it
- show a realistic usage example
- document parameters in a table when parameters exist
- document the return value under `**Returns**` in prose, not a return table
- mention defaults, optional parameters, promises, and chaining when relevant

Do not document protected or private members unless the user explicitly asks.

## Example Standard

- Use complete, runnable, or nearly runnable examples.
- Include imports when they improve orientation.
- Prefer realistic names and values.
- Show TypeScript types when they clarify public usage.
- Progress from basic examples to integration examples when several are needed.

## Cross-Reference Rules

- Link related classes, modules, guides, and examples.
- Explain how components fit together.
- Keep reference pages lookup-friendly and independently scannable.

## Deliverables

When the task touches more than one API surface, prefer a small reference set
over one overloaded page.

Typical outputs are:

- one lookup-friendly page per major API surface
- an index page when several reference files now exist
- realistic examples for the public behaviors that readers are most likely to
  copy first
- cross-links to related guides, tasks, or adjacent APIs

## Priority

When this reference is used with other documentation guidance:

1. `references/api-reference.md` owns the schema of the reference material.
2. `references/formatting.md` may normalize presentation without changing
   the API schema.
3. `references/guided-learning.md` may provide surrounding learning pages, but
   should not force tutorial structure onto pure reference pages.

## Review Gate

Do not consider the output complete unless the answer to all of these is yes:

- Is the page optimized for lookup?
- Are public methods, properties, and returns documented clearly?
- Are examples realistic and junior-developer-friendly?
- Are related references and integration paths linked?
- Did the page avoid drifting into guided-learning prose?
