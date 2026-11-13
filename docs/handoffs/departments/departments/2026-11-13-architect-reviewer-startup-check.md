---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/62"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/62-startup-check-search
pr:
---

# Rule review of the start-up check's Grep and Glob exception

PM asked for the Architect reviewer's rule review of [#62](https://github.com/MDReal32/tenon/issues/62). The change lets a role whose agent file lists `Bash` find `Grep` and `Glob` missing without failing the handbook's start-up check. Without it, every department role that writes files stops before doing any work. The review continues [the session's start-up check handoff](2026-11-13-session-startup-check-search.md), which a direct session wrote in HR's place with the owner's leave. Attempt 1 covered the staged, uncommitted tree on `docs/departments/62-startup-check-search`, cut from `develop` at 6fb77db, and ran at the same time as HR's owner review. It was a rule-change PR, so only the reviewer's "Rule changes" checks applied.

## What I did and how

I read the two changed rule files, the [handbook](../../../departments/RULES.md) and the departments' [Claude notes](../../../departments/CLAUDE.md), along with the session handoff and the [job note](departments.md). I checked the `tools` line of every agent file under `.claude/agents/` against the "Model and tools" line in each role's `RULES.md`. I read each role `CLAUDE.md` that says which missing tools are intended, HR's rules on safety rules and on how rules fit, the coordinator's rule-change route, the overview's safety and rule-change sections, and the workspace rules under `.claude/rules/`. Because the new note sends roles to search through `Bash`, I also read the access hook's `.env` and git checks. I found no clash. Every role's tool line still names exactly its agent file's list. The nine `Bash` roles are the ones the exception covers, and the five read-only roles are unaffected. The only level the change touches is the handbook.

## Why this way

I counted none of the notes as clashes, because in each one the changed rule text still agrees with every other rule. The `.env` gap with recursive `grep` is a risk in how roles will search. The handbook's Secrets section still forbids it, and the roles already had `Bash`, so I flagged it for Cyber security instead of failing the change. The direct-session write, the HR review relying on an unmerged rule, and the parallel runs are departures from the process rules that the owner allowed, and belong in the PR description. HR's safety rule isn't breached: the model half of the check is unchanged, accepting fewer tools grants no privilege, and the owner's own words name the change.

## Checks

I only read files and ran no commands. Of the fourteen agent files, the nine that list `Bash` are the roles the issue names, and every role's `RULES.md` tool line matches its agent file. No `RULES.md` or `CLAUDE.md` under `docs/departments/` requires `Grep` or `Glob` to be present. The hook allows `git grep` for agents and catches `.env` only when a command names it.

## Where it stands

Done. Attempt 1 returned "No clashes", with notes for PM: the `.env` gap with recursive `grep` for Cyber security, the owner's leave for the direct write and for HR's review under the unmerged rule to be named in the PR description, the parallel runs, unlinked task mentions in the session handoff, and the harness-supplied reply tool outside the exact-tools clause.

## Next

PM passes the notes on, commits the change with this handoff, pushes, and opens the PR that closes #62.
