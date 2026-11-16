const WIKILINK_VALUE = /^\[\[(.+)\]\]$/;

export const actualLink = (value: string) =>
  value.match(WIKILINK_VALUE)?.[1] ?? value;
