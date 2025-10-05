import {
  Article,
  AddSavedArticle,
  SetSelectedArticleFn,
} from "../src/interfaces";
import ToWikipediaPageButton from "./ToWikipediaPageButton";
import styles from "./../styles/SeedSpawn.module.css";
import Image from "next/image";
import { getSeedImageFromArticle } from "../src/util";

export interface SeedSpawnProps {
  article: Article;
  setSelectedArticle: SetSelectedArticleFn;
  addSavedArticle: AddSavedArticle;
}

export default function SeedSpawn(props: SeedSpawnProps) {
  return (
    <div className={styles.seedSpawnOuterContainer}>
      <div className={styles.seedSpawnTitleContainer}>Seed found!</div>
      <div className={styles.tapToCollectContainer}>tap to collect</div>
      <button
        className={styles.saveSeedBtn}
        onClick={() => props.addSavedArticle(props.article)}
      >
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
