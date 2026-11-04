---
name: github-watch
description: Watch the Tenon repository and project board on GitHub from this session, and wake the session when the owner comments, opens or closes an issue, reviews or merges a PR, or moves a board item. Use when the owner asks to start, restart or stop watching GitHub.
---

# GitHub watch

`main.mjs` polls GitHub every 60 seconds through `gh`: the repository's events and the [Tenon project](https://github.com/users/MDReal32/projects/4) board. It stays silent while nothing relevant changes, and can run for days. On a change it prints one line per change and exits, and its exit wakes the session that started it.

## Start it

Run it with the Bash tool's `run_in_background`, never in the foreground:

```bash
node .claude/skills/github-watch/main.mjs
```

It keeps its cursor (the newest event seen and the board's statuses) in `~/.cache/tenon/github-watch.json`, outside the repository. The first run with no cursor starts from now, so nothing from before is reported.

## When GitHub can't be reached

A failed poll, such as a dropped connection, is logged to stderr and retried at the next poll; the watcher keeps running. After 30 failed polls in a row, about half an hour, it prints that GitHub could not be reached and exits with code 1. Then check `gh auth status` and the network, and start it again.

## When it wakes the session

1. Read the report. Each line names the issue or PR, who did what, and a link.
2. Act on it as the rules say: an owner's answer on a parked task goes back to the role that asked, a merged PR gets the cleanup in [git.md](../../rules/git.md), a board move is checked against [board.md](../../rules/board.md).
3. Start the watcher again in the background, so the next change wakes the session too.

## What counts as a change

New or edited issues and issue comments, opened, closed and merged PRs, PR reviews and review comments, and any board item added, removed or moved between statuses. Pushes, branch creation and assignments are skipped. Comments whose body starts with `🤖` are the departments' own and are skipped, so the session never wakes itself.

## Stop it

Stop the background task with `TaskStop`. The cursor stays, so the next start reports what changed while it was stopped, as far back as GitHub's last 100 events reach.

## Tests

```bash
node --test ".claude/skills/github-watch/*.test.mjs"
```
