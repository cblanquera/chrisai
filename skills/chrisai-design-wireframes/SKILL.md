---
name: chrisai-design-wireframes
description: Use when an agent needs grayscale low-fidelity wireframes or clickable grayscale wireframe drafts for sites, apps, docs, landing pages, or product screens before creative visual design is approved.
---

# ChrisAI Design Wireframes

Use this skill when the main problem is structure, layout, hierarchy, or flow
before polished visual design.

Wireframes are design-review drafts. They are not production implementation.

Use
[`chrisai-process-feedback-loop`](../chrisai-process-feedback-loop/SKILL.md)
for shared review-loop rules, including round approval, phase approval,
next-step language, and artifact folder behavior.

## Portability

Write wireframe guidance for portable agent use first. Do not assume the
consumer is Codex-only. Use Codex-specific, Claude-specific, or OpenCode-specific
notes only when the behavior actually differs.

## Ownership

This skill owns:

- grayscale low-fidelity wireframe direction
- section and screen layout exploration
- clickable grayscale wireframe drafts for review
- layout-option comparison
- handoff from approved wireframe to creative design

This skill does not own:

- brand-led color, typography, or final surface styling
- extraction of an existing design source of truth
- final creative design drafts
- production frontend implementation
- browser QA for rendered production pages

Use [`chrisai-design-system-extraction`](../chrisai-design-system-extraction/SKILL.md)
first when the wireframe must extend an existing product design.

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
wireframe needs broader creative-direction coordination.

Use [`chrisai-design-drafts`](../chrisai-design-drafts/SKILL.md) when the user
wants a polished static design-review draft after the wireframe is approved.

## Workflow

Work through these steps in order:

1. classify the wireframe scope
2. collect required structure inputs
3. draft grayscale layout options
4. choose or revise one structure
5. produce a complete grayscale wireframe set
6. present review instructions and next steps
7. create a clickable wireframe only when needed
8. produce a wireframe handoff

Do not apply brand color, gradients, decorative graphics, or polished visual
styling before the wireframe is approved.

Do not move to creative design until the full wireframe scope is represented
and approved. A single partial screen is not enough unless the requested scope
is only that screen.

## Step 1: Classify The Scope

Identify what is being structured:

- homepage
- landing page
- documentation surface
- app page or screen
- multi-screen flow
- modal, drawer, or focused workflow

If the task is a complex product UX architecture problem, state the boundary
and keep this skill focused on the requested screens or flow.

## Step 2: Collect Structure Inputs

Collect:

- target audience
- primary user goal
- required sections or content
- required actions
- known navigation or flow constraints
- existing design-extension rules when applicable
- device targets
- whether a clickable wireframe is needed

Ask only for missing inputs that materially affect structure.

## Step 3: Draft Grayscale Layout Options

Wireframe rules:

- grayscale only
- no brand color
- no gradients
- no photos or illustrations
- no polished surface styling
- realistic labels where they clarify structure
- stable dimensions for repeated controls and layout regions
- clear hierarchy and scan path

Prefer 1 to 3 layout options when the structure is unresolved. Compare options
by user task, density, complexity, and risk.

Use [wireframe-patterns](references/wireframe-patterns.md) for common layout
patterns.

For each option or round, ask specific wireframe review questions about:

- page or screen purpose
- section order
- hierarchy and scan path
- primary and secondary actions
- navigation or flow behavior
- missing sections, states, or screens
- desktop and mobile assumptions when relevant

Also state the exact next step if the round is approved.

## Step 4: Choose Or Revise One Structure

Before moving to visual design, confirm:

- primary action is obvious
- content order supports the user goal
- navigation or flow is understandable
- repeated regions are consistent
- mobile and desktop constraints are plausible
- unresolved choices are named

Do not proceed to polished design if the user has not accepted the structure.

## Step 5: Produce A Complete Grayscale Wireframe Set

Before creative design, cover the full requested scope:

- all requested pages or screens
- required sections on each page
- primary states needed for review
- key empty, loading, error, or success states when they affect layout
- key responsive variants when mobile or desktop behavior changes materially
- navigation or flow links between screens

If scope is too large for one round, split it into named rounds and explain
which screens or states are covered in the current round and which remain.

