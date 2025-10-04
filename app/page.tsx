"use client";

import { getNearbyArticles } from "./src/getNearbyArticles";
import { useEffect, useState } from "react";
import { Article, Location } from "./src/interfaces";
import SeedSpawn from "./components/SeedSpawn";
import MapPage from "./components/MapPage";

export default function Home() {
  const [nearbyArticles, setNearbyArticles] = useState<Article[]>([]);
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  // TODO: Move this to DB
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  const updateNearbyArticles = async () => {
    if (currentLocation) {
      const articles = await getNearbyArticles(currentLocation, 10000);
      setNearbyArticles(articles.query.geosearch);
    }
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurrentLocation({
          lat: lat,
          lon: lon,
        });
      });
    }
  };

  const update = () => {
    updateLocation();
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    updateNearbyArticles();
  }, [currentLocation]);

  const saveArticle = (article: Article) => {
    setSavedArticles([...savedArticles, article]);
  };

  return selectedArticle ? (
    <SeedSpawn
      article={selectedArticle}
      setSelectedArticle={setSelectedArticle}
      addSavedArticle={saveArticle}
    />
  ) : (
    <MapPage
      currentLocation={currentLocation}
      nearbyArticles={nearbyArticles}
      setSelectedArticle={setSelectedArticle}
    />
  );
}
