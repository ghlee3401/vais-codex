# VAIS Code - Codex Plugin

This repository is the Codex port of `original VAIS`.

## Purpose

VAIS provides a Product Owner oriented virtual C-Suite:

- CEO: top-level orchestrator and scenario router
- CPO: product definition and PRD
- CTO: architecture, implementation, tests, QA
- CSO: security, compliance, dependency and code review
- CBO: market, GTM, pricing, finance, growth
- COO: release, CI/CD, monitoring, operations

## Runtime Model

Codex does not use the Codex-incompatible checkpoint tool or sub-agent hook runtime. VAIS
therefore uses Codex-native checkpoints:

1. Summarize the decision.
2. Ask a direct question with concrete options.
3. Stop until the user answers.
4. Continue only the approved role/phase.

Sub-agent markdown files are specialist role instructions. Use them to guide work, but do not
assume a separate runtime will automatically execute them.

## Workflow Contract

```text
ideation(optional) -> plan -> design -> do -> qa -> report
```

Mandatory phases:

```text
plan -> design -> do -> qa
```

Document paths:

```text
docs/{feature}/00-ideation/main.md
docs/{feature}/01-plan/main.md
docs/{feature}/02-design/main.md
docs/{feature}/03-do/main.md
docs/{feature}/04-qa/main.md
docs/{feature}/05-report/main.md
```

Sub-agent scratchpads:

```text
docs/{feature}/{NN-phase}/_tmp/{agent-slug}.md
```

## Global Installation

This repo is designed to be used from Git on multiple machines:

```bash
bash scripts/install-global.sh
```

The installer registers:

```text
~/plugins/vais-code -> <this repo>
~/.agents/plugins/marketplace.json
```

## Version Files

Keep these versions aligned:

- `.codex-plugin/plugin.json`
- `package.json`
- `package-lock.json`
- `vais.config.json`
