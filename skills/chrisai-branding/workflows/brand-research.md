# Brand Research

Use this workflow when the main problem is researching competitors, corporate
websites, product positioning, category language, market position, or public
brand signals so a brand decision can be made from evidence.

This workflow orchestrates brand research. It produces a source-backed brief,
not comparison-page copy, sales battle cards, SEO pages, logo concepts, or a
final brand kit. Use the output as an input to
`workflows/brand-kit-generation.md` when strategy, voice, and guidelines need
to be created next.

## Ownership

This workflow owns:

- brand and competitor research intake
- research depth and scope decisions
- routing to competitor discovery, competitor profiling, and market
  positioning analysis
- source-backed brand research brief assembly
- handoff recommendations for brand kit generation

This workflow does not own:

- standalone competitor discovery; use `workflows/competitor-discovery.md`
- standalone competitor profiling; use `workflows/competitor-profiling.md`
- standalone market positioning analysis; use
  `workflows/market-positioning-analysis.md`
- writing competitor alternative pages or SEO comparison pages
- sales battle cards or objection-handling collateral
- deep customer interview or survey analysis
- paid ads, launch plans, social calendars, or content strategy
- logo generation, image generation, or visual identity production
- legal, trademark, domain purchase, or corporate-name clearance

When the task is mainly about brand kit creation after research, hand off to
`workflows/brand-kit-generation.md`.

When the task is mainly about current domain, GitHub, npm, or X name checks,
use `workflows/tld-finder.md` and the bundled availability scripts instead.

## Workflow

Work through these steps in order:

1. Check existing context.
2. Complete only the missing intake.
3. Choose a research depth.
4. Route missing research components.
5. Assemble the brand research brief.
6. Preserve reusable research artifacts when useful.
7. State next-step handoff options.

Do not synthesize brand claims from memory. If current public information
matters, use live research and cite source URLs.

## Step 1: Check Existing Context

Before asking questions, look for existing context when the workspace can be
inspected:

- existing product, marketing, brand, or research documents
- existing website, landing page, app, product, pricing, docs, or about pages
- prior competitor lists, market notes, screenshots, briefs, or source tables
- brand kits, messaging guides, positioning docs, launch notes, or strategy
  docs
- workspace folders whose names suggest research, brand, marketing,
  positioning, competitors, or planning material

Use existing context first. Ask only for missing inputs that would materially
change the research scope.

If no workspace context exists, ask for the minimum useful intake rather than
dumping every question at once.

## Step 2: Intake

Capture or infer these fields.

### Subject

- brand, company, product, or idea being researched
- primary website or product URL, if any
- status: existing business, new product, rebrand, naming exploration, or
  category exploration

### Research Goal

Identify the decision this research should support. If asking the user, offer
suggestions such as:

- positioning
- brand kit generation
- naming, domain, or social-handle choice
- website or messaging rewrite
- competitive differentiation
- launch planning
- investor or customer landscape
- other explicit user goal

### Market Context

Ask for the market frame only when it is not already clear. Suggest concise
options, for example:

- category: SaaS, developer tool, agency/service, marketplace, ecommerce,
  consumer app, local business, creator brand, nonprofit, or other
- target customer: founders, developers, marketers, enterprises, SMBs,
  consumers, creators, agencies, local customers, or another audience
- geography/language: global, US, EU, local city/region, English-only,
  multilingual, or another market
- stage: idea, MVP, launched product, rebrand, category expansion, or naming
  exploration

### Competitors

- known competitors
- whether additional competitors should be discovered
- competitor types to include: direct, indirect, aspirational
- number of competitors to analyze

### Focus Areas

Ask whether any dimensions matter more than others. Suggest:

- positioning and category language
- homepage or website messaging
- pricing and packaging
- product capabilities and proof points
- customer reviews and voice-of-customer language
- SEO, content, or AI/search visibility
- visual identity signals
- launch, rebrand, or naming implications

### Evidence Scope

Confirm how broad the evidence should be. If asking the user, suggest:

- lean scope: official websites only
- standard scope: official websites plus pricing, product pages, customer
  proof, and selective directories or reviews
- technical-product scope: docs, changelogs, help centers, GitHub, npm, or API
  pages where relevant
