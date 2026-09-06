# Logo Iterative Refinement

Use this reference after the user selects a logo candidate or asks to revise,
refine, repair, or try again from an existing logo image or vector asset.

The objective is controlled change: preserve the accepted identity while
altering only what the user requested. Do not treat selection as permission to
reinterpret or regenerate the logo from its written rationale.

## Baseline And Candidate Model

Treat the latest SVG candidate the user selected or still considers
satisfactory as the baseline. Treat every revision as an SVG candidate until
the user accepts it. Selection establishes a working baseline; it is not final
logo approval.

- Preserve the baseline non-destructively.
- Give the baseline and every candidate a stable label or filename.
- If a candidate is rejected, start the next attempt from the same accepted
  baseline, not from the rejected output.
- Promote a candidate to the new baseline only after acceptance.
- Do not present a chain of increasingly different files as progressive
  refinement.
- Do not create PNG logo candidates during refinement. PNG is a derivative
  export made only after explicit approval of the SVG logo.

For project-bound or multi-round work, record:

```text
Selected baseline: [candidate label]
Source asset: [exact SVG path]
Selection board map: [exact path when selection came from a board]
Selection or revision record: [exact path when durable context is needed]
Source type: SVG
ViewBox and rendered aspect ratio: [value]
Accepted traits: [what the user chose]
Locked invariants: [what must remain unchanged]
Open decision: [the requested or unresolved change]
```

## Isolate The Selected Candidate

A selected candidate must be available as one addressable SVG before it is
refined.

- Prefer concept workflows that create and save one SVG per direction.
- When selection came from a concept board, resolve the candidate ID through
  the board's companion map and verify the candidate path and semantic SVG IDs
  before editing.
- If an imported logo exists only as one raster cell in a composite board,
  preserve that cell as visual reference and reconstruct it as a real SVG before
  presenting it as selectable. Do not refine the raster cell or embed it in an
  SVG wrapper.
- Do not recreate a selected SVG from its candidate name, position, rationale,
  board description, or text description while the actual file exists.
- Remove surrounding candidates, board labels, captions, and presentation
  decoration from the edit target unless they are intentionally part of the
  logo.

## Describe The Selected Logo Before Refinement

The user must have a concise `Logo anatomy` description in the agent's own
concrete visual vocabulary before the first refinement. Normally the concept
review response already supplies it. If it did not, inspect the exact selected
SVG and provide it immediately after selection. Do not make the user discover
the agent's terminology through failed edits, and do not force a redundant
terminology checkpoint when the review response already established one.

Name and count each visible component or coherent group. Describe its color,
shape, position, orientation, layer relationship, negative space, and role in
the overall silhouette. Pair technical language with ordinary wording, for
example `isometric projection (a box drawn on diagonal axes)`.

When the user has already named part of the logo, map both vocabularies:

```markdown
| Your term | Agent term | Exact visible scope | SVG IDs |
| --- | --- | --- | --- |
| [user phrase] | [agent phrase] | [included components] | [group/path IDs] |
```

Treat both terms as valid aliases afterward. Record the mapping in the board map
or one selection record when it needs to survive beyond the conversation. If
one term could refer to a single shape or a larger grouped concept, annotate the
rendered SVG or ask one concise clarification question before editing.

## Resolve The Requested Target

Resolve the user's language to one observable part of the selected asset before
editing SVG objects or creating candidates. Record:

- the user's wording without reinterpretation
- the resolved target by visible color, shape, position, and relationship to
  surrounding elements
- the permitted transformation to that target
- plausible nearby components that remain protected

Words such as `top`, `inside`, `lid`, `box`, `symbol`, `line`, or `shape` can
refer to more than one visible component. If two reasonable target
interpretations exist, stop and ask one concise clarification question. Describe
the alternatives visually or provide an annotated copy of the baseline when
that is clearer. Do not silently resolve visual ambiguity from the concept
rationale, candidate name, board description, or brand story.

