---
title: Generation
prev: "[[00-decision-graph]]"
next: "[[02-lifecycle-hooks]]"
covers:
  - crates/tenon-core
---

# Generation

Once the questions are answered, the engine turns the answers into files. This page covers how generation works: extensions emit operations into a plan, and only the engine applies it.

Extensions never perform side effects directly. They emit **operations** into a **virtual filesystem plan**.

```
answers ─► generators (parallel, pure) ─► operations ─► merge/conflict resolve ─► PLAN ─► diff preview ─► apply
```

**Primitive kernel (the only operations the engine itself understands):**
- `write`, `mkdir`, `delete` — VFS mutations
- `exec` — post-generation command (capability-gated, ordered, shown in plan, user-approved, recorded in `tenon.lock`)
- `message` — note to show the user

**Operation kinds (extension-provided, lower to primitives):**
- `render` (template + vars), `copy`
- `merge-json` / `merge-toml` / `merge-yaml` / `merge-lines` (`.gitignore`, env files) — so ten extensions can each add to `package.json` without clobbering
- `patch` — anchored text insertion
- any kind a third-party extension defines (e.g. `terraform-lock`)

A kind is declared in the manifest and implemented by a pure handler: `(operation, state, read-only VFS snapshot) → primitives`. The plan preview shows the lowered primitives. The standard kinds ship in `tenon.std-ops`, which is bundled but loaded through the normal extension path.

Benefits: `--dry-run` for free, diff preview, deterministic output, conflict detection between extensions with attribution (“`a.x` and `b.y` both write `Makefile`”), snapshot testing for extension authors.

Templates: engine ships **one** minimal, sandboxed templating engine (no code execution) so declarative extensions stay portable. Logic-heavy generators use code and emit `write` ops.

Next, [lifecycle hooks](02-lifecycle-hooks.md) cover the phases around the decision loop and generation.
