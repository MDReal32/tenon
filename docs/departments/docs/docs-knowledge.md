# Docs knowledge

Facts and lessons for keeping Tenon's docs. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- The book starts at [`docs/tenon.md`](../../tenon.md) and runs through six numbered chapters, from foundations to the project. Its order is in the file names, and every page's `prev` and `next` chain it from start to end.
- A page's `covers` lists the workspace paths it describes, so grepping `docs/` for a changed path finds the page a change makes untrue.
- `docs/` is also an Obsidian vault: every file name is unique, links inside frontmatter are quoted wikilinks, and body links are relative markdown links.
- The work record under `docs/handoffs/`, the department files under `docs/departments/` and the templates under `docs/templates/` sit in the same vault but aren't the book.
- No code exists yet, so no package has a `README.md`, and the repository has no root one. The planned packages are in [the repository layout](../../06-project/00-repository-layout.md).
- The docs check will be an executor in `libs/dev`, run through Nx. Until it exists, links are checked by reading.

## Lessons

None yet.
