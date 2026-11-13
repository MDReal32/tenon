---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/62"
role: session
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/62-startup-check-search
pr: 64
---

# Excuse missing Grep and Glob in the start-up check when a role has Bash

[#62](https://github.com/MDReal32/tenon/issues/62) unblocks every department role that writes files. In this environment an agent whose tools include `Bash` never gets `Grep` or `Glob`, which search through `Bash` replaces, while read-only agents keep them. The handbook's start-up check asks for exactly the tools an agent file lists, so HR policy, every Programming role, the Docs writer, the DevOps engineer and both QA roles would all stop before doing any work. HR policy did, three times, on [#61](https://github.com/MDReal32/tenon/issues/61), the third time after a session restart; HR's handoff for #61 on that task's branch records each run. It continues [the HR handoff](2026-11-13-session-hr-department.md), which set up the rule-change route.

## What I did and how

The owner chose to excuse the two tools rather than drop them from the lists or change the environment. The [handbook](../../../departments/RULES.md)'s start-up check now says a role whose agent file lists `Bash` may find `Grep` and `Glob` missing, since search then runs through `Bash` with `grep` and `find`, and that this is not a mismatch. The departments' [Claude notes](../../../departments/CLAUDE.md) gain the matching mechanic under "Permissions", telling such an agent to search through `Bash` with `git grep`, or with `grep` and `find` that exclude `.env*`. The Architect reviewer pointed out that a recursive `grep` reads `.env` without naming it, so the hook can't catch it, while the `Grep` tool these roles had before skips gitignored files. No agent file or role tool list changed.

This direct session wrote the change in HR's place, because HR itself can't pass the check until this rule exists, and the owner allowed a direct session to make this one change. A fresh HR run does the owner review on this branch, where the new rule already applies, then the Architect reviewer's rule review.

## Why this way

The owner picked the exception over the two alternatives I offered. Dropping `Grep` and `Glob` from every agent file and role tool list that also has `Bash` would make the lists match this environment, but break them in one that does give the tools. Keeping the rule and changing the environment would leave the pipeline stopped until then. The exception is limited to those two tools and to roles with `Bash`, so every other tool still has to match exactly and the check keeps catching a wrong agent file. It goes in the handbook because the start-up check lives there and binds every role.

## Checks

The link, anchor and table check passed over every tracked markdown file. [HR's owner review](2026-11-13-hr-policy-startup-check-review.md) approved it, and [the Architect rule review](2026-11-13-architect-reviewer-startup-check.md) found no clashes. Both ran on the staged change at the same time, since both are read-only. HR's review ran under the new rule before it merged, which the owner allowed by choosing this route.

## Where it stands

Done on `docs/departments/62-startup-check-search`, in the PR that closes #62. The hook's blind spot for a recursive search that reads `.env` went to Cyber security as [#63](https://github.com/MDReal32/tenon/issues/63). The harness's reply tool, which no agent file lists, is also outside the exact-tools clause; both reviewers treated it as the reply channel, and it waits on the owner if a run ever stops on it.

## Next

Run a fresh `hr-policy` owner review and the Architect rule review, fix any finding, commit, push and open the PR that closes [#62](https://github.com/MDReal32/tenon/issues/62). Then stack the branch of [#61](https://github.com/MDReal32/tenon/issues/61) on it so HR can write #61.
