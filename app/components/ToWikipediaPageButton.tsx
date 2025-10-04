import { getWikipediaUrlFromTitle } from "../src/util";

interface ToWikipediaPageButtonProps {
  articleTitle: string;
}

export default function ToWikipediaPageButton(
  props: ToWikipediaPageButtonProps
) {
  return (
    <a
      href={getWikipediaUrlFromTitle(props.articleTitle)}
      target="_blank"
      rel="noreferrer"
    >
      <div>Open on Wikipedia</div>
    </a>
  );
}
