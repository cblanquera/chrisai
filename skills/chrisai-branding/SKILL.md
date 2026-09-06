---
name: chrisai-branding
description: Use for brand identity support, guided greenfield or brownfield branding, brand research, competitor discovery, market positioning, naming and domain checks, logo generation guidance, brand strategy, voice, messaging, visual guidelines, brand kit generation, brand audits, launch readiness, transparent PNG preparation, and PNG/ICO conversion.
license: MIT
---

# ChrisAI Branding

Use this skill for branding work. Route the task to the narrowest future
internal workflow unless the request clearly needs a deliberate sequence.

Ask clarifying questions when the brand inputs are missing. Keep assumptions
explicit when working from incomplete product, market, audience, asset, or
launch context.

Do not treat this skill as a general design, logo, marketing, SEO, legal,
trademark, or business-strategy router. Use it when the primary deliverable is
brand identity support, brand asset conversion, naming/domain exploration,
brand research, logo generation, or brand kit creation.

## Internal Workflows

- Use `workflows/brand-guided-flow.md` when the user wants branding help but
  does not know where to start, is brand-new to branding, or needs a guided
  greenfield/brownfield path from current state to next steps.
- Use `workflows/brand-research.md` when the task is mainly about researching
  competitors, corporate websites, product positioning, category language,
  market position, or public brand signals and needs a full research brief or
  coordinated research pass.
- Use `workflows/competitor-discovery.md` when the task is mainly about
  finding, filtering, classifying, or shortlisting direct, indirect, or
  aspirational competitors.
- Use `workflows/competitor-profiling.md` when the task is mainly about
  profiling known competitors, brands, products, or corporate websites from
  source-backed evidence.
- Use `workflows/market-positioning-analysis.md` when the task is mainly about
  synthesizing competitor profiles into category patterns, positioning axes,
  white space, gaps, or differentiation opportunities.
- Use `workflows/brand-naming.md` when the task is mainly about creating,
  refining, evaluating, or shortlisting names for a brand, product, feature,
  project, campaign, or company.
- Use `workflows/tld-finder.md` when the task is mainly about finding,
  comparing, or shortlisting top-level domains for a brand, product, project,
  campaign, or company name.
- Use `workflows/brand-strategy.md` when the task is mainly about defining or
  refining brand purpose, promise, positioning, audience/profile implications,
  differentiation, values, or strategic principles.
- Use `workflows/brand-voice.md` when the task is mainly about defining voice
  traits, tone by channel, vocabulary, writing rules, or on-brand/off-brand
  language examples.
- Use `workflows/brand-messaging.md` when the task is mainly about one-liners,
  value propositions, message pillars, taglines, CTA language, boilerplate, or
  messaging hierarchy.
- Use `workflows/logo-generation.md` when the task is mainly about creating,
  refining, or iterating on a logo mark, wordmark, monogram, combination mark,
  app icon, or favicon-safe brand mark.
- Use `workflows/brand-visual-guidelines.md` when the task is mainly about
  color, typography, imagery, iconography, layout, asset usage rules,
  accessibility notes, or visual-system guidance.
- Use `workflows/brand-kit-generation.md` when the task is mainly about
  assembling strategy, audience/profile guidance, voice, messaging, visual
  guidelines, and usage rules into a bundled brand kit.
- Use `workflows/brand-kit-audit.md` when the task is mainly about reviewing
  an existing brand kit, brand guide, or brand documentation for completeness,
  consistency, gaps, and implementation readiness.
- Use `workflows/brand-consistency-review.md` when the task is mainly about
  checking whether a website, app UI, deck, README, docs page, marketplace
  listing, social profile, or other surface matches an existing brand kit or
  brand direction.
- Use `workflows/brand-refresh.md` when the task is mainly about updating or
  modernizing an existing brand while preserving useful equity.
- Use `workflows/brand-source-of-truth.md` when the task is mainly about
  organizing scattered brand docs, assets, exports, naming notes, or research
  into canonical, draft, deprecated, and generated materials.
