# Departments

How Tenon work moves from a task to a merged pull request, done by AI agents organized like a company's departments.

**Status:** the PM, BA, PO and Architect departments are written: the ones that take a task in, check it is ready, and approve and review it against Tenon's design. Cyber security, DevOps, Programming, QA, Docs and HR are not written yet, and join as Tenon grows, as [adding a department](#adding-a-department) says. Nothing on this page runs yet. The rules every agent follows are in the handbook, [`RULES.md`](RULES.md).

## The idea

- A **department** is a high-level area of work, like a company's: Business Analysis, Architecture, Programming, QA, and so on.
- Each department has one or more **roles**. A role is one AI agent, named `<department>-<role>` (e.g. `architect-gate`).
- Every department and role has a written ruleset. The ruleset is the agent's hard boundary: it refuses work outside it. The same file is a plain guide for developers who want to know what that role does.
- A task goes through the departments in order, each one checking the work before the next. The owner steps in only when something is blocked, and the pull request is where the owner reviews.

## People

- Tenon has one owner, [@MDReal32](https://github.com/MDReal32), who is its product owner, business analyst and architect at once. The owner writes the tasks as GitHub issues, decides the product's direction and the architecture, reviews and merges every pull request, and accepts finished work.
- Every question a department can't settle, business or technical, goes to the owner.

## Tasks

- A task is a GitHub issue in [`MDReal32/tenon`](https://github.com/MDReal32/tenon/issues), written by the owner and added to the [Tenon project](https://github.com/users/MDReal32/projects/4). The issue is the source of truth for what to build: the repository keeps no copy of it, and notes link it by its URL.
- The project's `Status` field says where a task stands: `Todo` until a run picks it up, `In Progress` while a run works on it or waits on the owner, and `Done` once its issue closes. A parked task stays `In Progress`, and its latest issue comment says what it waits on.
- The issue's comments are where PM and the owner talk about the task: verdicts, questions, answers and the PR. The owner answers a question by replying there.
- What Tenon is meant to be is [the design book](../tenon.md). It is the product vision and the design at once, so the PO proxy and the Architect both judge against it.

## Roster

| Department     | Roles                       | Model  | Status      | Does                                                                                                                                                                   |
| -------------- | --------------------------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PM             | coordinator                 | Opus   | written     | The orchestrator: takes the task in, picks the route, hands work between departments, parks and resumes tasks, runs git and opens the PR. Runs as the main session     |
| BA             | assistant                   | Opus   | written     | Reads the owner's task, finds gaps, asks the owner, writes the brief. Never invents requirements                                                                       |
| PO             | proxy                       | Opus   | written     | Stands in for the owner at the gate: does this task fit Tenon's design and roadmap? Questions the task and the design don't answer go to the owner, and the task waits |
| Architect      | gate, reviewer              | Opus   | written     | gate: the technical half of the gate (the four axes, boundaries, protocol impact, PR-sized scope, task size). reviewer: reviews every change; never its own plan       |
| Cyber security | reviewer                    | Opus   | not written | Reviews changes touching extension capabilities, sandboxing, `exec`, signing and trust                                                                                 |
| DevOps         | engineer                    | Opus   | not written | Release pipeline, launchers, CI, `libs/dev` tooling and build config. The only role that may read or change `.env`                                                     |
| Programming    | engine, sdk, extension, dev | Sonnet | not written | Implement with tests. engine: the Rust crates. sdk: the language SDKs. extension: Base and first-party extensions. dev: `libs/dev` generators and executors            |
| QA             | conformance, e2e            | Sonnet | not written | conformance: runs extensions through the protocol conformance suite. e2e: drives the CLI end to end. Never edits product code                                          |
| Docs           | writer                      | Sonnet | not written | The design book, protocol docs and package READMEs, in the same PR as the code                                                                                         |
| HR             | policy                      | Opus   | not written | Keeps the handbook and every ruleset; turns the owner's notes and retros into rule-change PRs; drafts new roles                                                        |

Opus does the judgment roles, Sonnet the execution roles.

## Flow

```
Task, written by the owner
  -> BA assistant      brief, gaps, questions back to the owner
  -> Specialist        the owning department analyzes it with the BA assistant
  -> PO + Architect    the gate: product fit and technical fit, both must approve
  -> Programming       the role for each part touched, with tests
  -> Docs              the pages the change touches, before anyone reviews
  -> Owner review      a fresh run of each owning role, plus Cyber security and DevOps when the change needs them
  -> Architect         code quality, rules, the four axes, and pages that match the code
  -> QA                conformance and e2e
  -> PM                commit, push, PR
```

- The route depends on the task. Small tasks skip departments: a typo goes straight from Programming to QA. The gate may make a route longer, never shorter.
- Bugs skip the BA analysis: QA reproduces the bug and writes a failing test first, then the owning Programming role fixes it.
- The BA assistant and the specialist get at most two rounds of back-and-forth. Whatever is still open goes to the owner, and the task parks until the owner answers.
- If the reviews or QA reject the work twice, the task goes back to the gate to re-plan once. If that fails too, it parks as blocked.
- One pipeline run ends in one small, reviewable PR, which the owner reviews and merges.
- A step whose department isn't written yet can't run, so a task whose route needs one parks until it exists. Until then the owner, or a session working directly, does that step, and its handoff says so.

## Where things live

```
docs/departments/
  README.md, RULES.md, CLAUDE.md        this page, the handbook, Claude notes for the whole folder
  <dept>/README.md, RULES.md, CLAUDE.md the department's description, rules, Claude notes
  <dept>/<dept>-knowledge.md            facts and lessons, not rules
  <dept>/templates/                     exact formats: assignment, PR section, verdicts
  <dept>/roles/<role>/README.md, RULES.md, CLAUDE.md
.claude/agents/<dept>-<role>.md         model, tools, and "read and obey your rules first"
.claude/hooks/department-access/        enforces the `.env` and git rules per agent
```

Every folder splits its content across three files, each holding only what the others don't:

- `README.md` describes the folder: what the department or role is, does and how it works.
- `RULES.md` holds only the rules. Rules come in three levels: the handbook, then the department, then the role. A lower level may only narrow the one above, never loosen it.
- `CLAUDE.md` holds Claude-specific notes: how to load and treat the folder's files, and tool, model and permission mechanics. Claude Code loads it automatically into any session that reads or edits a file in that folder, so it never holds rules meant for one role only. Those stay in `RULES.md`, which binds only the agent whose agent file points at it.

## Safety

- **Least privilege.** Each agent file lists only the tools its role needs. BA, PO and Architect read but don't edit. No department agent can start other agents.
- **`.env`.** Only the DevOps engineer may read or change it. Everyone else, including the main session, is denied and uses `.env.example` to know which variables exist. Until DevOps is written, nobody reads `.env`.
- **Git.** Each role commits its own changes, since it knows what each one is, and any role may read the history. Only PM, the main session, creates branches, pushes the task branch, opens the PR and runs `gh`. Nobody merges or pushes to `develop` or `master`.
- **Model check.** Every agent checks at start-up that it runs on the model its rules require. On a mismatch it refuses and reports instead of working.

Agent tool lists are not enough for `.env` and git, because Claude Code can't limit a tool to certain files or commands per agent. A project hook that sees which agent is calling enforces both: [`.claude/hooks/department-access`](../../.claude/hooks/department-access).

## Running

- Local only, one task at a time.
- Order: tasks that were waiting and got an answer, and the owner's PR review comments, come first; then the order of the `Todo` column in the project, top first.
- The owner can stop a run at any time. The run finishes its current step, parks with a note, and nothing new starts until the owner resumes it.
- Departments run the checks locally until CI exists.

## Pull request size

- The goal is reviewability. About 400 hand-written changed lines or 20 files is a guide, not a cutoff; a coherent PR may go over it with the reason stated in its description.
- When a task won't fit one reviewable PR, work stops and PM proposes a split on the issue, as sub-issues. Splits follow meaningful seams (a crate, a protocol message, a layer, an extension), never "the first 20 files".
- Generated files (lockfiles, code generated from the protocol schema) are marked `linguist-generated` so they don't count. The schema itself stays visible.
- Mechanical changes (renames, formatting, dependency bumps) get their own PR, produced by a command quoted in its description.

## How the rules change

- The HR department owns every ruleset. A rule change is always its own small PR, separate from feature work, and applies from the next run after it merges.
- A rule-change PR gets two reviews before the owner sees it, both started by PM: a fresh HR run as owner review, and the Architect reviewer, which checks that it clashes with no workspace rule under `.claude/rules/` and no other ruleset, and that each level only narrows the one above. Until HR is written, the Architect reviewer's check and the owner's review are the only two.
- When a merged PR turns out to have a mistake the departments missed, PM traces which step should have caught it, and that department proposes a rule or checklist change. The retro improves the process; it never blames a department.
- Work no role covers parks the task while HR drafts the new role as its own PR. Until HR is written, the owner decides whether to add the role.

## Adding a department

A new department or role is added as its own rule-change PR, in this order:

1. **Folder.** Create `docs/departments/<dept>/` with its `README.md`, `RULES.md` and `CLAUDE.md`, a `<dept>-knowledge.md`, and a `templates/` folder holding the exact format of everything the department returns. Copy the shape of an existing department of the same kind: Architect for a read-only reviewer, PM for a role that writes.
2. **Roles.** For each role, create `docs/departments/<dept>/roles/<role>/` with its own triplet. The role's `RULES.md` names its model and its exact tools, and only narrows the department's rules.
3. **Agent file.** Create `.claude/agents/<dept>-<role>.md` with the same front matter as the existing ones (`name`, `description`, `tools`, `disallowedTools: mcp__*`, `model`) and the same body: the three `RULES.md` files to read in order. Leave out the `Agent` tool.
4. **Access.** When the role needs a privilege no other role has, such as `.env`, change [`.claude/hooks/department-access`](../../.claude/hooks/department-access) and its tests in the same PR.
5. **This page.** Set the role's row in the [roster](#roster) to written, and adjust the [flow](#flow) when the department adds or moves a step.
6. **Links.** Where other departments' rules say "until X is written", narrow or remove that clause, since the department now exists.
