---
name: chrisai-coding
description: Use for tasks involving code styling, and logic reviews where code involves JavaScript, TypeScript, HTML, CSS.
---

# ChrisAI Coding

Use this skill to audit code written in JavaScript, TypeScript, HTML, or CSS. 
Route the task to the narrowest internal workflow or reference unless the 
request clearly needs a deliberate sequence.

## Internal Workflows

- Use `workflows/javascript.md` for JavaScript implementation, refactors, and
  reviews across `.js`, `.mjs`, and `.cjs`.
- Use `workflows/typescript.md` for non-React TypeScript implementation,
  refactors, reviews, code shape, imports, exports, typing, classes, and final
  style passes.
- Use `workflows/typescript-logic-review.md` for review-first TypeScript logic
  work involving branching risk, hard-to-follow decisions, test gaps,
  duplicated rules, mutation risk, or refactor opportunities before edits.
- Use `workflows/react-tsx.md` for TypeScript ReactJS or TSX components,
  hooks, form behavior, prop and event typing, JSX structure, and frontend
  import/export conventions.
- Use `workflows/typescript-tests.md` for Jest, Mocha, Chai, React component
  tests, test coverage, deterministic test design, and test style passes.
- Use `workflows/html-css.md` for vanilla HTML and CSS implementation,
  refactors, and reviews for static sites, documentation pages, and frontend
  templates.

## Supporting References

- Use JavaScript references when `workflows/javascript.md` calls for deeper
  examples: `references/javascript-commenting-style.md`,
  `references/javascript-formatting-basics.md`,
  `references/javascript-jsdoc-and-declaration-comments.md`,
  `references/javascript-module-design.md`, and
  `references/javascript-module-systems.md`.
- Use TypeScript references when `workflows/typescript.md` calls for deeper
  examples: `references/typescript-commenting-style.md`,
  `references/typescript-formatting-basics.md`,
  `references/typescript-jsdoc-and-declaration-comments.md`,
  `references/typescript-module-design.md`, and
  `references/typescript-style-details.md`.
- Use `references/typescript-logic-review-signals.md` when logic-review work
  needs concrete signals for complexity, branch coverage, mutation risk, or
  duplicated decision logic.
- Use React references when `workflows/react-tsx.md` calls for deeper examples:
  `references/react-commenting-style.md`, `references/react-forms.md`,
  `references/react-jsdoc-and-declaration-comments.md`,
  `references/react-modern-react.md`,
  `references/react-file-outline.md`, and
  `references/react-section-comments.md`.
- Use test references when `workflows/typescript-tests.md` calls for deeper
  examples: `references/typescript-tests-commenting-style.md`,
  `references/typescript-tests-jest.md`,
  `references/typescript-tests-jsdoc-and-declaration-comments.md`,
  `references/typescript-tests-mocha-chai.md`,
  `references/typescript-tests-test-selection.md`, and
  `references/typescript-tests-test-style-pass.md`.
- Use HTML/CSS references when `workflows/html-css.md` calls for deeper
  examples: `references/html-css-css-style-details.md` and
  `references/html-css-html-style-details.md`.

## Sequencing

Only chain internal guidance when there is a clear owner plus a clear
follow-up. Use this order:

1. `workflows/typescript-logic-review.md` first when the user asks for a
   review-first pass over TypeScript branching, decision logic, branch coverage,
   duplicated rules, or mutation risk.
2. The narrowest implementation workflow next when the user approves edits or
   when the request starts as implementation work.
3. The same implementation workflow again as the final style pass after the
   behavior works.
4. `workflows/typescript-tests.md` when test implementation, test repair, or
   coverage is the owned deliverable.

Do not default to multi-step coding sequences when one workflow owns the
request.

## Decision Rules

- If the task is plain JavaScript, use `workflows/javascript.md`.
- If the task is non-React TypeScript implementation, use
  `workflows/typescript.md`.
- If the task is a TypeScript review-first logic audit, use
  `workflows/typescript-logic-review.md` and do not edit during the initial
  review pass.
- If the task is TSX, typed React components, hooks, forms, or React UI code,
  use `workflows/react-tsx.md`.
- If the task is mainly adding, repairing, or reviewing tests, use
  `workflows/typescript-tests.md`.
- If the task is vanilla HTML and CSS for static pages, docs pages, or frontend
  templates, use `workflows/html-css.md`.
- If a task mixes React code and tests, pick the side that owns the asked
  deliverable. A new test suite belongs to `workflows/typescript-tests.md`.
- If a task mixes HTML/CSS with JavaScript or TypeScript, choose the workflow
  that owns the primary file being changed, then load the other workflow only
  if needed.
