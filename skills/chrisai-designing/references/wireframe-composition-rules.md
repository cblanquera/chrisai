# Wireframe Composition Rules

Use this reference after checking the wireframe library inventory when a
wireframe needs an element or composition that the library does not already
provide. It applies to grayscale wireframes, not creative drafts governed by
an approved brand direction or extracted design system.

## Authority

Use this order:

1. Follow explicit product requirements and source truth recorded in the
   revision's `specs.md`.
2. Reuse the closest matching library component, interface, or layout.
3. Compose uncovered elements from the library tokens and the rules below.

Treat `assets/wireframes/lib/base/tokens.css` as the exact source for visual
values. Treat matching library HTML and CSS as the canonical implementation of
an established pattern. Do not create a parallel local scale when a suitable
token or pattern exists.

Record intentional exceptions in `specs.md`. When a custom pattern becomes
generally reusable, promote one reviewed version into the library instead of
maintaining repeated local variants.

## Token Discipline

- Use `--wf-*` tokens for colors, spacing, radii, shadows, typography, and
  established dimensions when a suitable token exists.
- Do not introduce raw visual values that duplicate an existing token.
- Raw values remain appropriate for `0`, one-pixel dividers, structural
  percentages, fractional grid tracks, viewport constraints, breakpoints,
  and geometry without a suitable token.
- Keep project-specific token overrides inside the revision and document them
  in `specs.md`; do not silently change the shared library baseline.

## Typography

Use the existing type tokens by role:

| Role | Default token |
| --- | --- |
| Dense diagram, calendar, and secondary data labels | `--wf-text-2xs` |
| Metadata, overlines, and compact badges | `--wf-text-xs` |
| Labels, helper text, and dense collection content | `--wf-text-sm` |
| Body copy and ordinary controls | `--wf-text-md` |
| Card titles and section subheadings | `--wf-text-lg` |
| Section and secondary page headings | `--wf-text-xl` |
| Primary page titles | `--wf-text-2xl` |

- Set `font-size` with a `--wf-text-*` token. Do not use `em` or `rem` for
  `font-size`.
- Use `--wf-line` for body copy and `--wf-line-tight` for headings and compact
  labels.
- Choose heading levels from document structure, then apply the appropriate
  visual role. Do not choose semantic levels only to obtain a size.
- Prefer normal weight for body content and bold weight for headings, labels,
  selected emphasis, and compact data headers.

## Spacing And Density

- Use `--wf-space-*` tokens for `gap`, padding, and ordinary margins.
- Let parent layouts own spacing between components through `gap`. Let each
  component own its internal padding.
- Reset default child margins when a parent gap controls the rhythm. Avoid
  adding component-specific outer margins to repair local spacing.
- Use the smaller spacing tokens for dense controls and collection rows, the
  middle tokens for ordinary component padding, and the larger tokens for page
  sections and major separation.
- Keep one density within a repeated collection. Do not mix compact and roomy
  rows without a product reason recorded in `specs.md`.

## Surfaces, Boxes, Cards, And Panels

- Use `.wf-surface` for a neutral bounded region and `.wf-card` for a repeated
  content object before creating a new box treatment.
- Match the canonical card defaults: `--wf-space-5` padding,
  `--wf-space-3` internal gap, a one-pixel `--wf-border`,
  `--wf-radius-4`, and `--wf-surface`.
- Use a smaller radius and padding scale for compact nested boxes. Keep the
  standard card treatment for peer content blocks.
- Use dividers to separate panel headers, bodies, and footers. Do not add a
  border around every nested region when spacing or one divider establishes
  the hierarchy.
- Use elevation only when layering or interaction requires it. Do not use
  shadows as decoration in grayscale wireframes.

## Data Collections

Data collections include native tables, data grids, spreadsheet-like grids,
repeated list rows, comparison matrices, tree grids, master-detail record
lists, card grids, and boards. A table-like component is any repeated-record
surface whose fields align for scanning or comparison, regardless of its HTML
element or CSS layout.

