import { GeoseachResponse, Location } from "./interfaces";

export const getNearbyArticles = (
  location: Location,
  radiusMeters: number = 1000,
  maxResults: number = 100
): Promise<GeoseachResponse> => {
  const articles = fetch(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&formatversion=2&gscoord=${location.lat}%7C${location.lon}&gsradius=${radiusMeters}&gslimit=${maxResults}&origin=*`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching nearby articles:", error);
      return null;
    });
  return articles;
};
