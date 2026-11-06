# QA report

What a QA role returns after checking a task. PM checks the step's handoff commit, pastes the report into the PR description's steps and, when it fails, sends each finding to the role that owns it.

```md
🤖 QA <role>: <Passed | Failed> #<issue number> <task title>, attempt <n>

**Checked:** <the commits, from the first hash to the last, and the platforms it ran on>

**Acceptance criteria:**

- <the criterion, quoted>: <passed / failed>, by `<the test or command that checks it>`

**Checks:**

- `<command>`: <passed / failed, with the failing part>

**Findings, if any:**

1. <the criterion or plan step it breaks>: <steps or test that show it>. Expected <this>, got <that>. Owner: <the role that owns what it names>

**Not run, if any:** <a platform or check that couldn't run here, and why>
```
