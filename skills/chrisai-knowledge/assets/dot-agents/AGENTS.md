# Agent Workspace Rules

This file is the local operating contract for the project root `.agents/` workspace.

<!-- agent-workspace-rules:start -->
## Read First

- [Agent Workspace Terms](TERMS.md): load when a task depends on Agent Workspace terminology or when adding new local terms.
- [Agent File Creation Workflow](workflows/agent-file-creation.md): use when creating, splitting, or linking a new Agent Document.
- [Agent File Update Workflow](workflows/agent-file-update.md): use when revising an existing Agent Document, including one distributed across an owner Agent File and Reference Files.
- [Agent File Ingestion Workflow](workflows/agent-file-ingestion.md): use when importing Source Material into a new or existing Agent Document, including deciding whether to archive the source or reference it in place.
- [Context Initialization Workflow](workflows/context-initialization.md): use when bootstrapping or substantially rebuilding `.agents/context/` from mixed project inputs.
- [Spec Driven Development Workflow](workflows/spec-driven-development.md): use when creating, researching, resolving gaps for, or freezing `.agents/specs/*/` work.
- [Spec Task Implementation Workflow](workflows/spec-task-implementation.md): use when planning or implementing tasks from a Frozen spec.
- [Spec Task Acceptance Workflow](workflows/spec-task-acceptance.md): use when the user delegates acceptance of implemented spec tasks to an agent.
- [Spec Grill Session Workflow](workflows/spec-grill-session.md): use when pressure-testing, clarifying, or resuming unresolved spec questions.
- [Spec User Journeys Workflow](workflows/spec-user-journeys.md): use when auditing human actors, actor states, features, applicable Use Cases, journey scenarios, clarity Gaps, and coverage before Freeze.
- [Zombie Reference File Repair Workflow](workflows/repair-zombie-reference-files.md): use when Reference Files have no clear inbound owner.
- [Agent Workspace Rules Reference](references/00001-agent-workspace-rules.md): load for detailed folder, line-cap, reference-link, and resource-link rules.

## Operating Scope

All markdown files under `.agents/` are Agent Files unless explicitly excluded. Raw Source markdown under `.agents/resources/` is an excluded Resource File. Independently installed reusable skill packages under `.agents/skills/` are tooling, not project Agent Files; validate them with their own skill-package validator.

Fidelity comes before file size. This rule applies to every Agent File write, including writes performed through another workflow. Complete the Agent Document before applying line thresholds. When updating, include the existing owner Agent File and every relevant linked Reference File in that complete document.

Only after the content is complete, partition it, normally by cohesive section or retrieval task, into a concise owner or router Agent File and descriptive Reference Files. A Lossless Split redistributes content; it must not summarize, omit, or delete information or data.

Line thresholds apply to each final Agent File at workflow closeout, not to an in-progress Complete Draft or the Agent Document as a whole. Prefer 200 lines or fewer. Final Agent Files must contain 500 lines or fewer. A 201-500 line Agent File is allowed when another split would harm coherence or retrieval.

## Folder Rules

`.agents/context/` is the only agent source-of-truth folder. Store only Accepted Reusable Truth there.

Agents finding truth must start with `.agents/context/index.md` when context exists.

Promote accepted reusable truth into `.agents/context/`. Demote content out of `.agents/context/` when it is not Accepted Reusable Truth, but preserve useful material in the right Spec File, Reference File, or Resource File. If the correct demotion destination is unclear, ask the user where to demote it before editing.

`.agents/specs/` stores planning, evidence, gap resolution, and frozen implementation contracts. Spec Files must never be treated as the source of truth over `.agents/context/`.

`.agents/references/` stores flat, numbered Reference Files used by Agent Files.

When content is split from an owner Agent File, the owner and its linked Reference Files collectively retain the complete Agent Document. A Reference File is deferred content, not disposable content; it does not establish authority independently of its owner and provenance.

`.agents/resources/` stores Raw Source and other Resource Files. Zombie Resource Files are allowed.

Do not mirror the repository into `.agents/resources/`. Keep source code in its authoritative location and record precise Source Provenance. Copy source code into `.agents/resources/` only when the user explicitly requests a source-code archive; being external, transient, at risk of deletion, or otherwise unavailable is not permission. Report those risks and ask instead. Non-code Source Material may be archived when the ingestion workflow determines preservation is required.

`.agents/skills/` stores independently installed reusable skill packages. It is outside the project Agent Document, Reference Link, line-cap, and Intersection Scan rules in this contract.

`.agents/workflows/` stores reusable Agent Workspace maintenance workflows.

`.agents/scripts/` stores deterministic helper scripts for Agent Workspace checks.

## Reference Rules

Name Reference Files as `.agents/references/00001-meta-title.md`, incrementing the five-digit number for each new Reference File.

Every Reference Link must summarize what the Reference File contains and say when an agent should load it for the current task.

Reference Files may link to Context Files, Resource Files, or other Reference Files.

There must never be a zombie Reference File. Every Reference File must be linked by another Agent File. If no owner can be found after repair review, notify the user.

## Validation

Run the deterministic validator after creating, ingesting, updating, splitting, or repairing Agent Files:

```bash
python .agents/scripts/validate-agent-workspace.py
```

Use `python3` instead of `python` on systems where that is the Python 3 executable.

Link validation ignores fenced code examples and does not report link errors or
warnings from `.agents/workflows/` or `.agents/skills/`.

## Workflow Closeout

After setup and after each workflow pass, tell the user what changed, the validation result, any blocker or user decision still needed, and the recommended next step.

When several next steps are realistic, include up to two useful alternatives. Use the [Agent Workspace Rules Reference](references/00001-agent-workspace-rules.md) when choosing the next step.
<!-- agent-workspace-rules:end -->
