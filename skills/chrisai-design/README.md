# ChrisAI Design

ChrisAI Design is the consolidated design skill. Use it when a request is about
shaping a visual experience, extending an existing design, creating reviewable
wireframes or drafts, or managing feedback on a browser-visible design
artifact.

## Terms

- A review round is one feedback cycle: show the artifact, ask for review,
  receive feedback, apply it, and show the updated artifact again.
- A revision is a major folder-level artifact version. Major changes create a
  new revision folder; minor changes can stay in the current revision folder.
- A phase can have many review rounds and fewer revisions. For example, a
  wireframe phase may go through 10 review rounds and 3 major revision folders.
- Generated wireframes and creative drafts are HTML/CSS/JS review artifacts.
  Markdown-only wireframes or prose mockups are only acceptable when the user
  explicitly asks for text-only planning.

## When This Skill Activates

### Creative Direction

Use this skill when the request asks for visual direction, brand-led design,
homepage or landing-page composition, design-system direction, reference-site
synthesis, or an implementation-ready design handoff.

What happens:

- The agent identifies the design mode.
- The agent gathers brand inputs such as logo, brand guide, existing product
  pages, screenshots, and reference sites.
- The agent extracts brand signals, usability constraints, and differentiation
  opportunities.
- The agent produces a concrete visual direction or handoff instead of vague
  mood words.
- If the work turns into wireframes, drafts, or browser review, the agent moves
  to the matching internal workflow.

Primary workflow: `workflows/creative-direction.md`

### Existing Design Extension

Use this skill when a new page, screen, component, or flow must match an
existing product, website, Figma file, component library, screenshot set,
design system, or local theme source.

What happens:

- The agent identifies the design source of truth.
- The agent inspects available design evidence.
- The agent extracts colors, typography, spacing, layout, components, states,
  responsive behavior, and source-priority rules.
- The agent produces extension rules before proposing new design work.
- If the extension needs a new structure or visual draft, the agent routes to
  wireframes, creative direction, or design drafts.

Primary workflow: `workflows/design-system-extraction.md`

### Wireframes

Use this skill when the request is about structure, hierarchy, section order,
screen layout, navigation, flow, or low-fidelity clickable drafts before visual
design is approved.

What happens:

- The agent keeps the work grayscale and low fidelity.
- The agent identifies the page, screen, or flow scope.
- The agent gathers only the structure inputs that materially affect layout.
- The agent creates layout options or a complete wireframe set for the agreed
  scope as HTML/CSS/JS files.
- If clickable wireframes are needed, the agent creates static review artifacts
  and keeps them separate from production code.
- The agent applies annotation-based, ad hoc, screenshot, or chat feedback,
  then runs another review round until the wireframe phase is approved.
- Major wireframe changes create a new revision folder; minor changes can stay
  in the current revision folder.
- The agent states what approval unlocks before moving to visual design.

Primary workflow: `workflows/wireframes.md`

### Design Drafts

Use this skill when the request asks for static HTML/CSS/JS design-review
artifacts, clickable creative drafts, functional creative drafts, or polished
mockups based on an approved structure and visual direction.

What happens:

- The agent confirms the draft stage and where draft files should live.
- The agent creates review-only static artifacts, not production
  implementation.
- The agent generates HTML/CSS/JS files, not markdown-only mockups.
- The agent keeps draft files, assets, screenshots, notes, and review metadata
  inside the current revision workspace.
- The agent labels simulated behavior clearly.
- The agent uses available browser capabilities for rendered checks when
  possible.
- The agent applies annotation-based, ad hoc, screenshot, or chat feedback,
  then runs another review round until the creative or draft phase is approved.
- Major creative changes create a new revision folder; minor changes can stay
  in the current revision folder.
- The agent presents concrete review questions and a clear approval path.

Primary workflow: `workflows/design-drafts.md`

### Browser-Visible Feedback

Use this skill whenever a design draft, prototype, local page, screenshot,
recording, or rendered artifact is shown for approval or revision.

What happens:

