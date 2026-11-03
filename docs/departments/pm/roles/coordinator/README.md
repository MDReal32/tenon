# PM coordinator

The orchestrator. It runs one task at a time through the departments, from the owner's task to a pull request ready for the owner's review. It is the main Claude Code session, not a separate agent. Its rules are in [`RULES.md`](RULES.md), on top of [PM's](../../RULES.md) and the [handbook](../../../RULES.md).

## A run, step by step

1. **Intake.** Read the issue and its comments, move it to `In Progress`, and pick a route: the full route for a feature, QA first for a bug, a short route for something small like a typo.
2. **Brief.** The BA assistant turns the task into a brief or a list of questions for the owner. The owning department looks at it as specialist, with at most two rounds between them.
3. **Gate.** The PO proxy checks product fit and the Architect gate checks technical fit. With both approvals, PM creates the task branch and opens a draft PR.
4. **Build and check.** Programming, then Docs, then a fresh owner review, the Architect reviewer and QA, as the route says. Each role commits its own work. PM pushes and updates the draft PR after every step.
5. **Finish.** PM marks the PR ready for review and comments on the issue. Once the owner merges, `Closes #<n>` closes the issue and the task is `Done`.

A step whose department isn't written yet parks the task, as the [overview](../../../README.md#flow) says.

## When a run stops

- **Questions.** A question only the owner can answer parks the task until the owner answers.
- **Rejections.** Two rejections from reviews or QA send the task back to the gate for one re-plan. If that fails too, it parks as blocked.
- **Too big.** A task that won't fit one reviewable PR stops, and PM proposes a split to the owner.
- **Stop.** The owner can stop the run. The current step finishes, the task parks with a note, and nothing new starts until the owner resumes it.

A parked task resumes from the "Resume point" in its PR description, or from its latest issue comment when there is no PR yet.

## Reading a run

The draft PR description is the record of a run: the route, the brief, both gate verdicts, every step with its commit, the checks and the resume point. Its format is [`templates/pr-description.md`](../../templates/pr-description.md).
