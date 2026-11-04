---
type: handoff
job: "[[design-book]]"
tasks: []
role: session
model: claude-opus-5-5
date: "2026-11-04"
status: done
branch: docs/design-book/product-definition
pr: 6
---

# The product definition on the front page

The owner pointed out that the docs were almost ready, but the product itself wasn't: the design book said how Tenon is built and never what it is for. That gap is also why the BA assistant and the book's first draft filled in concepts of their own. This adds the owner's product definition to the book's [front page](../../../tenon.md), continuing the [design-book job](design-book.md).

## What I did and how

I asked the owner four questions in the session: what Tenon is in their words, who it is for first, what pain it fixes, and when the first version works. I wrote their answers up as a draft with two unclear spots marked, and the owner settled both. One was what "simple questions are boring and old school" meant: AI joins in later releases. The other was the two kinds of AI support: Tenon's own, in the terminal, helping to answer its questions, and the generated project's, as Markdown files that brief the AI tools working on it. After the PR opened, the owner sharpened both: the project's AI support is only there if the user wants it, and Tenon's own AI is mostly there to make the project specific to its user. The user describes what they are building, and Tenon's AI makes extra edits to the Markdown files while they are still in the plan, before anything is written. The final text is a "What Tenon is" section on the front page, ahead of the book's layout. The opening paragraph now says the book starts with the product.

## Why this way

The definition is in the owner's words, with nothing added, because the earlier friction came from the book holding ideas the owner never chose. It sits on the front page rather than in a chapter of its own, so the architecture chapters read as how to build this product, and nothing has to be renumbered.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed.

## Where it stands

Done, on `docs/design-book/product-definition`, in a PR against `develop`.

## Next

The product definition is what [#2](https://github.com/MDReal32/tenon/issues/2)'s plan and the PO proxy judge fit against, so the BA assistant gets it with the owner's answers when #2 resumes.
