# OpenCode Adapter

OpenCode consumes ChrisAI through portable skill folders copied from the
repository root `skills/` directory.

Install or sync:

```bash
scripts/sync-opencode.sh
```

Default target:

```text
$HOME/.config/opencode/skills
```

Override the target when your OpenCode installation uses a different skills
path:

```bash
CHRISAI_OPENCODE_SKILLS_DIR=/path/to/opencode/skills scripts/sync-opencode.sh
```

Keep OpenCode as an adapter target. The source of truth stays in `skills/`.