When the user requests several iterations, treat them as alternative treatments
of this same resolved target and permitted transformation. Do not broaden the
change, move other elements, or turn the set into several new logo directions.

## Lock The Identity

The whole rendered baseline is locked by default. The requested change unlocks
only the resolved target and only for the permitted transformation. A request
to change one component's shape does not also authorize changing surrounding
elements, their count or placement, the overall composition, or the global
bounding box.

State the invariants that define the selected logo and matter to the current
revision. Common logo invariants include:

- outer silhouette
- core geometry and proportions
- negative-space relationships
- stroke or weight relationships
- angle, curve, corner, and join logic
- element count and relative placement
- distinctive asymmetry or imperfection the user selected
- mark-to-wordmark relationship
- exact brand-name spelling and capitalization
- palette, except when color is the requested change
- viewBox, aspect ratio, and visible bounds

Do not silently normalize, beautify, modernize, balance, or simplify a locked
trait. A requested change overrides only the directly affected invariant.

## Classify The Revision

Choose the least destructive method that can make the change:

| Revision | Preferred method |
| --- | --- |
| Exact color, text, spacing, alignment, stroke, radius, or sizing change | Edit the named SVG objects directly |
| Localized shape or negative-space change | Edit or replace only the authorized SVG paths or group |
| Intentional change to silhouette, metaphor, composition, or structural category | Create a sibling SVG from the accepted SVG baseline and label it as a redesign candidate |
| Imported raster is the only source | Preserve it as reference and create an SVG working candidate before refinement |
| The direction cannot be represented faithfully as SVG | Stop and explain the limitation; do not substitute a PNG candidate |

When the active image or design capability has its own operating guidance,
follow it for tool-specific mechanics. This reference remains authoritative for
the baseline, protected invariants, change scope, and acceptance decision.

## Revision Brief

Normalize each revision into a concise brief before editing:

```text
Mode: edit the selected SVG baseline; do not generate a new logo concept
Edit target: [baseline label and exact SVG path]
User wording: [the user's request without reinterpretation]
Resolved visual target: [color, shape, position, and relationship]

Change only:
- [one requested change or one tightly coupled set of changes]

Keep unchanged:
- [every visible element outside the resolved target]
- [silhouette and core geometry]
- [negative space and proportions]
- [stroke, angle, curve, corner, and placement relationships]
- [wordmark, palette, crop, or other protected details]

Allowed-change region:
- [exact SVG object, group, or path IDs]
- Global bounding-box change authorized: yes / no

Acceptance:
- [observable evidence that the requested change succeeded]
- [out-of-region comparison requirement]
- No material regression in the whole-mark invariants
```

Repeat every critical invariant in every revision brief. Do not rely
on conversation history, the candidate label, or phrases such as `same logo`,
`keep the style`, or `make a small change` to preserve visual identity.

## Define The Allowed-Change Region

Use the smallest coherent region that contains the resolved target and the
requested transformation:

- Identify the exact SVG paths, objects, or groups that may change.
- Record whether the allowed region touches the logo's outer silhouette and
  whether a global bounding-box change is authorized.

A written prompt is not an allowed-change region. Preserve protected SVG
objects directly from the baseline. If the available capability cannot address
those objects reliably, stop and explain the fidelity limitation before
creating candidates.

## Execute Surgically

- Branch every revision from the exact selected SVG baseline.
- Make one conceptual change at a time. Keep changes together only when
  separating them would produce an incoherent result.
- Prefer `change only X; keep Y unchanged` over `make it better`, `polish it`,
  `try another`, or `regenerate`.
- Preserve aspect ratio and dimensions unless the requested change requires a
  different output geometry.
- Treat attached images as visual references only; they do not replace the SVG
  edit target.
- Give every candidate in one iteration set the same accepted baseline,
  resolved target, allowed-change region, and whole-mark locks unless the user
  explicitly changes the brief.
