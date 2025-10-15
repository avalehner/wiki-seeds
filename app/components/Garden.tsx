import { Article, Page, SavedArticle } from "../src/interfaces";
import PageToggle from "./PageToggle";
import styles from "./../styles/Garden.module.css";
import {
  articleToThemeColor,
  getFlowerImageFromArticle,
  hexToRgb,
} from "../src/util";
import Image from "next/image";

interface GardenProps {
  savedArticles: SavedArticle[];
  goToArticle: (article: Article) => void;
  goToMap: () => void;
}

export default function Garden(props: GardenProps) {
  return (
    <div className={styles.gardenOuterContainer}>
      <div className={styles.gardenGrid}>
        {props.savedArticles.map((savedArticle) => {
          const backgroundColor = articleToThemeColor(
            savedArticle.article
          ).backgroundColor;
          const backgroundColorRgb = hexToRgb(backgroundColor);
          const rgbString = `${backgroundColorRgb?.r}, ${backgroundColorRgb?.g}, ${backgroundColorRgb?.b}`;
          const backgroundStyle = `rgb(${rgbString})`;
          const flowerImage = getFlowerImageFromArticle(savedArticle.article);
          return (
            <div
              key={savedArticle.article.pageid}
              className={styles.flowerOuterContainer}
            >
              <button
                onClick={() => props.goToArticle(savedArticle.article)}
                className={styles.flowerInnerContainer}
                style={{ backgroundColor: backgroundStyle }}
              >
                <Image
                  src={flowerImage}
                  alt="A flower"
                  width="200"
                  height="200"
                  className={styles.flowerImage}
                />
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.toggleContainer}>
        <PageToggle
          currentPage={Page.GARDEN}
          goToMap={props.goToMap}
          goToGarden={() => {}}
        />
      </div>
    </div>
  );
}
