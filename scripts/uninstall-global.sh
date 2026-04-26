#!/usr/bin/env bash
set -euo pipefail

PLUGIN_NAME="vais-code"
PLUGINS_DIR="${CODEX_PLUGINS_DIR:-"$HOME/plugins"}"
PLUGIN_LINK="$PLUGINS_DIR/$PLUGIN_NAME"
MARKETPLACE_FILE="${CODEX_MARKETPLACE_FILE:-"$HOME/.agents/plugins/marketplace.json"}"

if [[ -L "$PLUGIN_LINK" ]]; then
  unlink "$PLUGIN_LINK"
elif [[ -e "$PLUGIN_LINK" ]]; then
  echo "WARNING: $PLUGIN_LINK exists but is not a symlink; leaving it untouched." >&2
fi

if [[ -f "$MARKETPLACE_FILE" ]]; then
  node - "$MARKETPLACE_FILE" <<'NODE'
const fs = require('fs');
const file = process.argv[2];
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
if (Array.isArray(data.plugins)) {
  data.plugins = data.plugins.filter((p) => !p || p.name !== 'vais-code');
}
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
NODE
fi

echo "Uninstalled VAIS Code global registration."
