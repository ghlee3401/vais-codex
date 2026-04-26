---
name: ideation
version: 0.3.0
description: Codex-native optional ideation workflow for shaping unclear product, business, technical, or operational ideas before Plan.
---

# Ideation Phase

Use this optional phase when the idea is not ready for `plan`.

## Behavior

- Explore the problem, audience, context, constraints, and desired outcome.
- Do not modify product code.
- Do not force a full VAIS workflow if the user is still brainstorming.
- Capture a document only when the user asks to preserve the discussion or when moving into Plan.

## Output

When captured, write:

```text
docs/{feature}/00-ideation/main.md
```

Include:

- raw user idea
- problem framing
- candidate users
- opportunity hypotheses
- open questions
- recommended C-Level and next phase

## Exit Criteria

Move to `plan` when:

- the problem is clear enough to scope
- the target user or system is identified
- the user chooses a recommended C-Level

End by recommending one of:

- `vais ceo plan {feature}`
- `vais cpo plan {feature}`
- `vais cto plan {feature}`
- `vais cbo plan {feature}`
- `vais cso plan {feature}`
- `vais coo plan {feature}`
