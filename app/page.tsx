"use client";

import styles from "./page.module.css";
import { getNearbyArticles } from "./src/getNearbyArticles";
import { useEffect, useState } from "react";
import { Geosearch, Location } from "./src/interfaces";

export default function Home() {
  const [nearbyArticles, setNearbyArticles] = useState<Geosearch[]>([]);
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null);

  const updateNearbyArticles = async () => {
    console.log("outer");
    if (currentLocation) {
      console.log("here");
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
    const interval = setInterval(update, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    updateNearbyArticles();
  }, [currentLocation]);

  return (
    <div>
      <div>
        {currentLocation?.lat}, {currentLocation?.lon}
      </div>
      <div>
        {nearbyArticles &&
          nearbyArticles.map((article) => (
            <div key={article.pageid}>
              {article.title}, lat: {article.lat}, long: {article.lon}
            </div>
          ))}
      </div>
    </div>
  );
}
