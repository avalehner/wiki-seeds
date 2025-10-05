import {
  Article,
  AddSavedArticle,
  SetSelectedArticleFn,
} from "../src/interfaces";
import ToWikipediaPageButton from "./ToWikipediaPageButton";
import styles from "./../styles/SeedSpawn.module.css";


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
      <button className={styles.saveSeedBtn} onClick={() => props.addSavedArticle(props.article)}>
        save seed 
      </button>
      <div className={styles.openOnWikiBtnContainer}>
        <ToWikipediaPageButton articleTitle={props.article.title} />
      </div>
      <button className={styles.backToMapBtn} onClick={() => props.setSelectedArticle(null)}>
        (x)
      </button>
    </div>
  );
}
