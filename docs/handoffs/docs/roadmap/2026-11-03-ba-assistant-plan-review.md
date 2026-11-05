---
type: handoff
job: "[[roadmap]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/2"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-03"
status: done
branch: docs/roadmap/2-plan
pr:
---

# BA review of the whole-project planning task

PM asked the BA assistant to check [#2](https://github.com/MDReal32/tenon/issues/2) against BA's definition of ready. The task asks for the whole of Tenon to be planned: the design book and its M0–M6 roadmap turned into tasks the departments can run, one reviewable change at a time. The owner also asked to hear the assistant's ideas, so each gap came back as a question, with options where clear ones exist. This is the first step on the [roadmap](roadmap.md) job. It ran three times: on the original book, again after the owner's first answers and [the owner review](../design-book/2026-11-04-session-owner-review.md), and a last time after the owner answered the remaining three questions. It ended in a brief.

## What I did and how

In the first attempt I read the handbook, BA's rules and the assistant's rules, the whole design book from the [front page](../../../tenon.md) to [what is still open](../../../06-project/03-still-open.md), the [departments overview](../../../departments/README.md), the [design-book](../design-book/design-book.md) and [departments](../../departments/departments/departments.md) job notes, and the PM, Architect and PO knowledge. Going through the eight definition-of-ready items, I found no acceptance criteria, and no stated scope, output form or depth. There were also design parts no milestone named, `exec` coming before the lockfile, an unclear protocol version freeze, and three stale **[open]** markers. All of it went to the owner as 15 questions.

In the second attempt I re-read the front page's new "What Tenon is" section, the ten pages the owner review changed, and that review's handoff. Then I checked each item again against the owner's answers, which PM relayed from the session. The answers settle the goal, the acceptance criterion, the scope and its three tiers, the drafting route, platforms in outline, and the dependencies. They mark Surface, Contract and Errors not applicable. Three gaps remain. The first is whether the front page's first version is M0's goal, which decides what the current milestone holds. The second is how "WASM first" fits "TypeScript first" when the book now runs TypeScript plugins on the user's Node through `process`. The third is whether "Windows from M4" names the distribution milestone once the roadmap is renumbered. These went back as three questions.

In the third attempt the owner's answers closed all three. M0's goal is the first version, WASM comes alone first with TypeScript plugins later, and Windows starts at the distribution milestone. Every definition-of-ready item is now answered or marked not applicable, so I returned the brief. It quotes the owner's acceptance criterion as written, sets out in and out of scope from the answers, and lists the decisions left for later as dependencies: the first kind of generated project, the first WASM plugin's language, and the protocol version freeze. It names the [roadmap page](../../../06-project/01-roadmap.md) and [decision 3](../../../06-project/02-decisions.md) as the pages the plan touches.

## Why this way

The rules say gaps are questions, never defaults, so no gap is filled. In the first attempt, ideas came as options inside the questions, and the only recommendation was a rolling plan, which the owner took as three tiers. In the second attempt, the items the owner said are decided as they come (the protocol version freeze, the first kind of generated project, the still-open list) are not asked again. That follows the owner's answer, and they're listed as left for later instead. The WASM and TypeScript point is asked rather than left for the Architect to propose, because it is a conflict between the owner's own statements and the book, and the handbook sends conflicts to the owner. Items left to be decided as they come up appear in the brief as dependencies, so the Architect gate knows the owner must decide them while drafting M0, since the acceptance criterion needs every M0 task ready.

## Checks

Every definition-of-ready item was checked against the task, the owner's answers and the current book in all three attempts. No other checks apply to a read-only step.

## Where it stands

The BA step is done, and the brief for [#2](https://github.com/MDReal32/tenon/issues/2) is posted on the issue. Nothing is committed on a branch yet.

## Next

PM sends the brief to the Architect gate, which drafts M0 as PR-sized tasks and M1 as epics, and proposes a milestone for each design part the roadmap doesn't name. While drafting, it raises the decisions left for later (first kind of generated project, first WASM plugin language) with the owner through PM. PO then checks fit, PM opens the issues under GitHub milestones, and the roadmap page is rewritten to match.