- perception scope: review sites, directories, app stores, press, social,
  communities, or public discussions
- visibility scope: search or AI-answer visibility signals when discoverability
  is part of the decision

### Output

Confirm the deliverable. If asking the user, suggest:

- competitor matrix
- brand research brief
- positioning map
- messaging analysis
- market white-space report
- input for brand kit generation

If unclear, default to a standard brand research brief.

## Step 3: Choose Research Depth

Use the lightest depth that supports the decision.

### Quick Scan

Use for early direction or a short list.

- Analyze up to 3 competitors.
- Use official websites first.
- Inspect homepage, product/features, pricing when public, and about page.
- Output an abbreviated brief with competitor matrix, positioning signals,
  repeated language, and initial opportunities.

### Standard Brief

Use by default.

- Analyze 3-5 competitors.
- Use official websites plus selective third-party sources.
- Include customer proof, reviews/directories, docs/help/changelog, or press
  only when relevant.
- Output a full brand research brief with source-backed synthesis.

### Deep Landscape

Use only when requested or when the category is unclear.

- Analyze a broader competitor set, then shortlist.
- Include direct, indirect, and aspirational competitors.
- Use official sites, third-party perception sources, review mining,
  category pages, and search/AI visibility signals where useful.
- Output individual competitor profiles plus a market-level synthesis.

If the user lists 10 or more competitors, recommend shortlisting the top 5
before deep analysis.

## Step 4: Route Missing Research Components

Use the narrow research workflows as needed:

- `workflows/competitor-discovery.md` when competitors need to be found,
  filtered, classified, or shortlisted.
- `workflows/competitor-profiling.md` when known competitors need consistent
  source-backed profiles.
- `workflows/market-positioning-analysis.md` when competitor profiles need to
  be synthesized into category patterns, positioning axes, white space, gaps,
  or differentiation opportunities.

For a full brief, the normal sequence is discovery when needed, then
profiling, then market positioning analysis, then report assembly.

Skip any component that is already complete or outside the user's requested
scope. Do not run broad research when the user only asked for one known
competitor profile or a narrow positioning read.

## Step 5: Assemble The Brief

Use `references/brand-research-report.md` for the report structure.

The default deliverable is a source-backed brand research brief with:

- executive summary
- research scope
- competitor set and classification
- competitor matrix
- positioning map or narrative
- messaging patterns
- product and proof patterns
- voice and tone patterns
- visual identity signals
- market gaps
- differentiation opportunities
- risks and unknowns
- recommendations for brand kit generation
- sources

When saving files, ask for the target path unless the project already has a
clear research workspace. If none is specified and a file artifact is needed,
use a generic project-local path such as `research/brand-research/` or another
existing research/brand folder that matches the workspace conventions.

## Step 6: Preserve Reusable Artifacts

For standard or deep research runs, preserve enough raw notes for later audit
or reuse when the user wants files saved.

Use a simple project-local structure such as:

```text
research/brand-research/
├── raw/
│   └── [date]/
│       └── [competitor-or-source].md
├── brand-research-brief.md
└── sources.md
```

Do not overwrite prior dated research snapshots. If updating an existing
research brief, check pricing, homepage positioning, product pages,
changelog/news, and review/perception sources first because those are likely
to drift. Note what changed since the prior version when that comparison is
available.

Skip raw-file preservation for quick scans unless the user asks for saved
artifacts.

## Step 7: Handoff

End with the next useful step:

- use `workflows/brand-kit-generation.md` when the user wants strategy,
  profiles, voice, or guidelines from the research
- use the TLD and platform availability scripts when naming options need
  domain, GitHub, npm, or X checks
- use a marketing or copywriting workflow when the user wants pages, ads,
  launch plans, content, or sales collateral
- use a design workflow when the user wants visual-system exploration,
  wireframes, or design drafts

Do not automatically continue into a brand kit, website copy, or visual design
unless the user asks for that next deliverable.

## Review Gate

Before treating the research as complete, confirm:

- Did every material claim have a source or a clear inference label?
- Were direct, indirect, and aspirational competitors separated when relevant?
- Were current public claims verified live when current accuracy matters?
- Were confidence levels used for non-obvious conclusions?
- Did the output support the user's stated decision?
- Were open questions and research gaps called out instead of hidden?
