---
name: chrisai-qa-playwright
description: Use when a local web project needs browser QA, localhost preview detection, Playwright screenshots or recordings, or responsive verification without relying on GitHub Pages-specific workflow assumptions.
---

# ChrisAI QA Playwright

Use this skill for browser QA of local web projects that need a preview server,
Playwright capture, or in-app browser validation.

This skill owns:

- preview command discovery from the relevant `package.json`
- repo-local Playwright workspace selection and bootstrap
- screenshot and recording workflows
- responsive and visual QA against a localhost preview
- rendered QA for design-review drafts when invoked by a design draft workflow
- separating repo-side blockers from environment-side blockers

This skill does not own:

- generic frontend implementation
- non-browser unit or integration tests
- GitHub Pages builder decisions
- Markdown-content checks from the legacy docs-site workflow
- opening Safari, Chrome, or other external browsers

## Design Draft QA

When this skill is used from `chrisai-design-wireframes` or
`chrisai-design-drafts`, treat the draft folder as the consolidated workspace
for that draft.

Save design-draft QA artifacts inside the draft folder under `qa/`, including:

- screenshots
- recordings
- interaction smoke-test notes
- responsive-check notes

Do not scatter design-draft QA artifacts into a separate temporary folder or
the managed Playwright workspace unless the user explicitly asks.

Use this skill for design drafts when they need:

- rendered browser verification
- desktop and mobile screenshots
- blank-page checks
- text-overlap checks
- container-fit checks
- responsive layout checks
- clickable-flow smoke testing

Do not use this skill to choose creative direction, extract design rules,
revise visual style, or replace user approval.

## Preview Discovery Workflow

Before starting preview:

1. inspect the nearest relevant `package.json` from the user's working area
2. if there is no obvious package root there, walk upward toward repo root
3. if multiple package roots expose plausible preview commands, stop and ask
   which package owns the preview flow
4. do not silently choose workspace root just because it exists

Before running preview or QA commands:

- resolve a concrete Node runtime that is version 22 or higher
- consider Linux, macOS, and Windows command behavior before selecting preview
  or helper commands
- prefer the repo's declared toolchain when present, such as `package.json`
  `engines`, Volta, `nvm`, `.node-version`, or an existing project wrapper
- use `local-environment` as the machine-local override layer when it exists
  and the task needs concrete executable paths
- do not rely on an unspecified ambient Node version when the repo provides a
  clearer runtime contract
- if Node 22+ cannot be resolved, report that as a blocker because preview
  startup and browser QA may be invalid or unavailable without the correct
  runtime

When choosing the preview script, use this precedence:

1. `preview`
2. `dev`
3. `serve`
4. `start`

Behavior rules:

- choose exactly one preview command
- do not assume `build` is required
- do not assume a `check` command exists or matters
- if no valid preview command can be determined, ask the user for it
- report the exact package root, package manager, and command selected

When choosing the package manager:

- prefer the repo's declared `packageManager`
- otherwise infer from the nearest lockfile
- do not invent a different package manager than the repo already uses
- when the repo already expects `yarn`, run preview and supporting commands
  through that resolved `yarn` runtime instead of silently switching managers

If a repo-specific preview flow clearly requires a pre-step before the server
can run, treat that as an exception and state the extra command explicitly
instead of pretending preview is one-step by default.

## Workspace Ownership Rules

This skill manages a repo-local QA workspace. Prefer predictable ownership over
reusing arbitrary existing folders.

Workspace selection order:

1. project-root `.playwright/`
2. project-root `.playwrightai/` if `.playwright/` exists but is incompatible
3. ask the user for a workspace folder if both are occupied or unsuitable

Reuse an existing workspace only when it matches the expected managed layout:

- `package.json`
- `node_modules/`
- configured browser cache path
- `artifacts/`
- helper scripts this skill manages for preview or capture work

Treat an incompatible existing `.playwright/` as someone else's workspace, not
as free space to overwrite.

After creating or updating the managed workspace, tell the user that the folder
was added and may belong in `.gitignore` or may be removable later if they do
not want to keep the local QA setup.

## Helper Script Rules

This skill ships helper scripts under its own `scripts/` folder. When the repo
needs a managed QA workspace:

- copy or update the helper scripts into the chosen workspace instead of
  relying on repo-level legacy QA scripts
- treat those copied files as skill-owned workspace infrastructure
- keep helper scripts minimal and idempotent so rerunning the skill updates the
  same files instead of scattering new ones

Use the bundled helpers as follows:

- `scripts/localhost_preview.py` wraps the chosen preview command with explicit
  `HOST` and `PORT` bindings and optional pre-steps
- `scripts/capture_page.mjs` handles simple screenshot or video capture for a
  single route or page load

Before relying on a Python helper, resolve a working Python runtime for the
current OS. On Windows, do not assume `python3` exists; check `python`, `py`,
project wrappers, or `local-environment` as appropriate.

For multi-step interaction recordings, start from the bundled capture script
and add a task-specific workspace script only when the recording needs custom
navigation or interactions.

## QA And Capture Rules

This skill supports two capture modes:

- screenshot mode
- recording mode

Core QA rules:

- validate the rendered localhost preview, not the source tree
- prefer the current agent's integrated browser for manual inspection and
  screenshots when available; in Codex, use the Codex in-app browser
- use Playwright-driven flows for deterministic screenshots and recordings
- never switch to Safari, Chrome, or another external browser
- check more than one viewport when layout or responsiveness is part of the
  request
- focus findings on visible rendering defects, broken navigation, missing
  assets, and obvious responsiveness issues

Capture rules:

- record the viewport and target route or page for every screenshot
- record the viewport, route or flow, and output path for every video
- if preview startup fails, report the blocker instead of pretending QA ran
- if browser tooling cannot be prepared, report whether the blocker came from
  workspace ownership, runtime resolution, dependency bootstrap, preview
  startup, or browser access

Use screenshot mode for:

- visual bug confirmation
- responsive comparisons
- sharing the current rendered state of one or more pages

Use recording mode for:

- demonstrating flows across multiple pages
- showing an interaction bug
- capturing a deterministic browser sequence for review

## Reporting Rules

Report results in this order:

1. preview status
2. selected package root and preview command
3. workspace path used
4. screenshot or recording coverage
5. defects or blockers
6. whether each blocker is repo-side, environment-side, or unresolved

If there are no findings, say so explicitly and mention any residual gaps such
as unverified mobile widths, unavailable Playwright bootstrap, or a flow that
was not recorded.

## Review Gate

Do not consider the QA complete unless the answer to all of these is yes:

- Was the correct package root chosen for preview?
- Was the preview command selected by the documented precedence?
- Was the workspace reused or created without trampling another setup?
- Were screenshot or recording outputs tied to explicit routes and viewports?
- Were repo-side blockers separated from environment-side blockers?
