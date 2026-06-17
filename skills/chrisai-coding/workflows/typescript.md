# ChrisAI Coding TS

Use this workflow only to audit, recommend improvements to, or fix existing
TypeScript.

This is a code-shape and fix-style workflow, not a framework-boundary
skill.

If the main question is about architecture, framework fit, runtime boundaries,
adapter shape, public API design, or whether a module boundary should exist at
all, state that the engineering workflow is excluded from this consolidated draft and
return here once the structure is decided.

If the main question is a review-first pass over complex branching, decision
logic, branch coverage gaps, duplicated rules, or mutation risk, use
`workflows/typescript-logic-review.md` first and only return here after the user
approves code edits.

## Second Pass Use

This workflow may guide approved fixes directly, but it is especially
recommended as the final pass after the existing code already works.

Use the last pass to normalize comment density, JSDoc coverage, declaration
comments, imports, exports, and formatting without changing working
behavior unnecessarily.

## Repo Discovery Workflow

Before applying standards, inspect the local codebase in this order:

1. the touched file and nearby sibling files
2. project lint, formatter, and TypeScript config
3. existing import and export patterns in the same package
4. package runtime constraints such as ESM, Node version, and build output

If the local codebase already has a stronger local convention, preserve it. Use this
skill to fill gaps and make decisions when the local pattern is unclear.

## Task Intake

Decide early whether the existing-code work is mainly:

- auditing an existing module
- recommending a clarity or typing refactor
- fixing an existing module boundary, extraction, or file split
- reviewing an existing TypeScript change

Do not use this skill as the primary decision-maker when the task is mainly
about:

- framework choice or framework integration boundaries
- runtime, adapter, loader, or plugin boundaries
- architecture or abstraction design
- public API or cross-package boundary design
- review-first branching, decision-logic, branch coverage, duplicated rule, or
  mutation-risk findings before code edits are approved

For module-boundary decisions and file-splitting guidance, read
`references/typescript-module-design.md` in this skill when needed.

## Priority Order

Apply rules in this order:

1. Match the existing style of the touched file when it is clear.
2. Apply the standards in this skill.
3. If a local pattern conflicts with this skill, preserve the local pattern
   unless the user asks to normalize the file.

Consistency beats preference. Keep changes small, focused, and easy to review.

## Core Formatting

- Use 2 spaces for indentation. Never use tabs.
- Prefer single quotes for strings.
- Use template literals for interpolation or multiline strings.
- Use double quotes only when the target syntax requires it, such as JSX or
  HTML attributes.
- End statements with semicolons.
- Do not add semicolons after `if`, `for`, or `while` blocks.
- Do end `do...while` statements with a semicolon.
- Keep lines compact and readable.
- Aim for `<= 80` characters when practical.
- Avoid going past `100` characters unless the file already does so
  consistently.
- Put opening braces on the same line.
- Keep exactly one blank line between logical blocks.
- Do not leave multiple consecutive blank lines.
- Do not use trailing commas in import lists or parameter lists.

## Commenting Style

The user prefers comments that read like a story and explain the flow of the
logic while browsing. Bias toward more comments, not fewer, when the code has
multiple steps or hidden assumptions.

- Treat comments as part of the author's signature, not optional decoration.
- Minimum comment density is per logical block.
- Increase comment density toward line-by-line when the logic branches, carries
  state, or hides assumptions.
- Add short `//` comments before each non-trivial logic block when practical.
- Story-style comments are welcome when they still stay local to the code they
  narrate.
- Explain why the next block exists, what state it prepares, and how it moves
  the flow forward.
- For multi-line conditionals, loops, callbacks, and ternaries, comment the
  condition and the consequence or branch separately when that improves
  scanning.
- For one-line conditionals, one-line ternaries, compact loops, and short
  inline callbacks that fit the line-length rules, one combined comment is
  acceptable.
