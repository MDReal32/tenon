---
type: handoff
job: "[[roadmap]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/2"
role: architect-gate
model: claude-opus-5-5
date: "2026-11-05"
status: done
branch: docs/roadmap/2-plan
pr:
---

# Architect gate's draft of M0, M1 and the later milestones

PM asked the Architect gate to draft the plan for [#2](https://github.com/MDReal32/tenon/issues/2), continuing from [the BA review](2026-11-03-ba-assistant-plan-review.md). The draft holds M0 as PR-sized tasks in order, M1 as epics, the later milestones as an outline, and milestones for the design parts the old roadmap didn't name. Everything was checked against the four axes, the layers and the workspace rules, and every M0 task was sized. The step ran five times. Each run after the first folded in the owner's answers to the questions the one before had raised.

## What I did and how

In the first attempt I read the whole [design book](../../../tenon.md), the [decisions](../../../06-project/02-decisions.md) and [still open](../../../06-project/03-still-open.md) pages, the [roadmap job](roadmap.md) and the [departments overview](../../../departments/README.md). I also read libramigo's `libs/dev` pages for the shape the owner wants. I drafted M0, the M1 epics and an outline from M2 to M9, with AI support, the plugin catalogue and a GUI or editor server proposed as M7 to M9.

The second attempt applied the owner's answers:

- `tenon.lang-ts` is the first generated project, written in Rust on `sdks/rust`.
- M0 ships `tep/0`, and `tep/1` freezes at the end of M2.
- The host trait gets its own crate, `tenon-host`.
- M0 conditions are the book's two simple forms.
- The command is `tenon new`.
- The tooling is Yarn, `@monodon/rust`, Biome and wasmtime.
- HR comes last among the departments.
- M0 to M4 are fixed, and M5 onward can change.

A correction then made Base and the pack built into the binary until M5, loaded through the common path.

The third attempt applied three more answers:

- The manifest file is `tenon.toml`.
- The project name is asked after the language and checked only by the chosen language's rules. To do this, a narrow `validate` phase moved from E4 into M0. It added `validate` to `tep/0`, split the message-schema task in two, and added a core task for the phase.
- Overwrite empties the target first. This became an applier-only "clear target" step, run only after the user confirms.

The fourth attempt applied the last three answers:

- "No" to overwrite writes nothing and exits non-zero.
- Clearing never touches a filesystem root or the user's home directory, and removes symlinks without following them.
- An empty directory answer is asked again, through a diagnostic from Base's `validate`.

M0 holds 28 tasks: six departments, five workspace and CI tasks, and seventeen for the product slice.

In the fifth attempt, the PO proxy rejected the plan for one reason: M0-17's acceptance criteria only described how the `tenon-host` crate is built. I added criteria anyone can check by running its tests. A test adapter implements the trait, its handshake returns the manifest it was given, a call returns the matching response, and after shutdown a call returns the trait's error without panicking. A failed handshake also comes back as that error, naming the extension. The crate stays separate, as owner answer 4 settled. Folding the trait into `tenon-protocol` would give the generated-types crate a runtime role. Folding it into `tenon-host-wasm` would make every later adapter depend on the WASM adapter.

## Why this way

M0 holds only what the front page's first version needs, which keeps the condition matchers and handler ordering out of it. Decision 3's "before M1 ends" still holds, because the engine keeps the number M1. Departments come first because routes park without them, and generators come before the packages they create.

The name check and the empty-directory check reuse the book's `validate` phase, diagnostics and back-navigation, each in a narrow form. That added no new concept. `wrap` lost because it normalizes rather than rejects. A check right after each answer lost because it would reorder the hook phases.

Clearing the target stays out of the protocol. No extension can delete anything, and decision 3's primitive kernel is unchanged. Its guard sits in the core applier, so no frontend can skip it.

The built-in extensions follow the Base page's "bundled, but loaded through the exact same path", and no engine code names an id. The old M0's two-language spike lost to the owner's order of WASM first. Language independence is proven in M2 instead. Nothing marked open was decided.

## Checks

Gate checks 1–6 were applied after each round of answers, and all pass in the final plan. Every M0 task is sized and routed, and answers each definition-of-ready item. No commands were run, since the gate is read-only.

## Where it stands

Done, after the fifth attempt answered the PO proxy's only rejection, on M0-17. The final plan is in PM's hands:

- M0's 28 tasks, ready and in order
- M1's ten epics
- the outline from M2 to M9, with M5 onward labelled changeable

No owner questions are open. Nothing is committed on a branch.

## Next

The PO proxy checks the plan for fit. It can start with the language-independence proof moving from M0 to M2, and the proposed milestones M7 to M9. Then PM opens the M0 task issues and the M1 epic issues under GitHub milestones, and sets each M0 task's `Size` from this draft. #2's PR then:

- rewrites the roadmap page, with M0 to M4 fixed and M5 onward changeable
- changes `tenon generate` to `tenon new` in decision 7
- brings the roadmap job note's "How it works" and "Current state" up to date
