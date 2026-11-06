# Autonomy Rules

These apply to every session, a direct session outside the departments included. They say when a session keeps working on its own and where it stops, so the roadmap moves without the owner queuing each step and the owner's review stays small.

## Keep going

- Work through the roadmap one task at a time, milestone by milestone from M0 onward. The next task is the first of these that is free to start:
  1. a `Waiting on owner` task the owner has answered, or an open PR the owner left review comments on;
  2. the `Todo` column, top first;
  3. the sub-issues of a task that was split, in the order BA gave them;
  4. the open milestone with the lowest number, its `Backlog` tasks by issue number, lowest first.
- A session may move the next task out of `Backlog` to `In Progress` when it starts it. This is the owner's standing order for the roadmap; only the owner moves an item into `Canceled`.
- When the next milestone has epics and no tasks yet, each epic is treated as a task too big for one PR: BA splits it into smaller tasks, the Architect gate and PO check each one, and PM opens them as sub-issues of the epic.
- At the start of every turn, check which of the roadmap's open PRs merged, and clean each one up as [git.md](git.md) says after a merge.
- Don't ask whether to continue to the next step or task. Fix what a review or a check finds and check again.
- When a task waits on the owner, set it to `Waiting on owner`, with its finished steps pushed, and carry on with the next task that doesn't depend on it.

## Limits

- At most 3 of the roadmap's PRs are open for the owner's review at once. With 3 open, start no new task: answer review comments, then end the turn and wait for a merge, with any chain watched as [git.md](git.md) says.
- One task is one PR. A task too big for one reviewable PR goes to BA, which splits it into smaller tasks, each its own issue with its own PR. Never split one task across several PRs.
- A split task's sub-issues take its milestone and `Area`, and its `Kind`, or `Task` when the split one is an `Epic`. They start in `Backlog`. The split task stays open, and the PR that merges last among its sub-issues closes it as well: once a sub-issue's PR is the only one left open, add the split task's `Closes #<n>` to it.
- Small follow-ups, such as a typo or a record update, go into the PR they belong to. Work found along the way that belongs to no open PR becomes a `Backlog` issue, not a new PR.
- A task that needs an open PR's code branches from that PR's branch and targets it, as [git.md](git.md) says for chained branches, and the chain is grouped as its GitHub stacks section says. A task that needs none branches from `develop`.

## Stop and ask

Stop only for these, and ask the owner in one short question that explains its options:

- A question the design book, the handoffs and the task leave open, such as a design choice.
- A destructive step that [git.md](git.md) keeps for the owner's confirmation, or overwriting the owner's uncommitted files.
- A step another rule keeps for the owner's say, such as [git.md](git.md)'s asks about an unclear repo state, a refused base refresh or installing a `gh` extension, or a model switch or token scope the departments' notes ask the owner for.
- Being stuck: a fix that fails three times, or two rules that contradict each other.

Merging stays with the owner, always.

## Reporting

- When a task's PR opens, report it in one or two lines: the PR link and what it does.
- When the turn ends, say in one line what is open for review and what comes next.
