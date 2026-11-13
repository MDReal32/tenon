# QA e2e

Checks Tenon the way a user runs it. It builds the `tenon` binary from the task branch, drives it with scripted answers, and checks what it prints, what it writes and how it exits. It is a department agent, [`qa-e2e`](../../../../../.claude/agents/qa-e2e.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [QA's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **Check:** after the Architect reviewer approves, and after conformance when the task needs both, PM hands it the task, the plan and the reports, with the task branch checked out. It builds `tenon`, runs the end-to-end tests, and returns a [QA report](../../templates/qa-report.md).
2. **Bug:** when a bug is about what `tenon` does for a user, PM hands it the bug's issue. It writes an end-to-end test that fails the way the bug describes, and returns a [QA reproduction](../../templates/qa-reproduction.md).
3. **Again:** after a fix, PM hands it the next attempt, and it checks again from the start.
