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

This book is Tenon's design. It opens with what Tenon is as a product, then walks from the ideas everything is checked against down to how the project gets built. Every page ends by leading into the next one, so you can read it front to back or jump in anywhere.

## What Tenon is

Tenon is a next-generation, language-agnostic project generator. It builds a project piece by piece instead of copying one fixed template: you pick Rust, then X, then Y, and Tenon scaffolds a project out of exactly those pieces.

Its first user is its author, for his own projects. It is built as a generic tool from the start, so anyone else can use it the same way.

Starting a project today means cloning a template repository and deleting what you don't need. Tenon builds the project from a couple of questions instead, and clones nothing.

Answering plain questions one after another is boring and old school, so in later releases AI joins in, in two places. If the user wants it, the generated project gets AI support of its own: Markdown files that brief the AI tools working on that project. And Tenon's own AI, in the terminal, is there mostly to make the project specific to its user. A developer tells it what they are building ("my project is Tenon, it does this and this"), and Tenon's AI helps answer the questions and makes extra edits to those Markdown files while they are still in the plan, before anything is written.

The first version works when you run Tenon, answer a couple of questions, and see the project appear in front of you, scaffolded in its directory.

## How the book is laid out

The book has six chapters. The first, [foundations](01-foundations/00-four-axes.md), sets out the four axes that must never leak into each other and the layers the engine is built in. The second, [the protocol](02-protocol/00-protocol.md), is the contract every extension speaks and the manifest it declares itself with. The third, [the engine](03-engine/00-decision-graph.md), covers the decision graph, generation and the lifecycle hooks. The fourth, [extensions](04-extensions/00-runtimes.md), covers how they run, how they are found and trusted, the tools for writing them, and Base. The fifth, [distribution](05-distribution/00-distribution.md), is how people get Tenon. The sixth, [the project](06-project/00-repository-layout.md), covers the repository layout, the roadmap, and what is decided and still open.

Outside the numbered chapters sit the records the work leaves behind. The [departments](departments/README.md) folder holds the rules each AI agent role loads, `handoffs/` holds one folder per area with a folder for each job inside it, and `templates/` holds the templates those notes start from. The workspace rules live in [`.claude/rules/`](../.claude/rules), and this book links to them instead of repeating them.

## Reading it in Obsidian

The folder is an [Obsidian](https://obsidian.md) vault: open `docs/` itself with "Open folder as vault" to follow the links, backlinks and graph between the pages, jobs and handoffs. Every page's properties name the page before and after it, and the workspace paths it covers. Don't rename the vault inside Obsidian, since that renames the `docs/` folder on disk.

Start with [the four axes](01-foundations/00-four-axes.md), which every design decision is checked against.
