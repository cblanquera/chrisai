# ChrisAI Branding

ChrisAI Branding is the consolidated branding skill. Use it when a request is
about brand research, naming, domain checks, strategy, voice, messaging, logo
direction, visual guidelines, brand kits, brand audits, launch readiness, or
brand asset preparation.

Source skill: [`skills/chrisai-branding`](../skills/chrisai-branding/SKILL.md)

## Terms

- Greenfield means the brand is starting from a new idea, product, project, or
  company with no settled identity yet.
- Brownfield means the brand already has a name, logo, website, asset folder,
  brand guide, messaging, or public surface that needs review or improvement.
- Mixed means some pieces exist, but the usable source of truth is unclear.
- Brand research means source-backed research into competitors, category
  language, product positioning, market signals, and differentiation.
- Brand strategy means the core brand decisions: audience, promise,
  positioning, differentiation, proof, values, and principles.
- Brand voice is how the brand sounds. It covers tone, vocabulary, writing
  rules, and on-brand or off-brand examples.
- Brand messaging is what the brand says. It covers one-liners, value
  propositions, message pillars, CTAs, taglines, and boilerplate.
- Visual guidelines define how the brand should look across color, typography,
  logo usage, imagery, iconography, layout, accessibility, and asset rules.
- A brand kit is the packaged identity system. It combines strategy, audience
  guidance, voice, messaging, visual guidelines, usage rules, and handoff notes.
- Source of truth means the canonical brand files or documents that should be
  trusted over drafts, old exports, generated assets, or ad hoc notes.
- Launch readiness means the brand is ready enough to publish, announce, hand
  off, or use publicly.

## How Routing Works

The skill routes to the narrowest workflow that fits the request. It should not
run a full branding process when the user only asks for one deliverable, such
as a domain shortlist, a logo draft, a competitor matrix, or a brand-kit audit.

Every workflow should end with one or two useful next-step options and a
`stop here` option. The agent should not continue into the next workflow unless
the user asks to continue.

When current public information matters, such as competitor research, category
positioning, websites, or domain availability, the agent should verify with
live research before presenting findings as current.

## When This Skill Activates

### Guided Branding Flow

Use this workflow when the user wants branding help but does not know where to
start, is unfamiliar with branding, or needs help choosing between a greenfield
or brownfield path.

What happens:

- The agent identifies whether the starting state is greenfield, brownfield, or
  mixed.
- The agent asks what the user wants to leave with, such as clear next steps,
  research, naming, messaging, a logo direction, a brand kit, or cleaned-up
  assets.
- The agent chooses one narrow next workflow instead of expanding into a full
  brand process by default.
- The agent ends with a recommended next step, an alternate next step, and a
  stop-here option.

Primary workflow:
[`workflows/brand-guided-flow.md`](../skills/chrisai-branding/workflows/brand-guided-flow.md)

### Brand Research

Use this workflow when the request asks for a full source-backed research pass
covering competitors, corporate websites, product positioning, category
language, market position, or public brand signals.

What happens:

- The agent defines the research goal, market context, evidence scope, and
  expected output.
- The agent separates direct competitors, indirect competitors, and
  aspirational references.
- The agent gathers public evidence from current sources when needed.
- The agent synthesizes category patterns, market position, gaps, and
  implications for strategy, naming, messaging, or a brand kit.
- The agent labels confidence and source quality.

Primary workflow:
[`workflows/brand-research.md`](../skills/chrisai-branding/workflows/brand-research.md)

### Competitor Discovery

Use this workflow when the user needs to find, filter, classify, or shortlist
competitors before doing deeper research.

What happens:

- The agent starts from the product, category, audience, geography, and known
  competitors.
- The agent builds a candidate list from public sources when current evidence
  is needed.
- The agent classifies candidates as direct, indirect, adjacent, substitute, or
  aspirational.
- The agent recommends which competitors deserve deeper profiling.

Primary workflow:
[`workflows/competitor-discovery.md`](../skills/chrisai-branding/workflows/competitor-discovery.md)

### Competitor Profiling

