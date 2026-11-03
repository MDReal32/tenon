---
type: job
area: docs
status: in progress
tasks: []
updated: "2026-11-03"
---

# Design book

The design book is Tenon's design, written as a book under `docs/` for the owner, every department role and anyone who wants to know how Tenon is meant to work. Until code exists it is the source of truth that the PO proxy and the Architect judge every task against.

## How it works

The [front page](../../../tenon.md) introduces Tenon and the layout, then six chapters walk from [the four axes](../../../01-foundations/00-four-axes.md) down to [what is still open](../../../06-project/03-still-open.md). Every page carries `title`, `prev`, `next` and `covers` in its frontmatter, opens with a paragraph on what it covers and ends by linking the next page. The rules for keeping it in shape are in `.claude/rules/docs.md`, and `docs/` opens as an Obsidian vault with a graph colour per chapter.

## How it got here

The book came from splitting the single design document into chapters, in [the session that split it](2026-11-03-session-split-architecture.md).

## Current state

The book holds the whole design as it stood in draft v0.1. Its wording is unchanged apart from the openings, the closings and the section references, which are now links. Nothing is committed, since Tenon is not a git repository yet. A docs check that walks the `prev`/`next` chain automatically will come with `libs/dev`.
