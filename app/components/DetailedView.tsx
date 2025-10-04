import { SavedArticle } from "../src/interfaces";

interface DetailedViewProps {
  savedArticle: SavedArticle;
}

export default function DetailedView(props: DetailedViewProps) {
  return (
    <div>
      <div>{props.savedArticle.article.title}</div>
      <div>
        Location {props.savedArticle.article.lat},{" "}
        {props.savedArticle.article.lon}
      </div>
      <div>
        Date collected {props.savedArticle.timestampFound.toLocaleDateString()}
      </div>
      <div>Snippet</div>
    </div>
  );
}
