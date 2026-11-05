# Board Rules

These apply to every session, a direct session outside the departments included. The [Tenon project](https://github.com/users/MDReal32/projects/4) board is where the owner sees what is going on, so it always matches reality. What each status means is in the [departments overview](../../docs/departments/README.md#tasks).

## Everything is on the board

- Every piece of work is on the board before it starts. Work with an issue uses that issue. When the owner asks for work in a session and it has no issue, open one from the request, add it to the project and set its `Kind` and `Area`, before the first commit.
- A PR always says `Closes #<n>` for the issue it serves, so the board links them and the merge moves the issue to `Done`.
- Every PR goes on the board itself the moment it is opened, in `In Review`, with every field filled: `Kind` and `Area` as its issue has them, and `Size` from the size of its change.
- An issue goes on the board with `Status`, `Kind` and `Area` set, and `Size` once the Architect gate sizes it.

## Status moves with the work

- Change an item's `Status` the moment its state changes, in the same step as the change, never later:
  - `In Progress` when work on it starts or resumes.
  - `Waiting on owner` when a question waits on the owner.
  - `Blocked` when it waits on another task or on something outside the project.
  - `In Review` when its PR is opened.
  - `Done` comes from the merge; check it did.
- Only the owner moves an item out of `Backlog` or into `Canceled`.
- Set `Size` when the Architect gate sizes the task.

## Before ending a turn

- Check the board against what this turn changed: every issue and open PR it touched is on the board, with the status it really has. Fix what doesn't match before ending the turn.
- `gh project item-list 4 --owner MDReal32 --format json` shows the board, and `gh project field-list 4 --owner MDReal32 --format json` gives the field and option IDs that `gh project item-edit` needs. Check `--help` before using a flag.
