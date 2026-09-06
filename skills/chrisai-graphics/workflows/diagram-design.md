# Diagram Design

Create a diagram whose structure and labels explain a flow, system, sequence,
hierarchy, architecture, or relationship accurately.

## 1. Define The Question

State what the diagram should help the viewer understand. Identify the
audience, the source of truth, and the boundary of the system or process.

## 2. Extract The Model

List the required:

- nodes, actors, components, or stages
- relationships and direction
- grouping or containment
- states, branches, loops, and exceptions
- exact labels and terminology
- starting point and intended reading order

Resolve ambiguity from the source before polishing the visual.

## 3. Choose The Diagram Type

Use `../references/layout-selection.md`:

- flowchart for decisions and paths
- sequence for ordered interactions over time
- architecture or structural breakdown for components and connections
- hierarchy or tree for ownership, taxonomy, and nested structure
- timeline or progression for milestones and stages
- cycle for recurring behavior
- comparison or Venn layout for differences and overlap

## 4. Choose The Medium

Prefer an editable, deterministic diagram or vector format when exact labels,
connections, and revision history matter. Use raster image generation when the
diagram is intentionally illustrative and small geometric variation will not
change its meaning.

Use concise labels. Move long explanation into a caption or companion text
instead of filling every node.

## 5. Review

Apply `../references/visual-review.md`. Verify the diagram against the source,
not merely against the prompt.

Check that:

- every required component appears once in the correct place
- arrows and sequence direction are correct
- branches and loops are unambiguous
- grouping communicates the intended boundary
- labels match accepted terminology
- color is not the only carrier of meaning
- the diagram remains readable at its intended size

If feedback requests changes to the rendered diagram, use
`../references/iterative-editing.md` instead of treating the next attempt as a
fresh generation. Return to model extraction or diagram selection only when
the feedback changes the underlying nodes, relationships, or system boundary.
