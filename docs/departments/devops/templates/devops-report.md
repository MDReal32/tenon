# DevOps report

What a DevOps role returns after a build step or a secret request. PM checks the commits, pushes the branch and pastes the report into the PR description's steps. A report never holds a secret value.

```md
🤖 DevOps <role>: <Built | Done | Stopped> #<issue number> <task title>, attempt <n>

**Commits:** <each hash and subject, oldest first, or "none">

**What changed:** <what was built, per acceptance criterion it serves, or the variables checked or changed and their state: set, valid, changed>

**Checks:**

- `<command>`: <passed / failed, with the failing part>

**Findings fixed, if any:**

1. <the finding>: <how it was fixed>

**Stopped because, if stopped:** <what in the plan is wrong or open, and what would let the work go on>

**For other roles, if any:** <changes needed in another role's part, or pages Docs must update>
```
