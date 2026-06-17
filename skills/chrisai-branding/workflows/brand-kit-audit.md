# Brand Kit Audit

Use this workflow when the main problem is reviewing an existing brand kit,
brand guide, or brand documentation for completeness, consistency, usability,
and implementation readiness.

This workflow produces an audit and gap list. It does not generate a new brand
kit unless the user asks for a follow-up generation pass.

## Ownership

This workflow owns:

- brand-kit completeness review
- strategy, audience, voice, messaging, visual, logo, and asset-rule gap checks
- consistency and contradiction detection
- implementation-readiness recommendations
- next-step routing

This workflow does not own:

- creating a new kit; use `workflows/brand-kit-generation.md`
- auditing raw asset files deeply; use `workflows/brand-asset-audit.md`
- legal/trademark review
- marketing launch planning

## Workflow

Work through these steps in order:

1. Inspect the existing kit and related materials.
2. Classify kit scope.
3. Check completeness.
4. Check consistency and actionability.
5. Produce the audit and next steps.

## Step 1: Inspect Materials

Review any provided:

- brand guide or brand kit
- strategy documents
- voice and tone guide
- messaging guide
- logo usage rules
- visual guidelines
- asset folders
- website, app, deck, or social examples

Do not assume a particular folder exists. Use available materials first and ask
only for missing inputs that would materially change the audit.

## Step 2: Classify Scope

Classify the kit as:

- mini kit: high-level direction only
- standard kit: strategy, audience, voice, messaging, visual guidance, usage
  rules
- full guidelines: channel examples, do/don'ts, asset inventory,
  implementation notes, governance

Judge completeness relative to the intended scope, not an imaginary enterprise
brand book.

## Step 3: Check Completeness

Look for:

- brand purpose, promise, and positioning
- audience/profile guidance
- differentiation and proof points
- voice traits and tone by channel
- words to use and avoid
- one-liner, value proposition, message pillars, CTAs, and boilerplate
- logo usage rules
- color, typography, imagery, iconography, and layout guidance
- accessibility and contrast notes
- asset inventory and export requirements
- implementation handoff guidance
- assumptions, gaps, and owner/open decisions

Use `references/brand-kit-template.md` as the comparison structure.

## Step 4: Check Consistency And Actionability

Flag:

- strategy claims without proof
- audience descriptions too vague to guide decisions
- voice traits with no writing behavior
- messaging that conflicts with positioning
- visual rules that conflict with available assets
- logo rules that ignore small-size or favicon needs
- missing accessibility guidance
- unclear source of truth
- stale, duplicated, or contradictory files
- instructions that are too abstract for a writer, designer, or implementer to
  use

If local logo or asset files are part of the kit, use
`workflows/brand-asset-audit.md` for deeper file-level review.

## Step 5: Produce Audit

Output:

- summary verdict
- completeness score or status by section
- critical gaps
- contradictions
- implementation risks
- quick wins
- recommended next workflow

Use this table when useful:

| Area | Status | Finding | Risk | Recommended Fix |
| --- | --- | --- | --- | --- |
| Strategy | Complete / Partial / Missing | [finding] | [risk] | [fix] |

End with the next useful step:

- `workflows/brand-kit-generation.md` for a revised kit
- `workflows/brand-strategy.md` for positioning gaps
- `workflows/brand-voice.md` or `workflows/brand-messaging.md` for verbal
  identity gaps
- `workflows/brand-visual-guidelines.md` for visual rules
- `workflows/brand-asset-audit.md` for asset-file issues
