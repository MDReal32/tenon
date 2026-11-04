export const diffBoard = (previous, current) => {
  const changes = [];
  for (const [key, item] of Object.entries(current)) {
    const before = previous[key];
    if (!before) {
      changes.push(`board: ${key} added in ${item.status}: ${item.title}`);
      continue;
    }
    if (before.status !== item.status) {
      changes.push(`board: ${key} moved ${before.status} → ${item.status}: ${item.title}`);
    }
  }
  for (const [key, item] of Object.entries(previous)) {
    if (!current[key]) {
      changes.push(`board: ${key} removed: ${item.title}`);
    }
  }
  return changes;
};
