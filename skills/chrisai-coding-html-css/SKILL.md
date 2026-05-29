---
name: chrisai-coding-html-css
description: Use this skill when writing or reviewing vanilla HTML and CSS for static sites, documentation pages, and GitHub Pages style projects. It consolidates practical HTML and CSS standards into one Codex workflow, including semantic HTML structure, attribute ordering, line wrapping, CSS section layout, selector discipline, naming conventions, deploy-safe linking patterns, and review checks for maintainable static frontend code.
---

# ChrisAI Coding HTML CSS

Use this skill for vanilla HTML and CSS implementation, refactors, and reviews
for static sites and frontend templates.

This skill is intentionally practical. It turns the repo's HTML and CSS guides
into generation rules and review checks so Codex produces cleaner markup and
styles instead of only formatting them after the fact.

## Second Pass Use

This skill may guide implementation directly, but it is especially recommended
as the final pass after the markup and styles already work.

Use the last pass to normalize section comments, HTML readability, naming,
attribute ordering, selector ownership, and CSS organization without
needlessly reworking stable markup.

## Repo Discovery Workflow

Before applying standards, inspect the local codebase in this order:

1. the touched template, stylesheet, and nearby sibling files
2. the surrounding layout, partial, or page structure that the file fits into
3. existing class naming, comment, and sectioning patterns in the same package
4. any build or rendering constraints that affect how HTML and CSS are emitted

If the project already has a stronger local pattern, preserve it. Use this
skill to fill gaps and make decisions when the local pattern is unclear.

## Task Intake

Decide early whether the work is mainly:

- page or layout markup
- reusable partial or component markup
- stylesheet organization
- HTML/CSS refactor for clarity
- review of an existing frontend change

For mixed work, keep the HTML structure and CSS ownership aligned. Do not add
markup that forces selectors to become more specific than they need to be.

## Priority Order

Apply rules in this order:

1. Match the existing style of the touched files when it is clear.
2. Apply the standards in this skill.
3. If a local pattern conflicts with this skill, preserve the local pattern
   unless the user asks to normalize the file.

Consistency beats preference. Keep changes small, focused, and easy to review.

## Core Formatting

- Use 2 spaces for indentation. Never use tabs.
- Keep lines compact and readable.
- Aim for `<= 80` characters when practical.
- Avoid going past `100` characters unless the file already does so
  consistently.
- Keep exactly one blank line between logical blocks.
- Do not leave multiple consecutive blank lines.
- Use double quotes for HTML attribute values.

## HTML Workflow

When writing or editing HTML, think in this order:

1. semantic structure
2. content hierarchy
3. stable class hooks
4. attribute cleanup
5. wrapping and readability

Do not start with cosmetic wrappers. Start by making the document structure
correct, then give CSS something stable to target.

For static sites, also think about what the final file will look like when it
is served without an app framework behind it. Favor plain, durable markup and
linking that works in simple hosting environments such as GitHub Pages.

## HTML Structure

- Prefer semantic tags such as `<header>`, `<section>`, `<article>`,
  `<aside>`, and `<footer>` where they genuinely describe the content.
- Use `<article>` for content units such as posts, products, events, or cards
  that make sense as standalone content blocks.
- Do not place block elements inside inline elements.
- Do not place block elements inside `<p>` tags.
- Keep heading levels in order and do not skip levels.
- Use no more than one `<h1>` per page.
- Keep heading and support text readable; avoid all-uppercase copy.
- Do not use `<br />` or `<hr />` as layout spacing tools. Use CSS for spacing.
- Do not use legacy presentational tags such as `<b>`, `<s>`, or `<font>`.

## HTML Attributes And Naming

- Keep attributes in alphabetical order when a tag has multiple attributes.
- If a tag has many attributes or does not fit cleanly on one line, put each
  attribute on its own line.
- Close multiline opening tags cleanly, then place the content on the next
  line.
- All `<a>` tags must have a `title` attribute unless the surrounding file has
  a stronger local convention that clearly omits it.
- All `<img>` tags must have an `alt` attribute.
- Use IDs only when JavaScript needs them. Do not style IDs.
- Prefer meaningful, lowercase, dash-separated class names.
- Do not create classes that only describe one visual tweak when a better
  structural name is available.
- Prefer deploy-safe links and asset references that match the host
  environment. Be careful with absolute-root paths when the site may be served
  from a project subpath.

## HTML Readability

- Keep short inline content on one line when it remains readable.
- If inline text overflows, move the text content onto the next line instead of
  hanging it awkwardly after the opening tag.
