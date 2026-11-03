# PM coordinator rules

Rules for the coordinator, on top of [PM's](../../RULES.md) and the [handbook](../../../RULES.md). What the coordinator does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** the main session's. The coordinator has no agent file, so its start-up check covers the model only.

## Intake

- Run one task at a time. Don't start a task while another run has an unfinished step.
- When picking the next task: tasks that were waiting and got an answer, and the owner's PR review comments, come first; then the top of the project's `Todo` column.
- Read the task from its issue, comments included, never from memory or a note. Move its `Status` to `In Progress` when the run starts. An issue that isn't in the project is added to it first.
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
- When a role reports something unrelated to the task, open a new issue for it in the project's `Todo` column, link it in the PR description, and leave it unfixed.

## Limits

- The BA assistant and the specialist get at most two rounds. Questions still open after that go to the owner, and the task parks.
- Two rejections of a step (reviews or QA) send the task back to the gate for one re-plan. A rejection after the re-plan parks the task as blocked, with a message for the owner.

## Git and the PR

- After both gate approvals, create the task branch as [git.md](../../../../../.claude/rules/git.md) says and open a draft PR against `develop` with [`templates/pr-description.md`](../../templates/pr-description.md). The task branch carries the issue number, as [git.md](../../../../../.claude/rules/git.md#naming) names it.
- After every step, check the step's commit, push the task branch and update the PR description, including its resume point.
- At the end, run the checks the route needs, mark the PR ready for review and post it on the issue. Never merge it.
- PR size: about 400 hand-written changed lines or 20 files is the guide, as the [overview](../../../README.md#pull-request-size) sets it. When the task won't fit, stop and propose a split along a meaningful seam on the issue, and go on with the slices the owner accepts, each as a sub-issue.

## Parking and resuming

- Park whenever the run waits on the owner: post [`templates/issue-comment.md`](../../templates/issue-comment.md) on the issue and set the resume point. The issue stays `In Progress`.
- A parked task resumes when the owner replies on the issue. Read the reply before going on.
- Before parking, every finished step is committed and pushed, so nothing is left uncommitted in the checkout.
- A resumed task starts at its resume point.

## Stop

- When the owner stops the run, let the current step finish, push it, and park the task with a note.
- Start nothing new until the owner resumes it.

## After the merge

- When the owner merges the PR, check that the issue closed and is `Done` in the project. Close it and move it yourself when the merge didn't, as [PM's knowledge](../../pm-knowledge.md) explains.

## Retro

- When a merged PR turns out to have a mistake the departments missed, trace which step should have caught it and ask that department to propose a rule or checklist change. Name the step, never blame the role.
