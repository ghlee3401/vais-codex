#!/usr/bin/env node
/**
 * VAIS Code - Advisor Support Check
 *
 * Codex port: advisor model calls are disabled by default until a stable plugin
 * model-call interface exists. This script preserves the old mode file contract.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();
const MODE_FILE = path.join(PROJECT_DIR, '.vais', 'advisor-mode.json');

function writeMode(mode, detail) {
  const dir = path.dirname(MODE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const data = {
    mode,
    detail,
    checked_at: new Date().toISOString(),
    codex_version: process.env.CODEX_VERSION || 'unknown',
  };
  fs.writeFileSync(MODE_FILE, JSON.stringify(data, null, 2));
  return data;
}

function check() {
  if (process.env.VAIS_ADVISOR_MODE === 'native') {
    return writeMode('native', 'VAIS_ADVISOR_MODE=native');
  }
  return writeMode('disabled', 'Codex advisor wrapper disabled');
}

if (require.main === module) {
  const result = check();
  process.stdout.write(`[VAIS] Advisor mode: ${result.mode} (${result.detail})\n`);
}

module.exports = { check, MODE_FILE };
