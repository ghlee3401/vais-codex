# VAIS Code

Virtual AI C-Suite for product and software delivery in Codex.

VAIS Code ports the `original VAIS` operating model to Codex: CEO/CPO/CTO/CSO/CBO/COO
roles, 38 specialist role documents, phase gates, document contracts, and global plugin
installation.

## Install Globally

Clone the repo and register it as a Codex plugin:

```bash
git clone https://github.com/ghlee3401/vais-codex.git ~/workspace/vais-codex
cd ~/workspace/vais-codex
bash scripts/install-global.sh
```

The installer creates:

```text
~/plugins/vais-code -> ~/workspace/vais-codex
~/.agents/plugins/marketplace.json
```

Update on another machine or after pulling changes:

```bash
cd ~/workspace/vais-codex
git pull
bash scripts/update-global.sh
```

Uninstall:

```bash
bash scripts/uninstall-global.sh
```

## Usage

Use `vais` naturally in Codex:

```text
vais ceo plan online-bookstore
vais cpo plan social-login-integration
vais cto design payment-retry-logic
vais cto do dashboard-realtime-chart
vais cto qa dashboard-realtime-chart
vais status
vais next
```

## Workflow

```text
ideation(optional) -> plan -> design -> do -> qa -> report
```

Documents are written to:

```text
docs/{feature}/{NN-phase}/main.md
```

Sub-agent scratchpads are written to:

```text
docs/{feature}/{NN-phase}/_tmp/{agent-slug}.md
```

## C-Suite

| Role | Responsibility |
| --- | --- |
| CEO | Product Owner, scenario routing, launch orchestration |
| CPO | Product discovery, PRD, roadmap, backlog |
| CTO | Architecture, implementation, tests, QA |
| CSO | Security, compliance, dependencies, independent review |
| CBO | Market, GTM, pricing, finance, SEO, growth |
| COO | Release, CI/CD, monitoring, SRE, performance |

## Development

```bash
npm test
npm run lint
npm run validate
```

`vais.config.json` is the single source of truth for roles, phases, dependencies, document
paths, and launch pipeline behavior.