### Choose The Representation

- Use a native table when users compare consistent values across columns.
- Use a list when records form one reading axis without meaningful column
  comparison.
- Use cards when records contain heterogeneous content or independent actions.
- Use ARIA grid or tree-grid behavior only when the interaction genuinely
  requires two-dimensional keyboard navigation or hierarchical tabular data.
- Do not recreate a semantic table with generic elements only for styling.

### Density And Alignment

- Match the canonical table density: `--wf-text-sm`,
  `--wf-space-3` vertical cell padding, and `--wf-space-4` horizontal cell
  padding.
- Use a one-pixel `--wf-border` divider between records. Do not double the
  outer border and first or last row borders.
- Align text and identity fields to the start, numeric values to the end, and
  repeated status or action fields consistently across rows.
- Give table-like grids and list rows the same typography, spacing, divider,
  and state treatment when they serve the same density.

### Structure And Behavior

- Give native column headers `scope="col"`. Give row headers `scope="row"`
  when the first cell identifies the record.
- Provide an accessible collection name when surrounding context does not
  already supply one.
- Keep sorting, filtering, result counts, pagination, and bulk actions adjacent
  to the collection they control.
- Show bulk actions only when selection exists. Represent selection with both
  a visible state and `aria-selected` or the native checked control.
- Provide deliberate loading, empty, no-results, error, and partial-data
  states when the product flow calls for them.
- Keep interactive rows keyboard reachable. Do not make an entire row the only
  action target when the row also contains independent controls.

### Responsive Collections

- Preserve column relationships with horizontal scrolling by default.
- In a bounded two-axis scroller, keep column headers pinned to the top. Pin a
  short identity column to the left and compact actions to the right when they
  must remain available; use opaque cell backgrounds and raise corner cells
  above the other sticky cells.
- Convert rows into labeled cards only when `specs.md` defines that behavior
  and every value retains its label and meaning.
- Do not shrink typography below the type scale to make columns fit.
- Keep important identifiers and primary actions available when secondary
  columns are hidden or deferred.

## Forms, Controls, And Actions

- Reuse the library form and button components before creating custom controls.
- Make custom controls match the established control height, border, radius,
  label treatment, and focus behavior.
- Group related fields with layout gaps. Do not use empty boxes or repeated
  borders as the only expression of field grouping.
- Keep one primary action per local decision area. Place secondary and
  destructive actions consistently and label icon-only actions accessibly.

## Content Behavior

- Use realistic content whose length resembles the intended product data.
- Let primary content wrap when it affects understanding. Truncate secondary
  content only when the full value remains available through context or an
  accessible disclosure.
- Preserve identifiers, units, signs, and date meaning. Do not shorten values
  in ways that make similar records indistinguishable.
- Use a consistent visible treatment for missing, unavailable, and zero values
  when those states mean different things.

## Interaction States

- Define default, hover, focus, selected, disabled, loading, empty, success,
  warning, and error states when they affect the reviewed workflow.
- Use visible state plus semantic attributes such as `aria-selected`,
  `aria-expanded`, `aria-checked`, and `aria-disabled` where applicable.
- Preserve the library focus treatment. Do not remove focus outlines without
  an equally visible replacement.

## Responsive Composition

- Use flexible tracks, `minmax(0, 1fr)`, wrapping, and overflow before adding
  fixed widths that only fit one viewport.
- Preserve information hierarchy and action reachability at narrow widths.
- Keep font sizes on the same pixel-based type scale across breakpoints unless
  `specs.md` explicitly defines a different role at a breakpoint.
- Verify at least one narrow and one wide viewport when browser tooling is
  available.

## Exceptions And Promotion

When these defaults do not fit the product:

1. Record the reason and replacement rule in `specs.md`.
2. Keep the exception local to the revision unless it is generally reusable.
3. If it recurs across unrelated wireframes, review it as a candidate token,
   component, interface, or layout for the shared library.

Do not change the shared library solely to encode one project's visual
preference.
