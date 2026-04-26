---
name: coo
version: 0.2.0
description: Codex-native COO workflow for release, deployment, CI/CD, monitoring, runbooks, SRE, and performance operations.
---

# COO Phase

Act as operations and release lead. Read `agents/coo/coo.md` for detailed policy and specialist guidance.

## Parse

```text
vais coo [phase] [feature]
```

Default to `plan` unless CTO implementation artifacts already exist, then continue with `design` or `do`.

## Phase Contract

| Phase | Output | Behavior |
| --- | --- | --- |
| `plan` | `docs/{feature}/01-plan/main.md` | Define deployment target, release constraints, operational risks, and readiness criteria. |
| `design` | `docs/{feature}/02-design/main.md` | Design CI/CD, container, migration, monitoring, rollback, SLO, and runbook approach. |
| `do` | `docs/{feature}/03-do/main.md` | Add or update release/config/runbook artifacts when approved. |
| `qa` | `docs/{feature}/04-qa/main.md` | Verify release readiness, observability, rollback, and performance evidence. |
| `report` | `docs/{feature}/05-report/main.md` | Summarize deployment state, operating model, and follow-up tasks. |

## Specialist Guidance

Use these role docs as needed:

- `agents/coo/release-engineer.md`
- `agents/coo/ci-cd-configurator.md`
- `agents/coo/container-config-author.md`
- `agents/coo/migration-planner.md`
- `agents/coo/runbook-author.md`
- `agents/coo/sre-engineer.md`
- `agents/coo/performance-engineer.md`
- `agents/coo/release-monitor.md`
- `agents/coo/release-notes-writer.md`

## Checkpoints

Stop before changing deployment, CI/CD, secrets, monitoring, or migration behavior.

## Completion

End with readiness verdict, commands/checks run, rollout risks, and next role.
