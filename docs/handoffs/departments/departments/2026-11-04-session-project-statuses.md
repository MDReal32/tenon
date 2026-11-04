---
type: handoff
job: "[[departments]]"
tasks: []
role: session
model: claude-opus-5-5
date: "2026-11-04"
status: done
branch: docs/departments/project-statuses
pr: 5
---

# The project's statuses, fields and views in the departments' rules

The owner asked for the [Tenon project](https://github.com/users/MDReal32/projects/4) to be organized: its statuses, fields and views. The departments' rules, written in [the tracker handoff](2026-11-03-session-github-project-tracker.md), knew only GitHub's default `Todo`, `In Progress` and `Done`, so once the project changed, the owner asked for the rules to follow.

## What I did and how

On the project, I replaced the three default statuses with eight, keeping the IDs of the existing three so no item lost its status: `Backlog`, `Todo`, `In Progress`, `Waiting on owner`, `Blocked`, `In Review`, `Done` and `Canceled`. The owner chose the recommended flow and asked for `Canceled` and a couple more useful ones, so `Blocked` joined it. I added three single-select fields: `Kind` (Task, Epic, Bug, Decision), `Area` (the handoffs' areas) and `Size` (S, M, L, XL). The default table view became a `Board`, and `By milestone` (a table) and `Roadmap` views were added. GitHub's API can't set a view's grouping, so grouping `By milestone` by milestone is left to the owner. [#2](https://github.com/MDReal32/tenon/issues/2) moved to `Blocked`, waiting on [#3](https://github.com/MDReal32/tenon/issues/3), and #3 to `In Review`, with Kind `Task` and Area `docs` on both.

In the rules, the [departments overview](../../../departments/README.md) now has a table of what each status means, and says only the owner moves a task out of `Backlog` or into `Canceled`. The PM coordinator's rules move a task through the statuses: `In Progress` at intake, with `Kind` and `Area` set; `Waiting on owner` or `Blocked` when parked; back to `In Progress` on resume; `In Review` when the PR is ready. `Size` comes from the Architect gate's verdict. Unrelated findings go to `Backlog` instead of `Todo`, and a run never starts from `Backlog`. PM's knowledge records the statuses and fields and where to find their IDs.

## Why this way

`Waiting on owner` and `Blocked` replace "a parked task stays `In Progress`", so the board shows at a glance what waits on the owner, which a comment couldn't. `Backlog` keeps the plan's next-milestone epics apart from the work that is ready, matching the three tiers the owner chose for [#2](https://github.com/MDReal32/tenon/issues/2). Keeping the old option IDs was the one way to change the field without resetting the items already on the board.

## Checks

`gh project item-list` showed #2 and #3 keeping their status through the field change, before they were moved. The link, anchor and table check over `docs/` and `.claude/` passed.

## Where it stands

Done, on `docs/departments/project-statuses`, in a PR against `develop`. Open for the owner: grouping the `By milestone` view by milestone, and whether to delete a second `Board` view (number 3) that appeared during the change.

## Next

None for this change. The milestones themselves come from #2's plan.
