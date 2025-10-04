export const getWikipediaUrlFromTitle = (title: string) => {
  return `https://en.wikipedia.org/wiki/${title.replaceAll(" ", "_")}`;
};
