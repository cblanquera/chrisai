# Browser Feedback Loop

Use this reference when a task shows a draft, prototype, rendered page, local
app, screenshot, recording, or other reviewable artifact in the in-app browser.

## Definition

A round is one feedback cycle inside a phase:

1. show the user a browser-visible artifact
2. tell the user what to review
3. the user gives feedback
4. revise based on that feedback
5. repeat until that phase is approved

Each phase may have many rounds before it is approved.

Round approval is not the same as phase approval. If the user approves one
round, advance to the exact next step stated for that round. Do not advance to
an unstated next step.

If the stated next step is another round in the same phase, continue there. If
the stated next step is the next phase, continue only when the full current
phase scope is complete.

## Required Round Summary

After every browser-visible round, state:

- what changed
- what the user should review now, phrased as specific questions
- what feedback would be most useful
- what happens next if this round is approved
- whether more rounds remain before the next phase
- what happens next if revisions are needed

The user should be able to approve the round and have the agent move to exactly
the stated next step without asking again.

## Review Questions

Prefer concrete, answerable questions over generic review requests. Questions
should refer to the actual pages, screens, sections, states, flow decisions,
visual decisions, interactions, screenshots, recordings, or browser-visible
behavior changed in that round.

Good review questions:

- Does the revised navigation model match how users should move through these
  pages?
- Is this the right page set for the first browser review round, or is a
  screen missing?
- Does the primary action land in the right section?
- Does the desktop article structure still work after separating the pages?
- Should this state get its own screen, or is it enough as a section inside
  the existing screen?
- Does the simulated interaction communicate the intended behavior clearly?

Avoid vague review prompts:

- Thoughts?
- Does this look good?
- Please review the draft.

## Artifact Rules

Major round changes should create a new draft or artifact folder when files
are generated. Major changes include new layout directions, changed navigation
models, added screens, removed screens, substantial section reordering, new
visual directions, major component treatment changes, or a materially different
interactive flow.

Minor changes inside the same review round may update the current folder.
Minor changes include copy labels, small spacing adjustments, color token
tweaks, local section changes, and small state clarifications.

When QA screenshots, recordings, or notes are produced for the round, keep them
with the artifact being reviewed unless the owning domain skill says otherwise.

## Browser Safety

If the in-app browser is unavailable, say so and provide the review target as a
URL or file path. Do not claim a browser review happened.

If the browser shows a blank page, load error, missing asset, or broken
interaction, report that as the current round status before asking for
approval.

If behavior is simulated, say what is simulated. Do not imply that simulated
behavior is production behavior.

## Phase Safety

Do not say "next step: implementation" unless the full design, draft, or
prototype phase is complete and the previous round explicitly stated that
implementation was next.

Do not say "next step: creative design" unless the full wireframe phase is
complete. If approval only unlocks the next sample set, state that instead.

Do not advance from browser-visible review into production implementation
unless the agent explicitly stated that as the next step and the current phase
scope is complete.
