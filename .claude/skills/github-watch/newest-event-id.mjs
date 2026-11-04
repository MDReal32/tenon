export const newestEventId = (events, fallback) => {
  return events.reduce((newest, { id }) => (BigInt(id) > BigInt(newest) ? id : newest), fallback);
};
