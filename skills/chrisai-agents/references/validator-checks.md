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
- Agent Files over 500 lines. Raw Source markdown under `.agents/resources/` is excluded from Agent File line caps.
- Reference subfolders.
- Reference File names that do not match `00001-meta-title.md`.
- Duplicate Reference File numbers.
- Local markdown links inside `.agents/` that point to missing files.
- Reference or Resource Links with empty link text.
- `.agents/context/index.md` links that resolve outside `.agents/context/`, including links that leave `.agents/`.
- Zombie Reference Files with no inbound link from another Agent File.

## Warnings

The validator reports warnings for deterministic review signals:

- Agent Files over the preferred 200-line target but still under the 500-line cap.
- Reference File numbering gaps.
- Reference or Resource Links whose text looks like a path or filename instead of a useful description.

## Human Review

These rules are intentionally not treated as deterministic:

- Whether `.agents/context/` contains only Accepted Reusable Truth.
- Whether Raw Source under `.agents/resources/` should be promoted into an Agent File.
- Whether a Reference Link description is semantically sufficient for a specific future task.
- Whether a zombie Reference File should be linked, rewritten, moved, or removed after no owner can be found.

For those cases, use the validator output as a routing signal and inspect the project files before editing.
