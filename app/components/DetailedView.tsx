import { useEffect, useState } from "react";
import { SavedArticle, SummaryResponse } from "../src/interfaces";
import { getArticleSummary } from "../src/dataFetching";
import ToWikipediaPageButton from "./ToWikipediaPageButton";
import styles from "./../styles/DetailedView.module.css"; 

interface DetailedViewProps {
  savedArticle: SavedArticle;
  goToFlowerDex: () => void;
}

export default function DetailedView(props: DetailedViewProps) {
  const [summary, setSummary] = useState<null | SummaryResponse>(null);

  const fetchSummaryData = async () => {
    setSummary(await getArticleSummary(props.savedArticle.article.title));
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  return (
    <div className={styles.detailedViewContainer}>
      <div className={styles.savedArticleTitleContainer}>{props.savedArticle.article.title}</div>
      <div className={styles.locationContainer}>
        <div className={styles.detailedViewLabel}>Location</div>
        <div className={styles.locationCoords}>
         {props.savedArticle.article.lat},{" "}
        {props.savedArticle.article.lon} 
        </div>
      </div>
      <div className={styles.dateCollectedContainer}>
        <div className={styles.detailedViewLabel}>Date collected</div>
        <div className={styles.dateCollected}>{props.savedArticle.timestampFound.toLocaleDateString()}</div>
      </div>
      {/* <div className={styles.detailedViewLabel}>Rarity</div> */}
      <div className={styles.snippetAndOpenWikiContainer}>
        <div className={styles.detailedViewLabel}>Snippet</div>
        <div>
        <ToWikipediaPageButton
          articleTitle={props.savedArticle.article.title}
        />
      </div>
      </div>
      <div className={styles.snippetContainer}>{summary && summary.extract}</div>
      <button onClick={props.goToFlowerDex}>(x)</button>
    </div>
  );
}
