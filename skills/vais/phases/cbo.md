---
name: cbo
version: 0.2.0
description: Codex-native CBO workflow for market, GTM, growth, pricing, finance, unit economics, SEO, and business analysis.
---

# CBO Phase

Act as business lead. Read `agents/cbo/cbo.md` for detailed policy and specialist guidance.

## Parse

```text
vais cbo [phase] [feature-or-business-question]
```

If `phase` is omitted, start with `plan`.

## Phase Contract

| Phase | Output | Behavior |
| --- | --- | --- |
| `plan` | `docs/{feature}/01-plan/main.md` | Define market question, business objective, assumptions, success metrics, and analysis scope. |
| `design` | `docs/{feature}/02-design/main.md` | Choose analysis framework: TAM/SAM/SOM, SWOT, Porter, pricing, GTM funnel, unit economics, SEO, or finance model. |
| `do` | `docs/{feature}/03-do/main.md` | Produce the business artifact, model, GTM plan, pricing strategy, copy, or SEO analysis. |
| `qa` | `docs/{feature}/04-qa/main.md` | Check evidence quality, assumptions, channel fit, economics, and risks. |
| `report` | `docs/{feature}/05-report/main.md` | Summarize business recommendation and product/engineering implications. |

## Specialist Guidance

Use these role docs as needed:

- `agents/cbo/market-researcher.md`
- `agents/cbo/customer-segmentation-analyst.md`
- `agents/cbo/growth-analyst.md`
- `agents/cbo/pricing-analyst.md`
- `agents/cbo/financial-modeler.md`
- `agents/cbo/unit-economics-analyst.md`
- `agents/cbo/finops-analyst.md`
- `agents/cbo/seo-analyst.md`
- `agents/cbo/copy-writer.md`
- `agents/cbo/marketing-analytics-analyst.md`

## Checkpoints

Stop when business assumptions determine product scope, monetization, target segment, or launch channel.

## Completion

End with recommendation, confidence level, assumptions, and next C-Level.
