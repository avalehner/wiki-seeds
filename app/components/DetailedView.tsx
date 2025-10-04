import { useEffect, useState } from "react";
import { SavedArticle, SummaryResponse } from "../src/interfaces";
import { getArticleSummary } from "../src/dataFetching";
import ToWikipediaPageButton from "./ToWikipediaPageButton";

interface DetailedViewProps {
  savedArticle: SavedArticle;
  goToFlowerDex: () => void;
}

export default function DetailedView(props: DetailedViewProps) {
  const [summary, setSummary] = useState<null | SummaryResponse>(null);

  const fetchSummaryData = async () => {
    setSummary(await getArticleSummary(props.savedArticle.article.title));
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

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
      <div>{summary && summary.extract}</div>
      <div>
        <ToWikipediaPageButton
          articleTitle={props.savedArticle.article.title}
        />
      </div>
      <button onClick={props.goToFlowerDex}>Go to FlowerDex</button>
    </div>
  );
}
