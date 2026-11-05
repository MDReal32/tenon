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

PM asked the Architect reviewer for a rule review of the rule-change work for [#11](https://github.com/MDReal32/tenon/issues/11), which writes the Programming department and its engine, sdk, extension and dev roles. A rule review checks only that the new and changed rules clash with no workspace rule, the handbook or another ruleset, and that each level only narrows the one above. It reviewed commit f827ac4, drafted by the direct session in [the session's handoff](2026-11-05-session-programming-department.md), as part of the [departments](departments.md) job. PM then started attempt 2 on the fix commit on top of f827ac4, which reworded line 15 and the sdk role's sample-extension rule.

## What I did and how

I read the handbook, Architect's rules and the reviewer's rules first. Then I read every file the commit adds: Programming's triplet, its knowledge file and templates, the four role triplets and the four agent files. I also read the changed overview at `docs/departments/README.md`. I compared them with the handbook, the PM, BA, PO and Architect rulesets, and the workspace rules under `.claude/rules/`, mainly handoffs.md, git.md, commit.md, docs.md, delegation.md and the code-style Nx rules. I checked each agent file's tools and model against its role's rules and the existing agent files, and searched the department files for "until … is written" clauses that mention Programming.

On attempt 2 I first checked each of the three earlier clashes against the new line 15 of `docs/departments/programming/RULES.md`, which now makes the work record an exception: the role's own handoff under `docs/handoffs/` and a lesson in `programming-knowledge.md`. I also re-read the whole 'What it may change' section around it. Then I checked the new `roles/sdk/RULES.md:20` against line 18 of the same file, against Programming's rules on other roles' parts, and against Architect's four axes.

On attempt 3 I checked that the work-record exception, now the first bullet of 'What it may change' at line 13, lifts both the own-part rule and the `docs/` rule. I then compared its list of work-record files with everything handoffs.md asks a role to write when its work ends.

## Why this way

The verdict is "clashes found", for one reason. The phrase "Never change … `docs/`" at `programming/RULES.md:15` also covers `docs/handoffs/` and `docs/departments/programming/programming-knowledge.md`. That forbids a Programming role from writing and committing its own handoff, which handoffs.md (lines 23 and 25), PM's rules (line 19) and the handbook's definition of done (line 61) require of a role that can write files. It also forbids adding a lesson, which the handbook asks for at line 65. The fix I suggested is a carve-out on that line, not rerouting Programming's handoffs through PM. Rerouting would clash with PM's own rule that roles which can write files write their own handoffs. I raised two other points as notes for the owner, not clashes, because one rests on a description in an unwritten department and the other is a matter of intent: dev and DevOps both being described with CI and `libs/dev`, and the SDK sample extension being loaded by a host adapter.

Attempt 2 still finds one clash, which attempt 1 should have caught. Line 13 of Programming's rules allows only files in the role's own part that the plan touches, and every role's rules repeat that any other file is outside its part. The work-record exception sits on line 15 only, so line 13 still forbids the handoff and the lesson. The fix is to make the exception cover the whole section, not to add the files to some role's part, because they belong to the work record, not to the code. The new sdk rule fits: the sample extension stays in the SDK's part, the SDK's tests no longer depend on the host adapter, and loading the sample is the host adapter's own test in the engine's part, reached through PM.

Attempt 3 settles the line-13 clash. It finds one more, which was there since attempt 1 and which I missed on both earlier reads. handoffs.md line 27 also asks the role ending the work to bring the job note up to date. Line 13's work record leaves the job note out, and PM's rules update the job note only for read-only roles. Widening the work record is the smaller fix, because moving the job note to PM would also change PM's ruleset.

## Checks

Every new and changed rule line was compared with the rules above it and beside it. The agent files' front matter was compared field by field with the existing ones. I ran no commands, as Architect's rules require.

Attempt 2 compared the new lines 13–15 and the sdk line 20 with the same rules as attempt 1. I ran no commands.

## Where it stands

Attempt 3 was returned to PM with one clash: `docs/departments/programming/RULES.md:13` leaves the job note out of the work record, against handoffs.md line 27. Every earlier clash is settled. Nothing is committed by this role.

## Next

The author adds the job note's 'Current state', `tasks` and `updated` to line 13's work record. PM then starts attempt 4, which checks only that bullet. With no clashes, PM opens the PR that closes #11.
