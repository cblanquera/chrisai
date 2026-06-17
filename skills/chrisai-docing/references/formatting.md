# ChrisAI Docing Dev Formatting

This reference standardizes markdown documentation so it is consistent, scannable,
and aligned with the repo's documentation style rules.

Use it after the document's editorial plan is clear, or when the user
explicitly asks for formatting cleanup, normalization, or conversion of messy
docs into a stable structure.

Do not decide the teaching order of guided-learning docs here. Do not define API
reference schema here. Preserve the owning document strategy and normalize the
presentation around it.

## Sources Of Truth

Use these repo guides as source material:

- `docs/documenting/Documentation-Style-Guide.md`
- `rules/documenting/Documentation-Style-Guide.md`

When those guides differ, follow the explicit decisions encoded in this reference
instead of copying both versions verbatim.

## Task Intake

Before normalizing a document, identify:

1. whether it is a guide, tutorial, explanation, reference, or mixed page
2. whether the real problem is structure, editorial flow, or missing content
3. whether the file needs light cleanup or full legacy-doc conversion
4. whether another documentation skill should own the content order first

If the task still needs content sequencing, switch to
`references/guided-learning.md` or `references/api-reference.md` first.

## Core Rules

- Start with one H1 title.
- Add a short title description after the H1.
- Give each major section a short description before diving into supporting
  content.
- Separate document blocks with a single empty line.
- Do not leave multiple consecutive empty lines.
- Keep list formatting consistent and parallel.
- Always add a language tag to fenced code blocks.
- Keep links, anchors, and cross-references working.
- Keep code examples syntactically correct and realistic.

## Outline And Section Rules

- Use numeric outline IDs for formal reference docs and long structured docs.
- Numeric outline IDs must end with a period.
- Outline IDs may be used up to 5 heading levels as a hard maximum.
- Prefer shallower nesting even though 5 levels are allowed.
- Use outline segments for real structured sections, not one-line labels or
  callouts.
- Never combine bullet markers with outline segments. `- 1.1.` is invalid.
- If lighter subsection labeling is clearly more readable and does not hurt
  navigability, it may be used instead of full numeric outline IDs for local
  subsections.

## TOC Rules

- Include a TOC for long docs, multi-section docs, or reference-heavy docs.
- Omit a TOC for short docs where it adds noise.
- If a TOC is used, keep it aligned with the actual heading structure and
  anchors.

## List And Block Rules

- Bullet lists must use ` - ` with one space before and after the dash.
- Numbered lists must use ` 1. ` style spacing.
- Do not create a one-item bullet list or one-item numbered list.
- Keep bullets and numbered items short unless the local file clearly needs
  longer items.
- Labels like `**Example**` and `**Usage**` are labels, not headers.
- Alerts should use blockquote form with a log-style prefix such as `INFO:`,
  `WARNING:`, `ERROR:`, `NOTICE:`, `HINT:`, or `TIP:`.

## Decision Rules

- Prefer consistency, but not at the cost of readability.
- Preserve the intended reader flow chosen by the owning documentation skill.
- Prefer outline numbering when readers will need to cite, scan, or navigate a
  large document.
- Prefer lighter subsection treatment only when a full outline would make the
  page harder to read.
- Apply the "at least two" rule when it improves structure, but do not force
  mechanical subdivision when the parent section reads more clearly without it.

## Review Gate

Do not consider the output complete unless the answer to all of these is yes:

- Is the heading hierarchy clear and consistent?
- Are outline and TOC choices appropriate for the document type?
- Are spacing, lists, and code fences normalized?
- Are links and anchors correct?
- Did formatting cleanup avoid damaging the intended reader flow?
