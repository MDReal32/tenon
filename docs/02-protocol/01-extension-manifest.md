---
title: Extension manifest
prev: "[[00-protocol]]"
next: "[[00-decision-graph]]"
covers:
  - protocol/schema
---

# Extension manifest

Every extension describes itself in a manifest. This page shows its shape: identity, runtime, requirements, capabilities and what it contributes.

```toml
[extension]
id = "acme.zig"
version = "0.3.0"
protocol = "tep/1"
description = "Zig support"

[runtime]                       # omit entirely for declarative-only extensions
kind = "process"                # "process" | "wasm" | future kinds
command = ["python", "-m", "acme_zig"]   # or  module = "zig.wasm"

[requires]                      # other extensions, semver ranges
"tenon.base" = "^1"

[capabilities]
fs = ["write:project"]
exec = ["zig", "git"]           # allow-listed binaries
net = false

[contributes]
decisions  = ["decisions/*.toml"]
templates  = ["templates/"]
presets    = ["presets/*.toml"]
```

Key properties: capabilities are enforced by the **host** (sandboxing for WASM; mediated operations for process extensions — an extension doesn't write files itself, it *emits operations* and the engine writes them). Users see and approve capability requests on install.

The next chapter turns to the engine, starting with [the decision graph](../03-engine/00-decision-graph.md).
