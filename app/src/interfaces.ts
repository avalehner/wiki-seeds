export interface Article {
  pageid: string;
  title: string;
  lat: number;
  lon: number;
}

export interface SavedArticle {
  article: Article;
  timestampFound: Date;
}

interface Query {
  geosearch: Article[];
}

export interface GeoseachResponse {
  query: Query;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface SummaryResponse {
  extract: string; 
}

export type SetSelectedArticleFn = (article: Article | null) => void;
export type AddSavedArticle = (article: Article) => void;

export enum Page {
  MAP_VIEW,
  SEED_SPAWN,
  DETAILED_VIEW,
  FLOWER_DEX,
}


