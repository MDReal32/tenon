import { setTimeout as sleep } from "node:timers/promises";

import { MAX_FAILED_POLLS, POLL_SECONDS } from "./config.mjs";
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

const poll = state => {
  const { events, board, lastEventId } = takeSnapshot(state);
  if (!state) {
    process.stderr.write("github-watch: no saved state, starting from now\n");
    return { state: { lastEventId, board }, changes: [] };
  }
  return { state: { lastEventId, board }, changes: findChanges(state, events, board) };
};

let state = readState();
let failedPolls = 0;

while (true) {
  try {
    const result = poll(state);
    state = result.state;
    writeState(state);
    failedPolls = 0;
    if (result.changes.length > 0) {
      const lines = result.changes.map(change => `- ${change}`).join("\n");
      process.stdout.write(`github-watch: ${result.changes.length} change(s) on GitHub\n${lines}\n`);
      process.exit(0);
    }
  } catch (error) {
    failedPolls += 1;
    process.stderr.write(`github-watch: poll ${failedPolls}/${MAX_FAILED_POLLS} failed: ${error.message.split("\n")[0]}\n`);
    if (failedPolls >= MAX_FAILED_POLLS) {
      process.stdout.write(`github-watch: stopped after ${MAX_FAILED_POLLS} failed polls in a row; GitHub could not be reached\n`);
      process.exit(1);
    }
  }
  await sleep(POLL_SECONDS * 1000);
}