Use this workflow when known competitors, brands, products, or corporate
websites need deeper source-backed profiles.

What happens:

- The agent gathers evidence from each competitor's website, product pages,
  pricing, docs, marketplace listings, social profiles, or credible third-party
  sources.
- The agent summarizes positioning, audience, offer, proof, messaging, visual
  signals, pricing cues, and differentiation.
- The agent separates observed evidence from interpretation.
- The agent produces profiles that can feed research synthesis or positioning.

Primary workflow:
[`workflows/competitor-profiling.md`](../skills/chrisai-branding/workflows/competitor-profiling.md)

### Market Positioning Analysis

Use this workflow when the user has competitor evidence and needs category
patterns, positioning axes, white space, gaps, or differentiation
opportunities.

What happens:

- The agent compares competitor profiles across audience, promise, offer,
  category language, proof, pricing cues, and visual/verbal signals.
- The agent identifies crowded claims, underused positions, category
  conventions, and possible white space.
- The agent translates findings into positioning options and strategic
  implications.

Primary workflow:
[`workflows/market-positioning-analysis.md`](../skills/chrisai-branding/workflows/market-positioning-analysis.md)

### Brand Naming

Use this workflow when the request is about creating, refining, evaluating, or
shortlisting names for a brand, product, feature, project, campaign, or
company.

What happens:

- The agent gathers naming constraints, audience, category, tone, language,
  geography, and words to avoid.
- The agent generates name directions and evaluates them against fit,
  memorability, pronunciation, extensibility, and obvious risk.
- The agent shortlists names and calls out domain, handle, trademark, and legal
  uncertainty as research support, not final clearance.

Primary workflow:
[`workflows/brand-naming.md`](../skills/chrisai-branding/workflows/brand-naming.md)

### TLD And Platform Availability

Use this workflow when naming or brand exploration requires domain, TLD,
GitHub, npm, or X handle checks.

What happens:

- The agent normalizes candidate names and TLDs.
- The agent uses bundled scripts when the user wants concrete bulk checks.
- The agent treats RDAP, public profile, registry, and platform checks as
  practical availability signals, not legal or final registration guarantees.
- The agent returns a shortlist with confidence notes and follow-up checks.

Primary workflow:
[`workflows/tld-finder.md`](../skills/chrisai-branding/workflows/tld-finder.md)

### Brand Strategy

Use this workflow when the request is about purpose, promise, audience,
positioning, differentiation, proof, values, or strategic principles.

What happens:

- The agent clarifies audience, market context, product value, alternatives,
  and proof.
- The agent drafts positioning, promise, audience profiles, differentiation,
  values, and strategic rules.
- The agent marks assumptions when research is incomplete.
- The agent prepares strategy inputs for voice, messaging, visual guidelines,
  or a brand kit.

Primary workflow:
[`workflows/brand-strategy.md`](../skills/chrisai-branding/workflows/brand-strategy.md)

### Brand Voice

Use this workflow when the request is about tone, vocabulary, writing rules,
channel tone, or on-brand and off-brand language examples.

What happens:

- The agent defines voice traits and what each trait means in practice.
- The agent maps tone changes by channel or situation.
- The agent documents vocabulary to use, avoid, or explain carefully.
- The agent provides examples that writers can apply.

Primary workflow:
[`workflows/brand-voice.md`](../skills/chrisai-branding/workflows/brand-voice.md)

### Brand Messaging

Use this workflow when the request is about one-liners, value propositions,
message pillars, taglines, CTAs, boilerplate, or messaging hierarchy.

What happens:

- The agent gathers audience, positioning, proof, product details, and channel
  constraints.
- The agent drafts or refines messaging assets.
- The agent organizes messages by hierarchy, audience, use case, or channel.
- The agent keeps messaging consistent with strategy and voice when those
  inputs exist.

Primary workflow:
[`workflows/brand-messaging.md`](../skills/chrisai-branding/workflows/brand-messaging.md)

### Logo Generation

Use this workflow when the request is about creating, refining, or iterating on
a logo mark, wordmark, monogram, combination mark, app icon, or favicon-safe
brand mark.

What happens:

