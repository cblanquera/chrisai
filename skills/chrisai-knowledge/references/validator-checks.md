# Validator Checks

Use `scripts/validate_agent_workspace.py` from this skill, or `.agents/scripts/validate-agent-workspace.py` from an installed target workspace, after installing or repairing `.agents` rules.

## Errors

The validator reports errors for deterministic hard-rule failures:

- Missing `.agents/` workspace.
- Missing `.agents/AGENTS.md` or `.agents/TERMS.md`.
- Missing `.agents/references/`, `.agents/scripts/`, or `.agents/workflows/`.
- Missing `.agents/scripts/validate-agent-workspace.py`.
- Missing managed workflow or Reference Files installed by `agent-workspace-rules`.
- Missing `.agents/context/index.md` when `.agents/context/` exists.
- Final Agent Files over 500 lines. Raw Source markdown under `.agents/resources/` and independently installed skill packages under `.agents/skills/` are excluded from Agent File checks. Skill packages follow their own validator. The error directs project Agent Files to split losslessly rather than shorten content.
- Reference subfolders.
- Reference File names that do not match `00001-meta-title.md`.
- Duplicate Reference File numbers.
- Local markdown links in checked project Agent Files that point to missing
  files. Links inside fenced code blocks are examples, not live references.
- Reference or Resource Links with empty link text.
- `.agents/context/index.md` links that resolve outside `.agents/context/`, including links that leave `.agents/`.
- Zombie Reference Files with no inbound link from another Agent File.

The validator does not parse markdown under `.agents/skills/` for line counts or
local links. It does not report local-link errors or warnings from
`.agents/workflows/`; valid workflow links to Reference Files may still
establish inbound ownership. This keeps independently installed tooling and
reusable workflow examples from producing project link errors.

## Warnings

The validator reports warnings for deterministic review signals:

- Agent Files over the preferred 200-line target but still at or below the 500-line cap. Keeping a coherent 201-500 line file is allowed; the warning is a routing review, not an instruction to summarize.
- Reference File numbering gaps.
- Reference or Resource Links whose text looks like a path or filename instead of a useful description.

## Human Review

These rules are intentionally not treated as deterministic:

- Whether `.agents/context/` contains only Accepted Reusable Truth.
- Whether non-code Source Material needed an independent Raw Source archive, and whether source code was kept in place unless the user explicitly requested a source-code archive.
- Whether Raw Source under `.agents/resources/` should be promoted into an Agent File.
- Whether the final owner Agent File and linked Reference Files retain every in-scope detail from the Complete Draft and coverage inventory after creation, ingestion, update, or splitting.
- Whether an update preserved all unaffected information and recorded an explicit disposition for anything corrected, superseded, rejected, demoted, or removed.
- Whether split boundaries form cohesive sections or retrieval tasks without forcing agents to load unrelated information.
- Whether a Reference Link description is semantically sufficient for a specific future task.
- Whether an applicable user-journey audit covers every material feature across every human actor and actor state, records the applicable use cases and scenarios, and turns each unclear or conflicting step into a Gap before Freeze.
- Whether a zombie Reference File should be linked, rewritten, moved, or removed after no owner can be found.

For those cases, use the validator output as a routing signal and perform the relevant coverage review. Line-count compliance alone does not prove an Agent Document is complete.
