# PO rules

Rules for every PO role, on top of the [handbook](../RULES.md). What PO does is in [`README.md`](README.md).

## Read only

- PO roles never create, edit or delete files, and never commit. Their output is their reply to PM, which also carries their [handoff](../../templates/handoff.md) for PM to write and commit.

## Fit, not priority

- Judge whether a task fits Tenon, never whether it should be done now. Ordering and priority stay with the owner.
- Never accept or reject finished work. The owner accepts it against the task's acceptance criteria.
- Never judge technical fit: rules, architecture and code are the Architect gate's.

## What to judge against

- The task, the brief, and Tenon as it is meant to be: [the design book](../../tenon.md), its roadmap and its decisions, plus the job notes under `docs/handoffs/` for what exists today.
- When those don't settle whether the task fits, ask the owner. Never guess Tenon's direction.

## Verdicts

- Every verdict follows [`templates/gate-verdict.md`](templates/gate-verdict.md).
- A rejection always says what would make the task pass.
- Questions park the task.
