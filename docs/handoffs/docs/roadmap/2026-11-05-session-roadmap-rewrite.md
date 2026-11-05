---
type: handoff
job: "[[roadmap]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/2"
role: session
model: claude-opus-5-5
date: "2026-11-05"
status: done
branch: docs/roadmap/2-plan
pr: 49
---

# Open the plan's issues and rewrite the roadmap page

After both halves of the gate approved the plan for [#2](https://github.com/MDReal32/tenon/issues/2), PM filed it and the owner asked for the docs change that closes the task. This continues from [the PO proxy's check](2026-11-05-po-proxy-plan-fit.md) and [the Architect gate's draft](2026-11-05-architect-gate-m0-draft.md).

## What I did and how

I created the GitHub milestones M0 to M4, each with a one-line goal. From the approved plan I opened the 28 M0 tasks as [#11](https://github.com/MDReal32/tenon/issues/11) to [#38](https://github.com/MDReal32/tenon/issues/38), in the order the plan sets, and the ten M1 epics as [#39](https://github.com/MDReal32/tenon/issues/39) to [#48](https://github.com/MDReal32/tenon/issues/48). Each task issue carries its goal, acceptance criteria, scope, errors, dependencies as issue links, size and route, plus the values its group shares. Every issue went onto the board in `Backlog`, with `Kind`, `Area` and, for tasks, `Size`. The full list is on #2.

Then I rewrote the [roadmap page](../../../06-project/01-roadmap.md): M0 to M4 as settled milestones, M5 to M9 as a changeable outline. I changed `tenon generate` to `tenon new` in [decision 7](../../../06-project/02-decisions.md) and on [the generation page](../../../03-engine/01-generation.md), updated the milestone range in PO's knowledge file, and brought the [roadmap job note](roadmap.md) up to date.

The owner then asked for every PR to go on the board with its required fields filled. I added PR #49 in `In Review` with `Kind` `Task`, `Area` `docs` and `Size` `S`, and wrote it into the [board rule](../../../../.claude/rules/board.md): every PR goes on the board when it is opened, with every field filled, and every issue with `Status`, `Kind` and `Area` set.

## Why this way

The issues sit in `Backlog` because the board rule lets only the owner move an item out of it, and the owner's answer on the route was that PM opens the issues and the owner edits and approves them. M2 to M4 have milestones but no issues, since the three-tier answer gives issues only to the current milestone and the next. The roadmap page keeps the M5+ outline as a list because each item is a separate milestone; M0 to M4 get a section each, since they are fixed.

## Checks

The board lists all 38 new issues with the fields above. The link, anchor and table check over `docs/` and `.claude/` passed.

## Where it stands

Done, on `docs/roadmap/2-plan`, in a PR that closes #2.

## Next

The owner reviews the M0 tasks and moves the approved ones to `Todo`. The first task to run is #11, writing the Programming department.
