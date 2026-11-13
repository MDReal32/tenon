# PM coordinator rules

Rules for the coordinator, on top of [PM's](../../RULES.md) and the [handbook](../../../RULES.md). What the coordinator does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** the main session's. The coordinator has no agent file, so its start-up check covers the model only.

## Intake

- Run one task at a time. Don't start a task while another run has an unfinished step; a task whose PR waits on the owner's review, or that is parked in `Waiting on owner` or `Blocked` with its steps pushed, has none.
- Keep going without asking, and stop only where [the autonomy rules](../../../../../.claude/rules/autonomy.md) say, with at most 3 of the roadmap's PRs open for review at once.
- When picking the next task: `Waiting on owner` tasks the owner has answered, and the owner's PR review comments, come first; then the top of the project's `Todo` column; then the sub-issues of a split task, in the order BA gave them; then the open milestone with the lowest number, its `Backlog` tasks by issue number, as [the autonomy rules](../../../../../.claude/rules/autonomy.md) say.
- Read the task from its issue, comments included, never from memory or a note. Move its `Status` to `In Progress` when the run starts, and set its `Kind` and `Area` if they are empty. An issue that isn't in the project is added to it first.
- Find the job the task belongs to, then read its job note and handoffs as [handoffs.md](../../../../../.claude/rules/handoffs.md) says. When the task starts a new job, create its job folder under its area and its job note. When it is unclear which job the task belongs to, ask the owner.
- Pick the route:
  - **Feature:** BA assistant, specialist, gate, Programming, Docs, owner review, Architect reviewer, QA.
  - **Bug:** QA reproduces it and writes a failing test first, by the QA role PM names with the gate's QA criteria. The BA analysis is skipped; the rest of the route follows.
  - **Small change** (a typo, a copy fix): Programming, then the QA roles PM names with the gate's QA criteria, or none when they name none.
  - **Design change** (only the design book changes): BA assistant, gate, then the owner's review.
- The gate may make a route longer, never shorter. Write the route and the reason for any skipped step in the PR description.

## Assignments

- When the Architect gate approves, set the issue's `Size` from its verdict.
- Start each step with [`templates/assignment.md`](../../templates/assignment.md), through the role's own agent, `<dept>-<role>`. A role without an agent file can't take a step, so the task parks.
- A step is done when its output follows the role's template and its handoff follows the [handoff template](../../../../templates/handoff.md). Otherwise send it back once, saying what is missing. A second incomplete output counts as a rejection.
- Owner review always runs as a new run of the owning role, never the run that wrote the change. The Architect reviewer never reviews against a plan the same run approved at the gate.
- Send each review or QA finding to the role that owns what it names.
- When a role reports something unrelated to the task, open a new issue for it in the project's `Backlog`, with its `Kind` and `Area`, link it in the PR description, and leave it unfixed.

## Limits

- The BA assistant and the specialist get at most two rounds. Questions still open after that go to the owner, and the task parks.
- Two rejections of a step (reviews or QA) send the task back to the gate for one re-plan. A rejection after the re-plan parks the task as blocked, with a message for the owner.

## Git and the PR

- After both gate approvals, create the task branch as [git.md](../../../../../.claude/rules/git.md) says and open a draft PR against `develop`, or for a chained task against the previous link's branch, grouped as [git.md](../../../../../.claude/rules/git.md#github-stacks) says, with [`templates/pr-description.md`](../../templates/pr-description.md). The task branch carries the issue number, as [git.md](../../../../../.claude/rules/git.md#naming) names it.
- On a bug, create the task branch at intake, before QA reproduces it; the draft PR still opens after both gate approvals.
- After every step, check the step's commit, push the task branch and update the PR description, including its resume point.
- At the end, run the checks the route needs, mark the PR ready for review, post it on the issue and move the issue to `In Review`. Never merge it.
- PR size: about 400 hand-written changed lines or 20 files is the guide, as the [overview](../../../README.md#pull-request-size) sets it. When the task won't fit, stop and assign the split to the BA assistant. Open the smaller tasks it returns as sub-issues of the task, one PR each, and take the owner's view only on the questions it raises.

## Parking and resuming

- Park whenever the run waits on the owner: post [`templates/issue-comment.md`](../../templates/issue-comment.md) on the issue, set the resume point and move it to `Waiting on owner`.
- When the run waits on another task or on something outside the project, move it to `Blocked` and name what it waits on in the comment.
- A parked task resumes when the owner replies on the issue, or when what blocked it is done. Read the reply before going on, and move it back to `In Progress`.
- Before parking, every finished step is committed and pushed, so nothing is left uncommitted in the checkout.
- A resumed task starts at its resume point.

## Stop

- When the owner stops the run, let the current step finish, push it, and park the task with a note.
- Start nothing new until the owner resumes it.

## After the merge

- When the owner merges the PR, check that the issue closed and is `Done` in the project. When it didn't, say so on the PR instead of closing it yourself, since a missing `Closes #<n>` is a finding for the retro.

## Retro

- When a merged PR turns out to have a mistake the departments missed, trace which step should have caught it and ask that department to propose a rule or checklist change. Name the step, never blame the role.
