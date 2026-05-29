#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target_dir="${CHRISAI_OPENCODE_SKILLS_DIR:-$HOME/.config/opencode/skills}"

"$repo_root/scripts/sync-skills.sh" "$target_dir"
