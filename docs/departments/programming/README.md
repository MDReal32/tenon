# Programming

The programming department writes Tenon's code and its tests. It works from the plan both halves of the gate approved, one role for each part of the repository, and hands the change on to Docs and the reviewers. On a task whose analysis needs the code's owner, the role that owns the code is also the specialist that analyzes it with the BA assistant before the gate.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                   | Model  | Owns                                                                                           |
| -------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| [engine](roles/engine/README.md)       | Sonnet | `protocol/` and the Rust crates under `crates/`: the protocol, core, host adapters and the CLI |
| [sdk](roles/sdk/README.md)             | Sonnet | The language SDKs under `sdks/`                                                                |
| [extension](roles/extension/README.md) | Sonnet | Base and the first-party extensions under `extensions/`                                        |
| [dev](roles/dev/README.md)             | Sonnet | `libs/dev` with its generators and executors, the workspace's root config and the CI workflows |

A task that touches more than one part runs one role per part, in the order the gate's route gives.

## What it gets and gives

- **As specialist, in:** the task and the BA assistant's brief, from PM's assignment.
- **As specialist, out:** a [Programming analysis](templates/programming-analysis.md): the files and packages the change touches, how it would be built and tested, and the questions for the BA assistant.
- **Build, in:** the task, the brief, the specialist analysis and both gate verdicts, and on a later attempt the findings to fix.
- **Build, out:** the change itself with its tests, committed on the task branch, and a [Programming report](templates/programming-report.md): the commits, the checks run and their results, and anything left for the owner.

## Files

- [`programming-knowledge.md`](programming-knowledge.md): facts about the repository's code and lessons from earlier builds.
- [`templates/`](templates): the analysis and the report.
- [`roles/`](roles): how each role works.
