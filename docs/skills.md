# ChrisAI Skills

This repository is the canonical source for portable ChrisAI skills. The
`skills/` folders are agent-facing bundles: each active skill keeps activation
and routing rules in `SKILL.md`, then uses internal `workflows/`,
`references/`, `scripts/`, or `assets/` only when the skill needs them.

Do not treat workflow and reference files as separate skills. They are internal
guidance loaded through the parent skill.

## Active Skills

| Skill | Use for | Primary internal guidance |
| --- | --- | --- |
| [`chrisai-coding`](skills/coding.md) | Auditing, recommending improvements to, and fixing existing JavaScript, TypeScript, React TSX, TypeScript tests, HTML, or CSS. | `workflows/javascript.md`, `workflows/typescript.md`, `workflows/react-tsx.md`, `workflows/typescript-tests.md`, `workflows/html-css.md`, `workflows/logic-review.md`, `workflows/maintainability-audit.md` |
| [`chrisai-design`](skills/design.md) | Software design work involving creative direction, existing design extraction, wireframes, static design drafts, feedback loops, and Design Handoff Packages. | `workflows/creative-direction.md`, `workflows/design-system-extraction.md`, `workflows/wireframes.md`, `workflows/design-drafts.md`, `workflows/feedback-loop.md`, `workflows/design-handoff-package.md` |
| [`chrisai-docs`](skills/docs.md) | Developer-facing technical writing, guided learning docs, API reference, markdown formatting, and copy editing for technical readers. | `references/guided-learning.md`, `references/api-reference.md`, `references/formatting.md`, `workflows/copy-editing.md` |
| `chrisai-doctor` | Explicit ChrisAI diagnostics, validation, repository state checks, updates, installs, and adapter sync work. | `workflows/health-inspection.md`, `workflows/update-and-sync.md` |

## Boundaries

- Keep `skills/*/SKILL.md` as the activation and routing surface.
- Keep human orientation in root docs, adapter docs, or release docs instead of
  individual skill folders.
- Prefer updating active skills in this repository before updating installed
  Codex, Claude Code, or OpenCode adapter copies.
- Use `workflows/maintenance.md` for repository validation and sync commands.
