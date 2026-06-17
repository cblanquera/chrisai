---
name: chrisai-coding
description: Use only for auditing, recommending improvements to, and fixing existing JavaScript, TypeScript, React TSX, TypeScript test, HTML, or CSS code. 
---

# ChrisAI Coding

Use this skill only for existing code. Route the task to the narrowest internal
workflow or reference when the user asks to audit, recommend improvements, or
fix code that already exists.

## Internal Workflows

- Use `workflows/javascript.md` for auditing, recommending, and fixing existing
  JavaScript across `.js`, `.mjs`, and `.cjs`.
- Use `workflows/typescript.md` for auditing, recommending, and fixing existing
  non-React TypeScript code shape, imports, exports, typing, classes, and final
  style passes.
- Use `workflows/logic-review.md` for review-first JavaScript or TypeScript
  logic work involving branching risk, hard-to-follow decisions, test gaps,
  duplicated rules, mutation risk, or refactor opportunities before edits.
- Use `workflows/react-tsx.md` for auditing, recommending, and fixing existing
  TypeScript ReactJS or TSX components, hooks, form behavior, prop and event
  typing, JSX structure, and frontend import/export conventions.
- Use `workflows/typescript-tests.md` for auditing, recommending, and fixing
  existing Jest, Mocha, Chai, React component tests, test coverage,
  deterministic test design, and test style passes.
- Use `workflows/html-css.md` for auditing, recommending, and fixing existing
  vanilla HTML and CSS in static sites, documentation pages, and frontend
  templates.
- Use `workflows/maintainability-audit.md` only when the user explicitly asks
  for a maintainability, structure, organization, responsibility-separation, or
  "code stuffed into one file" audit. This workflow recommends changes and
  stops before editing unless the user approves the recommendations.

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
- Use `references/logic-review-signals.md` when logic-review work needs
  concrete signals for complexity, branch coverage, mutation risk, or
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
- Use `references/maintainability-audit-signals.md` only when
  `workflows/maintainability-audit.md` needs concrete signals for code that is
  hard to navigate, over-concentrated in one file, poorly grouped by centered
  feature/entity/model/domain, or split in a way that obscures ownership.

## Sequencing

Only chain internal guidance when there is a clear owner plus a clear
follow-up. Use this order:

1. `workflows/logic-review.md` first when the user asks for a review-first pass
   over JavaScript or TypeScript branching, decision logic, branch coverage,
   duplicated rules, or mutation risk.
2. `workflows/maintainability-audit.md` only when the user explicitly asks for
   that audit. Stop after recommendations; do not edit until the user approves.
3. The narrowest fix workflow next when the user approves edits to existing
   code.
4. The same fix workflow again as the final style pass after the fix works.
5. `workflows/typescript-tests.md` when existing test repair, coverage repair,
   or test audit is the owned deliverable.

Do not default to multi-step coding sequences when one workflow owns the
request.

## Decision Rules

- If the task is a JavaScript or TypeScript review-first logic audit, use
  `workflows/logic-review.md` and do not edit during the initial review pass.
- If the task is plain JavaScript, use `workflows/javascript.md`.
- If the task is non-React TypeScript audit or fix work, use
  `workflows/typescript.md`.
- If the task is TSX, typed React components, hooks, forms, or React UI code,
  use `workflows/react-tsx.md`.
- If the task is mainly auditing, repairing, or reviewing existing tests, use
  `workflows/typescript-tests.md`.
- If the task is vanilla HTML and CSS for static pages, docs pages, or frontend
  templates, use `workflows/html-css.md`.
- If a task mixes React code and tests, pick the side that owns the asked
  deliverable. A new test suite from scratch is outside this skill unless it is
  the smallest fix for uncovered existing behavior.
- If a task mixes HTML/CSS with JavaScript or TypeScript, choose the workflow
  that owns the primary file being changed, then load the other workflow only
  if needed.
- If the user explicitly asks for maintainability, structure, organization,
  separation of responsibilities, or a review of code being stuffed into one
  place, use `workflows/maintainability-audit.md` as a review-only pass. Do not
  use it automatically during normal implementation or fixes.
