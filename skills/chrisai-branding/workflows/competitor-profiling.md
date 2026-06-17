# Competitor Profiling

Use this workflow when the main problem is creating consistent,
source-backed profiles for known competitors, brands, products, or corporate
websites.

This workflow produces competitor profiles, not competitor discovery,
market-level positioning synthesis, comparison-page copy, sales battle cards,
or final brand kits.

## Ownership

This workflow owns:

- official-site and public-source evidence collection
- consistent source notes for each competitor
- positioning, messaging, voice, proof, product, pricing, and visual signal
  extraction
- confidence labels and source caveats

This workflow does not own:

- finding the competitor set; use `workflows/competitor-discovery.md`
- synthesizing the full market position; use
  `workflows/market-positioning-analysis.md`
- assembling the final research brief; use `workflows/brand-research.md`

## Workflow

Work through these steps in order:

1. Confirm competitors and scope.
2. Collect comparable evidence.
3. Extract brand signals.
4. Label confidence and caveats.
5. Produce profiles.

## Step 1: Confirm Competitors And Scope

Capture or infer:

- competitors to profile
- profile depth: quick, standard, or deep
- focus areas: positioning, messaging, pricing, proof, voice, visual signals,
  customer language, technical signals, or all relevant dimensions
- evidence scope: official only, standard, technical-product, perception, or
  visibility scope

Ask for source URLs when names are ambiguous.

## Step 2: Collect Comparable Evidence

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
- freshness or staleness concerns when visible

Use third-party sources for market perception and customer language. Do not
use them as unquestioned proof of product truth.

## Step 3: Extract Brand Signals

For each competitor, extract:

- category label
- target customer
- primary value proposition
- positioning angle
- headline and key message themes
- product promise and core capabilities
- proof points and credibility signals
- pricing or packaging signals when public
- switching, pain, trigger, or alternative language when available
- brand voice and tone
- visual identity cues visible from public sources
- customer language or perception signals when available
- strengths, weaknesses, and notable gaps
- confidence level for each meaningful inference

## Step 4: Label Confidence And Caveats

Label confidence:

- High: supported by multiple current official sources or strong direct
  evidence.
- Medium: supported by one official source or multiple weaker third-party
  signals.
- Low: inferred from limited, stale, unclear, or single-source evidence.

For perception sources, account for sample bias:

- reviews overrepresent strong opinions and power users
- support or complaint-heavy sources overrepresent friction
- Reddit, Hacker News, and technical forums may skew more skeptical or
  technical than the mainstream market
- press and launch posts may overrepresent aspirational positioning

Weight recent sources more heavily when markets, pricing, products, or claims
change quickly. Flag old, undated, or unverifiable evidence instead of treating
it as current.

Avoid presenting a low-confidence inference as a fact.

## Step 5: Produce Profiles

Use this shape for each profile:

```markdown
## [Competitor Name]

- **URL:** [URL]
- **Type:** Direct / Indirect / Aspirational
- **Category label:** [how they frame themselves]
- **Target customer:** [evidence-backed summary]
- **Primary value proposition:** [source-backed summary]
- **Positioning angle:** [source-backed summary]
- **Messaging themes:** [themes]
- **Product/proof signals:** [features, proof, customers, results]
- **Pricing/packaging:** [public signal or unknown]
- **Voice and tone:** [evidence-backed summary]
- **Visual identity cues:** [public visible cues]
- **Strengths:** [source-backed strengths]
- **Weaknesses or gaps:** [source-backed or clearly labeled inference]
- **Sources:** [URLs]
- **Confidence:** High / Medium / Low
```

End by recommending whether to continue to
`workflows/market-positioning-analysis.md` or return to
`workflows/brand-research.md` for brief assembly.
