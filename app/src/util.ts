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

export const hexToRgb = (hex: string) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getFlowerImageFromArticle = (article: Article) => {
  const plant = articleToPlant(article);
  const baseName = plant.plantBaseName;
  return `/images/plants/flowers/flower-${baseName}.png`;
};

export const getSeedImageFromArticle = (article: Article) => {
  const plant = articleToPlant(article);
  const baseName = plant.plantBaseName;
  return `/images/plants/seeds/seed-${baseName}.png`;
};
