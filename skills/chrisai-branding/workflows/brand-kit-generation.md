# Brand Kit Generation

Use this workflow when the main problem is assembling a coherent brand kit
from strategy, audience/profile guidance, voice, messaging, visual guidelines,
and usage rules.

This workflow packages brand decisions. It does not generate logos, run
competitor research, create final UI screens, write full marketing pages, or
perform legal/trademark clearance.

## Ownership

This workflow owns:

- choosing the right brand-kit scope
- orchestrating strategy, voice, messaging, and visual-guideline sections
- assembling a structured brand kit
- labeling assumptions and missing inputs
- recommending next handoffs

This workflow does not own:

- deep research; use `workflows/brand-research.md`
- standalone strategy; use `workflows/brand-strategy.md`
- standalone voice rules; use `workflows/brand-voice.md`
- standalone messaging assets; use `workflows/brand-messaging.md`
- standalone visual usage rules; use `workflows/brand-visual-guidelines.md`
- logo generation or logo originality review

## Workflow

Work through these steps in order:

1. Check existing context and artifacts.
2. Complete only the missing intake.
3. Choose kit scope.
4. Generate or reuse component sections.
5. Assemble the brand kit.
6. Review for consistency and implementation value.
7. Save or hand off.

## Step 1: Check Existing Context

Look for existing brand, strategy, research, voice, messaging, visual assets,
website, product, pitch, sales, or planning material. Do not assume a
particular folder exists.

Use existing component outputs first. Do not regenerate strategy, voice,
messaging, or visual guidelines when the user already provided an approved
version unless they ask for a revision.

## Step 2: Intake

Capture or infer:

- kit goal: strategy foundation, voice guide, messaging guide, visual
  guidelines, full brand kit, refresh, or handoff package
- brand stage: idea, MVP, launched product, rebrand, rename, campaign, or
  sub-brand
- audience: founders, developers, SMBs, enterprise buyers, consumers,
  creators, agencies, local customers, or another group
- source confidence: researched, user-provided, inferred from workspace, or
  provisional
- visual maturity: no assets, logo only, colors/fonts exist, full design
  system exists, or visual redesign needed
- output format: concise one-page kit, full markdown guide,
  implementation-facing handoff, or section-specific draft

Offer these options when asking. Do not dump every possible brand question at
once.

## Step 3: Choose Kit Scope

Use the smallest kit that solves the request.

### Mini Kit

Use for early-stage direction or a quick internal reference.

- positioning
- audience/profile snapshot
- voice traits
- message pillars
- visual direction notes
- assumptions and next steps

### Standard Kit

Use by default.

- strategy foundation
- audience/profile guidance
- voice and tone guide
- messaging system
- proof and trust signals
- visual guidelines
- usage rules
- handoff recommendations

### Full Guidelines

Use when the user needs a durable brand document.

- everything in the standard kit
- channel-specific examples
- do/don't guidance
- asset inventory
- implementation notes
- governance/update rules
- open decisions and owner handoffs

## Step 4: Generate Or Reuse Components

Route missing components to the narrow workflows:

- `workflows/brand-strategy.md` for purpose, promise, positioning,
  differentiation, values, and audience implications
- `workflows/brand-voice.md` for voice traits, tone spectrum, vocabulary, and
  writing rules
- `workflows/brand-messaging.md` for one-liners, value propositions, pillars,
  taglines, CTAs, and boilerplate
- `workflows/brand-visual-guidelines.md` for color, typography, imagery,
  iconography, layout, usage, and accessibility guidance

Use `workflows/brand-research.md` first when market position, competitors,
category language, or proof claims are unclear.

Do not include logo generation inside this workflow. If logo direction is
missing, state the gap and recommend a separate logo-generation workflow.

## Step 5: Assemble The Kit

Use `references/brand-kit-template.md` for the default structure.

The default deliverable includes:

- executive summary
- strategy foundation
- audience/profile guidance
- voice and tone
- messaging system
- proof and trust signals
- visual guidelines
- usage rules
- implementation handoff
- assumptions, gaps, and next steps

Keep the kit practical. A useful kit should help someone write, design, review,
or implement brand-consistent work.

## Step 6: Review Gate

Before treating the kit as complete, confirm:

- Are assumptions, provisional choices, and source-backed claims separated?
- Does the strategy support the voice, messaging, and visual guidance?
- Are audience/profile details specific enough to guide decisions?
- Are voice rules actionable with examples?
- Are message claims tied to proof or labeled assumptions?
- Are visual rules grounded in available assets or marked provisional?
- Is logo generation excluded or clearly handed off?
- Is the kit scoped to the user's actual requested deliverable?

## Step 7: Save Or Handoff

When saving files, ask for the target path unless the project already has a
clear brand workspace. If none is specified and a file artifact is needed, use
a generic project-local path such as `brand/` or `research/brand/` depending
on workspace conventions.

End with the next useful step:

- use a logo-generation workflow when the mark needs to be created or revised
- use a design workflow when visual examples, UI surfaces, or review artifacts
  are needed
- use a copywriting or marketing workflow when the user wants final pages,
  emails, ads, social posts, or sales collateral
- use asset-format workflows when logos, favicons, transparent PNGs, or ICOs
  need preparation
