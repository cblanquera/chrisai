# ChrisAI Coding JS

Use this workflow only to audit, recommend improvements to, or fix existing
JavaScript.

This skill covers:

- plain `.js`
- ESM `.mjs`
- CommonJS `.cjs`

Use TypeScript-specific skills instead for `.ts`, `.tsx`, and TypeScript-first
test work.

If the main question is a review-first pass over complex branching, decision
logic, branch coverage gaps, duplicated rules, or mutation risk, use
`workflows/logic-review.md` first and only return here after the user approves
code edits.

## Second Pass Use

This workflow may guide approved fixes directly, but it is especially
recommended as the final pass after the existing code already works.

Use the last pass to normalize comment density, JSDoc coverage, declaration
comments, imports or requires, exports, and formatting without
changing working behavior unnecessarily.

## Repo Discovery Workflow

Before applying standards, inspect the local codebase in this order:

1. the touched file and nearby sibling files
2. package metadata such as `package.json`
3. lint and formatter config
4. the runtime and module system already used by the package or folder
5. existing import, require, and export patterns in the same package

If the local codebase already has a stronger local convention, preserve it. Use this
skill to fill gaps and make decisions when the local pattern is unclear.

## Task Intake

Decide early whether the existing-code work is mainly:

- auditing an existing module
- recommending a clarity refactor
- fixing an existing module boundary, extraction, or file split
- fixing module system interop in existing files
- reviewing an existing JavaScript change

For module-boundary decisions and file-splitting guidance, read
`references/javascript-module-design.md` in this skill when needed.

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
- Use double quotes only when the target syntax requires it, such as embedded
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

Follow the newer ChrisAI coding guidance for comment behavior.

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
- Add `//` comments above every class property and above exported constants,
  properties, and other exported declarations to explain what they are, where
  they are used, and how they are used.
- Do not leave commented-out code in committed work.

For concrete patterns and when-to-apply examples, load:

- `references/javascript-commenting-style.md`
- `references/javascript-jsdoc-and-declaration-comments.md`

## Naming

- Use names that another developer can understand without reading comments.
- Avoid single-letter names and unclear abbreviations.
- Use camelCase for variables and functions.
- Use verb or verb-noun phrasing for functions, such as `getUser`.
- Use PascalCase for classes.
- Use nouns for classes, such as `TaskQueue`.
- Use booleans like `isReady`, `hasToken`, `canRetry`, or `shouldPersist`.
- Use kebab-case for folders and most files.
- If a file exports a default class, PascalCase is acceptable for the file
  name.

## Data Layout And Spacing

- Keep short arrays and objects on one line when they remain readable.
- Expand arrays and objects vertically when they become long.
- Use spaces inside non-empty arrays and objects.
- Do not use spaces inside empty arrays or objects.

## Module System Discovery

Decide module rules from the file and package context before editing:

- `.mjs` means ESM. Use `import` and `export`.
- `.cjs` means CommonJS. Use `require()` and `module.exports` or
  `exports.name`.
- plain `.js` must be treated as context-dependent. Inspect nearby files and
  `package.json` before choosing ESM or CommonJS behavior.
- Do not convert a file from CommonJS to ESM or from ESM to CommonJS unless
  the user asks for that migration.
- Keep the module system consistent within the touched file and package unless
  the task is specifically about interop or migration.
- When a local ESM package already uses explicit local file extensions,
  preserve that pattern.

For concrete interop and module-mode examples, load
`references/javascript-module-systems.md`.

## Imports And Requires

For ESM files, group imports in exactly this order and label each group with
section comments:

1. `//node`
2. `//modules`
3. `//client`

Rules:

- Prefix native Node modules with `node:` in ESM when the package already does
  so or the local pattern is unclear.
- Use `.js` for client imports in ESM code when the package already does so or
  the local pattern is unclear.
- Keep the section comments exactly as `//node`, `//modules`, and `//client`.
- When there is no stronger local convention, sort imports within the same
  section by module specifier.

For CommonJS files:

- Prefer keeping `require()` declarations grouped by local file convention.
- Do not force ESM import-section comments into established CommonJS files if
  the package does not use them there already.
- Keep `require()` calls near the top of the file unless the file clearly uses
  lazy-loading for runtime reasons.

## Exports

When an ESM module has multiple exports, emit them in this order:

1. Constants
2. Functions
3. Classes
4. Default export

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

```js
//--------------------------------------------------------------------//
```

For CommonJS modules:

- Preserve the local export pattern, whether that is `module.exports`,
  `module.exports.name`, or `exports.name`.
- Keep export style consistent inside the file.

## Functions And Errors

- Prefer small focused functions over long nested flows.
- Extract helpers when a function starts mixing parsing, branching, and side
  effects.
- Use narrowing with `typeof`, `Array.isArray`, `instanceof`, or explicit shape
  checks before acting on uncertain input.
- Throw real `Error` objects or subclasses with meaningful messages.
- Do not swallow errors silently.

## Classes

- Prefer functions and plain objects unless a class is already the local
  pattern or the lifecycle clearly benefits from a class boundary.
- Order class members like this:
  1. static properties
  2. static methods
  3. properties
  4. getters
  5. setters
  6. constructor
  7. methods
- Within each member group, keep public-facing members before private helpers
  when the syntax or local pattern exposes that distinction.
- Within each same-kind member group, alphabetize by the declared property or
  method name.
- Prefix internal helper methods with `_` when that is the local pattern or
  when the file has no stronger class convention.
- Prefer getters to expose internal state instead of public mutable fields when
  that improves clarity.
- Return `this` from chainable APIs when that pattern matches the file.

## Runtime And Repo Hygiene

- Prefer native APIs before adding dependencies.
- Only add packages that are clearly needed.
- Remove unused packages when touched safely.
- Do not hardcode secrets or API keys.
- Keep `.env` files out of version control.
- Do not commit `console.log`, `console.error`, or similar debug output.

## References

Load additional reference material only when the task needs it:

- `references/javascript-commenting-style.md` for inline comment density, inline versus
  multi-line control-flow comments, loops, callbacks, and ternaries
- `references/javascript-jsdoc-and-declaration-comments.md` for JSDoc coverage and
  declaration comment expectations
- `references/javascript-formatting-basics.md` for shared char-length, spacing, and
  semicolon rules pulled from the repo style guides
- `references/javascript-module-systems.md` for `.js`, `.mjs`, `.cjs`, ESM, CommonJS, and
  interop decisions
- `references/javascript-module-design.md` for file splitting, helper extraction, and
  public boundary decisions

## Review Checklist

Before finishing a JavaScript change, verify:

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
- ESM imports, CommonJS requires, and exports match the file's module mode
- `.js` files were checked for package context before changing module syntax
- local ESM imports keep required file extensions when the package expects them
- export sections are ordered correctly when multiple ESM categories are
  present
- exports are alphabetized within their category
- class members follow the required static, property, accessor, constructor,
  and method order
- exported items end with semicolons
- debug logging and commented-out code are not left behind
