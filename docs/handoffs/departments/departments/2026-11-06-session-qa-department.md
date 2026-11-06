---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/12"
role: session
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/12-qa
pr:
---

# Write the QA department

[#12](https://github.com/MDReal32/tenon/issues/12) asks for the QA department, with the two roles the roster names, conformance and e2e, in the shape [#11](https://github.com/MDReal32/tenon/issues/11) gave Programming: a triplet and a Sonnet agent file per role, the department's templates and knowledge file, the roster row set to written, and any "until written" clause narrowed. It continues [the Programming handoff](2026-11-05-session-programming-department.md). The task's route has the owner write it, which a direct session does for the owner while HR isn't written, then the Architect reviewer's rule review.

## What I did and how

I wrote [`docs/departments/qa/`](../../../departments/qa/README.md) after Programming's shape, since QA is the other department that writes files. The department's rules say what QA checks: each acceptance criterion with a yes or no, from the outside, repeatably. They also say what it may change: only a bug's reproduction test with its fixtures, never product code, and never another role's test. Then they cover how it runs checks and reports findings, which it never fixes itself. The same work-record exception as Programming's lets each role keep its own handoff and the job note. The conformance role checks extensions, SDKs and host adapters against `protocol/` through `tenon-conformance`, and places a protocol bug's reproduction as a scenario in the suite but never touches the harness, which is engine code. The e2e role drives only the built `tenon` binary, each scenario in its own temporary directory with `HOME` set inside it, and never points a scenario at a real home or root. The two templates are the QA report, with each criterion and the test that checks it, and the QA reproduction for bugs. The agent files `qa-conformance` and `qa-e2e` follow Programming's. In the [overview](../../../departments/README.md), the status line and the roster row now say QA is written. No other ruleset had an "until QA is written" clause to narrow. The review's fixes reached other rulesets: Programming's rules keep a bug's reproduction test QA's, and the engine role's part leaves those tests out; PM creates a bug's task branch at intake and names the QA roles on the bug and small-change routes; the Architect gate names the QA roles in its verdict, with a new line in its verdict template. The overview's typo example now says a small change skips QA when nothing QA checks changed.

## Why this way

QA writes only a bug's reproduction test, because the roster says it never edits product code while the flow has it write a bug's failing test. My first draft let QA add tests where the gate's plan placed them, but the review showed that overlapped Programming's ownership and that a bug has no plan when it is reproduced. As PM I decided QA adds no tests at the check step: a criterion with no test is a finding for Programming. The reproduction goes beside the tests of the part the bug names, or into the conformance suite for a protocol bug, and stays QA's so Programming can't weaken it. QA's scenarios stop short of the harness for the same reason. The e2e role's rule against real home and root paths comes from M0's overwrite guard: its last task tests that refusal, and a test that got it wrong would touch the machine's real files. Conformance runs before e2e when a task needs both, since a protocol fault explains an end-to-end failure, not the other way round.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed. The Architect reviewer's [rule review](2026-11-06-architect-reviewer-qa-department.md) found four clashes on attempt 1 and two on attempt 2, all fixed, and none on attempt 3.

## Where it stands

Done on `docs/departments/12-qa`, with the rule review passed, and the PR that closes #12 is open for the owner's review.

## Next

The owner reviews and merges the PR. The next department to write is Docs, [#13](https://github.com/MDReal32/tenon/issues/13).
