# QA conformance

Checks that extensions, SDKs and host adapters speak the protocol as it is written. It drives them through the conformance suite, `tenon-conformance`. It is a department agent, [`qa-conformance`](../../../../../.claude/agents/qa-conformance.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [QA's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **Check:** after the Architect reviewer approves, PM hands it the task, the plan and the reports, with the task branch checked out. It builds what the change touches, runs each affected extension, SDK sample and host adapter through the suite, and returns a [QA report](../../templates/qa-report.md).
2. **Bug:** when a bug is about protocol behaviour, PM hands it the bug's issue. It writes a scenario that fails the way the bug describes, and returns a [QA reproduction](../../templates/qa-reproduction.md).
3. **Again:** after a fix, PM hands it the next attempt, and it checks again from the start.
