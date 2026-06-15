# Ad Hoc Workflow

Use this workflow for unplanned requests that arrive during setup, MVP,
feature development, progress, or release work.

## Classification

- `tiny`: fits in one chat and carries no durable product meaning
- `durable`: adds or changes a requirement, acceptance criterion, decision,
  risk, workflow, or release expectation
- `active-progress`: belongs to a current progress item or batch
- `feedback`: user review feedback about current output, implementation,
  wireframe, creative, or QA result
- `conflicting`: contradicts existing scope, acceptance, decision, or risk
- `emergency`: needs a minimal safe fix before full planning

## Process

1. Classify the request.
2. For `tiny` work, do it directly and record progress only if a progress bank
   is active.
3. For `durable` work, promote the durable fact into records before or during
   implementation.
4. For `active-progress`, attach it to the current item only if it truly belongs
   there; otherwise create a new item or batch.
5. For `feedback`, route to validation or planner reconciliation before
   implementation unless the evidence is already explicit in project artifacts.
6. For `conflicting` work, record a question or decision before implementing.
7. If the user prompt identifies a new feature goal, record or reconcile it in
   `.agents/plans/feature-goals.md` before routing it to an existing spec, new
   sibling spec, or active progress.
8. For `emergency` work, make the minimum safe fix, then record follow-up
   evidence, risks, or tasks.

## Stop Conditions

- ad hoc work did not become hidden product truth
- new feature goals from the prompt are captured in `.agents/plans/feature-goals.md`
- feedback was routed to validation, planner reconciliation, progress, or batch
  work instead of becoming hidden implementation scope
- records or progress state reflect durable changes
- conflicts are resolved or explicitly blocked
