#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const jsonMode = process.argv.includes('--json');

const required = [
  '.codex-plugin/plugin.json',
  'skills/vais/SKILL.md',
  'vais.config.json',
  'AGENTS.md',
  'README.md',
];

const expectedRoles = ['ceo', 'cpo', 'cto', 'cso', 'cbo', 'coo'];
const forbiddenRuntimeStrings = [
  'CLAUDE_PLUGIN_ROOT',
  '.claude-plugin',
  'claude-plugin',
  'AskUserQuestion',
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'legacy'].includes(entry.name)) walk(p, out);
    } else {
      out.push(p);
    }
  }
  return out;
}

const errors = [];
const warnings = [];
const info = [];

for (const rel of required) {
  if (!exists(rel)) errors.push(`Missing required file: ${rel}`);
}

if (exists('.codex-plugin/plugin.json')) {
  try {
    const plugin = JSON.parse(read('.codex-plugin/plugin.json'));
    if (plugin.name !== 'vais-code') errors.push('plugin.json name must be "vais-code"');
    if (!plugin.skills || plugin.skills !== './skills/') errors.push('plugin.json skills must be "./skills/"');
    if (!plugin.interface?.displayName) errors.push('plugin.json interface.displayName is required');
  } catch (err) {
    errors.push(`plugin.json is invalid JSON: ${err.message}`);
  }
}

if (exists('skills/vais/SKILL.md')) {
  const skill = read('skills/vais/SKILL.md');
  if (!/^---\n[\s\S]*name:\s*vais/m.test(skill)) errors.push('skills/vais/SKILL.md must declare name: vais');
  if (!/^---\n[\s\S]*description:/m.test(skill)) errors.push('skills/vais/SKILL.md must declare description');
}

for (const role of expectedRoles) {
  if (!exists(`agents/${role}/${role}.md`)) errors.push(`Missing C-Level agent: agents/${role}/${role}.md`);
}

const agentFiles = walk(path.join(root, 'agents')).filter((p) => p.endsWith('.md'));
const cLevelFiles = new Set(expectedRoles.map((role) => path.join(root, 'agents', role, `${role}.md`)));
const subAgentCount = agentFiles.filter((p) => !p.includes(`${path.sep}_shared${path.sep}`) && !cLevelFiles.has(p)).length;
info.push(`C-Level roles: ${expectedRoles.length}`);
info.push(`Specialist role documents: ${subAgentCount}`);
if (subAgentCount < 38) warnings.push(`Expected at least 38 specialist role documents; found ${subAgentCount}`);

const scanFiles = walk(root).filter((p) => /\.(md|js|json|sh)$/.test(p));
for (const file of scanFiles) {
  const rel = path.relative(root, file);
  if (
    rel === 'CHANGELOG.md' ||
    rel === 'scripts/vais-validate-plugin.js'
  ) {
    continue;
  }
  const text = fs.readFileSync(file, 'utf8');
  for (const token of forbiddenRuntimeStrings) {
    if (text.includes(token)) {
      errors.push(`Forbidden Claude runtime token "${token}" found in ${rel}`);
    }
  }
}

const result = {
  passed: errors.length === 0,
  errors,
  warnings,
  info,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`VAIS Codex validation: ${result.passed ? 'PASS' : 'FAIL'}\n`);
  for (const line of info) process.stdout.write(`info: ${line}\n`);
  for (const line of warnings) process.stdout.write(`warning: ${line}\n`);
  for (const line of errors) process.stdout.write(`error: ${line}\n`);
}

process.exit(result.passed ? 0 : 1);
