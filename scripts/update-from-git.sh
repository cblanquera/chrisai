#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

git -C "$repo_root" pull --ff-only
python3 "$repo_root/scripts/validate-skills.py"
"$repo_root/scripts/check-version.sh"
