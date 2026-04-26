#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if command -v git >/dev/null 2>&1 && [[ -d "$ROOT_DIR/.git" ]]; then
  git -C "$ROOT_DIR" pull --ff-only
fi

bash "$ROOT_DIR/scripts/install-global.sh"
