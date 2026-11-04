---
title: Still open
prev: "[[02-decisions]]"
next:
covers:
  - docs
---

# Still open

The last page lists what the design has not settled yet. Nothing here is decided, and a task that depends on one of these needs the owner's decision first.

- The matchers each SDK offers for `when` conditions (`not`, `notIn`, …), their structured form on the wire, and the error messages.
- Operation-handler ordering: deterministic execution order, how `merge-*` sees earlier ops on the same path, and attributed conflicts.
- Cost of lowering through process/WASM handlers (batching, caching) so std-ops don't make plans slow.
- Naming plugin packages consistently across package managers, the catalogue website, and signing.
- The capability model, an alpha design to be reworked.
- AI-powered generation in later versions.
- Whether `exec` output can be made deterministic enough to replay faithfully.

This is the last page of the book. To go back to the beginning, open the [front page](../tenon.md).
