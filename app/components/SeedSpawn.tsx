import { Article } from "../src/interfaces";

export interface SeedSpawnProps {
  article: Article;
  setSelectedArticle: (article: Article | null) => void;
}

export default function SeedSpawn(props: SeedSpawnProps) {
  return (
    <div>
      {props.article.title}
      <button onClick={() => props.setSelectedArticle(null)}>
        back to map
      </button>
    </div>
  );
}
