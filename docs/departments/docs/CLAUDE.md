# Docs: notes for Claude

What Docs is, is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- The task, the brief, the gate verdicts, the Programming reports and any findings come in PM's assignment; don't look for them in the repo.
- PM has checked out the task branch before your step. Check it with `git status` and `git log`, and read the change against the base PM names in the assignment before writing.
- `git` is limited to staging, committing and reading history, and `gh` is blocked, by the project hook. A denied call is the rule working: report it instead of trying another way.
- A template is a fill-in format: keep its headings and order, replace every `<…>` placeholder, and drop a part only where the template marks it "if any".
