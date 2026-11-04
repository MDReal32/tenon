---
type: handoff
job: "[[github-watch]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/9"
role: session
model: claude-opus-5-5
date: "2026-11-04"
status: done
branch: feat/claude-skills/9-github-watch
pr: 10
---

# Watch GitHub and wake the session

For [#9](https://github.com/MDReal32/tenon/issues/9), the owner asked for GitHub changes to trigger this very session, the way a webhook triggers an action: a command left running in the background that stays quiet for days or weeks and wakes the session through its output when something happens. They ruled out a cloud session, a new session and any workaround. This is the first handoff on the [github-watch](github-watch.md) job.

## What I did and how

I wrote the [github-watch skill](../../../../.claude/skills/github-watch/SKILL.md) under `.claude/skills/github-watch/`, with one module per function in the style of the `department-access` hook. `main.mjs` polls `gh api repos/MDReal32/tenon/events` and `gh project item-list 4` every 60 seconds. `find-changes.mjs` keeps only events newer than the saved cursor and turns them into lines, `is-relevant-event.mjs` decides which event types count, and `diff-board.mjs` reports board items added, removed or moved between statuses. The cursor lives in `~/.cache/tenon/github-watch.json`, so a restart picks up where the last run stopped. On a change the watcher prints the lines and exits with code 0. The session starts it with the Bash tool's `run_in_background`, and that exit wakes it.

The first background run died within minutes: GitHub reset one connection and the uncaught error ended the process, which would have left the session unwatched for good. Every poll now runs inside a `try`. A failure is written to stderr with its count and retried at the next poll. Only 30 failures in a row, about half an hour, end the watcher, with a line saying GitHub could not be reached, so the session wakes and knows to look.

## Why this way

A background command that exits is the one way a running session gets woken by something outside it, which is exactly what the owner asked for. Polling through `gh` won over a real webhook because a webhook needs a public endpoint and a server to receive it, and this needs only the `gh` login the session already uses. Exiting on the first change, instead of streaming, keeps every wake-up one clear report. The departments already prefix their comments with `🤖`, so skipping those keeps the session from waking itself on its own comments. Pushes, branch creation and assignments are skipped because the session makes those itself.

## Checks

The eight `node:test` tests pass with `node --test ".claude/skills/github-watch/*.test.mjs"`. A live run with no cursor saved one from the real repository and board and stayed quiet. With the cursor's #9 status changed to `Todo`, the next run reported `#9 moved Todo → In Progress` and exited with code 0. Run with `gh` missing from `PATH`, the watcher logged `poll 1/30 failed` and kept running.

## Where it stands

Done, on `feat/claude-skills/9-github-watch`, in a PR that closes #9. The watcher runs in the background of the session that built it.

## Next

None for this change. It only works while a session that started it stays open.
