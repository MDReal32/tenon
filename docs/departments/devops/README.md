# DevOps

The DevOps department ships Tenon and guards its secrets. It builds the release pipeline and the launchers that start the engine binary, reviews every change to CI, Nx, build config or environment variables, and is the only department that reads or changes `.env`.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                 | Model | Owns                                                                                                      |
| ------------------------------------ | ----- | --------------------------------------------------------------------------------------------------------- |
| [engineer](roles/engineer/README.md) | Opus  | The launchers under `dist/`, the release workflow, the root git files, and `.env` with its `.env.example` |

## What it gets and gives

- **As specialist, in:** the task and the BA assistant's brief, from PM's assignment, when the task's work is in DevOps' part.
- **As specialist, out:** a [DevOps analysis](templates/devops-analysis.md): what the change touches, how it would be built and tested, and the questions for the BA assistant.
- **Build, in:** the task, the brief, the specialist analysis, both gate verdicts, and on a later attempt the findings to fix, from PM's assignment, with the task branch checked out.
- **Build, out:** the change with its tests, committed on the task branch, and a [DevOps report](templates/devops-report.md).
- **Review, in:** a change the Architect gate named DevOps for, at the owner review: the task, the gate verdicts and the commits.
- **Review, out:** a [DevOps review](templates/devops-review.md), approved or with findings, each sent by PM to the role that owns it.
- **Secrets, in:** a request from PM to check or change a value in `.env`, naming the variable and why.
- **Secrets, out:** whether the variable is set and valid, or that it was changed, never the value.

## Files

- [`devops-knowledge.md`](devops-knowledge.md): facts about the release, the launchers and the secrets, and lessons from earlier work.
- [`templates/`](templates): the analysis, the report and the review.
- [`roles/`](roles): how the engineer works.
