---
type: handoff
job: "[[design-book]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/3"
role: session
model: claude-opus-5-5
date: "2026-11-04"
status: done
branch: docs/design-book/3-owner-review
pr: 4
---

# The owner's review of the design book

While answering the BA assistant's questions on [#2](https://github.com/MDReal32/tenon/issues/2), the owner found that the design book held concepts they had never chosen, such as `exec`, the lockfile and the protocol version freeze. A plan built on them would plan the wrong project, so [#3](https://github.com/MDReal32/tenon/issues/3) came first: walk the whole book with the owner, who keeps, changes or cuts each concept. This continues the [design-book job](design-book.md) after [the split](2026-11-03-session-split-architecture.md).

## What I did and how

I went through the book chapter by chapter in the session, putting each concept to the owner in one plain sentence with keep, change or cut as answers. Where the owner asked what something meant, I explained it with a concrete example before asking again. The answers were logged as they came, and then applied to eleven pages in one pass.

Kept as written: the four axes, the front-ends (TUI, plain CLI, JSON for CI, a later GUI or editor server), the vocabulary every SDK shares, the question graph that any plugin can extend, headless answers and determinism, back-navigation, `tenon explain`, plan-then-apply, merge operations, lifecycle hooks, the authoring tools and the conformance suite, Base as an ordinary plugin, decisions 1, 3 and 4, and the lockfile, which moves to a later milestone.

Changed:

- **Transports.** WASM comes first and stdio processes after, the reverse of the book's order. The [protocol](../../../02-protocol/00-protocol.md), [manifest](../../../02-protocol/01-extension-manifest.md), [layers](../../../01-foundations/01-layers.md) and [runtimes](../../../04-extensions/00-runtimes.md) pages now say so.
- **Interpreters.** Tenon mostly uses the tools already on the user's system. TypeScript plugins run on the user's Node, so the QuickJS-in-WASM runtime is gone, and Tenon doesn't download interpreters ([decision 5](../../../06-project/02-decisions.md)).
- **Distribution.** Plugins are published to their own language's package manager: crates.io, NuGet, npm. A website later gathers them with install instructions, and Tenon provides CI-side validation for authors to run when they publish. This replaces the Git-backed registry index ([decision 6](../../../06-project/02-decisions.md) and [discovery and trust](../../../04-extensions/01-discovery-and-trust.md)).
- **`exec`.** Commands run without a prompt, because running `tenon generate` is already the user's consent. They are still limited to the programs the manifest declares, and still shown in the output and in `--dry-run` ([decision 7](../../../06-project/02-decisions.md) and [generation](../../../03-engine/01-generation.md)).
- **Conditions.** Conditions are structured data written natively with each SDK's matchers, such as `when: { lang: { primary: "rust" }, x: not(y), d: notIn([]) }` in TypeScript, never a string grammar the engine parses ([decision 2](../../../06-project/02-decisions.md) and the [decision graph](../../../03-engine/00-decision-graph.md)).
- **Capabilities.** The permission model stays as an alpha design, to be reworked.
- **Merges.** Tenon aims to need as few merges as possible, and AI-powered generation may come in later versions.
- **Layout.** The [repository layout](../../../06-project/00-repository-layout.md) gains `libs/dev`, loses `xtask/`, and says every task runs through Nx.

The three stale **[open]** markers the BA assistant found are gone too: Protobuf against JSON Schema, the index format, and `js-embedded`.

## Why this way

One plain sentence per concept, with keep, change or cut, let the owner judge the design without reading the whole book first. Explaining before asking again mattered: the first explanations of the manifest and of plugin installation were too abstract. The owner chose to leave the [roadmap](../../../06-project/01-roadmap.md) for #2's plan to rewrite, since #2 is only done when the book matches the plan. So the roadmap page still says M0 starts with the process adapter and M5 brings QuickJS, and #2 replaces both.

## Checks

Every relative link and heading anchor under `docs/` and `.claude/` resolves, and every table is aligned. The only **[open]** marker left in the chapters is the one for further transports, which really is undecided.

## Where it stands

Done, on `docs/design-book/3-owner-review`, in a PR that closes #3. #2 stays parked until it merges.

## Next

After the merge, resume #2: send the owner's answers to the BA assistant, together with what this review changed, so it checks the definition of ready again against the updated book.
