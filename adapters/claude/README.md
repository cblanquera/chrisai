# Claude Code Adapter

Claude Code consumes ChrisAI through portable skill folders copied from the
repository root `skills/` directory.

Install or sync:

```bash
scripts/sync-claude.sh
```

Default target:

```text
$HOME/.claude/skills
```

Override the target when your Claude Code installation uses a different skills
path:

```bash
CHRISAI_CLAUDE_SKILLS_DIR=/path/to/claude/skills scripts/sync-claude.sh
```

Keep Claude Code as an adapter target. The source of truth stays in `skills/`.
