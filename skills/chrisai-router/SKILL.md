---
name: chrisai-router
description: Use when a task should be handled with the ChrisAI skill family and an agent needs to choose the correct family router for documentation, coding, prompt, planning, process, design, browser-QA, or maintenance work.
---

# ChrisAI Router

This skill is the canonical ChrisAI entry router.

Use it to decide whether a task belongs to the ChrisAI documentation, coding,
prompt, planning, process, design, browser-QA, or maintenance family. Then hand
the work to the narrowest matching family router or specialist.

Do not duplicate family-router or specialist instructions here. Route, then
defer.

## Routing Model

- `chrisai-router` may auto-route to ChrisAI family routers and standalone
  specialist skills.
- Family routers may auto-route to specialist skills in their own family.
- Specialist skills may be invoked directly by a human user.
- Specialist skills must not auto-route to sibling skills.
- Separate non-router categories may exist outside the ChrisAI docs, coding,
  prompt, planning, process, design, QA, and maintenance families.
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
- Do not force family routers or specialist skills to repeat this lookup unless
  they are invoked directly and runtime resolution is actually needed.

## Family Routes

Choose the narrowest family route that fully owns the task.

- Use `chrisai-coding` for architecture, implementation, refactoring,
  code-review, TypeScript, JavaScript, React, test, HTML, or CSS work.
- Use `chrisai-design` for creative direction, design-system extraction,
  wireframes, design drafts, logos, and concrete visual asset production.
- Use `chrisai-docs` for developer documentation, API references, onboarding
  guides, tutorials, markdown structure, and copy-editing.
- Use `chrisai-prompt` for prompt artifacts, Markdown-to-HTML conversion, and
  prior-conversation context caching, chunking, indexing, or retrieval.
- Use `chrisai-planning` for AI-readable agent specs, legacy greenfield
  planning corpuses, readiness review, MVP freeze, or implementation backlog
  generation before coding begins.
- Use `chrisai-process` for staged feedback loops, durable agent-progress banks,
  progress logs, decisions, handoffs, and optional separate-session
  coordination.
- Use `chrisai-qa-playwright` directly when the deliverable is browser QA,
  localhost preview detection, Playwright screenshots, video recordings, or
  responsive checks for local web projects.
- Use `chrisai-update` directly when the user explicitly asks to update,
  upgrade, pull, install, or sync ChrisAI skills.
- Use `chrisai-doctor` directly when the user explicitly asks to diagnose,
  inspect, verify, or troubleshoot a ChrisAI installation, version, repository
  checkout, skill sync, or adapter state.

## Combination Rules

- Add `chrisai-process-feedback-loop` through `chrisai-process` when the task
  shows a draft, prototype, rendered page, local app, screenshot, recording, or
  other reviewable artifact and expects approval or revision feedback.
- Add `chrisai-process-agent-progress` through `chrisai-process` when the task is
  large enough to need work packets, durable decisions, progress logs,
  handoffs, or possible separate-session coordination.
- Prefer `chrisai-planning` over `chrisai-process-agent-progress` when the
  deliverable is durable planning/specification state, readiness review, or
  backlog generation. Existing implementation work, migrations, and active
  execution tracking should use process and coding routes instead.
- Prefer `chrisai-qa-playwright` over coding or design routes when the primary
  deliverable is rendered browser verification rather than creation.
- If the request crosses families, choose the family that owns the user's
  requested deliverable first, then add the smallest supporting route needed.
- If the request needs concrete local runtime or executable paths, consult
  `local-environment` first when it exists.
- If the request is outside the ChrisAI scope, do not force ChrisAI routing.

## Review Gate

Do not consider routing complete unless the answer to all of these is yes:

- Is this task actually a ChrisAI task?
- Was the correct family router or standalone specialist chosen?
- Did the selected route match the user's real deliverable?
- Was the narrowest applicable specialist chosen after family routing?
- Was any multi-skill sequence justified instead of automatic?
