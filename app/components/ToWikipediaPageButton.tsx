import { getWikipediaUrlFromTitle } from "../src/util";
import styles from "./../styles/ToWikipediaPageButton.module.css";

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
      <div className={styles.openOnWikiBtn}>open on wikipedia</div>
    </a>
  );
}
