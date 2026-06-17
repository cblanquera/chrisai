# Feedback Loop

Use this workflow when a task involves showing a reviewable artifact in the
in-app browser and the user is expected to approve, reject, or revise what
they see.

The loop is about process control. It does not replace the design workflow or
external capability that creates the artifact.

## Ownership

This workflow owns:

- browser-visible review rounds
- review-round approval versus phase approval
- revision folder decisions for major versus minor changes
- concrete review questions
- exact next-step language after approval
- revision paths after annotation-based, ad hoc, or chat feedback
- review artifact versioning rules

This workflow does not own:

- creative direction
- wireframe, design, or implementation decisions
- production QA ownership
- browser plugin setup
- production readiness claims

Use the design workflow or external capability for the work being shown. Use
the Browser plugin when available for local preview inspection, rendered
checks, screenshots, clicking, typing, and visible artifact review. If the
Browser plugin is unavailable, provide the local URL or file path and state
that browser review was not performed.

## Workflow

Work through these steps when a browser-visible artifact is part of the task:

1. identify the current phase
2. create or update the artifact through the owning domain skill
3. show or verify the artifact in the in-app browser when available
4. name the current phase, review round, and revision folder when files exist
5. summarize the current review round using the required review format
6. ask concrete review questions
7. state exactly what approval unlocks
8. revise or advance only according to the stated next step

Treat annotations, screenshot comments, direct notes, ad hoc requests, and chat
feedback as review feedback. Apply the feedback through the owning design
workflow, decide whether it is a major revision or minor update, then run the
feedback loop again until the relevant phase is approved.

Read [browser-feedback-loop](../references/browser-feedback-loop.md) for the
shared round protocol, review summary format, and artifact versioning rules.

## Required Response Shape

When presenting a browser-visible round for review, use the structured review
format from `browser-feedback-loop`. Keep the response easy to scan:

- start with the phase, review round, and revision status
- show the review target on its own line when there is a URL, file, screenshot,
  recording, or artifact name
- use grouped sections for what changed, verification, review questions, and
  approval path
- use bullets for changed items, verification items, and review questions
- state the approval path in one final sentence or short paragraph

Do not compress the round into one paragraph when there are multiple changes,
verification checks, or review questions.

## Browser Plugin Guidance

When the in-app browser plugin is available, use it for browser-visible review
instead of asking the user to open the page manually.

If the plugin is not available in the current session, state that the in-app
browser plugin is not active and give the user the local URL or file path that
needs review. Do not pretend the artifact was shown in the browser.

To make the plugin easier to remember, user-facing ChrisAI prompts and skill
descriptions should mention "in-app browser" directly when browser review is a
required part of the workflow. If the active agent exposes an in-app browser,
browser tool, or equivalent preview capability, use that capability for the
review round.

Do not add adapter-specific browser requirements to portable workflow language
unless the behavior genuinely differs by adapter.

## Review Gate

Before treating a browser-visible round as ready for user approval, confirm:

- the current artifact or URL was identified
- browser access succeeded, or the browser-plugin blocker was stated
- the current phase was named
- the user was told what changed
- the response used the required browser-review structure
- review questions are concrete and tied to the visible artifact
- approval unlocks one exact next step
- revision feedback has a clear path
- review-round approval is not being treated as phase approval unless the full
  phase scope is complete
