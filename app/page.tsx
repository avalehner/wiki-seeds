"use client";

import styles from "./page.module.css";
import { getNearbyArticles } from "./src/getNearbyArticles";
import { useEffect, useState } from "react";
import { Geosearch } from "./src/interfaces";

export default function Home() {
  const [nearbyArticles, setNearbyArticles] = useState<Geosearch[]>([]);

  const updateNearbyArticles = async () => {
    const articles = await getNearbyArticles();
    setNearbyArticles(articles.query.geosearch);
  };

  useEffect(() => {
    updateNearbyArticles();
  }, []);

  return (
    <div className={styles.page}>
      {nearbyArticles &&
        nearbyArticles.map((article) => (
          <div key={article.pageid}>
            {article.title}, lat: {article.lat}, long: {article.lon}
          </div>
        ))}
    </div>
  );
}
