---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/61"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/61-root-file-owners
pr:
---

# Rule review of the root-file owners change, attempt 1

PM asked for the Architect rule review of the staged change for [#61](https://github.com/MDReal32/tenon/issues/61). The change named the root git files in the DevOps engineer's part and the package managers' own root files in the Programming dev role's part, carrying out the owner's answer on [#17](https://github.com/MDReal32/tenon/issues/17). It was reviewed as written in [the root-file handoff](2026-11-13-session-root-file-owners.md), under the [departments](departments.md) job.

## What I did and how

I read the two changed rule lines in [the DevOps engineer's rules](../../../departments/devops/roles/engineer/RULES.md) and [the Programming dev role's rules](../../../departments/programming/roles/dev/RULES.md). Against them I checked the "Its part" section of every role, the "What it may change" sections of DevOps, Programming, Docs and HR, the handbook, PM's rules and the coordinator's route, the overview's "How the rules change", and every workspace rule under `.claude/rules/`. I searched the repository for each of the named files to find any other claim on them, and I counted the widths of the re-aligned roster table. I also read the changed descriptions, the DevOps knowledge fact, the session handoff and the job note.

## Why this way

The verdict is "Clashes found", even though the rule text clashes with nothing and only narrows. The handbook says rules change only through HR, and the coordinator's rule-change route requires the HR policy role and a fresh HR owner review. This change was written by a direct session, and its handoff said the owner's review stands in for HR's. No rule allows that swap, and PM's rules forbid PM doing another department's step. The way to pass is a real HR write and a fresh HR owner review, or an owner decision on #61.

## Checks

Read-only review with Read, Grep and Glob. No commands were run. The roster table was aligned.

## Where it stands

Done for attempt 1, with one clash: the change was written outside HR. Notes for the owner, through PM: `.gitattributes` goes past the owner's note, engine and sdk dependency changes will now touch files in the dev role's part, and `.idea/` is tracked but in no role's part.

## Next

PM starts `hr-policy` in a session where its agent file loads, then a fresh HR owner review, then this rule review again as attempt 2, which first checks that the clash is settled.
