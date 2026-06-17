# Brand Launch Readiness

Use this workflow when the main problem is checking whether a brand is ready
to publish, announce, hand off, or use publicly.

This workflow produces a readiness checklist and risk list. It does not own
marketing launch strategy, PR, ads, social calendars, or release management.

## Ownership

This workflow owns:

- brand readiness checklist
- name/domain/platform consistency checks
- core messaging and proof readiness
- logo, favicon, and asset readiness checks
- brand-kit and source-of-truth readiness
- unresolved risk and handoff recommendations

This workflow does not own:

- marketing launch planning
- legal/trademark clearance
- final registrar purchase decisions
- full brand kit generation
- asset conversion work beyond routing

## Workflow

Work through these steps in order:

1. Clarify the launch surface.
2. Check brand foundations.
3. Check name, domain, and platform readiness.
4. Check messaging and proof readiness.
5. Check visual and asset readiness.
6. Check source-of-truth and handoff readiness.
7. Produce the readiness verdict.

## Step 1: Clarify Launch Surface

Capture or infer what is going public:

- company or product brand
- website or landing page
- app, package, plugin, or marketplace listing
- social profiles
- investor/customer deck
- documentation site
- campaign or sub-brand

Ask for target date or urgency only when it affects risk.

## Step 2: Check Foundations

Confirm the brand has:

- clear audience
- clear category
- positioning
- value proposition
- proof or credibility signals
- voice direction
- visual direction or guidelines
- assumptions and open questions marked

If these are missing, route to the relevant strategy, messaging, voice, or
brand-kit workflow.

## Step 3: Check Name, Domain, And Platform

Review:

- selected name spelling
- domain shortlist or chosen domain
- TLD decision
- GitHub/npm/X or other platform handles when relevant
- naming conflicts or ambiguity noted by the user
- legal/trademark review status

Use `workflows/tld-finder.md` and the bundled platform-check scripts for
research support. State that those checks do not replace registrar,
trademark, or legal clearance.

## Step 4: Check Messaging And Proof

Confirm launch-ready messaging exists:

- one-liner
- short and medium boilerplate
- value proposition
- tagline or headline direction
- message pillars
- CTA language
- proof points
- words to use and avoid
- known claims that need substantiation

Use `workflows/brand-messaging.md` when these are missing or inconsistent.

## Step 5: Check Visuals And Assets

Confirm:

- selected logo or mark
- favicon-safe variant when needed
- transparent PNGs when needed
- SVG master or chosen master asset
- ICO or favicon files when needed
- color and typography guidance
- asset usage notes
- accessibility or contrast concerns

Use `workflows/brand-asset-audit.md`, `workflows/transparent-pngs.md`, and
`workflows/png-ico-conversion.md` for deeper asset checks.

## Step 6: Check Source Of Truth

Confirm:

- canonical brand kit or guide path
- canonical logo master path
- canonical export folder
- deprecated or draft files are labeled
- implementation handoff notes exist
- open decisions have owners

Use `workflows/brand-source-of-truth.md` when files or docs are scattered.

## Step 7: Produce Verdict

Output:

- readiness verdict: ready, conditionally ready, or not ready
- blockers
- non-blocking risks
- quick fixes
- owner/open decisions
- recommended workflow sequence

Use this table when useful:

| Area | Status | Finding | Risk | Action |
| --- | --- | --- | --- | --- |
| Name/domain | Ready / Risk / Missing | [finding] | [risk] | [action] |

Do not hide legal, trademark, or availability uncertainty. Mark it as an open
risk even when the brand is otherwise ready.
