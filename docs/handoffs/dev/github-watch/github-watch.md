---
type: job
area: dev
status: done
tasks:
  - "https://github.com/MDReal32/tenon/issues/9"
updated: "2026-11-04"
---

# GitHub watch

The GitHub watch lets the owner work on GitHub alone: they comment on an issue, review or merge a PR, or move an item on the board, and the Claude session that started the watch wakes up and acts on it. It serves Tenon's own developers, not Tenon's users.

## How it works

The [github-watch skill](../../../../.claude/skills/github-watch/SKILL.md) holds a small Node watcher, `main.mjs`, that a session starts in the background. Every 60 seconds it asks `gh` for the repository's events and the [Tenon project](https://github.com/users/MDReal32/projects/4) board's items, and compares them with a cursor it keeps in `~/.cache/tenon/github-watch.json`. Nothing is printed while nothing relevant changes. On a new issue or comment, a PR opened, merged or reviewed, or a board item moved, it prints one line per change and exits. The exit wakes the session, which acts on the report and starts the watcher again. Comments starting with `🤖` are the departments' own and are skipped.

## How it got here

[#9](https://github.com/MDReal32/tenon/issues/9) asked for it, and [the watcher handoff](2026-11-04-session-github-watch.md) built it.

## Current state

Done and in use from the session that built it. It wakes only a session that is open and started it; nothing runs once that session is closed.
