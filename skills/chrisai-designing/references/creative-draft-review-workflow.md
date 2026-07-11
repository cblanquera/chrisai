# Creative Draft Review Workflow

Use this reference before presenting a creative revision or treating its phase
as ready.

This reference owns creative-specific checks. Use
[`workflows/feedback-loop.md`](../workflows/feedback-loop.md) for the shared
review response and approval process.

## Review Round

For every generated-artifact update:

1. Identify the creative phase, review round, and revision folder.
2. Confirm `specs.md` was updated before changes to creative intent.
3. Verify the rendered artifact with an available browser capability.
4. Append a revision-local `notes.md` entry.
5. Ask concrete questions tied to the spec's current review criteria.
6. State the exact next step approval unlocks.

## Notes Contract

Each entry records:

- round number, date, and label
- screens, visual system, components, assets, content, responsive behavior, or
  interaction treatment changed
- feedback or annotations applied
- checks actually completed
- what should be reviewed now
- illustrative, simulated, or deferred behavior
- open questions and exact approval path

## Readiness Gate

Confirm that:

- approved structure is preserved or an approved exception is documented
- rendered scope matches `specs.md`
- visual tokens and component treatments are consistent
- required states and responsive variants are represented
- assets and document-relative links work
- rendered UI contains no agent annotations or annotative placeholders
- simulated behavior is identified in `notes.md`
- browser checks are reported honestly
- review-round approval is not treated as phase approval unless the complete
  requested creative scope is represented
