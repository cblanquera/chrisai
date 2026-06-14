# Ad Hoc Workflow

Use this workflow for unplanned requests that arrive during setup, MVP,
post-MVP, progress, or release work.

## Classification

- `tiny`: fits in one chat and carries no durable product meaning
- `durable`: adds or changes a requirement, acceptance criterion, decision,
  risk, workflow, or release expectation
- `active-progress`: belongs to a current progress item or batch
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
5. For `conflicting` work, record a question or decision before implementing.
6. For `emergency` work, make the minimum safe fix, then record follow-up
   evidence, risks, or tasks.

## Stop Conditions

- ad hoc work did not become hidden product truth
- records or progress state reflect durable changes
- conflicts are resolved or explicitly blocked

