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

PM asked the BA assistant to check [#17](https://github.com/MDReal32/tenon/issues/17) against BA's definition of ready, and to return either a brief or questions for the owner. Later PM also asked it to answer the specialist's questions. The task sets up the root of Tenon's workspace: Yarn and Nx, a Cargo workspace with its toolchain file, `@monodon/rust` to infer the Cargo targets, and Biome. It is task 7 of 28 in M0 and the first step on the [Nx workspace](nx-workspace.md) job. The readiness check ran twice. The first attempt ended in four questions for the owner, and the second folded in the owner's answers and ended in the brief. A third step answered the five questions in [the Programming dev role's analysis](2026-11-13-programming-dev-workspace.md). It settled four of them and turned one into a question for the owner.

## What I did and how

In the first attempt I read the task text from PM's assignment and went through the eight definition-of-ready items. To see where the task touches Tenon, I read [the repository layout](../../../06-project/00-repository-layout.md), which says every task runs through Nx with no `xtask/`, and [the roadmap](../../../06-project/01-roadmap.md)'s M0 section. I also read the Nx config rule [nx-config.md](../../../../.claude/rules/code-style/nx-config.md), which defines the finite checks that `build` must depend on, and [Programming dev's rules](../../../departments/programming/roles/dev/RULES.md), which name the root config files as that role's part. Finally I read the Architect gate's [M0 draft](../../docs/roadmap/2026-11-05-architect-gate-m0-draft.md), where the owner settled the tooling, and I listed what the repository holds today.

Six items were answered: the goal (M0 groundwork for the first version), surface, contract, errors, platforms and dependencies. Four gaps were left. The first was that no crate is in scope, so no Cargo target exists for `@monodon/rust` to infer, and the third criterion had no yes or no check. The second was that "Biome is configured" didn't say what counts as a pass. The third was that Biome would pick up files that already exist by default, the access hook's `.mjs` files (which belong to HR policy) and `docs/.obsidian/`'s JSON. The fourth was that the task named no versions for Yarn, Node or the Rust toolchain. Each became one question, with options. Separately, I told PM that the work needs root files no role's part named, such as `.gitignore`, `Cargo.lock` and Yarn's own files, and PM asked that as a fifth question.

In the second attempt PM relayed the owner's answers, posted on #17. Criterion 3 passes when the plugin is registered in `nx.json` and `yarn nx show projects` loads it without error, with no Cargo project yet. Biome needs a root config and a Biome check through Nx that passes, with the existing hook and Obsidian files ignored for now. The versions are "each lts versions". The root files are split: the git files go to DevOps, the package managers' files to Programming dev, which [#61](https://github.com/MDReal32/tenon/issues/61) is to write into the rules. With these answers every definition-of-ready item is answered, so I returned the brief. It quotes the six criteria as written, puts the owner's two clarifications under scope and errors, and adds #61 as a dependency, since #17's branch stacks on it.

In the specialist step, PM marked the round as round 2 of 2. PM brought the five questions from [the Programming dev analysis](2026-11-13-programming-dev-workspace.md) along with the owner's answers as given. I checked which files in the repository Biome would check today: the hook's `.mjs` files, `.claude/settings.json` and the six JSON files in `docs/.obsidian/`. For the Node line, the owner's "the current Node LTS line" names 26, which the specialist found has been LTS since 2026-10-28. The answer names one line, so a range that also allows Node 27 goes past it. The specialist picks the range syntax, and `engines.node` alone stays inside its part. For `.claude/settings.json`, the owner's own words were "skip old files", and that file is old. So the check ignores that one file, not all of `.claude`, which would also skip files added later, and not a wider `lineWidth`, which would change the style for all future code. `@napi-rs/cli` stays out, because the task names its tools and excludes every package, so no napi crate exists, and a peer warning during install is not the error the owner's plugin check names. No Yarn `enableScripts` setting is added, because nothing asks for one and the checks pass without it. The Nx major became a question for the owner. `@monodon/rust` 3.0.0 declares support only up to Nx 23, and the task names Nx without a version. The options are Nx 24.0.6 with a Yarn peer warning and an untried plugin, or Nx 23.3.2, which the plugin supports, with a major upgrade later. I recommended 23.3.2, since every Rust crate in M0 gets its targets through this plugin and its declared range is the only support it promises.

## Why this way

BA's rules turn every gap into a question and never into a default, so no gap was filled in either attempt. The first question came from a real clash between the third criterion and "Scope out: any package". I didn't settle it with a throwaway or placeholder crate, because either one changes the check or the scope, and the owner chose the check without a crate. The finite checks in the fifth criterion were never asked, because nx-config.md defines them and QA can check against that rule.

For versions, the brief mapped "each lts versions" only where a tool publishes an LTS line, which is Node. Yarn and the Rust toolchain publish none, so the brief picked none for them and I suggested PM ask before the analysis. PM did, and the owner chose the Rust `stable` channel and the latest stable Yarn through Corepack, posted on #17 with the brief. The Nx major went to the owner for the same reason. The task names no version, and "each lts versions" doesn't choose between the latest Nx and the newest one the plugin supports. Both pass the owner's plugin check, so the choice is about risk and later upgrade work, which is the owner's call. In the specialist step, every answer that was settled rests on the owner's own words or the task's named tools and scope, never on what the specialist found convenient.

## Checks

Every definition-of-ready item was checked in both attempts, against the task text, the owner's answers and the pages listed above. In the specialist step, each of the five answers was checked against the owner's answers as PM relayed them, the dev role's part in its rules, and the list of files Biome would check today. No other checks apply to a read-only step.

## Where it stands

The BA work is done. The brief is posted on #17, and the specialist step leaves one question for the owner, the Nx major, for PM to post with the brief's edits. This was the last specialist round BA takes, so the owner's answer goes straight to the specialist and the gate.

## Next

PM posts the Nx question and the brief's edits on #17, and parks the task until the owner answers. The specialist then finishes its plan with the chosen Nx major, the 26 Node line, `.claude/settings.json` ignored in Biome, and no `@napi-rs/cli` or `enableScripts`. Then come the gate, the build and DevOps' `.gitignore` and `.gitattributes` entries.
