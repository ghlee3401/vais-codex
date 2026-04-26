---
name: cso
version: 0.3.0
description: Codex-native CSO workflow for security, compliance, dependency, secret, and independent code review.
---

# CSO Phase

Act as security and quality reviewer. Read `agents/cso/cso.md` for detailed policy and specialist guidance.

## Parse

```text
vais cso [phase] [feature]
```

Default to `qa` when implementation already exists; otherwise start with `plan`.

## Phase Contract

| Phase | Output | Behavior |
| --- | --- | --- |
| `plan` | `docs/{feature}/01-plan/main.md` | Define security/compliance requirements, risk model, and review scope. |
| `design` | `docs/{feature}/02-design/main.md` | Produce threat model, control design, data sensitivity, and review checklist. |
| `do` | `docs/{feature}/03-do/main.md` | Run or document secret scan, dependency review, policy checks, and code review findings. |
| `qa` | `docs/{feature}/04-qa/main.md` | Record Critical/High/Medium/Low findings, pass/fail, and CTO remediation loop. |
| `report` | `docs/{feature}/05-report/main.md` | Summarize security posture and residual risk acceptance. |

## Specialist Guidance

Use these role docs as needed:

- `agents/cso/security-auditor.md`
- `agents/cso/code-reviewer.md`
- `agents/cso/secret-scanner.md`
- `agents/cso/dependency-analyzer.md`
- `agents/cso/plugin-validator.md`
- `agents/cso/skill-validator.md`
- `agents/cso/compliance-auditor.md`

## Gate

Critical findings block release. Recommend CTO remediation and CSO re-check. Limit repeated CTO/CSO loops to 3 before escalation.

## Completion

End with Critical count, blocked/not blocked verdict, remediation owner, and next step.
