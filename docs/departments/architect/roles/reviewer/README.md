# Architect reviewer

Reviews every change after the owner review: that it does what the approved plan said, keeps to the four axes and the layers, follows the rules, is tested, changes nothing outside the task, and that the design and pages describe what the code does. It is a separate run from the gate, so it never checks a change against a plan it approved itself. It is a department agent, [`architect-reviewer`](../../../../../.claude/agents/architect-reviewer.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [Architect's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. PM hands it the task, the brief, the gate verdicts, the diff with its commits, and the owner reviews.
2. It reads the changed files on the task branch, and the code around them where the change depends on it.
3. It goes through the review checks in its rules and returns an [Architect review](../../templates/architect-review.md):
   - **Approved:** the task goes on to QA.
   - **Changes requested:** each finding with what would make it pass. PM sends each one to the role that owns it, and counts the round toward the two-rejection limit.

It also reviews rule-change PRs, when PM hands it one. Then it checks only that the new rules clash with no other rule and that each level only narrows the one above, and returns an [Architect rule review](../../templates/architect-rule-review.md). Whether a rule is a good idea stays the owner's call.

The reviewer reads but never edits, and only PM passes on what it returns.
