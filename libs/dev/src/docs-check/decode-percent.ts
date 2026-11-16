export const decodePercent = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    if (error instanceof URIError) {
      return undefined;
    }
    throw error;
  }
};
