---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/12"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/12-qa
pr: 53
---

# Rule review of the QA department

PM asked for the Architect reviewer's rule review of [#12](https://github.com/MDReal32/tenon/issues/12), which writes the QA department with its conformance and e2e roles, continuing [the QA handoff](2026-11-06-session-qa-department.md). A rule review checks that the change clashes with no workspace rule under `.claude/rules/` and no other ruleset, that each level only narrows the one above, and that the task's acceptance criteria are met. PM handed it back as attempt 2 after the owner's session fixed the four clashes and settled the note on tests added during QA, PM handed it back once more as attempt 3, after the two attempt-2 clashes were fixed.

## What I did and how

I read the uncommitted working tree on `docs/departments/12-qa`: the twelve files under [`docs/departments/qa/`](../../../departments/qa/README.md), the two agent files, the overview's status line and roster row, the session handoff and the job note. I set them against the handbook, Programming's rules and each role's part, PM's and the coordinator's rules, the Architect gate's rules and verdict template, the access hook and the workspace rules, and grepped `docs/` and `.claude/` for "until … written" clauses. The acceptance criteria are met: each role has its triplet and an agent file in the existing shape that names Sonnet and its six tools, the department has its two templates and its knowledge file, the roster says written, and no "until QA is written" clause existed.

I found four clashes. QA's tests sat inside parts Programming's roles own, with only a bug's failing test protected. On the bug route QA committed its reproduction on a task branch PM creates only after the gate. On that route QA's placement rule pointed at an approved plan that doesn't exist yet. And QA's README had the gate name the QA roles, which no gate rule required. I noted for the owner that tests QA added after the Architect review would get no code review, a grammar slip in the job note, and a stale QA row in the `markdown.md` example.

On attempt 2 all four clashes were fixed: Programming's rules keep a bug's reproduction test QA's and the engine's part leaves those tests out, PM creates a bug's branch at intake, QA's reproduction goes beside the tests of the part the bug names, and the gate names the QA roles in its verdict. PM's decision that QA adds no tests at the check step, a missing test being a finding for Programming, settled the note. Two smaller clashes came from the fixes: the small-change route has no gate to name its QA roles, and the conformance role placed a reproduction in the suite where QA's rule placed it beside the part's tests.

On attempt 3 I checked both attempt-2 clashes against the changed lines, and both are fixed. PM's bug and small-change routes now have PM name the QA roles by the gate's QA criteria, with no QA role on a small change the criteria don't reach, and QA's README says so for routes without the gate. QA's placement rule now allows a protocol bug's reproduction in the conformance suite, so the conformance role's rule only narrows it. The three notes from attempt 2 are addressed too. I found no new clash. One note remained: the overview's example of a typo going to QA no longer matched the small-change route.

## Why this way

I judged fit only, as the reviewer's rules require, so whether QA should add acceptance tests at all was a note, not a clash. The ownership overlap was a clash because two rulesets gave the same files to different roles, and PM routes findings by owner. Each fix I proposed narrows an existing rule, so the levels stay in order. On attempt 2 each earlier clash was checked first, and the two new ones were about routing and placement, each fixed by narrowing PM's route and widening QA's placement rule to name the suite.

I didn't count the overview's typo example as a clash, because the overview describes the departments rather than binding them, so it was left as a note.

## Checks

A read-only review with Read, Grep and Glob, comparing the agent files line by line with `programming-engine.md`. On attempts 2 and 3 I reread the changed lines in the coordinator's rules and README, QA's rules, README and report template, and the job note. Nothing was run.

## Where it stands

Attempt 3 returned the verdict "No clashes". Every clash from attempts 1 and 2 is fixed and the acceptance criteria are met. PM reworded the overview's typo example to match the small-change route.

## Next

PM commits the change with this handoff, pushes `docs/departments/12-qa` and opens the PR that closes #12. A change to any `RULES.md` before merge needs another rule review.
