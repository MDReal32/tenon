# PR description

The run record. PM opens the draft PR with it after the gate and updates it after every step, so the description always says how far the run got and where it resumes.

```md
## Task

<task link or short name>: <task title>

## What changed

<filled at the end: what the PR does and why, for the reviewer>

## Route

<the steps this task goes through, in order, and why any were skipped>

## Brief

<the BA assistant's brief, as returned>

## Gate

- **PO proxy:** <verdict, with its reasons>
- **Architect gate:** <verdict, with its reasons>

## Steps

- **<step>** (`<dept>-<role>`, attempt <n>): <result in one line>. Commit <hash>, if any.

## Checks

<the commands each step ran and their results>

## Unrelated findings, if any

- <finding>: reported to the owner as a new task

## Resume point

<the next step to run, what it waits on if parked, or "Done: ready for review">
```
