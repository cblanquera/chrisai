#!/usr/bin/env python3
"""Install or refresh managed .agents workspace rule files."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


MARKER_START = "<!-- agent-workspace-rules:start -->"
MARKER_END = "<!-- agent-workspace-rules:end -->"

SKILL_DIR = Path(__file__).resolve().parents[1]
ASSET_ROOT = SKILL_DIR / "assets" / "dot-agents"

TEMPLATE_FILES = (
    Path("AGENTS.md"),
    Path("TERMS.md"),
    Path("references/00001-agent-workspace-rules.md"),
    Path("references/00002-intersection-points.md"),
    Path("references/00003-reference-recovery-points.md"),
    Path("workflows/agent-file-creation.md"),
    Path("workflows/agent-file-ingestion.md"),
    Path("workflows/context-initialization.md"),
    Path("workflows/spec-driven-development.md"),
    Path("workflows/spec-task-implementation.md"),
    Path("workflows/spec-grill-session.md"),
    Path("workflows/spec-user-journeys.md"),
    Path("workflows/repair-zombie-reference-files.md"),
)

SCRIPT_FILES = (
    (
        Path("scripts/validate-agent-workspace.py"),
        SKILL_DIR / "scripts" / "validate_agent_workspace.py",
    ),
)

REQUIRED_DIRS = (
    Path("references"),
    Path("scripts"),
    Path("workflows"),
)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def marked_block(text: str) -> str | None:
    start = text.find(MARKER_START)
    end = text.find(MARKER_END)
    if start == -1 or end == -1 or end < start:
        return None
    end += len(MARKER_END)
    return text[start:end]


def replace_marked(existing: str, template: str) -> tuple[str | None, str]:
    template_block = marked_block(template)
    existing_block = marked_block(existing)
    has_start = MARKER_START in existing
    has_end = MARKER_END in existing

    if template_block is None:
        raise ValueError("template is missing managed markers")

    if existing_block is not None:
        updated = existing.replace(existing_block, template_block)
        return updated, "refresh managed section"

    if has_start != has_end:
        return None, "conflict: incomplete managed markers"

    return None, "conflict: target exists without managed markers"


def plan_file(
    target: Path, template: Path, exact_managed: bool = False
) -> tuple[str, str | None]:
    template_text = read_text(template)
    if not target.exists():
        return "create", template_text

    existing = read_text(target)
    if existing == template_text:
        return "ok", None

    if exact_managed:
        return "refresh managed file", template_text

    updated, reason = replace_marked(existing, template_text)
    if updated is None:
        if target.name in {"AGENTS.md", "TERMS.md"}:
            block = marked_block(template_text)
            assert block is not None
            suffix = "\n\n" if not existing.endswith("\n") else "\n"
            return "append managed section", existing + suffix + block + "\n"
        return reason, None

    if updated == existing:
        return "ok", None
    return reason, updated


def install(target_root: Path, apply: bool) -> int:
    agents_dir = target_root / ".agents"
    errors: list[str] = []
    actions: list[str] = []
    planned_dirs: list[Path] = []
    planned_files: list[tuple[Path, str, bool]] = []
    changes_needed = False

    for rel_dir in REQUIRED_DIRS:
        target_dir = agents_dir / rel_dir
        if target_dir.exists():
            actions.append(f"ok dir {target_dir}")
        else:
            actions.append(f"create dir {target_dir}")
            changes_needed = True
            planned_dirs.append(target_dir)

    for rel_file in TEMPLATE_FILES:
        target_file = agents_dir / rel_file
        template_file = ASSET_ROOT / rel_file
        if not template_file.exists():
            errors.append(f"missing template {template_file}")
            continue

        action, content = plan_file(target_file, template_file)
        actions.append(f"{action} {target_file}")
        if content is not None or action.startswith("conflict"):
            changes_needed = True

        if action.startswith("conflict"):
            errors.append(f"{target_file}: {action}; merge manually")
            continue

        if content is not None:
            planned_files.append((target_file, content, False))

    for rel_file, source_file in SCRIPT_FILES:
        target_file = agents_dir / rel_file
        if not source_file.exists():
            errors.append(f"missing script source {source_file}")
            continue

        action, content = plan_file(target_file, source_file, exact_managed=True)
        actions.append(f"{action} {target_file}")
        if content is not None:
            changes_needed = True

        if content is not None:
            planned_files.append((target_file, content, True))

    mode = "APPLY" if apply else "DRY RUN"
    print(f"{mode}: agent workspace rules install")
    for action in actions:
        print(action)

    if errors:
        print("\nErrors:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        if apply:
            print("\nNo changes were written.", file=sys.stderr)
        return 1

    if apply:
        for target_dir in planned_dirs:
            target_dir.mkdir(parents=True, exist_ok=True)

        for target_file, content, executable in planned_files:
            target_file.parent.mkdir(parents=True, exist_ok=True)
            target_file.write_text(content, encoding="utf-8")
            if executable:
                target_file.chmod(target_file.stat().st_mode | 0o755)

    if not apply and changes_needed:
        print("\nRe-run with --apply to write these changes.")
    elif not apply:
        print("\nNo changes needed.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Install or refresh managed .agents workspace rule files."
    )
    parser.add_argument(
        "--target",
        default=".",
        help="Project root containing or receiving the .agents workspace.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Write changes. Without this flag the script only prints a dry run.",
    )
    args = parser.parse_args()

    target_root = Path(args.target).expanduser().resolve()
    return install(target_root, args.apply)


if __name__ == "__main__":
    raise SystemExit(main())
