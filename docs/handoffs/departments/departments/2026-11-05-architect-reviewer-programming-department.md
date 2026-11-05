---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/11"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-05"
status: done
branch: docs/departments/11-programming
pr:
---

# Rule review of the Programming department

PM asked the Architect reviewer for a rule review of the rule-change work for [#11](https://github.com/MDReal32/tenon/issues/11), which writes the Programming department and its engine, sdk, extension and dev roles. A rule review checks only that the new and changed rules clash with no workspace rule, the handbook or another ruleset, and that each level only narrows the one above. It reviewed commit f827ac4, drafted by the direct session in [the session's handoff](2026-11-05-session-programming-department.md), as part of the [departments](departments.md) job.

## What I did and how

I read the handbook, Architect's rules and the reviewer's rules first. Then I read every file the commit adds: Programming's triplet, its knowledge file and templates, the four role triplets and the four agent files. I also read the changed overview at `docs/departments/README.md`. I compared them with the handbook, the PM, BA, PO and Architect rulesets, and the workspace rules under `.claude/rules/`, mainly handoffs.md, git.md, commit.md, docs.md, delegation.md and the code-style Nx rules. I checked each agent file's tools and model against its role's rules and the existing agent files, and searched the department files for "until … is written" clauses that mention Programming.

## Why this way

The verdict is "clashes found", for one reason. The phrase "Never change … `docs/`" at `programming/RULES.md:15` also covers `docs/handoffs/` and `docs/departments/programming/programming-knowledge.md`. That forbids a Programming role from writing and committing its own handoff, which handoffs.md (lines 23 and 25), PM's rules (line 19) and the handbook's definition of done (line 61) require of a role that can write files. It also forbids adding a lesson, which the handbook asks for at line 65. The fix I suggested is a carve-out on that line, not rerouting Programming's handoffs through PM. Rerouting would clash with PM's own rule that roles which can write files write their own handoffs. I raised two other points as notes for the owner, not clashes, because one rests on a description in an unwritten department and the other is a matter of intent: dev and DevOps both being described with CI and `libs/dev`, and the SDK sample extension being loaded by a host adapter.

## Checks

Every new and changed rule line was compared with the rules above it and beside it. The agent files' front matter was compared field by field with the existing ones. I ran no commands, as Architect's rules require.

## Where it stands

Rule review returned to PM with three clashes, all on `docs/departments/programming/RULES.md:15`, and three notes for the owner. Nothing is committed by this role.

## Next

PM sends the clashes back to the author (the direct session for the owner). Once line 15 lets a role write its own handoff and its knowledge lessons, PM starts the Architect reviewer again for attempt 2, which first checks that each of the three clashes is settled. PM passes the notes to the owner in the PR description.
