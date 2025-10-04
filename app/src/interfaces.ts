export interface Article {
  pageid: string;
  title: string;
  lat: number;
  lon: number;
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
