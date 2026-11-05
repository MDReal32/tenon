# Programming report

What a Programming role returns after building its part of a task. PM checks the commits, pushes the branch and pastes the report into the PR description's steps.

```md
🤖 Programming <role>: <Built | Stopped> #<issue number> <task title>, attempt <n>

**Commits:** <each hash and subject, oldest first>

**What changed:** <what was built, per acceptance criterion it serves>

**Checks:**

- `<command>`: <passed / failed, with the failing part>

**Findings fixed, if any:**

1. <the finding>: <how it was fixed>

**Stopped because, if stopped:** <what in the plan is wrong or open, and what would let the work go on>

**For other roles, if any:** <changes needed in another role's part, or pages Docs must update>
```
