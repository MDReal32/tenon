---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/51"
role: session
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/claude-rules/51-autonomy
pr: 52
---

# Let sessions work through the roadmap without stopping

For [#51](https://github.com/MDReal32/tenon/issues/51), the owner asked for rules under which a session keeps working without asking at every step, and for limits so the owner's review list stays short. Until now a session stopped after every PR, and only the owner could move a task out of `Backlog`, so each task waited on the owner twice: once to be queued, once to be merged.

## What I did and how

I added `.claude/rules/autonomy.md`, which binds every session. It picks the next task in a fixed order: answered `Waiting on owner` tasks and review comments, then `Todo`, then the lowest open milestone's `Backlog` tasks by issue number. It lets a session take that task out of `Backlog` itself, as the owner's standing order. When a milestone has only epics, it is planned first through BA, the Architect gate and PO, as M0 was. The rule caps the session at 3 PRs open for review, keeps one task to one PR, sends a task too big for one PR to BA to be split into smaller tasks, and stacks a task that needs an open PR's code on that PR's branch, grouped with `gh stack link`. A session stops only for a question the book, handoffs and task leave open, a destructive step, or being stuck. Merging stays with the owner.

Then I brought the rules that said otherwise into line. In `.claude/rules/board.md`, the owner-only `Backlog` bullet now points at the new rule. In the [departments overview](../../../departments/README.md), the `Status` line, the run order and the PR size split now match it. The [coordinator's rules](../../../departments/pm/roles/coordinator/RULES.md) and [README](../../../departments/pm/roles/coordinator/README.md) pick from `Backlog` in roadmap order, treat a PR waiting on review as no unfinished step, and assign splits to BA. The [BA assistant's rules](../../../departments/ba/roles/assistant/RULES.md) and [README](../../../departments/ba/roles/assistant/README.md) gained the split duty.

## Why this way

The owner chose each limit. The cap is 3 rather than 5 because M0's tasks build on each other, so open PRs stack. A change asked for at the bottom of a deeper stack has to be merged up through every link above it. A big task becomes smaller tasks, not several PRs for one task, because the owner wants review to follow tasks one to one. BA does the split rather than the owner, so a split reaches the owner only as a question BA can't settle. Work order follows milestone and issue number, because the Architect gate opened M0's issues in dependency order. The split duty sits next to BA's rule against splitting acceptance criteria and doesn't break it: each criterion is quoted whole in exactly one smaller task.

Three attempts of [the Architect reviewer's clash check](2026-11-06-architect-reviewer-autonomy-rule-review.md) shaped the rest. The first found six clashes. The stop list missed the asks [git.md](../../../../.claude/rules/git.md) and the departments' notes keep for the owner, so it gained a bullet for them. The coordinator's one-task rule now counts a parked, pushed task as finished for this purpose. A chained task's draft PR targets the previous link. git.md's after-merge cleanup now also starts from the start-of-turn check and covers any session's task branch. Planning a milestone's epics goes through the existing split route rather than a new one. And grouping a chain follows git.md's stack section, with its conditions and fallback. The second found that the split sub-issues' place in the pick order was missing from the coordinator's rules and the overview, and that an epic's sub-issues would have inherited `Kind` `Epic`. Both are fixed. The rule also now says who adds the parent's `Closes`, the BA README and assistant README describe the split, and the overview's task and `Backlog` wording match.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed. The Architect reviewer found no clashes on its third attempt.

## Where it stands

Done, on `docs/claude-rules/51-autonomy`, in a PR that closes #51. `gh stack` isn't installed yet; [git.md](../../../../.claude/rules/git.md) asks the owner before installing it, and the first stacked chain needs it.

## Next

After the merge, the next session follows the new rule: it starts the next task, #12 QA, without being asked.
