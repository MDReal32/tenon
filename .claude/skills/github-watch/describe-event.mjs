const QUOTE_LENGTH = 300;

const quote = text => {
  const flat = (text ?? "").replace(/\s+/g, " ").trim();
  return flat.length > QUOTE_LENGTH ? `${flat.slice(0, QUOTE_LENGTH)}…` : flat;
};

export const describeEvent = ({ type, actor, payload }) => {
  const who = actor?.login ?? "someone";
  const issue = payload.issue ?? payload.pull_request;
  const ref = `#${issue?.number}`;
  if (type === "IssueCommentEvent") {
    return `${ref} comment ${payload.action} by ${who}: ${quote(payload.comment?.body)} (${payload.comment?.html_url})`;
  }
  if (type === "PullRequestReviewEvent") {
    return `${ref} review ${payload.review?.state} by ${who}: ${quote(payload.review?.body)} (${payload.review?.html_url})`;
  }
  if (type === "PullRequestReviewCommentEvent") {
    return `${ref} review comment by ${who} on ${payload.comment?.path}: ${quote(payload.comment?.body)} (${payload.comment?.html_url})`;
  }
  if (type === "PullRequestEvent" && payload.action === "closed") {
    return `PR ${ref} ${payload.pull_request?.merged ? "merged" : "closed without merging"} by ${who}: ${issue?.title}`;
  }
  const kind = type === "PullRequestEvent" ? "PR" : "issue";
  return `${kind} ${ref} ${payload.action} by ${who}: ${issue?.title}`;
};
