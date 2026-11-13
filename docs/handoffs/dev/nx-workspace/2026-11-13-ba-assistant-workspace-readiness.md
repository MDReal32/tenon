---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-13"
status: blocked
branch: chore/dev/17-nx-workspace
pr:
---

# BA readiness check of the Nx workspace task

PM asked the BA assistant to check [#17](https://github.com/MDReal32/tenon/issues/17) against BA's definition of ready, and to return either a brief or questions for the owner. The task sets up the root of Tenon's workspace: Yarn and Nx, a Cargo workspace with its toolchain file, `@monodon/rust` to infer the Cargo targets, and Biome. It is task 7 of 28 in M0 and the first step on the [Nx workspace](nx-workspace.md) job. This first attempt ended in four questions for the owner.

## What I did and how

I read the task text from PM's assignment and went through the eight definition-of-ready items. To see where the task touches Tenon, I read [the repository layout](../../../06-project/00-repository-layout.md), which says every task runs through Nx with no `xtask/`, and [the roadmap](../../../06-project/01-roadmap.md)'s M0 section. I also read the Nx config rule [nx-config.md](../../../../.claude/rules/code-style/nx-config.md), which defines the finite checks that `build` must depend on, and [Programming dev's rules](../../../departments/programming/roles/dev/RULES.md), which name the root config files as that role's part. Finally I read the Architect gate's [M0 draft](../../docs/roadmap/2026-11-05-architect-gate-m0-draft.md), where the owner settled the tooling, and I listed what the repository holds today.

Six items are answered: the goal (M0 groundwork for the first version), surface, contract, errors, platforms and dependencies. Four gaps are left. The first is that no crate is in scope, so no Cargo target exists for `@monodon/rust` to infer, and the third criterion has no yes or no check. The second is that "Biome is configured" doesn't say what counts as a pass. The third is that Biome would pick up files that already exist by default, the access hook's `.mjs` files (which belong to HR policy) and `docs/.obsidian/`'s JSON, and the task doesn't say whether they are in. The fourth is that the task names no versions for Yarn, Node or the Rust toolchain. Each became one question, with options.

## Why this way

BA's rules turn every gap into a question and never into a default. The first question comes from a real clash between the third criterion and "Scope out: any package". I didn't settle it with a throwaway or placeholder crate, because either one changes the check or the scope, and that is for the owner to choose. The version question offers to leave the choice to Programming dev and the gate. That saves a round, since Programming's rules would otherwise send that open choice back to BA as a question. The finite checks in the fifth criterion are not asked, because nx-config.md defines them and QA can check against that rule. The goal is taken from the task's place in M0 and the layout page it builds on, and nothing was added to it.

## Checks

Every definition-of-ready item was checked against the task text and the pages listed above. No other checks apply to a read-only step.

## Where it stands

Blocked on the owner: four questions on #17 wait for answers. PM added a fifth, on who owns the root files no role's part names yet. Nothing is committed for this step except this handoff, which PM writes.

## Next

PM posts the questions on #17 and sets the task to `Waiting on owner`. Once the owner answers, PM sends the answers back to the BA assistant for a second attempt. That attempt rechecks acceptance criteria 3 and 4, the scope and the dependencies, then returns the brief for Programming dev's analysis and the gate.
