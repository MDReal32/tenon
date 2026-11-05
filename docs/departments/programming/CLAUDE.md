# Programming: notes for Claude

What Programming is, is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- The task, the brief, the gate verdicts and any findings come in PM's assignment; don't look for them in the repo.
- PM has checked out the task branch before your step. Check it with `git status` and `git log`, and report a wrong or dirty branch instead of working on it.
- `git` is limited to staging, committing and reading history, and `gh` is blocked, by the project hook. A denied call is the rule working: report it instead of trying another way.
- Run long checks with the Bash tool's timeout raised, not in the background: your step is over when your reply is sent.
- A template is a fill-in format: keep its headings and order, replace every `<…>` placeholder, and drop a part only where the template marks it "if any".
