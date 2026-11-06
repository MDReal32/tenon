---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/14"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/14-devops
pr: 56
---

# Rule review of the DevOps department

PM asked for a rule review of the DevOps department written for [#14](https://github.com/MDReal32/tenon/issues/14), continuing [the DevOps handoff](2026-11-06-session-devops-department.md). The question was whether the new rulesets clash with any workspace rule, the handbook or another department's rules, whether each level only narrows the one above, and whether the task's acceptance criteria are met, the hook's included. The branch is stacked on Docs' (PR #54), so the review covered only the uncommitted working tree.

## What I did and how

I read the handbook, Architect's rules and my own, then every file under `docs/departments/devops/`, the `devops-engineer` agent file, the changed overview, handbook and Programming dev rules, the job note and the session handoff. I compared them with `.claude/rules/`, with `docs/departments/CLAUDE.md`, and with the Architect gate's, PM coordinator's and Programming's rules. I grepped `docs/departments/` for every "until … written" clause and every mention of CI, workflows, launchers and `dist/`, read the `department-access` hook and its tests, and checked `.gitignore` for `.env`.

I found four clashes. Two were "until written" clauses about DevOps still in Architect's rules: the department's rule that sent infrastructure notes to the owner, and the gate's rule that parked a route at DevOps' step. The third was a scope mismatch: the gate named DevOps for environment variables, which DevOps' review didn't cover. The fourth was a DevOps build step that neither PM's routes nor the overview's flow ever started.

On attempt 2 I checked each of the four fixes against the files it had clashed with, and all four are fixed. The two notes PM took also hold. Rechecking the build step, I found one new clash, missed on attempt 1: every feature route has a specialist step run by the owning department, but DevOps, which now owns `dist/`, the release workflow and `.env.example`, had no specialist duty, rule or analysis template, so a launcher or release feature couldn't pass that step.

On attempt 3 I checked the specialist fix against PM's feature route, the overview's flow and the gate's input. DevOps' rules now have a plan section in Programming's words, both READMEs add the specialist step, and the new [DevOps analysis](../../../departments/devops/templates/devops-analysis.md) template copies Programming's shape, adding only that no secret value goes in. The clash is fixed, and I found no new one.

## Why this way

I counted the two Architect clauses as clashes because "Adding a department" and the task both require narrowing them, and the first routed infrastructure notes past a department that now exists. I counted the environment-variable gap and the missing build step as clashes because in each, one ruleset gave DevOps work the other gave it no way to do. Four things went in as notes because none contradicts a written rule: the `git status` check for an ignored `.env`, the Programming READMEs that still gave the dev role every workflow, the release workflow's unnamed file, and the hook trusting the agent type, so an `--agent devops-engineer` session also reaches `.env`.

On attempt 2 I counted the specialist gap as a clash, since PM's route requires the step and PM accepts only output in the role's template, so together the rulesets left the route unable to move. The stale roster row stayed a note.

On attempt 3 I accepted the fix that gives DevOps its own specialist step rather than making the step depend on the owning department, since it keeps PM's route the same for every department. Two description gaps stayed notes: the build input not naming the analysis, and the engineer's CLAUDE.md naming only the report and the review.

## Checks

Reading and grep only, as Architect's rules require. Attempt 1 found four clashes, attempt 2 confirmed them fixed and found one new one, and attempt 3 confirmed that one fixed and found none. The hook criteria are met: `.env` access depends on an exact `devops-engineer` agent type, and the tests deny every `.env` call to the main session, a Programming role and four near-names, while allowing it to the DevOps engineer.

## Where it stands

No clashes, attempt 3. PM's session took both description notes. The owner still reviews the hook's `--agent` boundary in place of Cyber security.

## Next

PM commits the change, opens the PR that closes #14 stacked on #54, and records its number here.
