import {
  Article,
  AddSavedArticle,
  SetSelectedArticleFn,
} from "../src/interfaces";
import ToWikipediaPageButton from "./ToWikipediaPageButton";
import styles from "./../styles/SeedSpawn.module.css";
import Image from "next/image";
import {
  articleToThemeColor,
  getSeedImageFromArticle,
  hexToRgb,
} from "../src/util";

export interface SeedSpawnProps {
  article: Article;
  setSelectedArticle: SetSelectedArticleFn;
  addSavedArticle: AddSavedArticle;
}

export default function SeedSpawn(props: SeedSpawnProps) {
  const backgroundColor = articleToThemeColor(props.article).backgroundColor;
  const backgroundColorRgb = hexToRgb(backgroundColor);
  const rgbString = `${backgroundColorRgb?.r}, ${backgroundColorRgb?.g}, ${backgroundColorRgb?.b}`;
  const backgroundStyle = `radial-gradient(circle at 50% 50%, rgba(${rgbString}, 1.0) 0%, rgba(${rgbString}, 0.7) 30%, rgba(0, 0, 0, 0.0) 50%)`;
  return (
    <div className={styles.seedSpawnOuterContainer}>
      <div className={styles.seedSpawnTitleContainer}>Seed found!</div>
      <div className={styles.tapToCollectContainer}>tap to collect</div>
      <button
        className={styles.saveSeedBtn}
        onClick={() => props.addSavedArticle(props.article)}
      >
        <div
          className={styles.coloredGlow}
          style={{ background: backgroundStyle }}
        />
        <Image
          src={"/images/glitter.png"}
          alt="Glitter texture"
          width="500"
          height="500"
          className={styles.glitterImage}
        />
        <Image
          src={getSeedImageFromArticle(props.article)}
          alt="A seed"
          width="100"
          height="100"
          className={styles.seedImage}
        />
      </button>
      <div className={styles.openOnWikiBtnContainer}>
        <ToWikipediaPageButton articleTitle={props.article.title} />
      </div>
      <div className={styles.closeButtonContainer}>
        <button
          className={styles.backToMapBtn}
          onClick={() => props.setSelectedArticle(null)}
        >
          <Image
            src="/images/close-button.svg"
            alt="Close"
            width="25"
            height="25"
            className={styles.closeButtonImage}
          />
          <div className={styles.closeText}>Close</div>
        </button>
      </div>
    </div>
  );
}
