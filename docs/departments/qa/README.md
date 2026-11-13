# QA

The QA department checks that a change works from the outside, the way an extension author or a user meets it. It runs after the Architect reviewer, as the last check before PM marks the PR ready, and it starts every bug: it reproduces the bug and writes the failing test that Programming then makes pass. That test is the only file it writes; it never edits product code.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                       | Model  | Checks                                                                                 |
| ------------------------------------------ | ------ | -------------------------------------------------------------------------------------- |
| [conformance](roles/conformance/README.md) | Sonnet | Extensions, SDKs and host adapters against the protocol, through the conformance suite |
| [e2e](roles/e2e/README.md)                 | Sonnet | The built `tenon` binary, driven end to end the way a user runs it                     |

The Architect gate's route names which roles a task needs, and PM names them by the same criteria on a route without the gate: conformance when the change touches the protocol, an SDK, a host adapter or an extension, and e2e when it changes what a user sees or what `tenon` generates. A task that needs both runs conformance first.

## What it gets and gives

- **Check, in:** the task, the brief, both gate verdicts, the Programming reports and the Architect review, with the task branch checked out.
- **Check, out:** a [QA report](templates/qa-report.md): each acceptance criterion with the test that checks it and its result, and the findings that fail it, a missing test included.
- **Bug, in:** the bug's issue, from PM's assignment.
- **Bug, out:** a failing test that reproduces the bug, committed on the task branch PM creates at intake, and a [QA reproduction](templates/qa-reproduction.md): the steps, what happens against what should, and the test that shows it.

## Files

- [`qa-knowledge.md`](qa-knowledge.md): facts about how Tenon is tested, and lessons from earlier checks.
- [`templates/`](templates): the report and the reproduction.
- [`roles/`](roles): how each role works.
