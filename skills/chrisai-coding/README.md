# ChrisAI Coding

ChrisAI Coding is the existing-code skill for JavaScript, TypeScript, React
TSX, TypeScript tests, HTML, and CSS. Use it when code already exists and the
request is to audit it, recommend improvements, or make a focused fix.

This skill is not for greenfield code generation. It is intentionally scoped to
reviewing and improving code that is already in the repository.

## When This Skill Activates

### JavaScript Code Audit Or Fix

Use this skill when the request is about existing `.js`, `.mjs`, or `.cjs`
files.

What happens:

- The agent inspects the touched JavaScript and nearby local patterns.
- The agent checks module shape, imports or requires, exports, comments, JSDoc,
  class/function organization, and runtime hygiene.
- If the user asked for recommendations, the agent reports findings first.
- If the user asked for a fix or approves recommendations, the agent makes the
  narrowest safe change and runs relevant validation when available.

Primary workflow: `workflows/javascript.md`

### TypeScript Code Audit Or Fix

Use this skill when the request is about existing non-React TypeScript.

What happens:

- The agent inspects the current module, adjacent conventions, and public
  boundaries before changing code.
- The agent checks imports, exports, typing, classes, overloads, comments,
  formatting, and file organization.
- The agent preserves local conventions unless they conflict with the requested
  fix or make the code harder to maintain.
- If approved to edit, the agent applies the smallest focused fix and validates
  with the project’s available commands when practical.

Primary workflow: `workflows/typescript.md`

### TypeScript Logic Review

Use this skill when the request asks for a review-first pass over existing
TypeScript logic, branching, duplicated decisions, risky mutation, hard-to-follow
flows, or missing branch coverage.

What happens:

- The agent reads the relevant logic before editing.
- The agent looks for complexity, branch risk, duplicated rules, mutation risk,
  edge cases, and missing tests.
- The agent reports findings with concrete file references.
- The agent does not edit during the initial review pass.
- If the user approves fixes, the agent routes to the TypeScript or test
  workflow as needed.

Primary workflow: `workflows/typescript-logic-review.md`

### React TSX Audit Or Fix

Use this skill when the request is about existing React TSX components, hooks,
forms, prop/event typing, JSX structure, or React frontend organization.

What happens:

- The agent inspects the touched component and nearby React conventions.
- The agent checks component boundaries, hooks, state, form behavior, props,
  events, JSX readability, comments, and file organization.
- The agent uses React-specific references only when the task needs deeper form,
  component, or rendering guidance.
- If approved to edit, the agent makes focused changes without rewriting the
  frontend structure unless the user asked for that.

Primary workflow: `workflows/react-tsx.md`

### TypeScript Test Audit Or Fix

Use this skill when the request is about existing Jest, Mocha, Chai, React
component tests, test repair, flaky tests, or coverage gaps around existing
behavior.

What happens:

- The agent inspects the local test framework and nearby test style.
- The agent checks whether tests target public behavior, cover important
  branches, avoid tautological assertions, and follow local setup patterns.
- The agent recommends where missing existing-behavior coverage should live
  when the right test level is unclear.
- If approved to edit, the agent repairs or adds the smallest meaningful test
  coverage for existing behavior.

Primary workflow: `workflows/typescript-tests.md`

### HTML And CSS Audit Or Fix

Use this skill when the request is about existing vanilla HTML or CSS in static
sites, documentation pages, frontend templates, or local UI surfaces.

What happens:

- The agent inspects the existing markup, styles, and local sectioning or naming
  patterns.
- The agent checks semantic structure, content hierarchy, selector ownership,
  responsive behavior, comments, and stylesheet organization.
- The agent preserves local visual and naming conventions when they are coherent.
- If approved to edit, the agent makes focused changes and avoids unrelated
  redesign work.

Primary workflow: `workflows/html-css.md`

### Maintainability Audit

Use this skill when the user explicitly asks to review code structure,
maintainability, organization, separation of responsibilities, or code that
looks stuffed into one file.

What happens:

- The agent treats the pass as review-only.
- The agent inspects the requested file, feature, entity, model, domain, route,
  component, or workflow.
- The agent identifies code that is hard to locate, too concentrated in one
  file, scattered across surprising places, or grouped in a way that creates
  tedious mental mapping.
- The agent recommends concrete organization changes, such as moving behavior
  closer to a centered feature, entity, model, or domain.
- The agent stops before editing.
- If the user approves the recommendations, the agent re-reads the current files
  and applies the approved restructuring in a separate pass.

Primary workflow: `workflows/maintainability-audit.md`

## Internal References

The workflow files use references for specific standards:

- `references/javascript-commenting-style.md`: JavaScript comment rules
- `references/javascript-formatting-basics.md`: JavaScript formatting basics
- `references/javascript-jsdoc-and-declaration-comments.md`: JavaScript JSDoc
  and declaration comments
- `references/javascript-module-design.md`: JavaScript module boundaries
- `references/javascript-module-systems.md`: JavaScript module system choices
- `references/typescript-commenting-style.md`: TypeScript comment rules
- `references/typescript-formatting-basics.md`: TypeScript formatting basics
- `references/typescript-jsdoc-and-declaration-comments.md`: TypeScript JSDoc
  and declaration comments
- `references/typescript-module-design.md`: TypeScript module boundaries
- `references/typescript-style-details.md`: TypeScript style details
- `references/typescript-logic-review-signals.md`: TypeScript logic review
  signals
- `references/react-commenting-style.md`: React comment rules
- `references/react-forms.md`: React form patterns
- `references/react-jsdoc-and-declaration-comments.md`: React JSDoc and
  declaration comments
- `references/react-modern-react.md`: modern React guidance
- `references/react-file-outline.md`: React file outline guidance
- `references/react-section-comments.md`: React section comments
- `references/typescript-tests-commenting-style.md`: TypeScript test comments
- `references/typescript-tests-jest.md`: Jest guidance
- `references/typescript-tests-mocha-chai.md`: Mocha and Chai guidance
- `references/typescript-tests-test-selection.md`: test level selection
- `references/typescript-tests-test-style-pass.md`: final test style pass
- `references/html-css-css-style-details.md`: CSS details
- `references/html-css-html-style-details.md`: HTML details
- `references/maintainability-audit-signals.md`: maintainability audit signals

## What This Skill Does Not Do

This skill does not own greenfield app generation, broad architecture design, or
feature creation from scratch. It can review and improve existing code after a
first implementation pass, but it should not slow down normal implementation by
running every workflow automatically.

The maintainability audit is opt-in. It should run only when the user explicitly
asks for structure, organization, responsibility-separation, or maintainability
recommendations.
