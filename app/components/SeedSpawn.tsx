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
      <div className={styles.seedSpawnTitleContainer}>{props.article.title}</div>
      <button onClick={() => props.setSelectedArticle(null)}>
        back to map
      </button>
      <button onClick={() => props.addSavedArticle(props.article)}>
        save article
      </button>
      <ToWikipediaPageButton articleTitle={props.article.title} />
    </div>
  );
}
