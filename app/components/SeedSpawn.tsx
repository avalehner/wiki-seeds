import {
  Article,
  AddSavedArticle,
  SetSelectedArticleFn,
} from "../src/interfaces";
import ToWikipediaPageButton from "./ToWikipediaPageButton";

export interface SeedSpawnProps {
  article: Article;
  setSelectedArticle: SetSelectedArticleFn;
  addSavedArticle: AddSavedArticle;
}

export default function SeedSpawn(props: SeedSpawnProps) {
  return (
    <div>
      {props.article.title}
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
