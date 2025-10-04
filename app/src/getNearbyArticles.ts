import { GeoseachResponse } from "./interfaces";

export const getNearbyArticles = (): Promise<GeoseachResponse> => {
  const articles = fetch(
    "https://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&formatversion=2&gscoord=40.7009259%7C-73.9204175&gsradius=1000&origin=*"
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching nearby articles:", error);
      return null;
    });
  return articles;
};
