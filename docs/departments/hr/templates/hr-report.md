# HR report

What an HR role returns after writing a rule change or fixing findings on one. PM checks the commits, pushes the branch and pastes the report into the PR description's steps.

```md
🤖 HR <role>: <Written | Stopped> #<issue number> <task title>, attempt <n>

**Carries out:** <the owner's note, the retro's proposal or the role gap, with where it was made>

**Commits:** <each hash and subject, oldest first>

**Files:**

- `<path>`: <what changed and which part of the note it carries out>

**Checks:**

- `<command, or "read">`: <passed / failed, with the failing part>

**Findings fixed, if any:**

1. <the finding>: <how it was fixed>

**Stopped because, if stopped:** <the clash or the open question, and what would let the work go on>

**For other reviewers, if any:** <Cyber security when the hook changed, and why>
```
