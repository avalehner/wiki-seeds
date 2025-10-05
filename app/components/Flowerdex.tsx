import { Article, Page, SavedArticle } from "../src/interfaces";
import PageToggle from "./PageToggle";
import styles from "./../styles/FlowerDex.module.css";
import {
  articleToThemeColor,
  getFlowerImageFromArticle,
  hexToRgb,
} from "../src/util";
import Image from "next/image";

interface FlowerdexProps {
  savedArticles: SavedArticle[];
  goToArticle: (article: Article) => void;
  goToMap: () => void;
}

export default function Flowerdex(props: FlowerdexProps) {
  return (
    <div className={styles.flowerDexOuterContainer}>
      <div className={styles.flowerDexGrid}>
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
          currentPage={Page.FLOWER_DEX}
          goToMap={props.goToMap}
          goToFlowerDex={() => {}}
        />
      </div>
    </div>
  );
}
