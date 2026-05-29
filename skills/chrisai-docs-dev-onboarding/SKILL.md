---
name: chrisai-docs-dev-onboarding
description: Use when creating or restructuring developer-facing onboarding documentation for junior developers, especially quick starts, tutorials, getting-started guides, and conceptual docs that should lead to first success with low friction.
---

# ChrisAI Docs Dev Onboarding

This skill is the editorial standard for onboarding-oriented developer
documentation aimed at junior developers.

Its job is to make the first experience obvious, fast, and low-friction. Do
not write docs as a knowledge dump. Optimize for successful onboarding first.

This standard combines:

- a Diataxis-like separation of tutorial, how-to, explanation, and reference
- progressive disclosure
- very clear, concise documentation that gets to first success quickly

## Task Intake

Before drafting or restructuring, identify:

1. who the reader is
2. whether they are evaluating, trying, learning, or returning
3. the first visible success the page should create
4. what content is really reference material and should move out of the main
   flow
5. whether the result should be one page, a short guide set, or a landing page
   with follow-up links

If the request is mainly API lookup content, switch to
`chrisai-docs-dev-api-reference`. If the flow is already sound and the task is
mostly cleanup, apply `chrisai-docs-dev-formatting` after the content plan is
settled.

## Scope

Use this skill for:

- onboarding guides
- quick starts
- tutorials
- conceptual explanations
- restructuring developer docs for clarity and adoption

Do not use this skill as the primary rule set for API reference schema design
or markdown normalization.

For those cases, use:

- `chrisai-docs-dev-formatting`
- `chrisai-docs-dev-api-reference`

## Priority

When this skill is used with other documentation skills:

1. `chrisai-docs-dev-onboarding` decides what content appears, in what order,
   and for which reader state.
2. `chrisai-docs-dev-api-reference` decides the structure of pure API
   reference pages.
3. `chrisai-docs-dev-formatting` standardizes presentation without overriding
   the intended reader flow.

Do not force onboarding patterns onto pure API reference pages. Do not let
formatting rules override first-success sequencing.

## Non-Negotiable Rules

- Prioritize time to first success over feature completeness.
- Reduce cognitive load at every step.
- Introduce concepts only when the reader needs them.
- Keep onboarding, explanation, and reference separate.
- Prefer one recommended path before presenting alternatives.
- Use clear, concise language.
- Remove anything that does not help the reader act or understand.

If the user asks for documentation that mixes tutorial, concept, and reference
content into a single dense page, restructure it unless they explicitly
require the mixed format.

## Editorial Model

Assume the reader is in one of four states:

1. Evaluating: "What is this and why would I use it?"
2. Trying: "Show me the fastest way to make it work."
3. Learning: "Explain how this system works."
4. Returning: "I need a specific detail now."

Write so the reader can move from one state to the next without being forced
to absorb later-stage detail too early.

## Default Reader Flow

Unless the user explicitly requests another structure, organize onboarding docs
in this sequence:

1. `Start here`
2. `Quick start`
3. `What just happened`
4. `Core concepts`
5. `Common tasks`
6. `Next steps`
7. `Reference`

If the deliverable is only one page, compress this structure but preserve the
sequence.

## Section Standard

- `Start here` must answer what this is, who it is for, and what the reader
  will accomplish next.
- `Quick start` must be the shortest realistic path to a visible success
  state.
- `What just happened` must convert the quick start into understanding.
- `Core concepts` must explain the mental model after the reader has a concrete
  anchor.
- `Common tasks` must be organized by user intent, not implementation detail.
- `Next steps` must point to the most likely follow-up actions.
- `Reference` must stay lookup-oriented and not take over the page.

## Writing Standard

- Lead with outcomes before internals.
- Use short sections and descriptive headings.
- Introduce one new idea at a time.
- Prefer concrete examples over abstraction.
- Prefer simple sentences over clever sentences.
- Prefer active voice.
- Use jargon only when necessary, and define it at first use.
- State tradeoffs only when the decision matters now.

## Compression Standard

AI tends to over-explain. Do not do that.

Before finalizing, cut:

- repeated explanation
- throat-clearing introductions
- feature tours on onboarding pages
- optional branches that do not matter yet
- background that does not help the next action

If a paragraph does not help the reader do something, verify something, or
understand a current concept, remove it.

## Decision Rules

When there is tension between completeness and usability:

1. Choose usability for the first page.
2. Move extra detail to a later section.
3. Keep the main path intact.

When there is tension between explaining and doing:

1. Let the reader succeed first.
2. Explain immediately after success.

When there is tension between many valid paths:

1. Recommend one path.
2. Mention alternatives briefly.
3. Move full comparison later.

## Restructuring Existing Docs

When rewriting existing documentation:

1. Identify the current first page for a new developer.
2. Remove or relocate content that blocks first success.
3. Create a shorter happy-path quick start.
4. Separate explanation from tutorial flow.
5. Separate tasks from reference.
6. Verify that each page serves one reader stage well.

## Deliverables

A good output usually includes:

- one clear first page or entry point
- one happy-path quick start with a verification step
- explanation sections that follow success instead of blocking it
- task-oriented follow-up sections or separate pages when needed
- explicit links to reference material instead of embedding all details inline

## Anti-Patterns

Do not:

- start with architecture before the reader has done anything
- explain every feature before showing one useful outcome
- present many installation variants on the first page
- mix onboarding with advanced operations
- mix tutorial content with exhaustive reference
- use completeness as an excuse for poor sequencing

## Review Gate

Do not consider the output complete unless the answer to all of these is yes:

- Does the page create a clear first success?
- Is the order optimized for a junior developer?
- Was dense reference material kept out of the early flow?
- Are follow-up tasks and next steps easy to find?
- Did the page avoid becoming a feature dump?

## Output Defaults

Default deliverables should be one of:

- a docs outline with section summaries
- a rewritten onboarding page
- a quick start followed by explanation
- a reorganization plan split into tutorial, tasks, explanation, and reference

If the user asks for only one page, still preserve this internal order:

1. orientation
2. fast success path
3. explanation
4. next steps
