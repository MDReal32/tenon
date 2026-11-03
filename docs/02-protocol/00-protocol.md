---
title: The Tenon Extension Protocol
prev: "[[01-layers]]"
next: "[[01-extension-manifest]]"
covers:
  - protocol
  - crates/tenon-protocol
---

# The Tenon Extension Protocol

The second chapter is the contract: the one thing every language shares. This page covers how the protocol is defined and carried, the two kinds of content an extension can contribute, and the vocabulary every SDK exposes.

The contract is a **schema, not a library**. It is the only thing all languages share.

## Definition
- Canonical source: versioned schema files in `protocol/` (JSON Schema for messages; a WIT world for the WASM binding). **[open]** Protobuf vs. JSON Schema as canonical — JSON Schema favored for authoring DX and debuggability; SDKs are code-generated from it.
- Semantic versioning on the protocol (`tep/1`). Extensions declare supported range in the manifest; the engine negotiates at handshake.
- Two transports carry identical messages:
  - **stdio**: newline-delimited JSON-RPC 2.0 (any language can do this in an afternoon).
  - **WASM**: Component Model, same operations as WIT functions.
  - **[open]** Others later (unix socket, gRPC) = new adapter, no core change.

## Two kinds of extension content

1. **Declarative contributions** (manifest/data, no code needed): technologies, presets, static decisions/options, template directories, dependency declarations. An extension can be *entirely declarative* — no runtime at all.
2. **Behavioral contributions** (code): computed options, validation, generators that need logic, hooks.

Design bias: *prefer declarative*, because it can be statically analyzed, merged, cached, previewed, and doesn't require spawning anything. Code is the escape hatch.

## Core concepts (the language-neutral vocabulary)

| Concept        | Meaning                                                                                |
| -------------- | -------------------------------------------------------------------------------------- |
| `Extension`    | Unit of distribution: manifest + optional runtime                                      |
| `Capability`   | Declared permission/feature (fs.write, process.exec, net, env.read, …)                 |
| `Fact`         | Typed key/value in generation state (`project.name`, `lang.primary`, `pm.selected`)    |
| `Decision`     | A question-shaped node: id, prompt, kind (single/multi/text/confirm/…), produces facts |
| `Option`       | A candidate answer for a decision; carries `sets` (fact assignments) and metadata      |
| `Contribution` | Anything an extension adds (option, decision, rule, generator, …)                      |
| `Rule`         | Predicate over facts (`when`), used for visibility, requirement, conflict, defaulting  |
| `Generator`    | Maps facts → `Operation`s                                                              |
| `Operation`    | Declarative filesystem/project edit (see [generation](../03-engine/01-generation.md))  |
| `Hook`         | Lifecycle callback (see [lifecycle hooks](../03-engine/02-lifecycle-hooks.md))         |
| `Preset`       | Named bundle of fact assignments / pre-answered decisions                              |

SDKs in every language expose exactly these. Syntax differs; the model doesn't.

Next, [the extension manifest](01-extension-manifest.md) shows how an extension declares itself.
