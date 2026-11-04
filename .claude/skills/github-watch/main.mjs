import { setTimeout as sleep } from "node:timers/promises";

import { POLL_SECONDS } from "./config.mjs";
import { fetchBoardItems } from "./fetch-board-items.mjs";
import { fetchRepoEvents } from "./fetch-repo-events.mjs";
import { findChanges } from "./find-changes.mjs";
import { newestEventId } from "./newest-event-id.mjs";
import { readState } from "./read-state.mjs";
import { writeState } from "./write-state.mjs";

const takeSnapshot = previous => {
  const events = fetchRepoEvents();
  const board = fetchBoardItems();
  return { events, board, lastEventId: newestEventId(events, previous?.lastEventId ?? "0") };
};

let state = readState();
if (!state) {
  const { board, lastEventId } = takeSnapshot(null);
  state = { lastEventId, board };
  writeState(state);
  process.stderr.write("github-watch: no saved state, starting from now\n");
}

while (true) {
  const { events, board, lastEventId } = takeSnapshot(state);
  const changes = findChanges(state, events, board);
  state = { lastEventId, board };
  writeState(state);
  if (changes.length > 0) {
    process.stdout.write(`github-watch: ${changes.length} change(s) on GitHub\n${changes.map(change => `- ${change}`).join("\n")}\n`);
    process.exit(0);
  }
  await sleep(POLL_SECONDS * 1000);
}
