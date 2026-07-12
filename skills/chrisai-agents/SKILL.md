---
name: chrisai-agents
description: Use when installing, repairing, or updating a project-root `.agents` operating surface, including AGENTS, TERMS, workflows, workflow references, validator helpers, Agent File line caps, spec-driven development rules, grill sessions, user journeys, and zombie Reference File checks.
license: MIT
---

# ChrisAI Agents

## Purpose

Use this skill to install or repair the local operating surface for a project root `.agents/` folder. This skill maintains the rule files, workflows, references used by those workflows, and deterministic helper scripts; it does not directly author Accepted Reusable Truth in `.agents/context/` or project resources in `.agents/resources/`.

This is the ChrisAI distribution of the Agent Workspace Rules surface. The installed `.agents` files intentionally keep `agent-workspace-rules` managed markers and reference filenames so repeated installs can refresh those managed sections safely.

## Installed Surface

The installer manages these target files:

- `.agents/AGENTS.md`: compact local operating contract.
- `.agents/TERMS.md`: managed glossary section plus room for project-specific terms.
- `.agents/workflows/agent-file-creation.md`: workflow for drafting, splitting, and linking Agent Files.
- `.agents/workflows/agent-file-ingestion.md`: workflow for importing Source Material into Agent Files while preserving Raw Source.
- `.agents/workflows/context-initialization.md`: workflow for bootstrapping or substantially rebuilding `.agents/context/` from mixed project inputs.
- `.agents/workflows/spec-driven-development.md`: workflow for creating, researching, resolving gaps for, promoting context from, and freezing Spec Files.
- `.agents/workflows/spec-task-implementation.md`: workflow for planning and implementing tasks from Frozen Spec Files.
- `.agents/workflows/spec-grill-session.md`: optional workflow for resumable, lossless spec clarification sessions.
- `.agents/workflows/spec-user-journeys.md`: optional workflow for mapping user journeys and deriving journey-driven Gaps.
- `.agents/workflows/repair-zombie-reference-files.md`: workflow for repairing unowned Reference Files.
- `.agents/references/00001-agent-workspace-rules.md`: detailed rule reference used by AGENTS and workflows.
- `.agents/references/00002-intersection-points.md`: detailed scan points used by the ingestion workflow.
- `.agents/references/00003-reference-recovery-points.md`: detailed owner selection points used by the zombie Reference File repair workflow.
- `.agents/scripts/validate-agent-workspace.py`: deterministic validator for managed-surface completeness, line caps, reference naming, links, context-index routing, and zombie Reference Files.

The installer plans every target file before writing. If any conflict is found, it reports the conflict and writes nothing. It refreshes managed sections when markers already exist. It appends managed sections to existing `.agents/AGENTS.md` and `.agents/TERMS.md` when those files exist without markers, so user-authored content can remain outside the managed block.

## Install Or Repair

1. Identify the target project root. The Agent Workspace is `<project-root>/.agents`.
2. Run the installer in dry-run mode first:

```bash
python scripts/install_agent_workspace_rules.py --target /path/to/project
```

3. Apply the installer when the planned changes are correct:

```bash
python scripts/install_agent_workspace_rules.py --target /path/to/project --apply
```

4. If the installer reports conflicts, inspect the existing target files and merge the managed rule content manually instead of overwriting user-authored project content.
5. Run validation after installation or repair:

```bash
python scripts/validate_agent_workspace.py --target /path/to/project
```

After installation, the target project can also run:

```bash
python .agents/scripts/validate-agent-workspace.py
```

Use `python3` instead of `python` on systems where that is the Python 3 executable.

## After Setup Or Repair

After installing or repairing a target `.agents/` workspace, tell the user what
changed, where to start, the validation result, and the recommended next step.
When several routes are plausible, include up to two useful alternatives. Do
not continue into context initialization, ingestion, spec work, or implementation
unless the user asks for that next step.

## Scope Rules

- Do not install `.agents/context/` content. Installed rules may describe how context should be used, but Accepted Reusable Truth must come from the target project and user-approved sources.
- Do not install `.agents/resources/` content. Installed rules may describe Resource Links and Raw Source preservation, but resource files are project-owned.
- Keep `.agents/TERMS.md` managed by section so future project-specific terms can be added outside the managed block.
- Keep references flat under `.agents/references/`; this skill installs only references used by `.agents/AGENTS.md` or `.agents/workflows/*`.

## Deterministic Validation

Run `scripts/validate_agent_workspace.py` for deterministic checks. It reports errors for hard-rule violations and warnings for preference-level or review-required issues. Read [Validator Checks](references/validator-checks.md) when interpreting output or deciding whether a rule can be checked mechanically.

The validator does not decide whether context content is truly Accepted Reusable Truth. That requires reading Source Material and user instructions.

## Bundled Resources

- `assets/dot-agents/`: templates installed into the target `.agents/` folder.
- `scripts/install_agent_workspace_rules.py`: dry-run or apply installer for managed rule files.
- `scripts/validate_agent_workspace.py`: deterministic checker installed into target `.agents/scripts/`.
- `references/validator-checks.md`: details of what the validator can and cannot prove.