- Use `workflows/brand-asset-audit.md` when the task is mainly about auditing
  existing brand asset files for master format, SVG/PNG quality, transparency,
  favicon readiness, export gaps, or implementation handoff.
- Use `workflows/brand-launch-readiness.md` when the task is mainly about
  checking whether a brand is ready to publish, announce, hand off, or use
  publicly.
- Use `workflows/transparent-pngs.md` when the task is mainly about creating,
  cleaning up, exporting, or preparing transparent PNG assets.
- Use `workflows/png-ico-conversion.md` when the task is mainly about
  converting PNG files to ICO files or ICO files to PNG files, including
  favicon-oriented image sets.

## Sequencing

Only chain planned workflows when the user asks for a broader brand package or
when one deliverable clearly depends on another. Use this order:

1. `workflows/brand-guided-flow.md` first when the user does not know which
   branding workflow they need or asks for a guided greenfield/brownfield path.
2. `workflows/brand-research.md` first when brand positioning, competitor
   context, category conventions, or market language are unknown.
3. Within research, use `workflows/competitor-discovery.md`,
   `workflows/competitor-profiling.md`, and
   `workflows/market-positioning-analysis.md` as narrower components when the
   user only needs one part of the research process.
4. `workflows/brand-naming.md` when names need to be generated, evaluated, or
   shortlisted.
5. `workflows/tld-finder.md` when naming or domain options need to be checked
   before committing to a brand direction.
6. `workflows/brand-strategy.md` when purpose, promise, positioning,
   differentiation, or audience implications are missing.
7. `workflows/brand-voice.md` and `workflows/brand-messaging.md` when verbal
   identity or message assets need to be defined.
8. `workflows/brand-visual-guidelines.md` when visual usage rules and design
   implications need to be documented.
9. `workflows/logo-generation.md` when a logo mark, wordmark, monogram, app
   icon, or favicon-safe mark needs to be created or refined.
10. `workflows/brand-asset-audit.md` when existing asset files should be
   inspected before conversion, guidelines, or handoff.
11. `workflows/brand-source-of-truth.md` when docs, assets, exports, or notes
   are scattered and canonical sources need to be identified.
12. `workflows/brand-kit-audit.md` when an existing kit should be reviewed
   before revising or regenerating it.
13. `workflows/brand-refresh.md` when an existing brand needs a preserve/change
   map before narrower revision work.
14. `workflows/brand-kit-generation.md` when the component pieces should be
   assembled into one kit.
15. `workflows/brand-consistency-review.md` when a real surface should be
   checked against the brand kit or direction.
16. `workflows/brand-launch-readiness.md` before public publishing, launch,
   handoff, or use.
17. `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md` only
   when concrete brand assets need preparation or conversion.

Do not default to a full brand process when the user only asks for one asset,
one domain shortlist, one research pass, or one brand-kit section.

## Next-Step Guidance

Every branding workflow should end with one or two relevant next-step options
and a `stop here` option when the user's requested deliverable is complete.
Recommend the narrowest useful next workflow. Do not automatically continue
into the next workflow unless the user asks to continue.

## Decision Rules

- If the task is mainly about a concrete UI, product screen, wireframe,
  design-system extraction, creative draft, or design handoff, route it to an
  appropriate design workflow instead.
- If the task is mainly about broad visual identity exploration beyond logo
  marks and usage guidance, use this skill for brand strategy, logo workflow,
  usage rules, asset preparation, or brand-kit framing; use a design
  capability for broader rendered visual systems when needed.
- If the task is mainly about paid ads, launch planning, SEO, social content,
  or go-to-market execution, use a marketing-focused capability instead.
- If the task needs current public web information, verify it with live
  research before presenting findings as current.
- If the task involves domain availability, trademark risk, legal clearance,
  or corporate-name availability, state that results are research support and
  not legal advice or a final availability guarantee.
- If the task requires image conversion, inspect the source files first when
  they are available in the workspace and preserve the user's originals.

## Workflow Behavior

