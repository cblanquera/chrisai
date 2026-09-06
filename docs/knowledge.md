# ChrisAI Knowledge

`chrisai-knowledge` installs, repairs, and updates a project-local `.agents`
operating surface.

Source skill: [`skills/chrisai-knowledge`](../skills/chrisai-knowledge/SKILL.md)

## Purpose

The skill maintains the rule files, workflows, references, and helper scripts
that future agents need in order to work from a local `.agents/` folder. It is
setup and repair infrastructure. It does not directly author project context,
resource payloads, product specs, or implementation records.

The active skill is the ChrisAI distribution of the Agent Workspace Rules
surface. The installed files intentionally keep `agent-workspace-rules` managed
markers and reference filenames so repeated installs can refresh the same
managed sections safely.

## Installed Surface

The installer manages these files under a target project root:

```text
.agents/
  AGENTS.md
  TERMS.md
  workflows/
    agent-file-creation.md
    agent-file-update.md
    agent-file-ingestion.md
    context-initialization.md
    repair-zombie-reference-files.md
    spec-driven-development.md
    spec-task-implementation.md
    spec-task-acceptance.md
    spec-grill-session.md
    spec-user-journeys.md
  references/
    00001-agent-workspace-rules.md
    00002-intersection-points.md
    00003-reference-recovery-points.md
  scripts/
    validate-agent-workspace.py
```

`.agents/AGENTS.md` is the local operating contract. `.agents/TERMS.md`
contains a managed glossary section with room for project-specific terms
outside the managed block. Workflow files and references provide the detailed
rules for lossless Agent File creation, ingestion, updates, context
initialization, spec-driven development, grill sessions, user journeys, and
zombie Reference File repair.

## Delegated Task Acceptance

The Spec Task Acceptance Workflow applies only when the user explicitly asks
an agent to accept named implemented tasks on their behalf. It waits for the
task file and verification result, identifies whether the deployment target is
web, desktop, mobile, or multiple targets, then chooses a library, an available
interactive agent capability, or a documented manual procedure. Playwright is
the default proposed library for web acceptance when the user did not select
one.

Each Acceptance Criterion receives a flat record such as
`.agents/specs/<spec-id>/acceptance/00001-001.md`. The same folder contains
`status.md` for latest results and `evidence.md` for screenshots, recordings,
and other Resource Files stored under
`.agents/resources/acceptance/<spec-id>/`. Library-backed acceptance also uses
human-editable JSON under project-root `tests/acceptance/` and a small
project-native runner; interactive agent tools and manual procedures do not
pretend to provide a standalone script.

Delegated acceptance moves a verified task to `accepted` only after every
criterion passes with recorded evidence. Failed, blocked, human-required, or
unrun criteria leave it at `verified`. Reports describe any remaining human
steps in simple language rather than requiring the reader to understand spec
terminology.

## Fidelity And File Size

The installed contract requires agents to finish a Complete Draft before
applying line thresholds. When an existing Agent Document is updated, the
owner Agent File and its relevant linked Reference Files are reconstructed and
merged with the accepted change before they are repartitioned.

The preferred 200-line target and hard 500-line limit apply to each final Agent
File, not to the amount of documentation as a whole or to an in-progress
Complete Draft. A split redistributes complete content into cohesive,
task-routed Reference Files; it does not authorize summarizing, omitting, or
deleting information or data.

These project Agent File rules exclude Raw Source under `.agents/resources/`
and independently installed skill packages under `.agents/skills/`. Installed
skills are reusable tooling and remain subject to their own package validator.

## User Journey Coverage

The Spec User Journeys Workflow audits every in-scope feature against every
materially distinct human actor and actor state. It derives applicable Use
Cases, expands materially different success, failure, permission, lifecycle,
dependency, and recovery scenarios, then walks each journey from trigger to
outcome using the current Context Files and current spec.

External systems and automated jobs are dependencies or handoffs, not Actors.
Wireframes and code are supporting evidence; behavior missing from or
conflicting with the current spec becomes a Gap rather than an inferred
requirement. The workflow finishes the complete coverage audit and records all
Gaps without automatically starting a Grill Session. Applicable journey
coverage must be complete before a spec can Freeze, although unresolved journey
Gaps may still follow the normal accepted, deferred, or explicitly unresolved
Freeze rules.

## Source Preservation Boundary

`.agents/resources/` is an evidence store, not a mirror of the repository.
External, transient, attached, deletion-bound, or explicitly archival non-code
sources are preserved there before rewriting. Source code stays in its
authoritative location and is recorded through precise paths plus a revision or
content hash when useful. Only an explicit user request for a source-code
archive authorizes copying code into `.agents/resources/`; source location,
durability, or deletion risk does not imply that permission.

## Install, Repair, Or Update

Run the bundled installer from the skill folder. Start with a dry run:

```bash
python scripts/install_agent_workspace_rules.py --target /path/to/project
```

Apply after the planned changes look correct:

```bash
python scripts/install_agent_workspace_rules.py --target /path/to/project --apply
```

Use `python3` instead of `python` on systems where Python 3 is exposed that
way.

The installer plans every target file before writing. If any conflict is found,
it reports the conflict and writes nothing. When managed markers already exist,
it refreshes those managed sections. When `.agents/AGENTS.md` or
`.agents/TERMS.md` already exists without markers, it appends managed sections
so user-authored content can remain outside the managed block.

## Validation

After installation or repair, run:

```bash
python scripts/validate_agent_workspace.py --target /path/to/project
```

After the target `.agents` folder exists, the target project can also run:

```bash
python .agents/scripts/validate-agent-workspace.py
```

Validation checks managed-surface completeness, line caps, reference naming,
links, context-index routing, and zombie Reference Files. It reports hard-rule
violations as errors and preference-level or review-required issues as
warnings. It does not decide whether context content is truly Accepted Reusable
Truth or whether a split retained all documented information; those still
require source and coverage review.

## Scope Rules

- Do not install `.agents/context/` content.
- Do not install `.agents/resources/` content.
- Do not install or manage `.agents/skills/` content; the workspace validator
  excludes installed skill packages from Agent File line-count and local-link
  checks.
- Keep `.agents/TERMS.md` managed by section so project-specific terms can be
  added outside the managed block.
- Keep installed references flat under `.agents/references/`.
- Install only references used by `.agents/AGENTS.md` or
  `.agents/workflows/*`.

## Practical Prompts

Install or repair the local operating surface:

```text
Use $chrisai-knowledge to install or repair this project's .agents workspace
rules. Dry-run first, apply only after the plan is safe, then validate.
```

Refresh an existing `.agents` workspace:

```text
Use $chrisai-knowledge to update the managed .agents rules and workflows in this
project without overwriting project-authored content outside managed sections.
```

Investigate validation output:

```text
Use $chrisai-knowledge to interpret the .agents validator results and propose the
smallest safe repair.
```
