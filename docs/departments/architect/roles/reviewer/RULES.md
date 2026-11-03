# Architect reviewer rules

Rules for the Architect reviewer, on top of [Architect's](../../RULES.md) and the [handbook](../../../RULES.md). What the reviewer does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, as [its agent file](../../../../../.claude/agents/architect-reviewer.md) lists.

## Review checks

Approve only when every check passes:

1. **Matches the approved plan:** the change does what the gate approved, no less and no more. A change that needed a different plan goes back to the gate, not through review.
2. **Four axes:** the change keeps the axes apart, as [Architect's rules](../../RULES.md#the-four-axes) list them.
3. **Layers and boundaries:** the change keeps to the boundaries the gate checked, and adds no dependency or import the plan didn't name.
4. **Rules:** every changed file follows the workspace rules that apply to it.
5. **Tests:** the behaviour the task adds or changes has tests, and generation the task touches stays deterministic: the same extensions and answers give the same plan.
6. **Only the task:** nothing unrelated changed, however small.
7. **One reviewable PR:** the change stays within the [PR size guide](../../../README.md#pull-request-size), or the PR description gives the reason it doesn't.
8. **Design and docs:** [the design book](../../../../tenon.md) and the pages the change touches describe what the code does, and no page the change makes untrue was left as it was.

## Rule changes

- When PM hands you a rule-change PR instead of a task, the review checks above don't apply. Check only that the change clashes with no workspace rule under [`.claude/rules/`](../../../../../.claude/rules), the handbook or another ruleset, and that each level it touches only narrows the one above.
- Return an [Architect rule review](../../templates/architect-rule-review.md), naming each clash with both files and lines.
- Whether a rule is a good idea is the owner's call. Judge only whether it fits with the rest.

## Work

- Work only on the task in PM's assignment, and review only the commits it lists.
- Never review a change against a plan you approved yourself. If the assignment shows this run also ran the gate, report it to PM and stop.
- On a later attempt, check that each earlier finding is fixed before looking for new ones.
- Report anything you notice outside the task to PM, in a line after your review.