- The agent gathers strategy, name, visual constraints, usage contexts, and
  existing logo assets when available.
- The agent creates reviewable logo directions, usually as SVG drafts.
- When browser preview is available, the agent shows SVG drafts in a browser
  review page with light/dark backgrounds and small-size checks.
- The agent separates logo generation from the broader brand-kit assembly.

Primary workflow:
[`workflows/logo-generation.md`](../skills/chrisai-branding/workflows/logo-generation.md)

### Brand Visual Guidelines

Use this workflow when the request is about color, typography, logo usage,
imagery, iconography, layout, accessibility, or visual-system rules.

What happens:

- The agent gathers visual inputs such as logo files, colors, typefaces,
  screenshots, existing guidelines, and product surfaces.
- The agent defines usage rules and constraints for practical implementation.
- The agent may use logo analysis evidence when existing logo files should
  shape the visual rules.
- The agent prepares visual sections for a brand kit or implementation handoff.

Primary workflow:
[`workflows/brand-visual-guidelines.md`](../skills/chrisai-branding/workflows/brand-visual-guidelines.md)

### Brand Kit Generation

Use this workflow when the user wants a bundled brand kit or a structured
package of strategy, audience guidance, voice, messaging, visual guidelines,
and usage rules.

What happens:

- The agent identifies which pieces already exist and which are missing.
- The agent assembles approved or available components into a coherent kit.
- The agent uses a mini-kit or full-kit structure depending on scope.
- The agent does not treat logo generation as part of the kit unless a logo has
  already been approved or the user explicitly asks to create one first.

Primary workflow:
[`workflows/brand-kit-generation.md`](../skills/chrisai-branding/workflows/brand-kit-generation.md)

### Brand Kit Audit

Use this workflow when an existing brand kit, brand guide, or brand
documentation needs a completeness, consistency, gap, or implementation
readiness review.

What happens:

- The agent inventories the kit's strategy, audience, voice, messaging, visual,
  asset, and usage-rule sections.
- The agent identifies contradictions, missing decisions, vague guidance, and
  implementation blockers.
- The agent recommends fixes before regenerating or expanding the kit.

Primary workflow:
[`workflows/brand-kit-audit.md`](../skills/chrisai-branding/workflows/brand-kit-audit.md)

### Brand Consistency Review

Use this workflow when a website, app UI, deck, README, docs page, marketplace
listing, social profile, or other surface should be checked against an
existing brand kit or direction.

What happens:

- The agent identifies the brand source of truth and review target.
- The agent checks message, tone, visual usage, hierarchy, asset usage, and
  audience fit.
- The agent reports mismatches and recommends concrete corrections.

Primary workflow:
[`workflows/brand-consistency-review.md`](../skills/chrisai-branding/workflows/brand-consistency-review.md)

### Brand Refresh

Use this workflow when an existing brand needs modernization or correction
while preserving useful equity.

What happens:

- The agent identifies what should be preserved, changed, retired, or tested.
- The agent compares current brand signals with strategy, audience, market, and
  asset quality.
- The agent creates a preserve/change map before narrower revision work.

Primary workflow:
[`workflows/brand-refresh.md`](../skills/chrisai-branding/workflows/brand-refresh.md)

### Brand Source Of Truth

Use this workflow when brand docs, assets, exports, naming notes, or research
are scattered and the canonical materials are unclear.

What happens:

- The agent inventories available materials.
- The agent classifies files or notes as canonical, draft, deprecated,
  generated, or unknown.
- The agent recommends which files should drive future research, kit work,
  guidelines, exports, or handoff.

Primary workflow:
[`workflows/brand-source-of-truth.md`](../skills/chrisai-branding/workflows/brand-source-of-truth.md)

### Brand Asset Audit

Use this workflow when existing brand asset files need review for master
format, SVG/PNG quality, transparency, favicon readiness, export gaps, or
implementation handoff.

What happens:

- The agent inspects available asset files without modifying originals.
- The agent checks whether SVG, PNG, ICO, and favicon outputs are suitable for
  their intended use.
- The agent identifies missing exports, quality problems, or conversion needs.

