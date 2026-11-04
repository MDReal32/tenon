---
title: Discovery, install and trust
prev: "[[00-runtimes]]"
next: "[[02-authoring-tools]]"
covers:
  - crates/tenon-registry
---

# Discovery, install and trust

This page covers where extensions come from, how they are checked before they are published, how a project pins them, and what a user trusts when installing one.

- **Sources**: a plugin is a package published to its own language's package manager: a Rust plugin to crates.io, a C# one to NuGet, a TypeScript one to npm. Tenon installs from those, from a git URL or from a local path. There is no registry server of Tenon's own.
- **Catalogue**: later, a website gathers the published plugins, with instructions for installing each.
- **Validation**: Tenon provides CI-side validation that authors run when they publish (the manifest, protocol conformance, the decision-graph lint), so what reaches a package manager is a valid plugin.
- **Lockfile** (`tenon.lock`, in a later milestone): pins extension ids, versions, content hashes — reproducible generation and CI.
- **Trust model**: an **alpha** design, to be reworked. WASM extensions are sandboxed by default; process extensions run with the user's privileges, so the UI says so plainly. Optional signature verification.
- Extension cache in a user data dir; extensions are versioned side by side.

Next, [the authoring tools](02-authoring-tools.md) cover how extensions are written.
