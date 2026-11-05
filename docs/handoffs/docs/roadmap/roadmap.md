---
type: job
area: docs
status: done
tasks:
  - "https://github.com/MDReal32/tenon/issues/2"
updated: "2026-11-05"
---

# Roadmap

The roadmap is the plan for building Tenon: the milestones in the design book's [roadmap](../../../06-project/01-roadmap.md), broken into tasks the departments can run one reviewable change at a time. The owner uses it to decide what comes next, and PM uses it to fill the Tenon project's `Todo` column.

## How it works

Each milestone is a thin vertical slice that proves one thing before the next is built on it, from M0, the first version, to M9, a GUI or editor server frontend, as the [roadmap page](../../../06-project/01-roadmap.md) lists them. M0 to M4 are fixed and M5 onward can change. The current milestone is broken into PR-sized task issues and the next one into epic issues, all in the Tenon project under GitHub milestones; later milestones stay an outline on the roadmap page. New issues wait in `Backlog` until the owner approves them into `Todo`, and the order of the tasks is the order of the work.

## How it got here

Planning started with [#2](https://github.com/MDReal32/tenon/issues/2), which asks for the whole project to be planned, with the BA assistant reviewing it first. [The BA review](2026-11-03-ba-assistant-plan-review.md) asked the owner 15 questions, then three more after the owner reviewed the book, and ended in a brief. [The Architect gate](2026-11-05-architect-gate-m0-draft.md) drafted M0 as tasks, M1 as epics and an outline to M9, folding in the owner's answers over five attempts. [The PO proxy](2026-11-05-po-proxy-plan-fit.md) rejected one task's criteria, then approved. A direct session opened the milestones and issues and rewrote the roadmap page in [the roadmap rewrite](2026-11-05-session-roadmap-rewrite.md).

## Current state

The plan is done. Milestones M0 to M4 exist, with the 28 M0 tasks ([#11](https://github.com/MDReal32/tenon/issues/11) to [#38](https://github.com/MDReal32/tenon/issues/38)) and the ten M1 epics ([#39](https://github.com/MDReal32/tenon/issues/39) to [#48](https://github.com/MDReal32/tenon/issues/48)) in `Backlog`, waiting for the owner to approve them into `Todo`. The [roadmap page](../../../06-project/01-roadmap.md) matches the plan. When M1 becomes current, its epics are broken into tasks and M2 gets its epics.
