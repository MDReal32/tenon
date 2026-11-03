# Docs Rules

## The book

- Tenon's design lives under `docs/`, written as a book read from start to end. [`docs/tenon.md`](../../docs/tenon.md) is the front page, then six numbered chapters:
  - `01-foundations/`: the four axes and the layers.
  - `02-protocol/`: the Tenon Extension Protocol and the extension manifest.
  - `03-engine/`: the decision graph, generation and the lifecycle hooks.
  - `04-extensions/`: the runtimes, discovery and trust, the authoring tools, and Base.
  - `05-distribution/`: the engine binary and its launchers.
  - `06-project/`: the repository layout, the roadmap, the decisions and what is still open.
- The book is the source of truth for how Tenon is meant to work. A change that alters the design updates the pages it touches in the same PR, and a decision the owner makes moves from [still open](../../docs/06-project/03-still-open.md) to [decisions](../../docs/06-project/02-decisions.md).
- Order is in the names: chapters are `NN-<name>/`, pages are `NN-<name>.md`, and `00-` opens its chapter. Names are lowercase kebab-case with no spaces.
- Read `docs/` before explaining a part of Tenon to the user, or before writing a page yourself. Don't re-derive the explanation from source when a page already covers it.

## A page

- Frontmatter holds `title`, `prev` and `next` (quoted wikilinks to the neighbouring pages, such as `"[[01-layers]]"`, empty at either end of the book) and `covers`, a list of the workspace paths the page describes (`crates/tenon-core`), so a path can be grepped to find its page.
- The body opens with a paragraph that says what the page covers and why it comes here, and ends with a paragraph that leads into the next page with a link to it. A `00-` page's opening also introduces its chapter.
- Prefer prose to bullet lists, and never write a bare list of links: links sit inside sentences. Tables are for reference (messages, options, fields), code blocks for commands, schemas and snippets, and numbered steps only for a procedure.
- Body links are relative markdown links. Keep pages plain-English and complete, and link to an exact contract (a schema, a rule under `.claude/rules/`) instead of repeating it.
- Do not duplicate a package's own `README.md` into `docs/`; link to it when it already documents the same thing well.

## Keeping it in shape

- A new crate, SDK, extension, adapter or protocol message gets its place in the book in the same PR that adds it, on the page of the chapter that owns it, or as a new page there.
- Inserting or removing a page or a folder renumbers the ones after it at that level. Then update every neighbour's `prev`/`next`, grep the repository for links to the renamed files (rules, departments, handoffs, package READMEs, other pages), and fix them in the same change.
- Every file name in the vault is unique, since Obsidian finds notes by name. The one exception is `docs/departments/`, whose agent files point at its `README.md`/`RULES.md`/`CLAUDE.md` triplets.
- Every folder under `docs/departments/` (the root, each department, each role) splits its content across three files, each holding only what the others don't:
  - `README.md`: the folder's description: what the department or role is, does and how it works. As long as it needs to be.
  - `RULES.md`: only the rules that apply there. They bind only the agent whose `.claude/agents/` file points at them.
  - `CLAUDE.md`: Claude-specific notes: how to load and treat the folder's files, tool, model and permission mechanics. Claude Code auto-loads it into any session that reads or edits a file in that folder, so it never holds rules that bind only one role.
- `docs/` is also an Obsidian vault, with its shared settings in `docs/.obsidian/`. The work record lives outside the numbered chapters: per job a folder under `docs/handoffs/<area>/` with the job note and its handoffs, all started from `docs/templates/`. Those follow [handoffs.md](handoffs.md), not the page shape above.
