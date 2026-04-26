# VAIS Code - Codex Agent Instructions

VAIS Code is a Codex plugin that provides a virtual C-Suite workflow for product and
software delivery.

## Workflow

```text
ideation(optional) -> plan -> design -> do -> qa -> report
```

Mandatory phases: `plan`, `design`, `do`, `qa`.

Documents are written under:

```text
docs/{feature}/{NN-phase}/main.md
```

Phase folders:

| Phase | Folder |
| --- | --- |
| ideation | `00-ideation` |
| plan | `01-plan` |
| design | `02-design` |
| do | `03-do` |
| qa | `04-qa` |
| report | `05-report` |

## Roles

| Role | Responsibility |
| --- | --- |
| CEO | Product Owner, dynamic routing, launch orchestration |
| CPO | Product definition, PRD, roadmap, backlog |
| CTO | Architecture, implementation, testing, QA |
| CSO | Security, compliance, independent review |
| CBO | Market, GTM, pricing, finance, growth |
| COO | Release, CI/CD, monitoring, operations |

Sub-agent markdown files under `agents/` are role instructions, not autonomous Codex
runtime units. Use them as specialized guidance when doing work in that role.

## Rules

1. Do not implement before a Plan document exists.
2. Do not skip mandatory phases silently.
3. Keep Plan limited to decisions and documents; code changes belong in Do.
4. Preserve C-Level coexistence in `main.md`: append or replace only the current role's section.
5. Preserve sub-agent scratchpads in `_tmp/`.
6. Ask the user directly at checkpoints and stop until they answer.
7. Never use dangerous commands without explicit user approval.

## Global Plugin Install

This repository is intended to be cloned and installed globally:

```bash
bash scripts/install-global.sh
```

The installer registers `~/plugins/vais-code` and `~/.agents/plugins/marketplace.json`.