- Keep comments factual and local to the code they describe.
- Prefer several small flow comments over one large paragraph.
- Let the comments read top-to-bottom like a guided walkthrough of the code.
- For single-sentence inline comments, start with lowercase after `//` and do
  not end with a period.
- For multi-sentence inline comments, sentence casing and punctuation are fine.
- Use a space after `//` on continuation lines of the same wrapped comment
  block.
- Use `/** ... */` JSDoc on every function, every class method, and every
  exported class, no matter how small.
- Use JSDoc as the declaration-level comment style for functions, methods, and
  classes.
- Do not stack a `//comment` declaration note immediately above the JSDoc block
  for the same function, method, or class.
- Keep JSDoc to a short description by default. Do not add `@param`,
  `@returns`, or similar tags unless the user explicitly asks for them.
- Add `//` comments above every class property and above exported types,
  constants, properties, and other exported declarations to explain what they
  are, where they are used, and how they are used.
- Do not leave commented-out code in committed work.

For concrete patterns and when-to-apply examples, load:

- `references/typescript-commenting-style.md`
- `references/typescript-jsdoc-and-declaration-comments.md`

## Naming

- Use names that another developer can understand without reading comments.
- Avoid single-letter names and unclear abbreviations.
- Use camelCase for variables and functions.
- Use verb or verb-noun phrasing for functions, such as `getUser`.
- Use PascalCase for classes and components.
- Use nouns for classes, such as `TaskQueue`.
- Use booleans like `isReady`, `hasToken`, `canRetry`, or `shouldPersist`.
- Use kebab-case for folders and most files.
- If a file exports a default class or component, PascalCase is acceptable for
  the file name.

## Data Layout And Spacing

- Keep short arrays and objects on one line when they remain readable.
- Expand arrays and objects vertically when they become long.
- Use spaces inside non-empty arrays and objects.
- Do not use spaces inside empty arrays or objects.

## Imports

Always group imports in exactly this order and label each group with section
comments:

1. `//node`
2. `//modules`
3. `//client`

Within each section, order imports like this:

1. named imports that are types
2. default imports that are types
3. named runtime imports
4. default runtime imports

Rules:

- Prefix native Node modules with `node:`.
- Use `.js` for client imports in ESM code.
- Use `//client`, not `//local`.
- Keep the section comments exactly as `//node`, `//modules`, and `//client`.
- Separate type imports from runtime imports even when they come from the same
  module.
- Separate default and named imports when needed to preserve the required
  ordering.
- If one source module needs multiple import forms, keep them on separate lines
  instead of combining them.
- When there is no stronger local convention, sort imports within the same
  subtype by module specifier.

## Exports

When a module has multiple exports, emit them in this order:

1. Types
2. Constants
3. Functions
4. Classes
5. Default export

Rules:

- End export statements with semicolons, including exported functions and
  classes.
- Keep the category order above, then alphabetize exports within each category
  by exported name.
- Use section dividers only for blocks that actually exist.
- Skip empty sections.
- If there are only one or two exports in a category and no grouping benefit,
  plain exports without section dividers are fine.
- When there are enough exports that grouping improves scanning, use this exact
  divider format:

```ts
//--------------------------------------------------------------------//
```

## Types And Interfaces

- Prefer `type` for object shapes, function signatures, unions, and aliases.
- Use `interface` for class contracts and shapes that a class will implement.
- Do not add a semicolon after an `interface` block.
- In object types, separate properties with commas, not semicolons.
- Put one space after a type colon and no space before it.
- Put spaces around `|` and `&` in unions and intersections.
- Prefer built-in utility types like `Record`, `Pick`, `Omit`, `Partial`, and
  `Required` when they keep types aligned with parent definitions.
- Prefer explicit types over `unknown` when you know the shape.
- Prefer `unknown` over `any` when a boundary truly is unknown.
- Treat `any` as discouraged and reach for `unknown` first.
- Avoid `any` unless there is no practical alternative.
- When `any` is truly necessary, add `//Comment` lines immediately before that
  usage explaining why `unknown`, a narrower type, or a generic would not work
  at that boundary yet.
