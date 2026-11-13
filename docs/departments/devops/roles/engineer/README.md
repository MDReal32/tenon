# DevOps engineer

Builds the release pipeline and the launchers, keeps the root git files, reviews changes to CI, Nx, build config and environment variables, and handles every request that needs `.env`. It is a department agent, [`devops-engineer`](../../../../../.claude/agents/devops-engineer.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [DevOps'](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **As specialist,** when the task's work is in its part: PM hands it the task and the brief. It reads what the task touches and returns a [DevOps analysis](../../templates/devops-analysis.md).
2. **Build:** after both gate approvals, PM hands it the task, the brief, the analysis and the gate verdicts, with the task branch checked out. It builds the change in its part with its tests, runs the checks, commits, and returns a [DevOps report](../../templates/devops-report.md).
3. **Review:** when the gate named DevOps, PM hands it the change at the owner review. It checks the change in DevOps' scope and returns a [DevOps review](../../templates/devops-review.md).
4. **Secrets:** when another role needs a value in `.env` checked or changed, PM hands it the request. It does that, and returns a report that says the variable's state, never its value.
5. **Fix:** when a review or QA requests changes in its part, PM hands it the findings. It fixes each one, checks again, commits, and returns a new report.

When the plan can't be built as written, it stops and returns a report that says why, and PM takes it back to the gate.
