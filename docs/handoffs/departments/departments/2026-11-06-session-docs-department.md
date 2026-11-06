---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/13"
role: session
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/13-docs
pr: 54
---

# Write the Docs department

[#13](https://github.com/MDReal32/tenon/issues/13) asks for the Docs department with its one role, the writer, in the shape [#11](https://github.com/MDReal32/tenon/issues/11) gave Programming: a triplet and a Sonnet agent file for the role, the department's templates and knowledge file, and the roster row set to written. It continues [the QA handoff](2026-11-06-session-qa-department.md), and its branch is stacked on QA's, since both change the overview's status line and roster. The route has the owner write it, which a direct session does while HR isn't written, then the Architect reviewer's rule review.

## What I did and how

I wrote [`docs/departments/docs/`](../../../departments/docs/README.md) after Programming's shape, since Docs is another department that writes files. The department's rules say what it documents: what the approved plan and the change on the task branch say, with a disagreement between a page and the code stopped and reported rather than settled in a page. They also say what it may change: its own part only, never code, tests, schemas or config, and never a ruleset, a department file, a workspace rule or a work-record template. A decision moves from still open to decisions only when the task records the owner's decision. Then they cover writing to the book's own rules, the docs check, commits and review findings. The writer's part is the design book, `docs/tenon.md` and its six chapters, and every `README.md` outside `docs/`, the root one included. Programming's and QA's rules now give the writer exactly that part, instead of every page under `docs/`. The one template is the Docs report, which lists each page changed and allows a report with no commits when nothing needed to change. The agent file `docs-writer` follows Programming's. In the [overview](../../../departments/README.md), the status line and the roster row now say Docs is written. No ruleset had an "until Docs is written" clause to narrow.

## Why this way

The writer's part leaves out `docs/departments/`, `docs/handoffs/` and `docs/templates/`, though they sit under `docs/`. Rulesets change only through rule-change PRs, which HR will own, and the work record belongs to each role that writes it. The writer documents rather than designs, because the design book is the design: a page that settled an open question would be a design decision the gate and the owner never saw. The writer takes every `README.md` outside `docs/`, rather than only those under the four package roots the review pointed at, because the roster gives Docs "package READMEs" without exceptions and a README under `dist/` or `protocol/` would otherwise have no owner. The docs check is left to `libs/dev`, which the Architect knowledge already names as its home, with reading the links as the fallback until it exists.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed. The Architect reviewer's [rule review](2026-11-06-architect-reviewer-docs-department.md) found two clashes on attempt 1, both fixed, and none on attempt 2.

## Where it stands

Done on `docs/departments/13-docs`, with the rule review passed. The PR that closes #13 is stacked on the QA PR. Open for the owner: which role fixes links outside the writer's part when a page is renamed inside a task PR, and who owns README templates inside future `libs/dev` generators.

## Next

The owner reviews and merges the QA PR, then this one. The next department in M0 is DevOps.
