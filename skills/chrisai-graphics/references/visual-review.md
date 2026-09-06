# Visual Review

Review the rendered artifact against its purpose and source.

## Communication

- Is the primary message visible within a few seconds?
- Is the reading order clear?
- Does the chosen layout match the information structure?
- Does the visual add understanding rather than decoration alone?

## Fidelity

- Are facts, numbers, quotations, names, and dates correct?
- Are diagram relationships and directions correct?
- Does the asset respect the supplied brand system and required text?
- Are uncertainty and limitations represented honestly when relevant?

## Protected Brand Asset Fidelity

When a supplied logo, wordmark, lockup, seal, or other protected brand asset
appears, apply `protected-brand-assets.md` as a binary gate:

- Was the canonical source file placed through a deterministic compositor
  rather than recreated by a generative model?
- Are variant, geometry, aspect ratio, orientation, colors, alpha, internal
  spacing, and wordmark casing preserved?
- Is the asset free of cropping, stretching, skewing, rotation, recoloring,
  effects, or transparency changes that were not explicitly approved?
- Does placement satisfy the recorded anchor, dimensions, clearspace,
  contrast, and safe-crop requirements?
- Are there no duplicate, residual, approximate, or invented marks elsewhere?

Reject the candidate if any required answer is no. Visual similarity is not a
substitute for canonical-file placement.

## Revision Fidelity

When reviewing a revision, compare the candidate with the selected baseline:

- Did the requested change happen clearly enough to satisfy the feedback?
- Did every declared invariant remain materially unchanged?
- Were any unrelated elements added, removed, restyled, or repositioned?
- Did identity, geometry, crop, typography, palette, lighting, or texture drift?
- Is the candidate actually better for the requested purpose without creating
  a more consequential regression elsewhere?

Reject a candidate that fails these checks. Do not use it as the source for the
next attempt unless the user explicitly accepts the tradeoff.

## Legibility

- Is text readable at the intended display size?
- Is contrast sufficient?
- Are labels concise and unambiguous?
- Is meaning preserved without relying on color alone?

## Composition

- Is there one clear focal point or entry point?
- Is the hierarchy stronger than the decoration?
- Is spacing intentional rather than crowded or empty by accident?
- Are required elements safe from cropping and interface overlays?

## Rendering Quality

- Are generated hands, objects, symbols, and geometry plausible where they
  matter?
- Is rendered text correct and free from artifacts?
- Are there accidental duplicates, broken edges, or inconsistent styles?
- Does the output remain coherent across requested variants?

## Delivery

- Is the output type appropriate for the destination?
- Are editable sources or prompts preserved when future revision is likely?
- Is alt text or a text equivalent included when needed?
- Were only checks actually performed reported as verified?
