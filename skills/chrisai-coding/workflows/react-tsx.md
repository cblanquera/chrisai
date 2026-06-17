# ChrisAI Coding TS React

Use this workflow only to audit, recommend improvements to, or fix existing
TypeScript ReactJS or TSX code in a local codebase.

This workflow is intentionally self-contained. It consolidates the relevant
ReactJS guidance and the local TypeScript-oriented coding style so the agent
does not need to bounce between multiple documents during existing-code fixes.

## Contents

- [Second Pass Use](#second-pass-use)
- [Repo Discovery Workflow](#repo-discovery-workflow)
- [Task Intake](#task-intake)
- [Priority Order](#priority-order)
- [Core Formatting](#core-formatting)
- [Commenting Style](#commenting-style)
- [Naming](#naming)
- [JSX Formatting](#jsx-formatting)
- [Component Flow](#component-flow)
- [Hooks](#hooks)
- [File Layout](#file-layout)
- [Imports](#imports)
- [Types](#types)
- [Exports](#exports)
- [Classes](#classes)
- [React Implementation Biases](#react-implementation-biases)
- [References](#references)
- [Review Checklist](#review-checklist)

## Second Pass Use

This workflow may guide approved fixes directly, but it is especially
recommended as the final pass after the existing component logic already works.

Use the last pass to normalize inline comments, JSDoc coverage, section
comments, file organization, and readability without destabilizing
working behavior.

## Repo Discovery Workflow

Before applying React-specific preferences, inspect the local codebase in this order:

1. the touched component and nearby sibling components
2. the local React stack, router, and rendering model
3. the test stack used for nearby component tests
4. any existing form, state, and hook conventions in the same package

If the codebase already has a stronger local pattern, preserve it. Use this
workflow when the local pattern is missing, inconsistent, or needs a
tie-breaker.

## Task Intake

Decide whether the existing-code task is mainly:

- auditing an existing component
- recommending a component refactor
- fixing an existing hook extraction
- fixing existing form behavior
- reviewing an existing TSX change

For deeper form patterns or rendering-boundary checks, read the matching file in
`references/` only when the task needs it.

## Priority Order

Apply rules in this order:

1. Match the existing style of the touched file when it is clear.
2. Apply the standards in this workflow.
3. If a local pattern conflicts with this workflow, preserve the local pattern
   unless the user asks to normalize the file.

Consistency beats preference. Keep changes small, focused, and easy to review.

## Core Formatting

- Use 2 spaces for indentation. Never use tabs.
- Prefer single quotes for strings.
- Use double quotes only when JSX or HTML syntax requires it.
- End statements with semicolons.
- Put opening braces on the same line.
- Keep exactly one blank line between logical blocks.
- Do not leave multiple consecutive blank lines.
- Avoid trailing commas in import lists or parameter lists.
- Keep lines compact and readable.
- Aim for `<= 80` characters when practical.
- Avoid going past `100` characters unless the file already does so
  consistently.

## Commenting Style

The user prefers comments that read like a story and explain the logic while
browsing. In typed React code this preference is strong enough that you should
bias toward more comments, not fewer, when a component has multiple steps,
derived state, branching UI, or side effects.

- Treat comments as part of the author's signature, not optional decoration.
- Minimum comment density is per logical block.
- Increase comment density toward line-by-line when the logic branches, carries
  state, or depends on implicit UI flow.
- Add short `//` comments before each non-trivial logic block when practical.
- Story-style comments are welcome when they still stay local to the code they
  narrate.
- Explain why the next block exists, what state it prepares, and how it moves
  the component flow forward.
- For multi-line conditionals, loops, render callbacks, handlers, effects, and
  ternaries, comment the condition and the consequence or branch separately
  when that improves scanning.
- For one-line conditionals, one-line ternaries, compact loops, and short
  inline callbacks that fit the line-length rules, one combined comment is
  acceptable.
- Let the comments read top-to-bottom like a guided walkthrough of the file.
- Prefer several small flow comments over one large paragraph.
- Keep comments factual and local to the code they describe.
- For single-sentence inline comments, start with lowercase after `//` and do
  not end with a period.
- For multi-sentence inline comments, sentence casing and punctuation are fine.
- Use a space after `//` on continuation lines of the same wrapped comment
  block.
- Use `/** ... */` JSDoc on every function, hook, class method, and exported
  class, no matter how small.
- Use JSDoc as the declaration-level comment style for functions, hooks,
  methods, and classes.
- Do not stack a `//comment` declaration note immediately above the JSDoc block
  for the same function, hook, method, or class.
- Keep JSDoc to a short description by default. Do not add `@param`,
  `@returns`, or similar tags unless the user explicitly asks for them.
- Add `//` comments above every class property and above exported types,
  constants, properties, and other exported declarations to explain what they
  are, where they are used, and how they are used.
- For large components or large JSX return sections, use React section comments
  only when they clearly improve scanning, and use the exact `START` / `END`
  pattern.
- Do not leave commented-out code in committed work.

For concrete patterns and when-to-apply examples, load:

- `references/react-commenting-style.md`
- `references/react-jsdoc-and-declaration-comments.md`
- `references/react-section-comments.md`

## Naming

- Use names that another developer can understand without reading comments.
- Avoid single-letter names and unclear abbreviations.
- Use camelCase for variables, hooks, and functions.
- Use PascalCase for components, classes, and component prop types.
- Name prop types with a clear `Props` suffix.
- Name event handlers after intent, such as `handleSubmit` or `handleChange`.
- Prefix custom hooks with `use`.
- Use booleans like `isReady`, `hasError`, `canSubmit`, or `shouldClose`.
- Use kebab-case for folders and most files.
- If a file exports a default component, PascalCase is acceptable for the file
  name.

## JSX Formatting

### Wrapping Returns

Components must wrap returned JSX in parentheses.

- Wrap single-line JSX returns in parentheses.
- Wrap multi-line JSX returns in parentheses.
- Keep indentation consistent inside the returned JSX block.

### Prop Signatures

Keep component prop signatures readable.

- Prefer a named prop type for non-trivial props.
- Default to typed props and typed events. This workflow is for TSX, not plain
  JSX.
- Inline simple prop types when that is still easy to scan.
- If destructuring becomes tall or noisy, accept `props` first and unpack it in
  the component body.
- Avoid awkward multiline destructuring that hides the prop shape.

## Component Flow

Organize component internals in this order:

1. props
2. hooks
3. derived variables
4. handlers
5. effects
6. render

Do not intermix these sections arbitrarily. This order should make the
component readable from top to bottom like a story: what comes in, what state
exists, what gets derived, what actions can happen, what side effects run, and
what gets rendered.

For concrete ordering examples, load `references/react-file-outline.md`.

## Hooks

### Aggregate Hooks

When a component collects several related hooks, derived values, handlers, and
effects, consider moving that logic into one aggregate custom hook.

- Prefer an aggregate hook when the component body is becoming crowded.
- Keep the aggregate hook in the same file when it only serves one component.
- Move the hook into a shared `hooks` folder only when it is genuinely reused.
- Return only the values the component actually needs.

### Controlled And Uncontrolled Inputs

For form field components, support both controlled (`value`) and uncontrolled
(`defaultValue`) usage unless there is a strong reason not to.

- Initialize local state from `defaultValue` for uncontrolled usage.
- Mirror external `value` changes into local state for controlled usage.
- Call the incoming `onChange` after updating local state.
- Keep the sync logic explicit so the component behavior is easy to reason
  about.

For concrete controlled and uncontrolled patterns, load `references/react-forms.md`.

## File Layout

When a React file contains enough structure to benefit from clear sections, use
this order:

1. Imports
2. Types
3. Constants
4. Helpers
5. Hooks
6. Components

Use section dividers only when they improve scanning. The exact divider format
is:

```ts
//--------------------------------------------------------------------//
```

### File Structure

- Put reusable shared components in a `components` folder.
- Put reusable shared hooks in a `hooks` folder.
- Keep non-reusable components in the same file as the parent component that
  uses them.
- Keep non-reusable hooks in the same file as the parent component that uses
  them.
- Keep aggregate hooks in the same file as the component when they are local.
- Keep contexts and their providers in the same file.

Use `Object.assign()` to extend functional components with related hooks,
helpers, and constants when that pattern is already used or improves discoverability.

## Imports

Group imports in exactly this order and label each group with section comments:

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
- Use `.js` for local ESM imports when the project expects it.
- Keep the section comments exactly as `//node`, `//modules`, and `//client`.
- Separate type imports from runtime imports even when they come from the same
  module.
- When there is no stronger local convention, sort imports within the same
  subtype by module specifier.

Example:

```tsx
//node
import type { IncomingMessage } from 'node:http';
import { join } from 'node:path';

//modules
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

//client
import type { MenuItem } from './types.js';
import { notify } from './notify.js';
```

## Types

- Prefer `type` for props, state shapes, unions, function signatures, and most
  aliases.
- Type React events explicitly when they cross component boundaries or power
  non-trivial handlers.
- Type hook config and return shapes when that improves readability or reuse.
- Use `interface` for class contracts and shapes a class will implement.
- In object types, separate properties with commas, not semicolons.
- Put one space after a type colon and no space before it.
- Put spaces around `|` and `&` in unions and intersections.
- Prefer utility types like `Pick`, `Omit`, `Partial`, and `Required` when they
  keep types aligned with parent definitions.
- Avoid `any` unless there is no practical alternative.
- Prefer `unknown` over `any` at uncertain boundaries.
- Do not leave `ts-ignore` in finished work.

Prefer:

```tsx
type InputProps = {
  defaultValue?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  value?: string
};
```

Avoid leaving React-facing boundaries untyped in this workflow's output unless the
file already follows a stronger local convention.

## Exports

When a module has multiple exports, emit them in this order:

1. Types
2. Constants
3. Functions
4. Classes
5. Default export

- End export statements with semicolons, including exported functions and
  classes.
- Keep the category order above, then alphabetize exports within each category
  by exported name.
- Use section dividers only for blocks that actually exist.
- Skip empty sections.
- If there are only one or two exports in a category and no grouping benefit,
  plain exports are fine.

## Classes

When TSX files include classes, follow the same TypeScript class rules used in
the local codebase:

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
- Prefer `public readonly` for stable public composition fields.
- Do not use `protected readonly` or `private readonly` unless immutability at
  that boundary solves a real special-case need.
- Prefer getters to expose internal state instead of public mutable fields.

## React Implementation Biases

- Prefer small focused components over one large mixed-responsibility file.
- Prefer derived values over duplicated state.
- Prefer lifting state only when multiple consumers truly need the same source
  of truth.
- Prefer explicit handlers with intent-revealing names over inline anonymous
  logic when the behavior is reused or non-trivial.
- Keep render blocks declarative and push preparation logic upward into hooks,
  helpers, or derived variables.
- Default to `.tsx` component patterns with explicit prop contracts instead of
  loose JavaScript-style component signatures.
- Prefer native React and browser APIs before adding dependencies.
- Do not leave debug logging in finished work.

## References

Load additional reference material only when the task needs it:

- `references/react-commenting-style.md` for inline comment density, inline versus
  multi-line control-flow comments, loops, callbacks, render lists, and
  ternaries
- `references/react-jsdoc-and-declaration-comments.md` for JSDoc coverage and
  declaration comment expectations
- `references/react-forms.md` for controlled versus uncontrolled field behavior and
  sync edge cases
- `references/react-modern-react.md` for local rendering-boundary and state-placement
  checks
- `references/react-file-outline.md` for component ordering, aggregate hooks,
  and section-divider usage
- `references/react-section-comments.md` for JSX `START` / `END` section
  comment usage

## Review Checklist

When auditing or fixing React code, check for these issues:

- JSX returns are wrapped in parentheses.
- the file received a final style pass after the logic was working
- Props and types are easy to scan.
- Component internals follow the expected story order.
- Complex hook logic is aggregated when that improves readability.
- Controlled and uncontrolled field behavior is implemented correctly.
- Reusable pieces are separated from local-only pieces appropriately.
- Imports and exports follow this workflow's conventions.
- export groups stay in the required category order and are alphabetized within
  each category
- TSX classes, when present, use explicit `public` members and follow the
  required member-type, access-level, and alphabetized order
- `protected readonly` and `private readonly` only appear for justified
  special cases
- exported declarations have `//Comment` guidance where it clarifies role or
  usage
- debug logging and commented-out code are not left behind
- every function, hook, and class method has JSDoc
- exported classes also have JSDoc that explains their role and how callers use
  or instantiate them
- declaration-level `//comment` notes are not duplicated above JSDoc blocks
- large JSX sections only use `START` / `END` section comments when that
  actually improves scanning
- Comments explain the flow of the code without becoming noise.
