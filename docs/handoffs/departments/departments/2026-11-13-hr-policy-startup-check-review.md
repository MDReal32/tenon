---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/62"
role: hr-policy
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/62-startup-check-search
pr:
---

# HR owner review of the start-up check's Grep and Glob exception

PM asked a fresh HR policy run to do the owner review of [#62](https://github.com/MDReal32/tenon/issues/62), the rule change that excuses missing `Grep` and `Glob` in the handbook's start-up check for a role whose agent file lists `Bash`. A direct session wrote the change in HR's place, because HR could not pass the old check, and the owner allowed that for this one change. This review follows [the session's handoff](2026-11-13-session-startup-check-search.md) and was run on the same branch, where the new rule already applies.

## What I did and how

First I did the start-up check against the [handbook](../../../departments/RULES.md) as it stands on this branch. The model was `claude-opus-5-5`, which matches the Opus model the role's rules name. The run had `Read`, `Edit`, `Write` and `Bash`. `Grep` and `Glob` were missing, which the new exception excuses. It also had the harness's reply tool, `SubagentHandback`, which no agent file lists. I treated that tool as the channel for the final message, which the role's Claude notes already assume, and reported it to PM.

I then read the staged diff and checked it against [HR's owner-review rules](../../../departments/hr/RULES.md#owner-review). The handbook gains one exception, limited to `Grep` and `Glob` and to roles that list `Bash`. The [departments' Claude notes](../../../departments/CLAUDE.md) gain a "Permissions" bullet that describes the environment and points back to the exception. I searched every `RULES.md`, `CLAUDE.md`, `README.md` and agent file under `docs/departments/` and `.claude/` for the start-up check, the tools check and "mismatch". None of them clashes with the exception, and no agent file or role tool list changed. I changed no file.

## Why this way

I approved because each check passed. The change does what the owner's note asks and nothing more. It loosens the tools check only in the way the owner named in their own words, and it never lets a role have more tools, so least privilege is unchanged. Being in the handbook, it loosens no lower level, and both changed files keep their three-file split. Three things fell outside the rule-change checks, and I reported each to PM instead of making it a finding: the reply tool the exception doesn't cover, two unlinked task numbers in the session handoff's "Next" section, and where #62 sat in the job note's `tasks` list. PM fixed the last two.

## Checks

There is no Nx docs check yet, so I checked by reading every link the change adds in the handoff and the job note, and they all resolve. The change touches no table or anchor. The hook denied one `git branch -a` call, as the git limits intend. I could not read the issue on GitHub, because `gh` is blocked for roles, so I relied on the task text in PM's assignment.

## Where it stands

Done: the HR owner review is approved, with no findings against the rule change.

## Next

PM takes the Architect reviewer's rule review of #62, then commits, pushes and opens the PR that closes it.
