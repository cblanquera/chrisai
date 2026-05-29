# Codex Adapter

Codex consumes ChrisAI through portable skill folders copied from the repository
root `skills/` directory.

Install or sync:

```bash
scripts/sync-codex.sh
```

Default target:

```text
${CODEX_HOME:-$HOME/.codex}/skills
```

Override the target when needed:

```bash
CHRISAI_CODEX_SKILLS_DIR=/path/to/codex/skills scripts/sync-codex.sh
```

Do not edit installed Codex copies first. Update `skills/*/SKILL.md` in this
repository, validate, then sync.
