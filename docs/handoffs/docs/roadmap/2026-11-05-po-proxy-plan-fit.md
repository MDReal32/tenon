---
type: handoff
job: "[[roadmap]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/2"
role: po-proxy
model: claude-opus-5-5
date: "2026-11-05"
status: done
branch: docs/roadmap/2-plan
pr: 49
---

# PO proxy's product-fit check of the whole-project plan

PM asked the PO proxy to check the plan for [#2](https://github.com/MDReal32/tenon/issues/2) for product fit. This continues from [the Architect gate's draft](2026-11-05-architect-gate-m0-draft.md). The check covered four things: whether the plan serves the owner's product definition on the [front page](../../../tenon.md), whether M0 ends in that page's first version, whether each M0 task's acceptance criteria are outcome-based, and whether the plan matches what the owner answered. The gate asked for a close look at two points: moving the language-independence proof from M0 to M2, and the proposed milestones M7 to M9. The step ran twice. The first attempt rejected the plan on one task, and the second approved it.

## What I did and how

In the first attempt I read the handbook, PO's rules and the proxy's rules, and did the start-up check. I then read the [BA review](2026-11-03-ba-assistant-plan-review.md), the gate's handoff, the [roadmap job note](roadmap.md), and the final plan, which PM supplied as a scratchpad file because the proxy can't read GitHub. I checked the plan against the front page, the [four axes](../../../01-foundations/00-four-axes.md), the [decision graph](../../../03-engine/00-decision-graph.md), the [lifecycle hooks](../../../03-engine/02-lifecycle-hooks.md), the [runtimes](../../../04-extensions/00-runtimes.md), [Base](../../../04-extensions/03-base.md), the current [roadmap](../../../06-project/01-roadmap.md), the [decisions](../../../06-project/02-decisions.md) and [still open](../../../06-project/03-still-open.md). I compared all 28 M0 tasks, the ten M1 epics and the outline from M2 to M9 with those pages and with every owner answer.

M0-27 and M0-28 deliver the front page's first version. Every owner answer appears as it was given, and the plan decides no **[open]** item. One check failed: M0-17, the `tenon-host` crate, was the only M0 task whose criteria said only how it is built. I rejected the plan on that alone.

In the second attempt the gate kept M0-17 as its own crate, as owner answer 4 asks. It gave the task a goal and criteria that can be checked by running its tests. Through a test adapter, handshake returns the given manifest, a call returns the matching response, a call after shutdown returns the trait's error without a panic, and a failed handshake comes back as that error naming the extension. I re-read M0-17 in the updated plan and checked it against the trait on the runtimes page. It passes. PM reported that nothing else changed, and the verdict is now Approved.

## Why this way

The move of the language-independence proof to M2 needed no owner question, because it follows directly from the owner's answer that WASM comes first and TypeScript plugins come in M2. M2's conformance over both transports proves the thesis. In the meantime, M0-22 keeps the Rust SDK off the engine crates. Each of M7 to M9 traces to the book: the front page's AI paragraph, the catalogue on the discovery page, and the GUI/LSP-style frontend on the layers page. The owner had already approved a plan up to M9 with M5 onward changeable.

The department tasks M0-01 to M0-06 passed check 3, because they change what the owner sees: the pipeline routes steps to the new roles instead of to the owner. M0-17 had nothing like that in the first attempt. The rules allow approval only when every check passes, so approving with a note was not an option. In the second attempt I accepted the gate's choice to keep the crate separate. Splitting crates is a technical call, and owner answer 4 settles it. The new criteria describe what an adapter author can do, which is what check 3 asks for.

## Checks

In the first attempt I applied the five gate checks to the plan and to each M0 task. Four passed, and outcome-based criteria failed for M0-17 only. In the second attempt I applied all five checks again to M0-17, and they pass. The plan is approved. No commands were run, since the role is read-only.

## Where it stands

Done, with the verdict "Approved". No owner questions are open, and nothing is committed on a branch.

## Next

Both halves of the gate have now approved. PM opens the M0 task issues and the M1 epic issues under GitHub milestones, and sets each M0 task's `Size` from the plan. #2's PR then:

- rewrites the roadmap page, with M0 to M4 fixed and M5 onward changeable
- changes `tenon generate` to `tenon new` in decision 7
- brings the roadmap job note's "How it works", "How it got here" and "Current state" up to date
