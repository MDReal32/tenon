---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/7"
role: session
model: claude-opus-5-5
date: "2026-11-04"
status: done
branch: docs/claude-rules/board
pr:
---

# Keep the project board always up to date

For [#7](https://github.com/MDReal32/tenon/issues/7), the owner asked for the [Tenon project](https://github.com/users/MDReal32/projects/4) board to be updated always, and for that to be written into the rules. The board had fallen behind: work done in a direct session, outside the departments, had no issue, so PRs [#5](https://github.com/MDReal32/tenon/pull/5) and [#6](https://github.com/MDReal32/tenon/pull/6) were missing from it. This continues [the statuses handoff](2026-11-04-session-project-statuses.md), which gave the board its statuses.

## What I did and how

I added `.claude/rules/board.md`, which binds every session, not only department roles. It has three parts. Every piece of work is on the board before it starts, with an issue opened from the owner's request when there is none, and every PR says `Closes #<n>`. An item's `Status` changes the moment its state changes, in the same step. And before a turn ends, the board is checked against what the turn changed.

Then I applied it. This work got its own issue, #7, opened from the owner's words and set to `In Progress`, with Kind `Task` and Area `departments`. PR #6, which had no issue, went onto the board as `In Review`. I added PR #5 as `In Review` as well, then found the owner had already merged it, along with #4, and moved it to `Done`. I cleaned up both merged branches, as the git rules say.

## Why this way

The rule lives under `.claude/rules/` rather than in PM's rules, because the board fell behind in a direct session, where the departments' rules don't bind. An issue for every piece of work, opened from the owner's request when they didn't write one, keeps the board complete without the owner having to open issues for small requests. The end-of-turn check is there because statuses slipped when they were left for later.

## Checks

`gh project item-list` shows every open issue and PR on the board with its real status. The link, anchor and table check over `docs/` and `.claude/` passed.

## Where it stands

Done, on `docs/claude-rules/board`, in a PR that closes #7.

## Next

None for this change.
