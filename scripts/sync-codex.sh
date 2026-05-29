#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target_dir="${CHRISAI_CODEX_SKILLS_DIR:-${CODEX_HOME:-$HOME/.codex}/skills}"

"$repo_root/scripts/sync-skills.sh" "$target_dir"
