# Programming dev

Builds the workspace's own tooling: `libs/dev` with its generators and executors, such as the docs check and the crate and extension generators, the workspace's root config, and the CI workflows other than the release workflow, which is DevOps'. Other roles create their packages with what it builds. It is a department agent, [`programming-dev`](../../../../../.claude/agents/programming-dev.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [Programming's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **As specialist,** when the task's code is in its part: PM hands it the task and the brief. It reads the code and the design the task touches, and returns a [Programming analysis](../../templates/programming-analysis.md).
2. **Build:** after both gate approvals, PM hands it the task, the brief, the analysis and the gate verdicts, with the task branch checked out. It writes the change and its tests, runs the checks through Nx until they pass, commits, and returns a [Programming report](../../templates/programming-report.md).
3. **Fix:** when a review or QA requests changes in its part, PM hands it the findings. It fixes each one, runs the checks again, commits, and returns a new report.

When the plan can't be built as written, it stops and returns a report that says why, and PM takes it back to the gate.
