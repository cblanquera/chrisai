#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: %s <target-directory>\n' "$0" >&2
}

if [ "$#" -ne 1 ]; then
  usage
  exit 2
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$repo_root/skills"
target_dir="$1"

if [ ! -d "$source_dir" ]; then
  printf 'Missing source directory: %s\n' "$source_dir" >&2
  exit 1
fi

python3 "$repo_root/scripts/validate-skills.py"
mkdir -p "$target_dir"

for skill_dir in "$source_dir"/*; do
  [ -d "$skill_dir" ] || continue
  skill_name="$(basename "$skill_dir")"
  mkdir -p "$target_dir/$skill_name"
  rsync -a --delete --delete-excluded --exclude '__pycache__/' --exclude '*.pyc' \
    "$skill_dir/" "$target_dir/$skill_name/"
done

printf 'Synced ChrisAI skills to %s\n' "$target_dir"
