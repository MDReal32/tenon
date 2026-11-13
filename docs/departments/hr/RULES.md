# HR rules

Rules for every HR role, on top of the [handbook](../RULES.md). What HR does is in [`README.md`](README.md).

## What a rule change carries out

- Write only what the owner's note, the retro's proposal or the parked role gap in PM's assignment asks for, no less and no more. Never invent a rule nobody asked for.
- A gap or a choice the note leaves open is a question for the owner through PM, never an assumption in a rule.
- Never decide Tenon's design in a rule: anything [the design book](../../tenon.md) marks **[open]** stays open, and a rule that needs the design to change goes to the owner first.
- Never loosen a safety rule (`.env`, the git limits, least privilege or the model check) unless the owner's note asks for that change in its own words.

## How rules fit

- Keep the three levels: a department's rules only narrow the handbook, and a role's only narrow its department's. A change that would loosen a level goes to the owner instead.
- When a new rule would clash with an existing one, change both in the same PR or stop and report the clash to PM. Never leave two rules that disagree.
- Keep every folder's split across `README.md`, `RULES.md` and `CLAUDE.md`, each holding only what the others don't, as [docs.md](../../../.claude/rules/docs.md) says.
- Add a department or role as the overview's [adding a department](../README.md#adding-a-department) says, in its order.

## What it may change

- Every rule in this section leaves out the work record: a role always writes and commits its own handoff under `docs/handoffs/`, brings its job note's "Current state", `tasks` and `updated` up to date when its work ends, and may add a lesson to [`hr-knowledge.md`](hr-knowledge.md).
- Change only the files in your role's part, as your role's `RULES.md` names it, and only the ones the rule change touches.
- Never change product code, tests outside the access hook, the design book, a package `README.md`, or `.env`. A change the rule change needs there goes to PM, for the role that owns it.
- A lesson another department adds to its own knowledge file is that department's work record, not HR's to change.

## The access hook

- A change to [`.claude/hooks/department-access`](../../../.claude/hooks/department-access) comes with a test for every call it newly allows or denies, and keeps every other test passing.
- A rule-change PR that changes the hook also gets the Cyber security review, which PM starts.

## Owner review

- Review a rule change only as a fresh HR run, never the run that wrote it.
- Check that it carries out the note it names and nothing more, that it loosens no level and no safety rule the note doesn't name, and that each changed folder keeps its three-file split.
- Change nothing during a review. Each finding names the file and line, what is wrong, and what would make it pass.

## Checks

- Run the docs check through Nx, as [nx-tasks.md](../../../.claude/rules/code-style/nx-tasks.md) says, until it passes. Until `libs/dev` has it, check every link, anchor and table you touched by reading them, and say so in the report.
- Run the hook's tests whenever the hook changes, until they pass.

## Commits

- Commit your own work on the task branch PM checked out, as [commit.md](../../../.claude/rules/commit.md) says. A rule change is always its own commit and PR, separate from feature work.
- Never create or switch branches, push, or rewrite history. The hook blocks it, and PM does the rest.

## Work

- Work only on the task in PM's assignment, and give one output per assignment.
- A finding against your work you think is wrong goes back to PM with the reason, never silently skipped.
- Report anything you notice outside the task to PM, in a line after your output, and leave it unfixed.
