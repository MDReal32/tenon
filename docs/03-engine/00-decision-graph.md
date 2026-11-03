---
title: Decision graph
prev: "[[01-extension-manifest]]"
next: "[[01-generation]]"
covers:
  - crates/tenon-core
---

# Decision graph

The third chapter is the engine. It starts with how Tenon asks its questions: not a tree, but a graph of facts, decisions and constraints that extensions can add to without editing each other.

## Why a tree fails
A tree makes “who owns the child?” a single-parent question. Extensions need to add options to someone else’s question, add questions that apply across many branches (e.g. “CI provider?”), and slot in between.

## Model: facts + decisions + constraints
- State is a set of **facts**.
- A decision **`requires`** facts / predicates to be *eligible*, and **`produces`** facts when answered.
- Flow order is **derived**, not stored: the solver picks the next eligible, unanswered decision (ordered by explicit `after`/`before` hints, then priority, then stable id order). No parent pointer exists anywhere.
- Everything is an addressable id: `base.language`, `acme.deploy-target`.

```jsonc
// base: owns the decision
{ "decision": "base.language", "kind": "single", "prompt": "Language?", "produces": ["lang.primary"] }

// extension A: adds an option to someone else's decision (no edit to base)
{ "option": { "decision": "base.language", "id": "zig", "label": "Zig",
              "sets": { "lang.primary": "zig" } } }

// extension B: brand new decision, only appears when relevant
{ "decision": "zig.allocator", "requires": "lang.primary == 'zig'",
  "kind": "single", "produces": ["zig.allocator"] }

// extension C: inserts between — via fact dependency, not by rewiring
{ "decision": "sec.supply-chain", "requires": ["lang.primary", "pm.selected"],
  "after": ["base.package-manager"], "kind": "confirm" }
```

## Extension points on existing decisions
Cross-extension edits are **additive operations on a decision**, resolved by the engine:

| Operation              | Effect                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| `add_option`           | Append option to a decision                                               |
| `filter_options`       | Hide/disable options by rule (with reason shown to user)                  |
| `set_default`          | Propose a default (priority-ranked; conflicts surfaced, not silently won) |
| `wrap`                 | Pre/post-process an answer (e.g. normalize name)                          |
| `require` / `conflict` | Constraint between options across extensions                              |
| `reorder`              | Soft `before`/`after` hints                                               |

## Solver guarantees
- **Deterministic**: same extension set + same answers → same flow. (Needed for `--yes`, replay, and tests.)
- **Cycle detection** at load time with the offending extension ids named.
- **Back-navigation**: answers are an event log; changing an earlier answer invalidates dependent decisions only.
- **Headless**: every decision answerable via flags / file / preset (`tenon new --set lang.primary=rust`). TUI is just one frontend over the solver.
- **Explainable**: `tenon explain <decision>` shows which extensions contributed what.

Next, [generation](01-generation.md) shows what happens to the answers.
