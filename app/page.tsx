"use client";

import styles from "./page.module.css";
import { getNearbyArticles } from "./src/getNearbyArticles";
import { useEffect, useState } from "react";
import { Geosearch, Location } from "./src/interfaces";
import MapComponent from "./components/MapComponent";

export default function Home() {
  const [nearbyArticles, setNearbyArticles] = useState<Geosearch[]>([]);
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null);

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
      <div style={{ padding: "20px" }}>
        <h1>Wiki Seeds - Nearby Articles</h1>
        <div>
          <strong>Current Location:</strong> {currentLocation?.lat?.toFixed(4)},{" "}
          {currentLocation?.lon?.toFixed(4)}
        </div>
        <div>
          <strong>Found {nearbyArticles.length} nearby articles</strong>
        </div>
      </div>

      <MapComponent
        currentLocation={currentLocation}
        nearbyArticles={nearbyArticles}
      />

      <div style={{ padding: "20px" }}>
        <h2>Article List</h2>
        {nearbyArticles &&
          nearbyArticles.map((article) => (
            <div
              key={article.pageid}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <strong>{article.title}</strong>
              <br />
              <small>
                lat: {article.lat.toFixed(4)}, long: {article.lon.toFixed(4)}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
