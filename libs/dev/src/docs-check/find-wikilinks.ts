const WIKILINK = /\[\[([^[\]]+)\]\]/g;

export const findWikilinks = (text: string) =>
  [...text.matchAll(WIKILINK)].map((match) => {
    const [withoutAlias = ""] = (match[1] ?? "").split("|");
    const hashIndex = withoutAlias.indexOf("#");
    const target =
      hashIndex === -1 ? withoutAlias : withoutAlias.slice(0, hashIndex);
    const heading =
      hashIndex === -1 ? undefined : withoutAlias.slice(hashIndex + 1);
    return {
      target: target.trim(),
      heading: heading?.trim(),
      index: match.index,
    };
  });
