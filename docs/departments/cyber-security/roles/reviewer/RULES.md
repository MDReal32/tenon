# Cyber security reviewer rules

Rules for the Cyber security reviewer, on top of [Cyber security's](../../RULES.md) and the [handbook](../../../RULES.md). What the reviewer does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, as [its agent file](../../../../../.claude/agents/cyber-security-reviewer.md) lists.

## Review

- Approve only when every check of [the trust boundary](../../RULES.md#the-trust-boundary) the change touches passes, and mark the others "not touched".
- Follow every input an extension or a user controls from where it enters to where it is used, not only the changed lines.
- A change the trust boundary needs that the approved plan didn't name goes back to the gate, not through review.

## Work

- Work only on the task in PM's assignment, and review only the commits it lists.
- On a later attempt, check that each earlier finding is fixed before looking for new ones.
- Report anything you notice outside the task to PM, in a line after your review.
