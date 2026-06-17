# Competitor Discovery

Use this workflow when the main problem is finding, filtering, classifying, or
shortlisting competitors for brand research.

This workflow produces a competitor set, not full competitor profiles,
positioning synthesis, comparison-page copy, sales battle cards, or legal
clearance.

## Ownership

This workflow owns:

- competitor discovery strategy
- candidate list creation
- relevance filtering
- direct, indirect, and aspirational classification
- shortlist recommendations for profiling

This workflow does not own:

- source-backed competitor profiles; use `workflows/competitor-profiling.md`
- market-level synthesis; use `workflows/market-positioning-analysis.md`
- final brief assembly; use `workflows/brand-research.md`

## Workflow

Work through these steps in order:

1. Define the discovery target.
2. Gather candidate competitors.
3. Classify competitors.
4. Filter and shortlist.
5. Preserve the rationale.

## Step 1: Define The Discovery Target

Capture or infer:

- subject brand, product, company, or idea
- category and adjacent categories
- target customer
- geography/language market
- whether to include direct, indirect, aspirational, or all three
- desired shortlist size

If these are unclear, ask with suggestions instead of open-ended forms.

## Step 2: Gather Candidates

Use multiple discovery signals when current public information matters:

- category searches
- official category pages and listicles
- review directories
- Product Hunt, app stores, marketplaces, or package registries when relevant
- public customer language about alternatives
- search results for "[category] software", "[product] alternative", and
  "[problem] tool" style queries
- known competitors supplied by the user or workspace context

Do not treat search ranking alone as proof that a company is a true
competitor. Confirm relevance from the company's own positioning, product, and
audience.

## Step 3: Classify Competitors

Classify before analysis:

- Direct competitors target the same customer with a similar solution.
- Indirect competitors solve the same customer problem with a different
  approach.
- Aspirational competitors are category leaders or reference brands worth
  learning from even when they are not direct rivals.

When classification is uncertain, label the uncertainty and explain what would
confirm or reject the candidate.

## Step 4: Filter And Shortlist

Prioritize candidates by:

- relevance to the same customer and problem
- category visibility or market influence
- similarity or contrast to the subject brand
- usefulness for the user's research goal
- availability of current public evidence

If the candidate set has 10 or more competitors, recommend a top 5 shortlist
before deep profiling.

## Step 5: Preserve The Rationale

Output a concise table:

| Competitor | URL | Type | Why Included | Profile? | Confidence |
| --- | --- | --- | --- | --- | --- |
| [Name] | [URL] | Direct / Indirect / Aspirational | [Reason] | Yes / No / Maybe | High / Medium / Low |

End by recommending whether to continue to
`workflows/competitor-profiling.md` or return to `workflows/brand-research.md`
for brief assembly.
