---
name: chrisai-coding
description: Use when a ChrisAI coding task needs routing to the narrowest architecture, JavaScript, TypeScript, React, test, HTML, or CSS specialist.
---

# ChrisAI Coding Router

Use this family router for ChrisAI coding work. Choose exactly one coding
specialist unless the task crosses a real boundary.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-coding-engineering` when the task is mainly about architecture,
  abstractions, runtime boundaries, framework or library design, plugin or
  adapter structure, API ergonomics, or deciding whether to simplify, refactor,
  or replace an existing design before language-specific code-shape details
  matter.
- Use `chrisai-coding-js` for JavaScript implementation or refactors outside
  React and outside test-specific work, including `.js`, `.mjs`, and `.cjs`.
- Use `chrisai-coding-ts` for TypeScript implementation or refactors outside
  React and outside test-specific work.
- Use `chrisai-coding-ts-logic-review` for review-first TypeScript work where
  the task is mainly about complex branching, decision logic, branch coverage
  gaps, duplicated rules, mutation risk, or refactor opportunities before
  applying changes.
- Use `chrisai-coding-ts-react` for TSX components, React hooks, and React UI
  code.
- Use `chrisai-coding-ts-tests` for Jest, Mocha, Chai, or test-coverage work
  around TypeScript code.
- Use `chrisai-coding-html-css` for plain HTML and CSS in static sites, docs
  pages, and frontend templates.

## Sequencing

When the task is code creation or substantive code edits, route coding work in
two or three passes:

1. if the task is primarily architectural, use `chrisai-coding-engineering`
   first to frame the structure and tradeoffs
2. use the narrowest implementation specialist to get the behavior working
3. run that same implementation specialist again as a final style pass before
   work complete

The engineering pass should shape the design, not duplicate syntax or
formatting rules from the implementation specialist.

The final implementation-style pass should normalize comments, JSDoc coverage,
section comments, formatting, and repo-style structure without derailing
already-correct logic. Do not skip the final pass just because the code already
works.

## Decision Rules

- If the request is mainly about core design, abstraction boundaries, runtime
  fit, framework or library shape, plugin or adapter structure, or refactor
  versus rewrite judgment, prefer `chrisai-coding-engineering` first.
- If the request is non-React JavaScript, prefer `chrisai-coding-js` and let
  that skill decide the right `.js`, `.mjs`, or `.cjs` handling after local
  runtime discovery.
- If the request is a TypeScript logic review before code changes, prefer
  `chrisai-coding-ts-logic-review` over implementation or test-writing
  specialists.
- If the request mixes React code and tests, pick the side that owns the asked
  deliverable. A new test suite belongs to `chrisai-coding-ts-tests`.
- If the request is code creation or a substantial code edit, apply the chosen
  implementation specialist again at the end as a style pass.
