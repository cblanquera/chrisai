# Logo Concept Artifacts

Use this reference whenever a logo workflow creates more than one visual
candidate or assembles candidates into a comparison board.

## Lean Artifact Model

The required artifact model has two layers:

1. one independently addressable, self-describing SVG file per candidate
2. one derived HTML or SVG comparison board with one companion map

The candidate SVG is both the visual source and the geometry specification. The
board is only a review surface. Its map resolves every visible cell back to the
exact SVG file.

Do not create a separate `.spec.md` for every first-round candidate by default.
That duplicates geometry already expressed by the SVG and creates unnecessary
maintenance. Preserve non-geometric context in the board map, the review
response, and one shared reference contract when applicable.

## Required Package

Use stable candidate IDs and keep related files easy to resolve:

```text
logo-concepts/
|-- candidates/
|   |-- a-concept-name.svg
|   `-- b-concept-name.svg
|-- reference-contract.md       # only for reference-led work
`-- board/
    |-- concept-board.html
    `-- concept-board.map.md
```

From the first selectable board through explicit approval, every logo candidate
must be a real, editable SVG. Do not use a PNG as a selectable candidate or
refinement baseline, and do not wrap raster data inside an SVG. Raster outputs
may be retained as exploratory references or provenance only.

Do not place several logo directions inside one candidate file. Do not use the
board as a substitute for preserving the source candidates.

## Self-Describing SVG Contract

Make each SVG understandable without a companion specification:

- stable filename and candidate prefix such as `a-`, `b-`, or `c-`
- stable `viewBox`
- one `<title>` containing the candidate label and concept name
- one concise `<desc>` explaining the visible construction in plain language
- stable semantic IDs for editable groups and paths, such as `cart-body`,
  `letter-counter`, `wordmark`, `wheel-left`, or `wheel-right`
- editable vector geometry with no embedded raster
- intentional color attributes, transparent background, and no hidden metadata

The SVG geometry and IDs are authoritative for later edits. Text descriptions,
board copy, prompts, and conversation history must never be used to recreate a
candidate while the SVG exists.

## Board Map

Create the board map in the same operation that creates or updates the board.
Name it after the board with `.map.md` appended to the board stem.

Use this minimum schema:

```markdown
# [Board Name] Map

- Board artifact: [relative path to the exact HTML or SVG board]
- Board role: derived review surface
- Layout: [for example, 2 columns by 2 rows]
- Selection authority: candidate SVG files listed below
- Shared reference contract: [relative path or not applicable]

| Position | ID | Concept | SVG | Visible construction | SVG component IDs | Optional record | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| row 1, column 1 | A | [Name] | [path] | [concise anatomy] | [IDs] | [path or none] | proposed |

## Selection Rule

A selection such as “choose A” resolves to the exact SVG in the A row. Do not
crop, recreate, or edit the board cell while that source asset exists.
```

Every visible candidate cell must have exactly one row. Every row must point to
an existing SVG. Use the SVG `<title>`, `<desc>`, and component IDs when
assembling the map instead of duplicating a candidate specification.

If the board layout, membership, candidate label, source path, or component IDs
change, update the board and map together. A stale map invalidates the board as
a selection surface.

## Review Response Contract

Whenever any logo is presented for review, including a first-pass set, a
one-off candidate, or a refinement set, describe every candidate in the same
response so the user can select and request a modification immediately. Do not
wait until after selection to introduce the agent's visual terminology.

For each candidate include, concisely:

- stable label and concept name
- the overall silhouette or primary visual reading
- the visible components and how many there are
- construction terms paired with plain-language explanations
- important negative spaces, overlaps, orientation, and spatial relationships
- stable SVG group or path names when they will help target later edits
- strongest trait and largest risk

Example:

```markdown
**B — Parallel Ribbon S**

An open cart built from two nested rounded rails. The outer rail forms the
primary S-shaped silhouette; the inner rail creates its upper counter (the open
white space inside the letter). A short handle joins at upper left, with two
separate circular wheels below. Useful edit terms: `cart-body`, `inner-rail`,
`wheel-left`, and `wheel-right`. Strongest trait: balanced S/cart reading.
Risk: the inner counter may close at very small sizes.
```

Use the user's words as aliases when they have already named a component. Keep
this description short enough to scan beside the images; it is a shared
vocabulary handoff, not a design essay.

## When Additional Documentation Is Useful

Create documentation only when it records information the SVG cannot:

- **Reference-led work:** one shared `reference-contract.md` for source role,
  preserve/change/avoid rules, and capability provenance.
- **After selection:** update the board map or create one selection record with
  the accepted candidate, anatomy aliases, and locked invariants.
- **Refinement rounds:** create one revision record per round when the requested
  delta, allowed-change IDs, structural comparison, or rejected branches need
  to survive beyond the conversation.
- **Formal audit or handoff:** create a candidate specification only when the
  user, project, or downstream tool explicitly requires one.

Do not create documentation merely to restate path data, colors, geometry, or
component structure already explicit in the SVG.

## Creation Order

Use this order:

1. assign stable candidate IDs
2. create one self-describing SVG candidate per direction
3. critique or replace weak candidates without changing successful files
4. assemble the board from the surviving SVG files
5. create the companion map from the SVG metadata and actual board layout
6. verify every map path, candidate ID, and component list
7. present the board and include the review-response description for every
   candidate

The board may display SVG titles and descriptions, but it must embed or place
the candidate files without redrawing them.

## Raster Or Composite Reference Fallback

If an exploratory capability can produce only a raster or one composite image:

1. preserve the original as a source artifact
2. identify surviving directions without treating raster cells as candidates
3. reconstruct each surviving direction as a separate editable SVG
4. add `<title>`, `<desc>`, and stable component IDs to every SVG
5. visually compare each SVG with its raster reference and reject unfaithful
   reconstructions
6. assemble a new board and map from the accepted SVG candidates

Do not refine directly from the raster, extract a PNG cell as a candidate, or
recreate a selected cell from its label or description. If the direction cannot
be represented faithfully as SVG, stop and explain the gap.

## Selection And Refinement

When the user selects a candidate:

- resolve the selected ID through the current board map
- use the mapped SVG itself as the edit target
- carry the review-response terminology forward as shared vocabulary
- add the user's component terms as aliases to the map or selection record
- lock every SVG object by default except the exact IDs authorized to change
- save revisions as new SVG files and never use a rejected revision as the next
  baseline
- create a revision record only when it adds durable information not already in
  the SVG or board map
- do not create PNG derivatives until the user explicitly approves the SVG logo

## Review Gate

Before presenting a board, confirm:

- Does each candidate exist as its own self-describing SVG?
- Does each SVG have a stable label, `<title>`, `<desc>`, and useful component
  IDs?
- Is every selectable candidate editable vector geometry with no embedded
  raster?
- Was the board assembled from those exact SVG files?
- Does the board have a current companion map?
- Does every visible cell map to one existing SVG and its component IDs?
- Does the presentation response describe every candidate using concrete visual
  terminology and plain-language aliases?
- Can the user's next message both select a candidate and target a component
  without first asking what the agent calls it?
- For refinement, are allowed-change IDs and locked invariants recorded when
  they need durable preservation?
