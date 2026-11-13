---
type: handoff
job: "[[design-book]]"
tasks: []
role: session
model: claude-opus-5-5
date: "2026-11-03"
status: done
branch: master
pr:
---

# Split the design document into a book

The owner asked for `docs/ARCHITECTURE.md`, Tenon's single design document, to be split into related docs. This starts the [design book job](design-book.md), and it builds on [the departments setup](../../departments/departments/2026-11-03--2026-11-06-compacted-departments-foundation.md), whose rules and roles pointed at the old file.

## What I did and how

I split the document's sixteen numbered sections into sixteen pages across six chapters, behind a new [front page](../../../tenon.md). [Foundations](../../../01-foundations/00-four-axes.md) holds the four axes and the layers. [The protocol](../../../02-protocol/00-protocol.md) holds the protocol and the extension manifest. [The engine](../../../03-engine/00-decision-graph.md) holds the decision graph, generation and the lifecycle hooks. [Extensions](../../../04-extensions/00-runtimes.md) holds the runtimes, discovery and trust, the authoring tools and Base. [Distribution](../../../05-distribution/00-distribution.md) stands alone. [The project](../../../06-project/00-repository-layout.md) holds the repository layout, the roadmap, the decisions and what is still open.

A script did the split, so each section's text moved over verbatim. Each page got frontmatter (`title`, `prev`, `next`, `covers`), an opening paragraph and a closing sentence that links the next page. Section numbers were dropped from the headings, and the four `§` references became relative links. The document's opening quote and status line moved to the front page. I then deleted `ARCHITECTURE.md` and repointed every link to it in the departments, the rules, the templates and the departments handoffs; in that earlier handoff I changed only the links. `.claude/rules/docs.md` now describes the book: its chapters, the page shape and how to renumber. `docs/.obsidian/` holds the vault settings, with a graph colour per chapter.

## Why this way

The chapters follow the design's own grouping: ideas first, then the contract, the engine, extensions, how people get Tenon, and the project. Readers then meet each concept before the pages that build on it, the same front-to-back order the sibling project's book uses. The manifest went with the protocol and Base with extensions, rather than staying where the old numbering put them, because each belongs with the pages it depends on. The design text stayed verbatim because it is the owner's draft; rewriting the bullet-heavy sections into prose is a separate change the owner can ask for.

## Checks

A script compared every non-heading line of the old document with the new pages and found all of them, apart from the four lines whose `§` references became links. A second script checked that every relative link and heading anchor under `docs/` and `.claude/` resolves, that every table is aligned, that every file name in the vault outside `docs/departments/` is unique, and that following `next` from the front page reaches all sixteen pages in order, with each page's `prev` pointing back.

## Where it stands

Done. Nothing is committed, since Tenon is not a git repository yet.

## Next

Commit this together with the departments work as Tenon's first change. Once `libs/dev` exists, run its docs check over the book instead of the ad-hoc scripts.
