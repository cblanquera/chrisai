# Favicon QA

Favicon work fails most often because the source asset is too detailed, too
thin, or too text-dependent.

Treat favicon export as a small-format design task, not a blind conversion.

## Required Sizes

At minimum, review the output at:

- `16x16`

Treat only `16x16` as favicon output in this workflow.

If the project also needs larger icon assets, treat them as PNG icons rather
than favicon sizes.

## Review Criteria

At small sizes, confirm:

- the silhouette is still recognizable
- counters remain open where they matter
- thin strokes do not disappear
- tiny details do not turn into blur
- transparency edges stay clean

## Simplification Rules

Create a dedicated favicon variant when the main mark contains:

- text or initials that become unreadable
- multiple nested details
- linework that becomes too thin
- low-contrast internal shapes

Typical simplifications:

- remove text
- thicken strokes
- enlarge the core silhouette
- reduce the number of interior details
- increase padding only when the mark feels cramped

## Export Rule

Do not consider the favicon complete because the large source looks good.

Judge the favicon at actual size first. If the `16x16` output is muddy, the
export is not done.

For HTML-head usage rules, read
[html-head-icons](html-head-icons.md).
