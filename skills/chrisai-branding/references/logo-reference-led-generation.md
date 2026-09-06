# Reference-Led Logo Generation

Use this reference whenever an attached logo, screenshot, sketch, raster image,
or existing mark materially guides a new logo candidate. Reference-led work is
a visual-preservation problem before it is a drawing problem.

SVG remains the user-reviewable candidate format. That requirement governs the
delivered artifacts; it does not mean that improvised SVG path writing is an
adequate creative engine.

## 1. Classify The Reference Role

Assign one role to every source image:

| Role | Meaning | Preservation expectation |
| --- | --- | --- |
| Inspiration | Supplies mood, finish, palette, or general territory | Preserve selected traits, not composition or exact paths |
| Structural reference | Supplies construction grammar, proportions, or silhouette logic for an original mark | Preserve the named structural rules while redesigning the actual mark |
| Edit target | The user wants the supplied mark itself changed | Preserve everything except the explicitly authorized change |
| Vectorization source | The user wants the same artwork rebuilt as editable vector geometry | Match the source closely and treat differences as reconstruction risk |

Do not silently downgrade an edit target or structural reference into generic
inspiration. Do not promise exact preservation from a raster when the available
capability cannot address its geometry reliably.

## 2. Complete The Interpretation Checkpoint

Before creating candidates, describe the source in concrete visual language.
Pair technical terms with the user's words and cover:

- overall silhouette and orientation
- visible component count and grouping
- stroke or fill system, visual weight, joins, caps, and corner behavior
- proportions, alignment, spacing, overlaps, and negative space
- which components carry the semantic reading
- polish cues that distinguish the mark from clip art or rough geometry

Then state the contract:

```text
Reference role: [role]
Preserve:
- [visual grammar, components, proportions, or geometry]

Change:
- [one requested semantic or visual substitution]

Avoid:
- [unwanted reinterpretations, extra objects, stylistic drift, copied text]

Agent interpretation:
[One concise description of what the resulting mark will visibly be.]
```

If two reasonable constructions satisfy the user's wording, resolve the
ambiguity with one concise question or an annotated reference before drawing.
If the request already confirms one exact construction, state the interpretation
and proceed without redundant questioning.

## 3. Use The Capability Gate

Choose the strongest available path that actually consumes the visual source:

1. **Existing editable SVG:** edit named objects directly and preserve protected
   objects structurally.
2. **Reference-aware vector or design capability:** preferred for structural
   references, vectorization, and new SVG candidates. Record the source,
   capability, prompt, and similarity or preservation settings when available.
3. **High-fidelity raster visual capability plus vector reconstruction:** use
   raster privately for concept exploration when it materially improves craft;
   then rebuild with a vector-capable method and compare the SVG directly with
   the reference before presenting it. Never embed or present the raster as the
   candidate.
4. **Deterministic code-native construction:** use only for simple geometric
   marks, exact changes to an existing SVG, or cleanup of accepted vector
   geometry. Do not use it to approximate a polished raster reference whose
   quality depends on nuanced curves, stroke rhythm, or optical correction.

If only the fourth path is available and the reference exceeds simple
deterministic geometry, stop after the interpretation and construction brief.
Explain the capability gap instead of showing low-confidence logo files.

## 4. Generate Controlled Alternatives

When the user requests several samples from one reference, every candidate must
share the same reference contract. Vary only the named integration strategy or
design hypothesis. Do not treat the request as permission to redraw unrelated
marks.

Create one prompt or construction brief per candidate. Repeat the full
preservation contract in each one. Generate one independent source artifact per
candidate, then create one real editable, self-describing SVG per surviving
direction. Store shared source role and provenance once in the reference
contract rather than duplicating a specification for every SVG.

## 5. Preserve Professional Visual Grammar

Semantic correctness is insufficient. Compare the candidate with the source
for:

- silhouette logic and recognition speed
- stroke-weight consistency and rhythm
- curve continuity, tangency, caps, joins, and corner treatment
- spacing and negative-space balance
- component proportions and optical alignment
- density and legibility at 24-32 pixels
- finish level when placed beside the reference

A candidate that depicts the requested noun but loses these traits has failed.
Do not rescue it with rationale text.

## 6. Hard Presentation Gate

Before an SVG reaches a selection board, require all of the following:

- the requested semantic change is visible
- every preserved component or rule remains materially intact
- the mark reads clearly without explanation
- no unrequested container, text, shadow, gradient, decoration, or symbol was
  introduced
- the SVG contains editable vector geometry and no embedded raster
- the candidate looks intentional at large size and remains coherent at small
  size
- a direct side-by-side review does not reveal crude tracing, arbitrary bends,
  uneven rhythm, or primitive drawing quality

Reject weak candidates privately. Retry one candidate from its original
reference contract with a more capable path or narrower delta. Do not regenerate
successful candidates. If the retry still fails, stop and report the quality or
capability gap.

## 7. Selection And Later Refinement

After selection, resolve the candidate through the board map, preserve the exact
SVG as the baseline, and reuse the anatomy vocabulary supplied with the review
set. Follow
`references/logo-iterative-refinement.md` for all later changes. Never recreate
the selected mark from its prompt, board description, label, or raster preview while
the actual SVG exists.

PNG and other raster derivatives remain post-approval exports only.
