# ChrisAI Agents

`chrisai-agents` installs, repairs, and updates a project-local `.agents`
operating surface.

Source skill: [`skills/chrisai-agents`](../skills/chrisai-agents/SKILL.md)

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
    agent-file-ingestion.md
    context-initialization.md
    repair-zombie-reference-files.md
    spec-driven-development.md
    spec-grill-session.md
    spec-task-implementation.md
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
rules for Agent Files, context initialization, spec-driven development, grill
sessions, user journeys, and zombie Reference File repair.

## Install Or Repair

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
Truth; that still requires reading source material and user instructions.

## Scope Rules

- Do not install `.agents/context/` content.
- Do not install `.agents/resources/` content.
- Keep `.agents/TERMS.md` managed by section so project-specific terms can be
  added outside the managed block.
- Keep installed references flat under `.agents/references/`.
- Install only references used by `.agents/AGENTS.md` or
  `.agents/workflows/*`.

## Practical Prompts

Install or repair the local operating surface:

```text
Use $chrisai-agents to install or repair this project's .agents workspace
rules. Dry-run first, apply only after the plan is safe, then validate.
```

Refresh an existing `.agents` workspace:

```text
Use $chrisai-agents to update the managed .agents rules and workflows in this
project without overwriting project-authored content outside managed sections.
```

Investigate validation output:

```text
Use $chrisai-agents to interpret the .agents validator results and propose the
smallest safe repair.
```
