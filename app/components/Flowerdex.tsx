import { Article, Page, SavedArticle } from "../src/interfaces";
import PageToggle from "./PageToggle";

interface FlowerdexProps {
  savedArticles: SavedArticle[];
  goToArticle: (article: Article) => void;
  goToMap: () => void;
}

export default function Flowerdex(props: FlowerdexProps) {
  return (
    <div>
      {props.savedArticles.map((savedArticle) => (
        <div key={savedArticle.article.pageid}>
          <button onClick={() => props.goToArticle(savedArticle.article)}>
            <div>{savedArticle.article.title}</div>
          </button>
        </div>
      ))}
      <PageToggle
        currentPage={Page.FLOWER_DEX}
        goToMap={props.goToMap}
        goToFlowerDex={() => {}}
      />
    </div>
  );
}
