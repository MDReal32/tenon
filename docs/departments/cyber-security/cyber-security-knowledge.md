# Cyber security knowledge

Facts and lessons for reviewing Tenon's trust boundary. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- No product code exists yet. The trust model on [discovery and trust](../../04-extensions/01-discovery-and-trust.md) is an alpha design, to be reworked: WASM extensions are sandboxed by default, process extensions run with the user's privileges, and signature verification is optional.
- WASM is the only extension runtime in M0, through `tenon-host-wasm` on wasmtime. The other runtimes on [runtimes](../../04-extensions/00-runtimes.md) come later.
- Capabilities are declared in the manifest's `[capabilities]` table, as [the extension manifest](../../02-protocol/01-extension-manifest.md) shows, and enforced by the host: sandboxing for WASM, mediated operations for process extensions.
- Extensions never write files. They emit operations into the plan, and the engine applies them through its VFS. The only primitives that need host privilege are VFS `write`, `delete` and `mkdir`, `exec` and `message`, as decision 3 on [the decisions](../../06-project/02-decisions.md) says.
- `exec` runs without a prompt, allow-listed per extension and shown in the output and in `--dry-run`, as decision 7 says. Running `tenon new` is the user's consent. It is recorded in `tenon.lock` once the lockfile exists.
- The release on GitHub Releases ships checksums and signatures, as [distribution](../../05-distribution/00-distribution.md) says, and the launchers only start the engine binary.
- The capability model, signing, and whether `exec` output can be replayed faithfully are open, on [what is still open](../../06-project/03-still-open.md).
- The department pipeline's own access limits are enforced by [`.claude/hooks/department-access`](../../../.claude/hooks/department-access), with its tests in `find-access-violation.test.mjs`. The hook trusts the agent type alone, so a session started as `--agent devops-engineer` also reaches `.env`.

## Lessons

None yet.
