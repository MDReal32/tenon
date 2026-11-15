---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/19"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-14"
status: done
branch: chore/dev/19-docs-check
pr:
---

# BA readiness check of the libs/dev docs check task

PM asked the BA assistant to check [#19](https://github.com/MDReal32/tenon/issues/19) against BA's definition of ready, and whether the task, sized L, fits one reviewable PR. The task creates `@tenon/dev` at `libs/dev` with a `docs:check` that fails on broken links and anchors, unknown wikilinks, duplicate file names and a broken `prev`/`next` chain, naming path and line. It is the first step on the [libs/dev](libs-dev.md) job and builds on the [Nx workspace](../nx-workspace/nx-workspace.md). Attempt 1 ended in five questions for the owner and a split proposal. After the owner answered on 2026-11-15, PM asked for attempt 2: check readiness again with the answers and split the task along the proposed seam.

## What I did and how

In attempt 1 I read the task text from PM's assignment and went through the eight definition-of-ready items. I read [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md)'s M0 groundwork, the Nx workspace job's note and two handoffs, the rules the check enforces (docs.md, markdown.md, nx-config.md, nx-tasks.md) and the overview's pull request size section. I also looked at what the check will meet: 82 external links across 36 files under `docs/`, mostly GitHub issue URLs, no wikilink with a heading or alias, and an example link inside a code span in the handoff template, which only passes if code is skipped. Six items were answered and five gaps became questions: external links, which files are read, what "It skips code" covers, what a duplicate-name failure names, and how today's breakage is handled when merged handoffs may not be rewritten.

In attempt 2 I took the owner's five answers from PM's assignment. They were given in chat on 2026-11-15. Links to other websites don't count. Only the Markdown under `docs/` is read, but links from it to files outside are checked. Code blocks and inline code are ignored. A duplicate name shows every path with line 1. Real breakage is fixed in the same PR, merged handoffs included, this one time. With those answers, all eight items are met, and I returned two briefs. The first is the `@tenon/dev` library at `libs/dev`, which covers "`@tenon/dev` lives at `libs/dev`." and depends only on the merged [#17](https://github.com/MDReal32/tenon/issues/17). The second is the docs check executor. It covers the `docs:check` criterion with its four cases, "It skips code." and "It passes on today's `docs/`.", and it depends on the first. [#21](https://github.com/MDReal32/tenon/issues/21) needs only the first.

## Why this way

BA's rules turn every gap into a question, never a default. Two candidate gaps were not asked in attempt 1: the chain's shape is defined by docs.md, and the heading slug rule is bounded by "It passes on today's docs/", so it is a plan choice for the gate. The split follows a real seam, the library versus the tool built in it, rather than a file count. The four failure cases are one criterion and can't be split across tasks. So the docs check task is the smallest it can be, and its PR may go over the size guide with the reason stated. The library task stays within its one criterion and adds no build or CI requirement the task doesn't state. Whether CI should run `docs:check` is not in the task. It was reported to PM as a possible decision for the owner instead of being added to a brief.

## Checks

Every definition-of-ready item was checked against the task text, the owner's answers and the pages above. Each parent criterion was placed in exactly one split task, quoted whole. The counts in attempt 1 come from searching `docs/` in the working tree. No other checks apply to a read-only step.

## Where it stands

Done: two briefs are with PM, for sub-issues of #19 in the order library, then docs check. Reported to PM in passing: the owner's answers were given in chat and belong on #19. Whether CI runs `docs:check` is not stated, and CI's targets today are `lint test build check`. `docs/departments/docs/RULES.md` and `docs/departments/hr/RULES.md` will need an HR rule change once the check lands, and two knowledge files will go stale. DevOps has no criterion in either split task.

## Next

PM opens the two sub-issues of #19 from the briefs. The Architect gate and PO check each one, and the library task goes to Programming dev first.
