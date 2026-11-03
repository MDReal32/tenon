---
title: Discovery, install and trust
prev: "[[00-runtimes]]"
next: "[[02-authoring-tools]]"
covers:
  - crates/tenon-registry
---

# Discovery, install and trust

This page covers where extensions come from, how a project pins them, and what a user is asked to trust when installing one.

- **Sources**: registry (**[open]** index format; start with a static Git-backed index), git URL, local path, tarball/OCI artifact.
- **Lockfile** (`tenon.lock`): pins extension ids, versions, content hashes — reproducible generation and CI.
- **Trust model**: manifest capabilities shown at install; process extensions run with user's privileges so the UI says so plainly; WASM extensions are sandboxed by default. Optional signature verification.
- Extension cache in a user data dir; extensions are versioned side by side.

Next, [the authoring tools](02-authoring-tools.md) cover how extensions are written.