Do not call the wireframe complete until the user can review the whole
structure needed before visual design.

## Step 6: Present Review Instructions And Next Steps

After each review round, state:

- what changed in this round
- which folder contains the current draft when files were created
- what the user should review now, phrased as specific questions
- what feedback would be most useful
- the next step if this round is approved
- whether more wireframe rounds remain before creative design
- the next step if revisions are needed

Review questions should reference the actual wireframe decisions in the
current round: page set, section order, navigation model, anchor or link
targets, responsive structure, screen states, and density.

When the next step is another wireframe round, say so directly. Examples:

- If this concept direction is approved, the next round will wireframe the
  first two sample pages.
- If these sample pages are approved, the next round will complete the
  remaining page set.
- If this full wireframe set is approved, the next phase is creative
  design.

Use direct review prompts such as:

```markdown
What to review for this round:

- Is the selected page or screen set complete for this phase?
- Does the navigation model match the way users should move through the flow?
- Are the sections in the right order for the primary user goal?
- Is the primary action visible in the right place?
- Are any empty, loading, error, or success states missing from the wireframe?

If this round is approved, the next step is to wireframe the remaining screens
in this phase. If not, tell me which sections or flow points to change.
```

## Step 7: Create A Clickable Wireframe When Needed

Use static HTML/CSS/JS only as a review artifact.

Before writing files:

- ask whether the user wants the draft saved in the project
- ask where the draft workspace should live
- keep draft files separate from production code unless requested

The draft folder is the consolidated workspace for the clickable wireframe.
Keep static files, draft-only assets, QA screenshots, QA notes, recordings, and
review metadata inside that folder. If `chrisai-qa-playwright` is used, save
its artifacts under the draft folder's `qa/` directory.

Create a separate HTML file for each distinct page, screen, or major state.
Do not put a multi-page wireframe into one large HTML file. Use `index.html`
only as the first screen or review hub, then add sibling files such as
`dashboard.html`, `details.html`, `empty-state.html`, or `error-state.html`
for the remaining screens and states. Share grayscale wireframe styling through
`styles.css`, keep optional simulated behavior in `script.js`, and connect the
wireframe with relative links.

For local static wireframes, do not try to open `file://` URLs in the browser.
Serve the draft workspace with a simple static server, then open the
localhost URL:

```bash
python3 -m http.server [port] --directory [location]
```

Use an available local port and the draft workspace as `[location]`. Link to
the served entry page, such as `http://127.0.0.1:[port]/index.html`. This is a
static preview server for review, not production infrastructure.

Treat this server as agent-owned when the agent starts it:

- stop it before the final response unless the user needs it open for review
- use a 15-minute default timeout, 5 minutes for quick verification, or 30
  minutes for user review
- do not stop a server that was already running before the task
- report whether the server was stopped, left running with its URL and timeout,
  or identified as pre-existing and left alone

Follow the artifact rules in
[`browser-feedback-loop`](../chrisai-process-feedback-loop/references/browser-feedback-loop.md):
major round changes create a new folder; minor changes inside the same review
round may update the current folder.

Clickable wireframes may include simple links, tabs, toggles, and state changes
that demonstrate navigation or flow intent.

## Step 8: Produce The Wireframe Handoff

State:

- selected structure
- page or screen purpose
- section order
- navigation or flow behavior
- primary and secondary actions
- full scope covered
- any screens or states intentionally deferred
- responsive assumptions
- draft workspace and `qa/` artifacts when a clickable draft was created
- unresolved questions
- constraints for the creative design draft
- next step after round approval
- whether the full wireframe phase is approved for creative design

## Review Gate

Before treating the wireframe as ready:

- Is it grayscale and low-fidelity?
- Does it cover the full requested scope?
- Have any missing screens, states, or responsive variants been named?
- Is the next action obvious?
- Does each page or screen have one clear primary job?
- Are labels understandable without decoration?
- Does the layout support scanning?
- Is clickable behavior clearly review-only?
- Was any agent-started static preview server stopped, intentionally left
  running with URL and timeout, or clearly identified as pre-existing?
- Did the final response tell the user what to review and what happens next?
