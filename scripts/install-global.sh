#!/usr/bin/env bash
set -euo pipefail

PLUGIN_NAME="vais-code"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLUGINS_DIR="${CODEX_PLUGINS_DIR:-"$HOME/plugins"}"
PLUGIN_LINK="$PLUGINS_DIR/$PLUGIN_NAME"
MARKETPLACE_FILE="${CODEX_MARKETPLACE_FILE:-"$HOME/.agents/plugins/marketplace.json"}"
DRY_RUN=0

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

run() {
  if [[ "$DRY_RUN" == "1" ]]; then
    printf '[dry-run] %s\n' "$*"
  else
    "$@"
  fi
}

if [[ ! -f "$ROOT_DIR/.codex-plugin/plugin.json" ]]; then
  echo "ERROR: .codex-plugin/plugin.json not found in $ROOT_DIR" >&2
  exit 1
fi

if [[ "$DRY_RUN" == "1" ]]; then
  echo "[dry-run] would create plugin link: $PLUGIN_LINK -> $ROOT_DIR"
  echo "[dry-run] would update marketplace: $MARKETPLACE_FILE"
  exit 0
fi

mkdir -p "$PLUGINS_DIR"
mkdir -p "$(dirname "$MARKETPLACE_FILE")"

if [[ -L "$PLUGIN_LINK" ]]; then
  current_target="$(readlink "$PLUGIN_LINK")"
  if [[ "$current_target" != "$ROOT_DIR" ]]; then
    ln -sfn "$ROOT_DIR" "$PLUGIN_LINK"
  fi
elif [[ -e "$PLUGIN_LINK" ]]; then
  echo "ERROR: $PLUGIN_LINK exists and is not a symlink." >&2
  echo "Move it aside or set CODEX_PLUGINS_DIR to another directory." >&2
  exit 1
else
  ln -s "$ROOT_DIR" "$PLUGIN_LINK"
fi

node - "$MARKETPLACE_FILE" <<'NODE'
const fs = require('fs');
const file = process.argv[2];
const entry = {
  name: 'vais-code',
  source: {
    source: 'local',
    path: './plugins/vais-code'
  },
  policy: {
    installation: 'INSTALLED_BY_DEFAULT',
    authentication: 'ON_INSTALL'
  },
  category: 'Productivity'
};

let data;
if (fs.existsSync(file)) {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} else {
  data = {
    name: 'local-marketplace',
    interface: {
      displayName: 'Local Plugins'
    },
    plugins: []
  };
}

if (!Array.isArray(data.plugins)) data.plugins = [];
const idx = data.plugins.findIndex((p) => p && p.name === entry.name);
if (idx >= 0) data.plugins[idx] = entry;
else data.plugins.push(entry);

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
NODE

node "$ROOT_DIR/scripts/vais-validate-plugin.js" "$ROOT_DIR"

echo "Installed VAIS Code globally:"
echo "  plugin: $PLUGIN_LINK -> $ROOT_DIR"
echo "  marketplace: $MARKETPLACE_FILE"
