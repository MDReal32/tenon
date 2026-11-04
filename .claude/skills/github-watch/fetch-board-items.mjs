import { PROJECT_NUMBER, PROJECT_OWNER } from "./config.mjs";
import { runGh } from "./run-gh.mjs";

export const fetchBoardItems = () => {
  const { items } = runGh([
    "project",
    "item-list",
    PROJECT_NUMBER,
    "--owner",
    PROJECT_OWNER,
    "--format",
    "json",
    "--limit",
    "500"
  ]);
  const board = {};
  for (const item of items) {
    const key = `${item.content.type === "PullRequest" ? "PR" : "#"}${item.content.number ?? item.id}`;
    board[key] = { title: item.title, status: item.status ?? "No status" };
  }
  return board;
};
