import { describeEvent } from "./describe-event.mjs";
import { diffBoard } from "./diff-board.mjs";
import { isRelevantEvent } from "./is-relevant-event.mjs";

export const findChanges = (state, events, board) => {
  const newEvents = events
    .filter(({ id }) => BigInt(id) > BigInt(state.lastEventId))
    .sort((a, b) => (BigInt(a.id) < BigInt(b.id) ? -1 : 1));
  return [...newEvents.filter(isRelevantEvent).map(describeEvent), ...diffBoard(state.board, board)];
};
