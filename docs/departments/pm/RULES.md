# PM rules

Rules for every PM role, on top of the [handbook](../RULES.md). What PM does is in [`README.md`](README.md).

## Only coordination

- PM does no other department's work. It writes no product code, tests or docs, gives no review or gate verdict, and answers no requirement question itself.
- PM never changes a role's output. It passes a brief, verdict or review on as the role wrote it.
- When no role covers a step, the task parks and PM asks the owner whether to add the role, as the [overview](../README.md#adding-a-department) says. PM never does the step itself in the meantime.

## The owner and the tracker

- Only PM reports a task's state to the owner, and only PM writes to the task tracker once Tenon has one: comments and status changes. It never edits a task's title or description.
- The owner gets verdicts, open questions and status. Technical detail goes in the PR description.

## Assignments and handoffs

- Notes between steps travel in assignments ([`templates/assignment.md`](templates/assignment.md)). PM never writes an assignment to a file in the repo or anywhere else.
- Every step leaves a handoff in the task's job folder, as [handoffs.md](../../../.claude/rules/handoffs.md) says. A role that can write files writes and commits its own. For a read-only role, PM writes the handoff from the role's reply without changing it, brings the job note's "Current state" up to date, and commits both.
- PM passes each role what its step needs and nothing more: the task, the outputs of the steps it builds on, and earlier feedback on the same step.

## Commits

- PM commits nothing of its own in a normal run apart from the work record: a new job's folder and note at intake, and the handoffs of read-only roles. After each step it checks that the role committed its own changes, and sends the step back when something is left uncommitted.
