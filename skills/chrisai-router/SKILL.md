---
name: chrisai-router
description: Use when a task should be handled with the ChrisAI skill family and an agent needs to choose the narrowest documentation, coding, browser-QA, process, design, or artifact specialist without relying on legacy routers.
---

# ChrisAI Router

This skill is the canonical ChrisAI router.

Use it to decide whether a task belongs to the ChrisAI documentation, coding,
QA, process, design, or artifact skill family, then hand the work to the
narrowest matching specialist skill.

Do not duplicate specialist instructions here. Route, then defer.

## Routing Model

- `chrisai-router` may auto-route to ChrisAI specialist skills.
- Specialist skills may be invoked directly by a human user.
- Specialist skills must not auto-route to sibling skills.
- Separate non-router categories may exist outside the ChrisAI docs, coding,
  QA, process, design, and artifact family.
- Do not reference or rely on deprecated intermediate routers.
- `chrisai-router` is the only shared ChrisAI skill that may actively consult
  a machine-local `local-environment` overlay.

## Local Environment Overlay

Use `local-environment` only as an optional machine-local override layer for
runtime and executable resolution.

- Before running terminal commands, look for `local-environment` when the task
  likely depends on host-specific executables, runtime paths, package managers,
  browser tooling, or similar machine-local details.
- If `local-environment` exists, use it to prefer the local machine's intended
  executable paths or verification commands.
- If command resolution is failing or the right executable is unclear, check
  `local-environment` first when it exists.
- If command resolution is failing and `local-environment` does not exist,
  recommend setting it up from `templates/local-environment/SKILL.md`.
- If a command or executable path is resolved and used successfully during the
  task, offer to record it in `local-environment` for next time.
- Do not update `local-environment` without explicit user approval unless the
  user directly asked to record the discovered command.
- Do not record secrets, credentials, tokens, private URLs, or one-off
  temporary commands in `local-environment`.
- Do not consult `local-environment` for pure documentation, conceptual, or
  routing-only work.
- Do not force specialist skills to repeat this lookup unless they are invoked
  directly and runtime resolution is actually needed.

## Documentation Routes

Choose exactly one documentation specialist unless the task clearly needs a
deliberate sequence.

- Use `chrisai-docs-dev-api-reference` for API pages, module/class/function
  reference docs, config docs, and lookup-oriented examples.
- Use `chrisai-docs-dev-onboarding` for quick starts, tutorials, conceptual
  guides, and junior-developer-first learning flows.
- Use `chrisai-docs-copy-editing` for proofreading, wording cleanup, clarity
  improvement, tone consistency, and prose simplification without changing
  technical meaning.
- Use `chrisai-docs-dev-formatting` for markdown normalization, structure
  cleanup, outline numbering, TOC decisions, and style-guide conformance after
  the document type is already understood.

Only chain documentation specialists when there is a clear owner plus a clear
follow-up:

1. content owner first
2. copy editing second when the prose needs an editorial pass
3. formatting last if the output still needs structure cleanup

Do not default to multi-skill documentation sequences.

## Coding Routes

Choose exactly one coding specialist unless the task crosses a real boundary.

- Use `chrisai-coding-engineering` when the task is mainly about
  architecture, abstractions, runtime boundaries, framework or library design,
  plugin or adapter structure, API ergonomics, or deciding whether to
  simplify, refactor, or replace an existing design before language-specific
  code-shape details matter.
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

## Coding Pass Sequencing

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
already-correct logic. Do not skip the final pass just because the code
already works.

## QA Routes

Choose `chrisai-qa-playwright` when the deliverable is browser QA rather than
feature implementation.

- Use `chrisai-qa-playwright` for browser QA, Playwright screenshots, video
  recordings, and localhost responsive checks for local web projects.
- Use `chrisai-qa-playwright` after design wireframes or design drafts when the
  draft needs rendered browser verification, screenshots, responsive checks, or
  clickable-flow smoke testing; keep artifacts in the draft folder's `qa/`
  directory.
- Do not route generic coding work there.
- Do not route explicit manual `@browser` inspection there unless the request
  is clearly about QA or capture through the ChrisAI flow.

## Process Routes

Use `chrisai-process-feedback-loop` with the owning domain skill when the task
shows a draft, prototype, rendered page, local app, screenshot, recording, or
other reviewable artifact in the in-app browser and the user is expected to
approve, reject, or revise what they see.

- Use it for staged browser review, concrete review questions, round approval,
  phase approval, and exact next-step language.
- Do not use it by itself to create the artifact.
- Do not use it instead of `chrisai-qa-playwright` when the primary deliverable
  is QA, screenshots, recordings, or responsive browser verification.

Use `chrisai-process-task-bank` with the owning domain skill when the task is
large enough to need filesystem-backed work packets, durable decisions,
progress logs, handoffs, or optional delegation across separate chat sessions
while keeping each worker context small.

- Use it for large artifact-production, multi-item implementation, broad
  migrations, or long-running tasks that may drift or span sessions.
- Do not use it for small tasks that fit cleanly in the active chat.
- Do not let it replace the domain skill that owns the actual work.
- When separate sessions may help, ask the user before spawning or delegating.

Use `chrisai-prompt-cache` when the task is about preserving, indexing,
chunking, retrieving, or handing off context from a prior conversation without
loading the full transcript.

