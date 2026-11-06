# Docs report

What a Docs role returns after updating the pages of a task. PM checks the commits, pushes the branch and pastes the report into the PR description's steps.

```md
🤖 Docs <role>: <Written | No change | Stopped> #<issue number> <task title>, attempt <n>

**Commits:** <each hash and subject, oldest first, or "none" when no page changed>

**Pages:**

- `<path>`: <what changed and which part of the change it describes>

**Checks:**

- `<command, or "read">`: <passed / failed, with the failing part>

**Findings fixed, if any:**

1. <the finding>: <how it was fixed>

**Stopped because, if stopped:** <where a page and the code disagree, and what would let the work go on>

**For other roles, if any:** <changes needed outside Docs' part>
```
