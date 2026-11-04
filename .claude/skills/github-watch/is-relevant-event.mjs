import { OWN_COMMENT_PREFIX } from "./config.mjs";

const RELEVANT_ACTIONS = {
  IssuesEvent: ["opened", "edited", "closed", "reopened"],
  IssueCommentEvent: ["created", "edited"],
  PullRequestEvent: ["opened", "closed", "reopened"],
  PullRequestReviewEvent: ["created", "submitted"],
  PullRequestReviewCommentEvent: ["created", "edited"]
};

const isOwnComment = payload => {
  const body = payload.comment?.body ?? payload.review?.body ?? "";
  return body.trimStart().startsWith(OWN_COMMENT_PREFIX);
};

export const isRelevantEvent = ({ type, payload = {} }) => {
  const actions = RELEVANT_ACTIONS[type];
  if (!actions || !actions.includes(payload.action)) {
    return false;
  }
  return !isOwnComment(payload);
};
