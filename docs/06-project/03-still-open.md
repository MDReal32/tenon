---
title: Still open
prev: "[[02-decisions]]"
next:
covers:
  - docs
---

# Still open

The last page lists what the design has not settled yet. Nothing here is decided, and a task that depends on one of these needs the owner's decision first.

- Exact grammar spec and error messages for `when:`.
- Operation-handler ordering: deterministic execution order, how `merge-*` sees earlier ops on the same path, and attributed conflicts.
- Cost of lowering through process/WASM handlers (batching, caching) so std-ops don't make plans slow.
- Managed-interpreter design: download source, versioning, cache layout, offline behavior, licensing/redistribution.
- Registry namespace and naming governance; signing.
- Whether `exec` output can be made deterministic enough to replay faithfully.

This is the last page of the book. To go back to the beginning, open the [front page](../tenon.md).
