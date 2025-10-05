import {
  Article,
  Location,
  Page,
  SetSelectedArticleFn,
} from "../src/interfaces";
import MapComponent from "./MapComponent";
import PageToggle from "./PageToggle";
import styles from "./../styles/MapPage.module.css";
import Image from "next/image";

interface MapPageProps {
  currentLocation: Location | null;
  nearbyArticles: Article[];
  setSelectedArticle: SetSelectedArticleFn;
  goToFlowerDex: () => void;
}

export default function MapPage(props: MapPageProps) {
  return (
    <div className={styles.mapPageOuterContainer}>
      <div className={styles.mapTitleContainer}>
        <div className={styles.mapTitleInnerContainer}>
          <div className={styles.titleContainer}>WikiGarden</div>
          <div className={styles.logoContainer}>
            <Image
              src="/images/map-page/seed-icon.svg"
              alt="A seed"
              width="25"
              height="25"
            />
          </div>
        </div>
      </div>
      <div className={styles.mapOuterContainer}>
        <div className={styles.mapInnerContainer}>
          <MapComponent
            currentLocation={props.currentLocation}
            nearbyArticles={props.nearbyArticles}
            setSelectedArticle={props.setSelectedArticle}
          />
        </div>
      </div>
      <div className={styles.toggleContainer}>
        <PageToggle
          goToFlowerDex={props.goToFlowerDex}
          goToMap={() => {}}
          currentPage={Page.MAP_VIEW}
        />
      </div>
    </div>
  );
}
