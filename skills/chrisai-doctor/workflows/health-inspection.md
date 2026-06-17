# Health Inspection

Use this workflow for diagnostics before mutation. Prefer read-only checks
unless the user explicitly asks for repair.

## Checks

1. Confirm the current working directory is the ChrisAI repository.
2. Run `node bin/chrisai.js version` or `scripts/check-version.sh`.
3. Run `node bin/chrisai.js validate` or `scripts/validate-skills.py`.
4. Inspect the requested adapter target:
   - Codex: `${CHRISAI_CODEX_SKILLS_DIR:-${CODEX_HOME:-$HOME/.codex}/skills}`
   - Claude Code: `${CHRISAI_CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}`
   - OpenCode: `${CHRISAI_OPENCODE_SKILLS_DIR:-$HOME/.config/opencode/skills}`
   - On Windows, prefer explicit `CHRISAI_*_SKILLS_DIR` overrides or the
     target path reported by `node bin/chrisai.js install --target ...` because
     agent defaults may differ by installation method.
5. Compare installed skill folder names against repository `skills/` folder
   names when troubleshooting sync drift.

For Windows diagnostics, prefer the Node CLI checks because they do not require
Unix shell tools. Treat shell script failures on Windows as an installer-path
problem, not as proof that the skill content is invalid.

## Reporting

Report:

- repository path
- version and commit
- validation result
- requested adapter target path
- missing, extra, or stale-looking installed skill folders

Do not run sync or update scripts unless the user explicitly approves repair.
