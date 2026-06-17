# Brand Consistency Review

Use this workflow when the main problem is checking whether a website, app UI,
deck, README, docs page, marketplace listing, social profile, or other surface
matches an existing brand kit or brand direction.

This workflow reviews applied brand consistency. It does not audit the brand
kit itself, generate new brand assets, or redesign the surface.

## Ownership

This workflow owns:

- comparing a surface against brand guidance
- identifying voice, messaging, visual, logo, and asset inconsistencies
- separating critical issues from polish
- recommending targeted fixes

This workflow does not own:

- reviewing the brand kit itself; use `workflows/brand-kit-audit.md`
- auditing raw brand files; use `workflows/brand-asset-audit.md`
- producing a new design or copy rewrite unless requested
- SEO, CRO, ads, social strategy, or launch planning

## Workflow

Work through these steps in order:

1. Identify the brand source of truth.
2. Identify the surface to review.
3. Compare content and voice.
4. Compare visual and asset usage.
5. Check implementation consistency.
6. Produce findings and fixes.

## Step 1: Identify Source Of Truth

Use the latest approved brand kit, visual guidelines, voice guide, messaging
guide, strategy doc, or explicit user-provided direction. Do not assume a
particular folder exists.

If the source of truth is unclear or scattered, use
`workflows/brand-source-of-truth.md` first.

If the brand kit itself seems incomplete or contradictory, use
`workflows/brand-kit-audit.md` first.

## Step 2: Identify Surface

Capture or infer:

- surface type: website, product UI, deck, README, docs, marketplace, social,
  email, one-pager, or other
- review goal: launch readiness, cleanup, rebrand QA, consistency check,
  handoff review, or targeted issue review
- whether live public information matters
- whether screenshots, source files, or URLs are available

When current public surfaces matter, verify live and cite source URLs.

## Step 3: Review Content And Voice

Compare:

- audience and category framing
- one-liner and value proposition
- message pillars
- proof points
- CTA language
- voice traits
- tone by context
- banned or discouraged words
- jargon level and clarity

Flag claims that conflict with the kit or lack proof.

## Step 4: Review Visuals And Assets

Compare:

- logo usage
- favicon or app icon usage
- color usage
- typography
- imagery
- iconography
- spacing/layout tone
- contrast and legibility
- asset quality

Use `workflows/brand-asset-audit.md` when file-level asset quality is the main
issue.

## Step 5: Review Implementation Consistency

When reviewing a local project or rendered surface, check:

- inconsistent names or spellings
- stale logos or old colors
- mismatched favicon/social preview assets
- scattered hard-coded colors or fonts
- inconsistent boilerplate across pages
- missing alt text or accessibility notes when visible
- draft language accidentally exposed

Do not rewrite project code unless the user explicitly asks for fixes.

## Step 6: Produce Findings

Lead with issues ordered by severity:

| Severity | Area | Finding | Brand Rule | Recommended Fix |
| --- | --- | --- | --- | --- |
| High / Medium / Low | [area] | [finding] | [source] | [fix] |

End with:

- what is consistent
- what is inconsistent
- what needs the brand kit updated instead of the surface
- next workflow recommendation
