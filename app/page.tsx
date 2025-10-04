"use client";

import { getNearbyArticles } from "./src/dataFetching";
import { useEffect, useState } from "react";
import { Article, Location, Page, SavedArticle } from "./src/interfaces";
import SeedSpawn from "./components/SeedSpawn";
import MapPage from "./components/MapPage";
import DetailedView from "./components/DetailedView";
import Flowerdex from "./components/Flowerdex";

export default function Home() {
  const [nearbyArticles, setNearbyArticles] = useState<Article[]>([]);
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  // TODO: Move this to DB
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(Page.MAP_VIEW);

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
    setSavedArticles([
      ...savedArticles,
      {
        article: article,
        timestampFound: new Date(),
      },
    ]);
    setCurrentPage(Page.DETAILED_VIEW);
  };

  const setSelectedArticleCallback = (article: Article | null) => {
    if (article) {
      setCurrentPage(Page.SEED_SPAWN);
    } else {
      setCurrentPage(Page.MAP_VIEW);
    }
    setSelectedArticle(article);
  };

  const selectedSavedArticle = savedArticles.find(
    (savedArticle) => savedArticle.article.pageid === selectedArticle?.pageid
  );

  const goToArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage(Page.DETAILED_VIEW);
  };

  const goToMap = () => {
    setSelectedArticle(null);
    setCurrentPage(Page.MAP_VIEW);
  };

  const goToFlowerDex = () => {
    setSelectedArticle(null);
    setCurrentPage(Page.FLOWER_DEX);
  };

  return selectedArticle && currentPage === Page.SEED_SPAWN ? (
    <SeedSpawn
      article={selectedArticle}
      setSelectedArticle={setSelectedArticleCallback}
      addSavedArticle={saveArticle}
    />
  ) : currentPage === Page.MAP_VIEW ? (
    <MapPage
      currentLocation={currentLocation}
      nearbyArticles={nearbyArticles}
      setSelectedArticle={setSelectedArticleCallback}
      goToFlowerDex={goToFlowerDex}
    />
  ) : currentPage === Page.DETAILED_VIEW && selectedSavedArticle ? (
    <DetailedView
      savedArticle={selectedSavedArticle}
      goToFlowerDex={goToFlowerDex}
    />
  ) : currentPage === Page.FLOWER_DEX ? (
    <Flowerdex
      savedArticles={savedArticles}
      goToArticle={goToArticle}
      goToMap={goToMap}
    />
  ) : (
    <div>Unknown page</div>
  );
}
