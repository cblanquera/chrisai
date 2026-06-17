# Brand Guided Flow

Use this workflow when the user wants branding help but does not know which
branding task comes next, or when they are starting from a greenfield idea or
an existing messy brand and need step-by-step guidance.

This workflow is an orchestrator. It helps the user choose the next branding
workflow. It does not replace the specialist workflows or automatically run a
full brand process.

## Ownership

This workflow owns:

- beginner-friendly branding intake
- greenfield vs brownfield routing
- next-step recommendations after each completed workflow
- stopping points and handoff options
- preventing unnecessary scope expansion

This workflow does not own:

- deep research, naming, strategy, voice, messaging, visual guidelines, logo
  generation, audits, asset conversion, or launch checks directly
- marketing launch plans, ads, SEO campaigns, social calendars, or legal
  clearance

## Operating Rule

After each completed workflow, recommend one or two next steps and include
`stop here` as a valid option when the user's requested deliverable is done.

Do not continue into the next workflow automatically unless the user asks to
continue.

Use plain language. Avoid expecting the user to know branding terms.

## Workflow

Work through these steps in order:

1. Identify starting state.
2. Identify desired outcome.
3. Choose the greenfield or brownfield path.
4. Run one narrow workflow at a time.
5. Recommend next steps after each workflow.
6. Stop when the user's current goal is complete.

## Step 1: Identify Starting State

Ask or infer whether the user is:

- greenfield: starting from an idea, product, project, or new company with no
  real brand yet
- brownfield: working with an existing name, logo, website, brand kit, or
  asset folder
- mixed: has some pieces but does not know which are usable

If unclear, ask:

> Are we starting from scratch, improving an existing brand, or sorting through
> some existing brand files?

## Step 2: Identify Desired Outcome

Ask what the user wants to leave with. Suggest options:

- clear next steps
- name shortlist
- domain/platform shortlist
- competitor/category research
- positioning/strategy
- voice or messaging
- logo direction
- visual guidelines
- brand kit
- cleaned-up assets
- launch readiness check

If the user is unsure, default to `clear next steps`.

## Step 3: Greenfield Path

Use this path when the user is starting from scratch or a rough idea.

Recommended order:

1. `workflows/brand-research.md` when category, competitors, positioning, or
   market language are unknown.
2. `workflows/brand-strategy.md` to define purpose, promise, audience,
   positioning, differentiation, and proof.
3. `workflows/brand-naming.md` when the name is unresolved.
4. `workflows/tld-finder.md` and platform scripts when candidate names need
   domain, GitHub, npm, or X checks.
5. `workflows/brand-voice.md` and `workflows/brand-messaging.md` to define
   verbal identity.
6. `workflows/logo-generation.md` when a mark, wordmark, monogram, app icon,
   or favicon-safe mark is needed.
7. `workflows/brand-visual-guidelines.md` to define visual usage guidance.
8. `workflows/brand-kit-generation.md` to package the approved pieces.
9. `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md` when
   concrete asset exports are needed.
10. `workflows/brand-launch-readiness.md` before public use, handoff, or
    announcement.

Skip steps that are irrelevant or already complete.

## Step 4: Brownfield Path

Use this path when the user already has a brand, assets, website, or docs.

Recommended order:

1. `workflows/brand-source-of-truth.md` when docs, assets, exports, or notes
   are scattered.
2. `workflows/brand-kit-audit.md` when a brand kit or guide exists but quality
   or completeness is uncertain.
3. `workflows/brand-asset-audit.md` when logos, SVGs, PNGs, favicons, or
   exports need quality review.
4. `workflows/brand-consistency-review.md` when a website, app, deck, README,
   docs page, listing, or social profile should be checked against the brand.
5. `workflows/brand-refresh.md` when the existing brand needs a preserve/change
   plan.
6. Fill missing sections with `workflows/brand-strategy.md`,
   `workflows/brand-voice.md`, `workflows/brand-messaging.md`,
   `workflows/logo-generation.md`, or
   `workflows/brand-visual-guidelines.md`.
7. `workflows/brand-kit-generation.md` to update or package the approved
   pieces.
8. `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md` when
   concrete asset exports are needed.
9. `workflows/brand-launch-readiness.md` before public rollout.

Skip steps that do not match the user's actual materials or goal.

## Step 5: Decision Shortcuts

Use these shortcuts when the user asks a fuzzy question:

- No name yet? Use `workflows/brand-naming.md`.
- Name ideas exist but domains/handles are unknown? Use
  `workflows/tld-finder.md` plus platform scripts.
- No competitor/category clarity? Use `workflows/brand-research.md`.
- Existing brand files are messy? Use `workflows/brand-source-of-truth.md`.
- Existing kit exists but may be incomplete? Use `workflows/brand-kit-audit.md`.
- Existing logo/assets may be unusable? Use `workflows/brand-asset-audit.md`.
- Existing surface feels off-brand? Use
  `workflows/brand-consistency-review.md`.
- Brand feels dated or misaligned? Use `workflows/brand-refresh.md`.
- Need a logo mark? Use `workflows/logo-generation.md`.
- Need public readiness? Use `workflows/brand-launch-readiness.md`.

## Step 6: Next-Step Output

At the end of each guided turn, output:

- what was completed or decided
- what is still unknown
- recommended next step
- optional alternate next step
- stop-here option

Use this format:

```markdown
## Next Step

Recommended: [workflow or action] because [reason].

Alternative: [workflow or action] if [condition].

Stop here if [what is already complete].
```

Do not recommend more than two next workflows at once unless the user asks for
a full roadmap.

## Review Gate

Before recommending the next step, confirm:

- Does the recommendation match greenfield, brownfield, or mixed state?
- Is the next step the narrowest useful workflow?
- Did the user ask for a full process or only one deliverable?
- Is legal/trademark/domain uncertainty marked when relevant?
- Is stopping now a valid option?
