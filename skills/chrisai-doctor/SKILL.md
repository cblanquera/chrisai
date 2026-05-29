---
name: chrisai-doctor
description: Use when the user explicitly asks to diagnose, verify, inspect, or troubleshoot a ChrisAI installation, version, repository checkout, skill validation failure, or agent adapter sync state without necessarily changing files.
---

# ChrisAI Doctor

Use this skill for diagnostics before mutation. Prefer read-only checks unless
the user explicitly asks for repair.

## Checks

1. Confirm the current working directory is the ChrisAI repository.
2. Run `scripts/check-version.sh`.
3. Run `scripts/validate-skills.py`.
4. Inspect the requested adapter target:
   - Codex: `${CHRISAI_CODEX_SKILLS_DIR:-${CODEX_HOME:-$HOME/.codex}/skills}`
   - Claude Code: `${CHRISAI_CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}`
   - OpenCode: `${CHRISAI_OPENCODE_SKILLS_DIR:-$HOME/.config/opencode/skills}`
5. Compare installed skill folder names against repository `skills/` folder
   names when troubleshooting sync drift.
6. Check whether the adapter target has `local-environment/SKILL.md`.
7. If `local-environment` is missing and the user is troubleshooting command
   resolution, recommend setting it up from
   `templates/local-environment/SKILL.md`.
8. If `local-environment` exists, inspect whether it includes relevant entries
   for the failing runtime or package manager.

## Reporting

Report:

- repository path
- version and commit
- validation result
- requested adapter target path
- `local-environment` status
- missing, extra, or stale-looking installed skill folders

Do not run sync or update scripts unless the user explicitly approves repair.
Do not edit `local-environment` unless the user explicitly asks for the
diagnosed command or executable path to be recorded.
