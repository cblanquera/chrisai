# Iterative Editing

Use this reference when the user asks to revise, refine, repair, or try again
from an existing graphic. The objective is to make the requested change while
preserving everything the user still values.

## Establish The Baseline

Treat the latest artifact that the user accepted or still considers
satisfactory as the baseline. Treat each new output as a candidate until it
passes review or the user accepts it.

- If the user rejects a candidate, return to the prior baseline for the next
  attempt.
- Do not overwrite a saved baseline by default. Save candidates
  non-destructively when files are being maintained.
- When the graphic contains a protected brand asset, keep the visual plate,
  canonical asset, and placement specification as separate baseline inputs.
  Do not use a flattened, generated approximation as the brand source.
- If several images are available, identify the edit target explicitly and
  give every other image a role such as style reference, brand reference,
  content source, or compositing input.
- Include only the images needed for the current change. Do not make the tool
  infer which prior image should be edited.

## Classify The Change

Choose the least destructive method that can satisfy the feedback:

- Use an image edit for a localized subject, object, background, lighting, or
  texture change that should preserve the larger composition.
- Use a mask or selection when the available capability supports localized
  editing and the target area is unambiguous. Treat it as guidance rather than
  proof that surrounding pixels will remain unchanged.
- Use an editable vector, diagram, slide, canvas, or code-based source for
  exact text, geometry, alignment, color replacement, crop, resize, or other
  deterministic changes.
- Create a new sibling direction from the original specification and source
  assets when the feedback materially changes composition, style, hierarchy,
  or concept. Preserve the earlier direction for comparison.

## Write A Revision Brief

Before rendering, normalize the feedback into a concise brief. It does not
need to be a separate file unless the work is project-bound or likely to
continue across several rounds.

```text
Edit target: Image 1 — current accepted baseline

Change only:
- <one requested change or one tightly coupled set of changes>

Keep unchanged:
- <subject identity, pose, and proportions>
- <composition, camera, crop, and placement>
- <palette, lighting, materials, and texture>
- <exact text, typography, brand marks, and other protected details>

Reference roles:
- Image 2: <style, brand, content, or compositing role>

Acceptance:
- <observable evidence that the requested change succeeded>
- No material regression in the protected details
```

List only invariants that matter to the current asset, but repeat every
critical invariant on every edit attempt. Do not accumulate rejected
directions or the entire conversation history into the prompt. Express the
current baseline, current change, and current constraints without
contradictions.

## Render Surgically

- Make one conceptual change at a time. Keep tightly coupled adjustments
  together only when separating them would produce an incoherent result.
- Prefer explicit edit language such as `change only X; keep Y unchanged` over
  broad requests such as `make it better`, `polish it`, or `try another`.
- Preserve the baseline's aspect ratio and dimensions unless the requested
  change requires different output geometry.
- Edit the visual plate without protected brand assets whenever practical,
  then reapply every protected asset deterministically from its canonical file.
- When repairing a failure, describe the exact defect and regenerate the
  smallest practical scope.
- Keep tool-specific parameters in the instructions for the selected runtime;
  do not hard-code one vendor's model, quality, fidelity, or masking controls
  into this portable workflow.

## Compare And Promote

Apply `visual-review.md` to the candidate and compare it directly with the
baseline. Promote the candidate only when the requested change succeeds and
the declared invariants remain materially stable.

If the candidate regresses, record the concrete failure, discard it as the
working source, and retry from the same baseline with a smaller or clearer
change. After repeated regressions, normally two targeted attempts, stop
chaining edits and choose one of these paths:

- return the baseline and explain the unresolved change
- use a more localized or deterministic editing method
- simplify or split the requested change
- create a fresh sibling candidate from the original specification and source
  assets

Do not present repeated regeneration as progress when the accepted qualities
are steadily degrading.
