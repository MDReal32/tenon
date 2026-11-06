---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/13"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/13-docs
pr:
---

# Rule review of the Docs department

PM asked for a rule review of the Docs department written for [#13](https://github.com/MDReal32/tenon/issues/13), continuing [the Docs handoff](2026-11-06-session-docs-department.md). The question was whether the new rulesets clash with any workspace rule, the handbook or another department's rules, whether each level only narrows the one above, and whether the task's acceptance criteria are met. The branch is stacked on QA's (PR #53), so the review covered only the uncommitted working tree.

## What I did and how

I read the handbook, Architect's rules and my own, then every file under `docs/departments/docs/`, the `docs-writer` agent file, the overview's status line and roster, the job note and the session handoff. I compared them with `.claude/rules/`, with `docs/departments/CLAUDE.md`, and with Programming's and QA's rules, read the `department-access` hook to check whether the writer needs new access, and grepped `docs/departments/` for any "until … written" clause left about Docs. I found two clashes. Docs' rules said department files and `docs/templates/` "change only through a rule-change PR", while the departments CLAUDE.md and the handbook let READMEs, knowledge files and department templates change with the work they describe. And Programming's rules, with QA's more mildly, gave every page under `docs/` and every package README to the Docs writer, while the writer's part was only the design book and the READMEs under four package roots.

On attempt 2 I checked both fixes against the files they had clashed with, and both are fixed. Docs' rule now gives the right reason for leaving department files alone. The writer's part holds every `README.md` outside `docs/`, the root one included, and Programming's and QA's rules forbid them every page under `docs/` and every `README.md`, naming the writer as the owner. No other part claims a README outside `docs/`: the dev role's part names the root config files but not the root README.

## Why this way

I counted both as clashes rather than wording notes because each is a statement in one ruleset that another contradicts: what a department file may change with, and who owns which files. For each I suggested the narrower fix that keeps every prohibition and only corrects the attribution. Whether the writer owns `dist/`, `protocol/` and root READMEs was a scope question, so I left it open. The diff base on a stacked branch, the link-fix gap from docs.md's "same change" rule and the unowned root README went in as notes, because they don't contradict a written rule.

On attempt 2 I accepted the wider writer's part instead of the narrower attribution I had suggested, since the clash was only the mismatch between two rulesets and the ownership itself is the owner's call. README templates inside future `libs/dev` generators stay a note, since no rule names them yet.

## Checks

Reading and grep only, as Architect's rules require. Attempt 1 found two clashes, and attempt 2 confirmed both fixed and found no new ones. The acceptance criteria are met: triplets for the department and the role, a Sonnet agent file in the existing shape, the Docs report template and knowledge file, the roster row and status line set to written, and no "until Docs is written" clause left to narrow. The hook needs no change.

## Where it stands

No clashes, attempt 2. Still open for the owner: which role fixes links outside the writer's part when a page is renamed inside a task PR, and whether README templates inside `libs/dev` generators belong to the dev role or the writer. PM's session added the root README to the Docs and writer descriptions.

## Next

PM commits the change, opens the PR that closes #13 stacked on #53, and records its number here.
