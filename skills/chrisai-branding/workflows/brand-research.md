# Brand Research

Use this workflow when the main problem is researching competitors, corporate
websites, product positioning, category language, market position, or public
brand signals so a brand decision can be made from evidence.

This workflow produces brand research, not comparison-page copy, sales battle
cards, SEO pages, logo concepts, or a final brand kit. Use the output as an
input to `workflows/brand-kit-generation.md` when strategy, voice, and
guidelines need to be created next.

## Ownership

This workflow owns:

- brand and competitor research intake
- competitor set discovery and classification
- official-site and public-source evidence collection
- positioning, messaging, voice, proof, and market-gap synthesis
- source-backed brand research briefs
- handoff recommendations for brand kit generation

This workflow does not own:

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
4. Build and classify the competitor set.
5. Collect evidence from consistent sources.
6. Extract brand signals.
7. Synthesize market position and white space.
8. Produce the brand research brief.
9. State next-step handoff options.

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

## Step 4: Build The Competitor Set

Classify competitors before analysis:

- Direct competitors target the same customer with a similar solution.
- Indirect competitors solve the same customer problem with a different
  approach.
- Aspirational competitors are category leaders or reference brands worth
  learning from even when they are not direct rivals.

If discovering competitors, use multiple signals:

- category searches
- official category pages and listicles
- review directories
- Product Hunt or app directories when relevant
- public customer language about alternatives
- search results for "[category] software", "[product] alternative", and
  "[problem] tool" style queries

Do not treat search ranking alone as proof that a company is a true
competitor. Confirm relevance from the company's own positioning and product.

## Step 5: Collect Evidence

For each competitor, use consistent source types so profiles can be compared.

Preferred official sources:

- homepage
- product or features pages
- pricing page
- about or company page
- customers, case studies, testimonials, or logos
- docs, help center, integrations, API pages, changelog, or GitHub/npm pages
  when the product is technical

Optional perception sources:

- review sites and directories
- app stores or marketplaces
- Product Hunt or launch pages
- press and interviews
- social, Reddit, forums, or community discussions
- AI/search visibility checks when the user's goal needs them

For each source, capture:

- URL
- page or source type
- date checked
- relevant evidence
- whether the point is a fact, quote, or inference

Use third-party sources for market perception and customer language. Do not
use them as unquestioned proof of product truth.

## Step 6: Extract Brand Signals

For each competitor, extract:

- category label
- target customer
- primary value proposition
- positioning angle
- headline and key message themes
- product promise and core capabilities
- proof points and credibility signals
- pricing or packaging signals when public
- brand voice and tone
- visual identity cues visible from public sources
- customer language or perception signals when available
- strengths, weaknesses, and notable gaps
- confidence level for each meaningful inference

Label confidence:

- High: supported by multiple current official sources or strong direct
  evidence.
- Medium: supported by one official source or multiple weaker third-party
  signals.
- Low: inferred from limited, stale, unclear, or single-source evidence.

Avoid presenting a low-confidence inference as a fact.

## Step 7: Synthesize Market Position

After extracting individual competitors, compare across the set.

Identify:

- repeated category language
- overused claims
- common value propositions
- credibility signals everyone relies on
- pricing or packaging patterns
- tone and voice patterns
- visual identity patterns
- underserved customer segments
- underused proof points
- white-space positioning opportunities
- risks, unknowns, and assumptions

Use positioning axes that fit the category, such as:

- simple vs comprehensive
- technical vs approachable
- premium vs value
- enterprise vs self-serve
- niche vs broad platform
- speed vs control
- automation vs human service

Do not force a positioning map when the evidence does not support one.

## Step 8: Produce The Brief

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

## Step 9: Handoff

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
