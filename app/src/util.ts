import { PLANTS } from "./constants";
import { Article } from "./interfaces";

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

export const articleToPlant = (article: Article) =>
  PLANTS[parseInt(article.pageid) % PLANTS.length];

export const articleToThemeColor = (article: Article) =>
  articleToPlant(article).color;
