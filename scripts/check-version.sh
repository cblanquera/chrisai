#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version_file="$repo_root/VERSION"

if [ ! -f "$version_file" ]; then
  printf 'VERSION file is missing\n' >&2
  exit 1
fi

printf 'ChrisAI version: %s\n' "$(tr -d '[:space:]' < "$version_file")"

if git -C "$repo_root" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Git commit: %s\n' "$(git -C "$repo_root" rev-parse --short HEAD)"
  branch="$(git -C "$repo_root" branch --show-current)"
  if [ -n "$branch" ]; then
    printf 'Git branch: %s\n' "$branch"
  fi
fi
