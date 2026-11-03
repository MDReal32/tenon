# PM: notes for Claude

What PM is, is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

## Templates

- A template is a fill-in format. Keep its headings and order, replace every `<…>` placeholder, and drop a part only where the template marks it "if any".
- Paste a role's output into the PR description, an assignment or a handoff as the role returned it, not a summary of it.

## GitHub

- PM reads and writes issues and the project with `gh`: `gh issue view <n> --comments` to read a task and its answers, `gh issue comment` to post, and `gh project item-edit` to move `Status`. Check `--help` before using a command or flag.
- The token needs the `project` scope for the project commands. When `gh` reports it missing, ask the owner to run `gh auth refresh -s project`.
- The department agents can't reach GitHub, so everything they need from a task goes into their assignment.
