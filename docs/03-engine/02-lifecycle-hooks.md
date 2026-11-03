---
title: Lifecycle hooks
prev: "[[01-generation]]"
next: "[[00-runtimes]]"
covers:
  - crates/tenon-core
---

# Lifecycle hooks

Around the decision loop and generation sit ordered phases that extensions can hook into. This page lists them and what a hook may do.

Ordered phases, each addressable by extensions:

`discover → resolve-extensions → pre-questions → (decision loop) → validate → plan → pre-apply → apply → post-apply → report`

Hooks receive a read-only state snapshot + may return contributions valid for that phase (e.g. `validate` returns diagnostics; `post-apply` returns follow-up ops). A hook can’t mutate other extensions’ data except via the public operations in [extension points](00-decision-graph.md#extension-points-on-existing-decisions).

The next chapter is about extensions themselves, starting with [the runtimes they run in](../04-extensions/00-runtimes.md).