- Do not commit `ts-ignore` except during temporary troubleshooting, and remove
  it before finishing.

## Functions And Methods

- Do not add argument types when TypeScript can naturally infer them from a
  default value or surrounding context.
- Do not add return types when the behavior is clear and inference is
  sufficient.
- Add explicit types when they improve API clarity or prevent ambiguity.
- Use narrowing with `typeof`, `Array.isArray`, or custom predicates before
  acting on unknown input.
- Throw real `Error` objects or subclasses with meaningful messages.
- Do not swallow errors silently.

## Classes

- Use explicit access modifiers like `public`, `protected`, and `private`.
- Always write `public` on public properties, getters, setters, methods, and
  the constructor.
- Order class members like this:
  1. static properties
  2. static methods
  3. properties
  4. getters
  5. setters
  6. constructor
  7. methods
- Within each member group, order by access level as `public`, then
  `protected`, then `private`.
- Within each same-kind and same-access group, alphabetize by the declared
  property or method name.
- Prefix `protected` and `private` methods with `_`.
- Keep internal helpers `protected` when subclasses may need them.
- Prefer `public readonly` for stable public composition fields.
- Do not use `protected readonly` or `private readonly` unless immutability at
  that boundary solves a real special-case need.
- Prefer getters to expose internal state instead of public mutable fields.
- For public overloads, declare overload signatures first and follow them with
  one shared function body.
- Return `this` from chainable APIs when that pattern matches the file.

## Runtime And Repo Hygiene

- Use strict ESM-safe local imports with `.js` suffixes.
- Prefer native APIs before adding dependencies.
- Only add packages that are clearly needed.
- Remove unused packages when touched safely.
- Do not hardcode secrets or API keys.
- Keep `.env` files out of version control.
- Do not commit `console.log`, `console.error`, or similar debug output.

## References

Load additional reference material only when the task needs it:

- `references/typescript-commenting-style.md` for inline comment density, inline versus
  multi-line control-flow comments, loops, callbacks, and ternaries
- `references/typescript-jsdoc-and-declaration-comments.md` for JSDoc coverage and
  declaration comment expectations
- `references/typescript-formatting-basics.md` for shared char-length, spacing, and
  semicolon rules following recommended style guides
- `references/typescript-style-details.md` for TypeScript-specific export,
  typing, import, export, and declaration examples
- `references/typescript-module-design.md` for file splitting, helper extraction, and
  public boundary decisions

## Review Checklist

Before finishing a TypeScript change, verify:

- the file still matches its existing local style where that style is clear
- indentation, quotes, blank lines, and semicolons are consistent
- the file received a final style pass after the logic was working
- lines stay compact and readable without unnecessary wrapping
- non-trivial logic blocks have enough `//Comment` guidance to browse as a
  story
- every function and class method has JSDoc
- exported classes also have JSDoc that explains their role and how callers use
  or instantiate them
- declaration-level `//comment` notes are not duplicated above JSDoc blocks
- class properties and exported declarations have `//Comment` guidance where it
  clarifies role or usage
- JSDoc stays short and omits `@param` tags by default
- imports are grouped under `//node`, `//modules`, `//client`
- import lines are split to preserve the required type and runtime ordering
- local imports use `.js`
- export sections are ordered correctly when multiple categories are present
- exports are alphabetized within their category
- public members and the constructor spell out `public`
- class members follow the required member-type, access-level, and
  alphabetized order
- `protected readonly` and `private readonly` only appear for justified
  special cases
- exported items end with semicolons
- object types use commas and interfaces are reserved for class contracts
- any remaining `any` usage has a preceding justification comment
- `any`, `ts-ignore`, debug logging, and commented-out code are not left behind
