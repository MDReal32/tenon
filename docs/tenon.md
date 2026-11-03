---
title: Tenon
prev:
next: "[[00-four-axes]]"
covers:
  - docs
---

# Tenon

> TENON is a generic, extension-driven project generation engine.
> The engine knows nothing about languages, frameworks, or package managers. Everything the user sees — including the default experience — is an extension built on the same public API.

Status: design draft v0.1. Items marked **[open]** are intentionally not locked down.

This book is Tenon's design. It walks from the ideas everything is checked against down to how the project gets built, and every page ends by leading into the next one, so you can read it front to back or jump in anywhere.

## How the book is laid out

The book has six chapters. The first, [foundations](01-foundations/00-four-axes.md), sets out the four axes that must never leak into each other and the layers the engine is built in. The second, [the protocol](02-protocol/00-protocol.md), is the contract every extension speaks and the manifest it declares itself with. The third, [the engine](03-engine/00-decision-graph.md), covers the decision graph, generation and the lifecycle hooks. The fourth, [extensions](04-extensions/00-runtimes.md), covers how they run, how they are found and trusted, the tools for writing them, and Base. The fifth, [distribution](05-distribution/00-distribution.md), is how people get Tenon. The sixth, [the project](06-project/00-repository-layout.md), covers the repository layout, the roadmap, and what is decided and still open.

Outside the numbered chapters sit the records the work leaves behind. The [departments](departments/README.md) folder holds the rules each AI agent role loads, `handoffs/` holds one folder per area with a folder for each job inside it, and `templates/` holds the templates those notes start from. The workspace rules live in [`.claude/rules/`](../.claude/rules), and this book links to them instead of repeating them.

## Reading it in Obsidian

The folder is an [Obsidian](https://obsidian.md) vault: open `docs/` itself with "Open folder as vault" to follow the links, backlinks and graph between the pages, jobs and handoffs. Every page's properties name the page before and after it, and the workspace paths it covers. Don't rename the vault inside Obsidian, since that renames the `docs/` folder on disk.

Start with [the four axes](01-foundations/00-four-axes.md), which every design decision is checked against.
