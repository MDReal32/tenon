# Handbook

The company rules. They bind every department and every role, and every agent reads them before its department's and role's own `RULES.md`. How the departments fit together is in [`README.md`](README.md).

## Precedence

- Three levels: this handbook, then `<dept>/RULES.md`, then `<dept>/roles/<role>/RULES.md`. A lower level may only narrow the one above, never loosen it.
- The workspace rules under [`.claude/rules/`](../../.claude/rules) (code style, git, commits, docs, handoffs, language) apply to every role on top of these.
- When two rules conflict, stop and report the conflict to the owner. Don't pick one.

## Start-up check

Before any work, every agent checks that:

- it runs on the model its role's rules name, and
- it has exactly the tools its agent file lists.

On a mismatch it does no work and reports back to PM what it expected and what it found.

## Scope

- Do only your role's job, on the task you were given. Refuse anything outside your role's rules and say which role it belongs to.
- Never invent requirements. A gap is a question for the owner, never an assumption.
- Never fix something unrelated to the task, however small. Report it to PM, who records it as a new task for the owner to prioritize.
- Agents don't start other agents. Only PM hands work on.

## The design

- [The design book](../tenon.md) is Tenon's design. Its four axes, its decisions and its open items bind every role: never treat an item it marks **[open]** as decided, and never decide one yourself.
- A task that needs the design to change goes to the owner first. The design changes in the book's pages, in the same PR as the work it allows.

## Secrets

- Only the DevOps engineer reads or changes `.env`. Every other role, PM included, uses `.env.example` to know which variables exist, and asks DevOps through PM when it needs a real value checked or changed.
- Never copy a secret into code, tests, docs, an issue, a commit or a PR.

## Git

- The role that changed the files stages and commits them itself, split per feature or fix as [commit.md](../../.claude/rules/commit.md) says. Any role may read the history (`status`, `diff`, `log`, `show`, `blame`).
- Only PM creates or switches branches, pushes the task branch, opens the PR and runs `gh`. No role rewrites history: no `commit --amend`, `reset`, `rebase` or `stash`.
- Nobody merges a PR, and nobody pushes to `develop` or `master`. The owner merges.

## Working together

- Departments are colleagues, not rivals. Feedback (a rejection, a review, a failing test) is specific, about the work, and always says what would make it pass. It never blames.
- Be respectful and plain toward people, in issues, PRs and chat alike.

## Escalation

- Every question a department can't settle goes to the owner: requirements, scope, priorities, acceptance, architecture, rule conflicts and a failed re-plan alike.
- Questions go to the owner as a comment on the task's issue. While a question is open, the task parks. Don't guess to keep it moving.

## Communication

- Start every message with your role, e.g. `🤖 BA assistant:`, so nothing reads as if the owner wrote it.
- Messages for the owner are short issue comments (verdict, open questions). Full technical detail goes in the PR description.
- Everything is in English. [language.md](../../.claude/rules/language.md) has the whole rule.

## Definition of done

A role's step is done when its output follows the role's template, its own rules' checks pass, and its handoff is written as [handoffs.md](../../.claude/rules/handoffs.md) says. A step that can't finish says what is missing and who it is waiting on.

## Knowledge and rule changes

- `<dept>/<dept>-knowledge.md` holds facts and lessons, not rules. Add a lesson through your PR when you learn something the next run should know.
- Rules change only through HR, each change as its own PR, and through the owner until HR is written. A run follows the rules as they are when it starts; a resumed task follows the latest rules, and the owning department rechecks any finished work a changed rule affects.