- Confirm the narrow requested deliverable before expanding the scope.
- During logo generation, use separately addressable SVG files as the working
  candidate format from the first review set through explicit logo approval.
  Do not substitute PNG logo candidates or PNG refinement baselines. Raster
  images may support research or visual reference, but convert the accepted
  idea into a real, editable SVG before presenting it as a selectable logo.
  Create PNG derivatives only after the user approves the SVG logo.
- When a logo request includes a reference image, classify the reference before
  generating: inspiration, structural reference, edit target, or vectorization
  source. Read and apply `references/logo-reference-led-generation.md`. Do not
  treat a polished raster reference as a prompt for improvised, hand-authored
  SVG geometry. Establish a preserve/change/avoid contract in concrete visual
  language, then use a reference-aware visual or vector-capable path that can
  meet the fidelity requirement. If the active environment cannot do that,
  stop at the construction brief instead of presenting low-confidence SVGs.
- Immediately after the user selects a logo candidate, describe the visible
  logo anatomy in the agent's concrete visual terms before acting on refinement
  instructions. Name and count the shapes, groups, colors, positions, spatial
  relationships, projection, and negative spaces; pair technical vocabulary
  with the user's words so both parties share the same component language. If
  that anatomy was already supplied with the review set, reuse it rather than
  forcing a second terminology round; confirm the exact requested target and
  proceed when it is unambiguous.
- Whenever any logo is presented for review, including a first-pass set, a
  one-off logo, or a refinement set, include a concise anatomy and terminology
  description for every candidate in that same response. Name the primary
  silhouette, visible component groups, construction logic, important negative
  spaces, and useful SVG IDs; pair technical terms with plain-language
  explanations. The user should be able to select a candidate and request a
  targeted modification in their very next message.
- For post-selection logo edits, treat the entire accepted mark as locked by
  default. If the user's target phrase could plausibly identify more than one
  visible component, resolve that ambiguity before rendering; do not invent an
  edit target from the concept rationale or specification.
- Prefer concise, structured drafts over broad branding playbooks.
- Keep source-of-truth inputs explicit: product name, audience, category,
  competitors, existing website, logo files, colors, typography, domain
  constraints, and launch context.
- Mark assumptions clearly when brand inputs are incomplete.

## Supporting References

- Use `references/brand-research-report.md` during brand-research work that
  needs a structured brief, competitor profile, source table, or confidence
  labeling.
- Use `references/brand-kit-template.md` during brand-kit work that needs a
  structured kit, mini kit, or implementation handoff template.
- Use `references/logo-concept-artifacts.md` whenever logo work creates
  multiple SVG candidates or a comparison board. It defines self-describing
  SVG candidates, the lean board-map package, and the required review-response
  terminology handoff.
- Use `references/logo-visual-concept-board.md` before creating first-pass
  visual logo concepts that should be judged as a polished concept board.
- Use `references/logo-reference-led-generation.md` whenever an attached logo,
  sketch, screenshot, raster image, or existing mark materially guides a new
  logo candidate. It defines reference roles, the interpretation checkpoint,
  capability gate, SVG delivery boundary, and reference-fidelity review.
- Use `references/logo-iterative-refinement.md` after a logo candidate is
  selected or whenever an existing logo image or vector asset should be
  revised without losing its accepted identity. It defines the required visual
  target gate, whole-mark lock, allowed-change region, and comparison evidence.
- Use `references/logo-generation.md` during logo work that needs concept
  methods, SVG standards, review checklists, or favicon-safe handoff guidance.
- Use `references/logo-analysis.md` when an existing SVG or PNG logo should be
  analyzed before logo refinement, visual guidelines, or brand-kit assembly.
- Use `references/tld-finder.md`, `references/github-name-check.md`,
  `references/npm-org-check.md`, and `references/x-name-check.md` when the
  user needs usage guidance for the bundled availability scripts.
- Use `references/master-format-selection.md` for non-logo brand assets or when
  evaluating an imported source. Logo generation uses SVG as its working and
  approved master format.
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
