# Brand Naming

Use this workflow when the main problem is creating, refining, evaluating, or
shortlisting names for a brand, product, project, feature, campaign, or
company.

This workflow produces naming strategy and candidate shortlists. It does not
guarantee domain availability, trademark clearance, corporate-name clearance,
or social-handle availability.

## Ownership

This workflow owns:

- naming intake and criteria
- name direction generation
- shortlist evaluation
- linguistic and category-fit review
- handoff to domain and platform availability checks

This workflow does not own:

- legal/trademark clearance
- corporate registration checks
- final purchase or registration decisions
- full brand strategy; use `workflows/brand-strategy.md`
- domain/RDAP checks; use `workflows/tld-finder.md`

## Workflow

Work through these steps in order:

1. Check existing strategy and constraints.
2. Define naming criteria.
3. Choose naming directions.
4. Generate candidate names.
5. Evaluate and shortlist.
6. Hand off availability checks.

## Step 1: Check Existing Strategy

Look for existing brand strategy, positioning, audience, category, messaging,
competitor research, prior name lists, domain constraints, or stakeholder
notes. Do not assume a particular folder exists.

If strategy, audience, or category is unclear, use `workflows/brand-strategy.md`
first or label naming work as provisional.

## Step 2: Define Criteria

Capture or infer:

- subject: company, product, feature, campaign, or sub-brand
- naming goal: new name, rename, shortlist, filter, or availability-driven
  exploration
- category and audience
- desired feel: technical, premium, playful, calm, bold, editorial, trusted,
  fast, minimal, friendly, or another direction
- constraints: word length, language, spelling, pronunciation, must-use words,
  banned words, initials, domain TLDs, or social/platform needs
- risk tolerance: descriptive, suggestive, abstract, coined, compound, acronym,
  or founder/personal name

When asking, offer concise options instead of open-ended forms.

## Step 3: Choose Naming Directions

Use 2-4 directions by default:

- descriptive: clearly states what it is
- suggestive: implies the benefit or mechanism
- metaphorical: borrows meaning from another domain
- compound: combines two familiar words or fragments
- coined: creates a distinct invented word
- acronym or initialism: useful only when already meaningful or pronounceable
- personal/founder-led: useful when reputation is the brand anchor

Tie each direction to the positioning and audience.

## Step 4: Generate Candidates

Generate enough candidates to compare, but do not flood the user.

For each promising candidate, include:

- name
- naming direction
- intended meaning
- pronunciation or spelling note when needed
- strengths
- risks
- likely domain/platform implications

Avoid:

- names that depend on hard-to-explain spelling
- names too close to direct competitors
- generic category words with no distinctiveness
- trendy AI or SaaS suffixes unless strategically justified
- names that conflict with the desired audience or price point

## Step 5: Evaluate And Shortlist

Score candidates against:

- clarity
- memorability
- category fit
- differentiation
- pronunciation
- spelling/search friction
- visual/logo potential
- domain and handle likelihood
- international or language concerns when relevant
- confidence and open risks

Output a shortlist with rationale and tradeoffs.

## Step 6: Handoff

End with the next useful step:

- use `workflows/tld-finder.md` for RDAP domain checks
- use `scripts/github-name-check.py`, `scripts/npm-org-check.py`, and
  `scripts/x-name-check.py` for adjacent platform checks
- use `workflows/logo-generation.md` when shortlisted names need mark
  exploration
- use `workflows/brand-strategy.md` or `workflows/brand-messaging.md` when the
  chosen name needs positioning or message support

State clearly that final name selection still needs legal/trademark review
when commercial use matters.
