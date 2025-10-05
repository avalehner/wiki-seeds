import {
  Article,
  Location,
  Page,
  SetSelectedArticleFn,
} from "../src/interfaces";
import MapComponent from "./MapComponent";
import PageToggle from "./PageToggle";
import styles from "./../styles/MapPage.module.css";

interface MapPageProps {
  currentLocation: Location | null;
  nearbyArticles: Article[];
  setSelectedArticle: SetSelectedArticleFn;
  goToFlowerDex: () => void;
}

export default function MapPage(props: MapPageProps) {
  return (
    <div className={styles.mapPageOuterContainer}>
      <div className={styles.mapTitleContainer}></div>
      <div className={styles.mapContainer}>
        <div className={styles.mapInnerContainer}>
          <MapComponent
            currentLocation={props.currentLocation}
            nearbyArticles={props.nearbyArticles}
            setSelectedArticle={props.setSelectedArticle}
          />
        </div>
        <div className={styles.toggleContainer}>
          <PageToggle
            goToFlowerDex={props.goToFlowerDex}
            goToMap={() => {}}
            currentPage={Page.MAP_VIEW}
          />
        </div>
      </div>
    </div>
  );
}
