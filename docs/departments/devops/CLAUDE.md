# DevOps: notes for Claude

What DevOps is, is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- The task, the brief, the gate verdicts and any findings or secret requests come in PM's assignment; don't look for them in the repo.
- PM has checked out the task branch before a build step. Check it with `git status` and `git log`, and report a wrong or dirty branch instead of working on it.
- The project hook lets `devops-engineer` read and change `.env`, and no one else, the main session included. Every other limit still holds: `git` is limited to staging, committing and reading history, and `gh` is blocked.
- Tool output reaches PM's transcript. Check a secret with a command that prints only whether it is set or valid, never one that prints the value.
- A template is a fill-in format: keep its headings and order, replace every `<…>` placeholder, and drop a part only where the template marks it "if any".