- Treat inline tags such as `<strong>` as part of the same text flow; do not
  split them out onto their own lines unless the surrounding content already
  requires it.
- Use section comments when the file already uses them or when a large template
  needs stronger scanability.
- When section comments are used, use the exact `<!-- START: ... -->` and
  `<!-- END: ... -->` pattern for major sections, blocks, and states.
- Encourage comments on frontend code when they improve troubleshooting or
  acceptance-test readability.

## Static Site Guardrails

- Prefer plain HTML structures that do not assume hydration, bundlers, or
  runtime templating unless the project already uses them.
- Keep asset paths and navigation links consistent with the intended deploy
  model, especially for GitHub Pages or docs sites served from subdirectories.
- Avoid unnecessary JavaScript hooks in markup when CSS or semantic HTML is
  enough.
- Favor resilient content structure over framework-like wrapper patterns.
- If metadata is in scope, prefer sensible static-site basics such as page
  titles, descriptions, and viewport settings.

## CSS Workflow

When writing or editing CSS, think in this order:

1. section ownership
2. top-level selector choice
3. selector depth
4. property ordering
5. responsive placement

Do not begin by stacking selectors until the rule works. First decide which
section owns the rule and what top-level class should control it.

## CSS File Structure

Organize styles into these sections when the stylesheet is large enough to need
structure:

- Global
- Components
- Partials
- Pages

Use section comments when the file already uses them or when adding enough code
that structure improves scanning.

## CSS Selector Rules

- Put comma-separated selectors on separate lines.
- Put each property on its own line, even for one-property rules.
- Keep selectors unique per stylesheet when practical.
- Prefer class selectors over tag selectors.
- Avoid unnecessary tag-and-class combinations such as `strong.label`.
- Minimize selector depth so overrides stay manageable.
- Separate the direct child combinator `>` with spaces.
- Avoid using the same class name across sibling tag types when it creates
  ambiguity.

## CSS Ownership Rules

- In the Global section, use only first-level selectors unless overriding a
  library.
- Component styles must start from the top-level component class.
- Partial styles must start from the top-level partial class and assume one
  stable outer wrapper.
- Page-specific styles must start from a page class, typically with a
  `page-` prefix.

Do not style deep child elements in isolation if the rule really belongs to a
component, partial, or page wrapper.

## CSS Properties And Values

- Order properties alphabetically.
- Put browser-prefixed properties before standard properties, then continue in
  alphabetical order.
- Use leading zeroes for decimals such as `0.5`.
- Use 6-character uppercase hex colors.
- Use `rgba(...)` for alpha transparency.
- Do not use named colors such as `white`.
- Avoid `!important` unless overriding an existing `!important` rule leaves no
  cleaner option.

## References

Load additional reference material only when the task needs it:

- `references/html-style-details.md` for HTML comment patterns, attribute
  rules, heading structure, class naming, and readability details
- `references/css-style-details.md` for CSS section comments, selector
  ownership, property ordering, and value normalization

## Responsive Rules

- Place responsive rules near the bottom of the owning stylesheet section when
  that matches the local file pattern.
- Keep responsive overrides attached to the same ownership model as the base
  rule; do not create detached selectors that are harder to trace.

## Markup And Style Coupling

- Add classes to support stable styling, not to narrate every visual property.
- Do not add wrappers unless they improve semantics, layout control, or
  ownership clarity.
- Prefer one clear top-level class per reusable block so the CSS can anchor to
  something predictable.
- If a selector is becoming too deep, fix the markup or class ownership first
  instead of adding more specificity.

## Review Checklist

Before finishing HTML/CSS work, check the following:

- the file received a final style pass after the markup and styling were
  already working
- Is the HTML semantic, or did the file drift into wrapper soup?
- Is the heading structure valid and easy to scan?
- Are classes stable, lowercase, and structurally named?
- Are multiline tags and long text wrapped cleanly?
- Are `alt` and `title` attributes present where the project expects them?
- If section comments are present, do they use the exact `START` / `END`
  pattern?
- Do links and asset paths make sense for the intended static hosting setup?
- Does each CSS rule live in the correct ownership section?
- Are selectors shallower than the previous version, or at least no worse?
- Are properties alphabetical and values normalized?
- Did the change avoid `!important`, unnecessary wrappers, and spacing hacks?

## Review Mode

When reviewing HTML/CSS changes, prioritize:

1. semantic regressions
2. selector ownership problems
3. unnecessary specificity
4. fragile class naming
5. formatting or consistency issues

Behavior and maintainability matter more than cosmetic formatting.
