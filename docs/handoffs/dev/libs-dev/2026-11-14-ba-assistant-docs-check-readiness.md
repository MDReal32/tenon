---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/19"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-14"
status: blocked
branch: chore/dev/19-docs-check
pr:
---

# BA readiness check of the libs/dev docs check task

PM asked the BA assistant to check [#19](https://github.com/MDReal32/tenon/issues/19) against BA's definition of ready, and whether the task, sized L, fits one reviewable PR. The task creates `@tenon/dev` at `libs/dev` with a `docs:check` that fails on broken links and anchors, unknown wikilinks, duplicate file names and a broken `prev`/`next` chain, naming path and line. It is the first step on the [libs/dev](libs-dev.md) job and builds on the [Nx workspace](../nx-workspace/nx-workspace.md). The check ended in five questions for the owner and a split proposal.

## What I did and how

I read the task text from PM's assignment and went through the eight definition-of-ready items. I read [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md)'s M0 groundwork, the Nx workspace job's note and two handoffs, the rules the check enforces (docs.md, markdown.md, nx-config.md, nx-tasks.md) and the overview's pull request size section. I also looked at what the check will meet: 82 external links across 36 files under `docs/`, mostly GitHub issue URLs, no wikilink with a heading or alias, and an example link inside a code span in the handoff template, which only passes if code is skipped.

Six items are answered: goal, scope, surface, contract, platforms and dependencies. Five gaps are left, each a question. Whether a broken link includes external URLs. Which files the check reads besides `docs/`. What "It skips code" covers. What a duplicate-name failure names, since a file name has no line. And how "It passes on today's docs/" is met if the check finds real breakage, given that merged handoffs may not be rewritten.

## Why this way

BA's rules turn every gap into a question, never a default. Two candidate gaps were not asked: the chain's shape is defined by docs.md, and the heading slug rule is bounded by "It passes on today's docs/", so it is a plan choice for the gate. The task can't fit about 400 hand-written lines or 20 files, and the split follows a real seam. The first task is the `@tenon/dev` library at `libs/dev`, with its targets wired into the Nx pipeline, which covers "lives at `libs/dev`". The second is the docs check executor, which covers the four failure cases, skipping code and passing on today's docs. The four cases are one criterion and aren't split across tasks. BA's split duty is the assistant's, so the owner is asked only the five questions, not about the split.

## Checks

Every definition-of-ready item was checked against the task text and the pages above. The counts come from searching `docs/` in the working tree. No other checks apply to a read-only step.

## Where it stands

Blocked on the owner: five questions are open on #19. Seen in passing: `docs/departments/hr/RULES.md` and `docs/departments/docs/RULES.md` say "until `libs/dev` has it, check by reading", which will need an HR rule change once the check lands, and three knowledge files will go stale. DevOps' part in this task is unclear, since no criterion asks for CI.

## Next

When the owner answers on #19, PM sends BA the answers for attempt 2, which returns a brief per split task, and then the Programming dev role plans as specialist.
