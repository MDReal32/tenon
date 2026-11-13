---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: chore/dev/17-nx-workspace
pr:
---

# BA readiness check of the Nx workspace task

PM asked the BA assistant to check [#17](https://github.com/MDReal32/tenon/issues/17) against BA's definition of ready, and to return either a brief or questions for the owner. The task sets up the root of Tenon's workspace: Yarn and Nx, a Cargo workspace with its toolchain file, `@monodon/rust` to infer the Cargo targets, and Biome. It is task 7 of 28 in M0 and the first step on the [Nx workspace](nx-workspace.md) job. The step ran twice. The first attempt ended in four questions for the owner. The second folded in the owner's answers and ended in the brief.

## What I did and how

In the first attempt I read the task text from PM's assignment and went through the eight definition-of-ready items. To see where the task touches Tenon, I read [the repository layout](../../../06-project/00-repository-layout.md), which says every task runs through Nx with no `xtask/`, and [the roadmap](../../../06-project/01-roadmap.md)'s M0 section. I also read the Nx config rule [nx-config.md](../../../../.claude/rules/code-style/nx-config.md), which defines the finite checks that `build` must depend on, and [Programming dev's rules](../../../departments/programming/roles/dev/RULES.md), which name the root config files as that role's part. Finally I read the Architect gate's [M0 draft](../../docs/roadmap/2026-11-05-architect-gate-m0-draft.md), where the owner settled the tooling, and I listed what the repository holds today.

Six items were answered: the goal (M0 groundwork for the first version), surface, contract, errors, platforms and dependencies. Four gaps were left. The first was that no crate is in scope, so no Cargo target exists for `@monodon/rust` to infer, and the third criterion had no yes or no check. The second was that "Biome is configured" didn't say what counts as a pass. The third was that Biome would pick up files that already exist by default, the access hook's `.mjs` files (which belong to HR policy) and `docs/.obsidian/`'s JSON. The fourth was that the task named no versions for Yarn, Node or the Rust toolchain. Each became one question, with options. Separately, I told PM that the work needs root files no role's part named, such as `.gitignore`, `Cargo.lock` and Yarn's own files, and PM asked that as a fifth question.

In the second attempt PM relayed the owner's answers, posted on #17. Criterion 3 passes when the plugin is registered in `nx.json` and `yarn nx show projects` loads it without error, with no Cargo project yet. Biome needs a root config and a Biome check through Nx that passes, with the existing hook and Obsidian files ignored for now. The versions are "each lts versions". The root files are split: the git files go to DevOps, the package managers' files to Programming dev, which [#61](https://github.com/MDReal32/tenon/issues/61) is to write into the rules. With these answers every definition-of-ready item is answered, so I returned the brief. It quotes the six criteria as written, puts the owner's two clarifications under scope and errors, and adds #61 as a dependency, since #17's branch stacks on it.

## Why this way

BA's rules turn every gap into a question and never into a default, so no gap was filled in either attempt. The first question came from a real clash between the third criterion and "Scope out: any package". I didn't settle it with a throwaway or placeholder crate, because either one changes the check or the scope, and the owner chose the check without a crate. The finite checks in the fifth criterion were never asked, because nx-config.md defines them and QA can check against that rule.

For versions, the brief mapped "each lts versions" only where a tool publishes an LTS line, which is Node. Yarn and the Rust toolchain publish none, so the brief picked none for them and I suggested PM ask before the analysis. PM did, and the owner chose the Rust `stable` channel and the latest stable Yarn through Corepack, posted on #17 with the brief.

## Checks

Every definition-of-ready item was checked in both attempts, against the task text, the owner's answers and the pages listed above. No other checks apply to a read-only step.

## Where it stands

The BA step is done, and the brief is posted on #17. No owner question is open for BA.

## Next

Once #61 lands through HR, PM stacks #17's branch on it and hands the brief to Programming dev, the specialist, for its analysis; the `.gitignore` and `.gitattributes` part goes to the DevOps engineer.
