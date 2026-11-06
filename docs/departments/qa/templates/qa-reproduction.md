# QA reproduction

What a QA role returns after reproducing a bug. PM pastes it into the PR description and hands it to the owning Programming role, whose fix must make the test pass without weakening it.

```md
🤖 QA <role>: <Reproduced | Not reproduced> #<issue number> <bug title>

**Commit:** <the hash and subject of the failing test>

**Steps:** <the exact steps, from a clean checkout of the commit>

**Expected:** <what should happen, from the issue or the design>

**Actual:** <what happens>

**Test:** `<the test>`, which fails with `<the failure it gives>`

**Owner:** <the Programming role that owns the code at fault>

**Not reproduced because, if not reproduced:** <what was tried, and what the owner would need to add>
```
