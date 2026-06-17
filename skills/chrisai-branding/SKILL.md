---
name: chrisai-branding
description: Use for brand asset utilities, domain naming research, brand research, and brand kit planning or generation.
---

# ChrisAI Branding

Use this skill for branding work. Route the task to the narrowest future
internal workflow unless the request clearly needs a deliberate sequence.

This skill is still growing. Some workflow files named below are planned but
not implemented yet. When a workflow file exists, use it. When it does not,
handle matching tasks with lightweight best-effort guidance, ask clarifying
questions when the brand inputs are missing, and clearly state when a
requested workflow has not been written yet.

Do not treat this skill as a general design, logo, marketing, SEO, legal,
trademark, or business-strategy router. Use it when the primary deliverable is
brand identity support, brand asset conversion, naming/domain exploration,
brand research, or brand kit creation.

## Internal Workflows

- Use `workflows/transparent-pngs.md` when the task is mainly about creating,
  cleaning up, exporting, or preparing transparent PNG assets.
  - Use `scripts/png_alpha_check.py` to validate PNG alpha-channel behavior
    when the user needs transparency confirmation.
- Use `workflows/png-ico-conversion.md` when the task is mainly about
  converting PNG files to ICO files or ICO files to PNG files, including
  favicon-oriented image sets.
  - Use `scripts/png_to_ico.py`, `scripts/favicon_preview.py`, and
    `scripts/svg_favicon_strip.py` when favicon packaging or preview work is
    needed.
- Use `workflows/tld-finder.md` when the task is mainly about finding,
  comparing, or shortlisting top-level domains for a brand, product, project,
  campaign, or company name.
  - Use `scripts/tld-finder.py` for dependency-free bulk RDAP checks when the
    user wants a concrete domain/TLD lookup utility.
  - Use `scripts/github-name-check.py`, `scripts/npm-org-check.py`, and
    `scripts/x-name-check.py` for dependency-free bulk checks of adjacent
    account, org, scope, or handle names.
- Use `workflows/brand-research.md` when the task is mainly about researching
  competitors, corporate websites, product positioning, category language,
  market position, or public brand signals.
  - Use `references/brand-research-report.md` when the user needs a
    source-backed report template, competitor matrix, evidence standard, or
    brand-kit handoff structure.
- Use `workflows/brand-kit-generation.md` when the task is mainly about
  creating or refining brand strategy, audience profiles, voice, tone,
  messaging guidelines, visual guidelines, usage rules, or a bundled brand kit.

## Sequencing

Only chain planned workflows when the user asks for a broader brand package or
when one deliverable clearly depends on another. Use this order:

1. `workflows/brand-research.md` first when brand positioning, competitor
   context, category conventions, or market language are unknown.
2. `workflows/tld-finder.md` when naming or domain options need to be checked
   before committing to a brand direction.
3. `workflows/brand-kit-generation.md` when the strategy, voice, audience, and
   guidelines should be created from the approved or available research.
4. `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md` only
   when concrete brand assets need preparation or conversion.

Do not default to a full brand process when the user only asks for one asset,
one domain shortlist, one research pass, or one brand-kit section.

## Decision Rules

- If the task is mainly about a concrete UI, product screen, wireframe,
  design-system extraction, creative draft, or design handoff, use
  `chrisai-design` instead.
- If the task is mainly about logo generation or visual identity exploration,
  use this skill only for brand strategy, usage rules, asset preparation, or
  brand-kit framing; use a dedicated logo or design capability for the actual
  logo production when available.
- If the task is mainly about paid ads, launch planning, SEO, social content,
  or go-to-market execution, use a marketing-focused capability instead.
- If the task needs current public web information, verify it with live
  research before presenting findings as current.
- If the task involves domain availability, trademark risk, legal clearance,
  or corporate-name availability, state that results are research support and
  not legal advice or a final availability guarantee.
- If the task requires image conversion, inspect the source files first when
  they are available in the workspace and preserve the user's originals.

## Planned Workflow Behavior

When a matching workflow file is not implemented yet:

- Confirm the narrow requested deliverable before expanding the scope.
- Prefer concise, structured drafts over broad branding playbooks.
- Keep source-of-truth inputs explicit: product name, audience, category,
  competitors, existing website, logo files, colors, typography, domain
  constraints, and launch context.
- Mark assumptions clearly when brand inputs are incomplete.
- Recommend creating the relevant workflow file when the same task pattern
  becomes repeated or needs durable process guidance.

## Supporting References

- Use `references/master-format-selection.md` before deciding whether an SVG
  or PNG should be the master asset.
- Use `references/png-transparency-validation.md` before calling a PNG
  transparent.
- Use `references/svg-readiness.md` before treating an SVG as a clean vector
  master.
- Use `references/vectorization-suitability.md` before attempting PNG-to-SVG
  conversion.
- Use `references/favicon-qa.md` and `references/html-head-icons.md` before
  producing favicon or HTML-head icon deliverables.
- Use `references/prompt-artifacts.md` when a temporary SVG prompt artifact
  would help guide asset generation.
- Use `references/tld-finder.md`, `references/github-name-check.md`,
  `references/npm-org-check.md`, and `references/x-name-check.md` when the
  user needs usage guidance for the bundled availability scripts.
- Use `references/brand-research-report.md` during brand-research work that
  needs a structured brief, competitor profile, source table, or confidence
  labeling.
