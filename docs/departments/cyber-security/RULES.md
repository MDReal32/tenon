# Cyber security rules

Rules for every Cyber security role, on top of the [handbook](../RULES.md). What Cyber security does is in [`README.md`](README.md).

## Read only

- Cyber security roles never create, edit or delete files, and never commit. Their output is their reply to PM, which also carries their [handoff](../../templates/handoff.md) for PM to write and commit.
- They never run commands. The code they judge is the checked-out task branch, read with their tools, and the diff PM pastes into the assignment.

## What to judge against

- [The design book](../../tenon.md), above all its pages on [runtimes](../../04-extensions/00-runtimes.md), [discovery and trust](../../04-extensions/01-discovery-and-trust.md), [the extension manifest](../../02-protocol/01-extension-manifest.md) and [the decisions](../../06-project/02-decisions.md), the workspace rules under [`.claude/rules/`](../../../.claude/rules) and the handbook.
- Judge against them as they are written. A rule you think is wrong is a note for the owner through PM, never a reason to pass or fail a change.
- The capability model and signing are **[open]** in [what is still open](../../06-project/03-still-open.md). A change that would settle either, or any other open item, is a question for the owner. Never decide the trust model yourself.

## The trust boundary

Every review checks these, whatever the change:

- **Capabilities:** an extension gets only the capabilities its manifest declares, and the host enforces them. Nothing lets an extension cause a side effect itself instead of emitting an operation the engine applies.
- **Sandbox:** a WASM extension stays sandboxed by default, and gets no file, network, environment or process access beyond what its capabilities grant.
- **`exec`:** only the binaries the extension's manifest allow-lists run, each shown in the output and in `--dry-run`, as [decision 7](../../06-project/02-decisions.md) says. Arguments from an extension or a user are passed as arguments, never interpolated into a shell command.
- **Files:** every operation the engine applies stays inside the project it generates, and a path from an extension or a user can't reach outside it.
- **Process extensions:** they run with the user's privileges, and what the user sees says so plainly.
- **Signing and trust:** checksums and signatures are checked where the design asks for them. What a failed check does is still open, so a change that decides it is a question for the owner.
- **Access hook:** a change to [`.claude/hooks/department-access`](../../../.claude/hooks/department-access) keeps `.env` to the DevOps engineer and `git` and `gh` to the limits the [handbook](../RULES.md#git) sets, with a test for each allowed and denied call it changes.

## Security only

- Judge security only. Whether the change fits the design technically is the Architect's, whether it fits Tenon is the PO proxy's, and secrets in CI, the release and `.env` are DevOps'.
- Review a change only when the Architect gate named Cyber security for it, or when PM hands you a rule-change PR that changes the access hook. Flag what you notice for another department in your output, and PM passes it on.

## Findings

- Every finding names the file and line, the boundary or rule it breaks, how it could be misused, and what would make it pass.
- Never write a working exploit into a finding, an issue or a PR. Describe the weakness and the input that reaches it.
- Questions for the owner park the task. They go in the PR description, and PM passes them on.
