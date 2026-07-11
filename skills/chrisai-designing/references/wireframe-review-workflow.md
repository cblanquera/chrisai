# Review Workflow

Use this reference whenever generated wireframe files are created or changed
and the user is expected to approve, reject, or revise them.

This reference owns wireframe-specific checks. After completing them, use
[`workflows/feedback-loop.md`](../workflows/feedback-loop.md) to present the
review round and control approval.

## Round Protocol

For every update:

1. Identify the wireframe phase, review-round number, and revision folder.
2. Verify the rendered artifact with an available browser capability. If none
   is available, identify the review target and state that browser verification
   was not performed.
3. Append a revision-local `notes.md` entry.
4. Present concrete questions tied to the changed screens, hierarchy,
   navigation, states, interactions, density, or responsive behavior.
5. State the one exact next step that approval unlocks and the revision path
   if changes are requested.

Treat annotations, screenshot comments, direct chat feedback, and ad hoc
requests as review feedback. Apply them as a minor update or major revision
under [Revision Workflow](wireframe-revision-workflow.md), then run another review round.

## Notes Contract

Keep one `notes.md` in each revision folder. Add one entry per artifact update
with:

- round number, date, and short label
- screens, states, layout, copy, or behavior changed
- feedback or annotations applied
- what should be reviewed now
- simulated or deferred behavior
- open questions
- exact approval path

Do not copy a prior revision's round log into a new revision. The prior folder
preserves that history.

## Review Response

Present the review target on its own line, followed by compact sections for:

- what changed
- checks actually verified
- specific review questions
- the approval path

Do not use vague prompts such as "Thoughts?" or claim browser verification that
did not occur. Review-round approval is not phase approval unless the complete
scope defined in `specs.md` is represented. If more wireframe rounds remain,
name the next round instead of advancing to creative design or implementation.