Primary workflow:
[`workflows/brand-asset-audit.md`](../skills/chrisai-branding/workflows/brand-asset-audit.md)

### Brand Launch Readiness

Use this workflow when a brand needs to be checked before public publishing,
announcement, implementation handoff, or rollout.

What happens:

- The agent checks whether strategy, naming, domains, messaging, visual rules,
  assets, and handoff materials are ready enough for the intended use.
- The agent separates blockers from nice-to-have improvements.
- The agent calls out legal, trademark, domain, or registration uncertainty.

Primary workflow:
[`workflows/brand-launch-readiness.md`](../skills/chrisai-branding/workflows/brand-launch-readiness.md)

### Transparent PNGs

Use this workflow when the request is about creating, cleaning up, exporting,
or preparing transparent PNG assets.

What happens:

- The agent inspects source files when available.
- The agent validates alpha-channel behavior when transparency matters.
- The agent preserves originals and prepares the requested PNG outputs.

Primary workflow:
[`workflows/transparent-pngs.md`](../skills/chrisai-branding/workflows/transparent-pngs.md)

### PNG And ICO Conversion

Use this workflow when the request is about converting PNG files to ICO files
or ICO files to PNG files, including favicon-oriented asset sets.

What happens:

- The agent checks source format and intended destination.
- The agent prepares favicon-oriented outputs when needed.
- The agent validates the resulting icon files before handoff when practical.

Primary workflow:
[`workflows/png-ico-conversion.md`](../skills/chrisai-branding/workflows/png-ico-conversion.md)

## Internal References

The workflow files use references for specific standards:

- [`references/brand-research-report.md`](../skills/chrisai-branding/references/brand-research-report.md):
  research report structure, evidence standards, and confidence labels
- [`references/brand-kit-template.md`](../skills/chrisai-branding/references/brand-kit-template.md):
  brand kit, mini kit, and implementation handoff structure
- [`references/logo-generation.md`](../skills/chrisai-branding/references/logo-generation.md):
  logo concept methods, SVG standards, browser preview, and review checks
- [`references/logo-analysis.md`](../skills/chrisai-branding/references/logo-analysis.md):
  objective logo inspection guidance
- [`references/tld-finder.md`](../skills/chrisai-branding/references/tld-finder.md):
  bulk RDAP domain and TLD lookup usage
- [`references/github-name-check.md`](../skills/chrisai-branding/references/github-name-check.md):
  GitHub account or organization name checks
- [`references/npm-org-check.md`](../skills/chrisai-branding/references/npm-org-check.md):
  npm organization scope checks
- [`references/x-name-check.md`](../skills/chrisai-branding/references/x-name-check.md):
  X handle checks and confidence notes
- [`references/master-format-selection.md`](../skills/chrisai-branding/references/master-format-selection.md):
  SVG vs PNG master asset selection
- [`references/png-transparency-validation.md`](../skills/chrisai-branding/references/png-transparency-validation.md):
  PNG transparency validation
- [`references/svg-readiness.md`](../skills/chrisai-branding/references/svg-readiness.md):
  SVG readiness and cleanup checks
- [`references/vectorization-suitability.md`](../skills/chrisai-branding/references/vectorization-suitability.md):
  PNG-to-SVG suitability checks
- [`references/favicon-qa.md`](../skills/chrisai-branding/references/favicon-qa.md):
  favicon quality checks
- [`references/html-head-icons.md`](../skills/chrisai-branding/references/html-head-icons.md):
  HTML icon metadata guidance
- [`references/prompt-artifacts.md`](../skills/chrisai-branding/references/prompt-artifacts.md):
  temporary SVG prompt artifact guidance

## What This Skill Does Not Do

This skill does not provide legal advice, trademark clearance, final domain
availability guarantees, corporate registration checks, paid advertising
strategy, SEO planning, social calendars, or full go-to-market execution.

It also does not replace broader product design or implementation skills. Use
it for brand strategy, identity guidance, logo workflow, asset preparation, and
brand-kit framing; use design, frontend, marketing, or legal workflows when the
primary deliverable belongs there.