- Use it for repo-local prompt caches, conversation archives, semantic topic
  chunks, decision/evidence indexes, and future-session retrieval workflows.
- Use it when the user wants explicit, inspectable conversation references
  that complement Codex Memories.
- Do not use it for required repo guidance that belongs in `AGENTS.md`.
- Do not use it for active multi-item execution state that belongs in
  `chrisai-process-task-bank`.
- Do not use it for private automatic personal recall that Codex Memories can
  handle better.

## Design Routes

Choose exactly one design specialist unless the task clearly needs a deliberate
sequence.

- Use `chrisai-design-creative` for coordinated creative direction,
  visual-system definition, homepage composition, brand adaptation, mode
  selection, and design handoff across multiple design specialists.
- Use `chrisai-design-system-extraction` for inspecting existing apps, sites,
  Figma files, design systems, component libraries, screenshots, exported
  design files, or local project theme sources to extract design rules before
  extending a product.
- Use `chrisai-design-wireframes` for grayscale low-fidelity wireframes and
  clickable grayscale wireframe drafts.
- Use `chrisai-design-drafts` for static HTML/CSS/JS design-review artifacts,
  clickable creative design drafts, and polished mockups based on an approved
  wireframe and visual direction.
- Use `chrisai-design-logo-generator` for logo ideation, SVG-first logo marks,
  concept variation, and favicon-safe logo refinement.
- Use `chrisai-design-asset-formats` for SVG, PNG, and ICO asset creation,
  conversion, transparency validation, temporary SVG prompt artifacts, and
  favicon packaging.

Only chain design specialists when there is a clear owner plus a clear
follow-up:

1. use `chrisai-design-creative` first when the visual direction is still open
2. use `chrisai-design-system-extraction` when existing product rules must be
   extracted before new design work
3. use `chrisai-design-wireframes` when the structure must be approved before
   visual design
4. use `chrisai-design-drafts` when a static review artifact is needed from an
   approved structure and direction
5. use `chrisai-design-logo-generator` when the task is specifically about logo
   concepts or logo mark refinement
6. use `chrisai-design-asset-formats` when the work moves into concrete asset
   production or conversion

Do not default to multi-skill design sequences.

## Artifact Routes

Choose exactly one artifact specialist unless the task clearly needs a
deliberate sequence.

- Use `chrisai-prompt-md-to-html` when a Markdown or Codex text response should
  be converted into a deterministic single-file HTML artifact with a fixed
  layout, optional validated theme colors, syntax highlighting, Mermaid
  support, and safe fallbacks.

Do not route production websites, frontend implementation, or open-ended design
drafts to `chrisai-prompt-md-to-html`.

## Out Of Scope

Do not route work here when the main deliverable belongs to a separate skill
category rather than the ChrisAI docs, coding, QA, design, or artifact family.

## Decision Rules

- Prefer the narrowest specialist that fully owns the task.
- Do not invoke a broader skill when a more specific one clearly matches.
- If the request mixes onboarding and reference, choose the primary user goal
  first; only add formatting later if needed.
- If the request is mainly about proofreading, clarity, transitions, or tone
  rather than document ownership, prefer `chrisai-docs-copy-editing`.
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
- If the request is about rendered browser behavior, screenshots, or recorded
  flows, prefer `chrisai-qa-playwright` over coding specialists.
- If the request shows a reviewable artifact in the in-app browser and expects
  approval or revision feedback, add `chrisai-process-feedback-loop` to the
  owning domain skill.
- If the request is a large multi-item task that needs durable work packets,
  progress logs, decisions, handoffs, or possible separate-session
  coordination, add `chrisai-process-task-bank` to the owning domain skill.
- If the request is about caching, archiving, chunking, indexing, retrieving,
  or handoff of prior conversation context, prefer `chrisai-prompt-cache`.
- If the request is mainly about creative direction, visual-system work, or
  homepage composition, prefer `chrisai-design-creative`.
- If the request is mainly about extracting rules from an existing design
  source of truth, prefer `chrisai-design-system-extraction`.
- If the request is mainly about grayscale wireframes or clickable grayscale
  wireframes, prefer `chrisai-design-wireframes`.
- If the request is mainly about static design-review artifacts, clickable
  creative drafts, or mockups from approved structure and direction, prefer
  `chrisai-design-drafts`.
- If the request is mainly about logo creation, logo mark iteration, or
  favicon-safe logo simplification, prefer `chrisai-design-logo-generator`.
- If the request is mainly about creating, converting, validating, or packaging
  SVG, PNG, or ICO assets, prefer `chrisai-design-asset-formats`.
- If the request is mainly about converting a Markdown or Codex text response
  into a deterministic single-file HTML artifact, prefer
  `chrisai-prompt-md-to-html`.
- If the request needs concrete local runtime or executable paths, consult
  `local-environment` first when it exists.
- If the request is outside the ChrisAI scope, do not force ChrisAI routing.

## Review Gate

Do not consider routing complete unless the answer to all of these is yes:

- Is this task actually a ChrisAI task?
- Did the selected skill match the user's real deliverable?
- Was the narrowest applicable specialist chosen?
- Was any multi-skill sequence justified instead of automatic?