- The agent names the current phase and review round.
- The agent identifies the review target, such as a URL, file, screenshot, or
  revision folder.
- The agent explains what changed in the current review round.
- The agent lists only verification that was actually performed.
- The agent asks concrete review questions tied to the visible artifact.
- The agent states exactly what approval unlocks.
- The agent does not treat review-round approval as phase approval unless the full
  phase scope is complete.

Primary workflow: `workflows/feedback-loop.md`

### Functional Creatives

Use this skill when the user needs to review a creative direction with enough
interaction to evaluate flows, states, menus, forms, modals, drawers,
validation messaging, or state transitions.

What happens:

- The agent treats the result as a design-review artifact, not production
  implementation.
- The agent may use static HTML/CSS/JS to simulate enough behavior for review.
- The agent labels simulated behavior clearly.
- The agent avoids real persistence, authentication, billing, backend calls, or
  production analytics.
- The agent uses the feedback loop for every reviewable update until the phase
  is approved.

Primary workflow: `workflows/design-drafts.md`

### Design Handoff Package

Use this skill when the user asks to document, explain, package, summarize, or
hand off generated wireframes and/or creatives.

What happens:

- The agent finds the latest relevant wireframe revision, creative revision, or
  both.
- The agent states the source artifacts and approval status.
- The agent documents the screen inventory, user flows, and component
  inventory.
- The agent explains non-obvious components, such as file explorers, command
  toolbars, resizable panels, drawers, menus, and toggle groups.
- The agent documents interaction behavior, including clicks, double-clicks,
  drags, drops, toggles, hovers, keyboard behavior, form submits, validation,
  modals, drawers, and responsive behavior when visible or implied.
- The agent separates intended behavior, simulated behavior, deferred behavior,
  implementation priority, and open questions.

The Design Handoff Package is markdown documentation. That is allowed because
it documents generated artifacts; it does not replace the HTML/CSS/JS
wireframes or creatives themselves.

Primary workflow: `workflows/design-handoff-package.md`

### Logo, Image, Asset, Or Frontend Implementation Needs

Use this skill when design work touches logos, generated imagery, SVG or PNG
assets, favicons, or production HTML/CSS/JS implementation, but do not assume
those capabilities are built into this skill.

What happens:

- The agent softly looks for an installed logo-generation, image-generation,
  asset, frontend, HTML/CSS, JavaScript, app implementation, or project-local
  workflow.
- If a suitable capability exists, the agent may use it for that narrow part of
  the task.
- If no suitable capability exists, the agent continues with best-effort design
  guidance, placeholders, static SVG direction, or implementation notes.
- The agent states limits instead of pretending a specialized tool was used.

This is a capability lookup, not a separate internal workflow.

## Internal References

The workflow files use references for specific standards:

- `references/design-modes.md`: design-mode selection
- `references/brand-led-discovery.md`: brand and reference-site intake
- `references/existing-design-sources.md`: source-of-truth handling
- `references/source-formats.md`: Figma, screenshots, local code, and exports
- `references/extraction-report.md`: design extraction handoff format
- `references/wireframe-patterns.md`: common wireframe patterns
- `references/draft-artifact-rules.md`: static draft workspace rules
- `references/browser-feedback-loop.md`: browser review protocol
- `workflows/design-handoff-package.md`: documentation generated from the
  latest wireframes and/or creatives
- `references/evidence-scripts.md`: objective evidence helpers
- `references/homepage-patterns.md`: homepage composition patterns
- `references/site-direction-playbooks.md`: named visual directions
- `references/visual-review.md`: visual quality checks
- `references/future-wireframes.md`: routing from creative direction to
  wireframes

## What This Skill Does Not Do

This skill does not own production frontend implementation, final QA signoff,
logo-generation tooling, image-generation tooling, or asset conversion tooling.
It can look for those capabilities when they are useful, but it should continue
with a best-effort design path when they are unavailable.

This skill also does not treat browser review as proof of production
readiness. Browser review is for visible artifact feedback unless the user
explicitly asks for production QA.
