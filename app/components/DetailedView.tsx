import { useEffect, useState } from "react";
import { SavedArticle, SummaryResponse } from "../src/interfaces";
import { getArticleSummary } from "../src/dataFetching";
import ToWikipediaPageButton from "./ToWikipediaPageButton";
import styles from "./../styles/DetailedView.module.css"; 
import { getWikipediaUrlFromTitle } from "../src/util";
import { getFlowerImageFromArticle } from "../src/util";
import Image from "next/image";


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
      <div className={styles.articleImageContainer}>
         <Image
          src={getFlowerImageFromArticle(props.savedArticle.article)}
          alt="A flower"
          width="100"
          height="100"
          className={styles.articleImage}
        />
      </div>
      <div className={styles.savedArticleTitleContainer}>{props.savedArticle.article.title}</div>
      <div className={styles.articleDetailsContainer}>
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
        <div className={styles.snippetContainer}>
          <div className={styles.snippetAndOpenWikiContainer}>
            <div className={styles.detailedViewLabel}>Snippet</div>
            {/* open wikipedia btn */}
            <div>
              <a
              href={getWikipediaUrlFromTitle(props.savedArticle.article.title)}
              target="_blank"
              rel="noreferrer"
              >
                <div className={styles.openOnWikiBtn}>open on wikipedia</div>
              </a>
            </div>
          </div>
          <div className={styles.summaryContainer}>{summary && summary.extract}</div>
        </div>
        <div className={styles.closeBtnContainer}>
          <button onClick={props.goToFlowerDex}>
            <Image
            src="/images/close-button.svg"
            alt="Close"
            width="25"
            height="25"
            className={styles.closeButtonImage}
            />
          <div>close</div>
          </button>
        </div>
      </div>
    </div>
  );
}
