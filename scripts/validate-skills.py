#!/usr/bin/env python3
"""Validate portable ChrisAI skill folders."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = ROOT / "skills"
NAME_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$")


def parse_frontmatter(path: Path) -> tuple[dict[str, str], list[str]]:
    text = path.read_text(encoding="utf-8")
    errors: list[str] = []

    if not text.startswith("---\n"):
        return {}, ["missing opening YAML frontmatter delimiter"]

    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, ["missing closing YAML frontmatter delimiter"]

    metadata: dict[str, str] = {}
    for index, line in enumerate(text[4:end].splitlines(), start=2):
        if not line.strip():
            continue
        if ":" not in line:
            errors.append(f"line {index}: expected key: value")
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if not key:
            errors.append(f"line {index}: empty frontmatter key")
            continue
        metadata[key] = value

    return metadata, errors


def validate_skill(path: Path) -> list[str]:
    errors: list[str] = []
    skill_file = path / "SKILL.md"

    if not skill_file.exists():
        return [f"{path.relative_to(ROOT)}: missing SKILL.md"]

    if not NAME_RE.fullmatch(path.name):
        errors.append(f"{path.relative_to(ROOT)}: folder name must be lowercase kebab-case")

    metadata, frontmatter_errors = parse_frontmatter(skill_file)
    errors.extend(f"{skill_file.relative_to(ROOT)}: {error}" for error in frontmatter_errors)

    name = metadata.get("name")
    description = metadata.get("description")

    if not name:
        errors.append(f"{skill_file.relative_to(ROOT)}: missing name")
    elif name != path.name:
        errors.append(
            f"{skill_file.relative_to(ROOT)}: name {name!r} must match folder {path.name!r}"
        )
    elif not NAME_RE.fullmatch(name):
        errors.append(f"{skill_file.relative_to(ROOT)}: invalid name {name!r}")

    if not description:
        errors.append(f"{skill_file.relative_to(ROOT)}: missing description")

    extra_keys = sorted(set(metadata) - {"name", "description"})
    if extra_keys:
        errors.append(
            f"{skill_file.relative_to(ROOT)}: unsupported frontmatter keys: "
            + ", ".join(extra_keys)
        )

    return errors


def main() -> int:
    if not SKILLS_DIR.exists():
        print("skills directory is missing", file=sys.stderr)
        return 1

    skill_dirs = sorted(path for path in SKILLS_DIR.iterdir() if path.is_dir())
    if not skill_dirs:
        print("no skills found", file=sys.stderr)
        return 1

    errors: list[str] = []
    for path in skill_dirs:
        errors.extend(validate_skill(path))

    if errors:
        print("Skill validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Validated {len(skill_dirs)} skills.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
