# PM coordinator rules

Rules for the coordinator, on top of [PM's](../../RULES.md) and the [handbook](../../../RULES.md). What the coordinator does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** the main session's. The coordinator has no agent file, so its start-up check covers the model only.

## Intake

- Run one task at a time. Don't start a task while another run has an unfinished step.
- When picking the next task: tasks that were waiting and got an answer, and the owner's PR review comments, come first; then the owner's priority; then the oldest.
- Find the job the task belongs to, then read its job note and handoffs as [handoffs.md](../../../../../.claude/rules/handoffs.md) says. When the task starts a new job, create its job folder under its area and its job note. When it is unclear which job the task belongs to, ask the owner.
- Pick the route:
  - **Feature:** BA assistant, specialist, gate, Programming, Docs, owner review, Architect reviewer, QA.
  - **Bug:** QA reproduces it and writes a failing test first. The BA analysis is skipped; the rest of the route follows.
  - **Small change** (a typo, a copy fix): Programming, then QA.
  - **Design change** (only the design book changes): BA assistant, gate, then the owner's review.
- The gate may make a route longer, never shorter. Write the route and the reason for any skipped step in the PR description.

## Assignments

- Start each step with [`templates/assignment.md`](../../templates/assignment.md), through the role's own agent, `<dept>-<role>`. A role without an agent file can't take a step, so the task parks.
- A step is done when its output follows the role's template and its handoff follows the [handoff template](../../../../templates/handoff.md). Otherwise send it back once, saying what is missing. A second incomplete output counts as a rejection.
- Owner review always runs as a new run of the owning role, never the run that wrote the change. The Architect reviewer never reviews against a plan the same run approved at the gate.
- Send each review or QA finding to the role that owns what it names.
- When a role reports something unrelated to the task, tell the owner as a new task to prioritize, note it in the PR description, and leave it unfixed.

## Limits

- The BA assistant and the specialist get at most two rounds. Questions still open after that go to the owner, and the task parks.
- Two rejections of a step (reviews or QA) send the task back to the gate for one re-plan. A rejection after the re-plan parks the task as blocked, with a message for the owner.

## Git and the PR

- After both gate approvals, create the task branch as [git.md](../../../../../.claude/rules/git.md) says and open a draft PR against `develop` with [`templates/pr-description.md`](../../templates/pr-description.md).
- After every step, check the step's commit, push the task branch and update the PR description, including its resume point.
- At the end, run the checks the route needs, mark the PR ready for review and tell the owner. Never merge it.
- PR size: about 400 hand-written changed lines or 20 files is the guide, as the [overview](../../../README.md#pull-request-size) sets it. When the task won't fit, stop and propose a split along a meaningful seam to the owner, and go on with the slices the owner accepts.

## Parking and resuming

- Park whenever the run waits on the owner: send [`templates/owner-message.md`](../../templates/owner-message.md) and set the resume point.
- Before parking, every finished step is committed and pushed, so nothing is left uncommitted in the checkout.
- A resumed task starts at its resume point.

## Stop

- When the owner stops the run, let the current step finish, push it, and park the task with a note.
- Start nothing new until the owner resumes it.

## Retro

- When a merged PR turns out to have a mistake the departments missed, trace which step should have caught it and ask that department to propose a rule or checklist change. Name the step, never blame the role.
