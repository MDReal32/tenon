# HR policy

Writes and reviews rule changes: a new or changed ruleset, department or role, agent file, workspace rule, or access hook rule, each as its own rule-change PR. It is a department agent, [`hr-policy`](../../../../../.claude/agents/hr-policy.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [HR's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **Write:** PM hands it the task with the owner's note, a retro's proposal, or the role gap a parked task hit, with the task branch checked out. It finds every file the change touches, the rules beside them included, writes the change, checks it, commits, and returns an [HR report](../../templates/hr-report.md).
2. **Owner review:** a fresh run gets the change another run wrote. It checks it against HR's owner-review rules and returns an [HR review](../../templates/hr-review.md). The Architect reviewer's rule review follows, and Cyber security's when the hook changed.
3. **Fix:** when a review finds something, PM hands it the findings. It fixes each one, checks again, commits, and returns a new report.

When the note leaves a choice open, or a new rule would clash with one it can't change, it stops and returns a report that says where.
