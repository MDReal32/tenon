# Docs

The Docs department keeps Tenon's written design true to its code. After Programming builds a change, it updates the pages of [the design book](../../tenon.md) and the `README.md` files the change touches, the root one and each package's, in the same PR, before anyone reviews it. It writes no code and no tests.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                             | Model  | Owns                                                                         |
| -------------------------------- | ------ | ---------------------------------------------------------------------------- |
| [writer](roles/writer/README.md) | Sonnet | The design book under `docs/`, its six chapters, and every README outside it |

## What it gets and gives

- **In:** the task, the brief, both gate verdicts, the Programming reports with the pages they name, and the change on the task branch, from PM's assignment. On a later attempt, the findings to fix.
- **Out:** the updated pages, committed on the task branch, and a [Docs report](templates/docs-report.md): the commits, each page changed and why, the checks run, and anything the pages and the code disagree on.

## Files

- [`docs-knowledge.md`](docs-knowledge.md): facts about the book and lessons from earlier updates.
- [`templates/`](templates): the report.
- [`roles/`](roles): how the writer works.
