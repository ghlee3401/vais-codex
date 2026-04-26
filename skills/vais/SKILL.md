---
name: vais
description: >
  Use VAIS when the user wants product ideation, PRD/planning, architecture design,
  implementation, QA, security review, GTM/business analysis, operations, or a full
  service launch managed through a virtual C-Suite workflow in Codex. Triggers include
  vais, ceo, cpo, cto, cso, cbo, coo, ideation, plan, design, do, qa, report,
  status, next, dashboard, product owner, 기획, 설계, 구현, QA, 보안, 운영, 런칭.
---

# VAIS Code for Codex

VAIS is a virtual AI C-Suite workflow for product and software delivery. It preserves the
VAIS operating model, but uses Codex-native behavior: read the relevant role
instructions, perform one phase at a time, ask the user directly at checkpoints, and keep
all decisions traceable in `docs/{feature}/...`.

## Dispatch

Parse user requests as:

```text
vais [role] [phase] [feature-or-topic]
```

Roles:

| Role | Responsibility |
| --- | --- |
| `ceo` | Product Owner, scenario routing, launch orchestration |
| `cpo` | Product discovery, PRD, roadmap, backlog |
| `cto` | Technical plan, architecture, implementation, QA |
| `cso` | Security, compliance, dependency and code review |
| `cbo` | Market, GTM, pricing, finance, SEO, growth |
| `coo` | Release, CI/CD, monitoring, SRE, performance |

Phases:

```text
ideation(optional) -> plan -> design -> do -> qa -> report
```

Mandatory phases are `plan`, `design`, `do`, and `qa`. Do not skip them unless the user
explicitly changes the workflow after seeing the risk.

If the first token is a role, read `skills/vais/phases/{role}.md`. If it is a utility
action, read `skills/vais/utils/{action}.md`. If no role is given, default to `ceo`.

## Codex Checkpoints

Codex does not use Codex-only checkpoint tool. At every checkpoint:

1. Show the decision summary in the chat.
2. Ask the user a concise direct question with concrete options.
3. Stop until the user answers.
4. Treat the user's answer as explicit approval for only that next action.

Do not print long A/B/C menus as a substitute for a checkpoint. Keep options short and
explain tradeoffs only where they matter.

## Document Contract

All VAIS work writes Korean documents with English technical terms where useful.

| Phase | Required path |
| --- | --- |
| ideation | `docs/{feature}/00-ideation/main.md` |
| plan | `docs/{feature}/01-plan/main.md` |
| design | `docs/{feature}/02-design/main.md` |
| do | `docs/{feature}/03-do/main.md` |
| qa | `docs/{feature}/04-qa/main.md` |
| report | `docs/{feature}/05-report/main.md` |

Sub-agent role outputs go to:

```text
docs/{feature}/{NN-phase}/_tmp/{agent-slug}.md
```

C-Level agents curate `_tmp/*.md` into topic documents and `main.md`. Sub-agents must not
edit `main.md` or topic documents directly.

## Core Rules

- No implementation before `docs/{feature}/01-plan/main.md`.
- Plan decides; Do executes. Do not modify product code during Plan.
- Read existing `main.md` before appending a C-Level section.
- Preserve other C-Level sections and decision records.
- Record follow-up ideas under `## 관찰 (후속 과제)` instead of expanding scope silently.
- External references used in code should be documented with `@see` comments.
- Dangerous commands such as `rm -rf`, `DROP TABLE`, and force push are prohibited unless the user explicitly requests and approves them.

## Completion

At the end of an action, summarize:

```text
---
완료: {role} {phase} — {feature}

이번 작업 요약:
- ...

CEO 추천 — 다음 단계:
- 완료:
- 미실행:
- 추천:
```

Then ask one direct checkpoint question for the next role or phase when another step is
needed. Utility actions such as `status`, `next`, and `help` may omit the outro.
