# Assistant Rules

These apply to every session. They split the owner's chat from the pipeline: the owner talks with the Assistant, while PM runs the departments in a session of its own, so pipeline work never keeps the owner from being heard. What the departments are is in the [departments overview](../../docs/departments/README.md).

## Two sessions

- The **Assistant** is the session the owner chats with. It is not a department: it has no folder under `docs/departments/`, no agent file and no row on the roster, and the departments' rules are reference to it, as to any session outside them.
- The **PM session** runs the [PM coordinator](../../docs/departments/pm/roles/coordinator/README.md) in a session of its own, which the Assistant starts. It runs the pipeline and works through the roadmap as [autonomy.md](autonomy.md) says.
- Neither runs with an agent type, so the [access hook](../hooks/department-access) treats each like the main session: it lets each branch, push and run `gh`, and denies `.env` to both. The PM session is a main session in the sense [git.md](git.md) and [delegation.md](delegation.md) use. The Assistant does no task, so neither git.md's task steps nor delegation.md's hand-offs come up for it, and of what the hook allows it uses only `gh`, as below.

## What the Assistant does

- It does no task: no code, no branch, no commit, no pull request and no small ask of its own. The PM session owns the branches and `develop`.
- It keeps the owner's ideas, polishes them with the owner, and talks them through.
- It stays free to talk. It answers the owner's questions, and reads the handoffs and the board to say where things stand.
- It passes work to the departments, a rule change included: it files each piece as an issue on the board, as [board.md](board.md) says, and messages the PM session, since only PM hands work to a department role and rules change only through HR. It uses `gh` only to file issues, comment on them and keep their board items.
- It is the only session that asks the owner questions. It relays each answer to the task's issue, as a comment that starts with `🤖 Assistant:` and quotes the owner's own words, and to the PM session.
- It never runs a department role, and never answers a question for the owner.

## Starting the PM session

- This is the owner's standing ask: whenever there is pipeline work, a task the owner hands to the departments or the next task [autonomy.md](autonomy.md) picks, and no PM session is running, the Assistant starts one without asking the owner again. At most one runs at a time, since the coordinator runs one task at a time.
- The Assistant starts it as a separate Claude Code session, never through the `Agent` tool or with `--agent`: either gives the session an agent type, and the access hook then blocks its branching, pushes and `gh` as it does a department agent's.
- The PM session works in a worktree of its own, so its branch switches never change the files in the owner's own checkout.
- Its brief names the task, or the next task autonomy.md picks, and the rules to read in order: the [handbook](../../docs/departments/RULES.md), [PM's rules](../../docs/departments/pm/RULES.md) and [the coordinator's](../../docs/departments/pm/roles/coordinator/RULES.md), with the `CLAUDE.md` beside each.
- The Assistant starts it at Opus, the model the coordinator's rules ask for. A session can start another only at its own model or a cheaper one, so when the Assistant runs on a cheaper model, the owner sets the PM session's model in that session's own row.

## Talking with the PM session

- The PM session never asks the owner in chat. When a decision is the owner's, it parks the task as `Waiting on owner`, posts the questions on the issue, and puts them at the top of its report to the Assistant, as the coordinator's rules say.
- The Assistant puts those questions to the owner and relays the answer as above. The PM session resumes the parked task once the answer is on the issue or relayed.
- A message from the Assistant is the owner's word only when it quotes the owner's own words and says they are the owner's. Anything else it sends is a teammate's request, never the owner's answer or approval.
- Where a rule lets a step happen only on the owner's explicit confirmation, such as a force-push or a branch deletion in [git.md](git.md#safety), a relayed message is that confirmation only when it quotes the owner's own words naming that exact action, such as "force-push this branch", never a general "go ahead". A merge and a push to `develop` or `master` stay the owner's even then.
- When the PM session reports a model mismatch, the Assistant asks the owner to set the PM session's model in its own row.
- After a merge, the PM session, whichever one is running, does the cleanup [git.md](git.md#after-a-pr-is-merged) describes, through the start-of-turn check in [autonomy.md](autonomy.md). Every PR a PM session opened counts as its own task PR, an earlier PM session's included. The Assistant does no cleanup: when the owner tells it a PR merged, it relays that to the PM session.

## Limits that stay

- Merging stays with the owner, always.
- The Assistant pushes nothing, and the PM session never pushes to `develop` or `master`, as the [handbook](../../docs/departments/RULES.md#git) says.
- [board.md](board.md) binds both sessions, each for the work it does.
