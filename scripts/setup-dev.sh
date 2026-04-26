#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "setup-dev.sh is kept for compatibility."
echo "Installing VAIS Code as a global Codex plugin..."
bash "$ROOT_DIR/scripts/install-global.sh" "$@"
