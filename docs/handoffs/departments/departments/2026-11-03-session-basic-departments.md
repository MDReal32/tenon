---
type: handoff
job: "[[departments]]"
tasks: []
role: session
model: claude-opus-5-5
date: "2026-11-03"
status: done
branch: master
pr:
---

# Basic departments for Tenon

The owner asked for Tenon to get the department system a sibling project uses, copied in and adapted rather than shared: Tenon must depend on nothing outside itself and name no other project. Only the departments Tenon needs now were to be written, and the system had to make adding more later straightforward. The owner also asked for the project's `.claude` setup to come across the same way. This continues nothing; it starts the [departments job](departments.md).

## What I did and how

I wrote four departments under `docs/departments/`: the [handbook and overview](../../../departments/README.md), then PM with its coordinator, BA with its assistant, PO with its proxy, and Architect with its gate and reviewer. Every folder keeps the `README.md`, `RULES.md` and `CLAUDE.md` split, and each department has a knowledge file and a `templates/` folder with the exact formats it returns. The four read-only roles got agent files under `.claude/agents/`, all on Opus with only `Read`, `Grep` and `Glob`.

The content is Tenon's own. There is one owner, who answers every question, instead of two founders. There is no task tracker yet, so a task is the owner's request in the session, and the tracker comment template became an owner message. The BA's definition of ready asks about a developer tool's concerns: the surface a user or extension author sees, the contract (protocol, manifest, lockfile) and the platforms and runtimes. The PO proxy and the Architect both judge against [the design book](../../../tenon.md), and the Architect's checks are built around the design's four axes and its rule that Base gets nothing a community extension can't.

Under `.claude/` I added the generic workspace rules (git, commit, markdown, handoffs, delegation, language, docs, and the general, TypeScript and Nx code-style rules) and the `department-access` hook with its tests, wired up in `.claude/settings.json`. The git rule gained a section on falling back from SSH to HTTPS through `gh` without changing `origin`. The handoff templates under `docs/templates/` and the handoff rule now speak of tracker URLs and Tenon's areas.

## Why this way

PM, BA, PO and Architect are the departments a project at the design stage can use: they take a task in, check it is ready, and judge it against the design. Cyber security, DevOps, Programming, QA, Docs and HR have nothing to work on before code exists, so they stay on the roster as not written, and every rule that names them says what happens until they are. The overview gained an "Adding a department" section listing the six steps, so a later department is added the same way every time.

I kept the Nx and TypeScript rules and the yarn-based hook test fixtures because the owner plans to add `libs/dev` with the same shape as the sibling project's. The stack-specific rules for NestJS, Drizzle, React Native, Docker, Zod, Vite and the generators were left out, since Tenon has none of those yet; the generator rule belongs with `libs/dev` when it exists.

## Checks

The hook's 155 tests pass under `node --test`. I checked every file under `.claude/` and `docs/` for the sibling project's name, its people, its tracker and its products, and found none. Every table was re-aligned with a script, and every relative link and heading anchor was checked to resolve. The script also re-aligned the tables in `ARCHITECTURE.md`, since split into [the design book](../../../tenon.md), changing only whitespace and delimiter rows. On its first pass it cut the distribution table's last row at the unescaped pipe in `` `curl | sh` ``; I restored the row and escaped that pipe as `\|`, which GFM needs inside a table and without which the row had rendered with a broken cell.

## Where it stands

Done. Tenon is not a git repository, so nothing is committed or pushed, and `branch` and `pr` are empty.

## Next

Make Tenon a git repository with `develop` as its integration branch, and commit this work as the first change. Then add `libs/dev`, and the Programming and QA departments the first code will need, each as its own change.
