import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { diffBoard } from "./diff-board.mjs";
import { findChanges } from "./find-changes.mjs";
import { isRelevantEvent } from "./is-relevant-event.mjs";
import { newestEventId } from "./newest-event-id.mjs";

const comment = (id, body, action = "created") => ({
  id,
  type: "IssueCommentEvent",
  actor: { login: "MDReal32" },
  payload: { action, issue: { number: 2 }, comment: { body, html_url: "u" } }
});

describe("isRelevantEvent", () => {
  it("keeps the owner's comments", () => {
    assert.equal(isRelevantEvent(comment("1", "1. yes")), true);
  });
  it("skips PM's own comments", () => {
    assert.equal(isRelevantEvent(comment("1", "🤖 PM coordinator: parked")), false);
    assert.equal(isRelevantEvent(comment("1", "  🤖 BA assistant: 3 questions")), false);
  });
  it("skips pushes, branch creation and assignment", () => {
    assert.equal(isRelevantEvent({ type: "PushEvent", payload: {} }), false);
    assert.equal(isRelevantEvent({ type: "CreateEvent", payload: {} }), false);
    assert.equal(isRelevantEvent({ type: "IssuesEvent", payload: { action: "assigned" } }), false);
  });
  it("keeps merges and new issues", () => {
    assert.equal(isRelevantEvent({ type: "PullRequestEvent", payload: { action: "closed" } }), true);
    assert.equal(isRelevantEvent({ type: "IssuesEvent", payload: { action: "opened" } }), true);
  });
});

describe("diffBoard", () => {
  it("reports status moves, additions and removals", () => {
    const before = { "#2": { title: "Plan", status: "Todo" }, "#3": { title: "Review", status: "Done" } };
    const after = { "#2": { title: "Plan", status: "In Progress" }, "#9": { title: "Watch", status: "Todo" } };
    assert.deepEqual(diffBoard(before, after), [
      "board: #2 moved Todo → In Progress: Plan",
      "board: #9 added in Todo: Watch",
      "board: #3 removed: Review"
    ]);
  });
  it("reports nothing when nothing moved", () => {
    const board = { "#2": { title: "Plan", status: "Todo" } };
    assert.deepEqual(diffBoard(board, { ...board }), []);
  });
});

describe("findChanges", () => {
  it("reports only events newer than the saved one, oldest first", () => {
    const state = { lastEventId: "100", board: {} };
    const events = [comment("102", "second"), comment("100", "seen"), comment("101", "first")];
    const changes = findChanges(state, events, {});
    assert.equal(changes.length, 2);
    assert.match(changes[0], /first/);
    assert.match(changes[1], /second/);
  });
  it("compares event IDs as numbers, not strings", () => {
    assert.equal(newestEventId([{ id: "99" }, { id: "100" }], "0"), "100");
  });
});
