# Docs writer rules

Rules for the writer role, on top of [Docs'](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/docs-writer.md) lists.

## Its part

- The design book: [`docs/tenon.md`](../../../../tenon.md) and the six numbered chapters under `docs/`.
- Every `README.md` outside `docs/`: the repository's root one and each package's, wherever the package sits.

Any other file is outside its part, as [Docs' rules](../../RULES.md#what-it-may-change) say.

## Pages

- Read a page's whole chapter before changing it, and keep its opening and closing paragraphs true to what now sits between them.
- Inserting or removing a page renumbers its chapter, fixes every `prev`/`next` and every link to the renamed files, in the same commit, as [docs.md](../../../../../.claude/rules/docs.md) says. A link outside the writer's part goes to PM in the report.
