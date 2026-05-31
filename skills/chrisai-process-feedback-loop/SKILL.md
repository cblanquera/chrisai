---
name: chrisai-process-feedback-loop
description: Use when an agent shows a draft, prototype, rendered page, local app, screenshot, recording, or other reviewable artifact in the in-app browser and needs a staged feedback loop with concrete review questions, round approval, phase approval, and exact next-step language.
---

# ChrisAI Process Feedback Loop

Use this skill when a task involves showing a reviewable artifact in the
in-app browser and the user is expected to approve, reject, or revise what
they see.

The loop is about process control. It does not replace the domain skill that
creates the artifact.

## Ownership

This skill owns:

- browser-visible review rounds
- round approval versus phase approval
- concrete review questions
- exact next-step language after approval
- revision paths after feedback
- review artifact versioning rules

This skill does not own:

- creative direction
- wireframe, design, or implementation decisions
- browser QA execution
- Playwright setup, screenshots, or recordings
- production readiness claims

Use the domain skill for the work being shown. Use
[`chrisai-qa-playwright`](../chrisai-qa-playwright/SKILL.md) when the task
needs rendered QA, screenshots, recordings, responsive checks, or localhost
preview detection.

## Workflow

Work through these steps when a browser-visible artifact is part of the task:

1. identify the current phase
2. create or update the artifact through the owning domain skill
3. show or verify the artifact in the in-app browser when available
4. summarize the current round
5. ask concrete review questions
6. state exactly what approval unlocks
7. revise or advance only according to the stated next step

Read [browser-feedback-loop](references/browser-feedback-loop.md) for the
shared round protocol, review summary format, and artifact versioning rules.

## Browser Plugin Guidance

When the in-app browser plugin is available, use it for browser-visible review
instead of asking the user to open the page manually.

If the plugin is not available in the current session, state that the in-app
browser plugin is not active and give the user the local URL or file path that
needs review. Do not pretend the artifact was shown in the browser.

To make the plugin easier to remember, user-facing ChrisAI prompts and skill
descriptions should mention "in-app browser" directly when browser review is a
required part of the workflow. In Codex, explicit phrasing such as "open this
in the in-app browser" or "use @browser" is the most reliable activation
signal.

Do not add Codex-only browser requirements to portable workflow language
unless the behavior genuinely differs by adapter.

## Review Gate

Before treating a browser-visible round as ready for user approval, confirm:

- the current artifact or URL was identified
- browser access succeeded, or the browser-plugin blocker was stated
- the current phase was named
- the user was told what changed
- review questions are concrete and tied to the visible artifact
- approval unlocks one exact next step
- revision feedback has a clear path
- round approval is not being treated as phase approval unless the full phase
  scope is complete
