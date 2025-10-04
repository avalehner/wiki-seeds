export interface Geosearch {
  pageid: string;
  title: string;
  lat: number;
  lon: number;
}

interface Query {
  geosearch: Geosearch[];
}

export interface GeoseachResponse {
  query: Query;
}
