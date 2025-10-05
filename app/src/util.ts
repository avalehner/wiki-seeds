export const getWikipediaUrlFromTitle = (title: string) => {
  return `https://en.wikipedia.org/wiki/${escapeArticleTitle(title)}`;
};

export const escapeArticleTitle = (title: string) => {
  return title.replaceAll(" ", "_");
};

export const getSummaryUrlFromTitle = (title: string) => {
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${escapeArticleTitle(
    title
  )}`;
};

export const combineClasses = (
  ...classes: (string | null | undefined | false)[]
) => classes.filter(Boolean).join(" ");