- Save the result as a new candidate. Do not overwrite the accepted baseline.
- Create or update one revision record only when the parent baseline, requested
  change, protected invariants, method, or review result must persist beyond the
  conversation and is not already captured by the board map.
- Compare protected SVG objects with the baseline after editing; a narrowly
  edited path does not prove that the rest of the document stayed unchanged.

## Compare And Promote

Compare the candidate directly with the baseline before presenting it as an
improvement. For a localized or minor revision, compare the entire SVG tree,
not an arbitrarily chosen protected subset. Use a browser-rendered side-by-side
and a structural diff when practical.

Check:

- Did the requested change occur?
- Is the outer silhouette unchanged unless explicitly targeted?
- Are negative-space, proportion, and element relationships stable?
- Did typography, spelling, palette, viewBox, or transparent background drift?
- Did the candidate gain new details, containers, shadows, gradients, text, or
  symbols that were not requested?
- Does it still work at the required small sizes?

For an exact SVG-preservation claim, verify that protected groups and paths are
byte-identical or structurally equivalent, the viewBox is unchanged unless
authorized, protected component counts and transforms are stable, and no
unrequested raster image was embedded.

Promote the candidate only when the requested change succeeds and the locked
invariants remain materially stable. If it regresses, discard it as the
working source and retry from the accepted baseline with a smaller or clearer
change.

When presenting a refinement for review, include its concise anatomy and
terminology description in the same response. Reuse established component
names and aliases, state which SVG IDs changed, and identify what remained
locked. For a multi-candidate refinement set, describe every candidate rather
than only the preferred option.

After two targeted failures from the same baseline, stop chaining edits. Return
to the accepted SVG and choose one of these paths:

- use a more localized or deterministic SVG editing method
- split or simplify the requested change
- rebuild the selected direction as an explicitly new SVG candidate
- create a sibling concept from the original brief
- stop here and preserve the accepted baseline

## Imported Raster Gate

An imported raster may be useful visual evidence, but it is not the working
logo candidate. Rebuilding it as SVG can change its identity, so treat the
rebuild as a candidate rather than an automatic conversion.

- Preserve the selected raster reference during the rebuild.
- Read and apply `references/logo-reference-led-generation.md`; classify the
  raster's role and pass its capability gate before rebuilding.
- Identify which geometry can be reproduced faithfully and which details may
  change.
- Compare the rebuilt silhouette, negative space, proportions, and curve logic
  directly against the baseline.
- Ask the user to accept the rebuild as the SVG working baseline before further
  refinements.
- If faithful reconstruction is not practical, stop and describe the gap. Do
  not continue logo iteration in PNG.
- Do not use improvised, code-native SVG path drawing as the first reconstruction
  method for a polished raster reference. Prefer a reference-aware vector or
  visual capability, then perform deterministic SVG cleanup only after the
  visual direction survives comparison.

## Review Gate

Before completing a refinement round, confirm:

- Was the correct selected asset used as the edit target?
- Was the selected logo described in the agent's visual vocabulary in the
  concept review response or, if missing there, immediately after selection?
- Were the user's terms mapped to exact visible components and SVG IDs?
- Was ambiguous component language resolved before rendering?
- When selection came from a board, did its map resolve to the exact SVG and
  semantic component IDs?
- Was the requested delta stated separately from the locked invariants?
- Was the whole baseline locked by default, with only one resolved target
  unlocked?
- Did every candidate in the iteration set use the same allowed-change region?
- Was the least destructive suitable method used?
- Was the candidate saved as a new self-describing SVG without overwriting the
  baseline?
- Did the refinement review response describe every presented candidate and
  identify the changed SVG IDs and protected remainder?
- Was it compared directly with the accepted baseline?
- For a localized edit, were all protected SVG objects compared rather than
  only the changed group?
- Will a rejected candidate be excluded from the next attempt?
- Was any imported-raster rebuild clearly labeled and separately accepted as
  the SVG working baseline?
- Were PNG logo candidates withheld until explicit SVG approval?
