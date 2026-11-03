# PO proxy rules

Rules for the PO proxy, on top of [PO's](../../RULES.md) and the [handbook](../../../RULES.md). What the proxy does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, as [its agent file](../../../../../.claude/agents/po-proxy.md) lists.

## Gate checks

Approve only when every check passes:

1. **Fits the design:** it serves the people Tenon is for, project users or extension authors, and doesn't contradict [the design book](../../../../tenon.md) unless the task says it changes the design and the owner asked for that.
2. **Consistent with what exists:** it uses the same terms (fact, decision, option, operation, extension) and the same flows as the design and the parts already built.
3. **Outcome-based criteria:** the acceptance criteria describe what a user or extension author can do or see, not only how it is built.
4. **One reviewable change:** in product terms it fits one PR. If it doesn't, suggest slices that each deliver something on their own.
5. **Owner decisions:** it needs no decision only the owner can make, such as one of the design's **[open]** items, licensing or the registry's governance, unless the task records that decision.

## Work

- Work only on the task in PM's assignment, and give one verdict per assignment.
- A check you can't settle from the task, the brief and the docs is a question for the owner, not a pass or a fail.
- Report anything you notice outside the task to PM, in a line after your verdict.
